import React from 'react';
// import { useAccess } from 'umi';
// import DragItem from '@/components/DragItem';
import QuickBrowse from './components/QuickBrowse';
import ToDoList from './components/ToDoList';
import MessageBox from './components/MessageBox';
import QuickAccess from './components/QuickAccess';
import RemindBox from './components/RemindBox';
import styles from './index.less';

const Dashboard: React.FC = () => {
  // const access = useAccess();
  // console.log('access', access)

  return (
    <div className={styles.dashboard}>
      {/* <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
        欢迎使用系统
        <div>
          <a href='/grapheditor'>Graph Editor</a>
        </div>
      </div> */}
      <QuickBrowse />
      <div className={styles.boxList}>
        <div className={styles.leftBox}>
          <ToDoList />
          <MessageBox />
        </div>
        <div className={styles.rightBox}>
          <QuickAccess />
          <RemindBox />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
