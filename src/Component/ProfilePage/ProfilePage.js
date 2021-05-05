import axios from 'axios';
import { post } from 'jquery';
import React, { Component} from 'react'
import { connect } from 'react-redux';
import Post from '../Posts/Post';
import './ProfilePage.css'

class ProfilePage extends Component {
    state={
        follow:[],
        followers:0,
        followings:0,
        posts:0
    }
            
    fun = ()=>{
        const posts = this.props.posts.filter(b=>  b.publicher == localStorage.getItem('userid'))
        this.setState({posts: posts.length})

    }

    async componentDidMount(){
        await axios.get('followup/')
        .then(res => this.setState({follow:res.data}))
        .catch(err=>console.error(err))
        
        const followers = this.state.follow.filter(f=>f.following == localStorage.getItem('userid'))
        const followings = this.state.follow.filter(f=>f.follower == localStorage.getItem('userid'))
        this.setState({followers:followers.length})
        this.setState({followings:followings.length});
        await this.fun()
        // console.log( posts)
        
    }

    
    render(){
        const {posts,users} = this.props;
        const posts0 = posts.filter(p=>p.publicher==localStorage.getItem('userid'))
        const postList = posts0.slice(0).reverse().map(post=>{
            return <Post key={post.id} post={post} user={users[post.publicher-1]} />
        })  
        return (
            <>
                <h2>{localStorage.getItem('username')}</h2>
                <ul>
                    <li><span><span>{this.state.posts}</span> posts</span></li>
                    <li><a href="#"><span>{this.state.followers}</span> followers</a></li>
                    <li><a href="#"><span>{this.state.followings}</span> following</a></li>
                </ul>
                <div className="posts">
                {postList}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    posts:state.posts,
    users:state.users
  })

export default connect(mapStateToProps)(ProfilePage);
