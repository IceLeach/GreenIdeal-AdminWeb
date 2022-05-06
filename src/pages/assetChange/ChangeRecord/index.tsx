import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, DatePicker, Space } from 'antd';
import EditDrawer from './components/EditDrawer';
// import styles from './index.less';

interface DataType {
  id: string;
  uid: string;
  name: string;
  time: string;
}

const originData: DataType[] = [
  {
    id: '1',
    uid: '100000',
    name: '申请人1',
    time: '2022-03-15 12:00',
  },
  {
    id: '2',
    uid: '100001',
    name: '申请人2',
    time: '2022-03-15 13:00',
  },
];

const ChangeRecord: React.FC = () => {
  const ref = useRef<ActionType>();
  const [editDrawerData, setEditDrawerData] = useState<{
    visible: boolean;
    data?: any;
  }>({ visible: false });

  const columns: ProColumns<DataType>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '单号',
      dataIndex: 'uid',
      render: (_, record) => (
        <>
          <a onClick={() => setEditDrawerData({ visible: true, data: record })}>
            {record.uid}
          </a>
        </>
      ),
    },
    {
      title: '申请人',
      dataIndex: 'name',
    },
    {
      title: '申请时间',
      dataIndex: 'time',
      renderFormItem: () => {
        return (
          <DatePicker.RangePicker
            placeholder={['开始时间', '结束时间']}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
          />
        );
      },
    },
    {
      title: '变更级别',
      dataIndex: 'level',
    },
    {
      title: '当前处理人',
      dataIndex: 'processor',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'state',
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
            <Button type="primary">添加申请</Button>
          </Space>
        }
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
      <EditDrawer
        visible={editDrawerData.visible}
        onClose={() => setEditDrawerData({ visible: false })}
        data={editDrawerData.data}
      />
    </>
  );
};

export default ChangeRecord;
