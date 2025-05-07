import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//user url https://playground.4geeks.com/todo/users/N8Atest
//create your first component
const Home = () => {
	
	const [toDoList, setToDoList] = useState([])
	const [newToDo, setNewToDo] = useState("")
	const [showX, setShowX] = useState(null)

	const handlePressKey = (e) => {
		if (e.key === "Enter") {
			setToDoList([...toDoList, newToDo])
			setNewToDo("")
		}
	}
	const handleDelete = (indexToDelete)=> {
		console.log("delete")
		setToDoList(toDoList.filter((elem, index) => index !== indexToDelete))
	}

useEffect(() => {
	//API GET request 
	fetch("https://playground.4geeks.com/todo/users/N8Atest" //POST
	)
	.then((response) => response.json())
	.then((data) => console.log(data)) // data --> obect {name, toDos:[]}
}, [])

return (
	<div className="box">
	<div className="text-center">
		<div id="title">ToDoList</div>
		<div id="container-toDo-list">
			<ul>
				<li>
					<input
					className="text-box"
					type="text"
					placeholder="What needs to be done?"
					value={newToDo}
					onChange={(e) => setNewToDo(e.target.value)}
						onKeyDown={handlePressKey} 
					/>
				</li>
				{
					toDoList.map((toDo, index) => (
						<li
						className="d-flex justify-content-between"
							onMouseOver = { () => setShowX(index)}

							>{toDo}
							{showX === index && <small className="delete" onClick={() => handleDelete(index)}>x</small>}
							
						</li>
					))
				}
				<li id="counter">{toDoList.length === 0 ? "No tasks left to do" : toDoList.length + "  Tasks left!"}</li>
			</ul>
		</div>
	</div>
	</div>
)

};

export default Home;