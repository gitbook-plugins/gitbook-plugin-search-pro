Fonts can be really difficult to get right. First of all we have typically 4 different formats, but only one of them will be used by the respective browser. You do not want to inline all 4 formats, as that will just bloat your CSS file and in no way be an optimization.

字体实在是非常难引入正确，首先，通常我们有 4 种不一样的格式，但是只有其中一种会被对应的浏览器使用到。你肯定不会想引入全部四种格式，这样只会让 CSS 文件更加膨胀，然后又没办法优化。

## 选择一种格式

Depending on your project you might be able to get away with one font format. If you exclude Opera Mini, all browsers support the .woff and .svg format. The thing is that fonts can look a little bit different in the different formats, on the different browsers. So try out .woff and .svg and choose the one that looks the best in all browsers.

取决与你的项目，你可能可以选择出一种字体格式，如果你不考略 Opera Mini，所有的浏览器都支持 .woff 和 .svg 格式。问题是不同格式下在各种浏览器下字体看起来会有一点点不同。所以测试 .woff 和 .svg，然后找出能够在所有浏览器中看起来最好的那个。

There are probably other strategies here too, so please share by creating an issue or pull request.

如果有其他更好的策略，那请通过创建 issue 或者提 PullRequest 来分享。

## 实践


You do this exactly like you do when inlining images.

就像内联图片一样来内联字体。

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
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }]
  }
};
```

Just make sure you have a limit above the size of the fonts, or they will of course not be inlined.
