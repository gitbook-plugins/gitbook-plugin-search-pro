When users hit the URL of your application they will need to download different assets. CSS, JavaScript, HTML, images and fonts. The great thing about Webpack is that you can stop thinking how you should download all these assets. You can do it through JavaScript.

当用户输入你应用的地址的时候，他们需要去下载不同的资源，比如 CSS、JavaScript、HTML、图片和字体。不过 Webpack 做了一件事情，让你不用去考虑如何不用下载全部资源。

> OccurenceOrderPlugin


## 如何让生产输出附上哈希值？

* Use `[hash]`. Example: `'assets/bundle.[hash].js'`
* 使用 `[hash]`。比如：`'assets/bundle.[hash].js'`

The benefit of this is that this will force the client to reload the file. There is more information about `[hash]` at [the long term caching](http://webpack.github.io/docs/long-term-caching.html) section of the official documentation.

这个的好处是能够让客户端强制重新加载这个文件，可以在 [the long term caching](http://webpack.github.io/docs/long-term-caching.html) 了解更多关于 `[hash]`，

> Is it possible to change the hash only if bundle changed?
> 有可能只有合并文件变化了才会修改哈希值么？