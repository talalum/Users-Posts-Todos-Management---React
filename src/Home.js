import React from 'react'
import Users from './Users'
import { useState, useEffect } from 'react'

import PostAndTodos from './PostAndTodos'


const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';


const Home = () => {   
    return (
        <div>
            <Users/>
            <PostAndTodos/>
        </div>
    )
}

export default Home