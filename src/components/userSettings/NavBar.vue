<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="emails">处理中心</el-menu-item>
      <el-menu-item index="profile">消息中心</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push("/UserSettings/" + key);
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
</style>