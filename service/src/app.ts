import { Application } from 'midway';

// app.js 或 agent.js 文件：
module.exports = class AppBootHook {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async serverDidReady() {
    // 请将你的应用项目中 app.beforeStart 中的代码置于此处。
    console.log(`启动项目: ${this.app.getConfig('keys')}`);
  }
};
