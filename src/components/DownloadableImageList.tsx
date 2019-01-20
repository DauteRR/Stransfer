import React, { Component } from "react";
import DownloadableImage from "./DownloadableImage";

interface DownloadableImageListProps {
  imageData: {
    dataUrl: string;
    width: number;
    height: number;
    date: number;
  }[];
  deleteImage: Function;
}

class DownloadableImageList extends Component<DownloadableImageListProps> {
  createPhotoListItem = (
    imageData: {
      dataUrl: string;
      width: number;
      height: number;
      date: number;
    },
    index: number
  ) => {
    return (
      <li key={index} className="result-container">
        <DownloadableImage
          dataUrl={imageData.dataUrl}
          width={imageData.width}
          height={imageData.height}
          alt={String(index)}
          imageName={String(index)}
          date={imageData.date}
          deleteImage={this.props.deleteImage}
        />
      </li>
    );
  };

  render() {
    return (
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        {this.props.imageData.map(this.createPhotoListItem)}
      </ul>
    );
  }
}

export default DownloadableImageList;
