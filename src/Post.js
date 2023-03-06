import React from 'react'
import './Style.css'


const Post = ({ post }) => {
    return (
        <div className='post'>
            <div className='post-text'>
                <span>Title:</span> <span>{post.title.slice(0,30)}</span> <br />
            </div>
            <div className='post-text'>
                <span>Body:</span> <span>{post.body.slice(0, 30)}</span> <br />
            </div>
        </div>
    )
}

export default Post