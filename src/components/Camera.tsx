import React, { Component } from "react";
import * as MediaUtils from "../utils/mediaUtils";

interface CameraProps {
  className: string;
}

interface CameraState {
  isRecording: boolean;
  errorMessage: string;
}

class Camera extends Component<CameraProps, CameraState> {
  videoRef = React.createRef<HTMLVideoElement>();

  state = {
    isRecording: false,
    errorMessage: ""
  };

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(cameraStream => this.loadStream(cameraStream))
      .catch(_ => {
        this.setState({
          isRecording: false,
          errorMessage: "Access to camera not granted"
        });
      });
  }

  getVideoElement() {
    const video = this.videoRef.current;

    if (!video) throw new Error("Video reference error");

    return video;
  }

  loadStream = (stream: MediaStream) => {
    if (!this.state.isRecording) {
      MediaUtils.loadStreamToMedia(stream, this.getVideoElement());

      this.setState({
        isRecording: true,
        errorMessage: ""
      });
    }
  };

  takePhoto = () => {
    if (!this.state.isRecording) {
      return null;
    }

    return MediaUtils.mediaToDataUrl(this.getVideoElement(), {
      width: this.getVideoElement().videoWidth, //this.props.photoWidth,
      height: this.getVideoElement().videoHeight //this.props.photoHeight
    });
  };

  render() {
    if (this.state.errorMessage) {
      return (
        <div>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    return (
      <div style={{ display: "flex" }}>
        <video
          ref={this.videoRef}
          autoPlay
          role="application"
          aria-label="Camera"
        >
          Cannot show the camera. Maybe it is because this browser doesn't
          support the HTML5 "video" element
        </video>
      </div>
    );
  }
}

export default Camera;
