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
        ],
      },
      { component: '@/pages/404' },
    ],
  },
];
