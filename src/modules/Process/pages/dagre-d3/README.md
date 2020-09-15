
# 缩放和拖拽

```js
const zoom = d3.zoom()
  .on("zoom", function () {
      group.attr("transform", d3.event.transform);
  })
chart.call(zoom)
```

# drage-d3 render 之后居中图纸的方法

```js
const xCenterOffset = (chart.attr('width') - graph.graph().width) / 2
group.attr('transform', `translate(${xCenterOffset}, 20)`)
chart.attr('height', graph.graph().height + 40)
```

or

```js
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
```

# 参考

https://juejin.im/post/6844904185322815496

http://show.lookdaima.com/frames/dagre-d3-master/web/demo/

http://show.lookdaima.com/frames/dagre-d3-master/web/demo/style-attrs.html

http://show.lookdaima.com/frames/dagre-d3-master/web/demo/user-defined.html