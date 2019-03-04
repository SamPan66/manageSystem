<template>
  <div id="Login">
      登录
  </div>
</template>

<script>
import { instance } from "./config/common.js";
export default {
  data() {
    return {};
  },
  computed: {
    userName() {
      return this.$store.state.userName;
    }
  },
  created() {
    this.login();
  },
  methods: {
    login() {
      let $this = this;
      instance
        .get("gen/key?tjid=546495")
        .then(function(response) {
          console.log(response);
          $this.dologin(response.data, 546495, 123456);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    dologin(obj, username, pass) {
      console.log(obj);
      if (obj.code == 1) {
        //var sessionkey = obj.data.ss;
        instance
          .post("login", {
            username: username,
            userpass: pass,
            publickey: obj.data.ps
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    handleSelect(key) {
      this.$router.push("/"+key)
      window.location.href='login.html'
      this.$store.commit("increment", "牛逼大人");
    },
    handleOpen(key, keyPath) {
      this.$store.commit("incrementName", "人大逼牛");
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  min-width: 1200px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.el-header {
  background: #33CC99;
  color: #333;
  text-align: center;
  padding: 0 !important;
  line-height: 60px;
}
.logo-box{
  padding-left: 20px;
  text-align: left;
}
.logo-box img{
  vertical-align: middle;
      line-height: 60px;
  }
  .user-infor {
    padding-right: 20px;
    text-align: right;
  }
.el-footer {
  background-color: #f1f1f1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background: #495060;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-submenu__title{
  text-align: left;
  color: rgba(255,255,255,.7) !important;
  background: #495060;
}
.el-menu-item {
  text-align: left;
  color: rgba(255,255,255,.7) !important;
  background: #495060;
}
.el-submenu__title:hover,.el-menu-item:hover,.el-menu-item.is-active {
    color: #fff !important;
    background: #2d8cf0!important;
}

.el-menu {
  overflow: hidden;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
