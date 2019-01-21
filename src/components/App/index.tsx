import React, { Component } from "react";
import Camera from "../Camera/Camera";
import DownloadableImageList from "../DownloadableImageList";
import * as IdbUtils from "../../utils/indexedDatabase";
import { IImageData } from "../../utils/IImageData";
import "./App.scss";

interface AppState {
  imageData: IImageData[];
}

class App extends Component<{}, AppState> {
  state = {
    imageData: []
  };

  componentDidMount() {
    IdbUtils.getAllImageData().then(imageDataList =>
      this.setState({ imageData: imageDataList })
    );
  }

  deleteImage = (key: number) => {
    IdbUtils.deleteImageData(key);
    this.setState(({ imageData }) => ({
      imageData: imageData.filter(({ date }) => date !== key)
    }));
  };

  onNewPhoto = (newImageData: IImageData) => {
    IdbUtils.saveImageData(newImageData);
    this.setState(({ imageData }) => ({
      imageData: [...imageData, newImageData]
    }));
  };

  render() {
    return (
      <div className="centered">
        <Camera onNewPhoto={this.onNewPhoto} />
        <DownloadableImageList
          imageData={this.state.imageData}
          deleteImage={this.deleteImage}
        />
      </div>
    );
  }
}

export default App;
