import React, { useState, useRef, useEffect } from "react";
import {Camera} from "react-camera-pro";
import "../../stylesheets/gallery/CameraComponent.css"

 
function CameraComponent() {
    const camera = useRef(null);
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const [image, setImage] = useState(null);
  return (
      <div>
          
        <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras}/>
        <button id="cameraBtn" onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
        <div id="tookImg">
        <img id="taken" src={image} alt='skateboard'/>
        </div>
        <button
        hidden={numberOfCameras <= 1}
        onClick={() => {
          camera.current.switchCamera(); 
         }}>

         </button>

    </div>
  )
}

export default CameraComponent
