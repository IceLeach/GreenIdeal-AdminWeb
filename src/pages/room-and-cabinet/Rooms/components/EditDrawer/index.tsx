import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, message, Tabs } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import AmapBox from '../AmapBox';
import styles from './index.less';

interface EditDrawerProps {
  visible: boolean;
  onClose: () => void;
  data: any;
}

const EditDrawer: React.FC<EditDrawerProps> = (props) => {
  const { visible, onClose, data } = props;
  const [form] = Form.useForm();
  const [amapVisible, setAmapVisible] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      console.log('data', data);
    }
  }, [visible]);

  const onFinish = (value: any) => {
    console.log('value', value);
  }
  const checkForm = () => {
    const formData = form.getFieldsValue();
    console.log('form', formData);
    if (!formData.name || !formData.address) {
      message.error('基本信息内容有误，请检查表单');
    }
    form.submit();
  }
  const setAddress = (addressData: any) => {
    const address = addressData.regeocode.addressComponent;
    console.log('address', address);
    const addressArray: string[] = [];
    address.city && addressArray.push(address.city);
    address.district && addressArray.push(address.district);
    address.township && addressArray.push(address.township);
    address.street && addressArray.push(address.street);
    let addressStr = '';
    if (addressArray.length) {
      addressStr += addressArray[0];
      for (let i = 1; i < addressArray.length; i += 1) {
        addressStr += `/${addressArray[i]}`;
      }
    }
    form.setFieldsValue({ address: addressStr, moreAddress: addressData.regeocode.formattedAddress });
  }

  return (
    <Drawer
      title={<span style={{ fontWeight: 'bold' }}>机房详情</span>}
      className={styles.drawer}
      visible={visible}
      onClose={onClose}
      destroyOnClose
      afterVisibleChange={(v) => {
        if (!v) {
          form.resetFields();
        }
      }}
      extra={
        <Button
          type='primary'
          onClick={() => checkForm()}
        >
          保存
        </Button>
      }
      width={1000}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        className={styles.form}
      >
        <Tabs>
          <Tabs.TabPane tab='基本信息' key='1' forceRender={true}>
            <Form.Item
              name='name'
              label='机房名称'
              rules={[{ required: true, message: '机房名称不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='address'
              label='所在区域'
              rules={[{ required: true, message: '所在区域不能为空' }]}
            >
              <Input
                className={styles.addressButton}
                readOnly
                addonAfter={
                  <Button
                    onClick={() => setAmapVisible((v) => !v)}>
                    <EnvironmentOutlined />
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item
              name='moreAddress'
              label='详细地址'
              rules={[{ required: true, message: '详细地址不能为空' }]}
            >
              <Input />
            </Form.Item>
            <AmapBox visible={amapVisible} onClick={setAddress} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='列信息' key='2' forceRender={true}></Tabs.TabPane>
          <Tabs.TabPane tab='子系统信息' key='3' forceRender={true}></Tabs.TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
