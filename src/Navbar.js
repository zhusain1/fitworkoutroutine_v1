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
                        <Link to="/create">Create Exercise</Link>
                    </li>
                    <li>
                        <Link to="/edit">Edit Exercise</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Navbar;