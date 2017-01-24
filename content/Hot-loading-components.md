So this part is just freakin' awesome. With React JS and the react-hot-loader you can change the class code of your component and see the instances update live in the DOM, without loosing their state! This is pretty much exactly how CSS updates behave, only that it is your components.

所以这个章节就是他妈的屌。使用 React JS 和 react-hot-loader 可以让你去改变组件中的 class 代码，然后可以在 DOM 上看到实时更新了实例，没有修改他们的状态！看起来就像 CSS 更新一样，不过是换成了组件。

## 设置
This setup requires that you use the **webpack-dev-server** as introduced in earlier chapters. Now we just have to install the loader with `npm install react-hot-loader --save-dev`, do a small config change:

这个设置需要你使用前面章节中介绍的 **webpack-dev-server**，现在我们需要去安装加载器 `npm install react-hot-loader --save-dev`，然后做一点配置：

```javascript
var webpack = require('webpack');
var path = require('path');

var config = {
  entry: ['webpack/hot/dev-server', './app/main.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,

      // Use the property "loaders" instead of "loader" and 
      // add "react-hot" in front of your existing "jsx" loader
      // 使用 "loaders" 属性代替 "loader"
      // 然后在 "jsx" 加载器之前添加 "react-hot" 
      loaders: ['react-hot', 'babel']
    }]
  }
};

module.exports = config;
```

And you will also need a small snippet of code in your main entry file. In the example above that would be the *main.js* file located in the `app/` folder.

同时你也需要在你的主入口文件做一些修改，例子中，在 `app/` 文件夹中的 *main.js* 像下面那样修改：

*app/main.js*
```javascript
// You probably already bring in your main root component, 
// maybe it is your component using react-router
// 你可能已经把你的根组件引入了
// 组件可能用了 react-router
var RootComponent = require('./RootComponent.jsx');

// When you render it, assign it to a variable
// 当你渲染它的时候，让它赋值给一个变量
var rootInstance = React.render(RootComponent(), document.body);

// Then just copy and paste this part at the bottom of
// the file
// 然后在文件的最底部复制粘帖
if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      // 帮助 React Hot Loader 识别出页面中的根组件
      return [rootInstance];
    }
  });
}

```

It is that simple. Render a component to the DOM and make a code change on the class of that component. It will render itself again, keeping the existing state. Cool?

就是这么简单，在 DOM 中渲染一个组件，然后修改一些组件中的代码，它会自动渲染，却保存了已经存在了的状态，屌不屌？

Read more about the [react-hot-loader](http://gaearon.github.io/react-hot-loader/getstarted/).

可以到 [react-hot-loader](http://gaearon.github.io/react-hot-loader/getstarted/) 了解更多。