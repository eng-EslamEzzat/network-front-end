import React from 'react';
import {Link} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import { Form, FormControl, Navbar } from 'react-bootstrap';


function Nav(props){
    const token = localStorage.getItem('token');
    const { loginWithRedirect } = useAuth0();
    

    const logoutHandling = () =>{
        props.logoutHandling();
    }
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Network</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                        {token && <li className="nav-item">
                            <Link className="nav-link" style={{textTransform:'capitalize'}} to={"/"+props.username}><strong>{props.username}</strong></Link>
                        </li>}
                        <li className="nav-item">
                        <Link className="nav-link" to="/">All Posts</Link>
                        </li>
                        {token && <li className="nav-item">
                            <Link className="nav-link" to="/following">Following</Link>
                        </li>}
                        {token?
                        <li className="nav-item">
                            <Link onClick={logoutHandling} className="nav-link" to="/logout">Log Out</Link>
                        </li>:
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Log In</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        </>
                        }
                </ul>
                </div>
            </div>
          </nav>
          </>
          
    );
}

export default Nav