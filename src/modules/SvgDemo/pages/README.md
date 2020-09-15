# 知识框架

# 坐标系统

# 基本形状

# 坐标系统变换

# 路径

# 图案和渐变

# 裁剪和蒙版

# SVG 动画

# SVG 交互


* <svg> 包裹并定义整个矢量图。<svg> 标签之于矢量图就如同 <html> 标签之于一个 web 页面。
* <line> 创建一条直线。
* <polyline> 创建折线。
* <rect> 创建矩形。
* <ellipse> 创建圆和椭圆。
* <polygon> 创建多边形。
* <path> 通过指定点以及点和点之间的线来创建任意形状。
* <defs> 定义一个可复用的图形。初始情况下 <defs> 里面的内容是不可见的。<defs> 标签之于矢量图就如同 <head> 标签之于一个 web 页面。
* <g> 将多种形状组合起来。将组合后的形状置于 <defs> 中可以让它能够被复用。
* <symbol> 类似于一个组合，但是拥有一些额外的特性。通常被置于 <defs> 标签中便于复用。
* <use> 获取在 <defs> 中定义的复用对象并在 SVG 中显示出来。

# 特性总结

* stroke	笔画颜色
* stroke-width	笔画宽度
* stroke-opacity	笔画不透明度
* stroke-dasharray	虚线笔画
* stroke-dashoffset 偏移量
* stroke-linecap	笔画头的形状 butt(默认),round,square
* stroke-linejoin	图形棱角，有miter(默认),round和bevel三个取值
* stroke-miterlimit	相交处显示宽度与线宽的最大比例，默认为4
* fill	填充颜色 默认black
* fill-opacity	填充不透明度
* fill-rule	填充规则

# path 路径

命令	参数	说明
M m	x y	移动画笔到制定坐标
L l	x y	绘制一条到给定坐标的线
H h	x	绘制一条到给定x坐标的横线
V v	y	绘制一条到给定y坐标的垂线
A a	rx ry x-axis-rotation large-arc sweep x y	圆弧曲线命令有7个参数，依次表示x方向半径、y方向半径、旋转角度、大圆标识、顺逆时针标识、目标点x、目标点y。大圆标识和顺逆时针以0和1表示。0表示小圆、逆时针
Q q	x1 y1 x y	绘制一条从当前点到x,y控制点为x1,y1的二次贝塞尔曲线
T t	x y	绘制一条从当前点到x,y的光滑二次贝塞尔曲线，控制点为前一个Q命令的控制点的中心对称点，如果没有前一条则已当前点为控制点。
C c	x1 y1 x2 y2 x y	绘制一条从当前点到x,y控制点为x1,y1 x2,y2的三次贝塞尔曲线
S s	x2 y2 x y	绘制一条从当前点到x,y的光滑三次贝塞尔曲线。第一个控制点为前一个C命令的第二个控制点的中心对称点，如果没有前一条曲线，则第一个控制点为当前的点。

R	Catmull-Rom curveto* Catmull-Rom曲线	x1 y1 (x y)+

注: Catmull-Rom曲线不是标准的SVG命令


其中，有5个指定属于基本指令

指令字母（绝对坐标）	中文含义	参数示意	具体说明
M	移动到(moveTo)	x,y	路径起始点坐标
Z	闭合路径(closepath)		将路径的开始和结束点用直线连接
L	直线(lineTo)	x,y	当前节点到指定(x,y)节点，直线连接
H	水平直线	x	保持当前点的y坐标不变，x轴移动到x, 形成水平线
V	垂直直线	y	保持当前点的x坐标不变，y轴移动到y, 形成垂直线


# others

注: 实例中的 +-3px 是为了避免图形在容器边界被截断

参考学习

https://juejin.im/post/6844903589807128590

https://webdesign.tutsplus.com/tutorials/how-to-hand-code-svg--cms-30368

https://www.d3js.org.cn/svg/get_start/#%E7%AC%AC%E5%9B%9B%E7%AB%A0-%E5%9F%BA%E6%9C%AC%E5%BD%A2%E7%8A%B6

SVG矢量绘图 path路径详解（基本画法）
https://justcode.ikeepstudying.com/2015/07/svg%E7%9F%A2%E9%87%8F%E7%BB%98%E5%9B%BE-path%E8%B7%AF%E5%BE%84%E8%AF%A6%E8%A7%A3%EF%BC%88%E5%9F%BA%E6%9C%AC%E7%94%BB%E6%B3%95%EF%BC%89/


贝塞尔曲线
https://justcode.ikeepstudying.com/2015/07/svg%E7%9F%A2%E9%87%8F%E7%BB%98%E5%9B%BE-path%E8%B7%AF%E5%BE%84%E8%AF%A6%E8%A7%A3%EF%BC%88%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF%E5%8F%8A%E5%B9%B3%E6%BB%91%EF%BC%89/

SVG导航下划线光标跟随效果
https://www.rrfed.com/2018/03/31/svg-animate/#svg-move-by-path