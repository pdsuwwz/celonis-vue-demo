<template>
  <div class="celonis-container">
    <div class="button-group">
      <el-row>
        <el-col :span="20">
          <el-button
            v-for="(button) in directionsButtonList"
            :key="button.value"
            :type="svg.rankdir === button.value ? 'primary' : ''"
            @click="svg.rankdir = button.value"
          >{{ button.label }}</el-button>
          <el-button @click="rerender()">重置</el-button>
        </el-col>
        
        <el-col :span="4">
          <el-button
              type="primary"
              @click="setScaleMin()"
            >缩小</el-button>
            <el-button
              type="primary"
              @click="setScaleMax()"
            >放大</el-button>
        </el-col>
      </el-row>
    </div>
    
    <svg id="celonis-demo"></svg>
  </div>
</template>

<script>
import * as d3 from "d3"
import dagreD3 from "dagre-d3"

import { dataset } from "@/modules/Process/data/"

export default {
  data() {
    return {
      svg: {
        chart: {},
        innerContainer: {},
        graph: {},
        rankdir: 'TB',
        zoom: {
          transform: {}
        },
        initialScale: 0.75,
        render: null,
      },
      directionsButtonList: [
        {
          value: "TB",
          label: "从上至下",
        },
        {
          value: "BT",
          label: "从下至上",
        },
        {
          value: "LR",
          label: "从左至右",
        },
        {
          value: "RL",
          label: "从右至左",
        }
      ]
    };
  },
  mounted() {
    this.setInitOptions()
    this.createGraph()
  },
  methods: {
    // 获取路线 path 路径
    getPathLineList () {
      const pathList = this.svg.chart.selectAll('.edgePath > path')
      return pathList
    },
    
    createTransitionList () {
      const pathList = this.getPathLineList()
      pathList
      .attr('stroke-width', '3')
      .attr('fill', 'none')
      .attr('opacity', 0)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .delay(400)
      .attrTween('stroke-dashoffset', function() {
        const $path = d3.select(this)
        const totalLength = $path.node().getTotalLength()
        $path.attr('stroke-dasharray', `${totalLength}, ${totalLength}`)
        return function(t) {
          return totalLength * (1 - t)
        }
      })
      .attr('stroke', '#000')
      .attr('opacity', 1)
    },

    setScaleMin () {
      this.svg.initialScale -= 0.15
      if (this.svg.initialScale < 0) {
        this.svg.initialScale = 0.15
      }
      this.setGraphInnerContainerScale()
    },
    setScaleMax () {
      this.svg.initialScale += 0.15
      this.setGraphInnerContainerScale()
    },
    setInitOptions() {
      const containerWidth = 1000
      const margin = { top: 10, right: 10, bottom: 10, left: 10 }
      const width = containerWidth - margin.left - margin.right
      this.svg.chart = d3
        .select("#celonis-demo")
        .attr("width", width + margin.left + margin.right)
      this.svg.innerContainer = this.svg.chart.append("g")

      window.svg = this.svg

      return {
        containerWidth,
        margin,
        width,
      };
    },
    createGraph() {
      // 初始化创建
      this.svg.graph = new dagreD3.graphlib.Graph()
      this.svg.graph.setGraph({
        rankdir: this.svg.rankdir
      })

      // 添加节点
      dataset.nodes.forEach((node) => {
        this.svg.graph.setNode(node.id, {
          label: node.label,
          shape: node.shape,
          clusterLabelPos: 'top',
          style: `
            fill: yellow;
            stroke: #000;
          `,
        })
      })
      // 添加节点关系
      dataset.edges.forEach((edge) => {
        this.svg.graph.setEdge(edge.source, edge.target, {
          label: edge.label,
          style: `
            fill: none;
            stroke-width: 3px;
            ${
              // TODO: 可抽离配置，目前是将数据结构写死的，开始和结束特殊标记
              edge.source === 0 ||
              dataset.nodes.find((node) => node.id === edge.target).isEnd
                ? 'stroke-dasharray: 5, 5'
                : ''
            };
          `,
          curve: d3.curveBasis,
          arrowheadClass: "arrowhead",
        })
      })

      this.setGraphZoom()
      this.renderGraph()
      this.setGraphCenter()
    },
    // 创建渲染器
    renderGraph () {
      this.svg.render = this.svg.render || new dagreD3.render()
      this.svg.render(this.svg.innerContainer, this.svg.graph)
    },
    // 建立拖拽缩放
    setGraphZoom () {
      this.svg.zoom = d3.zoom().on("zoom", () => {
        this.svg.innerContainer.attr("transform", d3.event.transform)
      })
      this.svg.chart.call(this.svg.zoom)
    },
    // 渲染完毕后的图纸居中
    setGraphCenter () {
      this.svg.chart.call(
        this.svg.zoom.transform,
        d3.zoomIdentity
          .translate(
            (this.svg.chart.attr("width") - this.svg.graph.graph().width * this.svg.initialScale) / 2,
            20
          )
          .scale(this.svg.initialScale)
      )
      this.svg.chart.attr("height", this.svg.graph.graph().height * this.svg.initialScale + 40)
    },
    setGraphInnerContainerScale() {
      this.$nextTick(() => {
        console.log(this.svg.initialScale)
        this.svg.zoom.scaleTo(this.svg.chart, this.svg.initialScale)
      })
    },
    // 重选染
    // TODO: 可能有性能问题
    rerender () {
      this.svg.initialScale = 0.75
      this.svg.graph.setGraph({
        rankdir: this.svg.rankdir
      })
      this.setGraphZoom()
      this.renderGraph()
      this.setGraphCenter()
      this.createTransitionList()
    }
  },
  watch: {
    'svg.rankdir': {
      handler () {
        this.$nextTick(() => {
          this.rerender()
        })
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.celonis-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  svg {
    border: 1px solid #000;
    margin-top: 30px;
    /deep/ .arrowhead {
      fill: deepskyblue;
      stroke-width: 1px;
    }
  }
}
</style>
