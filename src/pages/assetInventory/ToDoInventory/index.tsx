import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
// import styles from './index.less';

interface DataType {
  id: string;
  name: string;
  time: string;
}

const originData: DataType[] = [
  {
    id: '1',
    name: '任务1',
    time: '2022-03-15 12:00',
  },
  {
    id: '2',
    name: '任务2',
    time: '2022-03-15 13:00',
  },
];

const ToDoInventory: React.FC = () => {
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
      title: '任务名称',
      dataIndex: 'name',
    },
    {
      title: '盘点位置',
      dataIndex: 'address',
      search: false,
    },
    {
      title: '盘点类型',
      dataIndex: 'classification',
      search: false,
    },
    {
      title: '盘点执行人',
      dataIndex: 'executor',
      search: false,
    },
    {
      title: '截止日期',
      dataIndex: 'time',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'state',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => setEditDrawerData({ visible: true, data: record })}>
            查看
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
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any) => {
            setSelectedRowKeys(keys);
          },
        }}
        pagination={{
          pageSize: 20,
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
    </>
  );
};

export default ToDoInventory;
