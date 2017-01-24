I remember when I saw React the first time around the time it was announced I was skeptical. Particularly mixing some sort of HTML within your code seemed against good conventions. It just felt like a "bad idea"&reg;.

我记得当我第一次看到 React 的时候是十分怀疑的，特别是把 HTML 揉进代码里违背了传统的那些约定，看起来像是一个 “坏主意”。

But that's what React and similar approaches are doing. They challenge some of the conventions and replace them with something more palatable. Sometimes a bigger change in thinking is needed for you to move forward as a developer. That's what React did for me. It takes some powerful ideas from the world of functional programming and then builds on top of those.

但是这就是 React，他们挑战了一些约定，然后用这种方式代替了。作为一个开发者，有时候为了能够改变思考方式是你向前走的一个必经之路。这就是 React 对我的影响，它建立在函数式编程上带给了我很多有意思的想法。

## 基础功能

Before you can understand React and how it changes web development, there are a few things you should know about it. React itself won't be enough. It solves only the problem of views. You still need to complement it with something else. But that's a good thing.

在你能理解 React 是如何改变 Web 开发之前，这里有一点东西你需要知道的。React 它本身是不够丰富的，它只能解决一些视图上的问题，你仍然需要一些东西去帮助它完成事情。

The greatest and worst feature of frameworks is that they sort of cage you in. As long as you are doing what they expect you to do within their boundaries, everything is fine. It is only after you start to reach beyond those boundaries that problems begin to appear. In a library driven approach you aren't as bound. Initially you might not be as fast or efficient but over time as problems become harder, you will have more choices available.

最伟大的和最差劲的框架总是企图给你建立一个笼子，当你在他们划定的地盘里能够完成任何需求，一切都是很好的，但是，当你需要跨出边界的时候，开始有问题了，在一个库驱动方法里你是不被限制的，最初你可能是高效地完成需求，但是伴随时间的推进，问题开始变得严峻起来，你需要更多可行的选择。

### JSX 的基础

React provides a component centric approach to frontend development. You will design your application as smaller components, each of which has it own purpose. Taken to the extreme a component may contain its logic, layout and basic styling. To give you an example of JSX:

React 为前端开发提供了一个组件为中心的方法，你可以为你的应用设计一个更小的组件，所有组件有各自的目的，甚至极端来说，一个组件可能包含它自身的逻辑，结构和基本的样式。这里有个 JSX 的例子：
```html
...
<TodoItem className='urgent' owner={owner} task='Make a dinner' />
...
```

You can see a couple of basic features of JSX here. Instead of using `class`, we'll use the JavaScript equivalent. In addition we have defined a couple of custom properties in form of `owner` and `task`. `owner` is something that is injected from a variable named `owner` that's within the same scope as our JSX. For `task` we provide a fixed value.

你可以看到一个基本功能的 JSX，我们用 `className` 替代了使用 `class`。此外，我们定义了一些自定义属性 `owner` 和 `task`，`owner` 的值是从 JSX 同环境中一个变量叫 `owner` 注入，而我们为 `task` 提供了一个固定的值。

In practice you would most likely structure this a little differently to fit your data model better. That goes a little beyond basic React, though.

在实践中，你可以根据你的数据模型结构来稍微调整目录结构会更好，虽然是 React 进阶的知识点了。

We can mix normal JavaScript code within those \{\}'s. We can use this idea to render a list of `TodoItem`s like this (ES syntax):

我们可以用那些 `{}` 来混合普通 JavaScript 代码，我们可以用这个点像这样去去渲染一个 `TodoItem` 列表（ES 语法）：

```html
<ul>{todoItems.map((todoItem, i) =>
    <li key={'todoitem' + i}><TodoItem owner={todoItem.owner} task={todoItem.task} /></li>
)}</ul>
```
You probably noticed something special here. What is that `key` property about? It is something that tells React the exact ordering of your items. If you don't provide unique keys for list items like this, React will warn you as it won't be able to guarantee the correct ordering otherwise.

你可能注意到这里有些特殊的地方，什么是 `key` 属性？这是告诉 React 这个项的准确顺序。如果你不需要像这样需要提供列表项的唯一 Key 的话，否则 React 会警告你这样它没办法保证是正确的顺序。

This has to do with the fact that React actually implements something known as Virtual DOM (VDOM for short) on top of actual DOM. It is a subset of DOM that allows React to optimize its rendering. The primary advantage of this approach is that it allows React to eschew a lot of legacy our good old DOM has gained through years. This is the secret to React's high performance.

