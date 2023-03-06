import { useState, useEffect } from 'react'
import axios from 'axios'
import User from './User';
import './Style.css'



const usersUrl = 'https://jsonplaceholder.typicode.com/users';

const Users = ({showPostsAndTodos }) => {
    const [users, setUsers] = useState([]);

    const [usersOriginal, setusersOriginal] = useState([]);
    const [searchValue, setSearchValue] = useState('');

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
        console.log(users);
        setSearchValue(e.target.value);
    }

    const deleteUserFromUsersList = (id) => {
        const userIndex = users.findIndex((u) => u.id === id)
        console.log(userIndex);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            console.log(users);
            setUsers(users);
        }
    }

    return (
        <>
            <div className='users'>
                <div className='search'>
                    Search: <input type="text" onChange={updateSearchValue} />
                </div><br /><br />
                {
                    users.map(user => {
                        return <User key={user.id} user={user} deleteUserCallback={deleteUserFromUsersList}/>
                    })
                }
            </div>
        </>
    )
}

export default Users