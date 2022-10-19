import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeProvider';
import TopNavbar from './Components/TopNavBar';

import HomePage from './Pages/HomePage';
import About from './Pages/About.jsx.js';
import News from './Pages/News.jsx.js';
import Four04 from './Pages/404.jsx';

// import { createContext, useContext, useEffect, useState } from 'react';

function App() {
  console.log(" app.js")

  return (
    <BrowserRouter>
      {/* UP-TOP BODY TEXT */}
      <ThemeProvider>
        <TopNavbar />
        <Routes>
          <Route path="*" element={<Four04 />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
