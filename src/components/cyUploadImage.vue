<template>
  <div class='upload-img'>
    <div class="img-box" v-if="url==''" :style="{height: imgType=='custom' ? 'auto' : '110px'}">
      <div class="parent" v-if="imgType=='default'" @click="handlePopup">
        <img src="../assets/images/common/photo_icon@2x.png" alt="" class="img-1">
      </div>
      <img src="../assets/images/common/身份证示范-正面@3x.png" alt="" v-if="imgType=='idcardFront'" class="img-2" @click="handlePopup">
      <img src="../assets/images/common/身份证示范-背面@3x.png" alt="" v-if="imgType=='idcardBack'" class="img-2" @click="handlePopup">
      <div  class="img-2" @click="handlePopup"  v-if="imgType=='custom'">
        <slot name="custom"></slot>
      </div>
    </div>
    <div class="img-box-sc" v-if="url!=''">
      <img :src="convertUrl" alt="" @click="handleView(convertUrl)">
      <img src="../assets/images/common/蒙版组 3.png" @click="handleDelete()" class="img-flag" v-show="isClose">
    </div>
    <div class="text">
      <span class="col-red" v-if="required">*</span>
      <slot></slot>
    </div>
    <div class="view-img-box" v-show="isView">
      <img :src="viewImg" alt="" class="view-img" @click="handleView('')">
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="btn1">
        <span>上传照片</span>
        <input ref="photoref" type="file" accept="image/*" @change="update($event)"/>
      </div>
      <div class="btn2" @click="popupVisible=false">取消</div>
    </mt-popup>
  </div>
</template>

<script>
//import { uploadZoomimg } from '@/api/uploadimg'
import { Popup } from 'mint-ui'
import 'mint-ui/lib/popup/style.css'
import Axios from 'axios'
export default {
  name: 'cy-uload-image',
  watch: {
    url: function (val) {
      this.convertUrl = val
      if (!val) { this.$refs.photoref.value = '' }
    },
    // 如果 `question` 发生改变，这个函数就会运行
    // eslint-disable-next-line no-unused-vars
    isView (newQuestion) {
      newQuestion ? this.closeTouch() : this.openTouch()
    }
  },
  data() {
    return {
      popupVisible: false,
      convertUrl: '',
      viewImg: '',
      fullUrl: '',
      isView: false
    }
  },
  props: {
    imgType: {
      type: String,
      default: 'default'
    },
    required: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: ''
    },
    requestUrl: {
      type: String,
      default: ''
    },
    isClose: {
      type: Boolean,
      default: true
    }
  },
  components: {
    mtPopup: Popup
  },
  methods: {
    update(e) {
      let vm = this
      let img1 = e.target.files[0]
      let form = new FormData()
      vm.popupVisible = false
      this.$globalToast.loading({})
      form.append('file', img1, img1.name)
      Axios.request({
        url: vm.requestUrl,
        method: 'post',
        data: form
      }).then(res => {
          this.$globalToast.close()
          if (res.status === '500') {
            vm.$refs.photoref.value = ''
            this.$globalToast.warning({
              message: '上传失败，请重新上传'
            })
          }
          var data = res.data[0]
          vm.convertUrl = data.convertUrl
          vm.fullUrl = data.fullUrl
          vm.$emit('change', vm.convertUrl, res)
        })
        .catch((err) => {
          vm.$emit('change', '', err)
          vm.$refs.photoref.value = ''
          this.$globalToast.close()
          this.$globalToast.warning({
            message: '上传失败，请重新上传'
          })
        })
    },
    handlePopup() {
      this.popupVisible = true
    },
    handleDelete() {
      var vm = this
      vm.convertUrl = ''
      vm.fullUrl = ''
      vm.$refs.photoref.value = ''
      vm.$emit('change', vm.convertUrl, {})
    },
    handleView(convertUrl) {
      var vm = this
      vm.isView = !vm.isView
      vm.viewImg = convertUrl
    },
    closeTouch () {
      document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, { passive: false })// 阻止默认事件
    },
    openTouch () {
      document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, { passive: false })// 打开默认事件
    },
    handler(e) {
      e.preventDefault()
    }
  }
}
</script>
<style scoped lang='less'>
.upload-img {
  width: 170px;
  display: inline-block;
  .parent {
    position: relative;
    height: 100px;
    border: 1px solid #9aaade;
    border-radius: 5px;
    .img-1 {
      width: 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  .img-box {
    height: 110px;
  }
  .img-2 {
    width: 170px;
    img{
      width: 100%;
    }
  }
  .text {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    .col-red {
      color: #e90000;
      margin-right: 3px;
    }
  }
  .btn1 {
    text-align: center;
    height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #e0e0e0;
    color: #333;
    position: relative;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    span {
      float: left;
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
  }
  .btn2 {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #333;
  }
  .img-box-sc {
    height: 100px;
    border: 1px solid #e6eaf6;
    position: relative;
    img {
      width: 100%;
      height: 100px;
    }
    .img-flag {
      width: 25px;
      height: 25px;
      position: absolute;
      top: -8px;
      right: -7.5px;
    }
  }
  .view-img-box {
    height: 100%;
    line-height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 10;
    text-align: left;
    .view-img {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .mint-popup{
    width: 100%;
  }
}
</style>
