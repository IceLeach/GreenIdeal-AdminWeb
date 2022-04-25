import React, { useEffect, useRef, useState } from 'react';
import { useDrop, useDrag } from 'ahooks';

const DragItem = ({ data }: any) => {
  const dragRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  useDrag({ data }, dragRef, {
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
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
      {dragging ? 'dragging' : `box-${data}`}
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
      console.log('enter', e)
    },
    onDragLeave: (e) => {
      setIsHovering(false);
      console.log('leave', e)
    },
    // onDragOver: (e) => {
    //   console.log('over', e)
    // }
  });

  return (
    <div ref={dropRef} style={{ display: 'inline-block', height: 32, width: 'calc(100% / 24)', border: '1px solid #e8e8e8', background: isHovering ? 'green' : '#fff' }}></div>
  );
}

export default () => {
  const [isHovering, setIsHovering] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const itemList: string[] = [];
    for (let i = 0; i < 24; i += 1) {
      itemList.push(`${i + 1}`);
    }
    setItems(itemList);
  }, []);


  const dropRef = useRef(null);

  useDrop(dropRef, {
    onDom: (content: string, e) => {
      // alert(`custom: ${content} dropped`);
      console.log(content, e);
    },
    onDragEnter: (e) => {
      setIsHovering(true);
      console.log('enter', e)
    },
    onDragLeave: (e) => {
      setIsHovering(false);
      console.log('leave', e)
    },
    // onDragOver: (e) => {
    //   console.log('over', e)
    // }
  });

  return (
    <div style={{ background: '#fff' }}>
      <div ref={dropRef} style={{ border: '1px dashed #e8e8e8', padding: 4, textAlign: 'center' }}>
        {/* {isHovering ? 'release here' : 'drop here'} */}
        {/* <div></div> */}
        {items.map(item => (
          <DropItem key={item} />
          // <div key={item} style={{ display: 'inline-block', height: 32, width: 'calc(100% / 24)', border: '1px solid #e8e8e8' }}></div>
        ))}
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        {['1', '2', '3', '4', '5'].map((e, i) => (
          <DragItem key={e} data={e} />
        ))}
      </div>
    </div>
  );
};
