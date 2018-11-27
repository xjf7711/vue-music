# vue-music

    

## 概述
> 项目是基于Vue.js，成品是一个移动端的音乐播放器，来源于imooc的实战课程“Vue.js 打造高级实战——音乐 App”。
> 文件夹结构按照vue-cli3的demo进行了调整
> 使用vue-cli3,sass等项目改造。
> 自己动手实践并加以修改拓展。 
> 项目的大致流程是Vue-cli构建开发环境，分析需求，设计构思，规划目录结构，开始编码。
> 慕课网学习地址: http://coding.imooc.com/class/107.html

## 视图层
```
推荐页
歌手页
    歌手详情
歌曲排行榜
    排行榜详情
搜索页
用户中心
```

## 数据来源
```
所有数据都来自于QQ音乐，抓取自QQ的接口，大部分接口都是JSONP，抓取比较容易，其中一些接口限制了host，
不能直接抓取，采用的方法是用axios代理，设置header，以此绕过host的限制。 

PS：具体代码请看vue.config.js文件中dev-serve中proxy.

```

## 技术栈

#### 【前端】

    Vue：用于构建用户界面的 MVVM 框架。它的核心是响应的数据绑定和组系统件
    vue-router：为单页面应用提供的路由系统，项目上线前使用了 Lazy Loading Routes 技术来实现异步加载优化性能
    vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
    vue-lazyload：第三方图片懒加载库，优化页面加载速度
    better-scroll：iscroll 的优化版，使移动端滑动体验更加流畅
    Sass(Scss)：css 预编译处理器
    ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用

#### 【后端】

    Node.js：利用 Express 起一个本地测试服务器
    jsonp：服务端通讯。抓取 QQ音乐(移动端)数据
    axios：服务端通讯。结合 Node.js 代理后端请求，抓取 QQ音乐(PC端)数据
    【自动化构建及其他工具】
    
    vue-cli：Vue 脚手架工具，快速初始化项目代码
    eslint：代码风格检查工具，规范代码书写
    vConsole：移动端调试工具，在移动端输出日志

## 项目树
```

├── README.md
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── shotcut
├── package.json
├── src
│   ├── App.vue
│   ├── api
│   │   ├── config.js
│   │   ├── rank.js
│   │   ├── recommend.js
│   │   ├── search.js
│   │   ├── singer.js
│   │   └── song.js
│   ├── components
│   │   ├── confirm
│   │   │   └── confirm.vue
│   │   ├── listview
│   │   │   └── listview.vue
│   │   ├── loading
│   │   │   ├── loading.gif
│   │   │   └── loading.vue
│   │   ├── no-result
│   │   │   ├── no-result.vue
│   │   │   ├── no-result@2x.png
│   │   │   └── no-result@3x.png
│   │   ├── progress-bar
│   │   │   └── progress-bar.vue
│   │   ├── progress-circle
│   │   │   └── progress-circle.vue
│   │   ├── scroll
│   │   │   └── scroll.vue
│   │   ├── search-box
│   │   │   └── search-box.vue
│   │   ├── search-list
│   │   │   └── search-list.vue
│   │   ├── slider
│   │   │   └── slider.vue
│   │   ├── song-list
│   │   │   ├── first@2x.png
│   │   │   ├── first@3x.png
│   │   │   ├── second@2x.png
│   │   │   ├── second@3x.png
│   │   │   ├── song-list.vue
│   │   │   ├── third@2x.png
│   │   │   └── third@3x.png
│   │   ├── switches
│   │   │   └── switches.vue
│   │   └── top-tip
│   │       └── top-tip.vue
│   ├── assets
│   │   ├── fonts
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   ├── image
│   │   │   └── default.png
│   │   ├── js
│   │   │   ├── cache.js
│   │   │   ├── config.js
│   │   │   ├── dom.js
│   │   │   ├── jsonp.js
│   │   │   ├── mixin.js
│   │   │   ├── request.js
│   │   │   ├── singer.js
│   │   │   ├── song.js
│   │   │   └── util.js
│   │   └── styles
│   │       ├── base.sass
│   │       ├── icon.sass
│   │       ├── index.sass
│   │       ├── mixin.sass
│   │       ├── reset.sass
│   │       └── variable.sass
│   ├── views
│   │   ├── add-song
│   │   │   └── add-song.vue
│   │   ├── disc
│   │   │   └── disc.vue
│   │   ├── m-header
│   │   │   ├── logo@2x.png
│   │   │   ├── logo@3x.png
│   │   │   └── m-header.vue
│   │   ├── music-list
│   │   │   └── music-list.vue
│   │   ├── player
│   │   │   └── player.vue
│   │   ├── playlist
│   │   │   └── playlist.vue
│   │   ├── rank.............. 排行页
│   │   │   └── rank.vue
│   │   ├── recommend......... 推荐页
│   │   │   └── recommend.vue
│   │   ├── search............ 搜索页
│   │   │   └── search.vue
│   │   ├── singer............ 歌手页
│   │   │   └── singer.vue
│   │   ├── singer-detail..... 歌手详情页
│   │   │   └── singer-detail.vue
│   │   ├── suggest
│   │   │   └── suggest.vue
│   │   ├── tab
│   │   │   └── tab.vue
│   │   ├── top-list
│   │   │   └── top-list.vue
│   │   └── user-center....... 用户中心
│   │       └── user-center.vue
│   ├── main.js
│   ├── router.js
│   └── store
│       ├── actions.js
│       ├── getters.js
│       ├── index.js
│       ├── mutation-types.js
│       ├── mutations.js
│       └── state.js
└── vue.config.js

```

