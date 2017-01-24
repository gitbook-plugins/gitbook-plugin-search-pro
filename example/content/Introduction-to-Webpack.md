In web development we deal with a lot of small technical artifacts. You use HTML to describe page structure, CSS how to style it and JavaScript for logic. Or you can replace HTML with something like Jade, CSS with Sass or LESS, JavaScript with CoffeeScript, TypeScript and the ilk. In addition you have to deal with project dependencies (ie. external libraries and such).

在 Web 开发历程上，我们构建了很多小型的技术解决方案，比如用 HTML 去描述页面结构，CSS 去描述页面样式，JavaScript 去描述页面逻辑，或者你也可以用一些比如 Jade 去取代 HTML，用 Sass 或 Less 去取代CSS，用 CoffeeScript 或者 TypeScript 之类的去取代 JavaScript，不过项目中的依赖可能是一件比较烦恼的事情。（需要安装额外很多的库）

There are good reasons why we use these various technologies. Regardless of what we use, however, we still want to end up with something that can be run on the browsers of the clients. This is where build systems come in. Historically speaking there have been many. [Make](https://en.wikipedia.org/wiki/Make_%28software%29) is perhaps the most known one and still a viable option in many cases. In the world of frontend development particularly [Grunt](http://gruntjs.com/) and [Gulp](http://gulpjs.com/) have gained popularity. Both are made powerful by plugins. [NPM](https://www.npmjs.com/), the Node.js package manager, is full of those.

这里有很多为什么我们需要尝试那些新技术的理由。不管我们用什么，总之，我们还是希望使用那些能够处理在浏览器端的方案，所以出来了编译方案。历史上已经有很多分享了，比如 [Make](https://en.wikipedia.org/wiki/Make_%28software%29) 可能是很多解决方案中最知名且是可行的方案。[Grunt](http://gruntjs.com/) 和 [Gulp](http://gulpjs.com/) 是在是前端的世界中最流行的解决方案，他们两个都有很多非常有用的插件。[NPM](https://www.npmjs.com/)（Node.js 的包管理器）则包含了他们两个。

## Grunt

Grunt is the older project. It relies on plugin specific configuration. This is fine up to a point but believe me, you don't want to end up having to maintain a 300 line `Gruntfile`. The approach simply turns against itself at some point. Just in case you are curious what the configuration looks like, here's an example from [Grunt documentation](http://gruntjs.com/sample-gruntfile):

Grunt 是相比后面几个更早的项目，他依赖于各种插件的配置。这是一个很好的解决方案，但是请相信我，你不会想看到一个 300 行的 `Gruntfile`。如果你好奇 Grunt 的配置会如何，那么这里是有个从 [Grunt 文档](http://gruntjs.com/sample-gruntfile) 的例子：

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

};
```

## Gulp

Gulp takes a different approach. Instead of relying on configuration per plugin you deal with actual code. Gulp builds on top of the tried and true concept of piping. If you are familiar with Unix, it's the same here. You simply have sources, filters and sinks. In this case sources happen to match to some files, filters perform some operations on those (ie. convert to JavaScript) and then output to sinks (your build directory etc.). Here's a sample `Gulpfile` to give you a better idea of the approach taken from the project README and abbreviated a bit:

Gulp 提供了一个不一样的解决方案，而不是依赖于各种插件的配置。Gulp 使用了一个文件流的概念。如果你熟悉 Unix，那么 Gulp 对你来说会差不多，Gulp 会提供你一些简单化的操作。在这个解决方案中，是去匹配一些文件然后操作（就是说和 JavaScript 相反）然后输出结果（比如输出在你设置的编译路径等）。这里有一个简单的 `Gulpfile` 的例子：


```javascript
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
};

// 不是所有的任务需要使用 streams
// 一个 gulpfile 只是另一个node的程序，所以你可以使用所有 npm 的包
gulp.task('clean', function(cb) {
  // 你可以用 `gulp.src` 来使用多重通配符模式
  del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
  // 压缩和复制所有 JavaScript （除了第三方库）
  // 加上 sourcemaps
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// 监听文件修改
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

// 默认任务（就是你在命令行输入 `gulp` 时运行）
gulp.task('default', ['watch', 'scripts']);
```

Given the configuration is code you can always just hack it if you run into troubles. You can wrap existing Node.js modules as Gulp plugins and so on. You still end up writing a lot of boilerplate for casual tasks, though.

这些配置都是代码，所以当你遇到问题也可以修改，你也可以使用已经存在的 Gulp 插件，但是你还是需要写一堆模板任务。

## Browserify

Dealing with JavaScript modules has always been a bit of a problem given the language actually doesn't have a concept of module till ES6. Ergo we are stuck with the 90s when it comes to browser environment. Various solutions, including [AMD](http://browserify.org/), have been proposed. In practice it can be useful just to use CommonJS, the Node.js format, and let tooling deal with the rest. The advantage is that you can often hook into NPM and avoid reinventing the wheel.

处理 JavaScript 模块一直是一个大问题，因为这个语言在 ES6 之前没有这方面的概念。因此我们还是停留在90年代，各种解决方案，比如提出了 [AMD](http://browserify.org/)。在实践中只使用 CommonJS （ Node.js 所采用的格式）会比较有帮助，而让工具去处理剩下的事情。它的优势是你可以发布到 NPM 上来避免重新发明轮子。

[Browserify](http://browserify.org/) solves this problem. It provides a way to bundle CommonJS modules together. You can hook it up with Gulp. In addition there are tons of smaller transformation tools that allow you to move beyond the basic usage (ie. [watchify](https://www.npmjs.com/package/watchify) provides a file watcher that creates bundles for you during development automatically). This will save some effort and no doubt is a good solution up to a point.

[Browserify](http://browserify.org/) 解决了这个问题，它提供了一种可以把模块集合到一起的方式。你可以用 Gulp 调用它，此外有很多转换小工具可以让你更兼容的使用（比如 [watchify](https://www.npmjs.com/package/watchify) 提供了一个文件监视器帮助你在开发过程中更加自动化地把文件合并起来），这样会省下很多精力。毋庸置疑，一定程度来讲，这是一个很好的解决方案。


## Webpack

Webpack expands on the idea of hooking into CommonJS `require`. What if you could just `require` whatever you needed in your code, be it CoffeeScript, Sass, Markdown or something? Well, Webpack does just this. It takes your dependencies, puts them through loaders and outputs browser compatible static assets. All of this is based on configuration. Here is a sample configuration from [the official Webpack tutorial](http://webpack.github.io/docs/tutorials/getting-started/):

Webpack 扩展了 CommonJs 的 `require` 的想法，比如你想在 CoffeeScript、Sass、Markdown 或者其他什么代码中 `require` 你想要的任何代码的话？那么 Webpack 正是做这方面的工作。它会通过配置来取出代码中的依赖，然后把他们通过加载器把代码兼容地输出到静态资源中。这里是一个 [Webpack 官网](http://webpack.github.io/docs/tutorials/getting-started/) 上的例子： 

```javascript
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
```

In the following sections we'll build on top of this idea and show how powerful it is. You can, and probably should, use Webpack with some other tools. It won't solve everything. It does solve the difficult problem of bundling, however, and that's one worry less during development.

在接下来的章节中我们会使用 Webpack 来构建项目来展示它的能力。你可以用其他工具和 Webpack 一起使用。它不会解决所有事情，只是解决一个打包的难题，无论如何，这是在开发过程中需要解决的问题。