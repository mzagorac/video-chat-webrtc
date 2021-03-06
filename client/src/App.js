import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { getConnectedDevices, openCamera } from "./libs";
import "./App.css";

function App() {
  const videoPlayer = useRef();
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    (async function () {
      const socket = io("http://localhost:8000", {
        withCredentials: true,
      });
      const peerConnection = new RTCPeerConnection(configuration);

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket.emit("offer", offer);

      socket.on("message", async (message) => {
        if (message.offer) {
          const remoteDesc = new RTCSessionDescription(message.offer);
          await peerConnection.setRemoteDescription(remoteDesc);
          // peerConnection.setRemoteDescription(
          //   new RTCSessionDescription(message.offer)
          // );
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.emit("answer", answer);
        }
        if (message.answer) {
          const remoteDesc = new RTCSessionDescription(message.answer);
          await peerConnection.setRemoteDescription(remoteDesc);
        }
      });
    })();

    // (async function () {
    //   const cameras = await getConnectedDevices("videoinput");

    //   if (cameras && cameras.length > 0) {
    //     const stream = await openCamera(cameras[0].deviceId, 640, 480);
    //     videoPlayer.current.srcObject = stream;
    //   }
    // })();
  }, []);

  return (
    <div className="App">
      <h1>App</h1>
      <video ref={videoPlayer} autoPlay playsInline controls />
    </div>
  );
}

export default App;
