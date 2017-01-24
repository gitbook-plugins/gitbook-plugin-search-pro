It is also possible to lazy load entry points. This means that you load parts of your application as they are requested. A typical scenario for this would be that your users only visits specific parts of the application. And an example of that would be twitter.com. You do not always visit your profile page, so why load the code for that? Here is a summary of requirements:

Webpack 也可以实现懒加载入口文件，意味着应用的一部分只在需要的时候加载，一个典型的例子是用户只有访问一些应用特定的部分，典型的例子是 Twitter.com，你不会一直访问你的个人页，所以为什么要加载那部分的代码？这里有个主要的要求：

- You have a relatively big application where users can visit different parts of it
- You do care a lot about initial render time


- 你有一个相对比较大的应用，可以让用户可以访问应用的不同部分。
- 你非常关注初始渲染时间


*webpack.production.config.js*
```javascript
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),
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
So we are pretty much back where we started with a split application and vendors bundle. You do not really define your lazy dependencies in a configuration, Webpack automatically understands them when analyzing your code. So let us see how we would lazy load a **profile page**:

所以我们把应用和第三方分离是一件非常漂亮的事，你不需要在配置中设置懒加载依赖，Webpack 会自动理解他们，然后分析你的代码。所以让我们看看我们是如何加载一个 **个人信息页**：

*main.js (使用 ES6 语法)*
```javascript
import React from 'react';
import Feed from './Feed.js';

class App extends React.Component {
  constructor() {
    this.state = { currentComponent: Feed };
  }
  openProfile() {
    require.ensure([], () => {
      var Profile = require('./Profile.js');
      this.setState({
        currentComponent: Profile
      });
    });
  }
  render() {
   return (
      return <div>{this.state.currentComponent()}</div>
    );
  }
}
React.render(<App/>, document.body);
```
So this is just an example. You would probably hook this up to a router, but the important part is using `require.ensure`.

这只是一个例子，你需要把这些写入到一个路由中，不过重要的事情是使用了 `require.ensure`。

**What is the array on the first argument?**: If you try to lazy load a chunk that depends on an other lazy loaded chunk you can set it as a dependency in the array. Just type in the path to the chunk. E.g. `['./FunnyButton.js']`

**第一个数组参数是什么？**：如果你尝试去懒加载一段由另一个懒加载的代码加载的代码的话，把它作为依赖写在数组里，就把路径写进去，比如 `['./FunnyButton.js']`
