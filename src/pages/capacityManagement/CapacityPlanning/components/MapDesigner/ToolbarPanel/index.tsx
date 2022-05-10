import React from 'react';
import { WorkspacePanel } from '@antv/xflow';
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { Graph } from '@antv/x6';

interface ActionsPanelProps {
  graphRef: React.MutableRefObject<Graph | undefined>;
}

const ActionsPanel: React.FC<ActionsPanelProps> = (props) => {
  const { graphRef } = props;

  const undo = () => {
    const canUndo = graphRef.current?.canUndo();
    console.log('canUndo', canUndo);
  };
  const redo = () => {
    const canRedo = graphRef.current?.canRedo();
    console.log('canRedo', canRedo);
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
}

const ToolbarPanel: React.FC<ToolbarPanelProps> = (props) => {
  const { graphRef } = props;

  return (
    <WorkspacePanel
      position={{ top: 40, left: 290, bottom: 0, width: 80, height: 30 }}
      className="panel"
    >
      <ActionsPanel graphRef={graphRef} />
    </WorkspacePanel>
  );
};

export default ToolbarPanel;
