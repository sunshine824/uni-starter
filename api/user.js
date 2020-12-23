import service from "@/utils/fetch.js"
import qs from 'qs'

//获取系统信息（测试接口）
export const getSystemInfo = (params) => {
  return service({
    method: "post",
    url: "/spbSysLogo/getInfo",
    data: qs.stringify(params)
  });
};
