
class CameraController {

  _verifyTechnologyIsSupported() {
    return new Promise((accept, reject) => {
      if (!navigator.mediaDevices.getUserMedia) {
        let err = new Error("Your browser is unable to access getUserMedia APIs");
        err.code = "TECHNOLOGY_NOT_SUPPORTED";
        return reject(err);
      }
      accept();
    });
  }

  _getCameraFeed() {
    const constraints = {
      video: true
    };
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  initialize({ videoElement }) {
    this._videoElement = videoElement;
    return this._verifyTechnologyIsSupported()
      .then(() => this._getCameraFeed())
      .then((cameraStream) => {
        return new Promise((accept, reject) => {
          this._videoElement.addEventListener('loadeddata', () => {
            accept();
          });
          this._videoElement.srcObject = cameraStream;
        });
      });
  }

  captureImage() {
    let canvasElement = document.createElement('canvas');
    canvasElement.width = this._videoElement.videoWidth;
    canvasElement.height = this._videoElement.videoHeight;
    canvasElement.getContext('2d').drawImage(this._videoElement, 0, 0);
    let image = canvasElement.toDataURL('image/png');
    return Promise.resolve(image);
  }

}
