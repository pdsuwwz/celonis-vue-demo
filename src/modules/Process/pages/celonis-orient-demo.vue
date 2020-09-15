<template>
  <div class="celonis-container">
    <svg id="celonis-demo" />
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  mounted() {
    this.createFactory();
  },
  methods: {
    createFactory() {
      const nodes = [
        { name: "节点0" },
        { name: "节点1" },
        { name: "节点2" },
        { name: "节点3" },
        { name: "节点4" },
      ];

      const links = [
        { source: 0, target: 1 },
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 3, target: 4 },
      ];

      const width = 1024;
      const height = 738;
      const svg = d3.select("svg").attr("width", width).attr("height", height);
      const circle_radius = 30;

      // 通过布局来转换数据，然后进行绘制
      const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).distance(200))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2));

      const links_group = svg.append("g")
      const nodes_group = svg.append("g")

      // 绘制线
      let svg_links = links_group
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .style("stroke", "#ccc")
        .style("stroke-width", 3);

      //节点对象
      let svg_nodes = nodes_group
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", circle_radius)
        .attr("fill", "yellow")
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.002).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
      }
      //节点描述
      let svg_text = svg
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .style("fill", "#000")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle") //在圆圈中加上数据
        .text(function (d) {
          return d.name;
        });

      //箭头
      svg
        .append("marker")
        .attr("id", "resolved")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", 34) //箭头坐标
        .attr("refY", -1)
        .attr("markerWidth", 12) //标识的大小
        .attr("markerHeight", 12)
        .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        .attr("stroke-width", 2) //箭头宽度
        .append("path")
        .attr("d", "M0,-5L10,0L0,5") //箭头的路径
        .attr("fill", "#000000"); //箭头颜色

      function draw() {
        svg_nodes
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          })
          .attr("role", function (d) {
            return d.role;
          });

        svg_text
          .attr("x", function (d) {
            return d.x;
          })
          .attr("y", function (d) {
            return d.y;
          });

        svg_links
          .attr("d", function (d) {
            return (
              "M " +
              d.source.x +
              " " +
              d.source.y +
              " L " +
              d.target.x +
              " " +
              d.target.y
            );
          })
          .attr("marker-end", "url(#resolved)");
      }
      simulation.on("tick", draw);
      svg
        .call(
          d3
            .zoom()
            .scaleExtent([0.05, 8])
            .on("zoom", () => {
              const transform = d3.event.transform;
              svg_nodes.attr("transform", transform);
              svg_links.attr("transform", transform);
              svg_text.attr("transform", transform);
            })
        )
        // .on("dblclick.zoom", null);
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
    border: 1px solid red;
  }
}
</style>
