import React, { useState } from 'react';
import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap';

const Notification = (props) => {
  const { buttonLabel } = props;
  const [show, setShow] = useState(true);

  const toggle = () => setShow(!show);

  return (
    <div>
      <Toast isOpen={show}>
        <ToastHeader toggle={toggle}>Upload successful</ToastHeader>
        <ToastBody>
          Your workout was saved
        </ToastBody>
      </Toast>
    </div>
  );
}

export default Notification;