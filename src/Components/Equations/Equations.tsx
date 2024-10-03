import Latex from "react-latex"
import { useSIRParameters } from "../../Hooks/useSIRParametes"
import styles from "./Equations.module.css"

export const Equations = () => {
  const { infection, infected, population, recuperation } = useSIRParameters(state => state.data)
  const initialPopulation = population - infected
	
  const SEquation = `
    $$ 
      \\begin{aligned}
        \\frac{dS}{dt} &= -\\frac{\\beta}{N} S I \\\\ 
        \\frac{dS}{dt} &= -\\frac{${infection}}{${population}} \\cdot ${initialPopulation} \\cdot ${infected}\\\\ 
      \\end{aligned}
    $$ 
  `
  const IEquation = `
		$$
			\\begin{aligned}
				\\frac{dI}{dt} &= \\frac{\\beta}{N} S I - \\gamma I \\\\
        \\frac{dI}{dt} &= -\\frac{${infection}}{${population}} \\cdot ${initialPopulation} \\cdot ${infected} - ${recuperation} \\cdot ${infected}\\\\ 
			\\end{aligned}
		$$
	`
	
  const REquation = `
		$$
			\\begin{aligned}
				\\frac{dR}{dt} &= \\gamma I \\\\
				\\frac{dR}{dt} &= ${recuperation} \\cdot ${infected}\\\\
			\\end{aligned}
		$$
	`
  return (
    <div className={styles.Equations}>
      <Latex>{SEquation}</Latex>
      <Latex>{REquation}</Latex>
      <Latex>{IEquation}</Latex>
    </div>
  )
} 
