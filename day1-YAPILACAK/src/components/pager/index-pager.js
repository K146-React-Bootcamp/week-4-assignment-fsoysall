console.log("               index-pager.JS");
const logg = (l) => { console.log(l) }

//  0: YOK | n0: Asc, n1: DeAsc 
// 10, 11 : a.title  | 20, 21 : a.id  | 30, 31 : a.completed
let SiralayisKriteri = 0
let AktifSayfa = 1
let SES = 5 // SayfaElemanSayısı 

export function RenderSayfalayici(tbody, todos_count, AktifSayfa, sk) {
    const tr = document.createElement("tr")
    tr.innerHTML = RenderSayfalamaButtonlari(tbody, todos_count, AktifSayfa, sk)
    tbody.appendChild(tr)
    logg("Sayfalayici:" + tr.innerHTML)
}

export const RenderSayfalamaButtonlari = (tbody, todos_count, AktifSayfa, SiralayisKriteri) => {

    //root.innerHTML = ""
    //debugger
    const SayfaSayisi = parseInt(todos_count / SES);
    return (
        <>
            <tr style={{ textAlign: "center" }}>
                <td className="SayfalayiciTd" colSpan={5} >
                    <button className="btn btn-success" onClick={() => AktifSayfaDegis(1)} > İLK SAYFA</button>                    &nbsp; | &nbsp;
                    <button className="btn btn-success" onClick={() => AktifSayfaDegis(AktifSayfa - 5)} disabled={AktifSayfa - 5 > 0 ? `` : "disabled"} > -5 </button>                    &nbsp; | &nbsp;
                    {/* <button className="btn btn-success" onClick={() => AktifSayfaDegis(AktifSayfa - 5)} disabled={AktifSayfa - 1 > 0 ? `` : "disabled"} > -1 </button> */}

                    <button className="btn btn-warning" onClick={() => AktifSayfaDegis(AktifSayfa - 1)} disabled={AktifSayfa > 1 ? `` : "disabled"}> Önceki </button> &nbsp; | &nbsp;

                    <span style={{ display: "inline-block", minWidth: "100px", fontWeight: "100", fontSize: "18pt" }} >{AktifSayfa}. Sayfa</span> &nbsp; | &nbsp;

                    <button className="btn btn-warning" onClick={() => AktifSayfaDegis(AktifSayfa + 1)} disabled={AktifSayfa < SayfaSayisi ? `` : "disabled"} > Sonraki </button> &nbsp; | &nbsp;
                    <button className="btn btn-success" onClick={() => AktifSayfaDegis(AktifSayfa)}  > SON SAYFA [ {SayfaSayisi} ] </button> &nbsp; | &nbsp;

                    {/* &nbsp; | &nbsp;
                    <span style={{ fontWeight: "100", fontSize: "18pt" }} >{AktifSayfa}. Sayfa</span>
                    &nbsp; | &nbsp; */}

                    <button className="btn btn-success" onClick={() => AktifSayfaDegis(AktifSayfa + 1)} disabled={AktifSayfa - 5 > 0 ? `` : "disabled"} > +1 </button> &nbsp; | &nbsp;
                    <button className="btn btn-success" onClick={() => AktifSayfaDegis(AktifSayfa + 5)} disabled={AktifSayfa - 1 > 0 ? `` : "disabled"} > +5 </button>
                </td >
            </tr>

        </>
    )
}


export const SiralamaTH = () => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col" style={{ width: "2cm" }} Id="idSiralamaKriteri_Id" onClick="SiralamaKriteri_Id(this)"      >Id</th>
                    <th scope="col" style={{ width: "2cm" }} Id="idSiralamaKriteri_KId" onClick="SiralamaKriteri_KId(this)"     >Şahıs Id</th>
                    <th scope="col" style={{ width: "4cm" }} Id="idSiralamaKriteri_Durum" onClick="SiralamaKriteri_Durum(this)"   >Durum</th>
                    <th scope="col" style={{ width: "2cm" }} Id="idSiralamaKriteri_Baslik" onClick="SiralamaKriteri_Baslik(this)"  >Başlık</th>
                    <th scope="col" style={{ width: "5cm" }} >İşlem</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    )
}

function renderItem(item) {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.userId}</td>
            <td>{item.completed ? "Tamamlandı" : "Yapılacak"}</td>
            <td>{item.title}</td>
            <td>
                <button className="btn btn-xs btn-danger  remove" data-id={item.id}>Sil</button>
                <button className="btn btn-xs btn-warning edit  " data-id={item.id}>Düzenle</button>
            </td>

            {/* <button className="btn btn-xs btn-warning Nedit" data-id=${item.id} onClick="EditClick(this)" >2. Dzn [${item.id}]</button> */}
            {/* debugger */}
        </tr>
    )
}




export const AktifSayfaDegis = (YeniSayfa) => { logg(`YS: ${YeniSayfa} | AS: ${AktifSayfa}`); AktifSayfa = YeniSayfa; /* renderTodos() */ }

export function SiralamaKriteri_Baslik(e) {
    logg("SiralamaKriteri_Baslik", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 10 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    /* renderTodos() */
}

export function SiralamaAssist(root, todos) {
    // for paging (0,15) => (n,n+15) olabilir
    if (SiralayisKriteri > 0) { root.innerHTML = "" }
    if (SiralayisKriteri === 10) { todos.sort((a, b) => { return a.title > b.title }) }
    if (SiralayisKriteri === 11) { todos.sort((b, a) => { return a.title > b.title }) }
    if (SiralayisKriteri === 20) { todos.sort((a, b) => { return a.id > b.id }) }
    if (SiralayisKriteri === 21) { todos.sort((b, a) => { return a.id > b.id }) }
    if (SiralayisKriteri === 30) { todos.sort((a, b) => { return a.completed > b.completed }) }
    if (SiralayisKriteri === 31) { todos.sort((b, a) => { return a.completed > b.completed }) }
}

export const SiralamaKriteri_Id = (e) => {
    logg("SiralamaKriteri_Id", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 20 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    // renderTodos()
}

export const SiralamaKriteri_KId = (e) => {
    logg("SiralamaKriteri_KId", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 20 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    // renderTodos()
}

export const SiralamaKriteri_Durum = (e) => {
    logg("SiralamaKriteri_Durum", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 30 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    // renderTodos()
}

export const SayfalayiciSifirla = () => { AktifSayfa = 1 }
