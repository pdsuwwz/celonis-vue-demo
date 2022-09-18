仿照 Celonis 的核心模块做的，炒鸡炒鸡简单版的流程挖掘系统

<p>流程挖掘是一种分析业务流程的方法。</p>
<p>如当前业务的趋势、模式、走向等经历的详细过程，从这些过程中获得的见解可用于提高业务组织的效率和效力。</p>

__[💻 Live Demo 在线体验](https://pdsuwwz.github.io/celonis-vue-demo/#/process/dagre-d3/celonis-dagre-d3-live-demo)__

# 核心目录结构

src/modules/Process/* 模块中的 pages/ 下的 vue 文件即为路由

<pre>
<code>
├── api
│   └── index.js
├── components
│   └── index.vue
├── data
│   └── index.js
<strong>├── pages</strong>
<strong>│   ├── celonis-ball-demo.vue</strong>
<strong>│   ├── celonis-connect-demo.vue</strong>
<strong>│   ├── celonis-demo.vue</strong>
<strong>│   ├── celonis-flow-demo.vue</strong>
<strong>│   ├── celonis-move-demo.vue</strong>
<strong>│   ├── celonis-orient-demo.vue</strong>
<strong>│   └── dagre-d3</strong>
<strong>│       ├── README.md</strong>
<strong>│       ├── celonis-dagre-d3-demo.vue</strong>
<strong>│       ├── celonis-dagre-d3-flow-demo.vue</strong>
<strong>│       ├── celonis-dagre-d3-live-demo\ copy.vue</strong>
<strong>│       └── celonis-dagre-d3-live-demo.vue</strong>
└── store
    └── index.js
</code></pre>


# 本地 Demo 预览

* 请提前准备 yarn 和 node v12版本

1. 克隆本仓库 git clone
2. 安装依赖 yarn install
3. 启动服务 yarn serve
4. 访问 http://localhost:8080/

### 💡 提示
>
> * 默认访问 http://localhost:8080/ 应该会自动重定向到 http://localhost:8080/process/dagre-d3/celonis-dagre-d3-live-demo
>
> * 如果 8080 重定向没有生效请手动输入对应 url 访问页面
>
> * 项目路由是通过动态注册引入的，所以 router.js 文件中看不到实际的路由配置
>
> * 实际上的路由名取自 modules 模块下 pages 文件夹的 vue 文件名，如果想访问更多的 demo 页面, 请手动切换 vue 文件名对应的路由

# Demo 截图

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/19891724/189537599-15cf5f16-b5ba-4ebf-b9a1-02019a9d2948.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/19891724/189537505-58ff7916-7931-4bf1-a9d8-20d7c5b47842.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/19891724/189537545-e95c395e-d6f4-4995-ae77-5e7f7759bd6b.png">




以下是预想的全部功能及模块，暂时只实现最最核心的流程图的部分，这里基于 d3.js 和 dagre-d3.js 去画出流程图并通过 path 实现动画轨迹

# 预计整体结构

## 列表页
* 左侧导航
  * 工作空间
* 右侧预览区域
  * 对应空间所有流程

📈 左侧工作空间，针对多个不同的流程建立不同的 workspace, 右侧为每个 workspace 下的分析图表

## 详情页

* 左侧预览区域
  * 流程图
  * 缩放模块
  * 自适应模块
  * 维度工具
* 右侧菜单
  * 多维度选择流程图

# 技术栈

Vue, Vuex, SVG, D3.js

# 技术难点

* svg 流程图（一维，二维，多维层级）
* 窗口响应式
* 图标的响应式，缩放
* 拖拽

# 核心流程图模块
* 点
* 线
* 面

# 组件模块

## 列表页
* 导航组件
* 卡片组件
* 预览组件
* 大布局组件

## 详情页

* 流程图区域组件（？需要含有缩放功能）

* 流程点组件
* 流程点 tip 组件
* 流程线组件
* 流程线依赖组件
* 流程运转动效组件
* 流程点组合组件

* 拖拽组件
