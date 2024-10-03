import { useEffect } from "react"
import { useSIRParameters } from "../../Hooks/useSIRParametes"
import { useDay } from "../../Hooks/useDay"
import { InputRange } from "./InputRange"

export const Inputs = () => {
  const dayManager = useDay()
  const { day } = dayManager
  const parameters = useSIRParameters()
  const { data: { infection, recuperation, population, infected } } = parameters

  useEffect(() => {
    if (infected > population) parameters.setInfected(population)
  }, [population])

  return (
    <section>
      <InputRange 
        title="Dia" 
        needDebounce={false} 
        value={day} 
        setValue={dayManager.updateDay} 
        min={0} 
        max={359} 
        step={1}
      />
      <InputRange 
        title="Tasa de infeccíon" 
        needDebounce 
        value={infection} 
        setValue={parameters.setInfection} 
        min={0} 
        max={3} 
        step={0.01} 
      />
      <InputRange 
        title="Tasa de recuperacíon" 
        needDebounce 
        value={recuperation} 
        setValue={parameters.setRecuperation} 
        min={0} 
        max={3} 
        step={0.01} 
      />
      <InputRange 
        title="Poblacion" 
        needDebounce 
        value={population} 
        setValue={parameters.setPopulation} 
        min={10} 
        max={1000000} 
        step={10} 
      />
      <InputRange 
        title="Infectado iniciales" 
        needDebounce 
        value={infected} 
        setValue={parameters.setInfected} 
        min={10} 
        max={population} 
        step={10} 
      />
    </section>
  )
}
