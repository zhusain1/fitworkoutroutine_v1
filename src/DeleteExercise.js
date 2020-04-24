import React, { Component } from 'react';

class DeleteExercise extends Component {
    render() {
        return (
        <div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <a href={'/delete/exercise/' + this.props.id }>
                        {this.props.title}
                    </a>
                </li>
            </ul>
        </div>
        );
    }
}

export default DeleteExercise;