需要了解的事实是 React 实际上在真实 DOM 上实现了虚拟 DOM（简称 VDOM），这是一个 DOM 的子集，能够让 React 能够优化它的渲染。这个优化的方法是它让 React 能够避开困恼我们多年的 DOM 性能损耗。这就是 React 高性能的原因。

### 整体组件

To give you a better idea of what components look like, let's expand our `TodoItem` example into code (ES6 + JSX). I've done this below and will walk you through it:

为了能够让你更加清楚组件长什么样子，让我们拓展 `TodoItem` 例子来感受一下（ES6 + JSX），我已经搞完了，然后我们来过一遍看看：

```javascript
var React = require('react');


module.exports = React.createClass({
    getInitialState() {
        return {
            // 让我们保持追踪看看我们给项点了多少次赞
            likes: 0,
        };
    },
    render() {
        var owner = this.props.owner;
        var task = this.props.task;
        var likes = this.state.likes;

        return <div className='TodoItem'>
            <span className='TodoItem-owner'>{owner}</span>
            <span className='TodoItem-task'>{task}</span>
            <span className='TodoItem-likes'>{likes}</span>
            <span className='TodoItem-like' onClick={this.like}>Like</span>
        </div>;
    },
    like() {
        this.setState({
            likes: this.state.likes + 1
        });
    },
});
```

You can see some basic features of a React component above. First we create a class for our component. After that we define some initial state for it, then we render and finally we define some custom callbacks for our handlers if they exist. In this case I decided to implement an extra feature, liking. The current implementation just keeps track of the amount of likes per component.

你可以在上面看到一些基础的 React 组件的功能，一开始我们创建了一个组件的类，然后我们在初始化的时候定义一些状态，然后我们渲染，最后我们定制了一些回调。在这个例子中，我决定去实施一个额外的功能，点赞。这个工作只是保持了一个跟踪点赞组件的计数。

In practice you would transmit like amounts to a backend and add some validation there but this is a good starting point for understanding how state works in React.

在实践中，你需要把点赞计数传输给后端，然后添加一些验证，不过目前这个阶段对于理解 State 在 React 中的是如何使用的已经是一个非常好的开端了。

