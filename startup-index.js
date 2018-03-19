
document.addEventListener("DOMContentLoaded", (event) => {
  let cameraController = new CameraController();
  let fileController = new FileController();
  let config = null;
  ConfigController.getConfig()
    .then((_config) => {
      config = _config;
      return cameraController
        .initialize({
          videoElement: document.querySelector('video')
        })
    }).then(() => fileController.initialize({ dir: config.dir }))
    .then(() => cameraController.captureImage())
    .then((imageDataUrl) => {
      let date = (new Date).getTime() + '-' + (new Date).toString().replace(/\:/g, '-').replace(/ *\([^)]*\) */g, "")
      let fileName = 'auto-selfie-' + date + '.png';
      return fileController.writeImageDataUrlToFile(imageDataUrl, fileName);
    })
    .then(() => {
      nw.App.quit();
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
      nw.App.quit();
    });
});

