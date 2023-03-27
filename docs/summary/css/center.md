---
title: 居中
outline: [2,6]
---

# 居中的实现方式

公共css：

```css
.wp {
  border: 1px solid red;
  width: 300px;
  height: 300px;
}

.box {
  background: green;
}

.box.size {
  width: 100px;
  height: 100px;
}
```

## 仅居中元素定宽高适用

html:

```html

<div class="wp">
    <div class="box size">123123</div>
</div>
```

- ###### absolute + 负margin

绝对定位的百分比是相对于父元素的宽高，通过这个特性可以让子元素的居中显示，但绝对定位是基于子元素的左上角，期望的效果是子元素的中心居中显示

为了修正这个问题，可以借助外边距的负值，负的外边距可以让元素向相反方向定位，通过指定子元素的外边距为子元素宽度一半的负值，就可以让子元素居中了

```css
.wp {
  position: relative;
}

.box {
  position: absolute;;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

- ###### absolute + margin auto

这种方式通过设置子元素为绝对定位，然后设置各个方向的距离都是0，此时再将margin设为auto，就可以在各个方向上居中了

```css
.wp {
  position: relative;
}

.box {
  position: absolute;;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

- ###### absolute + calc

css3带来了计算属性（calc），既然top的百分比是基于元素的左上角，那么在减去宽度的一半就好了

```css
.wp {
  position: relative;
}

.box {
  position: absolute;;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
```

## 居中元素不定宽高

html:

```html

<div class="wp">
    <div class="box">123123</div>
</div>
```

- ###### absolute + transform

修复绝对定位的问题，还可以使用css3新增的transform，transform的translate属性也可以设置百分比，其是相对于自身的宽和高，所以可以讲translate设置为-50%，就可以做到居中了

```css
.wp {
  position: relative;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- ###### line-height

把box设置为行内元素，通过text-align就可以做到水平居中，但很多同学可能不知道通过通过vertical-align也可以在垂直方向做到居中，代码如下

```css
.wp {
  line-height: 300px;
  text-align: center;
  font-size: 0px;
}

.box {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: initial;
  text-align: left; /* 修正文字 */
}
```

- ###### writing-mode

writing-mode可以改变文字的方向，改变后所有水平方向上的css属性，都会变为垂直方向上的属性，比如text-align，通过writing-mode和text-align就可以做到水平和垂直方向的居中了，只不过要稍微麻烦一点：

需要嵌套两层，一层转变方向，一层不转变，然后还是使用行内元素 + text-align: center的方式实现;

- ###### table

table也可以用来作布局，单元格中的内容天然就是垂直居中的，只要添加一个水平居中属性就好了

- ###### css-table

css新增的table属性，可以让我们把普通元素，变为table元素的现实效果，通过这个特性也可以实现水平垂直居中

```css
.wp {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.box {
  display: inline-block;
}
```

- ###### flex

flex作为现代的布局方案，颠覆了过去的经验，只需几行代码就可以优雅的做到水平垂直居中，目前移动端完全可以使用，PC要考虑兼容性

```css
.wp {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- ###### grid

css新出的网格布局，由于兼容性不太好，一直没太关注，通过grid也可以实现水平垂直居中。代码量也很少，但兼容性不如flex。

```css
.wp {
  display: grid;
}

.box {
  align-self: center;
  justify-self: center;
}
```

## 总结

PC端有兼容性要求，宽高固定，推荐absolute + 负margin

PC端有兼容要求，宽高不固定，推荐css-table

PC端无兼容性要求，推荐flex

移动端推荐使用flex

## 参考链接

- [参考文章](https://yanhaijing.com/css/2018/01/17/horizontal-vertical-center/)
