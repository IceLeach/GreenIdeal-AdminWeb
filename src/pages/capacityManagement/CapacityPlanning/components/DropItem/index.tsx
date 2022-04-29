import React, { useRef } from 'react';
import { useDrop } from 'ahooks';

interface DropItemProps {
  itemKey: number;
  isHovering?: boolean;
  hasComponent?: boolean;
  onHovering: (key: number) => void;
  onLeave: (key: number) => void;
  onDrop: (key: number) => void;
}

const DropItem: React.FC<DropItemProps> = (props) => {
  const {
    itemKey,
    isHovering = false,
    hasComponent = false,
    onHovering,
    onLeave,
    onDrop,
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
        background: hasComponent ? '#fff' : isHovering ? 'green' : '#fff',
      }}
    ></div>
  );
};

export default DropItem;
