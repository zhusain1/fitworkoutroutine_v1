import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
    render() {
        return (
            <div className="NavBar">
                <ul className="navItems">
                    <li>
                        <Link to="/">Workouts</Link>
                    </li>
                    <li>
                        <Link to="/login">Manage Exercises</Link>
                    </li>
                    <li>
                        <Link to="/createAccount">Create Account</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Navbar;