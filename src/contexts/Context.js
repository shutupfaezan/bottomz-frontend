import {createContext, useState} from "react"
 
export const SingularContext = createContext()

const Context = ({children})=>{
    const [clubVariable, setClubVariable] = useState()
    const [loginActive, setLoginActive] = useState(true)
    const [signActive, setSignActive] = useState()

    return <SingularContext.Provider value={{clubVariable, setClubVariable, loginActive, setLoginActive, signActive, setSignActive}}>{children}</SingularContext.Provider>
} 

export default Context