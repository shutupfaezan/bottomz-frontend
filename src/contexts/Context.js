import {createContext, useState} from "react"
 
export const SingularContext = createContext()

const Context = ({children})=>{
    const [inputModal, setInputModal] = useState(false)
    const [show, setShow] = useState(false);
    const [inputValues, setInputValues] = useState([]);
    const [clubVariable, setClubVariable] = useState()
    const [singleEvent, setSingleEvent] = useState()
    const [loginActive, setLoginActive] = useState(true)
    const [signActive, setSignActive] = useState()

    return <SingularContext.Provider value={{clubVariable, setClubVariable, loginActive, setLoginActive, signActive, setSignActive, show, setShow, inputValues, setInputValues, inputModal, setInputModal,singleEvent, setSingleEvent}}>{children}</SingularContext.Provider>
} 

export default Context