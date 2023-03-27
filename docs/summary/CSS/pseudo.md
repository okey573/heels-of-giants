---
title: 伪元素和伪类
---

# 伪元素和伪类

## 伪元素

伪元素为 DOM 树没有定义的虚拟元素。不同于其他选择器，它不以元素为最小选择单元，它选择的是元素指定内容。比如 ::before 表示选择元素内容的之前内容，也就是 "" ； ::selection 表示选择元素被选中的内容。

- ::after
- ::before
- ::first-letter
- ::first-line
- ::selection
- ::placeholder

## 伪类

伪类用于选择 DOM 树之外的信息，或是不能用简单选择器进行表示的信息。前者包含那些匹配指定状态的元素，比如 :visited， :active； 后者包含那些满足一定逻辑条件的DOM树中的元素，比如 :first-child， :first-of-type， :target

|       Selector       |           Meaning           | CSS |
|:--------------------:|:---------------------------:|:---:|
|       :active        |         选择正在被激活的元素          |  1  |
|        :hover        |         选择被鼠标悬浮着元素          |  1  |
|        :link         |          选择未被访问的元素          |  1  |
|       :visited       |          选择已被访问的元素          |  1  |
|     :first-child     |     选择满足是其父元素的第一个子元素的元素     |  2  |
|        :lang         |      选择带有指定 lang 属性的元素      |  2  |
|        :focus        |        选择拥有键盘输入焦点的元素        |  2  |
|       :enable        |         选择每个已启动的元素          |  3  |
|       :disable       |         选择每个已禁止的元素          |  3  |
|       :checked       |         选择每个被选中的元素          |  3  |
|       :target        |          选择当前的锚点元素          |  3  |
|    :first-of-type    |   选择满足是其父元素的第一个某类型子元素的元素    |  3  |
|    :last-of-type     |   选择满足是其父元素的最后一个某类型子元素的元素   |  3  |
|    :only-of-type     |   选择满足是其父元素的唯一一个某类型子元素的元素   |  3  |
|   :nth-of-type(n)    |   选择满足是其父元素的第n个某类型子元素的元素    |  3  |
| :nth-last-of-type(n) |    选择满足是其父元素的倒数第n个某类型的元素    |  3  |
|     :only-child      |    选择满足是其父元素的唯一一个子元素的元素     |  3  |
|     :last-child      |     选择满足是其父元素的最后一个元素的元素     |  3  |
|    :nth-child(n)     |     选择满足是其父元素的第n个子元素的元素     |  3  |
|  :nth-last-child(n)  |    选择满足是其父元素的倒数第n个子元素的元素    |  3  |
|        :empty        |        选择满足没有子元素的元素         |  3  |
|      :in-range       |       选择满足值在指定范围内的元素        |  3  |
|    :out-of-range     |        选择值不在指定范围内的元素        |  3  |
|       :invalid       |        选择满足值为无效值的元素         |  3  |
|        :valid        |        选择满足值为有效值的元素         |  3  |
|    :not(selector)    |      选择不满足selector的元素       |  3  |
|      :optional       | 选择为可选项的表单元素，即没有“required”属性 |  3  |
|      :read-only      |     选择有"readonly"的表单元素      |  3  |
|     :read-write      |     选择没有"readonly"的表单元素     |  3  |
|        :root         |            选择根元素            |  3  |

## 区别和比较

- 伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
- 伪元素本质上是创建了一个有内容的虚拟容器；
- CSS3 中伪类和伪元素的语法不同； 伪类 :link :hover 伪元素 ::before ::after

## :after/::after和:before/::before的异同

都可以用来表示伪类对象，用来设置对象前的内容， :before 和 ::before 写法是等效的; :after 和 ::after 写法是等效的， :before / :after 是 css1 (也可能是css2)的写法

## 参考链接

- [伪元素与伪类](https://blog.csdn.net/qq_45025670/article/details/125588463)