## 数据处理

> 爬取QQ音乐2W歌单和50W首歌曲: https://blog.csdn.net/lht_okk/article/details/77206510
> 歌单url：https://y.qq.com/portal/playlist.html
> vue-music 跨域获取QQ音乐歌单接口: https://www.cnblogs.com/shengnan-2017/p/9104079.html

```
通过调用QQ音乐的JSONP接口，获取的数据并不能直接拿来用，需要做进一步的规格化，
达到我们使用的要求，所以在这方面单独封装了一个class来处理这方面的数据，具体请看src/assets/js/song.js。

在请求JSONP的时候，用到了一个JSONP库，这个库代码十分简短，只有几十行，有兴趣的同学可以学习下。

使用时，就是将请求的参数拼接在请求url上，然后调用这个库的jsonp方法。

所以，在此封装了两个函数，一个是将参数拼接在url上，另一个是将库里面的jsonp方法Promise化，
方便我们使用，具体请查看src/assets/js/jsonp.js。

将请求的数据格式化后再通过Vuex传递，组件间共享，实现歌曲的播放切换等。
```

## 交互体验
```
该项目的很多地方都涉及到滚动，包括下拉滚动，下拉滚动刷新等。
这里面用到了一个库(better-scroll)，来实现所有涉及到的滚动，建议学习下它的API。

其他动画包括了Vue的transition动画，路由之间切换时的简单动画，播放器打开时的动画，这个地方比较难，也比较好玩。

打开页面时的加载Loading效果，其实就是一个Loading组件，也比较简单。

为了减少流量，图片加载使用了懒加载的方式，滚动时再加载真实的图片。 具体效果请自身体验：）
```




## 项目截图
![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/shotcut/1.png)

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/shotcut/2.png)

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/shotcut/3.png)

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/shotcut/4.png)

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/shotcut/5.png)


## 安装与运行

```
# git
git clone https://github.com/xjf7711/vue-music.git
# 进入vue-music文件夹
cd vue-music
# install dependencies
npm install
# serve with hot reload
npm run serve
# build for production with minification
npm run build 项目打包 

感兴趣的童鞋可以来个star
```

## 修改记录

```
1、目录结构修改
2、axios请求和api修改
3、stylus改为sass
```

## 计划

```
1、jsonp方式改为axios。开发环境用代理，打包用baseURL。
```

## todo
```
一、api中
1、axios改为request后，有问题。。。
2、axios替代jsonp请求。
3、文件名中My要去掉。
4、接口权限要获取

```
