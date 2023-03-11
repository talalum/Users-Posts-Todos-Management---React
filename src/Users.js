import { useState, useEffect } from 'react'
import axios from 'axios'
import User from './User';
import './Style.css'
import { addItem } from './utils/userUtils'


const usersUrl = 'https://jsonplaceholder.typicode.com/users';

const Users = () => {
    const [users, setUsers] = useState([]);

    const [usersOriginal, setusersOriginal] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [displayAddUserForm, setDisplayAddUserForm] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', email: '' })

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: usersData } = await axios.get(usersUrl);
            setUsers(usersData);
            setusersOriginal(usersData);
        }
        fetchUsers();
    }, [])

    useEffect(() => {
        const afterSearch = usersOriginal.filter((user) => {
            return user.username.toLowerCase().includes(searchValue.toLowerCase())
        });
        setUsers(afterSearch);
    }, [searchValue]);


    const updateSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    const deleteUserFromUsersList = (id) => {
        const userIndex = users.findIndex((u) => u.id === id)
        console.log(userIndex);
        if (userIndex !== -1) {
            const newUsers = users;
            console.log("before", newUsers);
            newUsers.splice(userIndex, 1);
            console.log("hello", newUsers);
            setUsers(newUsers);
        }
    }

    const addUser = async () => {
        await addItem(usersUrl, newUser)
    }
    
    return (
        <div className='container'>
            <div className='users'>
                <div className='search'>
                    Search: <input type="text" onChange={updateSearchValue} />
                    <button className='btn' onClick={() => setDisplayAddUserForm(true)}>Add User</button>
                </div><br /><br />
                {
                    users.map(user => {
                        return <User key={user?.id} user={user} deleteUserCallback={deleteUserFromUsersList} />
                    })
                }
            </div>
            <div className={displayAddUserForm ? 'add-user-form' : 'hidden'}>
                Name: <input type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} /><br /><br />
                Email: <input type="text" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /><br />
                <div className='add-user-buttons'>
                    <button className='btn add-btn' onClick={addUser}>Add</button>
                    <button className='btn cancel-btn' onClick={() => setDisplayAddUserForm(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Users