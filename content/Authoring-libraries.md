Webpack can be handy for packaging your library for general consumption. You can use it to output UMD, a format that's compatible with various module loaders (CommonJS, AMD) and globals.

Webpack 可以非常方便地打包和生成你的库，你可以用它输出 UMD，一种可以兼容很多模块加载器（CommonJS、AMD）和全局变量的格式。

## 如何把库输出成 UMD?

Especially if you are creating a library, it can be useful to output an UMD version of your library. This can be achieved using the following snippet:

尤其是如果你创建了一个库，那么输出一个 UMD 版本是非常有用的，就像下面的片段一样实现：

```javascript
output: {
    path: './dist',
    filename: 'mylibrary.js',
    libraryTarget: 'umd',
    library: 'MyLibrary',
},
```

In order to avoid bundling big dependencies like React, you'll want to use a configuration like this in addition:

为了避免去合并类似 React 的大型依赖，你可以使用下面这样的设置：

```javascript
externals: {
    react: 'react',
    'react/addons': 'react'
},
```

## 如何输出压缩版?

Here's the basic idea:

这里是一个简单的方案：

```javascript
output: {
    path: './dist',
    filename: 'awesomemular.min.js',
    libraryTarget: 'umd',
    library: 'Awesomemular',
},
plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
    }),
]
```