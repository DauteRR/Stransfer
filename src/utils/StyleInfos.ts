export interface IStyleInfo {
  name: string;
  pathToModel: string;
  pathToImage: string;
}

const styleInfos: IStyleInfo[] = [
  {
    name: "Scream",
    pathToModel: "models/scream",
    pathToImage: "img/Munch_TheScream_Wikipedia.jpg"
  },
  {
    name: "The Wave",
    pathToModel: "models/wave",
    pathToImage: "img/Wave_Hokusai_Wikipedia.jpg"
  },
  {
    name: "Rain Princess",
    pathToModel: "models/rain_princess",
    pathToImage: "img/RainPrincess_LeonidAfremov_Deviantart.jpg"
  },
  {
    name: "Matrix",
    pathToModel: "models/matrix",
    pathToImage: "img/Matrix_Pixabay_Comfreak.jpg"
  },
  {
    name: "Starry Night",
    pathToModel: "models/starry_night",
    pathToImage: "img/StarryNight_VanGogh_Wikipedia.jpg"
  }
];

export default styleInfos;
