import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Following extends Component{
    render(){
        return(
            <div>Following: {this.props.match.params.id}<br/>
            <Link to='/following/1'>first</Link><br/>
            <Link to='/following/2'>secound</Link>
            </div>
        );
    }
}

export default Following