import React, { Component } from 'react';
import './App.css'
import logo from './logo-transparent.png';

class Brand extends Component{
    render(){
        return(
            <div className="Brand">
                <img src={logo} alt="Logo" width="280" height="120" className="Image"/>
            </div>
        );
    }
}

export default Brand;