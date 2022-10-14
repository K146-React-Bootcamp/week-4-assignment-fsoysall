import React, { useState, useEffect } from "react";
import Button from "../button";

import classes from "./style.module.css";


const TodoList = () => {

	const url = "https://jsonplaceholder.typicode.com/todos";

	//  0: YOK | n0: Asc, n1: DeAsc 
	// 10, 11 : a.title  | 20, 21 : a.id  | 30, 31 : a.completed
	let SiralayisKriteri = 0
	// let aktifSayfa = 1
	let SES = 5 // SayfaElemanSayısı 
	let _todosPaged = {}

	const [aktifSayfa, setAktifSayfa] = useState(1);
	const [todos, setTodos] = useState([]);
	const [selectedTodo, setSelectedTodo] = useState(/*{ id: null, completed: false, title: "" }*/);

	const [title, setTitle] = useState("");
	const [id, setId] = useState(null);
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((todos) => {
				setTodos(todos);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);


	const remove = (todo) => { if (window.confirm("Silmek üzerisiniz emin misiniz")) { setTodos(prev => { return prev.filter(x => x.id != todo.id) }) } }

	const todosPaged = () => {
		console.log("	todosPaged", Baslangic + SES, Baslangic, SES);
		_todosPaged = todos.slice(Baslangic, Baslangic + SES)
		// debugger
		return _todosPaged
	}


	//#region EDIT ACTIONS
	// 
	const edit = (Ptodo) => {
		let todo = JSON.parse(JSON.stringify(Ptodo))
		todo.title += ` ${new Date().toLocaleTimeString()}`
		setSelectedTodo(todo);

		setCompleted(todo.completed)
		setTitle(todo.title)
		setId(todo.id)
	}

	const SaveEdited = () => {
		console.log("SaveEdited");
		let s = { ...selectedTodo, title: title, completed: completed }
		let sInd = todos.findIndex(f => f.id === s.id)
		let todos2 = [...todos]
		todos2[sInd] = s
		setTodos(todos2)

		setSelectedTodo(undefined)
		setId(undefined)
		setTitle(undefined)
		setCompleted(undefined)
		console.log("SaveEdited", "s", sInd, "s:", s);
	}

	const handleTitle = (event) => {
		let v = event.target.value
		// selectedTodo.title = v
		setTitle(v)
		// setSelectedTodo(selectedTodo)
	}

	const handleCompleted = (event) => {
		let v = event.target.checked
		// selectedTodo.completed = v
		setCompleted(v)
		// setSelectedTodo(selectedTodo)
	}

	const renderEditForm = () => {
		return (
			<div>
				<table className="table table-hover" id="tEdit">
					<tbody>
						<tr>

							<td style={{ width: "auto", textAlign: "right" }} >
								<input id="tbTitle" type="textbox" autoFocus style={{ width: "80%" }}
									onChange={handleTitle} value={title} />
							</td>

							<td style={{ width: "4cm", borderRadius: "10px" }} className={completed ? "text-bg-success" : "text-bg-warning"} >
								<label htmlFor="tbIsDone" ><b>YAPILDI MI ? </b></label>&nbsp;
								<input id="tbIsDone" name="tbIsDone" type="checkbox"
									onChange={handleCompleted} checked={completed}></input>
							</td>

							<td style={{ width: "5%" }}>
								<Button onClick={() => SaveEdited()} className="btn btn-success" >Kaydet</Button>
							</td>

							<td style={{ width: "5%" }}>
								<Button onClick={() => setId(undefined)} className="btn btn-warning" >Vazgeç</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
	// 
	//#endregion EDIT ACTIONS


	const Baslangic = (aktifSayfa - 1) * SES; /* 4.sayfa * 5 eleman = 20 */

	const renderToDoS = () => {
		console.log("renderToDoS");
		if (todos.length === 0) { console.log("renderToDoS", "todos.length == zero"); return }
		return (
			<div className={`${classes.container} container`}>
				{id !== undefined && id != null && renderEditForm()}

				{/* {SiralamaAssist()} */}
				<table className="table table-hover" >
					{renderThead()}
					{renderBody()}
				</table>
				{/* {RenderSayfalamaButtonlari} */}
			</div >
		)
	}

	const renderBody = () => {
		console.log("	renderBody");
		todosPaged()
		return (
			<tbody>
				{/* todos.slice(Baslangic, Baslangic + SES).forEach((todo) => {renderItem(todo); }); */}
				{/* {todos.slice(Baslangic, Baslangic + SES).map((todo, index) => { */}
				{_todosPaged.map(
					(todo, index) => {
						console.log("todosPaged().map", index);
						return (
							<tr key={index}>
								<td>
									<Button onClick={() => remove(todo)} className={`btn btn-sm btn-danger ${classes.actionButton} `}>SİL</Button>
									{todo.id} : {todo.userId}
								</td>
								{/* <td style={{ width: "2cm", borderRadius: "10px" }} className={todo.completed ? "text-bg-success" : "text-bg-warning"} >{todo.completed ? "OK" : "..."}</td> */}
								<td>{todo.title}</td>
								<td >
									<Button style={{ borderRadius: "30px !important" }} className={"button50px " + (todo.completed ? "btn btn-success" : "btn btn-warning")} >{todo.completed ? "OK" : "..."}</Button>
									<Button onClick={() => edit(todo)} className="btn btn-sm btn-warning">Düzenle</Button>
								</td>
							</tr>
						);
					}
				)}
				{RenderSayfalamaButtonlari(23, 123)}
			</tbody>
		);
	};

	const renderThead = () => {
		return (
			<thead >
				<tr>
					<th ><span class="badge bg-primary"> Rn : U.Rn</span> </th>
					<th ><span class="badge bg-primary"> İÇERİK</span></th>
					<th ><span class="badge bg-primary"> İŞLEM</span></th>
				</tr>
			</thead>
		);
	};


	//#region "pager"

	/* export  */  const aktifSayfaDegis = (YeniSayfa) => {
		console.log(`YS: ${YeniSayfa} | AS: ${aktifSayfa}`);
		setAktifSayfa(YeniSayfa % todos.length);
		console.log(`YS: ${YeniSayfa} | AS: ${aktifSayfa}`);
		// renderToDoS()
	}


	// /* export  */  function RenderSayfalayici(tbody, todos_count, aktifSayfa, sk) {
	// 	const tr = document.createElement("tr")
	// 	tr.innerHTML = RenderSayfalamaButtonlari(tbody, todos_count, aktifSayfa, sk)
	// 	tbody.appendChild(tr)
	// 	console.log("Sayfalayici:" + tr.innerHTML)
	// }

	const SayfaSayisi = () => {
		console.log("			SayfaSayisi", parseInt(todos.length / SES), todos.length, SES)
		return parseInt(todos.length / SES)
	};

	/* export  */
	const RenderSayfalamaButtonlari = (todos_count, kk) => {
		console.log("			RenderSayfalamaButtonlari:3 ", todos_count, aktifSayfa, (SayfaSayisi() - aktifSayfa) > SES)
		//root.innerHTML = ""
		//  debugger
		return (
			<>
				<tr style={{ textAlign: "center" }}>
					<td className="SayfalayiciTd" colSpan={5} >
						<button className="btn btn-success" onClick={() => aktifSayfaDegis(1)} > İLK SAYFA</button>                    &nbsp; | &nbsp;
						<button className="btn btn-success" onClick={() => aktifSayfaDegis(aktifSayfa - 5)} disabled={aktifSayfa - 5 > 0 ? `` : "disabled"} > -5 </button>                    &nbsp; | &nbsp;
						{/* <button className="btn btn-success" onClick={() => aktifSayfaDegis(aktifSayfa - 5)} disabled={aktifSayfa - 1 > 0 ? `` : "disabled"} > -1 </button> */}

						<button className="btn btn-warning" onClick={() => aktifSayfaDegis(aktifSayfa - 1)} disabled={aktifSayfa > 1 ? `` : "disabled"}> Önceki </button> &nbsp; | &nbsp;

						<span style={{ display: "inline-block", minWidth: "100px", fontWeight: "100", fontSize: "18pt" }} >{aktifSayfa}. Sayfa</span> &nbsp; | &nbsp;

						<button className="btn btn-warning" onClick={() => aktifSayfaDegis(aktifSayfa + 1)} disabled={aktifSayfa < SayfaSayisi() ? `` : "disabled"} > Sonraki </button> &nbsp; | &nbsp;
						<button className="btn btn-success" onClick={() => aktifSayfaDegis(SayfaSayisi())} > SON SAYFA [ {SayfaSayisi()} ] </button> &nbsp; | &nbsp;

						<button className="btn btn-success" onClick={() => aktifSayfaDegis(aktifSayfa + 5)} disabled={SayfaSayisi() - aktifSayfa > 5 - 1 ? `` : "disabled"} > +5 </button>
					</td >
				</tr>

			</>
		)
	}


	//#endregion

	//#region Sıralama 

	/* export  */  const SiralamaTH = () => {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col" style={{ width: "2cm" }} Id="idSiralamaKriteri_Id" onClick="SiralamaKriteri_Id(this)" >Id</th>
						<th scope="col" style={{ width: "2cm" }} Id="idSiralamaKriteri_KId" onClick="SiralamaKriteri_KId(this)" >Şahıs Id</th>
						<th scope="col" style={{ width: "4cm" }} Id="idSiralamaKriteri_Durum" onClick="SiralamaKriteri_Durum(this)" >Durum</th>
						<th scope="col" style={{ width: "2cm" }} Id="idSiralamaKriteri_Baslik" onClick="SiralamaKriteri_Baslik(this)" >Başlık</th>
						<th scope="col" style={{ width: "5cm" }} >İşlem</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		)
	}


	/* export  */  function SiralamaKriteri_Baslik(e) {
		console.log("SiralamaKriteri_Baslik", SiralayisKriteri);
		SayfalayiciSifirla()
		SiralayisKriteri = 10 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
		/* renderTodos() */
	}

	/* export  */  function SiralamaAssist(root, todos) {
		// for paging (0,15) => (n,n+15) olabilir
		if (SiralayisKriteri > 0) { root.innerHTML = "" }
		if (SiralayisKriteri === 10) { todos.sort((a, b) => { return a.title > b.title }) }
		if (SiralayisKriteri === 11) { todos.sort((b, a) => { return a.title > b.title }) }
		if (SiralayisKriteri === 20) { todos.sort((a, b) => { return a.id > b.id }) }
		if (SiralayisKriteri === 21) { todos.sort((b, a) => { return a.id > b.id }) }
		if (SiralayisKriteri === 30) { todos.sort((a, b) => { return a.completed > b.completed }) }
		if (SiralayisKriteri === 31) { todos.sort((b, a) => { return a.completed > b.completed }) }
	}

	/* export  */  const SiralamaKriteri_Id = (e) => {
		console.log("SiralamaKriteri_Id", SiralayisKriteri);
		SayfalayiciSifirla()
		SiralayisKriteri = 20 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
		// renderTodos()
	}

	/* export  */  const SiralamaKriteri_KId = (e) => {
		console.log("SiralamaKriteri_KId", SiralayisKriteri);
		SayfalayiciSifirla()
		SiralayisKriteri = 20 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
		// renderTodos()
	}

	/* export  */  const SiralamaKriteri_Durum = (e) => {
		console.log("SiralamaKriteri_Durum", SiralayisKriteri);
		SayfalayiciSifirla()
		SiralayisKriteri = 30 + (SiralayisKriteri % 2 == 0 ? 1 : 0)
		// renderTodos()
	}

	/* export  */  const SayfalayiciSifirla = () => { aktifSayfa = 1 }


	//#endregion


	return (
		<>
			{renderToDoS()}
		</>
	)


}

export default TodoList;
