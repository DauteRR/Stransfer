import { IDimensions } from "./dimensions";

// Buffer to store the images so we can
// get their data URL
const canvasBuffer = document.createElement("canvas");

/**
 * Return a blob representing the given image or the current frame captured from
 * the given stream
 */
export function mediaToBlob(
  media: HTMLVideoElement | HTMLImageElement,
  { width, height }: IDimensions
): Promise<Blob> {
  canvasBuffer.width = width;
  canvasBuffer.height = height;
  const context = canvasBuffer.getContext("2d");
  if (!context) {
    return Promise.reject();
  }
  context.drawImage(media, 0, 0, width, height);

  return new Promise((res, rej) =>
    canvasBuffer.toBlob(blob => (blob ? res(blob) : rej()))
  );
}

/**
 * Assigns a media source to a media element (video or audio)
 */
export function loadStreamToMedia(
  stream: MediaStream,
  media: HTMLMediaElement
): Promise<HTMLMediaElement> {
  // Try to use srcObject. If it doesn't work
  // fallback to use URL.createObjectURL()
  try {
    media.srcObject = stream;
  } catch (_) {
    media.src = URL.createObjectURL(stream);
  } finally {
    return new Promise(res =>
      media.addEventListener("loadedmetadata", () => res(media), { once: true })
    );
  }
}

/**
 * Stops all the media sources from the given stream
 */
export function unloadMediaStream(stream: MediaStream) {
  [...stream.getTracks()].forEach(track => track.stop());
}

/**
 * Returns the relationship of the width to the height for the given media
 *
 * @param {HTMLVideoElement} media Media to get the width and height from
 */
export function getAspectRatio(media: HTMLVideoElement | HTMLImageElement) {
  if (media instanceof HTMLVideoElement) {
    return media.videoWidth / media.videoHeight;
    // if (media.videoWidth > 0 && media.videoHeight > 0) {
    // } else {
    //   throw new Error(
    //     `Invalid dimensions {videoWidth: ${media.videoWidth}, videoHeight: ${
    //       media.videoHeight
    //     }}. They must be numbers greater than 0`
    //   );
    // }
  } else {
    return media.width / media.height;
  }
}
