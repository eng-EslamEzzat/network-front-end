import React,{Component} from 'react';
import Post from '../Posts/Post';
import './Home.css'

class Home extends Component{

    state={
        post:'',
    }

    postHandling = (e) =>{
        this.setState({
            post: e.target.value
        })
    }

    submitHandling = (e) =>{
        e.preventDefault();
        this.state.post && this.props.creatPost(this.state.post);
        this.setState({post:''})
    }

    render(){
        const {posts,users} =  this.props; 
        const postList = posts.map(post=>{
                return <Post key={post.id} post={post} user={users[post.publicher-1]} />
        })  
        return(
            <div id='Home'>
                <h1>All Posts</h1>
                <form onSubmit={this.submitHandling}>
                    <div className="mb-3">
                        <label htmlFor="post" className="form-label">New Post</label>
                        <textarea onChange={this.postHandling} value={this.state.post} type="text" id="post" className="form-control" rows='4'/>
                    </div>
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>
                <div className="alert alert-secondary" role="alert">
                {this.state.post}
                </div>
                {postList}
            </div>
        );
    }
}

export default Home