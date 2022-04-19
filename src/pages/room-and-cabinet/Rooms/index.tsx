import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Space } from 'antd';
import React, { useRef, useState } from 'react';
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
    name: '机房1',
    time: '2022-03-15 12:00',
  },
  {
    id: '2',
    name: '机房2',
    time: '2022-03-15 13:00',
  },
];

const Rooms: React.FC = () => {
  const ref = useRef<ActionType>();
  const [editDrawerData, setEditDrawerData] = useState<{ visible: boolean, data?: any }>({ visible: false });

  const columns: ProColumns<DataType>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      search: false,
      // hideInForm: true,
    },
    {
      title: '机房名称',
      dataIndex: 'name',
    },
    {
      title: '所在区域',
      dataIndex: 'address',
    },
    {
      title: '最后更新',
      dataIndex: 'time',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <>
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
        rowKey='id'
        request={fetchData}
        headerTitle={
          <Space>
            <Button type='primary'>添加机房</Button>
            <Button>批量删除</Button>
          </Space>
        }
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
        }}
        scroll={{ y: 450 }}
        actionRef={ref}
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

export default Rooms;
