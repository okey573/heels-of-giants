---
title: 响应式布局和自适应布局
---

# 响应式布局和自适应布局

## 响应式布局和自适应布局的区别

_网上怎么说的的都有，下面这个可能描述可能刚好相反..._

- 自适应布局是多个网页对应对各个设备，响应式布局是一套网页对应多个设备
- 自适应对页面做的屏幕适配是在一定范围：比如pc端一般要大于1024像素，手机端要小于768像素。而响应式布局全部适应
- 自适应布局如果屏幕太小会发生内容过于拥挤。而响应式布局正是为了解决这个问题而衍生出的概念，它可以自动识别屏幕宽度并做出相应调整的网页设计


#### Meta标签定义

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
```

意思是网页宽度默认等于屏幕宽度，缩放比为1.0


#### css
不需要写固定的像素，改用%形式或者auto

#### 使用css中的@media

使用媒体查询

#### 按照屏幕大小不同引入不同的css文件
```html
<link rel="stylesheet" type="text/css" media="screen and (max-device-width: 1080px)" href="style/css/demo1.css" />
/*也可以这样写*/
@import url("demo1.css") screen and (max-device-width: 1080px);
```

#### 使用流式，浮动栅格布局
