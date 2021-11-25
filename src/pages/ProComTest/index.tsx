import React, { useState} from 'react'
import { WaterMark } from '@ant-design/pro-layout';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

const { Statistic, Divider } = StatisticCard;
const ProComTest = () => {
    const valueEnum = {
        0: 'close',
        1: 'running',
        2: 'online',
        3: 'error',
      };
      interface TableListItem {
        key: number;
        name: string;
        containers: number;
        creator: string;
        status: string;
        createdAt: number;
        memo: string;
      }
      const tableListDataSource: TableListItem[] = [];
      
      const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
      
      for (let i = 0; i < 10; i += 1) {
        tableListDataSource.push({
          key: i,
          name: 'AppName',
          containers: Math.floor(Math.random() * 20),
          creator: creators[Math.floor(Math.random() * creators.length)],
          status: valueEnum[Math.floor(Math.random() * 10) % 4],
          createdAt: Date.now() - Math.floor(Math.random() * 100000),
          memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
        });
      }
      const columns: ProColumns<TableListItem>[] = [
        {
          title: '应用名称',
          width: 80,
          dataIndex: 'name',
          render: (_) => <a>{_}</a>,
        },
        {
          title: '容器数量',
          dataIndex: 'containers',
          align: 'right',
          sorter: (a, b) => a.containers - b.containers,
        },
        {
          title: '状态',
          width: 80,
          dataIndex: 'status',
          initialValue: 'all',
          valueEnum: {
            all: { text: '全部', status: 'Default' },
            close: { text: '关闭', status: 'Default' },
            running: { text: '运行中', status: 'Processing' },
            online: { text: '已上线', status: 'Success' },
            error: { text: '异常', status: 'Error' },
          },
        },
        {
          title: '创建者',
          width: 80,
          dataIndex: 'creator',
          valueEnum: {
            all: { text: '全部' },
            付小小: { text: '付小小' },
            曲丽丽: { text: '曲丽丽' },
            林东东: { text: '林东东' },
            陈帅帅: { text: '陈帅帅' },
            兼某某: { text: '兼某某' },
          },
        },
        {
            title: (
              <>
                创建时间
                <Tooltip placement="top" title="这是一段描述">
                  <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                </Tooltip>
              </>
            ),
            width: 140,
            key: 'since',
            dataIndex: 'createdAt',
            valueType: 'date',
            sorter: (a, b) => a.createdAt - b.createdAt,
          },
          {
            title: '备注',
            dataIndex: 'memo',
            ellipsis: true,
            copyable: true,
          },
          {
            title: '操作',
            width: 180,
            key: 'option',
            valueType: 'option',
            render: () => [
              <a key="link">链路</a>,
              <a key="link2">报警</a>,
              <a key="link3">监控</a>,
              <TableDropdown
                key="actionGroup"
                menus={[
                  { key: 'copy', name: '复制' },
                  { key: 'delete', name: '删除' },
                ]}
              />,
            ],
          },
        ];
         
        const [responsive, setResponsive] = useState(false);
    return (
        <div>
            <h1>ProComponent测试页面</h1>
            <WaterMark content="汪汪汪">
                <ProTable<TableListItem>
                columns={columns}
                dataSource={tableListDataSource}
                rowKey="key"
                pagination={{
                    showQuickJumper: true,
                }}
                search={false}
                dateFormatter="string"
                headerTitle="表格标题"
                toolBarRender={false}
                />
            </WaterMark>

    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: '总流量(人次)',
            value: 601986875,
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '付费流量',
            value: 3701928,
            description: <Statistic title="占比" value="61.5%" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
              alt="百分比"
              width="100%"
            />
          }
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: '免费流量',
            value: 1806062,
            description: <Statistic title="占比" value="38.5%" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
              alt="百分比"
              width="100%"
            />
          }
          chartPlacement="left"
        />
      </StatisticCard.Group>
    </RcResizeObserver>
        </div>
    )
}

export default ProComTest
