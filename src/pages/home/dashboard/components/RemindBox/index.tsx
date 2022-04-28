import React from 'react';
import clock from '@/assets/dashboard/clock.svg';
import styles from './index.less';

const RemindCount = 16;
const RemindList = [
  {
    id: '1',
    from: '机架设备',
    title: '资产编号100001维保到期',
    timeString: '今天15:30',
  },
  {
    id: '2',
    from: '盘点计划',
    title: '计划名称：每季度盘点于2021-4-11结束',
    timeString: '今天16:30',
  },
  {
    id: '3',
    from: '机架设备',
    title: '资产编号100002维保到期',
    timeString: '今天16:36',
  },
  {
    id: '4',
    from: '机架设备',
    title: '资产编号100003维保到期',
    timeString: '今天17:30',
  },
  {
    id: '5',
    from: '机架设备',
    title: '资产编号100003维保到期',
    timeString: '今天17:30',
  },
];

const RemindBox: React.FC = () => {
  return (
    <div className={styles.box}>
      <div className={styles.titleLine}>
        <img src={clock} />
        <span className={styles.title}>到期提醒（{RemindCount}）</span>
      </div>
      <div className={styles.content}>
        <div className={styles.messageList}>
          {RemindList.map((remind) => (
            <div className={styles.messageItem} key={remind.id}>
              <div className={styles.messageLine}>
                <span className={styles.point}></span>
                <span className={styles.text}>{remind.title}</span>
              </div>
              <div className={styles.infoLine}>
                <span className={styles.from}>来自：{remind.from}</span>
                <span className={styles.time}>{remind.timeString}</span>
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

export default RemindBox;
