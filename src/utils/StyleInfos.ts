export interface IStyleInfo {
  name: string;
  pathToModel: string;
  pathToImage: string;
}

const styleInfos: IStyleInfo[] = [
  {
    name: "Scream",
    pathToModel: "models/scream",
    pathToImage: "img/styles/Munch_TheScream_Wikipedia.jpg"
  },
  {
    name: "The Wave",
    pathToModel: "models/wave",
    pathToImage: "img/styles/Wave_Hokusai_Wikipedia.jpg"
  },
  {
    name: "Rain Princess",
    pathToModel: "models/rain_princess",
    pathToImage: "img/styles/RainPrincess_LeonidAfremov_Deviantart.jpg"
  },
  {
    name: "Matrix",
    pathToModel: "models/matrix",
    pathToImage: "img/styles/Matrix_Pixabay_Comfreak.jpg"
  },
  {
    name: "Starry Night",
    pathToModel: "models/starry_night",
    pathToImage: "img/styles/StarryNight_VanGogh_Wikipedia.jpg"
  },
  {
    name: "Mosaic",
    pathToModel: "models/mosaic",
    pathToImage: "img/styles/mosaic.jpg"
  },
  {
    name: "Dance 1987",
    pathToModel: "models/dance_1987",
    pathToImage: "img/styles/dance_1987.jpg"
  }

];

export default styleInfos;
