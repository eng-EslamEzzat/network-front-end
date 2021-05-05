import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';

class Post extends Component {
    
    state={
        toggle:true,
        body:this.props.post.body,
        likes:this.props.post.likes.length

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

    likePost = (e)=>{
        const exist = this.props.post.likes.filter(like => like == localStorage.getItem('userid'))
        if (!exist.length){
            console.log(parseInt(localStorage.getItem('userid')))
            console.log([...this.props.post.likes])
        
            axios.put(`posts/${this.props.post.id}/`,{
                publicher: this.props.post.publicher,
                body:this.state.body,
                likes:[...this.props.post.likes,parseInt(localStorage.getItem('userid'))],
            })
            .catch(err => console.error(err))
            this.setState({
                likes:this.state.likes+1
            });
        }
        else{
            
            const likes = this.props.post.likes.filter(like => like != localStorage.getItem('userid'))
            console.log(likes);
            axios.put(`posts/${this.props.post.id}/`,{
                publicher: this.props.post.publicher,
                body:this.state.body,
                likes:likes,
            })
            this.setState({
                likes:this.state.likes-1
            });
        }
    }

    editForm = (post,user)=>{
        return(
            <div className="posts">
                <h3>{user&&user.username}</h3>
                <form onSubmit={this.submitHandling}>
                <textarea style={{width:'100%',height:'150px'}} onChange={this.changeHandling} value={this.state.body}/>
                <input type='submit'/>
                </form>
                <u>{post&&post.date}</u>
                <h5><span onClick={this.likePost}>Likes:</span> {post.likes&&this.state.likes}</h5>
            </div>
        );
    }

     form = (post,user)=>{
        return(
            <div key={post.id} className={'post '+post.id+"col col-6 "} role="alert">
                <h3>{user&&user.username}</h3>
                <p>{post&&post.body}</p>
                <u>{post&&post.date}</u>
                <h5><span onClick={this.likePost}>Likes:</span> {post.likes&&this.state.likes}</h5>
                <button className="btn btn-danger m-1" onClick={()=>this.deleteHandling(post.id)}>Delete</button>
                <button className="btn btn-warning" onClick={this.toggleState}>Edit</button>
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
