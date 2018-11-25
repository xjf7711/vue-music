// const axios = require("axios");

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

/*eslint-disable no-undef*/

module.exports = {
  // 项目部署的基础路径
  baseUrl: "./",
  // 输出文件目录。
  // "dist",
  outputDir:
    "../../cordova/musicApp/platforms/android/app/src/main/assets/www/",
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // compiler: false, // ?not allowed
  runtimeCompiler: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set("src", resolve("src"))
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("layout", resolve("src/layout"))
      .set("base", resolve("src/base"))
      .set("common", resolve("src/assets/common"))
      .set("api", resolve("src/api"));
    // if (process.env.NODE_ENV === "production") {
    //   // // 对模块处理配置
    //   // config.module.rule("js").include.add(/some-module-to-transpile/); // 要处理的模块
    //   // // 修改webpack Loader配置
    //   // config.module
    //   //   .rule("scss")
    //   //   .use("sass-loader")
    //   //   .tap(options =>
    //   //     merge(options, {
    //   //       includePaths: [path.resolve(__dirname, "node_modules")]
    //   //     })
    //   //   );
    //   // 修改webpack Plugin配置
    //   // config.plugin("html").tap(args => {
    //   //   console.log("tap(args) args is ", args)
    //   //   return [
    //   //     /* new args to pass to html-webpack-plugin's constructor */
    //   //     /* 传递给 html-webpack-plugin's 构造函数的新参数 */
    //   //   ];
    //   // });
    //   // eg: 在本次项目较小，只对uglifyjs进行了少量的修改，后期如果还有配置上优化会继续添加。
    //   // config.plugin("uglify").tap(([options]) => {
    //   //   // 去除 console.log
    //   //   return [
    //   //     Object.assign(options, {
    //   //       uglifyOptions: {
    //   //         compress: {
    //   //           drop_console: true,
    //   //           pure_funcs: ["console.log"]
    //   //         }
    //   //       }
    //   //     })
    //   //   ];
    //   // });
    // }
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     // // 对模块处理配置
  //     // config.module.rule("js").include.add(/some-module-to-transpile/); // 要处理的模块
  //     // // 修改webpack Loader配置
  //     // config.module
  //     //   .rule("scss")
  //     //   .use("sass-loader")
  //     //   .tap(options =>
  //     //     merge(options, {
  //     //       includePaths: [path.resolve(__dirname, "node_modules")]
  //     //     })
  //     //   );
  //     // // 修改webpack Plugin配置
  //     // config
  //     //   .plugin("html")
  //     //   .tap(args => {
  //     //     return [
  //     //       /* new args to pass to html-webpack-plugin's constructor */
  //     //       /* 传递给 html-webpack-plugin's 构造函数的新参数 */
  //     //       // console.log("tap(args) args is ", args)
  //     //     ];
  //     //   })
  //     //   // eg: 在本次项目较小，只对uglifyjs进行了少量的修改，后期如果还有配置上优化会继续添加。
  //     //   .plugin("uglify")
  //     //   .tap(([options]) => {
  //     //     // 去除 console.log
  //     //     return [
  //     //       Object.assign(options, {
  //     //         uglifyOptions: {
  //     //           compress: {
  //     //             drop_console: true,
  //     //             pure_funcs: ["console.log"]
  //     //           }
  //     //         }
  //     //       })
  //     //     ];
  //     //   });
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {}, // not allowed
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  // parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // 是否使用 `autoDLLPlugin` 分割供应的包？
  // 也可以是一个在 DLL 包中引入的依赖的显性的数组。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#dll-模式
  // dll: false,  ? not allow
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // open: process.platform === "darwin",
    // host: "0.0.0.0",
    port: 1111,
    // https: false,
    // hotOnly: false,
    proxy: {
      // 设置代理
      // "/api": {
      //   target: "/",
      //   ws: true,
      //   changeOrigin: true
      // },
      // "/foo": {
      //   target: "/"
      // },
      // proxy all requests starting with /api to jsonplaceholder
      "/api/getRecommend/": {
        target:
          "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
        // secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api/getReCommend/": "/"
        }
      },
      "/api/getList": {
        // target: 'http://192.168.0.57:8081',  // 你接口的域名 设置你调用的接口域名和端口号 别忘了加http
        target: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg",
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // '^/fsy': ''
          "^/api/getList": "" // 这里理解成用'/ledger'代替target里面的地址，后面组件中我们掉接口时直接用ledger代替
          // 比如我要调用'http://192.168.0.57:8081/ledger/add'，直接写'/ledger/add'即可
        },
        headers: {
          Referer: "https://c.y.qq.com/",
          host: "c.y.qq.com"
        }
        // 正式环境： 接口地址 /api/**                         前端页面地址
        // 开发环境： 接口地址 http://www.xxx.com/api/**       前端页面地址  http://localhost:8080
      },
      "/api/getLyric": {
        // target: 'http://192.168.0.57:8081',  // 你接口的域名 设置你调用的接口域名和端口号 别忘了加http
        target: "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg",
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // '^/fsy': ''
          "^/api/getLyric": "" // 这里理解成用'/ledger'代替target里面的地址，后面组件中我们掉接口时直接用ledger代替
          // 比如我要调用'http://192.168.0.57:8081/ledger/add'，直接写'/ledger/add'即可
        },
        headers: {
          referer: "https://y.qq.com/",
          host: "c.y.qq.com"
        }
        // 正式环境： 接口地址 /api/**                         前端页面地址
        // 开发环境： 接口地址 http://www.xxx.com/api/**       前端页面地址  http://localhost:8080
      },
      "/api/getSongList": {
        // target: 'http://192.168.0.57:8081',  // 你接口的域名 设置你调用的接口域名和端口号 别忘了加http
        target:
          "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // '^/fsy': ''
          "^/api/getSongList": "" // 这里理解成用'/ledger'代替target里面的地址，后面组件中我们掉接口时直接用ledger代替
          // 比如我要调用'http://192.168.0.57:8081/ledger/add'，直接写'/ledger/add'即可
        },
        headers: {
          referer: "https://y.qq.com/",
          host: "c.y.qq.com"
        }
        // 正式环境： 接口地址 /api/**                         前端页面地址
        // 开发环境： 接口地址 http://www.xxx.com/api/**       前端页面地址  http://localhost:8080
      }
    }
    // before: app => {
    //   console.log("app is ", app);
    //   // 由于请求的referer和host不同，所以前端不能拿到数据，需要后端做一个代理
    //   // 后端向有数据的服务端发送请求，拿到数据，然后前端在向自己的服务器请求那数据
    //   // 这里使用axios实现ajax请求：axios是一个基于promise的HTTP库，可以用于浏览器和node.js
    //   // 在浏览器创建XMLHttpRequest对象，从node.js创建http请求
    //   // app.get("/api/getDiscList", (req, res) => {
    //   //   //这里的路径是给前端发送请求的url
    //   //   const url =
    //   //     "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
    //   //   // axios发送get请求，可以自己配置config
    //   //   axios
    //   //     .get(url, {
    //   //       headers: {
    //   //         referer: "https://c.y.qq.com/",
    //   //         host: "c.y.qq.com"
    //   //       },
    //   //       //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
    //   //       params: req.quest
    //   //     })
    //   //     .then(response => {
    //   //       res.json(response.data); //返回数据
    //   //     })
    //   //     .catch(error => {
    //   //       console.log(error);
    //   //     });
    //   // });
    //   // # ...其他原来的代码
    // }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
