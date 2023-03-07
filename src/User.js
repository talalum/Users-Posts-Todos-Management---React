import { useState, useEffect } from 'react'
import { getTodoByUser } from './utils/todosUtils'
import { getPostsByUser } from './utils/postsUtils'
import { updateItem, deleteItem } from './utils/userUtils'
import Address from './Address';
import './Style.css'
import PostAndTodos from './PostAndTodos';

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const User = ({ user, deleteUserCallback}) => {
    const [userData, setuserData] = useState({
        id: user.id,
        username: user.username,
        email: user.email,
    });
    const [todos, setTodos] = useState([]);
    const [posts, setPosts] = useState([]);
    const [taskCompleted, setTaskCompleted] = useState(true);
    const [displayAddress, setDisplayAddress] = useState(false);


    const [showPosts, setShowPosts] = useState(false);
    const [showTodos, setShowTodos] = useState(false);

    const fetchTodos = async () => {
        const { data: todosData } = await getTodoByUser(todosUrl, user.id);
        const { data: postsData } = await getPostsByUser(postsUrl, user.id);
        setPosts(postsData);
        setTodos(todosData);
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    useEffect(() => {
        todos?.forEach(todo => {
            if (!todo?.completed) {
                console.log(todo);
                console.log("ifff");
                setTaskCompleted(false);
            }
            // if (todo?.userId == '1' || todo?.userId == '2'){
            //     console.log(todo);
            //     console.log("asss");
            //     setTaskCompleted(true)
            // }
        })
    }, [todos])
    

    const updateUser = async () => await updateItem(usersUrl, user.id, userData);

    const deleteUser = async () => {
        deleteUserCallback(user.id);
        await deleteItem(usersUrl, user.id)
    };

    const addAddress = (address) => {
        setuserData({ ...userData, address })
    }

    const clickOnId = async () => {
        setShowPosts(!showPosts);
        setShowTodos(!showTodos);
    }

    return (
        <div className={taskCompleted ? 'all-completed user' : 'not-all-completed user'}>
            <div className='user-details'>
                <div onClick={clickOnId}>ID: {user.id}<br /></div>
                <div>Name: <input type="text" value={userData.username} onChange={(e) => setuserData({ ...userData, username: e.target.value })} /><br /></div>
                <div>Email: <input type="text" value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} /><br /></div>
                <div className='buttons'>
                    <div className='other-data' >
                        <button onMouseEnter={() => setDisplayAddress(true)} onClick={() => setDisplayAddress(false)} className=' btn address-btn'>Show More Data</button>
                        <Address userAddress={user.address} displayAddress={displayAddress} callback={addAddress} />
                    </div>
                    <div className='edit-buttons'>
                        <button className='btn' onClick={updateUser}>Update Details</button>
                        <button className='btn delete-btn' onClick={deleteUser}>Delete User</button>
                    </div>
                </div>
            </div>
            <PostAndTodos posts={posts} todos={todos} showPosts={showPosts} showTodos={showTodos} userId={user.id}/>
        </div>
    )
}

export default User