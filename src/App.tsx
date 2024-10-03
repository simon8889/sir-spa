import { useState, useEffect } from "react"
import { DataContainer } from "./Components/DataContainer"
import { Inputs } from "./Components/Inputs"
import styles from "./App.module.css"
import { IColor, RColor, SColor } from "./globalVars"
import { IoClose } from "react-icons/io5"
import useWindowWidth from "./Hooks/useWindowWidth"
import { useMenuState } from "./Hooks/useMenuState"

export const App = () => {

  const { isMenuOpen, updateMenuState } = useMenuState()
  const [ isMobile, setIsMobile ] = useState<boolean>(false)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    setIsMobile(windowWidth <= 991)
  }, [windowWidth]) 

  return (
    <main className={styles.App}>
      <aside className={`${styles.App__sideBar} ${isMenuOpen && isMobile ? styles.App__sideBarOpen : ""} `}>
        { isMobile && 
          <div className={styles.App__menuIcon} onClick={() => updateMenuState(!isMenuOpen)}>
            <IoClose size={"30px"} color="#FFFCE8" />
          </div>
        } 
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
