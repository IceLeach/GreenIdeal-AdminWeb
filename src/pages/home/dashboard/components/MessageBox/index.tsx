import React from 'react';
import message from '@/assets/dashboard/message.svg';
import styles from './index.less';

const MessageBox: React.FC = () => {
  return (
    <div className={styles.box}>
      <div className={styles.titleLine}>
        <img src={message} />
        <span className={styles.title}>动态信息</span>
      </div>
      <div className={styles.content}></div>
    </div>
  );
};

export default MessageBox;
