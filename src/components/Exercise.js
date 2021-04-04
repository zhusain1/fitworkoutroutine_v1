import React, { Component } from 'react';
import {Card, Accordion, Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import Video from './Video';

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
                        <br/>
                        { ReactHtmlParser(this.state.text) }
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                           <Video
                                src={`https://workoutappapi.herokuapp.com/api/v1/workout-video/workoutVideo/download?workoutId=${this.state.id}`}
                            />
                        </Card.Body>
                        </Accordion.Collapse>
                </Accordion>
            </div>
        );
    }
}

export default Exercise;