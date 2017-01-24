So the great thing about React JS is that it runs on the server too. But that does not mean you can just create any app and run it on the server. You have to make some decisions on the architecture. The reason is that even though React JS and the components run on the server, you might be having dependencies in those components that does not run on the server.

React Js 最伟大的地方是它也可以运行在服务端，不过这不意味着你可以创建任何一个应用然后运行在服务端，你需要做一些决策和架构。原因是哪怕 React JS 和一些组件可以在服务端运行，但还是有一些组件中的依赖不能在服务端运行。

## 注入状态
One of the most important decisions you make is to inject the state of your application through the top component. This basically means that your components does not have any external dependencies at all. All they need to know comes through this injected state.

一个重要的事情是应用需要通过顶层组件把状态注入，这意味着你的组件没有了任何的外部依赖，他们只能通过注入的状态来获取信息。

This cookbook is not about isomorphic apps, but let us take a look at an example. We will not use ES6 syntax here because Node JS does not support it yet.

这本小书不是主要讲同构渲染的应用，不过让我们来看一下例子，我们这次不使用 ES6 语法了，因为 Node JS 还不完全支持。

*main.js (client)*
```javascript
var React = require('react');
var AppState = require('./client/AppState.js');
var App = require('./App.js');

React.render(<App state={AppState}/>, document.body);
```

*router.js (server)*
```javascript
var React = require('react');
var App = require('./App.js');
var AppState = require('./server/AppState.js');
var index = '<!DOCTYPE html><html><head></head><body>{{component}}</body></html>';

app.get('/', function (req, res) {
  var componentHtml = React.renderToString(App({state: AppState}));
  var html = index.replace('{{component}}', componentHtml);
  res.type('html');
  res.send(html);
});
```

So this was a very naive and simple way of showing it, but what you should notice here is that we use the same **App.js** file on the client and server, but we have two different ways of producing the state.

所以这是一个非常初级且简单的例子来展示它，不过你需要注意的是我们在客户端和服务端使用了同一个 **App.js**，但是我们需要两种方式来提供状态。