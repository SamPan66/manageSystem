<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12">
            <div class="logo-box">
              <img src="./assets/img/sy.png" alt>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="user-infor">
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{userName}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>站点管理</span>
              </template>
              <el-menu-item index="OilStationCompany">油站公司管理</el-menu-item>
              <el-menu-item index="hello">油站站点管理</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
              <el-menu-item index="1-4">选项4</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>2011-2016 &copy; TalkingData</el-footer>
    </el-container>
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
      this.$router.push("/" + key);
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

<style lang="less">
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
  background: #33cc99;
  color: #333;
  text-align: center;
  padding: 0 !important;
  line-height: 60px;
  .logo-box {
    padding-left: 20px;
    text-align: left;
    img {
      vertical-align: middle;
      line-height: 60px;
    }
  }
  .user-infor {
    padding-right: 20px;
    text-align: right;
  }
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
.el-submenu__title {
  text-align: left;
  color: rgba(255, 255, 255, 0.7) !important;
  background: #495060;
}
.el-menu-item {
  text-align: left;
  color: rgba(255, 255, 255, 0.7) !important;
  background: #495060;
}
.el-submenu__title:hover,
.el-menu-item:hover,
.el-menu-item.is-active {
  color: #fff !important;
  background: #2d8cf0 !important;
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
