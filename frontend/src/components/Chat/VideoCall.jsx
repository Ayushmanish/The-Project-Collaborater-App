import React, { useRef } from 'react';
import './VideoCall.css';

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const startVideoCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    // Add WebRTC signaling logic here to connect to remote peer
  };

  return (
    <div>
      <h2>Video Call</h2>
      <video ref={localVideoRef} autoPlay playsInline style={{ width: '300px' }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '300px' }} />
      <button onClick={startVideoCall}>Start Video Call</button>
    </div>
  );
};

export default VideoCall;
