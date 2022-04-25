export default [
  {
    path: '/404',
    exact: true,
    component: './404',
  },
  {
    path: '/',
    exact: true,
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // redirect: '/dashboard',
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: './home/dashboard',
        // name: '欢迎',
        // icon: 'home',
      },
      {
        path: '/page1',
        exact: true,
        component: './home/page1',
      },
      {
        path: '/page2',
        exact: true,
        component: './home/page2',
      },
      {
        path: '/page3',
        exact: true,
        component: './home/page3',
      },
      {
        path: '/roomAndCabinet',
        exact: true,
        redirect: '/roomAndCabinet/rooms',
      },
      {
        path: '/roomAndCabinet',
        routes: [
          {
            path: '/roomAndCabinet/rooms',
            exact: true,
            component: './room-and-cabinet/Rooms',
          },
          {
            path: '/roomAndCabinet/cabinets',
            exact: true,
            component: './room-and-cabinet/Cabinets',
          },
          { component: '@/pages/404' },
        ],
      },
      {
        path: '/rackEquipment',
        exact: true,
        component: './RackEquipment',
      },
      {
        path: '/spareParts',
        exact: true,
        component: './SpareParts',
      },
      {
        path: '/infrastructure',
        exact: true,
        component: './Infrastructure',
      },
      {
        path: '/assetInventory',
        exact: true,
        redirect: '/assetInventory/toDoInventory',
      },
      {
        path: '/assetInventory',
        routes: [
          {
            path: '/assetInventory/toDoInventory',
            exact: true,
            component: './assetInventory/ToDoInventory',
          },
          {
            path: '/assetInventory/inventoryRecord',
            exact: true,
            component: './assetInventory/InventoryRecord',
          },
          {
            path: '/assetInventory/inventoryPlan',
            exact: true,
            component: './assetInventory/InventoryPlan',
          },
          { component: '@/pages/404' },
        ],
      },
      {
        path: '/changeManagement',
        exact: true,
        component: './ChangeManagement',
        // access: 'canReadFoo',
      },
      { component: '@/pages/404' },
    ],
  },
];
