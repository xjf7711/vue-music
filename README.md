# vue-music

## 概述

> 项目是基于Vue全家桶(2.x)制作的移动端音乐WebApp，成品是一个移动端的音乐播放器，
> 来源于imooc的实战课程“Vue.js 打造高级实战——音乐 App”。

> 针对cordova方式打包成APP后的请求做了处理，主要是引用了cordova-plugin-http插件。
> 在APP中使用插件的方式请求数据，而不是axios方式。

> 文件夹结构使用vue-cli3的demo的结构。
> 因为vue-cli3推荐使用scss,所以使用scss改造了原来的stalus。

> 由于QQ音乐API接口调整，相应的做了调整。在vue.config.js中的dev-serve的proxy设置了代理。
> 自己动手实践并加以修改拓展。 

> 项目的大致流程是Vue-cli构建开发环境，分析需求，设计构思，规划目录结构，开始编码。

> 慕课网学习地址: http://coding.imooc.com/class/107.html

## 视图层

#### 推荐页

>上部分是一个轮播图组件，使用第三方库 better-scroll 辅助实现，使用 jsonp 抓取 QQ音乐(移动端)数据   

>下部分是一个歌单推荐列表，使用 axios + Node.js 代理后端请求，绕过主机限制 (伪造 headers)，抓取 QQ音乐(PC端)数据

>歌单推荐列表图片，使用图片懒加载技术 vue-lazyload，优化页面加载速度

>为了更好的用户体验，当数据未请求到时，显示 loading 组件

#### 推荐页 -> 歌单详情页

>由于歌手的状态多且杂，这里使用 vuex 集中管理歌手状态

>这个组件更加注重 UX，做了很多类原生 APP 动画，如下拉图片放大、跟随推动、ios 渐进增强的高斯模糊效果 backdrop-filter 等

#### 歌手页

>左右联动是这个组件的难点

>左侧是一个歌手列表，使用 jsonp 抓取 QQ音乐(PC端)歌手数据并重组 JSON 数据结构

>列表图片使用懒加载技术 vue-lazyload，优化页面加载速度

>右侧是一个字母列表，与左侧歌手列表联动，滚动固定标题实现

#### 歌手页 -> 歌手详情页

> 复用歌单详情页，只改变传入的参数，数据同样爬取自QQ音乐

#### 歌曲排行榜

>排行榜详情--复用歌单详情页

#### 搜索页

>抓数据，写组件，另外，根据抓取的数据特征，做了上拉刷新的功能

>考虑到数据量大且频繁的问题，对请求做了节流处理

>考虑到移动端键盘占屏的问题，对滚动前的 input 做了 blur() 操作

>对搜索历史进行了 localstorage 缓存，清空搜索历史时使用了改装过的 confirm 组件

>支持将搜索的歌曲添加到播放列表

#### 用户中心

>将 localstorage 中 “我的收藏” 和 “最近播放” 反映到界面上

#### 播放器内核页

>核心组件。用 vuex 管理各种播放时状态，播放、暂停等功能调用 audio API

>播放器可以最大化和最小化

>中部唱片动画使用第三方 JS 动画库 create-keyframe-animation 实现

>底部操作区图标使用 iconfonts。

>抽象了一个横向进度条组件和一个圆形进度条组件，横向进度条可以拖动小球和点击进度条来改变播放进度，圆形进度条组件使用 SVG <circle> 元素

>播放模式有：顺序播放、单曲循环、随机播放，原理是调整歌单列表数组

>歌词的爬取利用 axios 代理后端请求，伪造 headers 来实现，先将歌词 jsonp 格式转换为 json 格式，再使用第三方库 js-base64 进行 Base64 解码操作，最后再使用第三方库 lyric-parser对歌词进行格式化

>实现了侧滑显示歌词、歌词跟随进度条高亮等交互效果

>增加了当前播放列表组件，可在其中加入/删除歌曲

#### 其他

>此应用的全部数据来自 QQ音乐，推荐页的歌单列表及歌词是利用 axios 结合 node.js 代理后端请求抓取的。

>全局通用的应用级状态使用 vuex 集中管理

>全局引入 fastclick 库，消除 click 移动浏览器300ms延迟

>页面是响应式的，适配常见的移动端屏幕，采用 flex 布局


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
    
#### 【自动化构建及其他工具】
    
    vue-cli：Vue 脚手架工具，快速初始化项目代码
    eslint：代码风格检查工具，规范代码书写
    vConsole：移动端调试工具，在移动端输出日志

## 项目树

