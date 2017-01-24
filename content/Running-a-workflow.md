Hitting `npm run build` all the time will get boring eventually. Fortunately we can work around that quite easily. Let's set up `webpack-dev-server`.

如果需要一直输入 `npm run build` 确实是一件非常无聊的事情，幸运的是，我们可以把让他安静的运行，让我们设置 `webpack-dev-server`。

## 设置 `webpack-dev-server`

As a first step, hit `npm i webpack-dev-server --save`. In addition we'll need to tweak `package.json` *scripts* section to include it. Here's the basic idea:

第一步，输入 `npm i webpack-dev-server --save`，此外，我们需要去调整 `package.json` *scripts* 部分去包含这个指令，下面是基本的设置：

*package.json*
```json
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
  }
}
```

When you run `npm run dev` from your terminal it will execute the command stated as a value on the **dev** property. This is what it does:

当你在命令行里运行 `npm run dev` 的时候他会执行 **dev** 属性里的值。这是这些指令的意思：

1. `webpack-dev-server` - Starts a web service on localhost:8080
2. `--devtool eval` - Creates source urls for your code. Making you able to pinpoint by filename and line number where any errors are thrown
3. `--progress` - Will show progress of bundling your application
4. `--colors` - Yay, colors in the terminal!
5. `--content-base build` - Points to the output directory configured


1. `webpack-dev-server` - 在 localhost:8080 建立一个 Web 服务器
2. `--devtool eval` - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
3. `--progress` - 显示合并代码进度
4. `--colors` - Yay，命令行中显示颜色！
5. `--content-base build` - 指向设置的输出目录

To recap, when you run `npm run dev` this will fire up the webservice, watch for file changes and automatically rebundle your application when any file changes occur. How neat is that!

总的来说，当你运行 `npm run dev` 的时候，会启动一个 Web 服务器，然后监听文件修改，然后自动重新合并你的代码。真的非常简洁！

Go to **http://localhost:8080** and you should see something.

访问 **http://localhost:8080** 你会看到效果。