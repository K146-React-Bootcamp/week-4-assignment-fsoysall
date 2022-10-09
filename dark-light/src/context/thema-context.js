import ReactDOM from "react-dom"

/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";

console.log("thema-context.js : ", "0");

const ThemaContext = createContext({ state: {}, themaName: "darkThema", useDarkThema: true });
export const useThemaCTX = () => useContext(ThemaContext);

console.log("thema-context.js : ", "1");

export const ThemaProvider = ({ children, pThemaName = "darkThema", pUseDarkThema, pInitialState = {}, }) => {
    console.log("thema-context.js : ", "2");
    
    const [state, setState] = useState(pInitialState);
    const [useDarkThema, setUseDarkThema] = useState(pUseDarkThema);
    
    const [themaName, setThemaName] = useState(pThemaName);
    useEffect(() => { window.localStorage.setItem("thema", JSON.stringify(state)) }, [state])
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    const body = document.getElementById('root');
    console.log("   thema-context.js : ", "body got");
    body.className = themaName;
    console.log("   thema-context.js : ", "body CLASS SET");

    // const addToCart = (item) => {        setState((prev) => {            return { ...prev, [item.id]: { quantity: 1 } };        });    };
    // const hasShoppingCart = (item) => { return state[item.id] ? true : false; };

    return (
        <ThemaContext.Provider value={{ state, themaName, }} >
            {console.log("thema-context.js : ", "10")}
            {children}
            console.log("thema-context.js : ","11");
        </ThemaContext.Provider >
    );
};

export const themes = {
    light: {
        foreground: 'black',
        background: 'white',
    },
    dark: {
        foreground: 'white',
        background: 'black',
    },
}