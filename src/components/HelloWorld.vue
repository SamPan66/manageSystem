
<template>
  <div class="layout">
    <Layout>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 200px;">
            <i-button type="success" @click="triggerChange" :status="buttonStatus">点击</i-button>
            <AutoComplete
              v-model="value1"
              :data="data1"
              @on-search="handleSearch1"
              @on-change="verLength"
              placeholder="input here"
              maxlength="5"
              style="width:200px"
            ></AutoComplete>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttonStatus: false,
      theme1: "primary",
      value1: "",
      data1: ["湖南天驕", "湖南天骄物流", "湖南天骄物流信息技术有限公司"]
    };
  },
  created() {
    let data = [
        {pri:"1.2"},{pri:"6.2"},{pri:"7.2"}
    ];
    let totalPri = 0;
    data.forEach((item)=>{
        totalPri += parseFloat(item.pri);
    })
    console.log(totalPri.toFixed(2));
  },
  mounted() {
    console.log(this.name);
  },
  methods: {
    triggerChange() {
      console.log("点击");
      this.buttonStatus = !this.buttonStatus;
      this.$emit("myEvent", this.buttonStatus);
    },
    handleSearch1() {},
    verLength(value) {
        if(value.length>10){
            value = value.slice(0, 10)
        }
        this.value1 = value;
        console.log(value)
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>