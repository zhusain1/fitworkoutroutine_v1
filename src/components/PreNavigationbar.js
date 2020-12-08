import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand';
class PreNavigationbar extends Component {
    render() {
        return (
            <div>
                <div className="PreNavBar">
                    <Link to="/">
                        <Brand/>
                    </Link>
                </div>
            </div>
        );
    }
}
export default PreNavigationbar;