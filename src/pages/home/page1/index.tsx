import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import styles from './index.less';

interface DataType {
  id: string;
  name: string;
  time: string;
}

const originData: DataType[] = [
  {
    id: '1',
    name: '物品1',
    time: '2022-03-15 12:00',
  },
  {
    id: '2',
    name: '物品2',
    time: '2022-03-15 13:00',
  }
];

const page1: React.FC = () => {
  const ref = useRef<ActionType>();

  const columns: ProColumns<DataType>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
      // hideInForm: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '时间',
      dataIndex: 'time',
      valueType: 'dateTime',
      // search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="more"
        >
          详情
        </a>,
      ],
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
        rowKey="id"
        // request={() => Promise.resolve({
        //   data: [],
        //   success: true,
        // })}
        request={fetchData}
        scroll={{ y: 300 }}
        actionRef={ref}
        search={{
          defaultCollapsed: false,
          collapseRender: () => <></>,
          span: 6,
        }}
      />
    </>
  );
};

export default page1;
