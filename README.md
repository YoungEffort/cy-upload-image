# upload-img组件

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

### usage

#### props
参数     | 说明       |  类型    | 可选值         |  默认值
-|-|-|-|-
imgType  | 图片背景图类型       | String  | default idcardFront idcardBack    | default |
required | 是否显示 * 号        | Boolean | -                            | true |
url      | 上传成功图片地址      | String  | -                                | ' ' |

#### events
事件名称     | 说明          |  回调参数
-|-|-
change      | 图片上传触发   | 上传成功的图片url 




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
### @change 图片上传成功的回调图片 type: Function
```
  获得上传成功后的图片路径
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
