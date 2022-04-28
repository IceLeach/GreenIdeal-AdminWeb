import React from 'react';
import plan from '@/assets/dashboard/plan.svg';
import styles from './index.less';

const ToDoList: React.FC = () => {
  return (
    <div className={styles.box}>
      <div className={styles.titleLine}>
        <img src={plan} />
        <span className={styles.title}>我的待办</span>
      </div>
      <div className={styles.content}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          暂无数据
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
