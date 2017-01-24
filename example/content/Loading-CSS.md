Webpack allows you to load CSS like you load any other code. What strategy you choose is up to you, but you can do everything from loading all your css in the main entry point file to one css file for each component.

Webpack允许像加载任何代码一样加载 CSS。你可以选择你所需要的方式，但是你可以为每个组件把所有你的 CSS 加载到入口主文件中来做任何事情。

Loading CSS requires the **css-loader** and the **style-loader**. They have two different jobs. The **css-loader** will go through the CSS file and find `url()` expressions and resolve them. The **style-loader** will insert the raw css into a style tag on your page.

加载 CSS 需要 **css-loader** 和 **style-loader**，他们做两件不同的事情，**css-loader**会遍历 CSS 文件，然后找到 `url()` 表达式然后处理他们，**style-loader** 会把原来的 CSS 代码插入页面中的一个 style 标签中。

## 准备加载 CSS


Install the two loaders: `npm install css-loader style-loader --save-dev`.

安装这两个加载器：`npm install css-loader style-loader --save-dev`

In the *webpack.config.js* file you can add the following loader configuration:

你可以把下面的加载器配置加到 *Webpack.config.js* 文件中。

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
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    }]
  }
};

module.exports = config;
```

## 加载 CSS 文件

Loading a CSS file is a simple as loading any file:

加载一个 CSS 文件就和加载其他文件一样简单：


**main.js**

```javascript
import './main.css';
// Other code
```

**Component.jsx**

```javascript
import './Component.css';
import React from 'react';

export default React.createClass({
  render: function () {
    return <h1>Hello world!</h1>
  }
});
```

**Note!** You can of course do this with both CommonJS and AMD.

**注意！** 你也可以在 CommonJS 和 AMD 中做同样的事情。

## CSS 加载策略

Depending on your application you might consider three main strategies. In addition to this you should consider including some of your basic CSS inlined with the initial payload (index.html). This will set the structure and maybe a loader while the rest of your application is downloading and executing.

根据你的应用，你可能会考略三种策略。另外，你需要考虑把一些基础的 CSS 内联到初始容器中（index.html），这样设置的结构能够在应用下载和执行的时候加载剩下的应用。

### 所有合并成一个

In your main entry point, e.g. `app/main.js` you can load up your entire CSS for the whole project:

在你的主入口文件中个，比如 `app/main.js` 你可以为整个项目加载所有的 CSS：


**app/main.js**


```javascript
import './project-styles.css';
// 其他 JS 代码
```

The CSS is included in the application bundle and does not need to download.


CSS 就完全包含在合并的应用中，再也不需要重新下载。


### 懒加载

If you take advantage of lazy loading by having multiple entry points to your application, you can include specific CSS for each of those entry points:

如果你想发挥应用中多重入口文件的优势，你可以在每个入口点包含各自的 CSS：


**app/main.js**

```javascript
import './style.css';
// 其他 JS 代码
```

**app/entryA/main.js**

```javascript
import './style.css';
// 其他 JS 代码
```

**app/entryB/main.js**

```javascript
import './style.css';
// 其他 JS 代码
```

You divide your modules by folders and include both CSS and JavaScript files in those folders. Again, the imported CSS is included in each entry bundle when running in production.

你把你的模块用文件夹分离，每个文件夹有各自的 CSS 和 JavaScript 文件。再次，当应用发布的时候，导入的 CSS 已经加载到每个入口文件中。

### 制定的组件

With this strategy you create a CSS file for each component. It is common to namespace the CSS classes with the component name, thus avoiding some class of one component interfering with the class of an other.

你可以根据这个策略为每个组件创建 CSS 文件，可以让组件名和 CSS 中的 class 使用一个命名空间，来避免一个组件中的一些 class 干扰到另外一些组件的 class。


**app/components/MyComponent.css**

```css
.MyComponent-wrapper {
  background-color: #EEE;
}
```

**app/components/MyComponent.jsx**

```
import './MyComponent.css';
import React from 'react';

export default React.createClass({
  render: function () {
    return (
      <div className="MyComponent-wrapper">
        <h1>Hello world</h1>
      </div>
    )
  }
});
```

## 使用内联样式取代 CSS 文件

With "React Native" you do not use stylesheets at all, you only use the *style-attribute*. By defining your CSS as objects. Depending on your project, you might consider this as your CSS strategy.

在 “React Native” 中你不再需要使用任何 CSS 文件，你只需要使用 *style 属性*，可以把你的 CSS 定义成一个对象，那样就可以根据你的项目重新来考略你的 CSS 策略。


**app/components/MyComponent.jsx**


```javascript
import React from 'react';

var style = {
  backgroundColor: '#EEE'
};

export default React.createClass({
  render: function () {
    return (
      <div style={style}>
        <h1>Hello world</h1>
      </div>
    )
  }
});
```
