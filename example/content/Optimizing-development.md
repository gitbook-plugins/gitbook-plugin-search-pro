We talked about how you could use the minified versions of your dependencies in development to make the rebundling go as fast as possible. Let us look at a small helper you can implement to make this a bit easier to handle.

之前介绍了如何在开发中使用依赖的压缩版本来让合并尽可能加速，让我们看一下这个小的例子来让你更加轻松去处理：

*webpack.config.js*
```javascript
var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var deps = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js',
  'underscore/underscore-min.js',
];

var config = {
  entry: ['webpack/hot/dev-server', './app/main.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {}
  },
  module: {
    noParse: [],
    loaders: []
  }
};

// Run through deps and extract the first part of the path, 
// as that is what you use to require the actual node modules 
// in your code. Then use the complete path to point to the correct
// file and make sure webpack does not try to parse it
// 通过在第一部分路径的依赖和解压
// 就是你像引用 node 模块一样引入到你的代码中
// 然后使用完整路径指向当前文件，然后确认 Webpack 不会尝试去解析它

deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;
```
Not all modules include a minified distributed version of the lib, but most do. Especially with large libraries like React JS you will get a significant improvement.

不是所有的模块需要一个压缩的版本，不过大多数需要，尤其是像 React JS 这种大型库，之后你会有明显的提升。

## 把 React 暴露到全局中
You might be using distributed versions that requires React JS on the global scope. To fix that you can install the expose-loader by `npm install expose-loader --save-dev` and set up the following config, focusing on the *module* property:

你可能在全局中使用了一个压缩版本的 React，为了修复你可以安装这个暴露全局加载器 `npm install expose-loader --save-dev`，然后像下面这样配置，注意 *module* 属性：

```javascript
var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var deps = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js',
  'underscore/underscore-min.js',
];

var config = {
  entry: ['webpack/hot/dev-server', './app/main.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {}
  },
  module: {
    noParse: [],

    // Use the expose loader to expose the minified React JS
    // distribution. For example react-router requires this
    // 使用暴露全局加载器来暴露压缩版的 React JS，比如 react-router 需要这个。
    loaders: [{
      test: path.resolve(node_modules_dir, deps[0]),
      loader: "expose?React"
    }]
  }
};

deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;
```