```

├── README.md
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── screencut
├── package.json
├── src
│   ├── api
│   │   ├── config.js
│   │   ├── rank.js
│   │   ├── recommend.js
│   │   ├── search.js
│   │   ├── singer.js
│   │   └── song.js
│   ├── assets
│   │   ├── fonts
│   │   │   ├── iconmoon.eot
│   │   │   ├── iconmoon.svg
│   │   │   ├── iconmoon.ttf
│   │   │   └── iconmoon.woff
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   ├── images
│   │   │   └── default.png
│   │   ├── js
│   │   │   ├── config.js
│   │   │   ├── corHttp.js
│   │   │   ├── jsonp.js
│   │   │   ├── mixin.js
│   │   │   ├── request.js
│   │   │   ├── SingerClass.js
│   │   │   ├── SongClass.js
│   │   │   ├── storage.js
│   │   │   └── utils.js
│   │   └── styles
│   │       ├── sass
│   │       │   ├── base.sass
│   │       │   ├── icon.sass
│   │       │   ├── index.sass
│   │       │   ├── mixin.sass
│   │       │   ├── reset.sass
│   │       │   └── variable.sass
│   │       ├── scss
│   │       │   ├── base.scss
│   │       │   ├── icon.scss
│   │       │   ├── index.scss
│   │       │   ├── mixin.scss
│   │       │   ├── reset.scss
│   │       │   └── variable.scss
│   │       ├── stylus
│   │       │   ├── base.styl
│   │       │   ├── icon.styl
│   │       │   ├── index.styl
│   │       │   ├── mixin.styl
│   │       │   ├── reset.styl
│   │       │   └── variable.styl
│   │       └── logo.png
│   ├── components
│   │   ├── confirm
│   │   │   └── Confirm.vue
│   │   ├── loading
│   │   │   ├── loading.gif
│   │   │   └── Loading.vue
│   │   ├── no-result
│   │   │   ├── no-result@2x.png
│   │   │   ├── no-result@3x.png
│   │   │   └── NoResult.vue
│   │   ├── phone-list
│   │   │   └── PhoneList.vue
│   │   ├── progress-bar
│   │   │   └── ProgressBar.vue
│   │   ├── progress-circle
│   │   │   └── ProgressCircle.vue
│   │   ├── scroll
│   │   │   └── Scroll.vue
│   │   ├── search-box
│   │   │   └── SearchBox.vue
│   │   ├── search-list
│   │   │   └── SearchList.vue
│   │   ├── slider
│   │   │   └── Slider.vue
│   │   ├── song-list
│   │   │   ├── first@2x.png
│   │   │   ├── first@3x.png
│   │   │   ├── second@2x.png
│   │   │   ├── second@3x.png
│   │   │   ├── SongList.vue
│   │   │   ├── third@2x.png
│   │   │   └── third@3x.png
│   │   ├── switches
│   │   │   └── Switches.vue
│   │   └── top-tip
│   │       └── TopTip.vue
│   ├── router.js
│   │   └── index.js
│   ├── store
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── mutations.js
│   │   ├── mutations-types.js
│   │   └── state.js
│   ├── views
│   │   ├── add-song
│   │   │   └── AddSong.vue
│   │   ├── header
│   │   │   ├── logo@2x.png
│   │   │   ├── logo@3x.png
│   │   │   └── Header.vue
│   │   ├── music-list
│   │   │   └── MusicList.vue
│   │   ├── play-list
│   │   │   └── PlayList.vue
│   │   ├── player
│   │   │   └── Player.vue
│   │   ├── rank.............. 排行页
│   │   │   └── Rank.vue
│   │   ├── rank-detail....... 排行详情页
│   │   │   └── RankDetail.vue
│   │   ├── recommend......... 推荐页
│   │   │   └── Recommend.vue
│   │   ├── search............ 搜索页
│   │   │   └── Search.vue
│   │   ├── singer............ 歌手页
│   │   │   └── Singer.vue
│   │   ├── singer-detail..... 歌手详情页
│   │   │   └── SingerDetail.vue
│   │   ├── song-list......... 歌曲列表页
│   │   │   └── SingerList.vue
│   │   ├── suggest
│   │   │   └── Suggest.vue
│   │   ├── tab
│   │   │   └── Tab.vue
│   │   ├── top-list
│   │   │   └── TopList.vue
│   │   └── user............. 用户中心
│   │       └── User.vue
│   ├── App.vue
│   ├── main.js
├── README.md............说明
└── vue.config.js........webpack配置

```

## 数据来源

```
所有数据都来自于QQ音乐，抓取自QQ的接口，大部分接口都是JSONP，抓取比较容易，其中一些接口限制了host，
不能直接抓取，采用的方法是用axios代理，设置header，以此绕过host的限制。 

PS：具体代码请看vue.config.js文件中dev-serve中proxy.

```

## 数据处理

> 爬取QQ音乐2W歌单和50W首歌曲: https://blog.csdn.net/lht_okk/article/details/77206510

> 歌单url：https://y.qq.com/portal/playlist.html

> vue-music跨域获取QQ音乐歌单接口: https://www.cnblogs.com/shengnan-2017/p/9104079.html

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

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/screencut/1.png)

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/screencut/2.png)

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/screencut/3.png)

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/screencut/4.png)

![image](https://raw.githubusercontent.com/xjf7711/vue-music/master/public/screencut/5.png)


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

> 1、目录结构修改
> 
> 2、axios请求和api修改
> 
> 3、stylus改为scss
> 
> 4、重新引用了幻灯片播放组件。之前的组件是基于老版本的better-scroll写的，有问题。
>   引用地址：https://github.com/ustbhuangyi/better-scroll/blob/master/example/components/slide/slide.vue
> 
> 5、添加cordova-plugin-http插件。手机APP中使用该方法进行ajax请求。因为headers中的
>   referer无法在前端修改。必须通过插件的方式实现。


