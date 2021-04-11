import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';

class Post extends Component {
    
    state={
        toggle:true,
        body:this.props.post.body
    }

     toggleState = ()=>{
         this.setState({toggle: !this.state.toggle})
    }

     deleteHandling = (id)=>{
        this.props.deletePost(id);
        axios.delete(`posts/${id}/`)
        .catch(err => console.error(err))
    }

    changeHandling = (e)=>{
        this.setState({
            body: e.target.value
        })
    }
    
    submitHandling = (e)=>{
        e.preventDefault();
        const {post} = this.props;
        this.props.editPost(post.id,this.state.body)
        this.toggleState();
        axios.put(`posts/${post.id}/`,{
            publicher: post.publicher,
            body:this.state.body,
        })
        .catch(err => console.error(err))
    }

    editForm = (post,user)=>{
        return(
            <div>
                <h3>{user&&user.username}</h3>
                <form onSubmit={this.submitHandling}>
                <textarea style={{width:'100%',height:'150px'}} onChange={this.changeHandling} value={this.state.body}/>
                <input type='submit'/>
                </form>
                <u>{post&&post.date}</u>
                <h5>Likes: {post.likes&&post.likes.length}</h5>
            </div>
        );
    }

     form = (post,user)=>{
        return(
            <div key={post.id} className={'post '+post.id} role="alert">
                <h3>{user&&user.username}</h3>
                <p>{post&&post.body}</p>
                <u>{post&&post.date}</u>
                <h5>Likes: {post.likes&&post.likes.length}</h5>
                <button onClick={()=>this.deleteHandling(post.id)}>Delete</button>
                <button onClick={this.toggleState}>Edit</button>
            </div>
        );
    }


    render(){
        const {post,user} = this.props;
        return (
            <>{this.state.toggle?this.form(post,user):this.editForm(post,user)}</>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    deletePost: (id)=> dispatch({type:'DELETE',id:id}),
    editPost: (id,body)=> dispatch({type:'EDIT',id:id,body:body}),
})

export default connect(null,mapDispatchToProps)(Post)
