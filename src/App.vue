<template>
  <div id="app">
    <cyUploadImage />
    <cyUploadImage imgType="custom"
                   @change="businessChange"
                   :url="businessLicenseImg"
                   requestUrl="http://113.204.6.164:9102/baitiaoh5/ofile/huawei/uploadZoomimg"
    >
      <img src="@/assets/u155.jpg" alt="" slot="custom">
      自定义背景图
    </cyUploadImage>
  </div>
</template>
<script>
import cyUploadImage from './components/cyUploadImage.vue'
export default {
  name: 'app',
  data(){
    return {
      businessLicenseImg: '',
      url: ''
    }
  },
  components: {
    cyUploadImage,
  },
  methods: {
    businessChange (status, data){
       if (status === 'succeed') {
        this.businessLicenseImg = data.data.convertUrl
      } else {
         this.businessLicenseImg = ''
      }
    }
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
