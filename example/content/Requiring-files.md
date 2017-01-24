## 模块

Webpack allows you to use different module patterns, but "under the hood" they all work the same way. All of them also works straight out of the box.

Webpack 允许你使用不同的模块类型，但是 “底层”必须使用同一种实现。所有的模块都能够开箱即用。

#### ES6 模块

```javascript
import MyModule from './MyModule.js';
```

#### CommonJS

```javascript
var MyModule = require('./MyModule.js');
```

#### AMD

```javascript
define(['./MyModule.js'], function (MyModule) {

});
```

## 理解文件路径

A module is loaded by filepath. Imagine the following tree structure:

一个模块会按它的文件路径来加载，看一下下面的这个结构：

- /app
  - /modules
    - MyModule.js
  - main.js (entry point)
  - utils.js

Lets open up the *main.js* file and require *app/modules/MyModule.js* in the two most common module patterns:

打开 *main.js* 然后可以通过下面两种方式引入 *app/modules/MyModule.js* 

*app/main.js*
```javascript
// ES6
import MyModule from './modules/MyModule.js';

// CommonJS
var MyModule = require('./modules/MyModule.js');
```

The `./` at the beginning states "relative to the file I am in now".

最开始的 `./` 是 “相对当前文件路径” 

Now let us open the *MyModule.js* file and require **app/utils**.

让我们打开 *MyModule.js* 然后引入 **app/utils**：

*app/modules/MyModule.js*
```javascript
// ES6 相对路径
import utils from './../utils.js';

// ES6 绝对路径
import utils from '/utils.js';

// CommonJS 相对路径
var utils = require('./../utils.js');

// CommonJS 绝对路径
var utils = require('/utils.js');
```

The **relative path** is relative to the current file. The **absolute path** is relative to the entry file, which in this case is *main.js*.

**相对路径**是相对当前目录。**绝对路径**是相对入口文件，这个案例中是 *main.js*。

### 我需要使用文件后缀么？

No, you do not have to use *.js*, but it highlights better what you are requiring. You might have some .js files, and some .jsx files and even images and css can be required by Webpack. It also clearly differs from required node_modules and specific files.
   
不，你不需要去特意去使用 *.js*，但是他能够更让你更清楚你正引入的档案。因為你可能有一些 .js 文件和一些 .jsx 文件，甚至一些图片和 css 可以用 Webpack 來引入。加入文件后缀，可以让你清楚地区分你引入的是 node_modules 或特定档案还是一般文件档案。

Remember that Webpack is a module bundler! This means you can set it up to load any format you want given there is a loader for it. We'll delve into this topic later on.

记住，Webpack 只是一个模块合并器！也就是说你可以设置他去加载任何你写的匹配，只要有一个加载器。我们稍后会继续深入这个话题。
