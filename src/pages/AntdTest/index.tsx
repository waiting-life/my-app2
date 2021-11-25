import React, { useState } from 'react';
import {
  Divider,
  Space,
  Button,
  Affix,
  Steps,
  Cascader,
  Slider,
  Switch,
  Mentions,
  Rate,
  Carousel,
  Empty,
  Statistic,
  Row,
  Col,
  Card,
  Table,
  Tag,
  Radio,
  Tree,
  Alert,
  notification,
} from 'antd';
import {
  LikeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import { EllipsisOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { CheckCard } from '@ant-design/pro-card';

const { Step } = Steps;
const { Option } = Mentions;

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}
const columns1: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
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
    title: '创建者',
    dataIndex: 'creator',
    valueType: 'select',
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
    title: '操作',
    key: 'option',
    valueType: 'option',
    width: 120,
    render: () => [
      <a key="link">链路</a>,
      <a key="warn">报警</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

const AntdTest = () => {
  const [top, setTop] = useState(10);
  const [bottom, setBottom] = useState(10);
  const [disabled, setDisabled] = useState(false);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
    'checkbox',
  );
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    '0-0-0',
    '0-0-1',
  ]);
  // const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const handleDisabledChange = (disabled: boolean) => {
    setDisabled(disabled);
  };
  const handleChange = (value: any) => {
    console.log(value);
  };
  const onChange = (value: string) => {
    console.log('Change:', value);
  };
  const onSelect = (option: any) => {
    console.log('Select:', option);
  };
  const contentStyle: any = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cpp', 'www'],
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.name === 'Disabled User',
    //   name: record.name,
    // }),
    getCheckboxProps: (record: DataType) => {
      const disabled = record.name === 'Disabled User';
      const name = record.name;
      return {
        disabled,
        name,
      };
    },
  };
  const treeData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log(expandedKeysValue);
    console.log(typeof expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  // const onCheck = (checkedKeysValue: React.Key[]) => {
  //   console.log('onCheck', checkedKeysValue);
  //   setCheckedKeys(checkedKeysValue);
  // };
  const onSelect1 = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, 'I was closed.');
  };
  const openNotificationWithIcon = (type: string) => {
    notification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  return (
    <div>
      <h1>AntdTest页面</h1>
      <h2>Divider组件</h2>
      <p>想哭😭。。。。</p>
      <Divider />
      <p>加油加油！</p>
      <Divider dashed />
      <Space size={32}>
        <Button>问</Button>
        <Button>不问</Button>
        <Button>问</Button>
        <Button>不问</Button>
      </Space>
      <CheckCard.Group
    onChange={(value) => {
      console.log('value', value);
    }}
    defaultValue="A"
  >
    <CheckCard title="Card A" description="选项一" value="A" />
    <CheckCard title="Card B" description="选项二" value="B" />
    <CheckCard title="Card C" disabled description="选项三，这是一个不可选项" value="C" />
  </CheckCard.Group>
      <Affix offsetTop={top}>
        <Button type="primary" onClick={() => setTop(top + 10)}>
          Affix top
        </Button>
      </Affix>
      <Affix offsetBottom={bottom}>
        <Button type="primary" onClick={() => setBottom(bottom + 10)}>
          Affix bottom
        </Button>
      </Affix>
      <Steps size="small" current={1}>
        <Step title="Finished" />
        <Step title="In Progress" />
        <Step title="Waiting" />
      </Steps>
      <Steps direction="vertical" current={1}>
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
      <Cascader
        options={options}
        onChange={handleChange}
        placeholder="Please select"
      />
      <Slider defaultValue={30} disabled={disabled} />
      <Slider range defaultValue={[20, 50]} disabled={disabled} />, Disabled:
      <Switch size="small" checked={disabled} onChange={handleDisabledChange} />
      <Mentions
        style={{ width: '100%' }}
        onChange={onChange}
        onSelect={onSelect}
        defaultValue="@wqj"
      >
        <Option value="afc163">wqj</Option>
        <Option value="zombieJ">cpp</Option>
        <Option value="yesmeck">whj</Option>
      </Mentions>
      <Rate allowHalf defaultValue={2.5} />,
      <Carousel effect="fade" autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Active Users" value={112893} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Account Balance (CNY)"
            value={112893}
            precision={2}
          />
          <Button style={{ marginTop: 16 }} type="primary">
            Recharge
          </Button>
        </Col>
        <Col span={12}>
          <Statistic title="Active Users" value={112893} loading />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
        </Col>
        <Col span={12}>
          <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </Col>
      </Row>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          console.log(value);
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>
      <Divider />
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
      />
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        // onCheck={onCheck}
        // checkedKeys={checkedKeys}
        onSelect={onSelect1}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
      <Alert message="success message" type="success" />
      <Alert message="error message" type="error" />
      <Alert message="info message" type="info" />
      <Alert message="warning message" type="warning" />
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        onClose={onClose}
      />
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="error"
        closable
        onClose={onClose}
      />
      <Alert message="Success Tips" type="success" showIcon />
      <Alert message="Informational Notes" type="info" showIcon />
      <Alert message="Warning" type="warning" showIcon closable />
      <Alert message="Error" type="error" showIcon />
      <Alert
        message="Informational Notes"
        description="Additional description and information about copywriting."
        type="info"
        showIcon
      />
      <Space>
        <Button onClick={() => openNotificationWithIcon('success')}>
          Success
        </Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>
          Warning
        </Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </Space>
      <ProTable<TableListItem>
      columns={columns1}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        title: '标签',
        multipleLine: true,
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="响应日期" />
          </LightFilter>
        ),
        tabs: {
          items: [
            {
              key: 'tab1',
              tab: '标签一',
            },
            {
              key: 'tab2',
              tab: '标签二',
            },
          ],
        },
      }}
      rowKey="key"
    />

    </div>
  );
};

export default AntdTest;
