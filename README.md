# Stransfer

Stransfer is a progressive web application that lets you take pictures and apply a style to them. It was made by students as part of a college project using the ml5js library :books:.

## Features
* You can take photos within the app and apply astonishing styles to them
* You can also upload images from your device
* Everything is done in your browser, your photos never leave your device
* You can use the app offline

## Considerations
* Once you click on a style it will be downloaded. They are about 17MB each 😱 but after the first download they are stored in browser for later use (including offline use)
* The computation needed is considerably high and the app will freeze or lag until the style is applied
* Doesn't work on Safari nor iOS 😔
* For performance reasons the style is not displayed on the camera in real time
* For performance reasons too the size of the photos is considerably low

## Other implementations
Besides the web app, we also created two jupyter notebooks related to Style Transfer techniques:

* [Implementation Gatys et al.](https://github.com/carlosdg/NeuralStyleTransfer)
* [Training style transfer for ml5](https://github.com/carlosdg/TrainStyleTransfer)

## Results


| Content | Style | Result |
|:-------:|:------|:-------|
|    <img width="198" height="300" src="docs/images/Dance1987Content.jpg" /> | <img width="320" height="180" src="docs/images/Dance1987Style.jpg" /> | <img width="198" height="300" src="docs/images/Dance1987Result.png" /> |
| <img width="320" height="208" src="docs/images/MatrixContent.jpg" /> | <img width="320" height="226" src="docs/images/MatrixStyle.jpg" /> | <img width="320" height="208" src="docs/images/MatrixResult.jpg" /> |
| <img width="300" height="172" src="docs/images/MosaicContent.jpg" /> | <img width="250" height="166" src="docs/images/MosaicStyle.jpg" /> | <img width="300" height="172" src="docs/images/MosaicResult.png" /> |
| <img width="200" height="300" src="docs/images/RainbowPrincessContent.jpg" /> | <img width="199" height="200" src="docs/images/RainbowPrincessStyle.jpg" /> | <img width="200" height="300" src="docs/images/RainbowPrincessResult.png" />|
| <img width="200" height="300" src="docs/images/StarryNightContent.jpg" /> | <img width="200" height="160" src="docs/images/StarryNightStyle.jpg" /> | <img width="200" height="300" src="docs/images/StarryNightResult.png" /> |
| <img width="250" height="250" src="docs/images/TheWaveContent.jpg" /> | <img width="250" height="166" src="docs/images/TheWaveStyle.png" /> |<img width="250" height="250" src="docs/images/TheWaveResult.png" /> |

## Authors

* Carlos Domínguez García ([carlosdg](https://github.com/carlosdg))
* Daute Rodríguez Rodríguez ([DauteRR](https://github.com/DauteRR))
