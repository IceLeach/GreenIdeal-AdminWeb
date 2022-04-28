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

interface DropItemProps {
  itemKey: number;
  isHovering?: boolean;
  onHovering: (key: number) => void;
  onLeave: (key: number) => void;
  onDrop: (key: number) => void;
}

const DropItem = (props: DropItemProps) => {
  const { itemKey, isHovering = false, onHovering, onLeave, onDrop } = props;
  // const [isHovering, setIsHovering] = useState(false);
  const dropRef = useRef(null);
  useDrop(dropRef, {
    onDom: (content: string, e) => {
      // alert(`custom: ${content} dropped`);
      // console.log(content, e);
      onDrop(itemKey);
      onLeave(itemKey);
    },
    // onDragEnter: (e) => {
    //   // setIsHovering(true);
    //   console.log('enter', e);
    // },
    onDragLeave: (e) => {
      // setIsHovering(false);
      // console.log('leave', e);
      onLeave(itemKey);
    },
    onDragOver: (e) => {
      // console.log('over', e)
      onHovering(itemKey);
    },
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

const fullSize = 24;

export default () => {
  const [draggingItem, setDraggingItem] = useState<{
    key: string | null;
    size: number;
  }>({ key: null, size: 1 });
  const [hoveringKey, setHoveringKey] = useState<number | null>(null);
  const [activeKeys, setActiveKeys] = useState<number[]>([]);
  const [itemDataList, setItemDataList] = useState<
    {
      key: number;
      component: { key: string | null; size: number; isStart: boolean } | null;
    }[]
  >([]);

  useEffect(() => {
    const dataList: any[] = [];
    for (let i = 0; i < fullSize; i += 1) {
      dataList.push({ key: i + 1, component: null });
    }
    setItemDataList(dataList);
  }, []);

  useEffect(() => {
    console.log('draggingItem', draggingItem);
  }, [draggingItem]);
  useEffect(() => {
    console.log('hoveringKey', hoveringKey);
    const size = draggingItem.size;
    if (draggingItem.key && hoveringKey && hoveringKey + size - 1 <= fullSize) {
      const keys: number[] = [];
      for (let i = hoveringKey; i <= hoveringKey + size - 1; i += 1) {
        keys.push(i);
      }
      setActiveKeys(keys);
    } else {
      setActiveKeys([]);
    }
  }, [draggingItem, hoveringKey]);
  useEffect(() => {
    console.log('itemDataList', itemDataList);
  }, [itemDataList]);

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
        {itemDataList.map((item) =>
          item.component ? (
            <div
              key={`${item.key}`}
              style={{
                display: 'inline-block',
                height: 32,
                width: 'calc(100% / 24)',
                border: '1px solid #e8e8e8',
              }}
            >
              {item.component.key}
            </div>
          ) : (
            <DropItem
              key={`${item.key}`}
              itemKey={item.key}
              isHovering={!!activeKeys.find((key) => key === item.key)}
              onDrop={(key) => {
                const size = draggingItem.size;
                if (key + size - 1 <= fullSize) {
                  let isOk = true;
                  for (let i = key - 1; i <= key + size - 2; i += 1) {
                    if (itemDataList[i].component) {
                      isOk = false;
                      break;
                    }
                  }
                  if (isOk) {
                    const newItemDataList = [...itemDataList];
                    for (let i = key - 1; i <= key + size - 2; i += 1) {
                      newItemDataList[i].component = {
                        key: draggingItem.key,
                        size: draggingItem.size,
                        isStart: i === key - 1,
                      };
                    }
                    setItemDataList(newItemDataList);
                  }
                }
              }}
              onHovering={(key) => {
                if (key !== hoveringKey) {
                  setHoveringKey(key);
                }
              }}
              onLeave={(key) => setHoveringKey(null)}
            />
            // <div key={item} style={{ display: 'inline-block', height: 32, width: 'calc(100% / 24)', border: '1px solid #e8e8e8' }}></div>
          ),
        )}
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
                setDraggingItem({ key, size: e.data.size });
              } else {
                setDraggingItem({ key: null, size: 1 });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
