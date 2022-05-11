import React from 'react';
import { WorkspacePanel } from '@antv/xflow';
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { Graph } from '@antv/x6';

interface ActionsPanelProps {
  graphRef: React.MutableRefObject<Graph | undefined>;
  undoFn: () => void;
  redoFn: () => void;
  undoLength: number;
  redoLength: number;
  isHistoryActionRef: React.MutableRefObject<boolean>;
}

const ActionsPanel: React.FC<ActionsPanelProps> = (props) => {
  const {
    graphRef,
    undoFn,
    redoFn,
    undoLength,
    redoLength,
    isHistoryActionRef,
  } = props;

  const undo = () => {
    // const canUndo = graphRef.current?.canUndo();
    console.log('canUndo', undoLength);
    if (undoLength) {
      isHistoryActionRef.current = true;
      undoFn();
    }
  };
  const redo = () => {
    // const canRedo = graphRef.current?.canRedo();
    console.log('canRedo', redoLength);
    if (redoLength) {
      isHistoryActionRef.current = true;
      redoFn();
    }
  };

  return (
    <div>
      <UndoOutlined onClick={undo} />
      <RedoOutlined onClick={redo} />
    </div>
  );
};

interface ToolbarPanelProps {
  graphRef: React.MutableRefObject<Graph | undefined>;
  undoFn: () => void;
  redoFn: () => void;
  undoLength: number;
  redoLength: number;
  isHistoryActionRef: React.MutableRefObject<boolean>;
}

const ToolbarPanel: React.FC<ToolbarPanelProps> = (props) => {
  return (
    <WorkspacePanel
      position={{ top: 40, left: 290, bottom: 0, width: 80, height: 30 }}
      className="panel"
    >
      <ActionsPanel {...props} />
    </WorkspacePanel>
  );
};

export default ToolbarPanel;
