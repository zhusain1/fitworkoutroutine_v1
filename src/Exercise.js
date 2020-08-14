import React, { Component } from 'react';
import {Card, Accordion, Button } from 'react-bootstrap';
import { Player } from 'video-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import "../node_modules/video-react/dist/video-react.css"; // import css

class Exercise extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.id,
            title: props.title,
            text: props.text,
            type: props.type 
        };
    }
    
    render() {
        return (
            <div>
                <Accordion defaultActiveKey="0">
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <h4> {this.state.title} </h4>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            { ReactHtmlParser(this.state.text) }
                            <br/>
                            <Player
                                playsInline
                                src={`https://workoutappapi.herokuapp.com/api/v1/workout-video/workoutVideo/download?workoutId=${this.state.id}`}
                                fluid={true}
                                width={350}
                                height={350}
                            />
                        </Card.Body>
                        </Accordion.Collapse>
                </Accordion>
            </div>
        );
    }
}

export default Exercise;