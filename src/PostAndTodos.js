import React, { useState } from 'react'
import Todo from './Todo'
import Post from './Post'
import { addItem } from './utils/postsUtils'
import './Style.css'


const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

const PostAndTodos = ({ posts, todos, showPosts, showTodos, userId }) => {
    const [newTodo, setNewTodo] = useState({ userId: userId, title: '', completed: false })
    const [newPost, setNewPost] = useState({ userId: userId, title: '', body: '' });
    const [displayPostForm, setDisplayPostForm] = useState(false);
    const [displayTodoForm, setDisplayTodoForm] = useState(false);


    const addTodo = async () => {
        await addItem(todosUrl, newTodo)
        setDisplayTodoForm(false);
    }

    const addPost = async () => {
        await addItem(postsUrl, newPost)
        setDisplayPostForm(false);
    }

    return (
        <div className='posts-and-todos'>
            <div className={showPosts && !displayPostForm ? 'posts' : 'hidden'}>
                <div className='posts-todos-title'>
                    Posts- User {userId}
                    <button className='btn' onClick={() => setDisplayPostForm(true)}>Add Post</button>
                </div>
                <div className='post-list'>
                    {
                        posts?.map(p => {
                            return <Post key={p.id} post={p} />
                        })
                    }
                </div>
            </div>

            <div className={displayPostForm ? 'add-post' : 'hidden'}>
                Title: <input type="text" value={newPost.title} onChange={(e) => { setNewPost({ ...newPost, title: e.target.value }) }} /><br />
                {newPost.title}<br />
                Body: <input type="text" value={newPost.body} onChange={(e) => { setNewPost({ ...newPost, body: e.target.value }) }} /><br />
                {newPost.body}<br />
                <button className='btn add-btn' onClick={addPost}>Add</button>
                <button className='btn cancel-btn' onClick={() => setDisplayPostForm(false)}>Cancel</button>
            </div>

            <div className={(showTodos && !displayTodoForm) ? 'todos' : 'hidden'}>
                <div className='posts-todos-title'>
                    Todos- User {userId}
                    <button className='btn' onClick={() => setDisplayTodoForm(true)}>Add Todo</button>
                </div>
                <div className='todo-list'>
                    {
                        todos?.map(t => {
                            return <Todo key={t.id} todo={t} />
                        })
                    }
                </div>
            </div>

            <div className={displayTodoForm ? 'add-todo' : 'hidden'}>
                Title: <input type="text" value={newTodo.title} onChange={(e) => { setNewTodo({ ...newTodo, title: e.target.value }) }} /><br />
                {newTodo.title}<br />
                <button className='btn add-btn' onClick={addTodo}>Add</button>
                <button className='btn cancel-btn' onClick={() => setDisplayTodoForm(false)}>Cancel</button>
            </div>

        </div >
    )
}

export default PostAndTodos