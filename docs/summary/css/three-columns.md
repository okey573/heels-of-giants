---
title: 三栏布局
lastUpdated: Thu May 09 2024 16:31:39 GMT+0800 (中国标准时间)
---

# 经典的三栏布局

## 圣杯布局

圣杯布局就是将基本布局之后使用向左浮动，middle栏留出两边位置，然后使用相对定位将左右两栏通过margin-left定位到相应位置

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>圣杯布局</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .header,
        .footer {
            height: 100px;
            line-height: 100px;
            background-color: green;
            text-align: center;
            font-size: 30px;
            font-weight: bolder;
        }

        .footer {
            background-color: goldenrod;
        }

        .container {
            padding: 0 220px 0 200px;
            overflow: hidden;
        }

        .left,
        .middle,
        .right {
            position: relative;
            float: left;
            min-height: 130px;
            word-break: break-all;
        }

        .left {
            margin-left: -100%;
            left: -200px;
            width: 200px;
            background-color: red;
        }

        .right {
            margin-left: -220px;
            right: -220px;
            width: 220px;
            background-color: green;
        }

        .middle {
            width: 100%;
            background-color: blue;
        }
    </style>
</head>

<div class="header">header</div>
<div class="container">
    <div class="middle">
        <h4>middle</h4>
        <p>
            middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
            middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
            middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
            middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
            middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
            middlemiddlemiddlemiddlemiddle
        </p>
    </div>
    <div class="left">
        <h4>left</h4>
        <p>
            leftleftleftleftleftleftleftleftleftleftleftleft
            leftleftleftleftleftleftleftleftleftleftleftleft
            leftleftleftleftleftleftleftleftleftleftleftleft
        </p>
    </div>
    <div class="right">
        <h4>right</h4>
        <p>
            rightrightrightrightrightrightrightrightrightright
            rightrightrightrightrightrightrightrightrightright
            rightrightrightrightrightrightright
        </p>
    </div>
</div>
<div class="footer">footer</div>

</html>
```

## 双飞翼布局

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>双飞翼布局</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .header,
        .footer {
            height: 100px;
            line-height: 100px;
            background-color: green;
            text-align: center;
            font-size: 30px;
            font-weight: bolder;
        }

        .footer {
            background-color: goldenrod;
        }

        .container {
            overflow: hidden;
        }

        .left,
        .middle,
        .right {
            float: left;
            min-height: 130px;
            word-break: break-all;
        }

        .left {
            margin-left: -100%;
            width: 200px;
            background-color: red;
        }

        .right {
            margin-left: -220px;
            width: 220px;
            background-color: green;
        }

        .middle {
            width: 100%;
            height: 100%;
            background-color: blue;
        }

        .inner {
            margin: 0 220px 0 200px;
            min-height: 130px;
            background: blue;
            word-break: break-all;
        }
    </style>
</head>

<body>
<div class="header">header</div>
<div class="container">
    <div class="middle">
        <div class="inner">
            <h4>middle</h4>
            <p>
                middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                middlemiddlemiddlemiddlemiddle
            </p>
        </div>
    </div>
    <div class="left">
        <h4>left</h4>
        <p>
            leftleftleftleftleftleftleftleftleftleftleftleft
            leftleftleftleftleftleftleftleftleftleftleftleft
            leftleftleftleftleftleftleftleftleftleftleftleft
        </p>
    </div>
    <div class="right">
        <h4>right</h4>
        <p>
            rightrightrightrightrightrightrightrightrightright
            rightrightrightrightrightrightrightrightrightright
            rightrightrightrightrightrightright
        </p>
    </div>
</div>
<div class="footer">footer</div>
</body>

</html>
```

## 圣杯和双飞翼对比

### 相同之处

- 布局类似，都是实现特定需求的三列布局。
- 都使用了float浮动向左脱离文档流,让左中右三列浮动，通过父外边距形成三列布局。

### 不同之处

- 实现方法的不同： 圣杯布局是通过float搭建布局+margin使三列布局到一行上+relative相对定位调整位置。 双飞翼布局是通过float+margin，没有使用相对定位。
- 怎么处理两列的位置： 圣杯布局是给外部容器加padding，通过相对定位把两边定位出来。 双飞翼布局是靠在中间这层外面套一层div加padding将内容挤出来中间。

## flex 布局

left 和 right 的 width 固定，middle 设置 flex: 1 宽度自动撑开

## 参考链接

- [深入理解圣杯布局和双飞翼布局](https://juejin.cn/post/6844903817104850952)

- [CSS之圣杯布局与双飞翼布局](https://juejin.cn/post/6973562604581027853)
