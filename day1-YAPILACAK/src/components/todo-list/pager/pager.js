

const AktifSayfaDegis = (YeniSayfa) => { logg(`YS: ${YeniSayfa} | AS: ${AktifSayfa}`); AktifSayfa = YeniSayfa; renderTodos() }

function SiralamaKriteri_Baslik(e) {
    logg("SiralamaKriteri_Baslik", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 10 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

function SiralamaAssist() {
    // for paging (0,15) => (n,n+15) olabilir
    if (SiralayisKriteri > 0) { root.innerHTML = "" }
    if (SiralayisKriteri == 10) { todos.sort((a, b) => { return a.title > b.title }) }
    if (SiralayisKriteri == 11) { todos.sort((b, a) => { return a.title > b.title }) }
    if (SiralayisKriteri == 20) { todos.sort((a, b) => { return a.id > b.id }) }
    if (SiralayisKriteri == 21) { todos.sort((b, a) => { return a.id > b.id }) }
    if (SiralayisKriteri == 30) { todos.sort((a, b) => { return a.completed > b.completed }) }
    if (SiralayisKriteri == 31) { todos.sort((b, a) => { return a.completed > b.completed }) }
}

const SiralamaKriteri_Id = (e) => {
    logg("SiralamaKriteri_Id", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 20 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

const SiralamaKriteri_KId = (e) => {
    logg("SiralamaKriteri_KId", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 20 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

const SiralamaKriteri_Durum = (e) => {
    logg("SiralamaKriteri_Durum", SiralayisKriteri);
    SayfalayiciSifirla()
    SiralayisKriteri = 30 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
    renderTodos()
}

const SayfalayiciSifirla = () => { AktifSayfa = 1 }

const RenderSayfalamaButtonlari = (tbody) => {

    //root.innerHTML = ""
    //debugger
    const SayfaSayisi = parseInt(todos.length / SES);
    const Sayfalayici = `<td class="SayfalayiciTd" colspan="5" >
    <button onClick="AktifSayfaDegis(1)" > İLK SAYFA</button>
    <button onClick="AktifSayfaDegis(${AktifSayfa - 1})"  ${AktifSayfa > 1 ? `` : `disabled="disabled"`} > Önceki </button>
    
    <button onClick="AktifSayfaDegis(${AktifSayfa + 1})" ${AktifSayfa < SayfaSayisi ? `` : `disabled="disabled"`} > Sonraki </button>
    <button onClick="AktifSayfaDegis(${SayfaSayisi})" > SON SAYFA [ ${SayfaSayisi} ]</button>

    &nbsp; | &nbsp; 
    
    
    <button onClick="AktifSayfaDegis(${AktifSayfa - 5})"  ${AktifSayfa - 5 > 0 ? `` : `disabled="disabled"`} > - 5 </button>
    <button  onClick="AktifSayfaDegis(${AktifSayfa - 1})" ${AktifSayfa - 1 > 0 ? `` : `disabled="disabled"`} > ${AktifSayfa - 1} </button>
    
    &nbsp; | &nbsp; 

    <span style="font-weight:100; font-size:20pt">${AktifSayfa}</span>
    
    &nbsp; | &nbsp; 
    
    <button onClick="AktifSayfaDegis(${AktifSayfa + 1})" ${AktifSayfa + 1 < SayfaSayisi +1 ? `` : `disabled="disabled"`} > ${AktifSayfa + 1} </button>
    
    &nbsp; | &nbsp; 
    <button onClick="AktifSayfaDegis(${AktifSayfa + 5})"  ${AktifSayfa + 1 < SayfaSayisi ? `` : `disabled="disabled"`} > +5 </button> 

    </td>`

    // logg("Sayfalayici:" + Sayfalayici)
    const tr = document.createElement("tr")
    tr.innerHTML = Sayfalayici
    tbody.appendChild(tr)

}


