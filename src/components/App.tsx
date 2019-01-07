import React, { Component } from "react";
import Camera from "./Camera";
import DownloadableImageList from "./DownloadableImageList";
import * as MediaUtils from "../utils/mediaUtils";
import * as IdbUtils from "../utils/indexedDatabase";
import { getMaxDimensionsRespectingAspectRatio } from "../utils/dimensions";
import "../index.css";
import "./App.scss";

interface AppState {
  imageData: object[];
}

class App extends Component<{}, AppState> {
  cameraRef = React.createRef<Camera>();

  state = {
    imageData: []
  };

  componentDidMount() {
    IdbUtils.getAllImageData().then(imageDataList =>
      this.setState({ imageData: imageDataList })
    );
  }

  getCameraComponent = () => {
    const camera = this.cameraRef.current;

    if (!camera) throw new Error("Camera reference error");

    return camera;
  };

  onNewPhoto = () => {
    const camera = this.getCameraComponent();
    const cameraAspectRatio = MediaUtils.getAspectRatio(
      camera.getVideoElement()
    );
    const dimensions = getMaxDimensionsRespectingAspectRatio(cameraAspectRatio);
    const newImageData = {
      date: Date.now(),
      dataUrl: camera.takePhoto(),
      width: dimensions.width,
      height: dimensions.height
    };

    IdbUtils.saveImageData(newImageData);
    this.setState(prevState => ({
      imageData: [...prevState.imageData, newImageData]
    }));
  };

  deleteImage = (key: number) => {
    this.setState(prevState => {
      prevState.imageData.splice(
        prevState.imageData.findIndex((element: { date?: number }) => {
          return element.date === key;
        }),
        1
      );
      return {
        imageData: prevState.imageData
      };
    });

    IdbUtils.deleteImageData(key);
  };

  render() {
    return (
      <div className="centered">
        <div className="App__camera-container">
          <Camera ref={this.cameraRef} className="container" />
          <button
            onClick={this.onNewPhoto}
            className="camera-container__button button"
            aria-label="Take photo"
            title="Take photo"
          />
        </div>
        <DownloadableImageList
          imageData={this.state.imageData}
          deleteImage={this.deleteImage}
        />
      </div>
    );
  }
}

export default App;
