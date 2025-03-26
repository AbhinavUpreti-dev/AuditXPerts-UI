import greenHorizonatalImage from "./images/green-horizontal.png";
import redSquareImage from "./images/red-square.png";
import projectRelatedImage from "./images/project-related.png";

const htmlImage = (img: any) => {
  const imgTag = new Image();
  imgTag.src = img;
  return imgTag;
}

export const greenHorizonatal = htmlImage(greenHorizonatalImage);
export const redSquare = htmlImage(redSquareImage);
export const projectRelated = htmlImage(projectRelatedImage);
