import React, { Component } from 'react';
import {Card, Accordion, Button } from 'react-bootstrap';

class Exercise extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Accordion>
                    <Card className="card  w-75">
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <h4> {this.props.title} </h4>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {this.props.text}
                            <br/>
                            <video width="350" controls>
                                <source src={`http://localhost:8080/api/v1/workout-video/workoutVideo/download?workoutId=${this.props.id}`} type="video/mp4"/>
                                Your browser does not support HTML5 video.
                            </video>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        );
    }
}

export default Exercise;