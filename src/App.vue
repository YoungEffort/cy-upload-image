<template>
  <div id="app">
    <cyUploadImage imgType="idcardFront"/>
    <cyUploadImage imgType="custom">
      <img src="@/assets/u155.jpg" alt="" slot="custom">
      自定义背景图
    </cyUploadImage>
  </div>
</template>

<script>
import cyUploadImage from './components/cyUploadImage.vue'
export default {
  name: 'app',
  components: {
    cyUploadImage
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
