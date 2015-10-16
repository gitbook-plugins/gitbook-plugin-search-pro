## gitbook-plugin-search-pro

Gitbook search engine pro. (支持中文搜索)

### Usage

Put this in your book.json:

```js
{
	"plugins": ["search-pro"],
    "pluginsConfig": {
      "search-pro": {
        "cutLib": "nodejieba",
        "defineWord" : ["小需求","基础建设"]
      }
    }
}
```

And

```
gitbook install
gitbook build/serve
```