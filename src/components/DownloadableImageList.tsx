import React, { Component } from "react";
import DownloadableImage from "./DownloadableImage";
import { IImageData } from "../utils/IImageData";

interface DownloadableImageListProps {
  imageData: IImageData[];
  deleteImage: Function;
}

class DownloadableImageList extends Component<DownloadableImageListProps> {
  createPhotoListItem = (
    { blob, width, height, date }: IImageData,
    index: number
  ) => {
    const dataUrl = URL.createObjectURL(blob);

    return (
      <li key={index} className="result-container">
        <DownloadableImage
          dataUrl={dataUrl}
          width={width}
          height={height}
          alt={String(index)}
          imageName={String(index)}
          date={date}
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
