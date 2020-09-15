<template>
  <div>
    <svg width="750" height="500">
      <defs>
        <g id="leftalign">
          <line x1="3" y1="3" x2="48" y2="3"></line>
          <line x1="3" y1="19" x2="60" y2="19"></line>
          <line x1="3" y1="38" x2="30" y2="38"></line>
          <line x1="3" y1="57" x2="80" y2="57"></line>
        </g>
        <g id="rightcaret">
          <polyline points="
            3 3,
            30 28,
            3 53
          "></polyline>
        </g>
        <g id="browser">
          <rect x="3" y="3" width="90" height="50"></rect>
          <line x1="20" y1="3" x2="20" y2="15"></line>
          <line x1="3" y1="18" x2="90" y2="18"></line>
        </g>
      </defs>

      <!-- 使用组合对象，并设置坐标 -->
      <use href="#leftalign" x="100" y="100"></use>
      <use href="#rightcaret" x="300" y="100"></use>
      <use href="#browser" x="500" y="100"></use>

    </svg>
  </div>
</template>

<script>

/*
使用 <use> 来放置组合

设置 href 来指向那个图标的 id， 设置 x 和 y 表示放到特定的位置

*/

export default {
  name: 'svg09'
}

</script>
