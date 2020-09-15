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
      
      // 获取颜色列表
      const z = d3.scaleOrdinal(d3.schemeCategory10)
      // 设置小球半径
      const r = 10
      
      // 设置隐式复用对象
      const defs = chart.append('defs')
      const box = defs.append('g')
          .attr('id', 'container-box')

      // 添加小球组合
      box.append('g')
        .attr('id', 'circle-box')

        // 提前声明 selectAll 的可能原因
        // http://blog.sina.com.cn/s/blog_7cfb366d0101a9bs.html
        
        .selectAll('circle')
        .data(nodeList)
        .enter()
        .append('circle')
        .attr('cursor', 'pointer')
        // 填充小球颜色
        .attr('fill', function(d) {
          return z(d.y)
        })
        // 绘制小球
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        })

        // 添加小球大小的过渡动画
        .attr('r', 0)
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .delay(function(d, i) {
          return i * 300
        })
        .attr('r', r)

        // 连接线
        box.append('g')
        .attr('id', 'line-box')
        .selectAll('line')
        .data(linkList)
        .enter()
        .append('line')
        
        .attr('stroke', '#000')
        
        .attr('x1', (d) => {
          const node = nodeList.find(node => node.name === d.source)
          return node.x
        })
        .attr('y1', (d) => {
          const node = nodeList.find(node => node.name === d.source)
          return node.y
        })
        .attr('x2', (d) => {
          const node = nodeList.find(node => node.name === d.target)
          return node.x
        })
        .attr('y2', (d) => {
          const node = nodeList.find(node => node.name === d.target)
          return node.y
        })
        .attr('stroke-width', 1)
        .attr('stroke-linecap', 'round')

        .transition()
        .duration(750)
        .ease(d3.easeLinear)

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
