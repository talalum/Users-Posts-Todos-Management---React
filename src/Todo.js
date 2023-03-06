import {useState} from 'react'
import {updateItem} from './utils/todosUtils'
import './Style.css'


const todosUrl = 'https://jsonplaceholder.typicode.com/todos';


const Todo = ({ todo }) => {
  const [todoS, setTodoS] = useState(todo)

  const markTaskCompleted = async () => {
    const obj = {...todo, completed: true};
    setTodoS({...todo, completed: true})
    await updateItem(todosUrl, todo.id, obj)
  }


  return (
    <div className='todo'>
      <div className='todos-details'>
      <div className='post-text'>
                <span>Title:</span> <span>{todoS.title.slice(0, 20)}</span> <br />
            </div>
            <div className='post-text'>
                <span>Completed:</span> <span>{todoS.completed.toString()}</span> <br />
            </div>
      </div>
    
      <button onClick={markTaskCompleted} className={!todoS.completed ? 'mark-complete-btn btn' : 'hidden' }>Mark Completed</button><br />
    </div>
  )
}

export default Todo