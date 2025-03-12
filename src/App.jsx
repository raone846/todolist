import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);

  const URL = "https://jsonplaceholder.typicode.com/todos";

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

  return (
    <>
        <table>
          <thead>
            <tr>
              <th>UserId</th>
              <th>Id</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.userId}</td>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}

export default App
