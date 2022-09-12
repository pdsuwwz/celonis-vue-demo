const LayoutWorkspace = () => import('@/components/Layout/LayoutWorkspace')
const LayoutSvg = () => import('@/components/Layout/LayoutSvg')
const Layout = () => import('@/components/Layout/Layout')

function importModule (filePath) {
  return () => import(/* webpackChunkName: "[index].page" */ `@/modules/${filePath}`)
}


function getSvgPageList() {
  const svgFileList = require.context('@/modules/SvgDemo/pages', true, /\.vue$/)
  return svgFileList.keys().map((path) => {
    path = path.replace(/(\.\/|\.vue)/g, '')
    return {
      path,
      name: `/svg-demo/${path}`,
      component: importModule(`SvgDemo/pages/${path}`),
      meta: {
        title: 'Svg demo',
      }
    }
  })
}

function getD3ProcessList() {
  const svgFileList = require.context('@/modules/Process/pages', true, /\.vue$/)
  return svgFileList.keys().map((path) => {
    path = path.replace(/(\.\/|\.vue)/g, '')
    return {
      path,
      name: `/process/${path}`,
      component: importModule(`Process/pages/${path}`),
      meta: {
        title: 'Process',
      }
    }
  })
}

const routes = [
  {
    path: '/',
    title: 'Dashboard',
    icon: 'tachometer-alt',
    redirect: '/process/dagre-d3/celonis-dagre-d3-live-demo'
  },
  {
    path: '/process',
    name: 'CelonisDemo',
    component: Layout,
    meta: {
      title: 'Celonis'
    },
    children: getD3ProcessList()
  },
  {
    path: '/svg-demo',
    component: LayoutSvg,
    name: 'SvgDemo',
    redirect: 'noredirect',
    meta: {
      title: 'SvgDemo'
    },
    children: getSvgPageList()
  },
  {
    path: '/process-mining',
    component: LayoutWorkspace,
    name: 'Workspace',
    redirect: 'noredirect',
    meta: {
      title: '工作空间管理'
    },
    children: [
      {
        path: 'workspaces',
        name: 'workspacesList',
        component: importModule('Workspace/pages/workspacesList'),
        meta: {
          title: '工作空间列表',
          permissionName: ''
        }
      },
      {
        path: 'workspaces/:workspacesId/edit',
        name: 'workspacesEdit',
        component: importModule('Workspace/pages/workspacesEdit'),
        meta: {
          title: '工作空间编辑',
          icon: 'table',
          permissionName: ''
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export default routes
