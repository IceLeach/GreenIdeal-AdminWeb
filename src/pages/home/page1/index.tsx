import React, { useEffect, useState } from 'react';
/** 图核心组件 & 类型定义 */
import {
  CanvasToolbar,
  createToolbarConfig,
  IAppLoad,
  IconStore,
  IToolbarItemOptions,
  JsonSchemaForm,
  NodeCollapsePanel,
  NsGraph,
  NsGraphCmd,
  NsJsonSchemaForm,
  NsNodeCmd,
  XFlowGraphCommands,
  XFlowNodeCommands,
} from '@antv/xflow';
import { XFlow, XFlowCanvas } from '@antv/xflow';
/** 图的各种扩展交互组件 */
import { CanvasMiniMap, CanvasScaleToolbar, CanvasSnapline } from '@antv/xflow';
/** 图的配置项 */
import { useGraphConfig } from './config-graph';
import { Button, message } from 'antd';
import * as panelConfig from './dnd-panel-config';
import { set } from 'lodash';

import './index.less';
import '@antv/xflow/dist/index.css';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import DragItem from '@/components/DragItem';

export interface IProps {}

namespace NsJsonForm {
  /** ControlShape的Enum */
  const { ControlShape } = NsJsonSchemaForm;

  /** 保存form的values */
  export const formValueUpdateService: NsJsonSchemaForm.IFormValueUpdateService =
    async (args) => {
      console.log('update', args);
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
        // set(nodeConfig, val.name, val.value);
        set(nodeConfig.data, val.name, val.value);
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

    if (targetData.renderKey === 'MYNODE') {
      return {
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
                    name: 'p',
                    label: 'Data',
                    shape: ControlShape.INPUT,
                    value: targetData.data.p,
                  },
                  {
                    name: 'z',
                    label: 'Data',
                    shape: ControlShape.INPUT,
                    value: targetData.data.z,
                  },
                ],
              },
            ],
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

namespace NsConfig {
  /** 注册icon 类型 */
  IconStore.set('PlusCircleOutlined', PlusCircleOutlined);
  IconStore.set('DeleteOutlined', DeleteOutlined);
  IconStore.set('SaveOutlined', SaveOutlined);
  /** nodeId */
  let id = 1;
  /** 获取toobar配置项 */
  export const getToolbarItems = async () => {
    const toolbarGroup2: IToolbarItemOptions[] = [];

    /** 保存数据 */
    toolbarGroup2.push({
      id: XFlowGraphCommands.SAVE_GRAPH_DATA.id,
      iconName: 'SaveOutlined',
      tooltip: '保存数据',
      onClick: async ({ commandService }) => {
        commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
          XFlowGraphCommands.SAVE_GRAPH_DATA.id,
          {
            saveGraphDataService: async (meta, data) => {
              console.log(data);
              message.success('nodes count:' + data.nodes.length);
            },
          },
        );
      },
    });

    return [{ name: 'graphGroup', items: toolbarGroup2 }];
  };
}

const useToolbarConfig = createToolbarConfig((toolbarConfig) => {
  /** 生产 toolbar item */
  toolbarConfig.setToolbarModelService(async (toolbarModel) => {
    const toolbarItems = await NsConfig.getToolbarItems();
    toolbarModel.setValue((toolbar) => {
      toolbar.mainGroups = toolbarItems;
    });
  });
});

const Demo: React.FC<IProps> = () => {
  const toolbarConfig = useToolbarConfig();
  /** 画布配置 */
  const graphConfig = useGraphConfig();

  /** 画布渲染数据 */
  // const [graphData, setGraphData] = useState<NsGraph.IGraphData>()

  /** XFlow初始化完成的回调 */
  const onLoad: IAppLoad = async (app) => {
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node1',
        x: 750,
        y: 250,
        label: 'Hello World 1',
        renderKey: 'MYNODE',
        data: { p: '1', z: '2' },
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
    <div style={{ height: 800, background: '#fff' }}>
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
          <CanvasToolbar
            layout="horizontal"
            config={toolbarConfig}
            position={{ top: 0, left: 0, right: 0, height: 40 }}
          />
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

const Page1 = () => {
  const [activeKey, setActiveKey] = useState<string>('0');
  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={() => {
            if (activeKey === '1') setActiveKey('0');
          }}
        >
          XFlow
        </Button>
        <Button
          type="primary"
          onClick={() => {
            if (activeKey === '0') setActiveKey('1');
          }}
        >
          上架
        </Button>
      </div>
      {activeKey === '0' ? (
        <Demo />
      ) : (
        <div>
          <DragItem />
        </div>
      )}
    </>
  );
};

export default Page1;
