/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';

import { ThemaProvider } from './context/thema-context.js';
import { IstiklalMarsi } from "./components/istiklal-marsi.js"

console.log("app.js : ", "0");

export function App(props) {
  // console.log("app.js : ", "1");
  // console.log("  App:themaName Param", props.themaName)
   
  return (
    <>
      <ThemaProvider ThemaName={props.themaName} >
        <div id="divContent" className={`App lightThemaX2`}>
          {/* <header className="App-header">SELAMM, Sana Ey Bad-ı Saba ..</header> */}
          <IstiklalMarsi thema="IM-TEMA" />
        </div>
      </ThemaProvider>
    </>
  );
}

export default App;


