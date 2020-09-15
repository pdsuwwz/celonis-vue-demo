<template>
  <div>
    <svg width="750" height="500">

      <circle
        cx="100"
        cy="100"
        r="30"
        class="custom-circle"
      ></circle>
      
      <ellipse cx="33" cy="33" rx="30" ry="30"></ellipse>
      <line x1="33" y1="12" x2="33" y2="35" style="stroke-width: 8;"></line>
      <ellipse cx="33" cy="50" rx="3" ry="3" style="fill: #000"></ellipse>
    </svg>
  </div>
</template>

<script>

/*
创建一个 警示 图标

圆和椭圆 ellipse


TODO: circle

cx：中心位置在 x 轴上的坐标
cy：中心位置在 y 轴上的坐标
r：半径

TODO: ellipse

cx：中心位置在 x 轴上的坐标
cy：中心位置在 y 轴上的坐标
rx：沿 x 轴向的半径，也就是它会把图形分割成上下两部分
ry：沿 y 轴向的半径，也就是它会把图形分割成左右两部分


*/

export default {
  name: 'svg04'
}

</script>

<style lang="scss" scoped>

.custom-circle {
  fill: #eee;
  stroke: #000;
  stroke-width: 3;
  stroke-dashoffset: 188.4;
  stroke-dasharray: 188.4, 188.4;
  // 抗锯齿属性
  shape-rendering: geometricPrecision;
  &:hover {
    transition: 2s;
    stroke-dashoffset: 0;
  }
}
// 参考： https://www.cnblogs.com/daisygogogo/p/11044353.html
</style>
