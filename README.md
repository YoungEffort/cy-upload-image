# hello-world

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### imgType 默认参数 type: String
```
  默认：default
 身份证正面：idcardFront
 身份证反面：idcardBack
```
### required 是否传图标 type: Boolean
```
  默认：true
```
### url 图片url type: String
```
  默认：''
```
### requesUrl 上传url type: String
```
  默认：''
```
### @change 上传url type: String
```
  默认：''
```
### @change 图片上传成功的回调图片 type: Function
```
  获得上传成功后的图片路径
```
@change="handleChange" :url="enterpriseData.businessLicenseUrl" :required="true"

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
