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
    </svg>
  </div>
</template>

<script>

/*
组合对象，用 <g> 创建

有两种方法可以使我们的图标随时可用：将它们转换为组合，或转换为模板。我们将把前面的一半图标转换成组合，然后把剩下的一半变成模板，这样我们就可以说明他们之间的区别。
要把我们的一个图标转换成一个组合，我们要做的就是用标签 <g></g> 来包裹它。为了使这个组合可用，我们还需要给它一个唯一的ID。

*/

export default {
  name: 'svg08'
}

</script>
