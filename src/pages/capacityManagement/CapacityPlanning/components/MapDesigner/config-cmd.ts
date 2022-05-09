import { createCmdConfig, DisposableCollection, uuidv4 } from '@antv/xflow';

const defaultNodeData = [{ name: 'cabinet', data: { a: 0, b: '0' } }];

export const useCmdConfig = createCmdConfig((config) => {
  config.setRegisterHookFn((hooks) => {
    const list = [
      hooks.addNode.registerHook({
        name: 'set node config',
        handler: async (args) => {
          console.log('args', args);
          args.nodeConfig = {
            ...args.nodeConfig,
            data:
              args.nodeConfig.data ||
              defaultNodeData.find((node) => node.name === args.nodeConfig.name)
                ?.data ||
              {},
            id: args.nodeConfig.id || `node-${uuidv4()}`,
          };
        },
      }),
    ];
    const toDispose = new DisposableCollection();
    toDispose.pushAll(list);
    return toDispose;
  });
});
