import React, { Component } from "react";
import * as MediaUtils from "../../utils/mediaUtils";
import { IImageData } from "../../utils/IImageData";
import "./Camera.scss";

interface CameraProps {
  onNewPhoto: (snapshotBlob: IImageData) => void;
}

interface CameraState {
  stream: MediaStream | null;
  isRecording: boolean;
  errorMessage: string;
}

class Camera extends Component<CameraProps, CameraState> {
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

  private _videoRef: HTMLVideoElement | null = null;

  private _setVideoRef = (videoElement: HTMLVideoElement) =>
    (this._videoRef = videoElement);

  private _loadStream = (stream: MediaStream) => {
    const video = this._videoRef;

    if (!video) {
      this.setState({
        stream: null,
        isRecording: false,
        errorMessage: "Unable to get the video element"
      });
    } else {
      MediaUtils.loadStreamToMedia(stream, video);

      this.setState({
        stream,
        isRecording: true,
        errorMessage: ""
      });
    }
  };

  private _takePhoto = async () => {
    const video = this._videoRef;

    if (!this.state.isRecording || !video) {
      return Promise.reject();
    }

    const width = video.videoWidth;
    const height = video.videoHeight;
    const blob = await MediaUtils.getSnapshot(video, { width, height });
    const date = Date.now();
    const newImageData = { date, blob, width, height };

    this.props.onNewPhoto(newImageData);
  };

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="camera-container">
          <p className="camera-container__error-message">
            {this.state.errorMessage}
          </p>
        </div>
      );
    }

    return (
      <div className="camera-container">
        <div className="camera-container__camera">
          <video
            ref={this._setVideoRef}
            autoPlay
            role="application"
            aria-label="Camera"
          >
            Cannot show the camera. Maybe it is because this browser doesn't
            support the HTML5 "video" element
          </video>
        </div>
        <button
          className="camera-container__button"
          onClick={this._takePhoto}
          aria-label="Take photo"
          title="Take photo"
        />
      </div>
    );
  }
}

export default Camera;
