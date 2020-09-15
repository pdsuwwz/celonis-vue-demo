<template>
  <section class="app-main" flex="1">
    <transition name="fade" mode="out-in">
      <div class="grid">
        <span class="x">x</span>
        <router-view></router-view>
        <span class="y">y</span>
      </div>

    </transition>
  </section>
</template>

<script>
export default {
  name: 'LayoutSvg',
  computed: {}
}
</script>

<style lang="scss" scoped>
  .grid {
    width: 750px;
    height: 500px;
    margin: 0 auto;
    padding-top: 100px;
    padding-left: 100px;
    background-image: url('~@/assets/grid.png');
    position: relative;
  }
  .grid::before {
    content: "";
    border-left: 1px solid #7c7cea;
    position: absolute;
    top: 0;
    left: 100px;
    width: 750px;
    height: 600px;
  }
  .grid::after {
    content: "";
    border-top: 1px solid #7c7cea;
    position: absolute;
    top: 100px;
    left: 0;
    width: 850px;
    height: 500px;
  }
  /* 设置默认 svg 样式 */
  /deep/ svg {
    stroke: #000;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    z-index: 1;
    position: relative;
  }
  .x, .y {
    position: absolute;
    font-size: 30px;
  }
  .x {
    right: 3%;
    top: 11%;
  }
  .y {
    left: 13%;
    bottom: 11%;
  }
</style>
<style>
  html, body {
    height: 100%;
    width: 100%;
    background: #e9e9e9;
  }
  body {
    margin: 0;
    text-align: center;
  }
</style>