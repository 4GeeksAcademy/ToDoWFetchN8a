import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//user url https://playground.4geeks.com/todo/users/N8Atest
//create your first component
const Home = () => {
	const [toDoList,setToDoList] = useState(["ABC","DEF"]);
	const [newToDo,setNewToDo] = useState("");
	const [flagDelete,setFlagDelete] = useState(null);
	const handlePressKey = (e)=> {
		if (e.key === "Enter"){
			fetch("https://playground.4geeks.com/todo/todos/N8Atest",{
				method:"POST",
				body: JSON.stringify({
					"label":newToDo,
						"is_done":false
					}),
				headers:{
					"Content-Type":"application/json"
				}
			})
			.then((response)=> response.json())
			//.then((data)=> console.log(data))

			setNewToDo("");
			fetch("https://playground.4geeks.com/todo/users/N8Atest")
			.then((response)=> response.json())
			.then((data)=> setToDoList(data.todos))
			.then((data)=>console.log(data.todos))
			//setTodoList([...todoList,newTodo]);
		}
		console.log([...toDoList,newToDo]);
	}
	const handleDelete = (taskId)=> {
		//setTodoList(todoList.filter((item,idx)=> idx !== taskId ));
		fetch("https://playground.4geeks.com/todo/todos/"+taskId,{
			method : "DELETE"
		})
		.then((response) => {
			if(response.ok){
				console.log("Deleted task")
				fetch("https://playground.4geeks.com/todo/users/N8Atest")
				.then((response)=> response.json())
				.then((data)=> setToDoList(data.todos))
			}
		})
		//console.log("Eliminar elemento");
	}
	//console.log(newTodo);

const panic= async ()=>{
		fetch("https://playground.4geeks.com/todo/users/N8Atest",{
			method:"DELETE"
		})
		.then( async (response)=>{
			if(response.ok){
				console.log("Eliminacion correcta")
				await fetch("https://playground.4geeks.com/todo/users/N8Atest",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					}
				})
			}
		}).then(async ()=>{
			 await fetch("https://playground.4geeks.com/todo/users/N8Atest")
				.then((response)=> response.json())
				.then((data)=> setToDoList(data.todos)
				)
		})
	}
	useEffect(()=>{
		fetch("https://playground.4geeks.com/todo/users/N8Atest")
		.then((response)=> response.json())
		.then((data)=> setToDoList(data.todos))
	},[])

return (
	<div className="box container-fluid">
	<div className="text-center">
		<div id="title">ToDoList</div>
		<div id="container-toDo-list">
			<ul>
				<li>
					<input
					className="text-box container-fluid"
					type="text"
					placeholder="What needs to be done?"
					value={newToDo}
					onChange={((e) => setNewToDo(e.target.value))}
						onKeyDown={(e)=>(handlePressKey(e))} 
					/>
				</li>
				{
					toDoList.map((item) => (
						<li key={item.id} className="d-flex justify-content-between py-2 px-5 w-100 border-bottom border-1 position-relative bg-light"
							onMouseOver = { () => (setFlagDelete(item.id))}
							onMouseLeave={()=> (setFlagDelete(null))}>
							<span className="py-2">{item.label}</span>
							{flagDelete === item.id && <small className="mx-3 text-end position-absolute top-50 end-0 translate-middle-y" onClick={()=>(handleDelete(item.id))}>x</small>} 
							
						</li>
					))
				}
				<li id="counter">{toDoList.length === 0 ? "No tasks left to do" : toDoList.length + "  Tasks left!"}</li>
			</ul>
		</div>
	</div>
	<button className="button button-danger" onClick={()=>panic()}>PANIC</button>
	</div>
)

};

export default Home;