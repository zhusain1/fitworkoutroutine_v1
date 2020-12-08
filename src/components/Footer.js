import React, { Component } from 'react';
import '../App.css'
import dumbell from '../images/dumbell.png';

class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <p>
                     &copy; Fit Workout Routine 2020 
                </p>
                <img src={dumbell} alt="dumbell" width="40" height="40" className="Image"/> 
            </div>
        );
    }
}

export default Footer;