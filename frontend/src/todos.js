import './App.css';

const Todo=(props)=>{
    const {todoDetails,deleteTodo}=props
    const onDeleteTodo=()=>{
        deleteTodo(todoDetails.id)
    }
    return(
    <li className='todo-item-container' key={todoDetails.id}>
        <div className='label-container'>
            <p className='todo-item'>{todoDetails.text}</p>
            <div className='delete-icon-container'>
                <button className='delete-icon' onClick={() => onDeleteTodo()}>Delete</button>
            </div>
        </div>
    </li>)
}

export default Todo