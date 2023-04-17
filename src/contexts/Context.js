import {createContext, useState} from "react"
 
export const SingularContext = createContext()

const Context = ({children})=>{
    const [inputModal, setInputModal] = useState(false)
    const [show, setShow] = useState(false);
    const [inputValues, setInputValues] = useState([]);
    const [clubVariable, setClubVariable] = useState()
    const [eventStepper, setEventStepper] = useState(1)
    const [loginActive, setLoginActive] = useState(true)
    const [signActive, setSignActive] = useState()
    const [eventInfoValue] = useState({})

    return <SingularContext.Provider value={{clubVariable, setClubVariable, loginActive, setLoginActive, signActive, setSignActive, show, setShow, inputValues, setInputValues, inputModal, setInputModal, eventInfoValue, eventStepper, setEventStepper}}>{children}</SingularContext.Provider>
} 

export default Context