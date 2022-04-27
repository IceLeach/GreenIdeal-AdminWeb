import React, { useEffect, useState } from 'react';
/** 图核心组件 & 类型定义 */
import {
  IAppLoad,
  JsonSchemaForm,
  NodeCollapsePanel,
  NsGraph,
  NsJsonSchemaForm,
  NsNodeCmd,
  XFlowNodeCommands,
} from '@antv/xflow';
import { XFlow, XFlowCanvas } from '@antv/xflow';
/** 图的各种扩展交互组件 */
import { CanvasMiniMap, CanvasScaleToolbar, CanvasSnapline } from '@antv/xflow';
/** 图的配置项 */
import { useGraphConfig } from './config-graph';
import { message } from 'antd';
import * as panelConfig from './dnd-panel-config';
import { set } from 'lodash';

import './index.less';
import '@antv/xflow/dist/index.css';

export interface IProps {}

namespace NsJsonForm {
  /** ControlShape的Enum */
  const { ControlShape } = NsJsonSchemaForm;

  /** 保存form的values */
  export const formValueUpdateService: NsJsonSchemaForm.IFormValueUpdateService =
    async (args) => {
      const { values, commandService, targetData } = args;
      const updateNode = (node: NsGraph.INodeConfig) => {
        return commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
          XFlowNodeCommands.UPDATE_NODE.id,
          { nodeConfig: node },
        );
      };
      console.log('formValueUpdateService  values:', values, args);
      // @ts-ignore
      const nodeConfig: NsGraph.INodeConfig = {
        ...targetData,
      };
      values.forEach((val) => {
        set(nodeConfig, val.name, val.value);
      });
      updateNode(nodeConfig);
    };

  /** 根据选中的节点更新formSchema */
  export const formSchemaService: NsJsonSchemaForm.IFormSchemaService = async (
    args,
  ) => {
    const { targetData } = args;
    console.log(`formSchemaService args:`, args);
    if (!targetData) {
      return {
        tabs: [
          {
            /** Tab的title */
            name: '画布配置',
            groups: [],
          },
        ],
      };
    }

    return {
      /** 配置一个Tab */
      tabs: [
        {
          /** Tab的title */
          name: '节点配置',
          groups: [
            {
              name: 'group1',
              controls: [
                {
                  name: 'label',
                  label: '节点Label',
                  shape: ControlShape.INPUT,
                  value: targetData.label,
                },
                {
                  name: 'x',
                  label: 'x',
                  shape: ControlShape.FLOAT,
                  value: targetData.x,
                },
                {
                  name: 'y',
                  label: 'y',
                  shape: ControlShape.FLOAT,
                  value: targetData.y,
                },
              ],
            },
          ],
        },
      ],
    };
  };
}

const Demo: React.FC<IProps> = () => {
  /** 画布配置 */
  const graphConfig = useGraphConfig();

  /** 画布渲染数据 */
  // const [graphData, setGraphData] = useState<NsGraph.IGraphData>()

  /** XFlow初始化完成的回调 */
  const onLoad: IAppLoad = async (app) => {
    // const nodes: NsGraph.INodeConfig[] = [
    //   { id: 'root1', width: 150, height: 40, renderKey: 'NODE1', info: { text: 'root1', x: 50, y: 100 } },
    //   { id: 'down1', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down1' } },
    //   { id: 'down2', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down2' } },
    //   { id: 'down3', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down3' } },
    //   // { id: 'mynode', renderKey: 'MYNODE', label: 'MyNode', info: { text: 'down3' }, x: 200 },
    // ]
    // const newGraphData = { nodes, edges: [] }
    // setGraphData(newGraphData)

    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node1',
        x: 750,
        y: 250,
        label: 'Hello World 1',
        renderKey: 'MYNODE',
        data: { p: 1, z: 2 },
        // width,
        // height,
      },
    });

    const graph = await app.getGraphInstance();
    graph.on('node:click', ({ node }) => {
      const nodeData: NsGraph.INodeConfig = node.getData();
      message.success(`${nodeData.id}节点被点击了`);
    });
  };

  return (
    <div style={{ height: 700 }}>
      <XFlow
        className="xflow-user-container"
        // graphData={graphData}
        // graphLayout={{
        //   layoutType: 'dagre',
        //   layoutOptions: {
        //     type: 'dagre',
        //     rankdir: 'TB',
        //     nodesep: 60,
        //     ranksep: 40,
        //   },
        // }}
        onLoad={onLoad}
        isAutoCenter={true}
      >
        <NodeCollapsePanel
          header={<h4 className="dnd-panel-header"> 组件面板 </h4>}
          footer={<div> Foorter </div>}
          onNodeDrop={panelConfig.onNodeDrop}
          nodeDataService={panelConfig.nodeDataService}
          position={{ top: 0, bottom: 0, left: 0, width: 290 }}
        />
        <XFlowCanvas config={graphConfig}>
          <CanvasScaleToolbar position={{ top: 12, left: 312 }} />
          {/* <CanvasMiniMap
            miniMapClz="xflow-custom-minimap"
            nodeFillColor="#ccc"
            minimapOptions={{
              width: 200,
              height: 120,
            }}
            position={{ top: 12, right: 312 }}
          /> */}
          <CanvasSnapline color="#1890ff" />
        </XFlowCanvas>
        <JsonSchemaForm
          formSchemaService={NsJsonForm.formSchemaService}
          formValueUpdateService={NsJsonForm.formValueUpdateService}
          position={{ top: 0, bottom: 0, right: 0, width: 290 }}
        />
      </XFlow>
    </div>
  );
};

export default Demo;
