import React, { useState, useEffect } from "react";
import Button from "../button";

import classes from "./style.module.css";


const TodoList = () => {

	const url = "https://jsonplaceholder.typicode.com/todos";

	//  0: YOK | n0: Asc, n1: DeAsc 
	// 10, 11 : a.title  | 20, 21 : a.id  | 30, 31 : a.completed
	// let setSiralayisKriteri = (0
	// let aktifSayfa = 1
	// let ses = 5 // SayfaElemanSayısı 
	let _todosPaged = {}

	const [siralayisKriteri, setSiralayisKriteri] = useState(0);
	const [ses, setSES] = useState(8);
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


	const remove = (todo) => { if (window.confirm("Silmek üzerisiniz emin misiniz")) { setTodos(prev => { return prev.filter(x => x.id !== todo.id) }) } }

	const todosPaged = () => {
		console.log("	todosPaged", Baslangic + ses, Baslangic, ses);
		SiralamaAssist()
		_todosPaged = todos.slice(Baslangic, Baslangic + ses)
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


	const Baslangic = (aktifSayfa - 1) * ses; /* 4.sayfa * 5 eleman = 20 */

	const renderToDoS = () => {
		console.log("renderToDoS");
		if (todos.length === 0) { console.log("renderToDoS", "todos.length == zero"); return }
		return (
			<div className={`${classes.container} container`}>
				{id !== undefined && id != null && renderEditForm()}

				<table id="tTodos" className="table table-hover" >
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
								<td style={{ minWidth: "2cm" }}>
									<Button onClick={() => remove(todo)} className={`btn btn-sm btn-danger ${classes.actionButton} `}> SİL : {todo.id} </Button>
									{/* {todo.id} : {todo.userId} */}
								</td>
								<td style={{ minWidth: "2cm" }}>
									{todo.userId}
								</td>
								{/* <td style={{ width: "2cm", borderRadius: "10px" }} className={todo.completed ? "text-bg-success" : "text-bg-warning"} >{todo.completed ? "OK" : "..."}</td> */}
								<td style={{ minWidth: "12cm" }}>{todo.title}</td>
								<td style={{ minWidth: "4cm" }}>
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

	const PageSizeChanged = (e) => { let v = e.target.value; setSES(parseInt(v)) }

	const renderThead = () => {
		return (
			<thead >
				<tr>
					<th scope="col" style={{ width: "2cm" }} id="idSiralamaKriteri_Id" onClick={() => SiralamaKriteri_Id(this)} 		>Id</th>
					<th scope="col" style={{ width: "2cm" }} id="idSiralamaKriteri_KId" onClick={() => SiralamaKriteri_KId(this)} 	>Şahıs Id</th>
					<th scope="col" style={{ width: "2cm" }} id="idSiralamaKriteri_Baslik" onClick={() => SiralamaKriteri_Baslik(this)} 	>Başlık</th>
					{/* <th scope="col" style={{ width: "4cm" }} id="idSiralamaKriteri_Durum" 	onClick="SiralamaKriteri_Durum(this)} 	>Durum</th> */}
					<th scope="col" style={{ width: "5cm" }} id="idSiralamaKriteri_Durum" onClick={() => SiralamaKriteri_Durum(this)} 	>
						<select name="namePageSize" id="idPageSize" onChange={() => PageSizeChanged}>
							<option> 8 </option>
							<option> 10</option>
							<option> 25</option>
							<option> 50</option>
						</select> &nbsp; İşlem
					</th>

				</tr>
			</thead>
		);
	};


	//#region "pager"

	const aktifSayfaDegis = (YeniSayfa) => {
		console.log(`YS: ${YeniSayfa} | AS: ${aktifSayfa}`);
		setAktifSayfa(YeniSayfa % todos.length);
		
	}

	const SayfaSayisi = () => {
		console.log("			SayfaSayisi", parseInt(todos.length / ses), todos.length, ses)
		return parseInt(todos.length / ses)
	};

	/* export  */
	const RenderSayfalamaButtonlari = (todos_count, kk) => {
		console.log("			RenderSayfalamaButtonlari:3 ", todos_count, aktifSayfa, (SayfaSayisi() - aktifSayfa) > ses)
		return (
			<>
				<tr style={{ textAlign: "center" }}>
					<td className="SayfalayiciTd" colSpan={5} >
						<button className="btn btn-success" onClick={() => aktifSayfaDegis(1)} > İLK SAYFA</button>                    &nbsp; | &nbsp;
						<button className="btn btn-success" onClick={() => aktifSayfaDegis(aktifSayfa - 5)} disabled={aktifSayfa - 5 > 0 ? `` : "disabled"} > -5 </button>                    &nbsp; | &nbsp;

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

	function SiralamaKriteri_Baslik(e) {
		console.log("SiralamaKriteri_Baslik", siralayisKriteri);
		SayfalayiciSifirla()
		setSiralayisKriteri(10 + (siralayisKriteri % 2 === 0 ? 1 : 0))
		
	}

	function SiralamaAssist(root) {
		// debugger
		if (siralayisKriteri === 11) { todos.sort((a, b) => { return a.title > b.title }) }
		if (siralayisKriteri === 10) { todos.sort((b, a) => { return a.title > b.title }) }
		if (siralayisKriteri === 21) { todos.sort((a, b) => { return a.id > b.id }) }
		if (siralayisKriteri === 20) { todos.sort((b, a) => { return a.id > b.id }) }
		if (siralayisKriteri === 31) { todos.sort((a, b) => { return a.completed > b.completed }) }
		if (siralayisKriteri === 30) { todos.sort((b, a) => { return a.completed > b.completed }) }
	}

	const SiralamaKriteri_Id = (e) => {
		console.log("SiralamaKriteri_Id", siralayisKriteri);
		SayfalayiciSifirla()
		setSiralayisKriteri(20 + (siralayisKriteri % 2 === 0 ? 1 : 0))
		
	}

	const SiralamaKriteri_KId = (e) => {
		console.log("SiralamaKriteri_KId", siralayisKriteri);
		SayfalayiciSifirla()
		setSiralayisKriteri(20 + (siralayisKriteri % 2 === 0 ? 1 : 0))
		
	}

	const SiralamaKriteri_Durum = (e) => {
		console.log("SiralamaKriteri_Durum", siralayisKriteri);
		SayfalayiciSifirla()
		setSiralayisKriteri(30 + (siralayisKriteri % 2 === 0 ? 1 : 0))
		
	}

	const SayfalayiciSifirla = () => { setAktifSayfa(1) }


	//#endregion


	return (
		<>
			{renderToDoS()}
		</>
	)


}

export default TodoList;
