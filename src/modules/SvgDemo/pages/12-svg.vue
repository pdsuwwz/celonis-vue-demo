<template>
  <div>
    <svg width="750" height="500">
      <g transform="translate(0, 100) scale(1, -1)">
        <line x1="3" y1="3" x2="100" y2="100"></line>
        <line x1="3" y1="3" x2="3" y2="100"></line>

        <polygon
          points="
            40 40,
            100 40,
            70 70,
            40, 70
          "
        />
      </g>
    </svg>
  </div>
</template>

<script>

// 笛卡尔坐标系统变换


export default {
  name: 'svg12'
}

</script>
