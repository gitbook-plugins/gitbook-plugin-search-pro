## gitbook-plugin-search-pro

Gitbook search engine pro. (支持中文搜索)

You can search any characters(utf-8) and highlight it in your GitBook, not only english(exp:Chinese).

> Note: Only gitbook >= 3.0.0 support

### Demo preview

---

![](https://github.com/gitbook-plugins/gitbook-plugin-search-pro/blob/master/previews/search1.gif)

---

![](https://github.com/gitbook-plugins/gitbook-plugin-search-pro/blob/master/previews/search2.gif)

---

![](https://github.com/gitbook-plugins/gitbook-plugin-search-pro/blob/master/previews/search3.gif)

---

### Usage

Before use this plugin, you should disable the default search plugin first, 
Here is a `book.js` configuration example:

```js
{
    "plugins": [
      "-lunr", "-search", "search-pro"
    ]
}
```

### Example


```
    > cd ./example
    > npm install
    > npm start
```

And then open http://127.0.0.1:4000


### Preview

[![](./search.gif)](https://lwdgit.github.io/gitbook-plugin-search-plus/)
[![](./search2.gif)](https://lwdgit.github.io/gitbook-plugin-search-plus/)
[![](./search3.gif)](https://lwdgit.github.io/gitbook-plugin-search-plus/book/?q=%E8%BF%99%E6%9C%AC%E5%B0%8F%E4%B9%A6%E7%9A%84%E7%9B%AE%E7%9A%84%E6%98%AF%E5%BC%95%E5%AF%BC%E4%BD%A0%E8%BF%9B%E5%85%A5%20React%20%E5%92%8C%20Webpack%20%E7%9A%84%E4%B8%96%E7%95%8C)


### Thanks:
* [lwdgit](https://github.com/lwdgit/gitbook-plugin-search-plus)
* [gitbook-plugin-lunr](https://github.com/GitbookIO/plugin-lunr)
* [gitbook-plugin-search](https://github.com/GitbookIO/plugin-search)
* [mark.js](https://github.com/julmot/mark.js)

