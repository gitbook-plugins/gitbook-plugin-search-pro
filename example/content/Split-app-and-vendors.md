When your application is depending on other libraries, especially large ones like React JS, you should consider splitting those dependencies into its own vendors bundle. This will allow you to do updates to your application, without requiring the users to download the vendors bundle again. Use this strategy when:

当你的应用依赖其他库尤其是像 React JS 这种大型库的时候，你需要考虑把这些依赖分离出去，这样就能够让用户在你更新应用之后不需要再次下载第三方文件。当满足下面几个情况的时候你就需要这么做了：

- When your vendors reaches a certain percentage of your total app bundle. Like 20% and up 
- You will do quite a few updates to your application
- You are not too concerned about perceived initial loading time, but you do have returning users and care about optimizing the experience when you do updates to the application
- Users are on mobile


- 当你的第三方的体积达到整个应用的 20% 或者更高的时候。
- 更新应用的时候只会更新很小的一部分
- 你没有那么关注初始加载时间，不过关注优化那些回访用户在你更新应用之后的体验。
- 有手机用户。

*webpack.production.config.js*
```javascript
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),
    
    // Since react is installed as a node module, node_modules/react,
    // we can point to it directly, just like require('react');
    // 当 React 作为一个 node 模块安装的时候，
    // 我们可以直接指向它，就比如 require('react')
    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [node_modules_dir],
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

module.exports = config;
```
This configuration will create two files in the `dist/` folder. **app.js** and **vendors.js**.

这些配置会在 `dist/` 文件夹下创建两个文件：**app.js** 和 **vendors.js**。

#### 重要的事情！
Remember to add both files to your HTML file, or you will get the error: `Uncaught ReferenceError: webpackJsonp is not defined`.

记住要把这些文件都加入到你的 HTML 代码中，不然你会得到一个错误：`Uncaught ReferenceError: webpackJsonp is not defined`。