
let config = null;

const previewCamera = (cbfn) => {
  let cameraController = new CameraController();
  let fileController = new FileController();
  ConfigController.getConfig()
    .then((_config) => {
      config = _config;
      return cameraController
        .initialize({
          videoElement: document.querySelector('video')
        })
    }).then(() => fileController.initialize({ dir: config.dir }))
    .then(() => {
      return cbfn();
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
      // nw.App.quit();
    });
}

$(document).ready(() => {

  previewCamera(() => {

    $('#save_location').val(config.dir);

    $('a.save-button').on('click', () => {
      ConfigController.setConfig(config);
      alert('Your changes are saved.');
    });

    $('#select_save_location').on('change', () => {
      let fileList = $('#select_save_location')[0].files;
      if (fileList.length === 0) return;
      let dir = fileList[0].path;
      if (!fslib.statSync(dir).isDirectory()) {
        return alert("Please select a directory. Not a file.")
      }
      config.dir = dir;
      $('#save_location').val(dir);
    });

  });

});
