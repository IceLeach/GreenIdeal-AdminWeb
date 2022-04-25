import React from 'react';
import ProLayout, { DefaultFooter, PageContainer } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import defaultProps from './defaultProps';
// import {
//   HomeOutlined,
//   HistoryOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';
import styles from './BasicLayout.less';


// const IconMap: any = {
//   home: <HomeOutlined />,
//   history: <HistoryOutlined />,
//   userSet: <SettingOutlined />,
// };
const logo =
  'https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ';

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
        layout='mix'
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
        title="数据中心基础设施管理平台（DCIM）V1.0"
        logo={logo}
        // rightContentRender={() => <div className='EE'>rightContentRender</div>}
        footerRender={() => <DefaultFooter className={styles.footer} links={[]} copyright="copyright" />}
      // {...props}
      >
        <PageContainer>{props.children}</PageContainer>
      </ProLayout>
    </div>
  );
};

export default BasicLayout;
