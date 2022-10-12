// import ReactDOM from "react-dom"
/* eslint-disable no-unused-vars */

import React, { createContext, useContext, useEffect, useState } from "react";

console.log("thema-context.js : ", "0");

export const ThemaContext = createContext({ themaName: "defaultThema" });

export const ThemaProvider = (props) => {
  // console.log("ThemaProvider.js : ", "1");

    let themaName = props.ThemaName;
    ThemaContext.value = themaName;
    console.log("ThemaContext.value", ThemaContext.value);

    // const [themaName, setThemaName] = useState(props.ThemaName);
    // useEffect(() => { window.localStorage.setItem("thema", JSON.stringify(state)) }, [state])

    return (
        <>
            <ThemaContext.Provider value={{ themaName }}  >
                {props.children}
            </ThemaContext.Provider >
        </>
    );
};
