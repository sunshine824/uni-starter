"use strict"
import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: "http://192.168.1.150:8998/smartbox", // 正式环境
  timeout: 60 * 1000,
  async: true,
  crossDomain: true
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
  config => {
    if (store.state.token) {
      // 给请求头添加user-token
      config.headers["Authorization"] = 'Bearer ' + store.state.token;
    }
    // console.log('请求拦截成功')
    //针对媒体类型数据进行特殊处理
    if (config.method === 'formdata') {
      config.method = 'POST';
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    // console.log('请求拦截器config------------------',config)
    return config;
  },
  error => {
    // console.log('请求拦截器错误-------------', error); // for debug
    return Promise.reject(error);
  }
);

//配置成功后的拦截器
service.interceptors.response.use((response) => {
  if (response.status == 201 || response.status == 200) {
    let {
      code,
      status,
      msg
    } = response.data;
    if (code == 300) { //无权限
      uni.showToast({
        title: msg,
        duration: 1000
      });
      setTimeout(() => {
        uni.navigateTo({
          url: "pages/login/index"
        })
      }, 1000)
    } else if (code == 200) {
      if (status) {
        //接口请求成功
        msg && uni.showToast({
          title: msg,
          duration: 1000
        }); //后台如果返回了msg，则将msg提示出来
        return Promise.resolve(response.data); //返回成功数据
      } else {
        //接口异常
        msg && uni.showToast({
          title: msg,
          duration: 1000
        }); //后台如果返回了msg，则将msg提示出来
        return Promise.reject(response.data); //返回异常数据
      }
    } else {
      //接口异常
      msg && uni.showToast({
        title: msg,
        duration: 1000
      });
      return Promise.reject(response.data);
    }
  }
}, error => {
  return Promise.reject(error.response);
})

service.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
  return new Promise((resolve, reject) => {
    var settle = require('axios/lib/core/settle');
    var buildURL = require('axios/lib/helpers/buildURL');
    uni.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: (response)=> {
        //console.log("执行完成：", response)
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        };

        settle(resolve, reject, response);
      }
    })
  })
}

export default service
