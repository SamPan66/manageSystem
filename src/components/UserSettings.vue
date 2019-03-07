<template>
  <div>
    <h1>User Settings</h1>
    <NavBar/>
    <router-view/>
    <router-view name="helper"/>
  </div>
</template>
<script>
import NavBar from "@/components/userSettings/NavBar";
export default {
  components:{
     NavBar
  },
  data() {
    return {
      activeName: "first",
      tableData: []
    };
  },
  methods: {
  }
};
</script>

<style scoped>
</style>