import { FaPerson } from "react-icons/fa6" 
import styles from "./PopulationChart.module.css" 
import { SColor, IColor, RColor } from "../../globalVars"

export const PopulationChart = ({ data }: { data: SIR | undefined }) => {
  if (!data ||  data.S + data.I + data.R  === 0) return <div>No data</div>
  const totalPopulation = data.S + data.I + data.R 
  
  const populationPercentage = (n: number): number => {
    const result = parseInt(((n * 108) / totalPopulation).toFixed(), 10)
    
    if (result < 0) return 0
    if (result > 108) return 108
    
    return result
  }
  
  const SPercentage = populationPercentage(data.S)
  const IPercentage = populationPercentage(data.I)
  const RPercentage = populationPercentage(data.R)
  
  const populationArr = [...new Array(SPercentage).fill("S"), 
    ...new Array(RPercentage).fill("R"), 
    ...new Array(IPercentage).fill("I")
  ]
                        
  if (populationArr.length > 108) populationArr.pop()
  if (populationArr.length < 108) populationArr.push("I")
    
  const getColor = (sir: string): string => {
    if (sir === "S") return SColor
    if (sir === "I") return IColor
    return RColor
  }
  
  return (
    <div className={styles.PopulationChart}>
      { populationArr.map((act, i) => (
        <FaPerson className={styles.PopulationChart__person} key={i} size={"25px"} color={getColor(act)} />
      ))}
    </div>
  )
}
