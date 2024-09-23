import { useCallback, useState } from "react"
import styles from "./InputRange.module.css"

type InputRangeProps = {
	title: string
	max: number
	min: number
	step: number
	value: number
	setValue: (value: number) => void
	needDebounce: boolean
}

const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>): void => {
    clearTimeout(timerId) 
    timerId = setTimeout(() => fn(...args), delay)
  }
}

export const InputRange = ({ title, max, min, step, value, setValue, needDebounce }: InputRangeProps) => {
  const [ internalValue, setInternalValue ] = useState<number>(value)
	
  const debouncedSetValue = useCallback(
    debounce((newValue: number) => setValue(newValue), 300)
    , [setValue])

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? e.target.valueAsNumber : 0 
    setInternalValue(newValue)
    if (needDebounce){
      debouncedSetValue(newValue)
      return
    }
    setValue(newValue)	
  }
	
  return (
    <div className={styles.InputRange}>
      <input
        className={styles.InputRange__range}
        type="range"
        value={internalValue}
        onChange={(e) => change(e)}
        min={min}
        max={max}
        step={step}
      />
      <div className={styles.InputRange__title}>
        <span>{title}: </span>
        <input
          className={styles.InputRange__number}
          type="number"
          value={internalValue}
          onChange={(e) => change(e)}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  ) 
} 
