
const config = {
  dir: './'
}

document.addEventListener("DOMContentLoaded", (event) => {

  cameraController = new CameraController();
  fileController = new FileController();
  cameraController
    .initialize({
      videoElement: document.querySelector('video')
    })
    .then(() => fileController.initialize({ dir: config.dir }))
    .then(() => cameraController.captureImage())
    .then((imageDataUrl) => {
      let fileName = 'auto-selfie-' + (new Date).getTime() + '.png';
      return fileController.writeImageDataUrlToFile(imageDataUrl, fileName);
    })
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
      process.exit(1);
    });

});

