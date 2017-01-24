Until HTTP/2 is here you want to avoid setting up too many HTTP requests when your application is loading. Depending on the browser you have a set number of requests that can run in parallel. If you load a lot of images in your CSS it is possible to automatically inline these images as BASE64 strings to lower the number of requests required. This can be based on the size of the image. There is a balance of size of download and number of downloads that you have to figure out for your project, and Webpack makes that balance easy to adjust.

直到 HTTP/2 你才能在应用加载的时候避免设置太多 HTTP 请求。根据浏览器不同你必须设置你的并行请求数，如果你在你的 CSS 中加载了太多图片的话，可以自动把这些图片转成 BASE64 字符串然后内联到 CSS 里来降低必要的请求数，这个方法取决与你的图片大小。你需要为你的应用平衡下载的大小和下载的数量，不过 Webpack 可以让这个平衡十分轻松适应。

## 安装 url-loader
`npm install url-loader --save-dev` will install the loader that can convert resolved paths as BASE64 strings. As mentioned in other sections of this cookbook Webpack will resolve "url()" statements in your CSS as any other require or import statements. This means that if we test on image file extensions for this loader we can run them through it.

`npm install url-loader --save-dev` 来安装加载器，它会把需要转换的路径变成 BASE64 字符串，在其他的 Webpack 书中提到的这方面会把你 CSS 中的 “url()” 像其他 require 或者 import 来处理。意味着如果我们可以通过它来处理我们的图片文件。

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
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  }
};
```

The limit is an argument passed to the url-loader. It tells it that images that er 25KB or smaller in size will be converted to a BASE64 string and included in the CSS file where it is defined.

url-loader 传入的 limit 参数是告诉它图片如果不大于 25KB 的话要自动在它从属的 css 文件中转成 BASE64 字符串。

