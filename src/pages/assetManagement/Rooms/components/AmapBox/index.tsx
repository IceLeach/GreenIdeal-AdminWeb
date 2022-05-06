import React, { useEffect } from 'react';
import { message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Map } from 'react-amap';
import { Helmet } from 'umi';
import styles from './index.less';

interface AmapBoxProps {
  visible: boolean;
  onClick: (address: any) => void;
  onClose: () => void;
}

const AmapBox: React.FC<AmapBoxProps> = (props) => {
  const { visible, onClick, onClose } = props;

  useEffect(() => {
    // @ts-ignore
    window._AMapSecurityConfig = {
      securityJsCode: 'f1c57e1cc5cbcf943412fee5065e4b3b',
    };
  }, []);

  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://webapi.amap.com/maps?v=1.4.15&key=8d061d84f0f5aa06e467f33c2153dedf"
        ></script>
      </Helmet>
      <div
        className={styles.box}
        style={{ display: visible ? 'block' : 'none' }}
      >
        <div className={styles.closeButton} onClick={onClose}>
          <CloseOutlined />
        </div>
        {visible && (
          <Map
            amapkey={'8d061d84f0f5aa06e467f33c2153dedf'}
            version="1.4.15"
            zoom={12}
            events={{
              click: (e: any) => {
                // console.log('e', e)
                // @ts-ignore
                window.AMap.plugin(['AMap.Geocoder'], function () {
                  // @ts-ignore
                  const geocoder = new AMap.Geocoder({});
                  geocoder.getAddress(
                    e.lnglat,
                    function (status: any, result: any) {
                      if (status === 'complete' && result.info === 'OK') {
                        // result为对应的地理位置详细信息
                        // console.log('r', status, result)
                        onClick(result);
                      } else {
                        message.error(status, result);
                      }
                    },
                  );
                });
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(AmapBox);
