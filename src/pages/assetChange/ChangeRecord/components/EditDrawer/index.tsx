import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Upload,
} from 'antd';
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
  const pictureListRef = useRef<{ uid: string; file: RcFile }[]>([]);
  const fileListRef = useRef<{ uid: string; file: RcFile }[]>([]);
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
    // const formData = new FormData();
    // formData.append('file', file);
  };
  const checkForm = () => {
    form.submit();
  };

  const beforeUpload = (file: RcFile /*, fileList: RcFile[]*/) => {
    // console.log('f', file)
    if (pictureListRef.current.length < 6) {
      pictureListRef.current.push({ uid: file.uid, file: file });
      setPictureCount(pictureListRef.current.length);
    }
    return false;
  };
  const onPictureRemove = (file: any) => {
    console.log('r', file);
    pictureListRef.current = pictureListRef.current.filter(
      (item) => item.uid !== file.uid,
    );
    setPictureCount(pictureListRef.current.length);
    // setPictureList(pictureList.filter(item => item.uid !== file.uid));
  };

  const fileBeforeUpload = (file: RcFile) => {
    if (fileListRef.current.length < 4) {
      fileListRef.current.push({ uid: file.uid, file: file });
      setFileCount(fileListRef.current.length);
    }
    return false;
  };
  const onFileRemove = (file: any) => {
    fileListRef.current = fileListRef.current.filter(
      (item) => item.uid !== file.uid,
    );
    setFileCount(fileListRef.current.length);
  };

  // const picturePreview = (file: any) => {
  //   console.log('file', file)
  // }

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
        <Button type="primary" onClick={() => checkForm()}>
          保存
        </Button>
      }
      width={1000}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className={styles.form}
      >
        <div className={styles.row}>
          <Form.Item
            name="uid"
            label="单号"
            required
            className={styles.first}
            // rules={[{ required: true, message: '资产编号不能为空' }]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="level"
            label="变更级别"
            className={styles.second}
            rules={[{ required: true, message: '变更级别不能为空' }]}
          >
            <Select>
              <Select.Option value={0}>标准变更</Select.Option>
              <Select.Option value={1}>一般变更</Select.Option>
              <Select.Option value={2}>重大变更</Select.Option>
              <Select.Option value={3}>紧急变更</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            name="startTime"
            label="变更开始时间"
            className={styles.first}
            rules={[{ required: true, message: '变更开始时间不能为空' }]}
          >
            <DatePicker
              showTime
              showHour
              showMinute
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="变更结束时间"
            className={styles.second}
            rules={[{ required: true, message: '变更结束时间不能为空' }]}
          >
            <DatePicker
              showTime
              showHour
              showMinute
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="reason"
          label="变更原因"
          rules={[{ required: true, message: '变更原因不能为空' }]}
        >
          <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
        </Form.Item>
        <Form.Item
          name="step"
          label="操作步骤"
          rules={[{ required: true, message: '操作步骤不能为空' }]}
        >
          <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
        </Form.Item>
        <Form.Item
          name="riskAnalysis"
          label="风险分析"
          rules={[{ required: true, message: '风险分析不能为空' }]}
        >
          <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
        </Form.Item>
        <Form.Item
          name="fallbackScheme"
          label="回退方案"
          rules={[{ required: true, message: '回退方案不能为空' }]}
        >
          <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
        </Form.Item>
        <Form.Item label={`图片(${pictureCount}/6)`}>
          <Upload
            listType="picture-card"
            accept="image/png,image/jpeg,image/jpg"
            multiple
            maxCount={6}
            // onPreview={picturePreview}
            beforeUpload={beforeUpload}
            onRemove={onPictureRemove}
            className={styles.upload}
          >
            <PlusOutlined />
          </Upload>
        </Form.Item>
        <Form.Item label={`附件(${fileCount}/4)`}>
          <Upload
            listType="picture-card"
            multiple
            maxCount={4}
            showUploadList={{
              showDownloadIcon: true,
              showPreviewIcon: false,
            }}
            fileList={[
              {
                uid: 'rc-upload-1650783545343-3',
                name: 'file.zip',
                type: 'application/x-zip-compressed',
                status: 'done',
                size: 13161205,
                url: 'http://www.baidu.com/xxx.zip',
              },
            ]}
            onChange={(i) => console.log('i', i)}
            beforeUpload={fileBeforeUpload}
            onRemove={onFileRemove}
            className={styles.upload}
          >
            <PlusOutlined />
          </Upload>
        </Form.Item>
        <div>变更的资产</div>
        <Button>添加资产</Button>
        <div>流程信息</div>
        <Form.Item label="发起申请" required>
          <div></div>
        </Form.Item>
        <Form.Item label="审批人" required>
          <div>
            <a>选择</a>
          </div>
          <div></div>
        </Form.Item>
        <Form.Item label="抄送人" required>
          <div>
            <a>选择</a>
          </div>
        </Form.Item>
        {/* <div>
          <Form.List name='changeItem'>
            {(fields, { add, remove }) => (
              <>
                <div>
                  {fields.map(({ key, name, ...restField }) => (
                    <div className={styles.dataLine} key={key}>
                      <div style={{ display: 'flex' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'id']}
                          fieldKey={[key, 'id']}
                          initialValue={null}
                          noStyle
                        // hidden
                        >
                          <Input placeholder='资产编号' style={{ width: 200 }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'state']}
                          fieldKey={[key, 'state']}
                          noStyle
                        >
                          <Input placeholder='资产状态' style={{ width: 200 }} />
                        </Form.Item>
                        <a onClick={() => remove(name)}>删除</a>
                      </div>

                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => add()}
                >
                  添加资产
                </Button>
              </>
            )}
          </Form.List>
        </div> */}
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
