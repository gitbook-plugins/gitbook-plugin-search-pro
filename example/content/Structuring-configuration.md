There are two things you want to do preparing for a production build.

这里有两件事你需要为生产发布做准备。

1. Configure a script to run in your package.json file
2. Create a production config


1. 配置你的 package.json 里的脚本
2. 创建一个生产的配置


### 创建脚本
We have already used *package.json* to create the `npm run dev` script. Now let us set up `npm run deploy`.

我们已经使用过 *package.json* 来创建 `npm run dev` 的脚本，现在让我们设置 `npm run deploy`。

```json
{
  "name": "my-project",
  "version": "0.0.0",
  "description": "My awesome project!",
  "main": "app/main.js",
  "scripts": {
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build",
    "deploy": "NODE_ENV=production webpack -p --config webpack.production.config.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^1.4.13",
    "webpack-dev-server": "^1.6.6"
  },
  "dependencies": {}
}
```

As you can see we are just running webpack with the production argument and pointing to a different configuration file. We also use the environment variable "production" to allow our required modules to do their optimizations. Lets us create the config file now.

正如你所见，我们只是用生产参数运行 Webpack 来指向另一个配置文件。我们也使用了环境变量 “production” 来让我们的模块自动去优化。让我们开始来创建配置文件。

### 创建生产配置
So there really is not much difference in creating the dev and production versions of your webpack config. You basically point to a different output path and there are no workflow configurations or optimizations. What you also want to bring into this configuration is cache handling.

可以看到，其实生产环境的配置和开发的配置没有太大的不同，主要的不同是指向了一个不同的输出路径，然后也没有了 workflow 的配置和优化，可以看到新加入到配置里的是处理缓存的配置。

```javascript
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      
      // There is not need to run the loader through
      // vendors
      // 这里再也不需通过任何第三方来加载
      exclude: [node_modules_dir],
      loader: 'babel'
    }]
  }
};

module.exports = config;
```

### 发布
Run `npm run deploy` in the root of the project. Webpack will now run in production mode. It does some optimizations on its own, but also React JS will do its optimizations. Look into caching for even more production configuration.

在项目根目录处运行 `npm run deploy`，Webpack 现在会运行生产模式，他会自动做一些优化，不过，React Js 也会做自己的优化。可以深入了解缓存处理来做更多的生产配置。
