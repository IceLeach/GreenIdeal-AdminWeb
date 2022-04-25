import React from 'react';
// import { useAccess } from 'umi';
import DragItem from '@/components/DragItem';

const Dashboard: React.FC = () => {
  // const access = useAccess();
  // console.log('access', access)
  return (
    <>
      <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
        欢迎使用系统
        {/* <div>
          <a href='/grapheditor'>Graph Editor</a>
        </div> */}
      </div>
      <DragItem />
    </>
  );
};

export default Dashboard;
