import React, { useState } from 'react';
import './App.css'
import info from './info.png';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const Info = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
        <input type="image" src={info} alt="info"  id="info"  width="45" height="45"/>
        <Popover placement="bottom" isOpen={popoverOpen} target="info" toggle={toggle}>
        <PopoverHeader>About Workout Routine</PopoverHeader>
        <PopoverBody>
            Select a body part to workout with video tutorials for each exercise.
            You can create an account to upload or edit existing exercises by clicking 
            on 'Manage Exercises'.
        </PopoverBody>
        </Popover>
    </div>
  );
}

export default Info;