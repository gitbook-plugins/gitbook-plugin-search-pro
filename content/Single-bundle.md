Lets have a look at the simplest setup you can create for your application. Use a single bundle when:

让我们看一下为应用创建的最简单的配置，只有在下面的情况下才使用单入口模式：

- You have a small application
- You will rarely update the application
- You are not too concerned about perceived initial loading time


- 应用很小
- 很少会更新应用
- 你不太关心初始加载时间


*webpack.production.config.js*
```javascript
var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  }
};

module.exports = config;
```