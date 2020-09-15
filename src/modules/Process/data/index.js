
export const dataset = {
  nodes: [
    { id: 0, label: "开始0", shape: "circle" },
    { id: 1, label: "节点1", shape: "circle" },
    { id: 2, label: "节点2", shape: "circle" },
    { id: 3, label: "节点3", shape: "circle" },
    { id: 4, label: "节点4", shape: "circle" },
    { id: 5, label: "节点5", shape: "circle" },
    { id: 6, label: "节点6", shape: "circle" },
    { id: 7, label: "节点7", shape: "circle"},
    { id: 8, label: "结束8", shape: "circle", isEnd: true },
  ],
  // TODO: 待研究，排列顺序不一样可能会导致线段交叉，目前只能尝试交换顺序去解决
  // TODO: 结束节点的 rank 层级辨识度不太高，待解决
  edges: [
    { source: 0, target: 1, label: "流转1" },
    { source: 1, target: 2, label: "流转" },
    { source: 2, target: 3, label: "流转" },
    { source: 3, target: 5, label: "流转" },
    { source: 3, target: 4, label: "流转" },
    { source: 4, target: 5, label: "流转" },
    { source: 5, target: 6, label: "流转" },
    { source: 6, target: 7, label: "流转" },
    { source: 7, target: 8, label: "流转" },
    { source: 7, target: 4, label: "流转" },
  ],
}