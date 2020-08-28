import React, { Component } from 'react'
import { Row, Col, Input, Button, Select, Table, message, Form, DatePicker } from 'antd'
import { connect as order } from './orderManageModel'
import moment from 'moment'
import './order.scss'

const { RangePicker } = DatePicker
const Option = Select.Option

let timeoutId = 0
@order
@Form.create()
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stageStatus: '',
      serviceFee: '', // 扣除的费用
      divideClassStatus: '', // 分班状态
      expressStatus: '', // 邮递状态
      callStatus: '', //打电话状态
      refundType: 1, //退款类型
      exportShow: false, // 导出的modal是否显示
      loading: false,
      orderNo: '', // 订单编号
      courseName: '', // 课程名称
      phoneOrName: 'nameType', // 订单过滤筛选项 手机号或者姓名的select
      phoneOrNameVal: '', // 订单过滤项 手机号或者姓名的val
      orderDownTime: [], // 下单时间 过滤项 初始值 最近三个月
      orderStatus: 5, //订单状态
      payMethod: '', // 用户的支付类型过滤项
      purchseChannel: '', // 订单购买渠道
      //添加订单modal
      addModalVisible: false,
      //课程列表
      kechengList: [],
      selKcId: undefined,
      //课程列表
      riqiList: [],
      selriqi: undefined,
      //时段列表
      shiduanList: [],
      selsd: undefined,
      //价格
      selJg: undefined,
      //剩余数
      selsl: undefined,
      //用户
      userList: [],
      // 为了兼容之前的写法
      userListAll: []
    }
  }

  // 定义的表头
  columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName'
    },
    {
      title: '实付金额(元)',
      dataIndex: 'price',
      key: 'price',
      render: price => price + '元'
    },
    {
      title: '姓名',
      dataIndex: 'userRealName',
      key: 'userRealName',
      render: text => {
        if (text === '') {
          return '--'
        } else {
          return text
        }
      }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: text => {
        if (text === '') {
          return '--'
        } else {
          return text
        }
      }
    },
    {
      title: '下单时间',
      dataIndex: 'orderCreateByTime',
      key: 'orderCreateByTime',
      render: time => moment(time).format('YYYY-MM-DD HH:mm')
    },
    {
      title: '分班状态',
      dataIndex: 'divideClassStatus',
      key: 'divideClassStatus',
      render: val => (val === 0 ? <span style={{ color: 'red' }}>未分班</span> : val === 1 ? <span>已分班</span> : '-')
    },
    {
      title: '拨打状态',
      dataIndex: 'callStatus',
      key: 'callStatus',
      render: val => (val === 0 ? <span style={{ color: 'red' }}>未拨打</span> : val === 1 ? <span>已拨打</span> : '-')
    },
    {
      title: '物流状态',
      dataIndex: 'logisticsStatus',
      key: 'logisticsStatus',
      render: val => (val === 0 ? <span style={{ color: 'red' }}>未配置</span> : val === 1 ? <span>已配置</span> : '-')
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: status => this.judgeOrderStatus(parseInt(status))
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      key: 'orderType',
      render: type => this.judgeOrderType(parseInt(type))
    },
    {
      title: '购买渠道',
      dataIndex: 'channelName',
      key: 'channelName'
    },
    {
      title: '业绩归属人',
      dataIndex: 'belongUserName',
      key: 'belongUserName'
    },
    {
      title: '分期方式',
      dataIndex: 'periodType',
      key: 'periodType'
    }
  ]

  // 判断订单类型的方法
  // type字段为0是正规课订单， 大于0时时拼团活动订单
  judgeOrderType = type => {
    switch (type) {
      case 0:
        return '正规课订单'
      default:
        return '拼团活动订单'
    }
  }

  // 判断订单状态的方法
  judgeOrderStatus = status => {
    switch (status) {
      case 0:
        return <div style={{ color: '#ff0000' }}>已取消</div>
      case 1:
        return '待支付'
      case 2:
        return '已支付'
      case 3:
        return <div style={{ color: '#009b73' }}>已退款</div>
      case 4:
        return <div style={{ color: '#ff0000' }}>已失效</div>
      case 5:
        return <div style={{ color: '#ccc' }}>已完成</div>
      case 6:
        return '退款失败'
      case 7:
        return '订单退款中'
      case 8:
        return '支付失败'
      default:
        return ''
    }
  }

  // 判断支付方式， 目前只有微信的类型
  judgePayMethod = method => {
    switch (method) {
      case 1:
        return '微信'
      default:
        return ''
    }
  }

  // 退款金额单选框改变类型
  onRefundChange = e => {
    this.setState({
      refundType: e.target.value
    })
  }

  // 订单状态change事件
  handleStatusSelect = status => {
    this.setState(
      {
        orderStatus: status
      },
      () => {
        this.handleQueryList()
      }
    )
  }

  // 订单号change事件
  handleOrderNumChange = val => {
    this.setState({
      orderNo: val
    })
  }

  // 用户购买渠道change事件
  handleChannelSelect = channel => {
    this.setState(
      {
        purchseChannel: channel
      },
      () => {
        this.handleQueryList()
      }
    )
  }

  // 查询用户指定的订单
  handleSearch = async () => {
    //查表格数据
    await this.handleQueryList(1, 10, this.state.orderNo, this.state.orderStatus, this.state.purchseChannel)
  }
  //清空用户查询状态
  handleClearSearch = async () => {
    this.setState(
      {
        stageStatus: '', // 分期状态 0:不分期， 1:京东白条
        divideClassStatus: '', // 分班状态
        expressStatus: '', // 邮递状态
        callStatus: '', //打电话状态
        orderNo: '', // 订单编号
        courseName: '', // 课程名称
        phoneOrName: 'nameType', // 订单过滤筛选项 手机号或者姓名的select
        phoneOrNameVal: '', // 订单过滤项 手机号或者姓名的val
        orderDownTime: [], // 下单时间 过滤项 初始值 最近三个月
        orderStatus: '', //订单状态
        payMethod: '', // 用户的支付类型过滤项
        purchseChannel: '' // 订单购买渠道
      },
      () => {
        this.handleQueryList(1, 10)
      }
    )
  }

  //分页事件
  handlePageChange = async (page, pageSize) => {
    this.setState({ loading: true })
    await this.handleQueryList(page, pageSize)
    this.setState({ loading: false })
  }

  // 封装的统一查询订单列表方法
  handleQueryList = async (
    page = 1,
    pageSize = 10,
    id //订单id
  ) => {
    const params = {
      pageNum: page,
      pageSize,
      courseName: this.state.courseName,
      payMethod: this.state.payMethod,
      callStatus: this.state.callStatus,
      logisticsConfigStatus: this.state.expressStatus,
      divideClassStatus: this.state.divideClassStatus,
      periodType: this.state.stageStatus
    }

    if (!/^[0-9]*$/g.test(id) && id !== '' && id !== undefined) {
      message.error('订单编号仅能为数字组成！')
      return
    }

    if (this.state.orderDownTime[0]) {
      params.createOrderStart = this.state.orderDownTime[0].valueOf()
      params.createOrderEnd = this.state.orderDownTime[1].valueOf()
    }

    // 判断用户名还是手机号的搜索条件
    if (this.state.phoneOrName === 'phoneType') {
      params.mobile = this.state.phoneOrNameVal
    } else {
      params.userRealName = this.state.phoneOrNameVal
    }
    // 需要判断吗？
    if (id !== undefined && id !== '') {
      params.id = id
    }

    if (this.state.orderStatus !== undefined && this.state.orderStatus !== '') {
      params.orderStatuses = this.state.orderStatus
    }

    if (this.state.purchseChannel !== undefined && this.state.purchseChannel !== '') {
      params.channelId = this.state.purchseChannel
    }
    // 再次请求数据
    await this.props.queryOrderList(params)
  }
  //隐藏弹窗
  addModalCancel() {
    this.setState({
      addModalVisible: false
    })
  }
  //user选择操作，变化操作
  handleUserChange = user => {
    this.props.form.setFieldsValue({
      user
    })
  }

  handleOnSearch = value => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(async () => {
      //获取用户
      await this.props.getUser({
        userName: value
      })
      if (!this.props.getUserRes.status) return false
      const userList = this.props.getUserRes.data
      await this.setState({
        userList,
        userListAll: this.state.userListAll.concat(userList)
      })
    }, 500)
  }

  async componentDidMount() {
    //查询渠道下拉数据
    await this.props.getQudaoList()
    //页面初始化，查询数据
    if (!this.props.order_listResult.list) {
      //查询table列表数据
      this.handleQueryList()
    } else {
      // 保留用户查询和操作历史
      Object.keys(this.props.order_listResult.params).forEach(key => {
        if (key !== 'page' && key !== 'pageSize') {
          if (key === 'id') {
            this.setState({
              orderNo: this.props.order_listResult.params[key]
            })
          } else if (key === 'purchaseChannel') {
            this.setState({
              purchseChannel: this.props.order_listResult.params[key]
            })
          } else if (key === 'orderStatus') {
            this.setState({
              orderStatus: this.props.order_listResult.params[key]
            })
          }
        }
      })
    }
  }

  handleCoursenameChange = val => {
    this.setState({
      courseName: val
    })
  }

  handlePhoneOrNameChange = key => {
    this.setState({
      phoneOrName: key
    })
  }

  handlePhoneOrNameValChange = val => {
    this.setState({
      phoneOrNameVal: val
    })
  }

  handleOrderDownTimeChange = dates => {
    let orderDownTime = dates[0]
      ? [moment(dates[0].format('YYYY-MM-DD 00:00:00')), moment(dates[1].format('YYYY-MM-DD 23:59:59'))]
      : dates
    this.setState({ orderDownTime }, () => {
      this.handleQueryList()
    })
  }

  handlePayMethodChange = key => {
    this.setState(
      {
        payMethod: key
      },
      () => {
        this.handleQueryList()
      }
    )
  }

  handleExportCancel = () => {
    this.setState({
      exportShow: false
    })
  }

  handleCallStatusChange = key => {
    this.setState(
      {
        callStatus: key
      },
      () => {
        this.handleQueryList()
      }
    )
  }

  handleExpressStatusChange = key => {
    this.setState(
      {
        expressStatus: key
      },
      () => {
        this.handleQueryList()
      }
    )
  }

  handleDivideClassStatusChange = key => {
    this.setState(
      {
        divideClassStatus: key
      },
      () => {
        this.handleQueryList()
      }
    )
  }

  //分期change事件
  handleStageStatusChange = val => {
    this.setState(
      {
        stageStatus: val
      },
      () => {
        this.handleQueryList()
      }
    )
  }

  handleServiceFeeChange = e => {
    this.setState({
      serviceFee: e.target.value
    })
  }

  render() {
    return (
      <div className="order-content">
        <Filter
          stageStatus={this.state.stageStatus}
          divideClassStatus={this.state.divideClassStatus}
          expressStatus={this.state.expressStatus}
          callStatus={this.state.callStatus}
          orderNo={this.state.orderNo}
          courseName={this.state.courseName}
          phoneOrName={this.state.phoneOrName}
          phoneOrNameVal={this.state.phoneOrNameVal}
          orderDownTime={this.state.orderDownTime}
          orderStatus={this.state.orderStatus}
          payMethod={this.state.payMethod}
          purchseChannel={this.state.purchseChannel}
          statusList={this.props.selectData.orderStatuses}
          channelList={this.props.purchaseChannel}
          handleStageStatusChange={this.handleStageStatusChange}
          handleExpressStatusChange={this.handleExpressStatusChange}
          handleDivideClassStatusChange={this.handleDivideClassStatusChange}
          handleCallStatusChange={this.handleCallStatusChange}
          handleOrderNumChange={this.handleOrderNumChange}
          handleCoursenameChange={this.handleCoursenameChange}
          handlePhoneOrNameChange={this.handlePhoneOrNameChange}
          handlePhoneOrNameValChange={this.handlePhoneOrNameValChange}
          handleOrderDownTimeChange={this.handleOrderDownTimeChange}
          handleStatusSelect={this.handleStatusSelect}
          handlePayMethodChange={this.handlePayMethodChange}
          handleChannelSelect={this.handleChannelSelect}
          handleSearch={this.handleSearch}
          handleClearSearch={this.handleClearSearch}
        />
        <div className="tableWrapper">
          <Table
            rowKey="id"
            borderedz
            columns={this.columns}
            dataSource={(this.props.order_listResult && this.props.order_listResult.list) || []}
            loading={this.state.loading}
            pagination={{
              current: (this.props.order_listResult && this.props.order_listResult.page) || 1,
              total: (this.props.order_listResult && this.props.order_listResult.total) || 10,
              onChange: this.handlePageChange
            }}
          />
        </div>
      </div>
    )
  }
}

