import React, {Component} from 'react';
import DownloadableImage from './DownloadableImage';

interface DownloadableImageListProps {
  imageData: {
    dataUrl: string, 
    width: number, 
    height: number,
    date: string
  }[];
}


class DownloadableImageList extends Component<
  DownloadableImageListProps
> {

  createPhotoListItem(
    imageData: {
      dataUrl: string, 
      width: number, 
      height: number,
      date: string
    },
    index: number
  ) {
    return (
      <li key={index}>
        <DownloadableImage
          dataUrl={imageData.dataUrl}
          width={imageData.width}
          height={imageData.height}
          alt={String(index)}
          imageName={String(index)}
        />
      </li>
    );
  }

  render() {
    return (
      <ul>
        {this.props.imageData.map(this.createPhotoListItem)}
      </ul>
    );
  }
}

export default DownloadableImageList;