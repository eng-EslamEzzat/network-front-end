import React, { Component } from 'react';

class Login extends Component{


    state={
        name:'',
        password:"",
    }


    loginHandling = (e) => {
        e.preventDefault();
        this.props.loginHandling(this.state.name,this.state.password)
        this.setState({
            name:'',
            password:''
        })
    }

    changeHandling = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit={this.loginHandling}>
                    <div className="form-group">
                        <input onChange={this.changeHandling} name="name" value={this.state.name} autoFocus className="form-control" type="text" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <input onChange={this.changeHandling} name="password" value={this.state.password} className="form-control" type="password" placeholder="Password"/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}

export default Login