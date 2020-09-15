<template>
  <div>
    <svg width="750" height="500">
      <ellipse cx="33" cy="33" rx="30" ry="30"></ellipse>
      <polygon points="
        30 10,
        50 33,
        30 53
      "></polygon>
    </svg>
  </div>
</template>

<script>

/*
创建一个 多边形 图标

TODO: 多边形 polygon 闭合图形


points1(x, y)

points2(x, y)

points3(x, y)

每个点会按照顺序自动连接

*/

export default {
  name: 'svg05'
}

</script>
