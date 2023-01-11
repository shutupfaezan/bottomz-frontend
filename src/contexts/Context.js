import {createContext, useState} from "react"
 
export const SingularContext = createContext()

const Context = ({children})=>{
    const [show, setShow] = useState(false);
    const [clubVariable, setClubVariable] = useState()
    const [loginActive, setLoginActive] = useState(true)
    const [signActive, setSignActive] = useState()

    return <SingularContext.Provider value={{clubVariable, setClubVariable, loginActive, setLoginActive, signActive, setSignActive, show, setShow}}>{children}</SingularContext.Provider>
} 

export default Context