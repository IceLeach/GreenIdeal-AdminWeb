import React, { useState } from 'react';
import ProLayout, { DefaultFooter, PageContainer } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import defaultProps from './defaultProps';
import styles from './BasicLayout.less';

const logo =
  'https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ';

const BasicLayout = (props: any) => {
  const [pathname, setPathname] = useState(window.location.pathname ?? '/');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        layout='mix'
        breadcrumbRender={false}
        location={{ pathname }}
        fixSiderbar
        onMenuHeaderClick={(e) => {
          // console.log(e);
          setPathname('/');
          history.push('/');
        }}
        menuItemRender={(item: any, dom) => (
          <Link
            to={item.path ?? '/'}
            onClick={() => {
              setPathname(item.path ?? '/');
            }}
          >
            {dom}
          </Link>
        )}
        title="管理后台"
        logo={logo}
        // rightContentRender={() => <div className='EE'>rightContentRender</div>}
        footerRender={() => <DefaultFooter className={styles.footer} links={[]} copyright="copyright" />}
      >
        <PageContainer>{props.children}</PageContainer>
      </ProLayout>
    </div>
  );
};

export default BasicLayout;
