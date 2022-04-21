import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Drawer, Form, Input, InputNumber, message, Radio, Select, Tabs, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import styles from './index.less';

interface EditDrawerProps {
  visible: boolean;
  onClose: () => void;
  data: any;
}

const EditDrawer: React.FC<EditDrawerProps> = (props) => {
  const { visible, onClose, data } = props;
  const [form] = Form.useForm();
  const pictureListRef = useRef<{ uid: string, file: RcFile }[]>([]);
  const fileListRef = useRef<{ uid: string, file: RcFile }[]>([]);
  const [pictureCount, setPictureCount] = useState<number>(0);
  const [fileCount, setFileCount] = useState<number>(0);
  // const [pictureList, setPictureList] = useState<{ uid: string, file: RcFile }[]>([]);

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
    console.log('form', formData, pictureListRef.current);
    if (!formData.uid || !formData.name || !formData.room || !formData.column || !formData.brand || !formData.specification || !formData.uCount || !formData.powerSupplyCount || !formData.ratedPower || !formData.length || !formData.width || !formData.height || !formData.weight || !formData.bearing) {
      message.error('基本信息内容有误，请检查表单');
    }
    form.submit();
  }

  const beforeUpload = (file: RcFile/*, fileList: RcFile[]*/) => {
    // console.log('f', file)
    if (pictureListRef.current.length < 6) {
      pictureListRef.current.push({ uid: file.uid, file: file });
      setPictureCount(pictureListRef.current.length);
    }
    // let length = pictureList.length;
    // const newPictureList = [...pictureList];
    // fileList.forEach(f => {
    //   if (length < 6) {
    //     newPictureList.push({ uid: f.uid, file: f });
    //     length += 1;
    //   }
    // });
    // setPictureList(newPictureList);
    return false;
  };
  const onPictureRemove = (file: any) => {
    console.log('r', file);
    pictureListRef.current = pictureListRef.current.filter(item => item.uid !== file.uid);
    setPictureCount(pictureListRef.current.length);
    // setPictureList(pictureList.filter(item => item.uid !== file.uid));
  }

  const fileBeforeUpload = (file: RcFile) => {
    if (fileListRef.current.length < 8) {
      fileListRef.current.push({ uid: file.uid, file: file });
      setFileCount(fileListRef.current.length);
    }
    return false;
  };
  const onFileRemove = (file: any) => {
    fileListRef.current = fileListRef.current.filter(item => item.uid !== file.uid);
    setFileCount(fileListRef.current.length);
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
        <Tabs>
          <Tabs.TabPane tab='基本信息' key='1' forceRender={true}>
            <div className={styles.idLine}>
              <Form.Item
                name='uid'
                label='资产编号'
                rules={[{ required: true, message: '资产编号不能为空' }]}
              >
                <Input />
              </Form.Item>
              <a>自动生成</a>
            </div>
            <Form.Item
              name='name'
              label='机柜名称'
              rules={[{ required: true, message: '机柜名称不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='room'
              label='所在机房'
              rules={[{ required: true, message: '所在机房不能为空' }]}
            >
              <Select></Select>
            </Form.Item>
            <Form.Item
              name='column'
              label='所在列'
              rules={[{ required: true, message: '所在列不能为空' }]}
            >
              <Select></Select>
            </Form.Item>
            <Form.Item
              name='brand'
              label='品牌'
              rules={[{ required: true, message: '品牌不能为空' }]}
            >
              <Select showSearch></Select>
            </Form.Item>
            <Form.Item
              name='serialNumber'
              label='序列号'
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='specification'
              label='规格型号'
              rules={[{ required: true, message: '规格型号不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='uCount'
              label='U位总数'
              rules={[{ required: true, message: 'U位总数不能为空' }]}
            >
              <InputNumber precision={0} min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='powerSupplyCount'
              label='电源总数'
              rules={[{ required: true, message: '电源总数不能为空' }]}
            >
              <InputNumber precision={0} min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='ratedPower'
              label='额定功率(W)'
              rules={[{ required: true, message: '额定功率不能为空' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label='尺寸(CM)'
              required
            >
              <span>长</span>
              <Form.Item
                name='length'
                rules={[{ required: true, message: <></> }]}
                noStyle
              >
                <InputNumber min={0} />
              </Form.Item>
              <span>宽</span>
              <Form.Item
                name='width'
                rules={[{ required: true, message: <></> }]}
                noStyle
              >
                <InputNumber min={0} />
              </Form.Item>
              <span>高</span>
              <Form.Item
                name='height'
                rules={[{ required: true, message: <></> }]}
                noStyle
              >
                <InputNumber min={0} />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name='weight'
              label='自重(KG)'
              rules={[{ required: true, message: '自重不能为空' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='bearing'
              label='承重(KG)'
              rules={[{ required: true, message: '承重不能为空' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label={`实物照片(${pictureCount}/6)`}
              required
            >
              <Upload
                listType="picture-card"
                accept="image/png,image/jpeg,image/jpg"
                multiple
                maxCount={6}
                beforeUpload={beforeUpload}
                onRemove={onPictureRemove}
                className={styles.upload}
              >
                <PlusOutlined />
              </Upload>
            </Form.Item>
            <Form.Item
              label={`文件资料(${fileCount}/8)`}
            >
              <Upload
                listType="picture-card"
                multiple
                maxCount={8}
                beforeUpload={fileBeforeUpload}
                onRemove={onFileRemove}
                className={styles.upload}
              >
                <PlusOutlined />
              </Upload>
            </Form.Item>
            <Form.Item
              name='remarks'
              label='备注'
            >
              <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab='服务信息' key='2' forceRender={true}>
            <Form.Item
              name='purchaseType'
              label='购买类型'
            >
              <Radio.Group>
                <Radio value={1}>全新</Radio>
                <Radio value={2}>二手</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='purchaseDate'
              label='购买日期'
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='productionDate'
              label='出厂日期'
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='guaranteeDate'
              label='维保到期'
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='guaranteeRange'
              label='维保范围'
            >
              <Select>
                <Select.Option value={1}>全保</Select.Option>
                <Select.Option value={2}>只保配件</Select.Option>
                <Select.Option value={3}>只报维护</Select.Option>
              </Select>
            </Form.Item>
            <div className={styles.supplierRow}>
              <Form.Item
                name='supplier'
                label='供应商'
              >
                <Input readOnly bordered={false} />
              </Form.Item>
              <span>(可点击查看信息)</span>
              <a style={{ marginLeft: 12 }}>选择</a>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
