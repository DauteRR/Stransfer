import React, { Component } from "react";
import * as MediaUtils from "../../utils/mediaUtils";
import {
  MAX_DIMENSIONS,
  getMaxDimensionsRespectingAspectRatio
} from "../../utils/dimensions";
import "./Camera.scss";

interface CameraProps {
  onNewPhoto: (snapshotBlob: HTMLVideoElement) => void;
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

  private _loadStream = async (stream: MediaStream) => {
    if (this._videoRef) {
      await MediaUtils.loadStreamToMedia(stream, this._videoRef);

      this.setState({
        stream,
        isRecording: true,
        errorMessage: ""
      });
    } else {
      this.setState({
        stream: null,
        isRecording: false,
        errorMessage:
          "Unable to get the video element. Must be a bug, this should never happen D:"
      });
    }
  };

  private _takePhoto = async () => {
    const video = this._videoRef;

    if (!this.state.isRecording || !video) {
      return Promise.reject();
    }

    this.props.onNewPhoto(video);
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

    // Max width and height
    let displayDimensions = MAX_DIMENSIONS;

    if (
      this._videoRef &&
      this._videoRef.videoWidth > 0 &&
      this._videoRef.videoHeight > 0
    ) {
      // Have the max width and height respect the original
      // aspect ratio to look good
      const aspectRatio = MediaUtils.getAspectRatio(this._videoRef);
      displayDimensions = getMaxDimensionsRespectingAspectRatio(aspectRatio);
    }

    return (
      <div className="camera-container">
        <div className="camera-container__camera">
          <video
            ref={this._setVideoRef}
            autoPlay
            width={MAX_DIMENSIONS.width}
            height={MAX_DIMENSIONS.height}
            role="application"
            aria-label="Camera"
            style={{
              maxWidth: `${displayDimensions.width}px`,
              maxHeight: `${displayDimensions.height}px`
            }}
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
