import React, { useState } from 'react';
// import ProLayout, {
//   DefaultFooter,
//   PageContainer,
// } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import { Avatar } from 'antd';
import {
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  HomeOutlined,
  HistoryOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from '@/assets/logo.png';
import headerImg from '@/assets/headerImg.png';
import message from '@/assets/message.svg';
import styles from './BasicLayout.less';
// import defaultProps from './defaultProps';

const IconMap: any = {
  home: <HomeOutlined />,
  history: <HistoryOutlined />,
  setting: <SettingOutlined />,
};

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

  const layoutRoute = props.route;
  const setLayoutRoute = (route: any[]) => {
    route.forEach((item) => {
      if (item.icon) {
        item.icon = IconMap[item.icon];
      }
      if (item.routes) {
        setLayoutRoute(item.routes);
      }
    });
  };
  setLayoutRoute(layoutRoute.routes);
  // console.log('layoutRoute', layoutRoute)

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        // {...defaultProps}
        route={layoutRoute}
        layout="mix"
        className={styles.layout}
        breadcrumbRender={false}
        // location={{ pathname }}
        location={props.location}
        fixSiderbar
        onMenuHeaderClick={() => history.push('/dashboard')}
        menuItemRender={(item: any, dom) => (
          <Link to={item.path ?? '/'}>{dom}</Link>
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
