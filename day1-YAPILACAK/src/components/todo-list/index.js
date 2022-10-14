import React, { useState, useEffect } from "react";
import Button from "../button";
import classes from "./style.module.css";

const url = "https://jsonplaceholder.typicode.com/todos";

const TodoList = () => {
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

	const renderThead = () => {
		return (
			<thead>
				<tr>
					<th>id</th>
					<th>başlık</th>
					<th>durum</th>
					<th>Aksiyon</th>
				</tr>
			</thead>
		);
	};


	const remove = (todo) => { if (window.confirm("Silmek üzerisiniz emin misiniz")) { setTodos(prev => { return prev.filter(x => x.id != todo.id) }) } }

	const renderBody = () => {
		return (
			<tbody>
				{todos.slice(0, 15).map((todo, index) => {
					return (
						<tr key={index}>
							<td>{todo.id}</td>
							<td>{todo.title}</td>
							<td>{todo.completed ? "Tamamlandı" : "Yapılacak"}</td>
							<td>
								<Button
									className={`btn btn-sm btn-danger ${classes.actionButton} `}
									onClick={() => remove(todo)}
								>
									Sil
								</Button>
								<Button onClick={() => edit(todo)} className="btn btn-sm btn-warning">Düzenle</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		);
	};



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
		// selectedTodo.title = title
		// selectedTodo.completed = completed
		let s = { ...selectedTodo, title: title, completed: completed }
		let sInd = todos.findIndex(f => f.id === s.id)
		let todos2 = [...todos]
		todos2[sInd] = s
		setTodos(todos2)

		console.log("SaveEdited", "s", sInd,"s:" ,s);
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
				<table className="table" id="tEdit">
					<tbody>
						<tr>
							<td style={{ width: "3cm" }}  >
								<b>YAPILDI MI ? </b>
								a:{completed.toString()} &nbsp;
								<input id="tbIsDone" type="checkbox"
									onChange={handleCompleted} checked={completed} />
							</td>

							<td style={{ width: "80%" }}  >
								<input id="tbTitle" type="textbox" autoFocus style={{ width: "80%" }}
									onChange={handleTitle} value={title} />
								<br />{title}
							</td>

							<td style={{ width: "5%" }}>
								<Button onClick={() => SaveEdited()} >Kaydet</Button>
							</td>

							<td style={{ width: "5%" }}>
								<Button onClick={() => setId(undefined)}>Vazgeç</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}

	return (
		<div className={`${classes.container} container`}>
			{id !== undefined && id != null && renderEditForm()}
			<table className="table">
				{renderThead()}
				{renderBody()}
			</table>
		</div>
	);

};

export default TodoList;
