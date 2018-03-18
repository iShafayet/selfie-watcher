
const shell = require('shelljs');

const runRemoveTaskSchedule = () => {
  let res = shell.exec('schtasks /Delete /TN "SelfieWatcher" /F')
  if (res.code !== 0) {
    let knownError1 = 'The specified task name "SelfieWatcher" does not exist in the system.';
    let knownError2 = 'The system cannot find the file specified.';
    let knownError3 = 'Access is denied.';
    if (res.stderr.indexOf(knownError1) === -1 && res.stderr.indexOf(knownError2) === -1) {
      if (res.stderr.indexOf(knownError3) !== -1) {
        let message = "Access is denied. Please run this app as an administrator for this feature to work.";
        alert(message);
      } else {
        let message = 'Error: Deleting task failed. Details: ' + res.stdout + res.stderr;
        console.log(message);
        alert(message);
      }
    }
  }
}

const runImportTaskSchedule = () => {
  let scheduleFilePath = './WindowsTaskSchedule.xml';
  let content = fslib.readFileSync(scheduleFilePath, { encoding: 'ucs2' });
  scheduleFilePath = pathlib.resolve('./WindowsTaskScheduleReady.xml');
  let executablePath = process.execPath;
  let sourcePath = process.cwd();
  content = content.replace(/\$EXE\$/g, executablePath);
  content = content.replace(/\$CWD\$/g, sourcePath);
  fslib.writeFileSync(scheduleFilePath, content, { encoding: 'ucs2' });
  let res = shell.exec(`schtasks /Create /TN "SelfieWatcher" /XML "${scheduleFilePath}"`);
  if (res.code !== 0) {
    let knownError1 = 'Access is denied.';
    if (res.stderr.indexOf(knownError1) !== -1) {
      let message = "Access is denied. Please run this app as an administrator for this feature to work.";
      alert(message);
    } else {
      let message = 'Error: Deleting task failed. Details: ' + res.stdout + res.stderr;
      console.log(message);
      alert(message);
    }
  }
}

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
      return cbfn(null);
    })
    .catch((err) => {
      console.error(err);
      // alert(err.message);
      // nw.App.quit();
      cbfn(err.message);
    });
}

$(document).ready(() => {

  previewCamera((errorMessage) => {

    if (errorMessage) {
      errorMessage = 'Error: <br>' + errorMessage;
      $('#error-message').html(errorMessage);
    }

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

    $('#create-task-schedule-button').on('click', () => {
      runRemoveTaskSchedule();
      runImportTaskSchedule();
    });

  });

});
