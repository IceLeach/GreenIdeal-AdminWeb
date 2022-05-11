import React from 'react';
import type { NsGraph } from '@antv/xflow';

const Cabinet: NsGraph.INodeRender = (props) => {
  // console.log('props', props);
  /**
   * 1. 节点的数据、位置信息通过props取
   * 2. 当节点被触发更新时, props返回的数据也会动态更新, 触发节点重新渲染
   */
  return (
    <div
      style={{
        width: props.data.width,
        height: props.data.height,
        background: '#9ca0a3',
        border: '1px solid #fff',
      }}
    >
      {props.data.label}
    </div>
  );
};
export default React.memo(Cabinet);
