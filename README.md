## gitbook-plugin-search-pro

Gitbook search engine pro. (支持中文搜索)

### Demo preview

![](https://raw.githubusercontent.com/gitbook-plugins/gitbook-plugin-search-pro/master/demo/show-1.gif)

### Usage

Put this in your book.json:

```js
{
	"plugins": ["search-pro"],
    "pluginsConfig": {
      "search-pro": {
        "cutWordLib": "nodejieba",
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

Thanks: nodejieba(中文分词功能)


<div style="color:red">
<video id="Html5Video" width="640" height="360" preload controls> 
<source src="video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
<source src="video.ogv" type='video/ogg; codecs="theora, vorbis"' />
<source src="video.webm" type='video/webm; codecs="vp8, vorbis"' />
</div>