import React, { useState } from 'react';
import ProLayout, {
  DefaultFooter,
  PageContainer,
} from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import { Avatar } from 'antd';
import {
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  // HomeOutlined,
  // HistoryOutlined,
  // SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import defaultProps from './defaultProps';
import logo from '@/assets/logo.png';
import headerImg from '@/assets/headerImg.png';
import message from '@/assets/message.svg';
import styles from './BasicLayout.less';

// const IconMap: any = {
//   home: <HomeOutlined />,
//   history: <HistoryOutlined />,
//   userSet: <SettingOutlined />,
// };

const title: any = (
  <div className={styles.headerTitle}>
    <div className={styles.mainTitle}>浙江绿色理想科技有限公司</div>
    <div className={styles.subTitle}>
      Zhejiang Green Ideal Technology Co.,Ltd.
    </div>
  </div>
);

const BasicLayout = (props: any) => {
  // console.log('props', props.route)
  // const [pathname, setPathname] = useState(window.location.pathname ?? '/');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        // {...props}
        layout="mix"
        className={styles.layout}
        breadcrumbRender={false}
        // location={{ pathname }}
        location={props.location}
        fixSiderbar
        onMenuHeaderClick={(e) => {
          // console.log(e);
          // setPathname('/');
          history.push('/');
        }}
        menuItemRender={(item: any, dom) => (
          <Link
            to={item.path ?? '/'}
            // onClick={() => {
            //   setPathname(item.path ?? '/');
            // }}
          >
            {/* {item.menuIcon && IconMap[item.menuIcon]} */}
            {dom}
          </Link>
        )}
        title={title}
        logo={logo}
        siderWidth={279}
        collapsed={false}
        // collapsedButtonRender={() => <></>}
        rightContentRender={() => (
          <div className={styles.rightContent}>
            <img src={headerImg} />
            <div className={styles.toolBar}>
              <div className={styles.iconButton}>
                <SearchOutlined />
              </div>
              <div className={styles.iconButton}>
                <img src={message} />
              </div>
              <div className={styles.iconButton}>
                <QuestionCircleOutlined />
              </div>
              <div className={styles.iconButton}>
                <BellOutlined />
              </div>
              <div className={styles.userAvatar}>
                <Avatar size={36} icon={<UserOutlined />} />
                <span className={styles.name}>用户名</span>
              </div>
            </div>
          </div>
        )}
        // footerRender={() => <DefaultFooter className={styles.footer} links={[]} copyright="copyright" />}
        footerRender={() => false}
        // {...props}
      >
        {props.children}
        {/* <PageContainer>{props.children}</PageContainer> */}
      </ProLayout>
    </div>
  );
};

export default BasicLayout;
