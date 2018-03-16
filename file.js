
const fslib = require('fs');
const mkdirp = require('mkdirp');
const pathlib = require('path');

class FileController {

  initialize({ dir }) {
    this._dir = dir;
    mkdirp.sync(this._dir);
    return Promise.resolve();
  }

  writeImageDataUrlToFile(imageDataUrl, fileName) {
    imageDataUrl = imageDataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    let path = pathlib.join(this._dir, fileName);
    fslib.writeFileSync(path, imageDataUrl, 'base64');
  }

}
