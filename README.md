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

### publish
1. 修改README.md里面的版本号
2. 执行以下命令
```
npm run build:lib
npm login
npm publish
```

### usage

#### props
参数     | 说明       |  类型    | 可选值         |  默认值
-|-|-|-|-
imgType  | 图片背景图类型       | String  | default idcardFront idcardBack custom    | default |
required | 是否显示 * 号        | Boolean | -                                | true |
url      | 上传成功图片地址     | String  | -                                | ' ' |
requestUrl | 上传地址url        | String  | -                                | ' ' |
isClose | 是否显示关闭图标      | Boolean | -                                | true |
headers | 请求头部      | Object | -                                | {} |

#### slot
name     | 说明  
-|-
custom      | 自定义背景图   

#### events
事件名称     | 说明          |  回调参数
-|-|-
change      | 图片上传触发   | callback(url,data)上传成功的图片url,返回其它数据

### Customize configuration
