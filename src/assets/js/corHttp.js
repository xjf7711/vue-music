// cordovaHTTP插件
/*eslint-disable no-undef*/
function corHttp(request) {
  console.log("corHttp create. ");
  cordovaHTTP.setHeader("Referer", "https://y.qq.com");
  return new Promise((resolve, reject) => {
    cordovaHTTP.get(
      request.baseUrl + request.url,
      request.params,
      {},
      response => {
        console.log(response.status);
        resolve(response);
      },
      error => {
        console.error(error.error);
        reject(error);
      }
    );
  });
}
// class corHttp {
//   constructor() {
//     console.log("cordovaHttp request is ");
//     // this.request = request;
//   }
//   create(request) {
//     console.log("corHttp create. ");
//     cordovaHTTP.setHeader("Referer", "https://y.qq.com");
//     return new Promise((resolve, reject) => {
//       cordovaHTTP.get(
//         request.baseUrl + request.url,
//         request.params,
//         {},
//         response => {
//           console.log(response.status);
//           resolve(response);
//         },
//         error => {
//           console.error(error.error);
//           reject(error);
//         }
//       );
//     });
//   }
//   onDeviceReady() {
//     if (cordovaHTTP) {
//       cordovaHTTP.setHeader("Referer", "https://y.qq.com");
//       return new Promise((resolve, reject) => {
//         cordovaHTTP.get(
//           this.request.baseUrl + this.request.url,
//           this.request.params,
//           {},
//           response => {
//             console.log(response.status);
//             resolve(response);
//           },
//           error => {
//             console.error(error.error);
//             reject(error);
//           }
//         );
//       });
//     } else {
//       return new Promise(resolve => {
//         resolve("没有找到cordovaHTTP插件。");
//       });
//     }
//   }
// }

export default corHttp;
