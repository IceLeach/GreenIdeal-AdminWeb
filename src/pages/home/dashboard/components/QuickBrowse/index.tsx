import React from 'react';
import computerRoom from '@/assets/dashboard/computerRoom.svg';
import cabinet from '@/assets/dashboard/cabinet.svg';
import rackEquipment from '@/assets/dashboard/rackEquipment.svg';
import infrastructure from '@/assets/dashboard/infrastructure.svg';
import spareParts from '@/assets/dashboard/spareParts.svg';
import styles from './index.less';

const QuickBrowse: React.FC = () => {
  return (
    <div className={styles.quickBrowse}>
      <div className={styles.quickBrowseItem}>
        <div className={styles.itemIcon} style={{ background: '#17A2B8' }}>
          <img src={computerRoom} />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.name}>机房</div>
          <div className={styles.number}>1</div>
        </div>
      </div>
      <div className={styles.quickBrowseItem}>
        <div className={styles.itemIcon} style={{ background: '#DC3545' }}>
          <img src={cabinet} />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.name}>机柜</div>
          <div className={styles.number}>2</div>
        </div>
      </div>
      <div className={styles.quickBrowseItem}>
        <div className={styles.itemIcon} style={{ background: '#28A745' }}>
          <img src={rackEquipment} />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.name}>机架设备</div>
          <div className={styles.number}>3</div>
        </div>
      </div>
      <div className={styles.quickBrowseItem}>
        <div className={styles.itemIcon} style={{ background: '#FFC107' }}>
          <img src={infrastructure} />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.name}>基础设施</div>
          <div className={styles.number}>1000</div>
        </div>
      </div>
      <div className={styles.quickBrowseItem}>
        <div className={styles.itemIcon} style={{ background: '#874BEA' }}>
          <img src={spareParts} />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.name}>配件备件</div>
          <div className={styles.number}>10000</div>
        </div>
      </div>
    </div>
  );
};

export default QuickBrowse;
