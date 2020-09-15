<template>
  <div>
    <svg width="750" height="500">
      <symbol id="alert" viewBox="0 0 86 86">
        <ellipse cx="33" cy="33" rx="30" ry="30"></ellipse>
        <line x1="33" y1="12" x2="33" y2="35" style="stroke-width: 8;"></line>
        <ellipse cx="33" cy="50" rx="3" ry="3" style="fill: #000"></ellipse>
      </symbol>
      
      <symbol id="play" viewBox="0 0 86 86">
        <ellipse cx="33" cy="33" rx="30" ry="30"></ellipse>
        <polygon points="
          30 10,
          50 33,
          30 53
        "></polygon>
      </symbol>

      <symbol id="download" viewBox="0 0 74 71">
        <path
          d="
            M 18 3
            L 46 3
            L 46 40
            L 61 40
            L 32 68
            L 3 40
            L 18 40
            Z
          "
        ></path>
      </symbol>

      <!-- 使用组合对象，并设置坐标 -->
      <use href="#alert" x="100" y="200" width="100" height="100"></use>
      <use href="#play" x="300" y="200" width="100" height="100"></use>
      <use href="#download" x="500" y="200" width="100" height="100"></use>
    </svg>
  </div>
</template>

<script>

/*
使用 symbols 创建模板对象

*/

export default {
  name: 'svg10'
}

</script>
