// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Todo from './todos';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    };

    const addTodo = async () => {
        if (newTodo.trim()) {
            const newId = uuidv4();
            const newTask = { id: newId, text: newTodo };

            try {
                const response = await axios.post('http://localhost:5000/todos', newTask);
                setTodos([...todos, response.data]);
                setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div class="todos-bg-container">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="todos-heading">Todos</h1>
                        <h1 class="create-task-heading">
                            Create <span class="create-task-heading-subpart">Task</span>
                        </h1>
                        <input type="text" id="todoUserInput" class="todo-user-input"
                        value={newTodo}
                        onChange={handleInputChange}
                        placeholder="Add a new todo"/>
                        <button class="button" id="addTodoButton" onClick={addTodo}>Add</button>
                        <h1 class="todo-items-heading">
                            My <span class="todo-items-heading-subpart">Tasks</span>
                        </h1>
                        <ul class="todo-items-container">
                        {todos.map(todo => (
                            <Todo todoDetails={todo} deleteTodo={deleteTodo}/>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
