import React from 'react';
import {
  HomeOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  CloudUploadOutlined,
  ProfileOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const IconMap = {
  home: <HomeOutlined />,
  history: <HistoryOutlined />,
  unfinished: <QuestionCircleOutlined />,
  release: <CloudUploadOutlined />,
  template: <ProfileOutlined />,
  user: <TeamOutlined />,
  adminSet: <SettingOutlined />,
  userSet: <SettingOutlined />,
};
export default {
  route: {
    path: '/',
    name: 'Blanc',
    routes: [
      {
        path: '/dashboard',
        exact: true,
        name: '欢迎',
        icon: IconMap.home
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
          }
        ],
      }
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
