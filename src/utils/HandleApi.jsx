const baseUrl = 'https://todoappbackend-iskb.onrender.com'
// const baseUrl = 'http://localhost:5000/api/todos'


const getTodos = async (setTodos) => {
    let result = await fetch(baseUrl);
    result = await result.json();
    // console.log(result)

    setTodos(result);
}

const addTodo = async (text, setTodos, setText) => {
    let result = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' }
    })

    result = await result.json();
    getTodos(setTodos);
    setText("");
}


// const changeTodo = async (id, text, setTodos, setText, setIsUpdating) => {
//     let result = await fetch(`${baseUrl}/${id}`, {
//         method: "PUT",
//         body: JSON.stringify({ text }),
//     })

//     result = await result.json();
//     setText("");
//     setIsUpdating(false);
//     getTodos(setTodos);
// }

const deleteTodo = async (id, setTodos) => {
    let result = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    })

    result = await result.json();
    setTodos(todos => todos.filter(todo => todo._id !== result._id));

    getTodos(setTodos)
}



const completeTodo = async (id, setTodos) => {
    let result = await fetch(`${baseUrl}/toggle/${id}`, {
        method: 'PUT'
    })


    result = await result.json();
    // console.log(result)

    setTodos(todos => todos.map(todo => {
        if (todo._id === result._id) {
            todo.complete = result.complete;
        }
        return todo;

    }))
}

export { getTodos, addTodo, deleteTodo, completeTodo }