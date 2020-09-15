<template>
  <div>
    <svg width="750" height="500">
      <line @click="handleClick()" x1="3" y1="3" :x2="x2" y2="3"></line>
      <line
        class="hover-line"
        stroke="red"
        stroke-width="5"
        stroke-opacity="0.5"
        stroke-dasharray="57 57"
        x1="3"
        y1="19"
        x2="60"
        y2="19"
      ></line>
      <line x1="3" y1="38" x2="30" y2="38"></line>
      <line x1="3" y1="57" x2="80" y2="57"></line>
    </svg>
  </div>
</template>

<script>

/*
创建 左对齐 图标

TODO: 直线 line

x1：起点的水平轴坐标
y1：起点的竖直轴坐标
x2：终点的水平轴坐标
y2：终点的竖直轴坐标


*/

export default {
  name: 'svg01',
  data () {
    return {
      x2: 48
    }
  },
  methods: {
    handleClick () {
      this.x2 = this.x2 === 48 ? 0 : 48
    }
  }
}

</script>

<style lang="scss" scoped>
@keyframes expand {
  0% {
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dashoffset: 57;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
.hover-line {
  animation: expand 3s 1s infinite;
}
</style>