<template>
  <div id="app">
     <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="MenuSelect">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="hello">
              <Icon type="ios-navigate"></Icon>hello
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
    
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data(){
    return {
    }
  },
  methods:{
    MenuSelect(){
      console.log(this.$router)
    }
  }
}
</script>

<style>
#app {
  min-width: 1200px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
