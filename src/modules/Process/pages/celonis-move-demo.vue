<template>
  <div class="celonis-container">
    <svg
      id="celonis-demo"
    ></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'


const nodeList = [
  {
    name: '节点1',
    x: 0,
    y: 0
  },
  {
    name: '节点2',
    x: 0,
    y: 30
  },
  {
    name: '节点3',
    x: 90,
    y: 60
  },
  {
    name: '节点4',
    x: 0,
    y: 90
  },
  {
    name: '节点5',
    x: -40,
    y: 120
  },
  {
    name: '节点6',
    x: 40,
    y: 120
  }
]

const linkList = [
  {
    source: '节点1',
    target: '节点2'
  },
  {
    source: '节点2',
    target: '节点3'
  },
  {
    source: '节点3',
    target: '节点4'
  },
  {
    source: '节点4',
    target: '节点5'
  },
  {
    source: '节点4',
    target: '节点6'
  }
]

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

      // 设置目标 svg 图纸长宽高
      const chart = d3
        .select('#celonis-demo')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      
      // 设置小球半径
      const r = 10
      
      // 设置隐式复用对象
      const defs = chart.append('defs')
      const box = defs.append('g')
          .attr('id', 'container-box')

      // path 连接线
      const gPath = box.append('g')
      .attr('id', 'line-box')
      .selectAll('path')
      .data(linkList)
      .enter()
      .append('g')

      gPath.append('path')
      // 动态设置路径 id
      .attr('id', function(item, index) {
        return `path-${index}`
      })
      .attr('stroke', 'red')
      .attr('stroke-linecap', 'round')
      .attr('d', (d) => {
        const source = nodeList.find(node => node.name === d.source)
        const target = nodeList.find(node => node.name === d.target)
        return `M ${source.x} ${source.y} L ${target.x} ${target.y}`
      })

      // 绘制小球
      gPath.append('circle')
        .attr('fill', 'red')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r)
        .append('animateMotion')
        .attr("dur","3s")
        .attr("begin","0s")
        .attr("fill","freeze")
        .attr("repeatCount","indefinite")
        .append('mpath')
        // 根据动态 id 引入路径
        .attr("xlink:href", function(item, index){
          return `#path-${index}`
        })
        

      chart.append('use')
        .attr('href', '#container-box')
        .attr('x', width / 2 + r)
        .attr('y', height / 3)
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
