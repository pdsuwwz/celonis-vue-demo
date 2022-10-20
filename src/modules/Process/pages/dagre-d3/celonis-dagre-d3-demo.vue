<template>
  <div class="celonis-container">
    <svg id="celonis-demo"></svg>
  </div>
</template>

<script>
import * as d3 from "d3"
import dagreD3 from 'dagre-d3'

import { dataset } from '@/modules/Process/data/'

export default {
  mounted() {
    this.createFactory()
  },
  methods: {
    getInitOptions () {
      const containerWidth = 1000
      const margin = { top: 10, right: 10, bottom: 10, left: 10 }
      const width = containerWidth - margin.left - margin.right
      const chart = d3
        .select('#celonis-demo')
        .attr('width', width + margin.left + margin.right)
      const group = chart.append('g')
      window.chart = chart

      return {
        containerWidth,
        margin,
        width,
        chart,
        group
      }
    },
    createFactory() {
      const { chart, group } = this.getInitOptions()
      
      // 初始化创建
      const graph = new dagreD3.graphlib.Graph().setGraph({
      })

      // 添加节点
      dataset.nodes.forEach((node) => {
        graph.setNode(node.id, {
          label: node.label,
          shape: node.shape,
          style: `
            fill: yellow;
            stroke: #000;
          `,
        })
      })
      // 添加节点关系
      dataset.edges.forEach((edge) => {
        graph.setEdge(edge.source, edge.target, {
          label: edge.label,
          style: `
            fill: none;
            stroke: #f66;
            stroke-width: 3px;
            stroke-dasharray: ${
              // 开始和结束特殊标记
              (edge.source === 0 || dataset.nodes.find(node => node.id === edge.target).isEnd )
                ? '5, 5'
                : 'none'
            }
          `,
          curve: d3.curveBasis,
          arrowheadClass: 'arrowhead',
        })
      })

      // 建立拖拽缩放
      // TODO: 首次拖拽和缩放时 graph 会跑偏
      const zoom = d3.zoom()
        .on("zoom", function () {
            group.attr("transform", d3.event.transform);
        })
      chart.call(zoom)

      // 绘制
      const render = new dagreD3.render()
      render(group, graph)

      // 绘制之后居中图纸
      const initialScale = 0.75
      chart.call(
        zoom.transform,
        d3.zoomIdentity.translate(
          (chart.attr("width") - graph.graph().width * initialScale) / 2,
          20
        )
        .scale(initialScale)
      )
      chart.attr('height', graph.graph().height * initialScale + 40)
    },
  },
}
</script>

<style lang="scss" scoped>
.celonis-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  svg {
    border: 1px solid red;
    /deep/ .arrowhead {
      fill: green;
      stroke-width: 1px;
    }
  }
}
</style>
