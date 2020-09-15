<template>
  <div class="celonis-container">
    <svg
      id="celonis-demo"
    ></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  mounted () {
    this.createFactory()
  },
  methods: {
    createFactory () {
      const containerWidth = 1000

      // 定义初始长宽高
      const margin = { top: 10, right: 10, bottom: 10, left: 10 }
      const width = containerWidth - margin.left - margin.right
      const height = 600 - margin.top - margin.bottom

      // 小球间距
      const spacing = 10

      // 小球半径
      const r = 10

      // 小球位置坐标
      const points = new Array(7).fill().map((item, index) => {
        return [width / 2 + r, index * 5 + margin.top]
      })


      // 设置目标 svg 图纸长宽高
      const chart = d3
        .select('#celonis-demo')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      
      // 通用线条的颜色
      const z = d3.scaleOrdinal(d3.schemeCategory10)

      // g 组合，输出小球
      chart
        .append('g')
        .selectAll('circle')
        .attr('class', 'points')
        .data(points)
        .enter()
        .append('circle')
        .attr('cursor', 'pointer')
        // 填充小球颜色
        .attr('fill', function(d) {
          return z(d[1])
        })
        // 绘制小球
        .attr('cx', function(d) {
          return d[0]
        })
        .attr('cy', function(d) {
          return d[1] * spacing
        })

        // 添加小球大小的过渡动画
        .attr('r', 0)
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .delay(function(d, i) {
          return i * 200
        })
        .attr('r', r)
      
      // 输出标题
      chart
        .append('g')
        .attr('class', 'chart--title')
        .append('text')
        .attr('fill', '#000')
        .attr('font-size', '16px')
        .attr('font-weight', '700')
        .attr('text-anchor', 'middle')
        .attr('x', containerWidth / 2)
        .attr('y', 20)
        .text('测试文本')
    }
  }
}
</script>

<style lang="scss" scoped>
.celonis-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  svg {
    border: 1px solid red;
  }
}
</style>
