/* eslint-disable no-unused-vars */
import React from 'react';
import { useThemaCTX } from "./context/thema-context"
import './App.css';

console.log("app.js : ", "0");

let body = document.body;

// let thema = {
//   light: { backgroundColor: "white", foreColor: "black" },
//   dark: { backgroundColor: "black", foreColor: "white" }
// }

function App(themaName = "") {
  console.log("app.js : ", "1");

  body = document.body;
  let themaNameX = useThemaCTX().themaName;
  body.className = SetThema_OfBody(themaNameX);

  function SetThema_OfBody(pThemaNameX) {
    body = document.body;
    // console.log("   app.js : ", "body got", body.className, themaNameX);

    body.className = `${pThemaNameX} Selamm`;
    // console.log("   app.js : ", "body CLASS SET", body.className, "themaNameX:", themaNameX);
    Thema_ToggleX();
    return body.className;
  }

  function ThemaOfBody() { return body.className }
  function Thema_Toggle() {
    body.className = body.classList.contains("darkThema") ? "lightThema" : "darkThema";
    Thema_ToggleX();
    return body.className
  }
  function Thema_Dark() { return SetThema_OfBody("darkThema") }
  function Thema_Light() { return SetThema_OfBody("lightThema") }

  function Thema_ToggleX() {
    console.log("     Thema_ToggleX");
    let divContent = document.getElementById("divContent");

    if (!divContent) { console.log("      NO-DIV-C"); return };
    // console.log("     Thema_ToggleX", divContent.className, " body cn:", ThemaOfBody());

    divContent.className = "App " + (ThemaOfBody().indexOf("darkThema") > -1 ? "lightThemaX2" : "darkThemaX2");
    // console.log("     Thema_ToggleX : 2", divContent.className);

    return divContent.className
  }

  function Thema_ToggleX2() {
    console.log("     Thema_ToggleX2");
    let divContent = document.getElementById("divContent");

    if (!divContent) { console.log("      NO-DIV-C"); return };

    divContent.className = "App " + (divContent.className.indexOf("darkThema") > -1 ? "lightThemaX2" : "darkThemaX2");

    return divContent.className
  }


  console.log("app.js : ", "1");
  console.log("app.js : ", "themaName", themaNameX);

  SetThema_OfBody(themaNameX)
  console.log("app.js : ", "themaName SET: ", themaNameX);
  // console.log("app.js : ", "themaName", themater.themaName);

  return (
    <>
      <div id="divContent" className={`App lightThemaX2`}>
        {/* <header className="App-header">SELAMM, Sana Ey Bad-ı Saba ..</header> */}

        <p><img width={"400px"} src='https://img.paratic.com/dosya/2017/05/turk-bayragi-hakkinda-bilinmesi-gereken-bilgiler.jpg' alt="Türk Bayrağı"></img></p>

        <h2> İSTİKLAL MARŞI'MIZ</h2>
        <hr />
        <div>
          KORKMA &nbsp; ! , &nbsp; SÖNMEZ !! &nbsp; Bu Şafaklarda YÜZEN AL SANCAK !!!<br /><br />
          SÖNMEDEN &nbsp; ! &nbsp; Yurdumun Üstünde Tüten !! &nbsp; EN SON OCAK !!!<br /><br />
          O Benim MİLLETİMİN YILDIZI'DIR ! PARLAYACAK !!!<br /><br />
          O Benim'dir ! &nbsp; O BENİMM !! &nbsp; MİLLETİMİN'DİR  ANCAK !!!<br />
          {console.log("app.js : ", "11")}
        </div>
        <div className='themaChanger'>
          <button onClick={() => Thema_Dark()} id="setThema_Dark">Koyu Renk Tema'lı</button>
          <button onClick={() => Thema_Light()} id="setThema_Light">Açık Renk Tema'lı</button>
          <br />
          <br />
          <button onClick={() => Thema_Toggle()} id="setThema1">Toogle / Değiştir</button>
          <button onClick={() => Thema_ToggleX2()} id="setThemaX_Toggle">İç Renk Tema Toggle</button>

        </div>
      </div>
    </>
  );
}

export default App;
