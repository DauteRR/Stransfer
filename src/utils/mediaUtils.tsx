// Buffer to store the images so we can
// get their data URL
const canvasBuffer = document.createElement("canvas");

/**
 * Return a blob representing the image captured from the given media element
 *
 * @param {HTMLVideoElement} media The video to get the snapshot from
 * @param {Object} parameters {width, height} Dimensions of the image
 * @returns {Blob} The blob representing the snapshot
 */
export function getSnapshot(
  media: HTMLVideoElement,
  { width, height }: { width: number; height: number }
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
 *
 * @param {MediaStream} stream Stream to load into the given media element
 * @param {HTMLMediaElement} media Media where the given stream will be loaded (video or audio)
 */
export function loadStreamToMedia(
  stream: MediaStream,
  media: HTMLMediaElement
) {
  // Try to use srcObject. If it doesn't work
  // fallback to use URL.createObjectURL()
  try {
    media.srcObject = stream;
  } catch (_) {
    media.src = URL.createObjectURL(stream);
  }
}

/**
 * Stops all the media sources from the given stream
 */
export function unloadMediaStream(stream: MediaStream) {
  [...stream.getTracks()].forEach(track => track.stop());
}

/**
 * Returns the relationship of the width to the height for the given video
 *
 * @param {HTMLVideoElement} video Video to get the width and height from
 */
export function getAspectRatio(video: HTMLVideoElement) {
  if (video.videoWidth > 0 && video.videoHeight > 0) {
    return video.videoWidth / video.videoHeight;
  } else {
    throw new Error(
      `Invalid dimensions {videoWidth: ${video.videoWidth}, videoHeight: ${
        video.videoHeight
      }}. They must be numbers greater than 0`
    );
  }
}
