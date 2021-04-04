import React from 'react';
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'

export const Video = (props) => {
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: props.src
      }
    ]
  }; 
  return (
    <>
      <Plyr source={videoSrc} />
    </>
  );
};

export default Video;