// 过滤的木偶组件
const Filter = ({
  stageStatus,
  divideClassStatus, // 处理订单z
  expressStatus, // 邮递状态
  callStatus, //打电话状态
  orderNo, // 订单号在页面中绑定的值
  courseName, // 订单查询的课程名称过滤项
  phoneOrName, // 手机号或者姓名 type变更
  phoneOrNameVal, // 手机号或者姓名 val变更
  orderDownTime, // 下单时间 数组
  orderStatus, // 订单状态在页面中绑定的值
  payMethod, // 用户的支付类型绑定的值
  purchseChannel, // 用户购买渠道在页面中绑定的值
  statusList, // 订单下拉框的固定数据
  channelList, // 渠道下拉框的固定数据
  handleStageStatusChange, // 分期点击事件
  handleDivideClassStatusChange, // 处理分班状态变更事件
  handleExpressStatusChange, // 处理邮件状态变更事件
  handleCallStatusChange, // 处理打电话事件
  handleOrderNumChange, // 处理订单号的变更事件
  handleCoursenameChange, // 处理课程名称变更事件
  handlePhoneOrNameChange, // select 选择手机号或者姓名
  handlePhoneOrNameValChange, // input 手机号或者姓名
  handleOrderDownTimeChange, // 处理下单时间 变更事件
  handleStatusSelect, // 处理订单状态变更事件
  handlePayMethodChange, // 处理订单支付类型的变更事件
  handleChannelSelect, // 处理渠道变更事件
  handleSearch, // 处理用户点击的搜索事件
  handleClearSearch
}) => {
  const handleDisableOrderDownTime = current => {
    return current && current > moment().endOf('day')
  }
  return (
    <div>
      <Row>
        <Col span={2} className="filter-left-parent">
          <div className={'filter-left'}>订单编号:</div>
        </Col>
        <Col span={4}>
          <Input
            placeholder="请输入订单编号"
            allowClear={true}
            value={orderNo}
            onChange={e => handleOrderNumChange(e.target.value)}
            onPressEnter={e => handleSearch(e.target.value)}
          />
        </Col>
        <Col span={2} style={{ paddingLeft: '12px' }} className="filter-left-parent">
          <div className={'filter-left'}>课程名称:</div>
        </Col>
        <Col span={4}>
          <Input
            value={courseName}
            allowClear={true}
            onChange={e => handleCoursenameChange(e.target.value)}
            placeholder="请输入课程名称"
            onPressEnter={e => handleSearch(e.target.value)}
          />
        </Col>
        <Col span={5} style={{ paddingLeft: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <Select style={{ width: '40%' }} value={phoneOrName} onChange={handlePhoneOrNameChange}>
            <Option key={Math.random()} value={'phoneType'}>
              手机号
            </Option>
            <Option key={Math.random()} value={'nameType'}>
              姓名
            </Option>
          </Select>
          <Input
            value={phoneOrNameVal}
            allowClear={true}
            placeholder="请输入查询值"
            onChange={e => handlePhoneOrNameValChange(e.target.value)}
            style={{ width: '59%' }}
            onPressEnter={e => handleSearch(e.target.value)}
          />
        </Col>
        <Col span={7} style={{ paddingLeft: '12px' }}>
          <Row>
            <Col span={8} className="filter-left-parent">
              <div className={'filter-left'}>下单时间:</div>
            </Col>
            <Col span={16} style={{ width: '74%' }}>
              <RangePicker
                allowClear={true}
                value={orderDownTime}
                onChange={handleOrderDownTimeChange}
                style={{ width: '100%' }}
                disabledDate={handleDisableOrderDownTime}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col span={2} className="filter-left-parent">
          <div className={'filter-left'}>订单状态:</div>
        </Col>
        <Col span={4}>
          <Select
            style={{ width: '100%' }}
            allowClear={false}
            value={orderStatus}
            onChange={key => handleStatusSelect(key)}
          >
            {statusList.map((d, index) => (
              <Option key={index} value={d.code}>
                {d.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={2} className="filter-left-parent" style={{ marginLeft: '12px' }}>
          <div className={'filter-left'}>支付类型:</div>
        </Col>
        <Col span={4}>
          <Select style={{ width: '100%' }} value={payMethod} onChange={handlePayMethodChange}>
            <Option key={Math.random()} value="">
              全部
            </Option>
            <Option key={Math.random()} value="0">
              系统创建
            </Option>
            <Option key={Math.random()} value="1">
              微信
            </Option>
          </Select>
        </Col>
        <Col span={2} className="filter-left-parent" style={{ marginLeft: '12px' }}>
          <div className={'filter-left'}>购买渠道:</div>
        </Col>
        <Col span={4} style={{ width: '13.6%' }}>
          <Select
            style={{ width: '100%' }}
            defaultValue={purchseChannel}
            allowClear={false}
            value={purchseChannel}
            onChange={key => handleChannelSelect(key)}
          >
            {[{ id: '', name: '全部' }, ...(channelList ?? [])].map((d, index) => (
              <Option key={index} value={d.id}>
                {d.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={2} className="filter-left-parent" style={{ marginLeft: '12px' }}>
          <div className={'filter-left'}>拨打状态:</div>
        </Col>
        <Col span={5}>
          <Select
            style={{ width: '100%' }}
            defaultValue={callStatus}
            allowClear={false}
            value={callStatus}
            onChange={key => handleCallStatusChange(key)}
          >
            {[
              { id: '', label: '全部' },
              { id: 0, label: '未拨打' },
              { id: 1, label: '已拨打' }
            ].map((d, index) => (
              <Option key={index} value={d.id}>
                {d.label}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col span={2} className="filter-left-parent">
          <div className={'filter-left'}>邮递状态:</div>
        </Col>
        <Col span={4}>
          <Select
            style={{ width: '100%' }}
            defaultValue={expressStatus}
            allowClear={false}
            value={expressStatus}
            onChange={key => handleExpressStatusChange(key)}
          >
            {[
              { id: '', label: '全部' },
              { id: 0, label: '未配置' },
              { id: 1, label: '已配置' }
            ].map((d, index) => (
              <Option key={index} value={d.id}>
                {d.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={2} className="filter-left-parent" style={{ marginLeft: '12px' }}>
          <div className={'filter-left'}>分班状态:</div>
        </Col>
        <Col span={4}>
          <Select
            style={{ width: '100%' }}
            defaultValue={divideClassStatus}
            allowClear={false}
            value={divideClassStatus}
            onChange={key => handleDivideClassStatusChange(key)}
          >
            {[
              { id: '', label: '全部' },
              { id: 0, label: '未分班' },
              { id: 1, label: '已分班' }
            ].map((d, index) => (
              <Option key={index} value={d.id}>
                {d.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={2} className="filter-left-parent" style={{ marginLeft: '12px' }}>
          <div className={'filter-left'}>分期方式:</div>
        </Col>
        <Col span={4}>
          <Select
            style={{ width: '100%' }}
            defaultValue={stageStatus}
            allowClear={false}
            value={stageStatus}
            onChange={key => handleStageStatusChange(key)}
          >
            {[
              { id: '', label: '全部' },
              { id: 0, label: '不分期' },
              { id: 1, label: '京东分期' }
            ].map((d, index) => (
              <Option key={index} value={d.id}>
                {d.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col offset={1} span={6}>
          <Button onClick={handleSearch} type="primary" style={{ marginRight: 15 }}>
            查询
          </Button>
          <Button onClick={handleClearSearch}>清空</Button>
        </Col>
      </Row>
    </div>
  )
}
