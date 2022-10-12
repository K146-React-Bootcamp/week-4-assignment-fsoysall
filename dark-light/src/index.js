import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App.js';
// import Ders from './Tester-FSYS';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Ders themaName="rootThema" /> */}
    <App themaName="darkThema" />
  </React.StrictMode>
);
