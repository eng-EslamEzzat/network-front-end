import React,{Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import Nav from './Component/Nav/Nav';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Following from './Component/Following/Following';
import axios from 'axios';
import { connect } from 'react-redux';
import ProfilePage from './Component/ProfilePage/ProfilePage';

class App extends Component {

  loginHandling = (user,pass) => {
    axios.post(`api-token-auth`,
    {username:user,password:pass})
    .then(res =>{
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('username',res.data.username);
        localStorage.setItem('userid',res.data.user_id);
        this.props.changeName(res.data.usrename);
        this.props.changeToken(res.data.token);
        console.log(res.data)
        
    })
    .catch(err => console.error(err))

  }

  registerHandling = (username,password,email)=>{
    axios.post(`users/`,
    {username:username,password:password,email:email})
    .then(res =>{
      window.location.href="http://localhost:3000/login";
    })
    .catch(err => console.error(err))
  }

  creatPost = (post)=>{
    axios.post(`posts/`,
    {body:post,publicher:localStorage.getItem('userid')})
    .then((res) =>{
      this.props.fetchPost(res.data)
    })
    .catch(err => console.error(err))
  }

  componentDidMount(){  
    axios.all([
      axios.get(`posts/`),
      axios.get(`users/`),
    ])
    .then(axios.spread((posts,users) => {
      this.props.fetchPost(posts.data)
      this.props.fetchUser(users.data)
    }))
    .catch(error=> console.error(error))

  }
  
  logoutHandling = ()=>{localStorage.clear(); this.props.cookiesClear();}

  render(){
    axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token 5ea0775ab2541b53517e329c5c1fad232899f75f'
      };
    return (
      <div className="App">
          
          <BrowserRouter>
          <Nav logoutHandling={this.logoutHandling} username={this.props.username}/> 
          
          <Route path='/' exact  component={Home} />
          {this.props.token?
            <Switch>
            <Route path={'/'+localStorage.getItem('username')} exact component={ProfilePage} />
            <Route path='/following' exact component={Following} />
            <Route path='/following/:id' exact component={Following} />
            <Redirect from="/:any" to="/"/>
            </Switch>:
            <Switch>
            <Route path='/login' exact component={()=><Login loginHandling={this.loginHandling}/>} />
            <Route path='/register' exact render={()=><Register registerHandling={this.registerHandling}/>} />
            <Redirect from="/:any" to="/login"/>
            </Switch>
          } 
          </BrowserRouter>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  posts:state.posts,
  users:state.users,
  token: state.token,
  username: state.username,
})

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (users)=> dispatch({type:'USERS',users:users}),
    fetchPost: (posts)=> dispatch({type:'POSTS',posts:posts}),
    changeName: (username)=> dispatch({type:'USERNAME',username:username}),
    changeToken: (token)=> dispatch({type:'TOKEN',token:token}),
    cookiesClear: ()=> dispatch({type:'CLEAR'})
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
