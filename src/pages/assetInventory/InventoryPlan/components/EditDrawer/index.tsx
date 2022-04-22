import React, { useEffect } from 'react';
import { Button, DatePicker, Drawer, Form, Input, message, Select } from 'antd';
import styles from './index.less';

interface EditDrawerProps {
  visible: boolean;
  onClose: () => void;
  data: any;
}

const EditDrawer: React.FC<EditDrawerProps> = (props) => {
  const { visible, onClose, data } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      console.log('data', data);
    }
  }, [visible]);

  const onFinish = (value: any) => {
    console.log('value', value);
    // const formData = new FormData();
    // formData.append('file', file);
  }
  const checkForm = () => {
    const formData = form.getFieldsValue();
    console.log('form', formData);
    form.submit();
  }

  return (
    <Drawer
      title={<span style={{ fontWeight: 'bold' }}>详情</span>}
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
        <Form.Item
          name='name'
          label='计划名称'
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='startTime'
          label='开始日期'
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='endTime'
          label='结束日期'
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='address'
          label='盘点位置'
        >
          <Select></Select>
        </Form.Item>
        <Form.Item
          name='type'
          label='盘点类型'
        >
          <Select>
            <Select.Option value={1}>单次</Select.Option>
            <Select.Option value={2}>每周</Select.Option>
            <Select.Option value={3}>每月</Select.Option>
            <Select.Option value={4}>每季度</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='executor'
          label='盘点执行人'
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
