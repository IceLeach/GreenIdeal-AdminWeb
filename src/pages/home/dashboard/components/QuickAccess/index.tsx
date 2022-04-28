import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import goto from '@/assets/dashboard/goto.svg';
import styles from './index.less';

const linkList = [
  { id: '1', name: '添加机架设备' },
  { id: '2', name: '变更管理' },
  { id: '3', name: '盘点计划' },
  { id: '4', name: '组态设计' },
  { id: '5', name: '运维经验' },
  { id: '6', name: '容量管理' },
  { id: '7', name: '能耗管理' },
];

const QuickAccess: React.FC = () => {
  return (
    <div className={styles.box}>
      <div className={styles.titleLine}>
        <div className={styles.lineLeft}>
          <img src={goto} />
          <span className={styles.title}>快捷访问</span>
        </div>
        <a className={styles.settingButton}>
          <SettingOutlined />
          管理
        </a>
      </div>
      <div className={styles.content}>
        {linkList.map((link) => (
          <div key={link.id} className={styles.link}>
            {link.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
