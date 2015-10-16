## gitbook-plugin-search-pro

search-pro(支持中文的搜索)

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

And you're done!