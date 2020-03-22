import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
    render() {
        return (
            <div className="NavBar">
                <ul>
                    <li>
                        <Link to="/">Workouts</Link>
                    </li>
                    <li>
                        <Link to="/create">Create Exercise</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Navbar;