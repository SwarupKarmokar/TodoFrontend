import { useEffect, useState } from "react"
import Todo from "./components/Todo"
import { addTodo, getTodos, deleteTodo, completeTodo } from './utils/HandleApi'

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoid, setTodoId] = useState("");

  useEffect(() => {
    getTodos(setTodos);
    // getSingleTodo();
  }, []);

  const getSingleTodo = async (id) => {
    let result = await fetch(`https://todoappbackend-iskb.onrender.com/${id}`);
    // let result = await fetch(`http://localhost:5000/api/todos/${id}`);
    result = await result.json();

    setIsUpdating(true);
    setText(result.text);
    setTodoId(id);
    // console.log(result.text)
  }

  const updateHandle = async (id) => {
    // console.log(name, price, company, category)
    // getSingleTodo(id);
    let result = await fetch(`https://todoappbackend-iskb.onrender.com/${id}`, {
      // let result = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' }
    })

    result = await result.json();
    // setTodos(result)
    getTodos(setTodos)
    setIsUpdating(false)
    setText("")
  }


  // const updateTodo = async (id, text) => {
  //   setIsUpdating(true);
  //   setText(text)
  //   setID(id)
  // }

  return (
    <div className="container">
      <h1>Todos</h1>
      <div className="top">
        <input type="text" placeholder="Add Todo" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={isUpdating ? () => updateHandle(todoid) : () => addTodo(text, setTodos, setText)}>
          {
            isUpdating ? "Update" : "Add"
          }
        </button>
      </div>

      {/* <div className="list">
        < Todo text="Hi" />
        < Todo text="Hi" />
        < Todo text="Hi" />
        < Todo text="Hi" />
      </div> */}

      <div className="list">
        {
          todos.map((todo) => < Todo todo={todo} text={todo.text} completeTodo={() => completeTodo(todo._id, setTodos)} deleteTodo={() => deleteTodo(todo._id, setTodos)} updateHandle={() => getSingleTodo(todo._id)} key={todo._id} />)
        }
      </div>
    </div>
  )
}

export default App
