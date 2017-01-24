When **webpack-dev-server** is running it will watch your files for changes. When that happens it rebundles your project and notifies browsers listening to refresh. To trigger this behavior you need to change your *index.html* file in the `build/` folder.


当运行 **webpack-dev-server** 的时候，它会监听你的文件修改。当项目重新合并之后，会通知浏览器刷新。为了能够触发这样的行为，你需要把你的 *index.html* 放到 `build/` 文件夹下，然后做这样的修改：

**build/index.html**

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

We added a script that refreshes the application when a change occurs. You will also need to add an entry point to your configuration:

我们需要增加一个脚本当发生改动的时候去自动刷新应用，你需要在配置中增加一个入口点。

**webpack.config.js**


```javascript
var path = require('path');

module.exports = {
    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
};
```

Thats it! Now your application will automatically refresh on file changes.

就是这样！现在你的应用就可以在文件修改之后自动刷新了。

## 默认环境

In the example above we created our own *index.html* file to give more freedom and control. It is also possible to run the application from **http://localhost:8080/webpack-dev-server/bundle**. This will fire up a default *index.html* file that you do not control. It also fires this file up in an iFrame allowing for a status bar to indicate the status of the rebundling process.

在上面的例子中我们创建了 *index.html* 文件来获取更多的自由和控制。同样也可以从 **http://localhost:8080/webpack-dev-server/bundle** 运行应用。这会触发一个默认的你不能控制的 *index.html* ，它同样会触发一个允许iFrame中显示重合并的过程。


> I discuss an alternative, `inline` based approach at the [Developing with Webpack](http://survivejs.com/webpack_react/developing_with_webpack/) chapter of *SurviveJS - Webpack and React*.

> 我探讨了一个可供代替的方法，`inline` 是基于 [Developing with Webpack](http://survivejs.com/webpack_react/developing_with_webpack/) 中 *SurviveJS - Webpack and React* 章节的方案。
