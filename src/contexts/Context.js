import { createContext, useState } from "react";

export const SingularContext = createContext();

const Context = ({ children }) => {
  const [inputModal, setInputModal] = useState(false);
  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [eventStepper, setEventStepper] = useState(1);
  const [eventInfoValue] = useState({});

  return (
    <SingularContext.Provider
      value={{
        show,
        setShow,
        inputValues,
        setInputValues,
        inputModal,
        setInputModal,
        eventInfoValue,
        eventStepper,
        setEventStepper,
        orderId,
        setOrderId,
      }}
    >
      {children}
    </SingularContext.Provider>
  );
};

export default Context;
