import axios from "axios";
// import store from "@/store";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.NODE_ENV === "production" ? "https://c.y.qq.com" : "", // api 的 base_url
  timeout: 5000 // request timeout
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
    console.log("process.env.NODE_ENV is " + process.env.NODE_ENV);
    if (process.env.NODE_ENV === "production") {
      config.headers["Referer"] = "https://y.qq.com/portal/playlist.html";
      // config.headers["host"] = "y.qq.com"; // 没用
      config.headers["Cookie"] =
        "RK=7dNm4/X+Yj; tvfe_boss_uuid=bf00ee54e9081ab4; pgv_pvi=8772238336; pac_uid=1_857193777; pgv_pvid=6457341280; o_cookie=80; ptcz=c761e59c8c8d6bd5198866d02a5cb7313af1af468006c455d6c2b5d26201d42e; pgv_si=s10759168; _qpsvr_localtk=0.08285763449905015; ptisp=ctc; luin=o0857193777; lskey=00010000228dd1371b945c68ecfd3b71d3071425024a7a8a2a23e3ffcb5b9904c9f7088d2ea8c01539ffed92; pt2gguin=o0857193777; uin=o0857193777; skey=@Kydi7w0EI; p_uin=o0857193777; p_skey=HjsE9sEjznJfXk*9KFEeW4VZr6i3*tlXZ2nuzEw8kCg_; pt4_token=c-p6sv3JEboA51cSQ3ABqxM8O80Jct3jYYkgy-aEQuE_; p_luin=o0857193777; p_lskey=000400008f9c296cd10c03a5173d22a184aad124d791568e90e4198beb8ad699a4d02fbfc059f71ab3d8758c; ts_last=y.qq.com/portal/playlist.html; ts_refer=ui.ptlogin2.qq.com/cgi-bin/login; ts_uid=3392060960";
      config.headers["User-Agent"] = // 没用
        "'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',";
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log("service.interception.response.use response is ", response);
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
