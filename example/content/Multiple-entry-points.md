Maybe you are building an application that has multiple urls. An example of this would be a solution where you have two, or more, different URLs responding with different pages. Maybe you have one user page and one admin page. They both share a lot of code, but you do not want to load all the admin stuff for normal users. That is a good scenario for using multiple entry points. A list of use cases could be:

你的应用可能有多个路径， 就是应用中有两个或者多个 URL 相应不同的页面，这里就是提供这样的解决方案。可能你有一个普通用户页和一个管理员页，他们共享了很多代码，但是不想在普通用户页中加载所有管理员页的代码，所以好方案是使用多重入口。使用缘由有下面几条：

- You have an application with multiple isolated user experiences, but they share a lot of code
- You have a mobile version using less components
- You have a typical user/admin application where you do not want to load all the admin code for a normal user


- 你的应用有多种不同的用户体验，但是他们共享了很多代码。
- 你有一个使用更少组件的手机版本
- 你的应用是典型的权限控制，你不想为普通用户加载所有管理用户的代码。

Let us create an example with a mobile experience using less components:

让我们创建一个使用更少组件的手机页面的例子：

*webpack.production.config.js*
```javascript
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),
    mobile: path.resolve(__dirname, 'app/mobile.js'),
    vendors: ['react'] // 其他库
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' // 注意我们使用了变量
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
This configuration will create three files in the `dist/` folder. **app.js**, **mobile.js** and **vendors.js**. Most of the code in the **mobile.js** file also exists in **app.js**, but that is what we want. We will never load **app.js** and **mobile.js** on the same page.

这个配置会在 `dist/` 文件夹下创建三个文件：**app.js**、**mobile.js**和**vendors.js**，大部分的代码在**mobile.js**文件中，也有一部分在 **app.js** 中，不过这是我们需要的，我们不会在同一个页面中同时加载 **app.js** 和 **mobile.js**。