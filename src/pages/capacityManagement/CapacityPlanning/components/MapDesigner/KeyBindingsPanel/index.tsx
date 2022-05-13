import React from 'react';
import {
  createKeybindingConfig,
  KeyBindings,
  MODELS,
  NsGraphCmd,
  NsNodeCmd,
  XFlowGraphCommands,
  XFlowNodeCommands,
} from '@antv/xflow';
import { Graph } from '@antv/x6';
import { HistoryData } from '..';
import { FormPanelRefType } from '../FormPanel';

interface KeyBindingsPanelProps {
  historyRef: React.MutableRefObject<HistoryData | undefined>;
  isHistoryActionRef: React.MutableRefObject<boolean>;
  graphRef: React.MutableRefObject<Graph | undefined>;
  formPanelRef: React.MutableRefObject<FormPanelRefType>;
}

const KeyBindingsPanel: React.FC<KeyBindingsPanelProps> = (props) => {
  const { historyRef, isHistoryActionRef, graphRef, formPanelRef } = props;

  const useKeybindingConfig = createKeybindingConfig((config) => {
    config.setKeybindingFunc((regsitry) => {
      return regsitry.registerKeybinding([
        {
          id: 'delete node or edge',
          keybinding: 'backspace',
          callback: async function (item, modelService, cmd, e) {
            const cells = await MODELS.SELECTED_CELLS.useValue(modelService);
            cells.map((cell) => {
              if (cell.isNode()) {
                return cmd.executeCommand<NsNodeCmd.DelNode.IArgs>(
                  XFlowNodeCommands.DEL_NODE.id,
                  {
                    nodeConfig: {
                      ...cell.getData(),
                      id: cell.id,
                    },
                  },
                );
              }
              // if (cell.isEdge()) {
              //   return cmd.executeCommand<NsEdgeCmd.DelEdge.IArgs>(
              //     XFlowEdgeCommands.DEL_EDGE.id,
              //     {
              //       edgeConfig: { ...cell.getData(), id: cell.id },
              //     },
              //   );
              // }
            });
          },
        },
        {
          id: 'copy',
          keybinding: ['command+c', 'ctrl+c'],
          callback: async function (item, modelService, cmd, e) {
            e.preventDefault();
            // const data = formPanelRef.current.selectNode.getData();
            // console.log(item, data);
            // const cell = graphRef.current?.getCellById(data.id);
            // if (cell) {
            //   graphRef.current?.copy([cell]);
            // }
            cmd.executeCommand<NsGraphCmd.GraphCopySelection.IArgs>(
              XFlowGraphCommands.GRAPH_COPY.id,
              {},
            );
          },
        },
        {
          id: 'paste',
          keybinding: ['command+v', 'ctrl+v'],
          callback: async function (item, ctx, cmd, e) {
            e.preventDefault();
            // graphRef.current?.paste({}, graphRef.current);
            cmd.executeCommand<NsGraphCmd.GraphPasteSelection.IArgs>(
              XFlowGraphCommands.GRAPH_PASTE.id,
              {},
            );
          },
        },
        {
          id: 'undo',
          keybinding: ['meta+z', 'ctrl+z'],
          callback: async function (item, ctx, cmd, e) {
            e.preventDefault();
            if (historyRef.current) {
              console.log('canUndo', historyRef.current.undoLength);
              if (historyRef.current.undoLength) {
                isHistoryActionRef.current = true;
                historyRef.current.undoFn();
              }
            }
          },
        },
        {
          id: 'redo',
          keybinding: ['meta+y', 'ctrl+y'],
          callback: async function (item, ctx, cmd, e) {
            e.preventDefault();
            if (historyRef.current) {
              console.log('canRedo', historyRef.current.redoLength);
              if (historyRef.current.redoLength) {
                isHistoryActionRef.current = true;
                historyRef.current.redoFn();
              }
            }
          },
        },
      ]);
    });
  });
  const keybindingConfig = useKeybindingConfig();

  return <KeyBindings config={keybindingConfig} />;
};

export default KeyBindingsPanel;
