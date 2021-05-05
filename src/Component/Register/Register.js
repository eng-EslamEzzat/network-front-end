import React, { Component } from 'react';

class Register extends Component{

    state={
        username:'',
        email:'',
        password:'',
        confirmation:'',
    }

    submitHandling = (e) =>{
        e.preventDefault();
        this.state.password === this.state.confirmation?
        (this.props.registerHandling(this.state.username,this.state.password,this.state.email)):
        console.error("password must match confirmation")
        this.setState({
            username:'',
            email:'',
            password:'',
            confirmation:'',
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
                <h2>Register</h2>
                <form onSubmit={this.submitHandling}>
                    <div className="form-group mb-3">
                        <input onChange={this.changeHandling} value={this.state.username} className="form-control" autoFocus type="text" name="username" placeholder="Username"/>
                    </div>
                    <div className="form-group mb-3">
                        <input onChange={this.changeHandling} value={this.state.email} className="form-control" type="email" name="email" placeholder="Email Address"/>
                    </div>
                    <div className="form-group mb-3">
                        <input onChange={this.changeHandling} value={this.state.password} className="form-control" type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="form-group mb-3">
                        <input onChange={this.changeHandling} value={this.state.confirmation} className="form-control" type="password" name="confirmation" placeholder="Confirm Password"/>
                    </div>
                    <input className="btn btn-dark" type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

export default Register