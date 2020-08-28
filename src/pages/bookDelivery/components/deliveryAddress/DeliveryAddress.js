import React, { Component } from 'react'
import { Modal, message, Form, Cascader, Input, Divider } from 'antd'
import API from './../../../../utils/axios'
const BOOK_STATUS = {
  '1': '待确认',
  '2': '已确认'
}

@Form.create()
export default class DeliveryAddres extends Component {
  state = {
    provinceInfoList: [],
    addressInfo: {},
    visible: false
  }
  componentDidMount() {}

  // 获取省市区信息
  getProvinceInfo = async () => {
    let { data } = await API.get('/biz/coursepack/xzk/dict/provinceInfo/list')
    this.setState({ provinceInfoList: data })
  }

  // 获取地址信息
  getAddressInfo = async () => {
    let params = {
      id: this.props.data.id
    }
    let { data } = await API.get('/biz/coursepack/receiver/address/info', params)
    this.setState({ addressInfo: data })
  }

  showModal = (val, record) => {
    this.rowData = record
    this.getProvinceInfo()
    this.getAddressInfo()
    this.setState({ visible: true })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      provinceInfoList: [],
      addressInfo: {}
    })
  }

  // 修改收货地址
  doSave = () => {
    this.props.form.validateFields(async (err, fieldsValue) => {
      if (err) return
      let params = {
        id: this.props.data.id,
        provinceId: fieldsValue.districtId[0],
        cityId: fieldsValue.districtId[1],
        districtId: fieldsValue.districtId[2],
        detailAddress: fieldsValue.detailAddress,
        logisticsCompanyName: fieldsValue.logisticsCompanyName,
        trackingNumber: fieldsValue.trackingNumber,
        receiverName: fieldsValue.receiverName,
        phone: fieldsValue.phone,
        userId: this.props.data.studentId
      }
      // console.log(params, 'params')
      let { status, msg } = await API.post('/biz/coursepack/receiver/address/update', params)
      if (status) {
        this.handleCancel()
        await message.success(msg)
        this.props.getData({ a: new Date().getTime() })
      } else {
        message.error(msg)
      }
    })
  }
  render() {
    let { data = {} } = this.props
    const { getFieldDecorator } = this.props.form
    let { provinceInfoList = [], addressInfo = {} } = this.state
    return (
      <>
        <a onClick={this.showModal}>{this.renderBookStatus(data)}</a>
        <Modal
          width={600}
          title="收货地址"
          visible={this.state.visible}
          onOk={this.doSave}
          onCancel={this.handleCancel}
        >
          <Form
            onSubmit={this.handleSubmit}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
          >
            <Form.Item label="省市区" style={{ width: '45%' }}>
              {getFieldDecorator('districtId', {
                initialValue: [addressInfo.provinceId, addressInfo.cityId, addressInfo.districtId],
                rules: [{ type: 'array', required: true, message: '必填字段' }]
              })(
                <Cascader
                  fieldNames={{ label: 'name', value: 'id', children: 'basicDataDto' }}
                  disabled={addressInfo.bookStatus === 3}
                  options={provinceInfoList}
                />
              )}
            </Form.Item>
            <Form.Item label="详细地址" style={{ width: '45%' }}>
              {getFieldDecorator('detailAddress', {
                initialValue: addressInfo.detailAddress,
                rules: [{ required: true, message: '必填字段' }]
              })(<Input disabled={addressInfo.bookStatus === 3} />)}
            </Form.Item>
            <Form.Item label="收货人" style={{ width: '45%' }}>
              {getFieldDecorator('receiverName', {
                initialValue: addressInfo.receiverName,
                rules: [{ required: true, message: '必填字段' }]
              })(<Input disabled={addressInfo.bookStatus === 3} />)}
            </Form.Item>
            <Form.Item label="联系方式" style={{ width: '45%' }}>
              {getFieldDecorator('phone', {
                initialValue: addressInfo.phone,
                rules: [
                  { required: true, message: '必填字段' },
                  { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '联系电话格式有误！' }
                ]
              })(<Input disabled={addressInfo.bookStatus === 3} />)}
            </Form.Item>
            <Divider type="horizontal" />
            <Form.Item label="快递公司" style={{ width: '45%' }}>
              {getFieldDecorator('logisticsCompanyName', {
                initialValue: addressInfo.logisticsCompanyName,
                rules: [{ required: true, message: '必填字段' }]
              })(<Input disabled={addressInfo.bookStatus === 3} />)}
            </Form.Item>
            <Form.Item label="运单号" style={{ width: '45%' }}>
              {getFieldDecorator('trackingNumber', {
                initialValue: addressInfo.trackingNumber,
                rules: [{ required: true, message: '必填字段' }]
              })(<Input disabled={addressInfo.trackingNumber === 3} />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }

  //教材状态
  renderBookStatus = (obj = {}) => {
    if (obj.bookStatus === 3) {
      return `${obj.logisticsCompanyName}${obj.trackingNumber}`
    } else {
      return BOOK_STATUS[obj.bookStatus]
    }
  }
}
