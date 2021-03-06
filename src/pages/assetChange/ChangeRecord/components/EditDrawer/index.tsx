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
      title={<span style={{ fontWeight: 'bold' }}>??????</span>}
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
          ??????
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
            label="??????"
            required
            className={styles.first}
            // rules={[{ required: true, message: '????????????????????????' }]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="level"
            label="????????????"
            className={styles.second}
            rules={[{ required: true, message: '????????????????????????' }]}
          >
            <Select>
              <Select.Option value={0}>????????????</Select.Option>
              <Select.Option value={1}>????????????</Select.Option>
              <Select.Option value={2}>????????????</Select.Option>
              <Select.Option value={3}>????????????</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            name="startTime"
            label="??????????????????"
            className={styles.first}
            rules={[{ required: true, message: '??????????????????????????????' }]}
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
            label="??????????????????"
            className={styles.second}
            rules={[{ required: true, message: '??????????????????????????????' }]}
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
          label="????????????"
          rules={[{ required: true, message: '????????????????????????' }]}
        >
          <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
        </Form.Item>
        <Form.Item
          name="step"
          label="????????????"
          rules={[{ required: true, message: '????????????????????????' }]}
        >
          <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
        </Form.Item>
        <Form.Item
          name="riskAnalysis"
          label="????????????"
          rules={[{ required: true, message: '????????????????????????' }]}
        >
          <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
        </Form.Item>
        <Form.Item
          name="fallbackScheme"
          label="????????????"
          rules={[{ required: true, message: '????????????????????????' }]}
        >
          <Input.TextArea maxLength={200} showCount style={{ height: 80 }} />
        </Form.Item>
        <Form.Item label={`??????(${pictureCount}/6)`}>
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
        <Form.Item label={`??????(${fileCount}/4)`}>
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
        <div>???????????????</div>
        <Button>????????????</Button>
        <div>????????????</div>
        <Form.Item label="????????????" required>
          <div></div>
        </Form.Item>
        <Form.Item label="?????????" required>
          <div>
            <a>??????</a>
          </div>
          <div></div>
        </Form.Item>
        <Form.Item label="?????????" required>
          <div>
            <a>??????</a>
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
                          <Input placeholder='????????????' style={{ width: 200 }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'state']}
                          fieldKey={[key, 'state']}
                          noStyle
                        >
                          <Input placeholder='????????????' style={{ width: 200 }} />
                        </Form.Item>
                        <a onClick={() => remove(name)}>??????</a>
                      </div>

                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => add()}
                >
                  ????????????
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
