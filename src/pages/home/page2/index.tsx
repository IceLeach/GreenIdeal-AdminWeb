import React, { useEffect, useRef, useState } from 'react';

const mx = require('mxgraph')({
  mxBasePath: 'mxgraph'
});
const { mxGraph, mxClient, mxEvent, mxRubberband, mxUtils } = mx;

const Page2: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (mxClient.isBrowserSupported()) {
      mxEvent.disableContextMenu(ref.current);
      const graph = new mxGraph(ref.current);
      new mxRubberband(graph);
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();

      try {
        const v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30);
        const v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
        const e1 = graph.insertEdge(parent, null, "", v1, v2);
      } finally {
        graph.getModel().endUpdate();
      }
    } else {
      // 如果不支持显示错误信息
      mxUtils.error('Browser is not supported!', 200, false);
      console.error('Browser is not supported!');
    }
  }, []);

  return (
    <div className="graph-container" ref={ref} id="divGraph" />
  );
}

export default Page2;
