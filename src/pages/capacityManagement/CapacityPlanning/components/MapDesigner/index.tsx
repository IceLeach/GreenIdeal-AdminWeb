import React, { useRef } from 'react';
/** 图核心组件 & 类型定义 */
import {
  CanvasContextMenu,
  CanvasNodePortTooltip,
  CanvasToolbar,
  createToolbarConfig,
  FlowchartCanvas,
  FlowchartExtension,
  FlowchartFormPanel,
  FlowchartNodePanel,
  IAppLoad,
  IconStore,
  IGraphCommandService,
  IModelService,
  IToolbarItemOptions,
  JsonSchemaForm,
  KeyBindings,
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
import { message } from 'antd';
import * as panelConfig from './dnd-panel-config';
import { cloneDeep, set } from 'lodash';

import '@antv/xflow/dist/index.css';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { controlMapService, ControlShapeEnum } from './custom-shapes';

import styles from './index.less';
import FormPanel from './FormPanel';
import { Cell, Graph } from '@antv/x6';
import { useCmdConfig } from './config-cmd';
import { DndNode } from './react-node/dnd-node';
import { useMenuConfig } from './config-menu';
import { useKeybindingConfig } from './config-keybinding';
import { useToolbarConfig } from './config-toolbar';
import 'antd/lib/collapse/style/index';
import { nodePanel } from './node-panel-config';

export interface IProps {}

const originFormData = ['width', 'height'];

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
      // const nodeConfig: NsGraph.INodeConfig = {
      //   ...targetData,
      // };
      const nodeConfig: NsGraph.INodeConfig = cloneDeep(targetData);
      values.forEach((val) => {
        // set(nodeConfig, val.name, val.value);
        // if (originFormData.includes(val.name[0])) {
        set(nodeConfig, val.name, val.value);
        // } else {
        //   set(nodeConfig.data, val.name, val.value);
        // }
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

    if (targetData.renderKey === 'CABINET') {
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
                    name: 'width',
                    label: '宽度',
                    shape: ControlShapeEnum.INPUTNUMBER,
                    value: targetData.width,
                  },
                  {
                    name: 'height',
                    label: '高度',
                    shape: ControlShapeEnum.INPUTNUMBER,
                    value: targetData.height,
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

const formSchemaService: (args: {
  cell: Cell;
  targetType: NsJsonSchemaForm.TargetType;
  targetData: NsJsonSchemaForm.TargetData;
  modelService: IModelService;
  commandService: IGraphCommandService;
}) => Promise<NsJsonSchemaForm.ISchema> = async (args) => {
  const { targetType } = args;
  const isGroup = args.targetData?.isGroup;
  const nodeSchema = {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '节点名',
                name: '自定义form',
                shape: 'rename-service',
              },
            ],
          },
        ],
      },
    ],
  };
  if (isGroup) {
    // TODO
  }
  if (targetType === 'edge') {
    // TODO
  }
  if (targetType === 'node') {
    return nodeSchema;
  }
  return {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '',
                name: 'canvas-service',
                shape: 'canvas-service',
              },
            ],
          },
        ],
      },
    ],
  };
};

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
              console.log('save', data);
              message.success('nodes count:' + data.nodes.length);
            },
          },
        );
      },
    });

    return [{ name: 'graphGroup', items: toolbarGroup2 }];
  };
}

// const useToolbarConfig = createToolbarConfig((toolbarConfig) => {
//   /** 生产 toolbar item */
//   toolbarConfig.setToolbarModelService(async (toolbarModel) => {
//     const toolbarItems = await NsConfig.getToolbarItems();
//     toolbarModel.setValue((toolbar) => {
//       toolbar.mainGroups = toolbarItems;
//     });
//   });
// });

const MapDesigner: React.FC = () => {
  const toolbarConfig = useToolbarConfig();
  /** 画布配置 */
  const graphConfig = useGraphConfig();

  const commandConfig = useCmdConfig();
  const menuConfig = useMenuConfig();
  const keybindingConfig = useKeybindingConfig();

  const graphRef = useRef<Graph>();

  /** 画布渲染数据 */
  // const [graphData, setGraphData] = useState<NsGraph.IGraphData>()

  /** XFlow初始化完成的回调 */
  const onLoad: IAppLoad = async (app) => {
    // app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
    //   nodeConfig: {
    //     id: 'node1',
    //     x: 450,
    //     y: 250,
    //     label: 'Hello World 1',
    //     renderKey: 'MYNODE',
    //     data: { p: '1', z: '2' },
    //     // width,
    //     // height,
    //   },
    // });
    app.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
      nodeConfig: {
        id: 'node-678e6110-fe81-41b2-8f8c-c5ab06c399ce',
        x: 230,
        y: 230,
        zIndex: 10,
        renderKey: 'cabinet',
        label: '',
        isCustom: true,
        data: { a: 1, b: '2' },
        width: 40,
        height: 40,
        name: 'cabinet',
      },
    });

    // const graph = await app.getGraphInstance();
    // graph.on('node:click', ({ node }) => {
    //   const nodeData: NsGraph.INodeConfig = node.getData();
    //   message.success(`${nodeData.id}节点被点击了`);
    // });
    graphRef.current = await app.getGraphInstance();
  };

  return (
    <div style={{ height: '100%' }}>
      <XFlow
        className={styles.userContainer}
        commandConfig={commandConfig}
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
        <FlowchartExtension />
        <FlowchartNodePanel
          showOfficial={false}
          // @ts-ignore
          registerNode={nodePanel}
          position={{ width: 290, top: 40, bottom: 0, left: 0 }}
        />
        <CanvasToolbar
          className="xflow-workspace-toolbar-top"
          layout="horizontal"
          config={toolbarConfig}
          position={{ top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <FlowchartCanvas position={{ top: 40, left: 0, right: 0, bottom: 0 }}>
          <CanvasScaleToolbar
            layout="horizontal"
            position={{ top: -40, right: 0 }}
            style={{
              width: 150,
              left: 'auto',
              height: 39,
            }}
          />
          <CanvasContextMenu config={menuConfig} />
          <CanvasSnapline color="#faad14" />
          <CanvasNodePortTooltip />
        </FlowchartCanvas>
        <FormPanel />
        {/* <FlowchartFormPanel
          show={true}
          position={{ width: 290, top: 40, bottom: 0, right: 0 }}
        // controlMapService={controlMapService}
        // formSchemaService={NsJsonForm.formSchemaService}
        /> */}
        <KeyBindings config={keybindingConfig} />
        {/* <NodeCollapsePanel
          header={<div> 组件面板 </div>}
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
          <CanvasScaleToolbar position={{ top: 48, left: 12 }} /> */}
        {/* <CanvasMiniMap
            miniMapClz="xflow-custom-minimap"
            nodeFillColor="#ccc"
            minimapOptions={{
              width: 200,
              height: 120,
            }}
            position={{ top: 12, right: 312 }}
          /> */}
        {/* <CanvasSnapline color="#1890ff" />
        </XFlowCanvas>
        <FormPanel /> */}
        {/* <JsonSchemaForm
          controlMapService={controlMapService}
          formSchemaService={NsJsonForm.formSchemaService}
          formValueUpdateService={NsJsonForm.formValueUpdateService}
          position={{ top: 0, bottom: 0, right: 0, width: 290 }}
        /> */}
      </XFlow>
    </div>
  );
};

export default MapDesigner;
