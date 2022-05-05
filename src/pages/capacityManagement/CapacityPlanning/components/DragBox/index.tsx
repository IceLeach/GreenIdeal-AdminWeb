import React from 'react';
import DragItem from '../DragItem';

export interface DragBoxItemType {
  key: string;
  data: {
    name: string;
    data: any;
    size: number;
    color: string;
  };
}
interface DragBoxProps {
  boxData: DragBoxItemType[];
  setDraggingItem: (dragBoxItem: DragBoxItemType | null) => void;
}

const DragBox: React.FC<DragBoxProps> = (props) => {
  const { boxData, setDraggingItem } = props;

  return (
    <div>
      {boxData.map((item) => (
        <DragItem
          key={item.key}
          itemKey={item.key}
          data={item.data}
          label={item.data.name}
          onDragChange={(key, draging) => {
            if (draging) {
              setDraggingItem(item);
            } else {
              setDraggingItem(null);
            }
          }}
        />
      ))}
    </div>
  );
};

export default DragBox;
