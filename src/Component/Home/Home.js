import axios from 'axios';
import React,{Component} from 'react';
import { connect } from 'react-redux';
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

    creatPost = (post)=>{
        axios.post(`posts/`,
        {body:post,publicher:localStorage.getItem('userid')})
        .then((res) =>{
          this.props.fetchPost(res.data)
        })
        .catch(err => console.error(err))
      }

      
    submitHandling = (e) =>{
        e.preventDefault();
        this.state.post && this.creatPost(this.state.post)
        this.setState({post:''})
    }

    render(){
        const {posts,users} =  this.props; 
        const postList = posts.slice(0).reverse().map(post=>{
                return <Post key={post.id} post={post} user={users[post.publicher-1]} />
        })  
        return(
            <div id="Home" className="container">
                <h1>All Posts</h1>
                <form onSubmit={this.submitHandling}>
                    <div className="mb-3">
                        <label htmlFor="post" className="form-label">New Post</label>
                        <textarea onChange={this.postHandling} value={this.state.post} type="text" id="post" className="form-control" rows='4'/>
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Post</button>
                </form>
                <div className="alert alert-secondary" role="alert">
                {this.state.post}
                </div>
                <div className="row justify-content-center">{postList}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    posts:state.posts,
    users:state.users,
  })
  
const mapDispatchToProps = (dispatch) => ({
    fetchPost: (posts)=> dispatch({type:'POSTS',posts:[posts]}),
})


  
export default connect(mapStateToProps,mapDispatchToProps)(Home);