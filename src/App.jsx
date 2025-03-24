import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    userId: 1,
    id: todos.length + 1,
    title: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const URL = "https://jsonplaceholder.typicode.com/todos";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos,{ ...todo, id: todos.length + 1}]);
    setTodo({...todo, title:""});
  };

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(URL);
        if(!response.ok){
          throw new Error("Failed to fecth data!");
        }
        const data = await response.json();
        setTodos(data.slice(0, 10));
      } catch(error){
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(todos);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  return (
    <>
      <h2 style={{color:"coral"}}>Input Todo</h2>
      <form action="submit" onSubmit={handleSubmit}>
        <input type='text' value={todo.title} onChange={(e) => setTodo({
          ...todo,
          title: e.target.value
        })}/>
        <button type='submit'>Submit</button>
      </form>
        <table>
          <thead>
            <tr>
              <th>UserId</th>
              <th>Id</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.userId}</td>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*
          Add pagination here
        */}
        <div>
          <button onClick={() => setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))}>Previous</button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages))}>Next</button>
        </div>
    </>
  )
}

export default App
