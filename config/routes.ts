export default [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/dashboard',
        component: './home/dashboard',
        name: '欢迎',
        icon: 'home',
      },
      {
        path: '/page1',
        exact: true,
        component: './home/page1',
        name: '展示页',
        icon: 'history',
      },
      {
        path: '/assetManagement',
        redirect: '/assetManagement/rooms',
      },
      {
        path: '/assetManagement',
        name: '资产管理',
        icon: 'setting',
        routes: [
          {
            path: '/assetManagement/rooms',
            component: './assetManagement/Rooms',
            name: '机房管理',
          },
          {
            path: '/assetManagement/cabinets',
            component: './assetManagement/Cabinets',
            name: '机柜管理',
          },
          {
            path: '/assetManagement/rackEquipment',
            component: './assetManagement/RackEquipment',
            name: '机架设备',
          },
          {
            path: '/assetManagement/infrastructure',
            component: './assetManagement/Infrastructure',
            name: '基础设施',
          },
          {
            path: '/assetManagement/spareParts',
            component: './assetManagement/SpareParts',
            name: '配件备件',
          },
          { component: './404' },
        ],
      },
      {
        path: '/assetVisualization',
        redirect: '/assetVisualization/monitorView',
      },
      {
        path: '/assetVisualization',
        name: '资产可视化',
        icon: 'setting',
        routes: [
          {
            path: '/assetVisualization/monitorView',
            // component: '',
            name: '监视视图',
          },
          {
            path: '/assetVisualization/monitorSetting',
            // component: '',
            name: '监视设置',
          },
          { component: './404' },
        ],
      },
      {
        path: '/assetInventory',
        redirect: '/assetInventory/toDoInventory',
      },
      {
        path: '/assetInventory',
        name: '资产盘点',
        icon: 'setting',
        routes: [
          {
            path: '/assetInventory/toDoInventory',
            component: './assetInventory/ToDoInventory',
            name: '待办盘点',
          },
          {
            path: '/assetInventory/inventoryRecord',
            component: './assetInventory/InventoryRecord',
            name: '盘点记录',
          },
          {
            path: '/assetInventory/inventoryPlan',
            component: './assetInventory/InventoryPlan',
            name: '盘点计划',
          },
          { component: './404' },
        ],
      },
      {
        path: '/assetChange',
        redirect: '/assetChange/changeRecord',
      },
      {
        path: '/assetChange',
        name: '资产变更',
        icon: 'setting',
        routes: [
          {
            path: '/assetChange/changeRecord',
            component: './assetChange/ChangeRecord',
            name: '变更记录',
          },
          {
            path: '/assetChange/processSetting',
            // component: '',
            name: '流程设置',
          },
          { component: './404' },
        ],
      },
      {
        path: '/capacityManagement',
        redirect: '/capacityManagement/capacityPlanning',
      },
      {
        path: '/capacityManagement',
        name: '容量管理',
        icon: 'setting',
        routes: [
          {
            path: '/capacityManagement/capacityPlanning',
            component: './capacityManagement/CapacityPlanning',
            name: '容量规划',
          },
          {
            path: '/capacityManagement/capacitySetting',
            // component: '',
            name: '容量设置',
          },
          { component: './404' },
        ],
      },
      {
        path: '/reportManagement',
        redirect: '/reportManagement/assetReport',
      },
      {
        path: '/reportManagement',
        name: '报表管理',
        icon: 'setting',
        routes: [
          {
            path: '/reportManagement/assetReport',
            // component: '',
            name: '资产报表',
          },
          {
            path: '/reportManagement/capacityReport',
            // component: '',
            name: '容量报表',
          },
          {
            path: '/reportManagement/reportSetting',
            // component: '',
            name: '报表设置',
          },
          { component: './404' },
        ],
      },
      {
        path: '/systemManagement',
        redirect: '/systemManagement/userManagement',
      },
      {
        path: '/systemManagement',
        name: '系统管理',
        icon: 'setting',
        routes: [
          {
            path: '/systemManagement/userManagement',
            // component: '',
            name: '用户管理',
          },
          {
            path: '/systemManagement/roleManagement',
            // component: '',
            name: '角色管理',
          },
          {
            path: '/systemManagement/authorityManagement',
            // component: '',
            name: '权限管理',
          },
          {
            path: '/systemManagement/configurationManagement',
            // component: '',
            name: '配置管理',
          },
          {
            path: '/systemManagement/enumerationManagement',
            // component: '',
            name: '枚举管理',
          },
          { component: './404' },
        ],
      },
      { component: './404' },
    ],
  },
];
