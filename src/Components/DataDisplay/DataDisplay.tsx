import { IColor, RColor, SColor } from "../../globalVars"
import styles from "./DataDisplay.module.css"

export const DataDisplay = ({ currentDayData }: { currentDayData: SIR | undefined}) => {
  return (
    <div className={styles.DataDisplay}>
      <div className={styles.DataDisplay__data}>
        <div className={styles.DataDisplay__colorBox} style={{ background: SColor}}></div>
        <span>Suceptibles: {currentDayData?.S}</span>
      </div>
      <div className={styles.DataDisplay__data}>
        <div className={styles.DataDisplay__colorBox} style={{ background: IColor}}></div>
        <span>Infectados: {currentDayData?.I}</span>
      </div>
      <div className={styles.DataDisplay__data}>
        <div className={styles.DataDisplay__colorBox} style={{ background: RColor}}></div>
        <span>Recuperados: {currentDayData?.R}</span>
      </div>
    </div>
  )
}
