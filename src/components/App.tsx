import React, { Component } from 'react';
import Camera from './Camera';
import DownloadableImageList from './DownloadableImageList';
import * as MediaUtils from '../utils/mediaUtils';
import * as IdbUtils from '../utils/indexedDatabase';
import {
  getMaxDimensionsRespectingAspectRatio
} from '../utils/dimensions';

interface CameraState {
  imageData: object[];
}

class App extends Component<{}, CameraState> {

  cameraRef = React.createRef<Camera>();

  state = {
    imageData: []
  }

  componentDidMount() {
    IdbUtils.getAllImageData().then(imageDataList =>
      this.setState({imageData: imageDataList})
    );
  }

  getCameraComponent = () => {
    const camera = this.cameraRef.current;

    if (!camera)
      throw new Error("Camera reference error");

    return camera;
  }

  onNewPhoto = () => {
    const camera = this.getCameraComponent();
    const cameraAspectRatio = MediaUtils.getAspectRatio(camera.getVideoElement());
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
  }

  render() {
    return (
      <div className="app-container">
        <Camera
          ref={this.cameraRef}
          width={1000}
          height={1000}
          photoWidth={1000}
          photoHeight={1000}
        />
        <button onClick={this.onNewPhoto} >
          Take photo
        </button>
        <DownloadableImageList
          imageData={this.state.imageData}
        />
      </div>
    );
  }
}

export default App;