`getInitialState` and `render` are a part of a [React component's lifecycle as documented officially](http://facebook.github.io/react/docs/component-specs.html). There are additional hooks that allow you to do things like set up adapters for `jQuery` plugins and such.

`getInitialState` 和 `render` 是 [React 组件的生命周期官方文档](http://facebook.github.io/react/docs/component-specs.html) 的一部分。也有额外的能够让你去设置加载 `jQuery` 插件之类的适配器的钩子。

In this example CSS naming has been modeled after [Suit CSS](http://suitcss.github.io/) conventions as those look clean to me. That's just one way to deal with it.

在例子中的 CSS 的命名是根据 [Suit CSS](http://suitcss.github.io/) 约定处理后的，这样对我来说看起来非常干净，这只是一种解决方案而已。

### 处理操作

Let's say we want to modify the owner of our TodoItems. For the sake of simplicity let's expect it's just a string and owner is the same for all TodoItems. Based on this design it would make sense to have an input for owner at our user interface. A naive implementation would look something like this:

让我们来开始修改我们的 TodoItems 的 owner，为了简化这个目的，我们假设 owner 只是一个字符串而且只有一个，基于这个设计，在用户界面里增加一个输入框给用户来修改用户名，改动是这样的：

```javascript
var React = require('react');
var TodoItem = require('./TodoItem.jsx');


module.exports = React.createClass({
    getInitialState() {
        return {
            todoItems: [
                {
                    task: 'Learn React',
                },
                {
                    task: 'Learn Webpack',
                },
                {
                    task: 'Conquer World',
                }
            ],
            owner: 'John Doe',
        };
    },

    render() {
        var todoItems = this.state.todoItems;
        var owner = this.state.owner;

        return <div>
            <div className='ChangeOwner'>
                <input type='text' defaultValue={owner} onChange={this.updateOwner} />
            </div>

            <div className='TodoItems'>
                <ul>{todoItems.map((todoItem, i) =>
                    <li key={'todoitem' + i}>
                        <TodoItem owner={owner} task={todoItem.task} />
                    </li>
                )}</ul>
            </div>
        </div>;
    },

    updateOwner() {
        this.setState({
            owner: e.target.value,
        });
    },
});
```

We could push `TodoItems` and `ChangeOwner` to separate components but I've kept it all in the same for now. Given React has one way binding by default, we get some extra noise compared to some other setups. React provides [ReactLink](http://facebook.github.io/react/docs/two-way-binding-helpers.html) helper to help deal with this particular case.

我们可以把 `TodoItems` 和 `ChangeOwner` 分离出去，但是我暂时不这么做了。React 默认提供了单向数据绑定，我们可以通过设置来调整，React 提供了 [ReactLink](http://facebook.github.io/react/docs/two-way-binding-helpers.html) 来提供双向数据绑定。

Even though lack of two way binding might sound like a downer, it actually isn't that bad a thing. It makes it easier to reason about the system. You simply have to follow the flow. This idea is highlighted in the Flux architecture. The easiest way to visualize it is to think up an infinite waterfall or a snake eating its tail. That's how the flow in the world of React generally works. Compared to this two way binding feels more chaotic.

尽管双向数据绑定的缺失听起来让人沮丧，但实际上并不是一件坏事，它能够让系统更加轻松的运行，你可能需要跟踪数据流。不过 FB 提出了 Flux 架构，最简单的方式去想出一个无限瀑布流，或者贪吃蛇，就是 React 的世界在做的这个数据流的事情，对比这两种绑定方式让人感觉更加迷茫。

### 使用一个Mixin

If we wanted to model the code above using a ReactLink, we would end up with something like this:

如果我们想使用 ReactLink的话，就像下面这样：

```javascript
// ReactLink 是一个插件，所以我们需要把它引入。
var React = require('react/addons');

...

module.exports = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    ...

    render() {
        var todoItems = this.state.todoItems;

        return <div>
            <div className='ChangeOwner'>
                <input type='text' valueLink={this.linkState('owner')} />
            </div>

            <div className='TodoItems'>
                <ul>{todoItems.map((todoItem, i) =>
                    <li key={'todoitem' + i}>
                        <TodoItem owner={owner} task={todoItem.task} />
                    </li>
                )}</ul>
            </div>
        </div>;
    },
});
```

Now we can skip that `onChange` handler. That `React.addons.LinkedStateMixin` encapsulates the logic. [Mixins](http://facebook.github.io/react/docs/reusable-components.html#mixins) provide us one way to encapsulate shared concerns such as this into something which can be reused easily.

现在我们可以跳过绑定 `onChange` 事件了，`React.addons.LinkedStateMixin` 封装了逻辑。[Mixins](http://facebook.github.io/react/docs/reusable-components.html#mixins) 给我们提供了一种可以重复使用的封装方法。

> It would be easy to start expanding the example now. You could for instance provide means to manipulate the contents of the Todo list or start extracting various parts into components of their own. It is up to you to make the app yours. If you are still feeling a bit lost, please read on. This is supposed to be a brief introduction to the topic!

> 现在拓展例子已经非常容易了，你现在应该就可以拓展 Todo 列表，或者把各种组件分离，这取决于你。如果你现在还是觉得不够掌握，那么继续阅读，这节只是话题的一个介绍。

### 测试

If you get serious about the Todo app, I recommend trying [Jest](https://facebook.github.io/jest/) out. Getting the initial test run might be a bit challenging but after you learn the basics of the API, it gets a lot simpler. The basic idea is that you instantiate a component with some properties and then query DOM using Jest and finally assert that the values in the UI are what you expect.

如果你觉得这个 Todo 应用需要测试，那么我推荐 [Jest](https://facebook.github.io/jest/)，刚开始写测试用例可能是一点挑战但是在你学习一些基础的 API 之后，它会变得更加简单，最基本的是你实例化一个带有一些属性的组件的时候，然后用 Jest 查询 DOM，最后断言界面中的值是你期望的值。

When you go beyond component level, that is where tools such as Selenium come in. You can use standard end to end testing tools on a higher level.

当你站在组件层级之上时，就有了比如类似 Selenium 的组件，你可以在更高层级使用标准的端对端测试工具。

## Flux 架构及其变种

As you saw above, it is quite simple to throw together a couple of components and start building an app. You can get quite far with `props` and `state`. Just load up some data over AJAX at `getInitialState` and pass it around. After a while this all might start feeling a bit unwieldy. Why, for instance, my components should have to know something about how to communicate with the backend?

就像你看到的，把一些组件放到一起就可以组成一个应用，你可以用 `props` 和 `state` 做的更多，或者在 `getInitialState` 中使用 AJAX 加载数据然后传给其他组件。这些使用一段时间之后可能会觉得有些笨拙，为什么？实践中，组件们需要知道如何和后端通讯。

This is where Flux architecture and its variants come in. I will start by describing [Reflux](https://github.com/spoike/refluxjs), a simplified variant of it. You can then work up to [understanding Flux](http://facebook.github.io/flux/docs/overview.html) in fuller detail once you understand this simplified setup.

所以出现了 Flux 架构和它的一些变种，我会介绍 [Reflux](https://github.com/spoike/refluxjs) 一种非常简单的 Flux 变种，你可以阅读这个 [understanding Flux](http://facebook.github.io/flux/docs/overview.html) 来全面了解 Flux。

In addition to View Components which we just discussed, Reflux introduces the concepts of Actions and Stores. The flow goes like this: Components -> Actions -> Stores -> Components. Ie. you could have some control in a Component which then triggers some Action which then performs some operation (say PUT) and updates Store state. This state change is then propagated to Components listening to the Store.

并且，Reflux 介绍了一种 Actions 和 Stores 的概念去组成刚才我们讨论的视图组件。整个数据流是这样的：组件 -> Actions -> Stores -> 组件。这样你可以在一个组件中控制触发一些 Action 然后执行一些操作（比如 PUT）然后更新 Store 的状态，状态的更新传播给监听 Store 的那些组件们。

In case of our Todo example we would define basic `TodoActions` like create, update, delete and such. We would also have a `TodoStore`. It would maintain a data structure of a `TodoList`. Our components would then consume that data and display it as appropriate.

在我们的这个 Todo 例子中，我们定义了一个基础的 `TodoActions` 比如创建、更新、删除之类的，我们也有个 `TodoStore`，它是整个 `TodoList` 的数据结构中心，组件们会读取那里的数据，然后适当得展现出来。

As development of Reflux is quite in flux I won't give you a full example in this case. I just wanted to illustrate one possible way to deal with scaling up from bare React. You should explore various options and deepen your understanding of possible architectures. The ideas are quite similar but the devil is in the details as always. There are always drawbacks to consider.

Reflux 的开发和 Flux 差不多，我就不在这里详细讲述了，我只是想说明如何处理从纯 React 扩大的一种可能的方式。你需要去浏览一些相关看法，然后深入理解那些架构。那些想法都差不多，就是细节不太一样，都有各自的一些缺点有待考虑。

### 同构渲染

One of the big features which React provides thanks to its design is so called isomorphic rendering. Back in the day we used to render whole HTML in the backend and provide just that for the client to render. Then we would sprinkle a little JavaScript magic to make things more interactive and so on. After a while the pendulum swung to frontend side. We served minimal amount of HTML to the client and constructed the rest, including routing, using JavaScript entirely on frontend.

React 设计了一种叫做两端渲染的重要功能。过去我们在后端渲染整个 HTML，然后交给客户端去渲染，然后我们加上一点点 JavaScript 做的交互。再后来，这个活交给浏览器做去，后端返回最小的 HTML 给客户端，然后在客户端构建了一整套用 JavaScript 全权控制的系统，包括路由。

The main problems with frontend driven rendering have to do with performance, high dependency on JavaScript (think of the noscript folk!) and poor SEO. With isomorphic rendering you can mitigate these problems effectively. React allows you to prerender HTML at backend side. You can also hydrate some stores with pre-existing data making it possible to skip certain data queries altogether initially! Even web crawlers will be happy as they get some HTML to scrape.

前端驱动渲染的主要问题是性能问题、 JavaScript 的高度依赖（设想那些不能运行 JavaScript 的情况）和 SEO 问题。使用两端渲染，你可以轻松解决这些问题。React 允许你在服务器端预渲染 HTML，你也可以在服务器端预先存储一些数据来跳过初始化的一些数据查询。甚至一些网络爬虫能够轻松地获取到一些 HTML 内容。

This is still partly uncharted territory. Various implementations of Flux still struggle with the concept. I have no doubt we will see stronger solutions in the future, however, as people learn to deal with isomorphism better. That said isomorphic rendering can be considered a nice extra capability to have but it definitely isn't something that's just must have. There are some ways to work around certain issues, such as poor SEO, even without it. It just depends on where you want to put the effort.


这一部分仍然是一个未知的领域（译者注：原文发布于2015年4月），很多 Flux 的实现在这个概念上还没同意，但是毋庸置疑，我们在未来能够看到更加完善的解决方案，无论如何，大家会认识到两端渲染的好处。虽然两端渲染听起来是一个非常好的解决方案，但是它不是必要的。现在已经有很多能够解决这些问题的方案，比如 SEO 的问题，甚至没有用这种解决方案，它只是依赖于你想要如何付出努力。
