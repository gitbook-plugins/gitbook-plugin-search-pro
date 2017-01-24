> Before getting started you should make sure you have a recent version of Node.js and NPM installed. See [nodejs.org](http://nodejs.org/) for installation details. We'll use NPM to set up various tools.

> 在开始之前，你需要把你的 Node.js 和 NPM 都更新到最新的版本。访问 [nodejs.org](http://nodejs.org/) 查看安装详情。我们将会使用 NPM 安装一些工具。

Getting started with Webpack is straightforward. I'll show you how to set up a simple project based on it. As a first step, set a directory for your project and hit `npm init` and fill in some answers. That will create a `package.json` for you. Don't worry if some fields don't look ok, you can modify those later.

开始使用 Webpack 非常简单，我会展示给你看使用它的一个简单的项目。第一步，为你的项目新建一个文件夹，然后输入 `npm init`，然后填写相关问题。这样会为你创建了 `package.json`，不用担心填错，你可以之后修改它。

## 安装 Webpack

Next you should get Webpack installed. We'll do a local install and save it as a project dependency. This way you can invoke the build anywhere (build server, whatnot). Run `npm i webpack --save-dev`. If you want to run the tool, hit `node_modules/.bin/webpack`.

接下来我们安装 Webpack，我们要把它安装在本地，然后把它作为项目依赖保存下来。这样你可以在任何地方编译（服务端编译之类的）。输入 `npm i webpack --save-dev`。如果你想运行它，就输入 `node_modules/.bin/webpack`。

## 目录结构

Structure your project like this:

项目的目录结构长这样：

- /app
  - main.js
  - component.js
- /build
  - bundle.js (自动创建)
  - index.html
- package.json
- webpack.config.js

In this case we'll create `bundle.js` using Webpack based on our `/app`. To make this possible, let's set up `webpack.config.js`.

我们会使用 Webpack 在我们的 `/app` 里来自动创建 `bundle.js` 。接下来，我们来设置 `webpack.config.js`。

## 设置 Webpack

Webpack 的配置文件长这样：

*webpack.config.js*

```javascript
var path = require('path');


module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
};
```

## 运行你的第一个编译

Now that we have basic configuration in place, we'll need something to build. Let's start with a classic `Hello World` type of app. Set up `/app` like this:

现在我们有了一个最简单的配置，我们需要有什么东西去编译，让我们开始一个经典的 `Hello World`，设置 `/app` 像这样：

*app/component.js*

```javascript
'use strict';


module.exports = function () {
    var element = document.createElement('h1');

    element.innerHTML = 'Hello world';

    return element;
};
```

*app/main.js*

```javascript
'use strict';
var component = require('./component.js');


document.body.appendChild(component());

```

Now run `webpack` in your terminal and your application will be built. A *bundle.js* file will appear in your `/build` folder. Your *index.html* file in the `build/` folder will need to load up the application.

现在在你的命令行运行 `webpack`，然后你的应用会开始编译，一个 `bundle.js` 文件就这样出现在你的 `/build` 文件夹下，需要在 `build/` 下的 *index.html* 去启动项目。

*build/index.html*

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

> It would be possible to generate this file with Webpack using [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin). You can give it a go if you are feeling adventurous. It is mostly a matter of configuration. Generally this is the way you work with Webpack.

> 这个文件可以用 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 来生成。如果你觉得冒险，那就把剩下的工具交给它来做。使用它就只有一个配置的问题。一般来说使用 Webpack 来工作就是这么个套路。

## 运行应用

Just double-click the *index.html* file or set up a web server pointing to the `build/` folder.

只要双击 *index.html* 或者设置一个 Web 服务指向 `build/` 文件夹。

## 设置 `package.json` *scripts*

It can be useful to run build, serve and such commands through `npm`. That way you don't have to worry about the technology used in the project. You just invoke the commands. This can be achieved easily by setting up a `scripts` section to `package.json`.

`npm` 是一个非常好用的用来编译的指令，通过 `npm` 你可以不用去担心项目中使用了什么技术，你只要调用这个指令就可以了，只要你在 `package.json` 中设置 `scripts` 的值就可以了。

In this case we can move the build step behind `npm run build` like this:

在这个案例中我们把编译步骤放到 `npm run build` 中是这样：

1. `npm i webpack --save` - If you want to install Webpack just a development dependency, you can use `--save-dev`. This is handy if you are developing a library and don't want it to depend on the tool (bad idea!).
2. Add the following to `package.json`:


1. `npm i webpack --save` - 如果你只是想要作为一个开发依赖安装 Webpack，你可以使用 `--save-dev` 参数。当你开发的项目中不依赖这个工具的时候这个命令是非常便利的。（不是个好主意！）
2. 把下面的内容添加到 `package.json`中。

```json
  "scripts": {
    "build": "webpack"
  }
```

To invoke a build, you can hit `npm run build` now.

现在你可以输入 `npm run build` 就可以编译了。

Later on this approach will become more powerful as project complexity grows. You can hide the complexity within `scripts` while keeping the interface simple.

当项目越发复杂的时候，这样的方法会变得越来越有效。你可以把所有复杂的操作隐藏在 `scripts` 里面来保证界面的简洁。

The potential problem with this approach is that it can tie you to a Unix environment in case you use environment specific commands. If so, you may want to consider using something environment agnostic, such as [gulp-webpack](https://www.npmjs.com/package/gulp-webpack).

不过潜在的问题是这种方法会导致如果你使用一些特殊的指令的时候只能在 Unix 环境中使用。所以如果你需要考虑一些未知的环境中的话，那么 [gulp-webpack](https://www.npmjs.com/package/gulp-webpack) 会是一个好的解决方案。

> Note that NPM will find Webpack. `npm run` adds it to the `PATH` temporarily so our simple incantation will work.

> 注意 NPM 会找到 Webpack，`npm run` 会把他临时加到 `PATH`来让我们这个神奇的命令工作。
