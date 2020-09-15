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
      const points = [
        [5, 16],
        [7, 55],
        [4, 99],
        [11, 78],
        [28, 65],
        [7, 88],
        [5, 56],
        [2, 60],
        [4, 57],
        [6, 98],
        [27, 33],
        [26, 77],
        [23, 95],
        [34, 87],
        [7, 68],
        [1, 68],
        [2, 60],
        [22, 84],
        [6, 96],
        [13, 87]
      ]

      // 定义初始长宽高

      const margin = { top: 80, right: 60, bottom: 80, left: 60 }
      const width = containerWidth - margin.left - margin.right
      const height = 600 - margin.top - margin.bottom

      // 设置目标 svg 图纸长宽高
      const chart = d3
        .select('#celonis-demo')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      
      // 创建横向 x 比例尺函数
      const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(points, function(d) {
          return d[0]
        })
      ])
      .range([0, width])

      // 创建纵向 y 比例尺函数
      const y = d3
        .scaleLinear()
        .rangeRound([0, height])
        .domain([
          d3.max(points, function(d) {
            return d[1]
          }),
          0
        ])
      
      console.log(d3.max(points, function(d) {
        return d[1]
      }))

      // 通用线条的颜色
      const z = d3.scaleOrdinal(d3.schemeCategory10)

    const g = chart
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // 设置 x 轴
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width)
      .attr('y', 26)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('fill', '#000')
      .text('x 轴指标')

    // 设置 y 轴
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('y', -16)
      .attr('dy', '.71em')
      .style('text-anchor', 'start')
      .style('fill', '#000')
      .text('y 轴指标')

    // 输出点
    g.append('g')
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
        return x(d[0])
      })
      .attr('cy', function(d) {
        return y(d[1])
      })

      // 添加小球大小的过渡动画
      .attr('r', 0)
      .transition()
      .duration(750)
      .ease(d3.easeLinear)
      .delay(function(d, i) {
        return i * 10
      })
      .attr('r', 10)
    
    chart
      .append('g') // 输出标题
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
