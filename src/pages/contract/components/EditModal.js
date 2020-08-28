import React, { Component } from 'react'
import { Modal, message, Form, Button, Select, Input, DatePicker, InputNumber, Checkbox } from 'antd'
import API from '../../../utils/axios'
import moment from 'moment'
import UrlSel from 'ymcmp/lib/Select'
import 'ymcmp/lib/Select/index.css'
import { getUrl } from 'ymcmp/getUrl'
import { compact } from 'underscore'

const { Option } = Select
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 }
  }
}
const formItemLayout2 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 9 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 }
  }
}

@Form.create()
export default class EditModal extends Component {
  state = {
    hasCao: false,
    is1v2: false,
    selHetongType: null,
    selShangping: null,
    selGrade: null,
    info: {},
    subjectList: [],
    date: {},
    //购买课时数
    lessonCount: '',
    //课时价格
    lessonPrice: {},
    //结束时间
    contractEndDate: '',
    //开始事件
    validBeginDate: '',
    //手动优惠
    baseDiscount: '',
    //额外手动优惠价格
    extraDiscountPrice: '',
    //总的手动优惠
    allDiscount: '',
    //赠送课时数
    freeLessonCount: 0,
    //额外赠送课时数
    extraLessonCount: 0,
    //赠送课时价格
    freeLessonCountPrice: '',
    //赠送礼物价值
    giftAmount: '',
    //当前礼物价值
    viewPrice: '',
    //订单列表
    orderList: [],
    //年级id
    //判断新签或者续费
    newOrOld: '',
    lpInfo: true,
    hasGift: false,
    gradeNJ: false
  }
  async componentDidMount() {
    const { data } = await API.get('/biz/sales/contract/detail/get', { contractId: this.props.ContractList.contractId })
    //年级读取权限
    let { data: gradeNJ } = await API.get('/biz/auth/operation/permission', {
      type: 'MIS_CONTRACT_GRADE_SELECT_UNLIMIT'
    })
    await this.setState({ gradeNJ })
    if (!gradeNJ) {
      this.props.form.setFieldsValue({
        gradeName: {
          label: data.contractInfo.gradeName,
          key: data.contractInfo.gradeFid
        }
      })
    }
    const { data: data5 } = await API.get('/biz/sales/dict/subject')
    await this.setState({
      hasCao: data.contractInfo.selectCouponType === 0 || data.contractInfo.selectCouponType === 1,
      is1v2: Boolean(data.contractInfo.refClientId),
      //contractType: data.contractInfo.contractType,
      selHetongType: { key: data.contractInfo.goodsTypeId, label: data.contractInfo.goodsTypeName },
      selShangping: { key: data.contractInfo.goodsId, label: data.contractInfo.goodsName },
      selShangpingCode: { key: data.contractInfo.goodsId, label: data.contractInfo.goodsCode },
      // 用户的合同信息
      info: {
        ...data,
        contractInfo: {
          ...data.contractInfo,
          gradeName2: { key: data.contractInfo.gradeFid, label: data.contractInfo.gradeName }
        }
      },
      date: this.props.contractId
        ? { ...data.contractInfo, requestBeginDate: moment(data.contractInfo.requestBeginDate, 'YYYY-MM-DD') }
        : {},
      lessonCount: data.contractInfo?.lessonCount || '',
      extraLessonCount: data.contractInfo?.extraLessonCount || '',
      //获取grade
      selGrade: {
        key: data.contractInfo?.gradeFid,
        label: data.contractInfo?.gradeName
      },
      //
      lessonPrice: data.contractInfo
        ? {
            ...data.contractInfo,
            paymentPrice: data.contractInfo.actualPrice / (data.contractInfo.refClientId ? 2 : 1)
          }
        : {},
      //结束时间
      contractEndDate: data.contractInfo.validEndDate || '',
      //开始时间
      validBeginDate: data.contractInfo.validBeginDate,
      //赠送课时数
      freeLessonCount: data.contractInfo?.freeLessonCount || '',
      //学科列表
      subjectList: this.filterData1(data5),
      orderList: data.contractPreOrders ? data.contractPreOrders : []
    })
    this.ininData()
  }
  //为了取到默认的科目id
  filterData1 = arr => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].subjectFId = arr[i].subjectId
    }
    return arr
  }
  //初始化的价格数据
  ininData = async () => {
    let viewPrice = 0
    for (let i = 0; i < this.state.info.contractGiftInfo.length; i++) {
      viewPrice += this.state.info.contractGiftInfo[i].viewPrice
    }
    await this.setState({
      //当前礼物价格
      viewPrice,
      freeLessonCountPrice:
        (this.state.info.contractInfo.freeLessonCount + this.state.info.contractInfo.extraLessonCount) *
        this.state.info.contractInfo.unitPrice,
      allDiscount: this.state.baseDiscount + this.state.extraDiscountPrice
    })
    this.props.form.setFieldsValue({
      cao: [this.state.info?.contractInfo?.selectCouponType]
    })
  }
  caoChange = async v => {
    const { data, status: ok } = await API.post('/biz/sales/contract/goods/price', {
      clientId: this.state.info?.contractInfo?.clientFid,
      goodsId: this.state.selShangping?.key,
      gradeId: this.state.selGrade?.key,
      lessonHour: this.state.lessonCount,
      goodsTypeId: this.state.selHetongType?.key,
      selectCouponType: v.target.checked ? 1 : 0
    })
    if (!ok) {
      this.setState({ lessonPrice: {} })
      return false
    }
    //设置价格
    await this.setState({
      lessonPrice: { ...data, maxDiscountPrice: data.discountPrice },
      disabled: !this.state.selShangping,
      lpCaozuo: false
    })
  }
  //课时变化获取对应得价格
  changeLessonCount = async e => {
    const value = Number(e.target.value)
    //请求课时价格
    const { data, status } = await API.post('/biz/sales/contract/goods/price', {
      clientId: this.state.info?.contractInfo?.clientFid,
      goodsId: this.state.selShangping?.key,
      gradeId: this.state.selGrade?.key,
      lessonHour: value,
      goodsTypeId: this.state.selHetongType?.key,
      selectCouponType: 0
    })
    if (!status) {
      this.setState({ lessonPrice: {} })
      return false
    }
    if (data.isMeetGive === 1 || data.isMeetGive === 2) {
      await this.setState({ hasCao: true })
      this.props.form.setFieldsValue({ cao: [] })
    }

    await this.setState({
      lessonCount: value,
      lessonPrice: {
        ...data,
        //paymentPrice: data.paymentPrice,
        maxDiscountPrice: data.discountPrice
      },
      lpInfo: false
    })
    const { data: contractEndDate } = await API.post('/biz/sales/contract/goods/contract/valid', {
      totalLessonCount: value,
      validBeginDate: this.state.validBeginDate,
      // gradeFid: this.state.selGrade?.key,
      goodsTypeId: this.state.selHetongType?.key
    })
    this.setState({ contractEndDate })
    // const { data: contractEndDate } = await API.get('/biz/sales/contract/getContractEndDate', {
    //   validBeginDate: this.state.validBeginDate,
    //   gradeFid: this.state.selGrade?.key,
    //   totalLessonCount: value,
    //   contractType: 1
    // })
    // this.setState({ contractEndDate })
  }

  //表单提交
  handleSubmit = e => {
    //remainingAmount剩余优惠的额度
    // maxDiscountPrice 优惠上限
    // viewPrice当前礼物价值
    //freeLessonCountPrice赠送课时价格
    //baseDiscount手动优惠
    // 公式：剩余优惠的额度 = 优惠上限 - 当前礼物价值 - 赠送课时价格 - 手动优惠
    const remainingAmount =
      this.state.lessonPrice.maxDiscountPrice -
      this.state.viewPrice -
      this.state.freeLessonCountPrice -
      this.state.baseDiscount

    const freeLessonDiscountPrice =
      this.state.lessonPrice.totalPrice - this.state.lessonPrice.maxDiscountPrice + remainingAmount
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      // 格式化订单数据
      let dingdanArr = []
      for (let i = 0; i < this.state.orderList.length; i++) {
        dingdanArr[i] =
          values[`subjectId${i}`] + '^' + values[`lessonCount${i}`] + '^' + (values[`type${i}`] === 1 ? 1 : 2)
      }
      if (err) {
        this.props.isLoadingUp(false)
        return false
      }
      //点击提交按钮的发送数据
      let editData = {
        //...addressInfo,
        // ...this.state.lessonPrice,
        //...values,
        couponType: this.state.lessonPrice.couponType,
        giveLessonHour: this.state.lessonPrice.giveLessonHour,
        refClientId: values.refLeads?.key,
        discount: this.state.lessonPrice.discount,
        unitPrice: this.state.lessonPrice.unitPrice,
        discountPrice: this.state.lessonPrice?.discountPrice,
        paymentPrice:
          (this.state.lessonPrice?.totalPrice - this.state.lessonPrice?.maxDiscountPrice) * (this.state.is1v2 ? 2 : 1),
        totalPrice: this.state.lessonPrice?.totalPrice,
        isPeriod: 0,
        freeLessonDiscountPrice,
        maxDiscountPrice: this.state.lessonPrice?.maxDiscountPrice,
        //子订单列表
        contractPreOrder: dingdanArr,
        requestBeginDate: moment(values.requestBeginDate).format('YYYY-MM-DD'),
        gradeName: this.state.selGrade?.label,
        gradeFid: this.state.selGrade?.key,
        giftAmount: this.state.viewPrice || 0,
        contractId: this.props.ContractList.contractId,
        freeLessonCount: this.state.freeLessonCount,
        buyLessonCount: Number(values.lessonCount),
        lessonCount: this.state.lessonCount,
        extraDiscountPrice: Number(values.extraDiscountPrice),
        extraLessonCount: Number(values.extraLessonCount),
        giftIds: values.giftFid && values.giftFid.join(','),
        giftFid: null,
        giftInfo: null,
        validEndDate: this.state.contractEndDate,
        validBeginDate: moment(values.requestBeginDate).format('YYYY-MM-DD'),
        jjgPrice: 0,
        maxPeriodDiscountPrice: 0,
        unitPriceDiscount: 0,
        remainingAmount: remainingAmount || 0,
        contractValidDays: 0,
        baseDiscountPrice: this.state.baseDiscount || 0,
        contractMemo: this.state.info.contractInfo.contractMemo,
        goodsId: this.state.selShangping?.key,
        goodsTypeId: this.state.selHetongType?.key,
        //
        giftId: 0,
        newOrOld: 1,
        validPeriod: 0,
        eventFlagNum: 0,
        addOrderPro1: 0,
        addOrderPro2: 0,
        selectCouponType: this.state.hasCao ? (values.cao?.[0] ? 1 : 0) : undefined
      }
      this.props.isLoadingUp(true)
      let { status } = await API.post('/biz/sales/contract/updateContract', editData)
      if (!status) {
        this.props.isLoadingUp(false)
        return false
      }
      await this.props.isLoadingUp(false)
      this.props.showEditModalUp(false)
      await message.success('您的操作已成功！')
      this.props.getContractList()
    })
  }

  //增加订单
  addOrder = async type => {
    this.setState({
      orderList: [...this.state.orderList, { orderType: type === 1 ? 1 : 2 }]
    })
  }
  //减少
  reduceOrder = async () => {
    if (this.state.orderList.length < 2) {
      message.success('不能再减少了')
      return false
    }
    this.setState({
      orderList: [...this.state.orderList.slice(0, this.state.orderList.length - 1)]
    })
  }

  //选择开课日期
  onChange = async (date, dateString) => {
    const { data: contractEndDate } = await API.post('/biz/sales/contract/goods/contract/valid', {
      totalLessonCount: this.state.lessonCount,
      validBeginDate: dateString,
      // gradeFid: this.state.selGrade?.key,
      goodsTypeId: this.state.selHetongType?.key
    })
    this.setState({ contractEndDate, validBeginDate: dateString })
  }
  render() {
    const { contractInfo, clientInfo } = this.state.info
    if (contractInfo) {
      contractInfo.gradeName2 = contractInfo?.gradeName2 ? contractInfo.gradeName2 : {}
    }
    //remainingAmount剩余优惠的额度
    // maxDiscountPrice 优惠上限
    // viewPrice当前礼物价值
    //freeLessonCountPrice赠送课时价格
    //baseDiscount手动优惠
    // 公式：剩余优惠的额度 = 优惠上限 - 当前礼物价值 - 赠送课时价格 - 手动优惠
    // const remainingAmount =
    //   this.state.lessonPrice &&
    //   this.state.lessonPrice.maxDiscountPrice -
    //     this.state.viewPrice -
    //     //this.state.freeLessonCountPrice -
    //     this.state.baseDiscount
    const { getFieldDecorator } = this.props.form
    //以下x到x3用来渲染表单结构
    let x = [
      {
        text: '选择学员',
        className: 'clientInfo',
        key: 'clientInfo',
        component: (
          <div className="top">
            <ul className="top-ul">
              <li className="top-li">客户编号： {contractInfo?.clientFid}</li>
              <li className="top-li">学员姓名： {clientInfo?.realName}</li>
              <li className="top-li">当前年级： {contractInfo?.gradeName}</li>
            </ul>
          </div>
        )
      },
      {
        text: '合同信息',
        className: 'contractInfo',
        key: 'contractInfo',
        component: <div />
      },
      {
        text: '商品类型',
        className: 'contract',
        key: 'shangpingType',
        initialValue: { key: contractInfo?.goodsTypeId, label: contractInfo?.goodsTypeName },
        rules: [{ required: true, message: '请选择商品类型' }],
        component: (
          <UrlSel
            style={{ width: 240 }}
            noMultiple
            API={API}
            disabled={!this.state.info?.contractInfo?.clientFid}
            url={'/biz/sales/contract/goods/type/list'}
            maxLength={30}
            params={{ clientId: this.state.info?.contractInfo?.clientFid }}
            onChange={(v, list, obj) => {
              this.props.form.setFieldsValue({
                lessonCount: '',
                shangping: undefined,
                gradeName: undefined,
                refLeads: undefined
              })
              this.setState({
                selHetongType: v,
                is1v2: obj?.code === 'TWO',
                lessonPrice: {},
                selShangping: null,
                selGrade: null,
                hasCao: false
              })
            }}
          />
        )
      },
      {
        text: '选择商品',
        className: 'contract',
        key: 'shangping',
        initialValue: { key: contractInfo?.goodsId, label: contractInfo?.goodsName }, //data.contractInfo
        rules: [{ required: true, message: '请选择商品' }],
        component: (
          <UrlSel
            method="post"
            style={{ width: 240 }}
            noMultiple
            disabled={!this.state.selHetongType}
            API={API}
            params={{ clientId: this.state.info?.contractInfo?.clientFid, goodsTypeId: this.state.selHetongType?.key }}
            url={'/biz/sales/contract/goods/list'}
            maxLength={30}
            onChange={v => {
              this.props.form.setFieldsValue({ lessonCount: '' })
              this.props.form.setFieldsValue({ shangping: undefined })
              this.props.form.setFieldsValue({ gradeName: undefined })
              this.setState({ selShangping: v, lessonPrice: {}, selGrade: null, hasCao: false })
            }}
          />
        )
      },
      {
        text: '年级',
        className: 'contract',
        key: 'gradeName',
        initialValue: contractInfo?.gradeName2,
        rules: [{ required: true, message: '请选择' }],
        component: (
          <UrlSel
            style={{ width: 240 }}
            method="post"
            // disabled={!this.state.gradeNJ}
            noMultiple
            API={API}
            params={{ goodsId: this.state.selShangping?.key }}
            url={'/biz/sales/contract/goods/grade/list'}
            maxLength={30}
            onChange={v => {
              this.props.form.setFieldsValue({ lessonCount: '' })
              this.setState({ selGrade: v, lessonPrice: {}, hasCao: false })
            }}
          />
        )
      },
      {
        text: '购买课时数',
        className: 'contract',
        key: 'lessonCount',
        initialValue: contractInfo?.lessonCount,
        rules: [{ required: true, message: '请输入课时数' }],
        component: (
          <InputNumber
            placeholder={'请输入课时数'}
            min={1}
            style={{ width: 140 }}
            onChange={() => {
              this.setState({
                hasCao: false
              })
            }}
            onBlur={this.changeLessonCount}
          />
        ),
        other: (
          <span style={{ color: '#f00' }}>
            &nbsp;
            {Boolean(this.state.lessonPrice?.giveLessonHour) &&
              '优惠赠送：' + this.state.lessonPrice?.giveLessonHour + '课时'}
            {Boolean(this.state.lessonPrice?.discount) &&
              this.state.lessonPrice?.discount !== 100 &&
              '现金优惠：' + this.state.lessonPrice?.discount + '%'}
          </span>
        )
      },
      this.state.hasCao
        ? {
            text: '续费优惠送课时',
            className: 'contract',
            initialValue: contractInfo?.selectCouponType ? [contractInfo?.selectCouponType] : [],
            key: 'cao',
            component: (
              <Checkbox.Group>
                <Checkbox value={1} style={{ marginLeft: 8 }} onChange={v => this.caoChange(v)}>
                  是
                </Checkbox>
              </Checkbox.Group>
            )
          }
        : null,
      this.state.is1v2
        ? {
            text: '添加1v2学员',
            className: 'contract',
            initialValue: { key: contractInfo?.refClientId, label: contractInfo?.refClientName },
            key: 'refLeads',
            rules: [{ required: true, message: '请先择' }],
            component: (
              <UrlSel
                API={API}
                noMultiple
                placeholder="请输入关键字"
                url="/biz/sales/leads/list/id/name"
                params={{ clientId: getUrl('clientId'), keyword: this.state.keyword }}
                onSearch={keyword => this.setState({ keyword })}
              />
            )
          }
        : null
    ]
    let x1 = [
      {
        text: '要求开课日期',
        className: 'contract',
        key: 'requestBeginDate',
        rules: [{ required: true, message: '请选择开始时间' }],
        component: <DatePicker format={'YYYY-MM-DD'} onChange={this.onChange} />
      },
      {
        text: '合同截至日期',
        className: 'contract',
        key: 'date',
        component: <span>{contractInfo && this.state.contractEndDate}</span>
      }
    ]
    return (
      <Modal
        centered
        className="edit-modal"
        title="修改合同"
        visible={this.props.ContractList.showEditModal}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
        width={1100}
      >
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          {compact(x).map((a, aa) => (
            <Form.Item label={a.text} className={a.className} key={aa}>
              {getFieldDecorator(a.key, { rules: a.rules, initialValue: a.initialValue })(a.component)}
              {a.other}
            </Form.Item>
          ))}
          <div className="pay">
            <span className="money">单价: ￥{this.state.lessonPrice?.unitPrice}</span>
            <span className="money">课时总价: ￥{this.state.lessonPrice?.totalPrice}</span>
            <span className="money">
              应付金额: ￥
              {Number(this.state.lessonPrice?.totalPrice - this.state.lessonPrice?.maxDiscountPrice) *
                (this.state.is1v2 ? 2 : 1) || ''}
            </span>
          </div>
          <br />
          {x1.map((a, aa) => {
            return (
              <Form.Item label={a.text} className={a.className} key={aa}>
                {getFieldDecorator(a.key, { rules: a.rules, initialValue: contractInfo && this.state.date[a.key] })(
                  a.component
                )}
              </Form.Item>
            )
          })}
          <div style={{ padding: '20px 10px' }}>
            订单信息：（所有订单课时数之和必须等于合同总课时数且单个订单课时≤60）
          </div>
          {/* 渲染的是订单一块 */}
          {this.state.orderList &&
            this.state.orderList.map((a, index) => {
              return (
                <ul key={index} className={'edit-ul'}>
                  <li className="left">
                    <Form.Item
                      key={index}
                      // label={`（${a.orderType === 1 ? '正式' : '赠送'}课订单）学科`}
                      label={`（${a.orderType === 1 ? '' : ''}订单）学科`}
                      {...formItemLayout2}
                    >
                      {getFieldDecorator(`subjectId${index}`, {
                        rules: [{ required: true, message: '请选择' }],
                        initialValue: a.subjectFId
                      })(
                        <Select placeholder={'请选择'}>
                          {this.state.subjectList &&
                            this.state.subjectList.map(v => (
                              <Option key={v.subjectFId} value={v.subjectFId}>
                                {v.subjectName}
                              </Option>
                            ))}
                        </Select>
                      )}
                    </Form.Item>
                  </li>
                  <li className="left2">
                    <Form.Item key={index} label={'课时'} {...formItemLayout2}>
                      {getFieldDecorator(`lessonCount${index}`, {
                        rules: [{ required: true, message: '请输入课时' }],
                        initialValue: a.lessonCount
                      })(<InputNumber placeholder={'请输入课时'} min={0} max={60} style={{ width: 120 }} />)}
                    </Form.Item>
                  </li>
                  <li className="left" style={{ width: 100 }}>
                    <Form.Item key={index} label={''}>
                      {getFieldDecorator(`type${index}`, {
                        initialValue: a.orderType === 1 ? 1 : 0
                      })(<Input type={'hidden'} style={{ width: 120 }} />)}
                    </Form.Item>
                  </li>
                </ul>
              )
            })}
          <div className="add">
            <Button type="primary" style={{ marginRight: 20 }} icon="plus" onClick={() => this.addOrder(1)}>
              增加订单
            </Button>
            {/*{Boolean(this.state.lessonPrice?.giveLessonHour) && (*/}
            {/*  <Button type="primary" style={{ marginRight: 20 }} icon="plus" onClick={() => this.addOrder(0)}>*/}
            {/*    增加赠送课订单*/}
            {/*  </Button>*/}
            {/*)}*/}
            <Button icon="minus" onClick={this.reduceOrder}>
              删除
            </Button>
          </div>
          <Form.Item label="合同备注" className="textarea">
            <TextArea
              value={contractInfo && contractInfo.contractMemo}
              placeholder="家长的期望与关注点，希望安排的授课时间范围、频数和次数、cc的建议等信息（限300字）"
              maxLength={300}
              style={{ width: '100%', height: 120 }}
              onChange={e => {
                this.setState({
                  info: {
                    ...this.state.info,
                    contractInfo: {
                      ...this.state.info.contractInfo,
                      contractMemo: e.target.value
                    }
                  }
                })
              }}
            />
          </Form.Item>
          <Form.Item label="" className={'noLabel'}>
            <Button type="primary" htmlType="submit" loading={this.props.ContractList.isLoading}>
              提交
            </Button>
            <Button style={{ marginLeft: 20 }} onClick={() => this.props.showEditModalUp(false)}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
