import React, { useRef } from 'react';
import { useDrop } from 'ahooks';

interface DropItemProps {
  itemKey: number;
  isHovering?: boolean;
  hoveringColor?: string;
  hasComponent?: boolean;
  componentColor?: string;
  onHovering: (key: number) => void;
  onLeave: (key: number) => void;
  onDrop: (key: number) => void;
  componentIsDraging?: boolean;
}

const DropItem: React.FC<DropItemProps> = (props) => {
  const {
    itemKey,
    isHovering = false,
    hoveringColor = 'green',
    hasComponent = false,
    componentColor = 'green',
    onHovering,
    onLeave,
    onDrop,
    componentIsDraging = false,
  } = props;
  const dropRef = useRef(null);
  useDrop(dropRef, {
    onDrop: () => {
      onLeave(itemKey);
    },
    onDom: (content: string, e) => {
      // console.log(content, e);
      onDrop(itemKey);
    },
    // onDragEnter: (e) => {
    //   console.log('enter', e);
    // },
    onDragLeave: (e) => {
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
        height: 16,
        border: '1px solid #e8e8e8',
        background: hasComponent
          ? componentColor
          : isHovering
          ? hoveringColor
          : '#fff',
        opacity: componentIsDraging && !isHovering ? 0.5 : 1,
      }}
    ></div>
  );
};

export default DropItem;
