import { createContext, ReactNode, useContext, useReducer } from "react";


const initialState = {
    Chat: "",
    Receiver: "",
}




const Reducer = (state, action) => {
    switch (action.type) {
        case "Chat":
            return { ...state, Chat: action.payload };
        case "Receiver":
            return { ...state, Receiver: action.payload };
        default:
            return state;
    }
}

const AppContext = createContext({
    state: initialState,
    dispatch: () => undefined
});

export const ChatProvider  = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const Context = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
