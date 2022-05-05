import React, { ReactNode, useRef, useState } from 'react';
import { useDrag } from 'ahooks';

interface DragItemProps {
  itemKey: string;
  label: ReactNode;
  data: any;
  onDragChange: (key: string, dragging: boolean) => void;
  style?: React.CSSProperties;
  transparentWhenDragging?: boolean;
  hiddenOriginWhenDragging?: boolean;
}

const DragItem: React.FC<DragItemProps> = (props) => {
  const {
    itemKey,
    label,
    data,
    onDragChange,
    style,
    transparentWhenDragging = false,
    hiddenOriginWhenDragging = false,
  } = props;
  const dragRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  useDrag(data, dragRef, {
    onDragStart: (e) => {
      setDragging(true);
      onDragChange(itemKey, true);
      if (hiddenOriginWhenDragging) {
        setTimeout(() => {
          //@ts-ignore
          e.target.style.visibility = 'hidden';
        }, 0);
      }
    },
    onDragEnd: (e) => {
      setDragging(false);
      onDragChange(itemKey, false);
      if (hiddenOriginWhenDragging) {
        setTimeout(() => {
          //@ts-ignore
          e.target.style.visibility = '';
        }, 0);
      }
    },
  });

  return (
    <div
      ref={dragRef}
      style={{
        border: '1px solid #e8e8e8',
        padding: 4,
        width: 80,
        textAlign: 'center',
        borderColor: dragging ? '#316ddd' : '#e8e8e8',
        cursor: dragging ? 'grabbing' : 'grab',
        opacity: transparentWhenDragging ? (dragging ? 0 : 1) : 1,
        ...style,
      }}
    >
      {label}
    </div>
  );
};

export default DragItem;
