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
          <el-button type="primary" @click="setScaleMin()">缩小</el-button>
          <el-button type="primary" @click="setScaleMax()">放大</el-button>
        </el-col>
      </el-row>
    </div>

    <svg id="celonis-demo" />
  </div>
</template>

<script>
import * as d3 from "d3";
import dagreD3 from "dagre-d3";

import { dataset } from "@/modules/Process/data/";

export default {
  data() {
    return {
      svg: {
        chart: {},
        innerContainer: {},
        graph: {},
        rankdir: "TB",
        zoom: {
          transform: {},
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
        },
      ],
    };
  },
  mounted() {
    this.setInitOptions();
    this.createGraph();
  },
  methods: {
    // 获取路线 path 集合
    getPathLineList() {
      const pathList = []
      const pathGroupList = this.svg.chart
        .selectAll('.edgePaths > .edgePath')
        .each(function () {
          const $pathNode = d3.select(this).select('path').node()
          pathList.push($pathNode)
        })
      return {
        pathGroupList, // 带 g.path 集合
        pathList: d3.selectAll(pathList) // 纯 path 集合
      }
    },
    // 获取节点 node 集合
    getNodeList(range = []) {
      const nodeList = this.svg.chart.selectAll(".nodes > .node")
      return !range.length ? nodeList : nodeList.filter(function(){
        const flag = Number(d3.select(this).attr('id').split('-')[1])
        return range.includes(flag)
      })
    },

    // 解析并获取 transform: translate
    getTranslateValues (element) {
      const style = window.getComputedStyle(element)
      const matrix = style.transform || style.webkitTransform || style.mozTransform

      // No transform property. Simply return 0 values.
      if (matrix === 'none') {
        return {
          x: 0,
          y: 0,
          z: 0
        }
      }

      // Can either be 2d or 3d transform
      const matrixType = matrix.includes('3d') ? '3d' : '2d'
      const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

      // 2d matrices have 6 values
      // Last 2 values are X and Y.
      // 2d matrices does not have Z value.
      if (matrixType === '2d') {
        return {
          x: matrixValues[4],
          y: matrixValues[5],
          z: 0
        }
      }

      // 3d matrices have 16 values
      // The 13th, 14th, and 15th values are X, Y, and Z
      if (matrixType === '3d') {
        return {
          x: matrixValues[12],
          y: matrixValues[13],
          z: matrixValues[14]
        }
      }
    },

    // 创建虚拟轨迹
    createVirtualRoutes () {
      const { pathGroupList } = this.getPathLineList()
      const _self = this
      // 测试 [0, 1, 2, 3, 5, 6, 7] 路径
      const nodeList = this.getNodeList([0, 1, 2, 3, 5, 6, 7]).nodes()

      // TODO: 改成 const box = this.svg.innerContainer.append('g') 就与原图重合了
      // const box = this.svg.chart.append('g')
      const box = this.svg.innerContainer.append('g')
      
      let combinePath = ''

      pathGroupList
        .each(function () {
          const $selfNode = d3.select(this)
          const [source, target] = $selfNode.attr('id').split('-')

          const pathNode = $selfNode.select('path').node()
          const group = box.append('g')

          group.append(() => {
              const cloneNode = d3.select(pathNode).clone(true)
              return cloneNode.node()
            })
            .attr('opacity', 1)

          // 获取每个 path 的首尾节点坐标
          const startPoint = pathNode.getPointAtLength(0)
          const endPoint = pathNode.getPointAtLength(pathNode.getTotalLength())
          group
            .append('circle')
            .attr('cx', endPoint.x)
            .attr('cy', endPoint.y)
            .attr('r', 5)
            .attr('fill', 'red')
            
          group.append('circle')
            .attr('cx', startPoint.x)
            .attr('cy', startPoint.y)
            .attr('r', 5)
            .attr('fill', 'green')
          
          // if (source === '4') {
          //   group
          //     .append('g')
          //     .append('path')
          //     .attr('stroke', 'red')
          //     .attr('d',`
          //       M 0 0 
          //       L ${startPoint.x} ${startPoint.y}
          //     `)
          // }
          
          // ----- 分割线 -----下面的别动
          
          // box.append('g')
          //   .append(() => {
          //     const cloneNode = d3.select(this).clone(true)
          //     return cloneNode.node()
          //   })
          //   .attr('opacity', 1)
          //   // .attr('marker-end', null)

          // // 获取每个 path 的首尾节点坐标
          // const startPoint = this.getPointAtLength(0)
          // const endPoint = this.getPointAtLength(this.getTotalLength())
          // box
          //   .append('circle')
          //   .attr('cx', endPoint.x)
          //   .attr('cy', endPoint.y)
          //   .attr('r', 5)
          //   .attr('fill', 'red')
            
          // box.append('circle')
          //   .attr('cx', startPoint.x)
          //   .attr('cy', startPoint.y)
          //   .attr('r', 5)
          //   .attr('fill', 'green')
          
          // combinePath += `
          //   M ${startPoint.x} ${startPoint.y}
          //   L ${startPoint.x} ${startPoint.y}
          // `
        })
    },

    // 创建线条过渡效果
    createTransitionList() {
      const { pathList } = this.getPathLineList()
      pathList
        .attr("stroke-width", "3")
        .attr("fill", "none")
        .attr("opacity", 0)
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .delay(400)
        .attrTween("stroke-dashoffset", function () {
          const $path = d3.select(this);
          const totalLength = $path.node().getTotalLength();
          $path.attr("stroke-dasharray", `${totalLength}, ${totalLength}`);
          return function (t) {
            return totalLength * (1 - t);
          };
        })
        .attrTween("marker-end", function () {
          const $path = d3.select(this);
          const marker = $path.attr("marker-end");
          $path.attr("marker-end", "");
          return function () {
            return marker;
          };
        })
        .attr("stroke", "#000")
        .attr("opacity", 1);
    },

    setScaleMin() {
      this.svg.initialScale -= 0.15;
      if (this.svg.initialScale < 0) {
        this.svg.initialScale = 0.15;
      }
      this.setGraphInnerContainerScale();
    },
    setScaleMax() {
      this.svg.initialScale += 0.15;
      this.setGraphInnerContainerScale();
    },
    setInitOptions() {
      const containerWidth = 1000;
      const margin = { top: 10, right: 10, bottom: 10, left: 10 };
      const width = containerWidth - margin.left - margin.right;
      this.svg.chart = d3
        .select("#celonis-demo")
        .attr("width", width + margin.left + margin.right);
      this.svg.innerContainer = this.svg.chart.append("g");

      window.svg = this.svg;

      return {
        containerWidth,
        margin,
        width,
      };
    },
    createGraph() {
      // 初始化创建
      this.svg.graph = new dagreD3.graphlib.Graph();
      this.svg.graph.setGraph({
        rankdir: this.svg.rankdir,
      });

      // 添加节点
      dataset.nodes.forEach((node, index) => {
        this.svg.graph.setNode(node.id, {
          id: `node-${index}`,
          label: node.label,
          shape: node.shape,
          clusterLabelPos: "top",
          style: `
            fill: yellow;
            stroke: #000;
          `,
        });
      });
      // 添加节点关系
      dataset.edges.forEach((edge) => {
        this.svg.graph.setEdge(edge.source, edge.target, {
          label: edge.label,
          id: `${edge.source}-${edge.target}`,
          style: `
            fill: none;
            stroke-width: 3px;
            stroke: #000;
            ${
              // TODO: 可抽离配置，目前是将数据结构写死的，开始和结束特殊标记
              edge.source === 0 ||
              dataset.nodes.find((node) => node.id === edge.target).isEnd
                ? "stroke-dasharray: 5, 5"
                : ""
            };
          `,
          // arrowhead: "hollowPoint",
          curve: d3.curveBasis,
          arrowheadClass: "arrowhead",
        });
      });

      this.setGraphZoom();
      this.renderGraph();
      this.setGraphCenter();
    },
    // 创建渲染器
    renderGraph() {
      this.svg.render = this.svg.render || new dagreD3.render();
      this.svg.render(this.svg.innerContainer, this.svg.graph);
    },
    // 建立拖拽缩放
    setGraphZoom() {
      this.svg.zoom = d3.zoom().on("zoom", () => {
        this.svg.innerContainer.attr("transform", d3.event.transform);
      });
      this.svg.chart.call(this.svg.zoom);
    },
    // 渲染完毕后的图纸居中
    setGraphCenter() {
      this.svg.chart.call(
        this.svg.zoom.transform,
        d3.zoomIdentity
          .translate(
            (this.svg.chart.attr("width") -
              this.svg.graph.graph().width * this.svg.initialScale) /
              2,
            20
          )
          .scale(this.svg.initialScale)
      );
      this.svg.chart.attr(
        "height",
        this.svg.graph.graph().height * this.svg.initialScale + 40
      );
    },
    setGraphInnerContainerScale() {
      this.$nextTick(() => {
        this.svg.zoom.scaleTo(this.svg.chart, this.svg.initialScale);
      });
    },
    // 重选染
    // TODO: 可能有性能问题
    rerender() {
      this.svg.initialScale = 0.75;
      this.svg.graph.setGraph({
        rankdir: this.svg.rankdir,
      });
      this.setGraphZoom();
      this.renderGraph();
      this.setGraphCenter();
      this.createTransitionList();
      this.createVirtualRoutes()
    },
  },
  watch: {
    "svg.rankdir": {
      handler() {
        this.$nextTick(() => {
          this.rerender();
        });
      },
      immediate: true,
    },
  },
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
