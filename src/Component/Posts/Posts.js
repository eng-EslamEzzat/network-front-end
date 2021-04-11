import React, { Component } from 'react'
import {context} from '../../App';

class Posts extends Component {

    state={
        users:[]
    }

    render() {
        return (
            <>
            <context.Consumer>
            {  posts =>{
                    return(
                        posts[0] && posts[0].map(post => {
                        return(
                            <div key={post.id} className="" role="alert">
                                <h3>{posts[1][post.publicher].username}</h3>
                                <p>{post.body}</p>
                                <u>{post.date}</u>
                                <h5>Likes: {post.likes.length}</h5>
                            </div>
                            );
                    }));
                }
            }
            </context.Consumer>
            </>
        )
    }
}

export default Posts
