<template>
  <div>
    <svg width="750" height="500">
      <!-- 旋转中心 -->
      <!-- <circle cx="50" cy="50" r="3" /> -->

      <!-- 正常箭头 -->
      <!-- <g id="arrow">
        <line x1="60" y1="50" x2="90" y2="50" />
        <polygon points="90 50, 85 45, 85 55" />
      </g>
      <use href="#arrow" transform="rotate(60, 50, 50)" />
      <use href="#arrow" transform="rotate(-60, 50, 50)" />
      <use href="#arrow" transform="rotate(90, 50, 50)" /> -->

      <g id="centerBox" style="stroke: #000; fill: none">
        <rect x="35" y="40" width="30" height="20" />
      </g>

      <use href="#centerBox" transform="translate(-50, -50) scale(2)" style="stroke-width: 0.5" />
      <use href="#centerBox" transform="translate(-75, -75) scale(2.5)" style="stroke-width: 0.4" />
      <use href="#centerBox" transform="translate(-100, -100) scale(3)" style="stroke-width: 0.33"  />
      
    </svg>
  </div>
</template>

<script>

// rotate 围绕中心旋转

// 围绕中心点缩放

// translate(-centerX * (factor - 1), -centerY * (factor - 1))
// scale(factor)


export default {
  name: 'svg13'
}

</script>
