
const configFilePath = './config.json';

class ConfigController {

  static getConfig() {
    return new Promise((accept, reject) => {
      let config = fslib.readFileSync(configFilePath);
      config = JSON.parse(config);
      if (!config.hasOwnProperty('dir')) {
        throw new Error("Expected config to have property 'dir'.");
      }
      if (!config.hasOwnProperty('isStartupScriptAdded')) {
        throw new Error("Expected config to have property 'isStartupScriptAdded'.");
      }
      if (!config.hasOwnProperty('isTaskScheduleAdded')) {
        throw new Error("Expected config to have property 'isTaskScheduleAdded'.");
      }
      accept(config);
    });
  }

  static setConfig(config) {
    return new Promise((accept, reject) => {
      config = JSON.stringify(config);
      fslib.writeFileSync(configFilePath, config, 'utf8');
      accept();
    });
  }

}