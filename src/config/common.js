import axios from "axios";
const instance = axios.create({
    baseURL: 'http://120.26.80.24:8769/user-service/',
    timeout: 1000
});
// 实例创建之后修改配置
instance.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
export {instance}