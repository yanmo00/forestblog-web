// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import { VAxios } from './Axios';
import axios from 'axios';
import { joinTimestamp, formatRequestDate } from './helper';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';

// import { useGlobSetting } from '@/utils/useGlobSettings.js';

import { isString } from '@/utils/is';
import { deepMerge, isUrl } from '@/utils';
import { setObjToUrlParams } from '@/utils/urlUtils';

// import { useUser } from '@/store/modules/user';

const { VITE_GLOB_API_URL_PREFIX, VITE_GLOB_API_URL } = import.meta.env;

const apiUrl = VITE_GLOB_API_URL || '';
const urlPrefix = VITE_GLOB_API_URL_PREFIX || '';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res, options) => {
    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse,
    } = options;

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    if (res.request.responseType === 'blob') {
      return res.data;
    }

    const { data } = res;

    // const $dialog = window['$dialog'];
    const $message = window['$message'];

    if (!data) {
      throw new Error('请求出错，请稍候重试');
    }
    //  这里 code，result，message为 后台统一的字段，需要修改为项目自己的接口返回格式
    const { code, data: _data, msg } = data;

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return data;
    }
    // 接口请求错误，统一提示错误信息 这里逻辑可以根据项目进行修改
    let errorMsg = msg;
    switch (code) {
      // 请求失败
      case ResultEnum.ERROR:
        $message.error(errorMsg);
        break;
      // 登录超时
      case ResultEnum.TIMEOUT:
        errorMsg = '请求超时';
        break;
    }
    throw new Error(errorMsg);
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    const isUrlStr = isUrl(config.url);

    if (!isUrlStr && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error) => {
    console.log('error', error)
    // const $dialog = window['$dialog'];
    // const $message = window['$message'];
    const { response, code, message } = error || {};
    // TODO 此处要根据后端接口返回格式修改
    const msg = response && response.data && response.data.msg ? response.data.msg : '';
    const err = error.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        // $message.error('接口请求超时，请刷新页面重试!');
        return;
      }
      if (err && err.includes('Network Error')) {
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error);
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error);
    if (isCancel) {
      console.warn(error, '请求被取消！');
    }
    //return Promise.reject(error);
    return Promise.reject(response?.data);
  },
};

function createAxios(opt) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        authenticationScheme: '',
        // 接口前缀
        prefixUrl: urlPrefix,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'none',
          // 接口地址
          apiUrl,
          // 接口拼接地址
          urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
        withCredentials: false,
      },
      opt || {}
    )
  );
}

export const http = createAxios();

// 项目，多个不同 api 地址，直接在这里导出多个
// src/api ts 里面接口，就可以单独使用这个请求，
// import { httpTwo } from '@/utils/http/axios'
// export const httpTwo = createAxios({
//   requestOptions: {
//     apiUrl: 'http://localhost:9001',
//     urlPrefix: 'api',
//   },
// });
