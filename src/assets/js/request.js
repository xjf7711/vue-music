import axios from "axios";
// import store from "@/store";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.NODE_ENV === "production" ? "https://c.y.qq.com" : "", // api 的 base_url
  timeout: 15000 // request timeout
});

// request interceptor// 添加请求拦截器
service.interceptors.request.use(
  // 在发送请求之前做些什么
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }
    // headers: {
    //   referer: "https://c.y.qq.com/",
    //   host: "c.y.qq.com"
    // },
    console.log("service.interceptions.request.use config is ", config);
    // console.log("process.env.NODE_ENV is " + process.env.NODE_ENV);
    // if ("production" === process.env.NODE_ENV) {
    //   // config.headers["Accept"] = "*/*"; // application/json, text/plain, */*
    //   // config.headers["cookie"] =
    //   //   "pgv_pvi=6355487744; yqq_stat=0; pgv_info=ssid=s8878349185; ts_last=y.qq.com/; ts_refer=www.baidu.com/link; pgv_pvid=4505128350; ts_uid=2585128660; pgv_si=s4885803008";
    //   // config.headers["Accept-Encoding"] = "gzip, deflate";
    //   // config.headers["accept-language"] = "zh-CN,zh;q=0.9";
    //   // config.headers["Connection"] = "keep-alive";
    //   // config.headers["Host"] = "c.y.qq.com"; // 没用
    //   // config.headers["Referer"] = "https://c.y.qq.com";
    //   // config.headers["Postman-Token"] = "9e7053c4-ac24-4059-a15d-ba849abda676";
    //   // config.headers["User-Agent"] = "PostmanRuntime/7.4.0";
    //   // "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36";
    //   // config.headers["Server"] = "tws";
    //   // config.headers["UUID"] = 2709774090;
    //   // config.headers["Area"] = "sh";
    // }
    return config;
  },
  error => {
    // 对请求错误做些什么
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    // console.log("service.interception.response.use response is ", response);
    return response;
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    //   const res = response.data
    //   if (res.code !== 20000) {
    //     Message({
    //       message: res.message,
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //       // 请自行在引入 MessageBox
    //       // import { Message, MessageBox } from 'element-ui'
    //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //         confirmButtonText: '重新登录',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }).then(() => {
    //         store.dispatch('FedLogOut').then(() => {
    //           location.reload() // 为了重新实例化vue-router对象 避免bug
    //         })
    //       })
    //     }
    //     return Promise.reject('error')
    //   } else {
    //     return response.data
    //   }
  },
  error => {
    // 对响应错误做点什么
    console.log("error is " + error); // for debug
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
);

export default service;
