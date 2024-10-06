import { useEffect, useState } from "react"
import { useDay } from "../../Hooks/useDay"
import { useSIRParameters } from "../../Hooks/useSIRParametes"
import { LineChart, PieChart } from "@mui/x-charts"
import styles from "./DataContainer.module.css"
import { DataDisplay } from "../DataDisplay"
import { Equations } from "../Equations"
import { PopulationChart } from "../PopulationChart"
import { SColor, IColor, RColor, API_URL } from "../../globalVars"
import useWindowWidth from "../../Hooks/useWindowWidth"
import { TiThMenu } from "react-icons/ti"
import { useMenuState } from "../../Hooks/useMenuState"

export const DataContainer = () => {

  const day = useDay(state => state.day)
  const parameters = useSIRParameters(state => state.data)
  const { infection, recuperation, population, infected } = parameters
  const { isMenuOpen, updateMenuState } = useMenuState()

  const [SIRData, setSIRData] = useState<SIR[]>([])
  const [currentDayData, setCurrentDayData] = useState<SIR>({ S: 0, I: 0, R: 0 })
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [chartWidth, setChartWidth] = useState<number>(450)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    setIsMobile(windowWidth <= 991)
  }, [windowWidth])

  useEffect(() => {
    setChartWidth(isMobile ? 350 : 450)
  }, [isMobile])

  const parametersToSend = {
    days: 360,
    infection_rate: infection,
    initial_i: infected,
    initial_r: 0,
    initial_s: population - infected,
    population,
    recuperation_rate: recuperation
  }

  useEffect(() => {
    fetch(`${API_URL}/sir`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(parametersToSend)
    }).then(res => res.json())
      .then((data: SIRApiData) => setSIRData(data.data))
  }, [parameters])

  useEffect(() => {
    setCurrentDayData(SIRData[day])
  }, [day, SIRData])

  return (
    <section className={styles.DataContainer}>
      {isMobile &&
        <div className={styles.DataContainer__menuIcon} onClick={() => updateMenuState(!isMenuOpen)}>
          <TiThMenu size={"30px"} color="#FFFCE8" />
        </div>
      }
      <header className={styles.DataContainer__header}>
        <h2>Dia: {day}</h2>
        <DataDisplay currentDayData={currentDayData} />
      </header>

      <div className={styles.DataContainer__charts}>
        <div className={styles.DataContainer__label}>
          <h4>Datos del dia:</h4>
        </div>
        <div className={styles.DataContainer__chart}>
          <PopulationChart data={currentDayData} />
        </div>
        <div className={styles.DataContainer__chart}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: currentDayData?.S, color: SColor },
                  { id: 1, value: currentDayData?.I, color: IColor },
                  { id: 2, value: currentDayData?.R, color: RColor },
                ],
              },
            ]}
            width={170}
            height={170}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            sx={{ "&&": { touchAction: "auto" } }}
          />
        </div>
        <div className={styles.DataContainer__label}>
          <h4>Datos del modelo:</h4>
        </div>
        <div className={styles.DataContainer__chart}>
          <LineChart
            xAxis={[{ data: [...Array(SIRData.length).keys()] }]}
            dataset={SIRData}
            series={[
              {
                data: [...SIRData.map(act => act.S)],
                showMark: ({ index }) => index == day,
                color: SColor,
                area: true
              },
              {
                data: [...SIRData.map(act => act.I)],
                showMark: ({ index }) => index == day,
                color: IColor,
                area: true
              },
              {
                data: [...SIRData.map(act => act.R)],
                showMark: ({ index }) => index == day,
                color: RColor,
                area: true
              },
            ]}
            sx={{
              padding: "8px",
              "&&": {
                touchAction: "auto",
              }
            }}
            width={chartWidth}
            height={290}
          />
        </div>
        <div className={styles.DataContainer__chart}>
          <Equations />
        </div>
      </div>
    </section>
  )
}
