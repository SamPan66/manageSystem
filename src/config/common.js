import axios from "axios";

const APP_TYPE = "27";
const APP_VERSION = "388";
const APP_IVERSION = "2";
const instance = axios.create({
    baseURL: 'http://120.26.80.24:8769/user-service/',
    timeout: 1000
});
// 实例创建之后修改配置
instance.defaults.headers.common['apptype'] = APP_TYPE;
instance.defaults.headers.common['iversion'] = APP_IVERSION;
instance.defaults.headers.common['versioncode'] = APP_VERSION;
export {instance}