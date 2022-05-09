import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, message } from 'antd';
import type { IFormSchema, NsGraph } from '@antv/xflow';
import {
  useXFlowApp,
  WorkspacePanel,
  MODELS,
  useModelAsync,
  FormBuilder,
} from '@antv/xflow';
import type { NsNodeCmd } from '@antv/xflow';
import { XFlowNodeCommands } from '@antv/xflow';
import { cloneDeep, set } from 'lodash';

// interface IFormValues {
//   id: string;
//   // label: string;
//   x: string;
//   y: string;
// }

// const formItems: IFormSchema[] = [
//   {
//     name: 'id',
//     label: 'id',
//     rules: [{ required: true }],
//     render: Input,
//     renderProps: { disabled: true },
//   },
//   // {
//   //   name: 'label',
//   //   label: 'label',
//   //   rules: [{ required: true }],
//   //   render: Input,
//   // },
//   {
//     name: 'x',
//     label: 'x',
//     rules: [{ required: true }],
//     render: InputNumber,
//   },
//   {
//     name: 'y',
//     label: 'y',
//     rules: [{ required: true }],
//     render: InputNumber,
//   },
// ];

// export const CmdForm = () => {
//   const app = useXFlowApp();
//   const [form] = Form.useForm<IFormValues>();
//   const [selectNode] = useModelAsync<MODELS.SELECTED_NODE.IState>({
//     getModel: async () => MODELS.SELECTED_NODE.getModel(app.modelService),
//     initialState: null,
//   });

//   React.useEffect(() => {
//     if (selectNode) {
//       const nodeConfig = selectNode.getData();
//       console.log(nodeConfig);
//       form.setFieldsValue({
//         id: nodeConfig.id,
//         // label: nodeConfig.label,
//         x: nodeConfig.x,
//         y: nodeConfig.y,
//       });
//     }
//   }, [form, selectNode]);

//   const onFinish = async (values: IFormValues) => {
//     const nodeConfig = selectNode.getData();
//     app.commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
//       XFlowNodeCommands.UPDATE_NODE.id,
//       {
//         nodeConfig: { ...nodeConfig, ...values },
//       },
//     );

//     message.success(`${XFlowNodeCommands.DEL_NODE.label}: 命令执行成功`);
//   };

//   return (
//     <FormBuilder<IFormValues>
//       form={form}
//       formItems={formItems}
//       onFinish={onFinish}
//       initialValues={{
//         id: null,
//         // label: null,
//         x: null,
//         y: null,
//       }}
//       submitButton={
//         <Button
//           type="primary"
//           htmlType="submit"
//           style={{ width: '100%' }}
//           disabled={!selectNode}
//         >
//           选中节点执行命令
//         </Button>
//       }
//     />
//   );
// };

const ConfigPanel: React.FC = () => {
  const app = useXFlowApp();
  const [nodeData, setNodeData] = useState<any>();
  const [selectNode] = useModelAsync<MODELS.SELECTED_NODE.IState>({
    // @ts-ignore
    getModel: async () => MODELS.SELECTED_NODE.getModel(app.modelService),
    initialState: null,
  });

  const resetNodeData = () => {
    if (selectNode) {
      // @ts-ignore
      const nodeConfig = selectNode.getData();
      console.log('nodeConfig', nodeConfig);
      setNodeData(nodeConfig);
    }
  };

  useEffect(() => {
    resetNodeData();
  }, [selectNode]);

  const saveData = (isData: boolean, key: string, value: any) => {
    if (isData) {
      // const nodeConfig = selectNode!.getData();
      const newNodeConfig = cloneDeep(nodeData);
      set(newNodeConfig.data, key, value);
      app.commandService
        .executeCommand<NsNodeCmd.UpdateNode.IArgs>(
          XFlowNodeCommands.UPDATE_NODE.id,
          {
            nodeConfig: newNodeConfig,
          },
        )
        .then(() => {
          resetNodeData();
        });
    } else {
      const newNodeConfig = cloneDeep(nodeData);
      set(newNodeConfig, key, value);
      app.commandService
        .executeCommand<NsNodeCmd.UpdateNode.IArgs>(
          XFlowNodeCommands.UPDATE_NODE.id,
          {
            nodeConfig: newNodeConfig,
          },
        )
        .then(() => {
          resetNodeData();
        });
    }
  };

  return (
    <div>
      <div>设置</div>
      {selectNode ? (
        <div>
          <div>
            <span>width</span>
            <InputNumber
              value={nodeData?.width}
              onChange={(value) => saveData(false, 'width', value)}
            />
          </div>
          <div>
            <span>height</span>
            <InputNumber
              value={nodeData?.height}
              onChange={(value) => saveData(false, 'height', value)}
            />
          </div>
          <div>
            <span>b</span>
            <Input
              value={nodeData?.data?.b}
              onChange={(e) => saveData(true, 'b', e.target.value)}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const FormPanel: React.FC = () => {
  // const app = useXFlowApp();
  // const [nodeData, setNodeData] = useState<any>();
  // const [selectNode] = useModelAsync<MODELS.SELECTED_NODE.IState>({
  //   getModel: async () => MODELS.SELECTED_NODE.getModel(app.modelService),
  //   initialState: null,
  // });

  // useEffect(() => {
  //   if (selectNode) {
  //     const nodeConfig = selectNode.getData();
  //     console.log('nodeConfig', nodeConfig);
  //     setNodeData(nodeConfig);
  //   }
  // }, [selectNode]);

  return (
    <WorkspacePanel
      position={{ top: 40, right: 0, bottom: 0, width: 290 }}
      className="panel"
    >
      <ConfigPanel />
    </WorkspacePanel>
  );
};

export default FormPanel;