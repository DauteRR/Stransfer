/** 
 * Video and images maximum dimensions. If we were to allow
 * arbitrary large video or images the app would be much slower.
 * 
 * Also these needs to be square because ML5js styleTransfer needs
 * square images
 */
export const MAX_DIMENSIONS = { width: 300, height: 300 };

/**
 * Returns whether the given dimensions are in the right bounds or not
 * 
 * @param {Object} dimensions {width, height} Dimensions to check
 * @returns Whether the given dimensions are in the right bounds or not
 */
export function areCorrectDimensions(
  dimensions: {width:number, height:number}
) {
  return (
    dimensions.width > 0 &&
    dimensions.width <= MAX_DIMENSIONS.width &&
    dimensions.height > 0 &&
    dimensions.height <= MAX_DIMENSIONS.height
  );
}

/**
 * Returns the maximum dimensions respecting the given aspect ratio
 *
 * @param {Number} aspectRatio Width to height relationship that dimensions need to respect
 * @returns {Object} Dimensions respecting the aspect ratio
 */
export function getMaxDimensionsRespectingAspectRatio(aspectRatio: number) {
  const result = { ...MAX_DIMENSIONS };

  // The dimensions will be the maximum allowed but respecting
  // the aspect ratio given (else the media will look squeezed)
  if (aspectRatio < 1) {
    // The width needs to be <= than the height
    result.width *= aspectRatio;
  } else {
    // The height needs to be <= than the width
    result.height /= aspectRatio;
  }

  return result;
}