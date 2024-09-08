import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue])
      setInputValue('')
    }
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
    if (editIndex === index) {
      setEditIndex(null)
    }
  }

  const startEdit = (index) => {
    setEditIndex(index)
    setInputValue(tasks[index])
  }

  const updateTask = () => {
    if (inputValue.trim() !== '' && editIndex !== null) {
      const updatedTasks = tasks.map((task, i) =>
        i === editIndex ? inputValue : task
      )
      setTasks(updatedTasks)
      setEditIndex(null)
      setInputValue('')
    }
  }

  return (
    <div className="todo">
      <h1>ToDo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="add" onClick={editIndex !== null ? updateTask : addTask}>
        {editIndex !== null ? 'Actualizar' : 'Agregar'}
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <div>
              <button 
                className="edit"
                onClick={() => startEdit(index)}
              >
                Editar
              </button>
              <button 
                className="dlt"
                onClick={() => deleteTask(index)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
