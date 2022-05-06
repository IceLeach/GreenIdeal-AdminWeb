import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Select, Space } from 'antd';
import EditDrawer from './components/EditDrawer';
import styles from './index.less';

interface DataType {
  id: string;
  name: string;
  time: string;
}

const originData: DataType[] = [
  {
    id: '1',
    name: '设备1',
    time: '2022-03-15 12:00',
  },
  {
    id: '2',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
  {
    id: '3',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
  {
    id: '4',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
  {
    id: '5',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
  {
    id: '6',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
  {
    id: '7',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
  {
    id: '8',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
  {
    id: '9',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
  {
    id: '10',
    name: '设备2',
    time: '2022-03-15 13:00',
  },
];

const RackEquipment: React.FC = () => {
  const ref = useRef<ActionType>();
  const [editDrawerData, setEditDrawerData] = useState<{
    visible: boolean;
    data?: any;
  }>({ visible: false });
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const columns: ProColumns<DataType>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '资产编号',
      dataIndex: 'uid',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '资产分类',
      dataIndex: 'classification',
    },
    {
      title: '资产状态',
      dataIndex: 'state',
      renderFormItem: () => {
        return (
          <Select placeholder="请选择">
            <Select.Option value={1}>部署</Select.Option>
            <Select.Option value={2}>库存</Select.Option>
          </Select>
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => setEditDrawerData({ visible: true, data: record })}>
            编辑
          </a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  const fetchData = async (data: any) => {
    // console.log('data', data);
    // const res = await queryHistoryAll({
    //   cname: data.course ?? null,
    //   tname: data.teacher ?? null,
    //   edate: data.eetime ? data.eetime.replace(' ', 'T') : null,
    //   sdate: data.estime ? data.estime.replace(' ', 'T') : null,
    //   pageNum: data.current,
    //   pageSize: data.pageSize,
    //   csemester: null,
    //   cyear: null,
    //   tid: null,
    // });
    // console.log('res', res);
    return {
      data: originData,
      total: originData.length,
      success: true,
    };
  };

  return (
    <>
      <ProTable
        columns={columns}
        request={fetchData}
        headerTitle={
          <Space>
            <Button className={styles.btn}>添加设备</Button>
            <Button>批量删除</Button>
            <Button>打印二维码</Button>
            <Button>导出到Excel</Button>
          </Space>
        }
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any) => {
            setSelectedRowKeys(keys);
          },
        }}
        pagination={{
          pageSize: 1,
          size: 'default',
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        scroll={{ y: 450 }}
        actionRef={ref}
        rowKey="id"
        search={{
          span: 6,
        }}
      />
      <EditDrawer
        visible={editDrawerData.visible}
        onClose={() => setEditDrawerData({ visible: false })}
        data={editDrawerData.data}
      />
    </>
  );
};

export default RackEquipment;
