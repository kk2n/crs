import { Modal, Divider, DatePicker, Radio, Row, Col, InputNumber, Button, Table, message } from 'antd'
import React, { Component } from 'react'
import API from '../../../utils/axios'
import moment from 'moment'
import { findObj, rejectObj } from 'ymcore/array'
import { intersection, reduce } from 'underscore'
import { replaceAll } from 'ymcore/string'
import { csGet } from 'ymcore/cookie'
export default class extends Component {
  state = {
    info: {},
    kss: undefined,
    yxq: {},
    index: 0,
    isLianxu: '0',
    lianxu: '',
    selTime: moment().format('YYYY-MM-DD'),
    selSD: null,
    selKSS: undefined,
    selTableData: [],
    //推荐课时
    tuijian: {
      hours: 1,
      only: 3,
      reason: 1
    }
  }
  async componentDidMount() {
    //请求订单详情
    let { data: info } = await API.get('/biz/sales/order/getOrderScheduleInfo', { contractId: this.props.orderId })
    await this.setState({
      info: {
        kss: info.remainingLessonCount,
        start: info.contractValidBegin,
        end: info.contractValidEnd,
        xy: info.studentName,
        xy2: info.refClientName,
        ls: info.teacherName,
        lsId: info.teacherId,
        clientId: info.clientId,
        refClientId: info.refClientId,
        gradeTypeId: info.gradeTypeId
      }
    })
    await this.setState({
      selTime: moment(this.state.info.start).isBefore(this.state.selTime) ? this.state.selTime : this.state.info.start
    })
    //请求订单详情
    this.getRList()
  }
  getRList = async () => {
    //请求订单详情
    let { data } = await API.post('/biz/sales/order/listEnhancedSchedules', {
      teacherId: this.state.info.lsId,
      lessonDate: this.state.selTime,
      clientId: this.state.info.clientId,
      refClientId: this.state.info.refClientId
    })
    this.setState({
      info: {
        ...this.state.info,
        ks: data.map(a => {
          return {
            id: a.scheduleId,
            shiduan: a.scheduleTime,
            isAvailable: a.isAvailable
          }
        })
      }
    })
  }
  queDing = async () => {
    if (!this.state.selSD) {
      message.error('时间段没有选择')
      return false
    }
    if (!this.state.selKSS) {
      message.error('没有选择课时')
      return false
    }
    //验证
    let { data, status } = await API.post('/biz/sales/order/preOrderSchedule', {
      lessonDate: this.state.selTime,
      teacherId: this.state.info.lsId,
      clientId: this.state.info.clientId,
      orderId: this.props.orderId,
      scheduleId: this.state.selSD.id,
      cycle: this.state.isLianxu === '1' ? Number(this.state.lianxu) : 1,
      hours: Number(this.state.selKSS)
    })
    if (!status) {
      return false
    }
    let msgArr = []
    let dataArr = []
    data.forEach(a => {
      if (a.code !== '000000') {
        msgArr.push(a.msg)
      } else {
        dataArr.push({
          key: a.data.lessonDate + a.data.startScheduleTime + a.data.endScheduleTime,
          rq: a.data.lessonDate,
          sd: a.data.startScheduleTime + '-' + a.data.endScheduleTime,
          sdId: a.data.scheduleIds,
          kss: a.data.hours
        })
      }
    })
    //验证重复
    let yy = this.state.selTableData.map(a => a.rq + ' ' + a.sd)
    let xx = dataArr.map(a => a.rq + ' ' + a.sd)
    let zz = intersection(xx, yy)
    if (zz.length > 0) return message.error('相同日期，相同时段不能重复提交')
    //设置表格
    this.setState({
      selTableData: [...this.state.selTableData, ...dataArr]
    })

    //如果有错误消息弹出
    if (msgArr.length) {
      msgArr.forEach((a, aa) => {
        setTimeout(() => {
          message.error(a)
        }, aa * 1000)
      })
    }
  }
  toSave = async params => {
    await this.props.isLoadingUp(true)
    let { status } = await API.post('/biz/sales/order/orderSchedule', { orderLessons: params })
    if (!status) {
      this.props.isLoadingUp(false)
      return false
    }
    await message.success('您的操作已成功！')
    await this.props.isLoadingUp(false)
    await this.props.pkModalShowUp(false)
    this.props.getList()
  }
  onSave = async () => {
    if (moment(this.state.info.end).isBefore(moment())) {
      //合同期过期了
      Modal.error({
        title: '排课错误',
        content: `时段不在合同有效期`,
        okText: '好的'
      })
      return false
    }
    if (!this.state.selTableData || this.state.selTableData.length === 0) {
      //没有选择时间段
      Modal.error({
        title: '排课错误',
        content: `请选择时间段后排课`,
        okText: '好的'
      })
      return false
    }
    let is24h = []
    let params = this.state.selTableData.map(a => {
      let time = a.rq + ' ' + a.sd.split('-')[0] + ':00'
      if (moment(time).isBefore(moment().add(1, 'days'))) is24h.push(true)
      return {
        scheduleIds: a.sdId,
        lessonDate: a.rq,
        hours: Number(a.kss),
        startScheduleTime: a.sd.split('-')[0],
        endScheduleTime: a.sd.split('-')[1]
      }
    })
    let arr = {
      userId: csGet('X-MSS-USERID'),
      orderId: this.props.orderId,
      totalHours: reduce(
        params.map(a => Number(a.hours)),
        (memo, num) => memo + num,
        0
      ),
      goldenSchedule: -1,
      dateValid: -1
    }
    params = replaceAll(JSON.stringify([arr, ...params]), '\\"', "'")
    if (is24h.length > 0) {
      Modal.info({
        title: '您所排的课程距离上课时间已不足24H，请确保与老师沟通并达成一致！',
        okText: '已与老师确认',
        onOk: () => this.toSave(params)
      })
    } else this.toSave(params)
  }
  //不可用日期
  disabledDate = current => {
    let startTime = moment(this.state.info.start).isBefore(moment()) ? moment() : moment(this.state.info.start) //合同开始时间是否早于当前时间
    return (
      current.isBefore(moment(startTime).subtract(moment(this.state.info.start).isBefore(moment()) ? 1 : 0, 'days')) ||
      current.isAfter(moment(this.state.info.end))
    )
  }
  render() {
    let h = [
      {
        title: '排课日期',
        dataIndex: 'rq',
        key: 'rq'
      },
      {
        title: '时间段',
        dataIndex: 'sd',
        key: 'sd'
      },
      {
        title: '课时数',
        dataIndex: 'kss',
        key: 'kss'
      },
      {
        title: '操作',
        dataIndex: 'key',
        key: 'key',
        render: key => (
          <a onClick={() => this.setState({ selTableData: rejectObj(this.state.selTableData, { key }) })}>删除</a>
        )
      }
    ]
    return (
      <Modal
        visible={this.props.OrderList.pkModalShow}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={880}
        footer={null}
        centered
      >
        <div className={'hanls-css'}>
          <ul>
            <li style={{ fontWeight: 700 }}>订单排课</li>
            <li>（剩余未排课时数：{this.state.info.kss}）</li>
          </ul>
          <ul>
            <li>
              请在合同有效期（<span style={{ color: '#f00' }}>{this.state.info.start}</span>至
              <span style={{ color: '#f00' }}>{this.state.info.end}</span>
              ）之内排课
            </li>
          </ul>
        </div>
        <Divider />
        <div style={{ overflow: 'hidden', height: 'auto', marginLeft: 20 }}>
          <div style={{ width: '50%', float: 'left' }}>
            <DatePicker
              value={moment(this.state.selTime)}
              disabledDate={this.disabledDate}
              allowClear={false}
              onChange={async v => {
                let selTime = moment(v).format('YYYY-MM-DD')
                await this.setState({ selTime })
                this.getRList()
              }}
            />
            &nbsp;&nbsp;
            {this.state.selTime}
            {moment(this.state.selTime).format('dddd')}
          </div>
          <div style={{ width: '50%', float: 'left', lineHeight: '32px' }}>
            学员：{this.state.info.xy}&nbsp;&nbsp;{this.state.info.xy2}&nbsp;&nbsp;老师：{this.state.info.ls}
          </div>
        </div>
        <Divider />
        <div style={{ marginLeft: 20 }}>
          <Radio.Group
            style={{ width: '100%' }}
            onChange={async v => {
              await this.setState({
                selSD: findObj(this.state.info.ks || [], { id: v.target.value })
              })
              let { data, status } = await API.post('/biz/sales/order/availableScheduleHours', {
                lessonDate: this.state.selTime,
                teacherId: this.state.info.lsId,
                clientId: this.state.info.clientId,
                contractId: this.props.orderId,
                scheduleId: this.state.selSD.id
              })
              if (!status) return false
              await this.setState({ tuijian: data })
              this.setState({ selKSS: `${data.hours}` })
            }}
          >
            <Row>
              {(this.state.info.ks || []).map((a, aa) => {
                return (
                  <Col span={6} key={aa} style={{ lineHeight: 2.5 }}>
                    <Radio value={a.id} disabled={!a.isAvailable}>
                      {a.shiduan}
                    </Radio>
                  </Col>
                )
              })}
            </Row>
          </Radio.Group>
        </div>
        <Divider />
        <div style={{ overflow: 'hidden', height: 'auto', marginLeft: 20 }}>
          <div style={{ width: '50%', float: 'left' }}>
            课时数：
            <Radio.Group value={this.state.selKSS} onChange={v => this.setState({ selKSS: v.target.value })}>
              {!this.state.info?.refClientId && (
                <Radio value={'1'} disabled={this.state.tuijian.only === 1}>
                  1课时
                </Radio>
              )}
              {(!this.state.info?.refClientId || this.state.info?.gradeTypeId === 1) && (
                <Radio value={'2'} disabled={this.state.tuijian.only === 1 || [22].includes(this.state.selSD?.id)}>
                  2课时
                </Radio>
              )}
              {(!this.state.info?.refClientId || this.state.info?.gradeTypeId === 2) && (
                <Radio value={'3'} disabled={[22, 21].includes(this.state.selSD?.id)}>
                  3课时
                </Radio>
              )}
            </Radio.Group>
          </div>
          <div style={{ width: '50%', float: 'left' }}>
            排课频率：
            <Radio
              value={'1'}
              checked={this.state.isLianxu === '1'}
              onClick={e => this.setState({ isLianxu: e.target.value })}
            >
              连续
            </Radio>
            {this.state.isLianxu === '1' && (
              <span>
                <InputNumber min={1} style={{ width: 70 }} onChange={v => this.setState({ lianxu: v })} />
                &nbsp;周
              </span>
            )}
            &nbsp;&nbsp;
            <Radio
              value={'0'}
              checked={this.state.isLianxu === '0'}
              onClick={e => {
                this.setState({
                  isLianxu: e.target.value,
                  lianxu: ''
                })
              }}
            >
              单次
            </Radio>
            <Button type="primary" onClick={this.queDing}>
              确定
            </Button>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table bordered rowKey={'key'} columns={h} dataSource={this.state.selTableData} pagination={false} />
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type="primary" onClick={this.onSave} loading={this.props.OrderList.isLoading}>
            确认排课
          </Button>
        </div>
      </Modal>
    )
  }
}
