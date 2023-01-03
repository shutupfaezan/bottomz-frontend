import {createContext, useState} from "react"
 
export const SingularContext = createContext()

const Context = ({children})=>{
    const [clubVariable, setClubVariable] = useState()

    return <SingularContext.Provider value={{clubVariable, setClubVariable}}>{children}</SingularContext.Provider>
} 

export default Context