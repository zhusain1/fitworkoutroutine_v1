import React, { Component } from 'react';

class EditExercise extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <a href={'/edit/exercise/' + this.props.id }>
                        {this.props.title}
                    </a>
                </li>
            </ul>
        </div>
        );
    }
}

export default EditExercise;