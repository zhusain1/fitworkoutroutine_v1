import React, { Component } from 'react';
import {Card, Accordion, Button } from 'react-bootstrap';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css

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
                            <Player
                                playsInline
                                src={`https://workoutappapi.herokuapp.com/api/v1/workout-video/workoutVideo/download?workoutId=${this.props.id}`}
                                fluid={true}
                                width={350}
                                height={350}
                            />
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        );
    }
}

export default Exercise;