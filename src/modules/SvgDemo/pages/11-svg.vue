<template>
  <div>
    <svg width="750" height="500">
      <!-- <path
        d="
          M 3, 3
          200, 3
          C 150 80, 80 150, 3, 200 
          Z
        "
      ></path> -->

      <path
        d="
          M 10 80
          C 40 10, 65 10, 95 80
          S 150 150, 180 80
        "
      >

      </path>
    </svg>
  </div>
</template>

<script>

// TODO: 曲线命令

// TODO: 贝塞尔曲线 C 命令
// 三次贝塞尔曲线。(x,y)表示的是曲线的终点，(x1,y1)是起点的控制点，(x2,y2)是终点的控制点。
// 控制点描述的是曲线起始点的斜率，曲线上各个点的斜率，是从起点斜率到终点斜率的渐变过程。

// C x1 y1, x2 y2, x y



export default {
  name: 'svg11'
}

</script>
