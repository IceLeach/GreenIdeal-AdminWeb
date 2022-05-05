import { MenuOutlined } from '@ant-design/icons';
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
  const [components, setComponents] = useState<
    {
      key: string;
      component: DragBoxItemType;
      startIndex: number;
      length: number;
    }[]
  >([]);
  const [itemDataList, setItemDataList] = useState<
    {
      key: number;
      component: {
        key: string;
        value: DragBoxItemType;
        isStart: boolean;
      } | null;
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
    // console.log('hoveringKey', hoveringKey);
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
          if (
            itemDataList[i].component &&
            itemDataList[i].component?.key !== draggingItem.key
          ) {
            isOk = false;
            break;
          }
        }
        if (isOk) {
          const newComponents = [...components].filter(
            (c) => c.key !== draggingItem.key,
          );
          newComponents.push({
            key: draggingItem.key,
            component: draggingItem,
            startIndex: key,
            length: draggingItem.data.size,
          });
          setComponents(newComponents);
          const newItemDataList = [...itemDataList];
          for (let i = 0; i < newItemDataList.length; i += 1) {
            if (newItemDataList[i].component?.key === draggingItem.key) {
              newItemDataList[i].component = null;
            }
          }
          for (let i = key - 1; i <= key + size - 2; i += 1) {
            newItemDataList[i].component = {
              key: draggingItem.key,
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
        {itemDataList.map((item) => (
          <DropItem
            key={`${item.key}`}
            itemKey={item.key}
            hasComponent={!!item.component}
            componentColor={item.component?.value.data.color}
            isHovering={!!activeKeys.find((key) => key === item.key)}
            hoveringColor={draggingItem?.data.color}
            onDrop={dropItem}
            onHovering={(key) => {
              if (key !== hoveringKey) {
                setHoveringKey(key);
              }
            }}
            onLeave={(key) => setHoveringKey(null)}
            componentIsDraging={
              !!item.component && item.component?.key === draggingItem?.key
            }
          />
        ))}
      </div>
      <div style={{ position: 'absolute', top: 8 }}>
        {components.map((c) => (
          <DragItem
            key={c.component.key}
            itemKey={c.component.key}
            data={c.component.data}
            label=""
            // label={<MenuOutlined style={{ cursor: 'grab', color: '#000', position: 'absolute', left: 160 }} />}
            transparentWhenDragging
            hiddenOriginWhenDragging
            onDragChange={(key, draging) => {
              if (draging) {
                setDraggingItem(c.component);
              } else {
                setDraggingItem(null);
              }
            }}
            // style={{ position: 'absolute', top: (c.startIndex - 1) * 16 + 2, left: 1, height: c.length * 16, width: 0, border: 'none', padding: 0, display: 'flex', alignItems: 'center' }}
            style={{
              position: 'absolute',
              top: (c.startIndex - 1) * 16 + 2,
              left: 1,
              height: c.length * 16,
              width: 180,
              border: 'none',
              padding: 0,
            }}
          />
          // <div style={{ position: 'absolute', top: (c.startIndex - 1) * 16 + 2, left: 1, height: c.length * 16, width: 180 }} />
        ))}
      </div>
    </div>
  );
};

export default DropContainer;
