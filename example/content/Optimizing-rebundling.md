You might notice after requiring React JS into your project that the time it takes from a save to a finished rebundle of your application takes more time. In development you ideally want from 200-800 ms rebundle speed, depending on what part of the application you are working on.

你可能注意到在引入 React JS 到你的项目之后，给你的应用重新合并会花费太多的时间。在开发环境中，最理想的是编译最多 200 到 800 毫秒的速度，取决于你在开发的应用。

> IMPORTANT! This setup a minified, production version of React. As a result you will lose `propTypes` based type validation!

> 注意！这个是设置一个压缩和发布的 React 版本，结果你可能会失去 `propTypes` 基础类型检查！

## 在开发环境中使用压缩文件

Instead of making Webpack go through React JS and all its dependencies, you can override the behavior in development.

为了不让 Webpack 去遍历 React JS 及其所有依赖，你可以在开发中重写它的行为。

**webpack.config.js**

```javascript
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

config = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
    resolve: {
        alias: {
          'react': pathToReact
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
    	loaders: [{
    		test: /\.jsx?$/,
    		loader: 'babel'
    	}],
    	noParse: [pathToReact]
    }
};

module.exports = config;
```

We do two things in this configuration:

我们在配置中做了两件事：

1. Whenever "react" is required in the code it will fetch the minified React JS file instead of going to *node_modules*

2. Whenever Webpack tries to parse the minified file, we stop it, as it is not necessary



1. 每当 "react" 在代码中被引入，它会使用压缩后的 React JS 文件，而不是到 *node_modules* 中找。
2. 每当 Webpack 尝试去解析那个压缩后的文件，我们阻止它，因为这不必要。

Take a look at [Optimizing development](Optimizing-development) for more information on this.

可以到 [优化开发](Optimizing-development) 看到更多这方面的信息。
