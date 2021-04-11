import React from 'react';
import {Link} from 'react-router-dom'

function Nav(props){
    const token = localStorage.getItem('token');

    const logoutHandling = () =>{
        props.logoutHandling();
    }
    return(
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Network</Link>
                <ul className="navbar-nav mr-auto">
                        {token && <li className="nav-item">
                            <Link className="nav-link" style={{textTransform:'capitalize'}} to="/"><strong>{props.username}</strong></Link>
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
          </nav>
          
    );
}

export default Nav