import React, { useEffect, useRef, useState } from 'react';
import { useDrop, useDrag } from 'ahooks';

interface DragItemProps {
  itemKey: string;
  data: any;
  onDragChange: (key: string, dragging: boolean) => void;
}

const DragItem = (props: DragItemProps) => {
  const { itemKey, data, onDragChange } = props;
  const dragRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  useDrag(data, dragRef, {
    onDragStart: () => {
      setDragging(true);
      onDragChange(itemKey, true);
    },
    onDragEnd: () => {
      setDragging(false);
      onDragChange(itemKey, false);
    },
  });

  return (
    <div
      ref={dragRef}
      style={{
        border: '1px solid #e8e8e8',
        padding: 16,
        width: 80,
        textAlign: 'center',
        marginRight: 16,
      }}
    >
      {dragging ? 'dragging' : `box-${data.data}`}
    </div>
  );
};

const DropItem = () => {
  const [isHovering, setIsHovering] = useState(false);
  const dropRef = useRef(null);
  useDrop(dropRef, {
    onDom: (content: string, e) => {
      // alert(`custom: ${content} dropped`);
      console.log(content, e);
    },
    onDragEnter: (e) => {
      setIsHovering(true);
      console.log('enter', e);
    },
    onDragLeave: (e) => {
      setIsHovering(false);
      console.log('leave', e);
    },
    // onDragOver: (e) => {
    //   console.log('over', e)
    // }
  });

  return (
    <div
      ref={dropRef}
      style={{
        display: 'inline-block',
        height: 32,
        width: 'calc(100% / 24)',
        border: '1px solid #e8e8e8',
        background: isHovering ? 'green' : '#fff',
      }}
    ></div>
  );
};

export default () => {
  const [items, setItems] = useState<string[]>([]);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  useEffect(() => {
    const itemList: string[] = [];
    for (let i = 0; i < 24; i += 1) {
      itemList.push(`${i + 1}`);
    }
    setItems(itemList);
  }, []);

  useEffect(() => {
    console.log('draggingItem', draggingItem);
  }, [draggingItem]);

  return (
    <div style={{ background: '#fff' }}>
      <div
        style={{
          border: '1px dashed #e8e8e8',
          padding: 4,
          textAlign: 'center',
        }}
      >
        {/* {isHovering ? 'release here' : 'drop here'} */}
        {items.map((item) => (
          <DropItem key={item} />
          // <div key={item} style={{ display: 'inline-block', height: 32, width: 'calc(100% / 24)', border: '1px solid #e8e8e8' }}></div>
        ))}
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        {[
          { key: '1', data: { data: 1, size: 1 } },
          { key: '2', data: { data: 2, size: 2 } },
          { key: '3', data: { data: 2, size: 3 } },
        ].map((e) => (
          <DragItem
            key={e.key}
            itemKey={e.key}
            data={e.data}
            onDragChange={(key, draging) => {
              if (draging) {
                setDraggingItem(key);
              } else {
                setDraggingItem(null);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
