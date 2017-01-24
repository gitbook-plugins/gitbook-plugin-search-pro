## 类

As of React JS 0.13 you will be able to define components as classes.

在 React JS 0.13 中，你可以把组件定义为类。

```javascript
class MyComponent extends React.Component {
  constructor() {
    this.state = {message: 'Hello world'};
  }
  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}
```

This gives you a very short and nice syntax for defining components. A drawback with using classes though is the lack of mixins. That said, you are not totally lost. Lets us see how we could still use the important **PureRenderMixin**.

这样能够写出非常短且优雅的语法来定义组件。使用类的缺点是缺乏了很多 mixin，不过，不是所有的不能用，让我们来看看使用重要的 **PureRenderMixin**：

```javascript
import React from 'react/addons';

class Component extends React.Component {
  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }
}

class MyComponent extends Component {
  constructor() {
    this.state = {message: 'Hello world'};
  }
  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}
```