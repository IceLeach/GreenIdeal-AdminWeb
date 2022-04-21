import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Drawer, Form, Input, InputNumber, message, Tabs, Upload } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, EnvironmentOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { v4 as uuidv4 } from 'uuid';
import { RcFile } from 'antd/lib/upload';
import AmapBox from '../AmapBox';
import styles from './index.less';

interface EditDrawerProps {
  visible: boolean;
  onClose: () => void;
  data: any;
}

const columnData = [{ id: '1', name: 'A1' }, { id: '2', name: 'A2' }, { id: '3', name: 'A3' }, { id: '4', name: 'A4' }, { id: '5', name: 'A5' }];

const EditDrawer: React.FC<EditDrawerProps> = (props) => {
  const { visible, onClose, data } = props;
  const [form] = Form.useForm();
  const [amapVisible, setAmapVisible] = useState<boolean>(false);
  const pictureListRef = useRef<{ uid: string, file: RcFile }[]>([]);
  const [pictureCount, setPictureCount] = useState<number>(0);
  // const [pictureList, setPictureList] = useState<{ uid: string, file: RcFile }[]>([]);
  const [columnList, setColumnList] = useState<{ id: string, name: string }[]>(columnData);
  const [columnItemRowVisible, setColumnItemRowVisible] = useState<boolean>(false);
  const [columnItemInputValue, setColumnItemInputValue] = useState<string>('');
  const [columnEditRow, setColumnEditRow] = useState<string | null>(null);
  const [columnCheckedList, setColumnCheckedList] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      console.log('data', data);
    }
  }, [visible]);

  useEffect(() => {
    console.log('columnList', columnList)
  }, [columnList]);


  const onFinish = (value: any) => {
    console.log('value', value);
  }
  const checkForm = () => {
    const formData = form.getFieldsValue();
    console.log('form', formData, pictureListRef.current);
    if (!formData.name || !formData.address || !formData.building || !formData.floor || !formData.area || !formData.height) {
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

  const columnListSort = (props: any) => {
    const { oldIndex, newIndex } = props;
    // console.log('props', props)
    // @ts-ignore
    const newList = arrayMove([].concat(columnList), oldIndex, newIndex);
    setColumnList(newList);
  }
  const columnListAddData = () => {
    if (columnItemInputValue) {
      const newColumnList = [...columnList];
      newColumnList.push({ id: uuidv4(), name: columnItemInputValue });
      setColumnList(newColumnList);
      setColumnItemInputValue('');
      setColumnItemRowVisible(false);
    } else {
      message.warning('内容不能为空');
    }
  }
  const columnListRemoveItem = (list: string[]) => {
    const newColumnList = [...columnList];
    list.forEach(item => {
      if (newColumnList.find(i => i.id === item)) {
        newColumnList.splice(newColumnList.findIndex(i => i.id === item), 1);
      }
    });
    setColumnList(newColumnList);
  }
  const columnListChangeItem = (id: string, newName: string) => {
    if (newName) {
      const newColumnList = [...columnList];
      const item = newColumnList.find(i => i.id === id);
      if (item) {
        item.name = newName;
      }
      setColumnList(newColumnList);
      setColumnEditRow(null);
    } else {
      message.warning('内容不能为空');
    }
  }

  const DragHandle = SortableHandle(() => (
    <MenuOutlined className={styles.dragHandle} />
  ));
  const SortableItem = SortableElement((prop: any) => <div {...prop}></div>);
  const SortableContainers = SortableContainer(({ children }: any) => <div>{children}</div>);
  const DraggableContainer = (prop: any) => {
    const { handleSortEnd, handleSortStart, getContainer, onSortEnd, ...restProps } = prop;
    return (
      <SortableContainers
        useDragHandle
        disableAutoscroll
        lockToContainerEdges
        useWindowAsScrollContainer
        onSortStart={handleSortStart}
        helperClass="row-dragging"
        lockAxis="y"
        onSortEnd={onSortEnd}
        {...restProps}
      />
    );
  };

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
            <AmapBox visible={amapVisible} onClick={setAddress} onClose={() => setAmapVisible(false)} />
            <Form.Item
              name='building'
              label='所在楼栋'
              rules={[{ required: true, message: '所在楼栋不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='floor'
              label='所在楼层'
              rules={[{ required: true, message: '所在楼层不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='area'
              label='面积(m²)'
              rules={[{ required: true, message: '面积不能为空' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='height'
              label='层高(m)'
              rules={[{ required: true, message: '层高不能为空' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label={`机房照片(${pictureCount}/6)`}
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
          </Tabs.TabPane>
          <Tabs.TabPane tab='列信息' key='2' forceRender={true}>
            <DraggableContainer onSortEnd={columnListSort}>
              {columnList.map((d, i) => {
                let newName: string = d.name;
                return (
                  <SortableItem index={i} key={i} className={styles.sortRow}>
                    <div className={styles.columnSortRow}>
                      <Checkbox
                        checked={!!columnCheckedList.find(listItem => listItem === d.id)}
                        onChange={() => {
                          setColumnCheckedList(columnCheckedList.find(listItem => listItem === d.id) ? columnCheckedList.filter(item => item !== d.id) : [...columnCheckedList, d.id])
                        }}
                      />
                      <DragHandle />
                      {d.id === columnEditRow ? (
                        <>
                          <Input style={{ width: 500 }} defaultValue={d.name} onChange={(e) => newName = e.target.value} />
                          <CheckCircleFilled className={styles.confirmIcon} onClick={() => columnListChangeItem(d.id, newName)} />
                        </>
                      ) : (
                        <div style={{ minWidth: 500 }} onDoubleClick={() => setColumnEditRow(d.id)}>{d.name}</div>
                      )}
                      {d.id !== columnEditRow && (<CloseCircleFilled className={styles.deleteIcon} onClick={() => columnListRemoveItem([d.id])} />)}
                    </div>
                  </SortableItem>
                );
              })}
            </DraggableContainer>
            {columnItemRowVisible && (
              <div className={styles.newItemRow}>
                <Input className={styles.itemInput} value={columnItemInputValue} onChange={(e) => setColumnItemInputValue(e.target.value)} />
                <a className={styles.saveButton} onClick={columnListAddData}>保存</a>
                <a className={styles.cancelButton} onClick={() => setColumnItemRowVisible(false)}>取消</a>
              </div>
            )}
            <div className={styles.optionRow}>
              <a className={styles.newButton} onClick={() => setColumnItemRowVisible(true)}>新建</a>
              <a
                className={styles.deleteButton}
                onClick={() => {
                  columnListRemoveItem(columnCheckedList);
                  setColumnCheckedList([]);
                }}
              >
                删除
              </a>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='子系统信息' key='3' forceRender={true}></Tabs.TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
