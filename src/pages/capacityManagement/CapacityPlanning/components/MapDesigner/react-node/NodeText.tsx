import React from 'react';
import type { NsGraph } from '@antv/xflow';

const NodeText: NsGraph.INodeRender = (props) => {
  console.log('props', props);

  return (
    <div
      style={{
        width: props.data.width,
        height: props.data.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
      }}
    >
      {props.data.label}
    </div>
  );
};
export default NodeText;
