import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
import EditDrawer from './components/EditDrawer';
// import styles from './index.less';

interface DataType {
  id: string;
  name: string;
  time: string;
}

const originData: DataType[] = [
  {
    id: '1',
    name: '计划1',
    time: '2022-03-15 12:00',
  },
  {
    id: '2',
    name: '计划2',
    time: '2022-03-15 13:00',
  },
];

const InventoryPlan: React.FC = () => {
  const ref = useRef<ActionType>();
  const [editDrawerData, setEditDrawerData] = useState<{ visible: boolean, data?: any }>({ visible: false });
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const columns: ProColumns<DataType>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '计划名称',
      dataIndex: 'name',
    },
    {
      title: '开始日期',
      dataIndex: 'startTime',
      search: false,
    },
    {
      title: '结束日期',
      dataIndex: 'endTime',
      search: false,
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
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a>启动</a>
          <Divider type='vertical' />
          <a
            onClick={() => setEditDrawerData({ visible: true, data: record })}
          >
            编辑
          </a>
          <Divider type='vertical' />
          <a>
            删除
          </a>
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
          showSizeChanger: true,
        }}
        scroll={{ y: 450 }}
        actionRef={ref}
        rowKey='id'
        search={{
          defaultCollapsed: false,
          collapseRender: () => <></>,
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

export default InventoryPlan;
