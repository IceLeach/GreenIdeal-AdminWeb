import React from 'react';
import {
  HomeOutlined,
  HistoryOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const IconMap = {
  home: <HomeOutlined />,
  history: <HistoryOutlined />,
  userSet: <SettingOutlined />,
};
export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/dashboard',
        exact: true,
        name: '欢迎',
        icon: IconMap.home,
      },
      {
        path: '/page1',
        exact: true,
        name: '展示页',
        icon: IconMap.history,
      },
      {
        path: '/roomAndCabinet',
        name: '机房机柜',
        icon: IconMap.userSet,
        routes: [
          {
            path: '/roomAndCabinet/rooms',
            exact: true,
            name: '机房管理',
            icon: IconMap.userSet,
          },
          {
            path: '/roomAndCabinet/cabinets',
            exact: true,
            name: '机柜管理',
            icon: IconMap.userSet,
          },
        ],
      },
      {
        path: '/rackEquipment',
        exact: true,
        name: '机架设备',
        icon: IconMap.userSet,
      },
      {
        path: '/spareParts',
        exact: true,
        name: '配件备件',
        icon: IconMap.userSet,
      },
      {
        path: '/infrastructure',
        exact: true,
        name: '基础设施',
        icon: IconMap.userSet,
      },
      {
        path: '/assetInventory',
        name: '资产盘点',
        icon: IconMap.userSet,
        routes: [
          {
            path: '/assetInventory/toDoInventory',
            exact: true,
            name: '待办盘点',
            icon: IconMap.userSet,
          },
          {
            path: '/assetInventory/inventoryRecord',
            exact: true,
            name: '盘点记录',
            icon: IconMap.userSet,
          },
          {
            path: '/assetInventory/inventoryPlan',
            exact: true,
            name: '盘点计划',
            icon: IconMap.userSet,
          },
        ],
      },
      {
        path: '/changeManagement',
        exact: true,
        name: '变更管理',
        icon: IconMap.userSet,
      },
      {
        path: '/capacityManagement',
        name: '容量管理',
        icon: IconMap.userSet,
        routes: [
          {
            path: '/capacityManagement/capacityPlanning',
            exact: true,
            name: '容量规划',
            icon: IconMap.userSet,
          },
        ],
      },
      // {
      //   path: '/page2',
      //   name: 'mxgraph',
      //   icon: IconMap.userSet,
      // },
      // {
      //   path: '/page3',
      //   name: 'Html Page',
      //   icon: IconMap.userSet,
      // },
    ],
  },
  location: {
    pathname: '',
  },
};
