import React from 'react';
import ReactDOM from 'react-dom/client';
// import { useThemaCTX } from "./context/thema-context"

import App from './App';
import './index.css';

// root.render(<React.StrictMode>    <App />  </React.StrictMode>);

const root = ReactDOM.createRoot(document.getElementById('root'));
// let themaNameX = useThemaCTX().themaName;

root.render(
  <>
    {console.log("root.render")}
    <App themaName="darkThema" />
  </>
);