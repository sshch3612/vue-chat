import axios from "axios";
import qs from "qs";

/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: 'http://127.0.0.1:7001', 
  timeout: 5000 // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {

  config.method === 'post'
      ? config.data = qs.stringify({...config.data})
      : config.params = {...config.params};
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
}, error => {  //请求错误处理
  Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {  //成功请求到数据
      //这里根据后端提供的数据进行对应的处理
      return response.data;
  },
  error => {  //响应错误处理
    console.info(JSON.parse(JSON.stringify(error)) ,6666);
      let text = JSON.parse(JSON.stringify(error)).response.status === 404
          ? '404'
          : '网络异常，请重试';
      return Promise.reject(error)
  }
);


export default service;