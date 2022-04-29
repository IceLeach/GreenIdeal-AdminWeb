import React, { useEffect, useState } from 'react';
import { DragBoxItemType } from '../DragBox';
import DragItem from '../DragItem';
import DropItem from '../DropItem';

interface DropContainerProps {
  containerSize: number;
  draggingItem: DragBoxItemType | null;
  setDraggingItem: (dragBoxItem: DragBoxItemType | null) => void;
}

const DropContainer: React.FC<DropContainerProps> = (props) => {
  const { containerSize, draggingItem, setDraggingItem } = props;
  const [hoveringKey, setHoveringKey] = useState<number | null>(null);
  const [activeKeys, setActiveKeys] = useState<number[]>([]);
  const [itemDataList, setItemDataList] = useState<
    {
      key: number;
      component: { value: DragBoxItemType; isStart: boolean } | null;
    }[]
  >([]);

  useEffect(() => {
    const dataList: any[] = [];
    for (let i = 0; i < containerSize; i += 1) {
      dataList.push({ key: i + 1, component: null });
    }
    setItemDataList(dataList);
  }, []);

  useEffect(() => {
    console.log('hoveringKey', hoveringKey);
    if (draggingItem) {
      const size = draggingItem.data.size;
      if (
        draggingItem.key &&
        hoveringKey &&
        hoveringKey + size - 1 <= containerSize
      ) {
        const keys: number[] = [];
        for (let i = hoveringKey; i <= hoveringKey + size - 1; i += 1) {
          keys.push(i);
        }
        setActiveKeys(keys);
      } else {
        setActiveKeys([]);
      }
    }
  }, [draggingItem, hoveringKey]);
  useEffect(() => {
    console.log('itemDataList', itemDataList);
  }, [itemDataList]);

  const dropItem = (key: number) => {
    if (draggingItem) {
      const size = draggingItem.data.size;
      if (key + size - 1 <= containerSize) {
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
              value: draggingItem,
              isStart: i === key - 1,
            };
          }
          setItemDataList(newItemDataList);
        }
      }
    }
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #000',
        padding: 8,
        width: 200,
      }}
    >
      <div style={{ border: '1px solid #000' }}>
        {itemDataList.map((item) =>
          item.component ? (
            item.component.isStart ? (
              // <DragItem
              //   key={item.component.value.key}
              //   itemKey={item.component.value.key}
              //   data={item.component.value.data}
              //   label={item.component.value.data.name}
              //   onDragChange={(key, draging) => {
              //     if (draging) {
              //       setDraggingItem(item.component!.value);
              //       const newItemDataList = [...itemDataList];
              //       const currentKey = item.key;
              //       const currentSize = item.component!.value.data.size;
              //       for (let i = currentKey - 1; i <= currentKey + currentSize - 2; i += 1) {
              //         newItemDataList[i].component = null;
              //       }
              //       setItemDataList(newItemDataList);
              //     } else {
              //       setDraggingItem(null);
              //     }
              //   }}
              // />
              <div
                key={`${item.key}`}
                style={{
                  height: 16,
                  border: '1px solid #e8e8e8',
                }}
              >
                {item.component.value.data.name}
              </div>
            ) : (
              <div
                key={`${item.key}`}
                style={{
                  height: 16,
                  border: '1px solid #e8e8e8',
                }}
              >
                {item.component.value.data.name}
              </div>
            )
          ) : (
            <DropItem
              key={`${item.key}`}
              itemKey={item.key}
              hasComponent={!!item.component}
              isHovering={!!activeKeys.find((key) => key === item.key)}
              onDrop={dropItem}
              onHovering={(key) => {
                if (key !== hoveringKey) {
                  setHoveringKey(key);
                }
              }}
              onLeave={(key) => setHoveringKey(null)}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default DropContainer;
