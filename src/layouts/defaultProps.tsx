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

/**
 * @deprecated 已废弃 导航栏直接读config/routes
 */
const route = {
  route: {
    path: '/',
    routes: [
      {
        path: '/dashboard',
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
        path: '/assetManagement',
        name: '资产管理',
        icon: IconMap.userSet,
        routes: [
          {
            path: '/assetManagement/rooms',
            name: '机房管理',
            icon: IconMap.userSet,
          },
          {
            path: '/assetManagement/cabinets',
            name: '机柜管理',
            icon: IconMap.userSet,
          },
          {
            path: '/assetManagement/rackEquipment',
            name: '机架设备',
            icon: IconMap.userSet,
          },
          {
            path: '/assetManagement/infrastructure',
            name: '基础设施',
            icon: IconMap.userSet,
          },
          {
            path: '/assetManagement/spareParts',
            name: '配件备件',
            icon: IconMap.userSet,
          },
        ],
      },
      {
        path: '/assetVisualization',
        name: '资产可视化',
        icon: IconMap.userSet,
        routes: [
          {
            path: '/assetVisualization/monitorView',
            name: '监视视图',
            icon: IconMap.userSet,
          },
          {
            path: '/assetVisualization/monitorSetting',
            name: '监视设置',
            icon: IconMap.userSet,
          },
        ],
      },
      {
        path: '/assetInventory',
        name: '资产盘点',
        icon: IconMap.userSet,
        routes: [
          {
            path: '/assetInventory/toDoInventory',
            name: '待办盘点',
            icon: IconMap.userSet,
          },
          {
            path: '/assetInventory/inventoryRecord',
            name: '盘点记录',
            icon: IconMap.userSet,
          },
          {
            path: '/assetInventory/inventoryPlan',
            name: '盘点计划',
            icon: IconMap.userSet,
          },
        ],
      },
      {
        path: '/assetChange',
        name: '资产变更',
        icon: IconMap.userSet,
        routes: [
          {
            path: '/assetChange/changeRecord',
            name: '变更记录',
            icon: IconMap.userSet,
          },
          {
            path: '/assetChange/processSetting',
            name: '流程设置',
            icon: IconMap.userSet,
          },
        ],
      },
      {
        path: '/capacityManagement',
        name: '容量管理',
        icon: IconMap.userSet,
        routes: [
          {
            path: '/capacityManagement/capacityPlanning',
            name: '容量规划',
            icon: IconMap.userSet,
          },
          {
            path: '/capacityManagement/capacitySetting',
            name: '容量设置',
            icon: IconMap.userSet,
          },
        ],
      },
    ],
  },
  location: {
    pathname: '',
  },
};

export default route;
