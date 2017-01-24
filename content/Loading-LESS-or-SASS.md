If you want to use compiled CSS, there are two loaders available for you. The **less-loader** and the **sass-loader**. Depending on your preference, this is how you set it up.

如果你想使用编译 CSS，这里有两种可用的加载器：**less-loader** 和 **sass-loader**，看你喜欢哪种。下面是如何设置。

## 安装和设置加载器
`npm install less-loader` or `npm install sass-loader`.

`npm install less-loader` 或者 `npm install sass-loader`.


**webpack.config.js**


```javascript
var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'app/main.js')
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel'
    },

    // LESS
    {
      test: /\.less$/,
      loader: 'style!css!less'
    },

    // SASS
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  }
};
```

## LESS 和 SASS 中的 imports 怎么办?
If you import one LESS/SASS file from an other, use the exact same pattern as anywhere else. Webpack will dig into these files and figure out the dependencies.

如果你从另外一个文件中导入一个 LESS/SASS 文件，像其他地方一样使用准确的路径，Webpack 会找出那些文件，然后识别里面的依赖。

```less
@import "./variables.less";
```

You can also load LESS files directly from your node_modules directory.

你也可以直接从你的 node_modules 文件夹中加载 LESS 文件。

```less
$import "~bootstrap/less/bootstrap";
```

