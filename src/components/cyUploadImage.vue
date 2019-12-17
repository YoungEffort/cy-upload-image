<!-- 
   上传组件
   秦国胜
   2019-11-01
 -->
<template>
  <div class='cy-upload' :class="className">
    <div class="cy-container">
      <div v-show="!url" @click="popupModal">
        <div class="cy-upload-default" v-if="imgType==='default'">
          <img src="../assets/images/camera.png" alt="" class="cy-camera-img">
        </div>
        <img src="../assets/images/idCard.png" alt="" class="cy-default-img"   v-if="imgType==='idcardFront'">
        <img src="../assets/images/idCard-1.png" alt="" class="cy-default-img"  v-if="imgType==='idcardBack'">
        <img src="../assets/images/idCard-2.png" alt="" class="cy-default-img"  v-if="imgType==='idcardHand'">
        <img src="../assets/images/file.png" alt="" class="cy-default-img"  v-if="imgType==='file'">
        <slot name="custom" v-if="imgType =='custom'"></slot>
      </div>
      <div v-show="url" class="cy-upload-view">
        <img :src="url" alt="" class="cy-view-img"  @click="previewModal">
        <img src="../assets/images/close.png" alt="" class="cy-close" @click="closeDelete" v-show="isClose">
      </div>
      <div class="cy-text">
        <span class="cy-required">*</span>
        <slot></slot>
      </div>
    </div>
    <div class="cy-preview" v-show="isPreview">
       <img :src="url" alt="" class="cy-preview-img"  @click="previewModal">
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="cy-upload-popup">
      <div class="cy-upload-row">
        <div class="cy-row-name">{{title}}</div>
        <input class="cy-row-input"
          ref="photoRef"
          type="file"
          accept="image/*"
          :multiple = 'multiple'
          @change="uploading"
        />
      </div>
      <div class="cy-popup-close" @click="popupVisible=false">取消</div>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui'
import 'mint-ui/lib/popup/style.css'
import Axios from 'axios'
export default {
  name: 'cy-upload',
  components: {
     mtPopup: Popup
  },
  watch: {
    url: function (val) {
      if (!val) { this.$refs.photoRef.value = '' }
    },
    // 如果 `question` 发生改变，这个函数就会运行
    // eslint-disable-next-line no-unused-vars
    isPreview (newQuestion) {
      newQuestion ? this.closeTouch() : this.openTouch()
    }
  },
  props: {
    // 多传 ios 支持
    multiple: {
       type : Boolean,
       default: false
    },
    // 添加自定义容器class
    className: {
      type : String,
      default: ''
    },
    // default idcardFront idcardBack idcardHand file custom (自定义)
    imgType: {
      type : String,
      default: 'idcardFront'
    },
    // 上传url
    requestUrl: {
      type: String,
      default: ''
    },
    // 图片展示地址
    url: {
      type: String,
      default: ''
    },
    // 弹窗title
    title:{
       type: String,
       default: '上传照片'
    },
    // 是否显示关闭按钮
    isClose: {
      type: Boolean,
      default: true
    },
    // 请求头
    headers: {
      type: Object,
      default: () => {}
    },
    // 
  },
  data() {
   return {
     popupVisible: false, // 弹窗隐藏
     isPreview: false,// 控制预览
     upload: '',
   }
  },
  mounted() {},
  methods: {
    // 显示上传弹窗
    popupModal () {
      this.popupVisible = true
    },
    // 绑定上传
    uploading (e) {
      if (!this.requestUrl) return
      let fileData = e.target.files
      let form = new FormData()
      if (fileData && fileData.length > 1) {
        fileData = Array.from(fileData)
        fileData.forEach((item) => {
          form.append('file', item, item.name)
        })
      } else {
        form.append('file', fileData, fileData.name)
      }
      this.popupVisible = false
      this.$globalToast.loading({})
      Axios.request({
        url: this.requestUrl,
        method: 'post',
        data: form,
        headers: this.headers
      }).then(res => {
          this.$globalToast.close()
          this.$emit('change', 'succeed', res)
          this.$refs.photoRef.value = ''
        })
        .catch((err) => {
          this.$emit('change', 'error', err)
          this.$refs.photoRef.value = ''
          this.$globalToast.close()
          this.$globalToast.warning({
            message: '上传失败，请重新上传'
          })
        })
    },
    // 关闭
    closeDelete() {
      this.$refs.photoRef.value = ''
      this.$emit('change', 'close', {})
    },
    // 预览
    previewModal() {
      this.isPreview ? this.isPreview = false : this.isPreview = true
    },
    // 解决滚动穿透
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
<style lang='less'>
  .cy-upload {
    display: inline-block;
    .cy-container{
      img{
        width: 100%;
      }
      .cy-upload-default{
        padding: 26px 0;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
      }
      .cy-camera-img{
        width: 50px;
      }
      .cy-default-img{
        width: 100%;
        height: 110px;
      }
     
    }
    .cy-upload-view{
      position: relative;
      .cy-close{
        position: absolute;
        top: -8px;
        right: -7.5px;
        width: 25px;
        height: 25px;
      }
      .cy-view-img{
        width: 100%;
        height: 110px;
      }
    }
    .cy-text {
      padding: 6px 0 5px;
      font-size: 14px;
      text-align: center;
      .cy-required {
        color: #e90000;
        margin-right: 3px;
      }
    }
  }
  .cy-upload-popup{
    width: 100%;
    font-size: 14px;
    .cy-upload-row{
      position: relative;
      height: 40px;
      border-bottom: 1px solid #e5e5e5;
      text-align: center;
      .cy-row-name{
        line-height: 40px;
      }
      .cy-row-input{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .cy-popup-close{
       height: 40px;
       line-height: 40px;
       text-align: center;
    }
  }
  .cy-preview{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 99;
    .cy-preview-img{
      position: absolute;
      top: 46%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
    }
  }
</style>
