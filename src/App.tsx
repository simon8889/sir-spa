import { DataContainer } from "./Components/DataContainer"
import { Inputs } from "./Components/Inputs"
import styles from "./App.module.css"
import { IColor, RColor, SColor } from "./globalVars"

export const App = () => {
  return (
  	<main className={styles.App}>
      <aside className={styles.App__sideBar}>
        <h1>Modelo&nbsp; 
          <span style={{ color: SColor }}>S</span>
          <span style={{ color: IColor }}>I</span>
          <span style={{ color: RColor }}>R</span>
        </h1>
        <Inputs />
      </aside>
      <DataContainer />
    </main>
   
  )
}
