import React from 'react';
import message from '@/assets/dashboard/message.svg';
import styles from './index.less';

const messageCount = 10;
const messageList = [
  {
    id: '1',
    from: '资产管理',
    title: '李三添加了一个基础设施资产：UPS',
    timeString: '几秒前',
  },
  {
    id: '2',
    from: '资产管理',
    title: '李三上架了一个机架设备：戴尔服务器',
    timeString: '昨天15:30',
  },
  {
    id: '3',
    from: '资产管理',
    title: '李三上架了一个机架设备：戴尔服务器',
    timeString: '昨天15:30',
  },
];

const MessageBox: React.FC = () => {
  return (
    <div className={styles.box}>
      <div className={styles.titleLine}>
        <img src={message} />
        <span className={styles.title}>动态信息（{messageCount}）</span>
      </div>
      <div className={styles.content}>
        <div className={styles.messageList}>
          {messageList.map((message) => (
            <div className={styles.messageItem} key={message.id}>
              <div className={styles.messageLine}>
                <span className={styles.point}></span>
                <span className={styles.text}>{message.title}</span>
              </div>
              <div className={styles.infoLine}>
                <span className={styles.from}>来自：{message.from}</span>
                <span className={styles.time}>{message.timeString}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pageButtons}>
          <a className={styles.button} style={{ marginRight: 29 }}>
            上一页
          </a>
          <a className={styles.button}>下一页</a>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
