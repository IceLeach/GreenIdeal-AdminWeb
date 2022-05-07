import type { NsNodeCollapsePanel } from '@antv/xflow';
import React from 'react';
import { XFlowConstants } from '@antv/xflow';
import type { NsNodeCmd, IGraphCommandService, NsGraph } from '@antv/xflow';
import { XFlowNodeCommands, uuidv4 } from '@antv/xflow';
// import * as commandUtils from './comannd-utils'

const addNode = (
  cmd: IGraphCommandService,
  nodeConfig: NsGraph.INodeConfig,
) => {
  return cmd.executeCommand<NsNodeCmd.AddNode.IArgs>(
    XFlowNodeCommands.ADD_NODE.id,
    {
      nodeConfig: { ...nodeConfig, id: uuidv4() },
    },
  );
};

export const DND_RENDER_ID = 'DND_RENDER_ID';

export const onNodeDrop: NsNodeCollapsePanel.IOnNodeDrop = async (
  nodeConfig,
  commandService,
) => {
  console.log('drop', nodeConfig);
  addNode(commandService, nodeConfig);
};

export const nodeDataService: NsNodeCollapsePanel.INodeDataService = async (
  meta,
  modelService,
) => {
  // console.log('meta', meta, modelService);
  return [
    {
      id: '自定义组件',
      header: '自定义组件',
      children: [
        {
          id: 'cabinet',
          // label: 'cabinet',
          renderKey: 'CABINET',
          width: 60,
          height: 30,
          popoverContent: <div> 机柜 </div>,
        },
      ],
    },
    // {
    //   id: '数据读写',
    //   header: '数据读写',
    //   isCollapsed: false,
    //   // collapsible: false,
    //   children: [
    //     {
    //       id: '2',
    //       label: '算法组件1',
    //       // renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
    //       renderKey: 'MYNODE',
    //       popoverContent: <div> 算法组件1的描述 </div>,
    //     },
    //     {
    //       id: '3',
    //       label: '算法组件2',
    //       renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
    //       popoverContent: <div> 算法组件2的描述 </div>,
    //     },
    //     {
    //       id: '4',
    //       label: '算法组件3',
    //       renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
    //       popoverContent: <div> 算法组件3的描述 </div>,
    //     },
    //   ],
    // },
    // {
    //   id: '数据加工',
    //   header: '数据加工',
    //   isCollapsed: false,
    //   children: [
    //     {
    //       id: '6',
    //       label: '算法组件4',
    //       parentId: '5',
    //       renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
    //     },
    //     {
    //       id: '7',
    //       label: '算法组件5',
    //       parentId: '5',
    //       renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
    //     },
    //     {
    //       id: '8',
    //       label: '算法组件6',
    //       parentId: '5',
    //       renderKey: XFlowConstants.XFLOW_DEFAULT_NODE,
    //     },
    //   ],
    // },
  ];
};
