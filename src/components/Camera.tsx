import React, { Component } from "react";
import * as MediaUtils from "../utils/mediaUtils";

interface CameraProps {
  className: string;
}

interface CameraState {
  stream: MediaStream | null;
  isRecording: boolean;
  errorMessage: string;
}

class Camera extends Component<CameraProps, CameraState> {
  private _videoRef = React.createRef<HTMLVideoElement>();

  state = {
    stream: null,
    isRecording: false,
    errorMessage: ""
  };

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(this._loadStream)
      .catch(_ => {
        this.setState({
          isRecording: false,
          errorMessage: "Access to camera not granted"
        });
      });
  }

  componentWillUnmount() {
    const { stream } = this.state;

    if (stream) {
      MediaUtils.unloadMediaStream(stream);
    }
  }

  private _loadStream = (stream: MediaStream) => {
    const video = this.getVideoElement();

    if (!video) {
      return;
    }

    if (!this.state.isRecording) {
      MediaUtils.loadStreamToMedia(stream, video);

      this.setState({
        stream,
        isRecording: true,
        errorMessage: ""
      });
    }
  };

  getVideoElement(): HTMLVideoElement | null {
    return this._videoRef.current;
  }

  takePhoto = () => {
    const video = this.getVideoElement();

    if (!this.state.isRecording || !video) {
      return Promise.reject();
    }

    return MediaUtils.getSnapshot(video, {
      width: video.videoWidth,
      height: video.videoHeight
    });
  };

  render() {
    if (this.state.errorMessage) {
      return (
        <div className={this.props.className}>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    return (
      <div className={this.props.className}>
        <video
          ref={this._videoRef}
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
