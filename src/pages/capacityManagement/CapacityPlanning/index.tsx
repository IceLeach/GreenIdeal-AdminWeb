import React, { useEffect, useState } from 'react';
import SearchTree from '@/components/SearchTree';
import DragBox, { DragBoxItemType } from './components/DragBox';
import styles from './index.less';
import DropContainer from './components/DropContainer';
import MapDesigner from './components/MapDesigner';

const treeData = [
  {
    title: '机房一',
    key: '1',
    name: '机房一',
    type: 'map',
    children: [
      {
        title: '机柜一',
        key: '1-1',
        name: '机柜一',
        type: 'container',
      },
      {
        title: '机柜二',
        key: '1-2',
        name: '机柜二',
        type: 'container',
      },
    ],
  },
  {
    title: '机房二',
    key: '2',
    name: '机房二',
    type: 'map',
    children: [
      {
        title: '机房2-1',
        key: '2-1',
        name: '机房2-1',
        type: 'map',
        children: [
          {
            title: '机柜四',
            key: '2-1-1',
            name: '机柜四',
            type: 'container',
          },
        ],
      },
    ],
  },
  {
    title: '机房三',
    key: '3',
    name: '机房三',
    type: 'map',
  },
];
const dragList = [
  { key: '1', data: { name: '交换机', data: 1, size: 1, color: 'red' } },
  { key: '2', data: { name: '服务器1', data: 2, size: 2, color: 'green' } },
  { key: '3', data: { name: '服务器2', data: 3, size: 3, color: 'blue' } },
];
const containerSize = 36;

const CapacityPlanning: React.FC = () => {
  const [activeNode, setActiveNode] = useState<any>();
  const [draggingItem, setDraggingItem] = useState<DragBoxItemType | null>(
    null,
  );

  // useEffect(() => {
  //   console.log('activeNode', activeNode);
  // }, [activeNode]);
  useEffect(() => {
    console.log('draggingItem', draggingItem);
  }, [draggingItem]);

  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <SearchTree
          treeData={treeData}
          onNodeClick={(nodeData) => {
            if (!activeNode || activeNode.key !== nodeData.key)
              setActiveNode(nodeData);
          }}
          activeKey={activeNode ? [activeNode.key] : []}
          placeholder="请输入资产名称"
          style={{ height: 500 }}
        />
        <div style={{ height: 500 }}>
          <div style={{ borderTop: '1px solid' }}>待部署设备</div>
          <div>
            {!activeNode || activeNode.type === 'map' ? (
              ''
            ) : (
              <DragBox boxData={dragList} setDraggingItem={setDraggingItem} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.rightContent}>
        {!activeNode ? (
          ''
        ) : activeNode.type === 'map' ? (
          <MapDesigner />
        ) : (
          <DropContainer
            containerSize={containerSize}
            draggingItem={draggingItem}
            setDraggingItem={setDraggingItem}
          />
        )}
      </div>
    </div>
  );
};

export default CapacityPlanning;
