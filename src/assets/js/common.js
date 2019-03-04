/**
 * Created by cp on 2017/9/19.
 */
const secretSeed = "123456789012345678901234";
const APP_KEY_SEED = "terjoycht2014!@#";
const sessionKey = "68497025";
const APP_TYPE = "27";
const APP_VERSION = "388";
const APP_IVERSION = "2";
const sessionId = "9acf28b81c0521d763bf11603a11c15d";

const CryptoJS = require('crypto-js');
import axios from "axios";


function produce3DesKey(key) {
    if (key == undefined || key == null || key == '')
        return secretSeed;
    if (key.length >= 24) {
        return key.substr(0, 24);
    }
    return key + secretSeed.substr(key.length);
}

function produceSessionKey(key) {
    return CryptoJS.MD5(APP_KEY_SEED + key).toString().toUpperCase();
}

/**
 * 用3des加密，结果采用base64编码返回
 * @param key
 * @param plainText
 * @returns {*}
 */
function encryptWith3DesAndEncodeBase64(key, plainText) {
    if (key == null || key == '' || plainText == null || plainText == '') {
        return '';
    }
    var ckey = produce3DesKey(key);
    var result = CryptoJS.TripleDES.encrypt(plainText, CryptoJS.enc.Utf8.parse(ckey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return result.toString();
}

/**
 * 进行base64编码
 * @param
 * @returns {*}
 */
function encodeBase64(str) {
    var encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
    return encoded;
}

/**
 * 进行base64解码
 * @param bs64
 * @returns {*}
 */
function decodeBase64(bs64) {
    var decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(bs64));
    return decoded;
  }

/***
 * 产生随机字符串
 * @param length
 * @returns {string}
 */
function randomString(length) {
    var res = "";
    for (var i = 0; i < length; i++) {
      var id = Math.ceil(Math.random() * 9);
      res += chars[id];
    }
    return res;
  }
/**
 * 添加公共的头部信息
 */
function addHeaders(xhr) {
    xhr.setRequestHeader("apptype", APP_TYPE);
    xhr.setRequestHeader("iversion", APP_IVERSION);
    xhr.setRequestHeader("versioncode", APP_VERSION);
  }

/**
 * 进行3des解密，解密之前，会将密文进行base64解码
 * @param key
 * @param cryptedBs64
 * @returns {*}
 */
function decodeBase64AndDecryptWith3Des(key, cryptedBs64) {
    if (key == null || key == '' || cryptedBs64 == null || cryptedBs64 == '') {
        return '';
    }
    var ckey = produce3DesKey(key);
    var result = CryptoJS.TripleDES.decrypt(
        cryptedBs64, CryptoJS.enc.Utf8.parse(ckey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return result.toString(CryptoJS.enc.Utf8)
}

/***
 * 根据给出的数据产生签名
 * @param sessionid
 * @param timestamp
 * @param random
 * @param crypted 加密之后的请求参数
 * @returns {string}
 */
function produceSign(sessionid, timestamp, random, crypted) {
    var arr = new Array();
    arr.push("sessionid=" + sessionid);
    arr.push("apptype=" + APP_TYPE);
    arr.push("iversion=" + APP_IVERSION);
    arr.push("versioncode=" + APP_VERSION);
    if (crypted != "")
      arr.push("data=" + crypted);
    arr.push("timestamp=" + timestamp);
    arr.push("random=" + random);
    arr.push("secretkey=" + produceSessionKey($.cookie("sessionKey")));
    arr.sort();
  
    var signString = "[" + arr.join() + "]";
    return CryptoJS.MD5(signString).toString().toUpperCase();
  }
/**
 * 发送请求到服务端
 * @param url
 * @param params
 * @param successfunc
 * @param failfunc
 */
export function sendRequest(url, params, successfunc, failfunc, $this) {
    var crypted = "";
    var pstr = JSON.stringify(params);
    var sessionKey = $.cookie("sessionKey");
    var sessionId = $.cookie("sessionId");
    if (pstr != "{}") {
        crypted = encodeBase64(encryptWith3DesAndEncodeBase64(produceSessionKey(sessionKey), pstr));
    }
    $.ajax({
        url: url,
        type: "post",
        data: crypted,
        dataType: "json",
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        beforeSend: function (xhr) {
            addHeaders(xhr);

            //发送业务请求时，需要进行签名
            var timestamp = parseInt(new Date().getTime() / 1000);
            var random = randomString(8);

            var sign = produceSign(sessionId, timestamp, random, crypted);
            xhr.setRequestHeader("sessionid", sessionId);
            xhr.setRequestHeader("timestamp", timestamp);
            xhr.setRequestHeader("random", random);
            xhr.setRequestHeader("sign", sign);
        },
        error: function (xhr, info) {
            if (xhr.status == 0 || xhr.status == 500) {
                $this.$Message.error({
                    content: "未能连接到服务器，请稍后再试",
                    duration: 3,
                    closable: true
                })
                return
            }

            if (xhr.status == 404) {
                $this.$Message.error({
                    content: "请求的接口不存在",
                    duration: 3,
                    closable: true
                })
                return
            }

            if (xhr.status == 401 && xhr.responseJSON.code == 30000007) {
                $this.$Modal.confirm({
                    title: '提示',
                    content: xhr.responseJSON.msg,
                    onOk: () => {
                        $this.$router.push({ name: 'login' });
                    }
                });
                failfunc(info);
                return;
            }

            failfunc(info);
            $this.$Message.error({
                content: info,
                duration: 3,
                closable: true
            })
        },
        success: function (obj) {
            if (obj.code == 1) {
                var data = obj.data;
                if (data) {
                    var decoded = decodeBase64(data);
                    var plainText = decodeBase64AndDecryptWith3Des(produceSessionKey(sessionKey), decoded);
                    var plainObj = JSON.parse(plainText);
                    successfunc(plainObj);
                } else {
                    successfunc(obj);
                }
            } else {
                failfunc(obj);
                $this.$Message.error({
                    content: obj.msg,
                    duration: 3,
                    closable: true
                })
            }
        }
    });
}