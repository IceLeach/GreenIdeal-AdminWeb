import React from 'react';
import Cabinet from './react-node/Cabinet';
import { DndNode } from './react-node/dnd-node';
import NodeText from './react-node/NodeText';

export const nodePanel = [
  {
    title: '设施',
    key: '1',
    nodes: [
      // {
      //   component: DndNode,
      //   popover: () => <div>自定义节点</div>,
      //   name: 'custom-node-indicator',
      //   width: 150,
      //   height: 130,
      //   label: '自定义节点',
      // },
      {
        component: Cabinet,
        popover: () => <div>机柜</div>,
        name: 'cabinet',
        ports: [],
        width: 80,
        height: 80,
      },
    ],
  },
  {
    title: '工具',
    key: '2',
    nodes: [
      {
        component: NodeText,
        popover: () => <div>文本</div>,
        name: 'text',
        ports: [],
        width: 70,
        height: 40,
        label: '文本',
      },
    ],
  },
];
