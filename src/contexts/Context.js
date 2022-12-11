import {createContext, useState} from "react"
 
export const SingularContext = createContext()

const Context =({children})=>{ 
    const [hitRun, setHitRun] = useState()
    const [runInfo, setRunInfo] = useState()

    return <SingularContext.Provider value={{hitRun, setHitRun, runInfo, setRunInfo}}>{children}</SingularContext.Provider>
} 

export default Context