import React, { ReactNode, useRef, useState } from 'react';
import { useDrag } from 'ahooks';

interface DragItemProps {
  itemKey: string;
  label: ReactNode;
  data: any;
  onDragChange: (key: string, dragging: boolean) => void;
}

const DragItem: React.FC<DragItemProps> = (props) => {
  const { itemKey, label, data, onDragChange } = props;
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
        padding: 4,
        width: 80,
        textAlign: 'center',
        borderColor: dragging ? '#316ddd' : '#e8e8e8',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
    >
      {label}
    </div>
  );
};

export default DragItem;
