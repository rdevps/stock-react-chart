export const getPosision = (
  index,
  shapesList,
  moreProps,
  location,
  shapeWidth,
  shapeHeight,
  numType = false,
) => {
  if (!shapeHeight) {
    shapeHeight = shapeWidth;
  }
  let cx = 0;
  let cy = 0;
  if (!document.getElementById('graphBlock')) {
    return { cx, cy };
  }
  const clientWidth = document.getElementById('graphBlock').clientWidth;
  const { innerWidth } = window;
  let actualWidth = innerWidth - 98;
  let percentage = 48;
  let widthPercentage = (clientWidth / actualWidth) * 100;
  let widthPercentageNew = (clientWidth / innerWidth) * 100;
  percentage = 50 + (50 - widthPercentage / 2);
  let percentageNew = 51 + (50 - widthPercentageNew / 2);

  let leftPercentage = percentageNew - widthPercentageNew / 2;

  const { width, height } = moreProps;
  switch (location) {
    case 'center':
      cx = width * (percentage / 100);
      cy = height / 2 - shapeWidth;
      // if (numType) {
      //   cx = width - clientWidth + (clientWidth / 2 + shapeWidth);
      //   cy = height - shapeWidth / 2;
      // }
      break;
    case 'topLeft':
      cx = width * (leftPercentage / 100);
      cy = shapeWidth + 20;
      // if (numType) {
      //   cx = actualWidth - clientWidth + shapeWidth + 20;
      //   cy = shapeWidth + 20;
      // }
      break;
    case 'topRight':
      cx = width - shapeWidth - 10;
      cy = shapeHeight + 20;
      // if (numType) {
      //   cx = width - clientWidth + clientWidth - shapeWidth;
      //   cy = shapeWidth;
      // }
      break;
    case 'topCenter':
      cx = width * (percentage / 100);
      cy = shapeWidth + 20;
      // if (numType) {
      //   cx = width - clientWidth + clientWidth / 2 + shapeWidth;
      //   cy = shapeWidth;
      // }
      break;
    case 'bottomLeft':
      cx = width * (leftPercentage / 100);
      cy = height - shapeWidth - 10;
      break;
    case 'bottomCenter':
      cx = width * (percentage / 100);
      cy = height - shapeWidth - 10;
      break;
    case 'leftCenter':
      cx = width * (leftPercentage / 100);
      cy = height / 2 - shapeWidth;
      break;
    case 'rightCenter':
      cx = width - shapeWidth - 10;
      cy = height / 2 - shapeWidth;
      break;
    default:
      cx = width - shapeWidth - 10;
      cy = height - shapeHeight - 10;
      break;
  }

  return { cx, cy };
};
