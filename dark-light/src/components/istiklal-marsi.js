import React, { useContext } from "react";
import { ThemaContext } from "../context/thema-context"

console.log("   İSTİKLAL MARŞI: ", "0");

let body = document.body;
let themaName = "im-default-thema-name"
let ThemaCTX = null;

function SetThema_OfBody(themaName) {
    body = document.body;

    body.className = `${themaName} Selamm`;
    Thema_ToggleX();
    return body.className;
}

function GetThemaOfBody() { return body.className }

function Thema_Toggle() {
      

    body.className = body.classList.contains("darkThema") ? "lightThema" : "darkThema";
    Thema_ToggleX();
    return body.className
}
function Thema_Dark() { return SetThema_OfBody("darkThema") }
function Thema_Light() { return SetThema_OfBody("lightThema") }

function Thema_ToggleX() {
    let divContent = document.getElementById("divContent");

    if (!divContent) { console.log("      NO-DIV-C"); return };

    divContent.className = "App " + (GetThemaOfBody().indexOf("darkThema") > -1 ? "lightThemaX2" : "darkThemaX2");

    return divContent.className
}


function Thema_ToggleX2() {
    // console.log("     Thema_oggleX2");
    let divContent = document.getElementById("divContent");

    if (!divContent) { console.log("      NO-DIV-C"); return };

    divContent.className = "App " + (divContent.className.indexOf("darkThema") > -1 ? "lightThemaX2" : "darkThemaX2");

    return divContent.className
}


// !! <IstiklalMarsi />
export function IstiklalMarsi() {
  // console.log("IstiklalMarsi.js : ", "1");
    
    body = document.body;
    ThemaCTX = useContext(ThemaContext);
    themaName = ThemaCTX.themaName;

    console.log("   İM : ", "themaName", themaName);
    console.log("GetThemaOfBody", GetThemaOfBody());

    SetThema_OfBody(themaName)
    // console.log("   İM : ", "themaName SET: ", GetThemaOfBody());

    return (
        <>
            < p > <img width={"400px"} src='https://img.paratic.com/dosya/2017/05/turk-bayragi-hakkinda-bilinmesi-gereken-bilgiler.jpg' alt="Türk Bayrağı"></img></p >

            <h2> İSTİKLAL MARŞI'MIZ</h2>
            <hr />
            <div>
                KORKMA &nbsp; ! , &nbsp; SÖNMEZ !! &nbsp; Bu Şafaklarda YÜZEN AL SANCAK !!!<br /><br />
                SÖNMEDEN &nbsp; ! &nbsp; Yurdumun Üstünde Tüten !! &nbsp; EN SON OCAK !!!<br /><br />
                O Benim MİLLETİMİN YILDIZI'DIR ! PARLAYACAK !!!<br /><br />
                O Benim'dir ! &nbsp; O BENİMM !! &nbsp; MİLLETİMİN'DİR  ANCAK !!!<br />
                {/* console.log("   İM : ", "11") */}
            </div>
            <div className='themaChanger'>
                <button onClick={() => Thema_Dark()} id="setThema_Dark">Koyu Renk Tema'lı</button>
                <button onClick={() => Thema_Light()} id="setThema_Light">Açık Renk Tema'lı</button>
                <br />
                <br />
                <button onClick={() => Thema_Toggle()} id="setThema1">Toogle / Değiştir</button>
                <button onClick={() => Thema_ToggleX2()} id="setThemaX_Toggle">İç Renk Tema Toggle</button>

            </div>
        </>)
}
