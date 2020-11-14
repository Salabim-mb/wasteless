import React, {useState, createContext} from 'react';

export const AlertContext = createContext({
    open: false,
    message: "",
    showAlert: () => {}
});

export const AlertProvider = (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("error");

    const data = {
        open,
        message,
        severity,
        changeVisibility: (newOpen) => setOpen(newOpen),
        changeMessage: (newMessage, newSeverity="error") => {
            setOpen(true);
            setMessage(newMessage);
            setSeverity(newSeverity);
        },
        showAlert: (newMessage, newSeverity) => {
            data.changeMessage(newMessage, newSeverity);
            data.changeVisibility(true);
            //setTimeout(() => data.changeVisibility(false), 3000)
        },
    };
    return <AlertContext.Provider value={data} {...props} />
};