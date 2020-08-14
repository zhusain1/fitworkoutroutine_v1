import React, { Component } from 'react';

class ListExercise extends Component {
    render() {
        return (
        <div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <a href={'/workoutplan/' + this.props.id }>
                        {this.props.title}
                    </a>
                </li>
            </ul>
        </div>
        );
    }
}

export default ListExercise;