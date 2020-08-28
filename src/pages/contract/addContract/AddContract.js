import React, { Component } from 'react'
import { message, Form, Button, Input, DatePicker, InputNumber, /*Icon, Modal,*/ Checkbox } from 'antd'
import API, { domain } from '../../../utils/axios'
import { initial, compact } from 'underscore'
import moment from 'moment'
import './addContract.scss'
import { connect } from './addContractModel'
import { getUrl } from 'ymcmp/getUrl'
import { csSet } from 'ymcmp/cookie'
import UrlSel from 'ymcmp/lib/Select'
import 'ymcmp/lib/Select/index.css'

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
@connect
@Form.create()
export default class EditModal extends Component {
  state = {
    hasCao: false,
    cao: undefined,
    is1v2: false,
    selHetongType: null,
    selShangping: null,
    addSuccess: false,
    // isFenqi: false,
    hasLiping: false,
    info: {},
    item: [],
    index: 0,
    typeList: [],
    grade: [],
    getActivityList: [],
    giftList: [],
    objectList: [],
    cityList: [],
    date: {},
    //购买课时数
    lessonCount: '',
    //课时价格
    lessonPrice: {},
    //结束时间
    contractEndDate: '',
    //开始时间
    validBeginDate: '',
    //手动优惠
    baseDiscount: '',
    //赠送课时数
    freeLessonCount: '',
    //赠送课时价格
    freeLessonCountPrice: '',
    //当前礼物价值
    viewPrice: 0,
    discountPrice: 0,
    //是否新签
    newOrOld: '',
    // //合同类型
    // contractType: '',
    //日历可选
    disabled: true,
    selGrade: undefined,
    lpCaozuo: true,
    gradeNJ: false
  }
  async componentDidMount() {
    //年级读取权限
    let { data: gradeNJ } = await API.get('/biz/auth/operation/permission', {
      type: 'MIS_CONTRACT_GRADE_SELECT_UNLIMIT'
    })
    await this.setState({ gradeNJ })
    if (!gradeNJ) {
      this.props.form.setFieldsValue({
        gradeName: {
          label: getUrl('gradeName'),
          key: getUrl('gradeId')
        }
      })
      await this.setState({
        selGrade: {
          label: getUrl('gradeName'),
          key: getUrl('gradeId')
        }
      })
    }
    let leadsInfo = {
      //leads姓名
      realName: getUrl('clientName'),
      //leads编号
      clientFid: getUrl('clientId'),
      gradeName: getUrl('gradeName'),
      period: 1,
      isPeriod: 0,
      contractProp: 1
    }
    const { data: newOrOld } = await API.get('/biz/sales/contract/isNewOrOld', { clientFid: leadsInfo.clientFid })
    this.setState({
      // 用户的合同信息
      info: leadsInfo,
      //判断是合同新签还是续费
      newOrOld
    })
  }
  // //合同类型选择变化
  // contractTypeChange = a => {
  //   this.setState({
  //     contractType: a,
  //     disabled: !this.state.lessonCount
  //   })
  //   //清空课时
  //   this.props.form.setFieldsValue({
  //     lessonCount: ''
  //   })
  // }
  caoChange = async v => {
    const { data, status: ok } = await API.post('/biz/sales/contract/goods/price', {
      clientId: this.state.info?.clientFid,
      goodsId: this.state.selShangping?.key,
      gradeId: this.state.selGrade?.key,
      lessonHour: this.state.lessonCount,
      goodsTypeId: this.state.selHetongType?.key,
      selectCouponType: v?.target?.checked ? 1 : 0
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
    const value = parseInt(e?.target?.value)
    if (!value) {
      await message.error('只能填写数字', 1)
      this.props.form.setFieldsValue({ lessonCount: '' })
      this.setState({ hasCao: false })
      return false
    }
    if (!this.state.selHetongType) {
      message.error('商品类型未选', 1)
      this.props.form.setFieldsValue({ lessonCount: '' })
      return false
    }
    if (!this.state.selShangping) {
      message.error('商品未选', 1)
      this.props.form.setFieldsValue({ lessonCount: '' })
      return false
    }
    if (!this.state.selGrade) {
      message.error('年级未选择', 1)
      this.props.form.setFieldsValue({ lessonCount: '' })
      return false
    }

    //设置课时数
    await this.setState({ lessonCount: value })
    // if (value <= 60) {
    //   //this.props.form.setFieldsValue({ isPeriod: 0 })
    //   //this.setState({ isFenqi: false })
    // }
    //请求课时价格
    const { data, status } = await API.post('/biz/sales/contract/goods/price', {
      clientId: this.state.info?.clientFid,
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
    /*//请求课时价格
    const { data, status } = await API.post('/biz/sales/contract/goods/price', {
      clientId: this.state.info?.clientFid,
      goodsId: this.state.selShangping?.key,
      gradeId: this.state.selGrade?.key,
      lessonHour: value,
      goodsTypeId: this.state.selHetongType?.key,
      selectCouponType: 0
    })*/
    //设置价格
    await this.setState({
      lessonPrice: { ...data, maxDiscountPrice: data.discountPrice },
      disabled: !this.state.selShangping,
      lpCaozuo: false
    })
    if (!this.state.validBeginDate) return false
    const { data: contractEndDate } = await API.post('/biz/sales/contract/goods/contract/valid', {
      totalLessonCount: value,
      validBeginDate: this.state.validBeginDate,
      // gradeFid: this.state.selGrade?.key,
      goodsTypeId: this.state.selHetongType?.key
    })
    this.setState({ contractEndDate })
  }
  //表单提交
  handleSubmit = e => {
    e.preventDefault()
    //剩余优惠额度
    const remainingAmount = Math.floor(
      this.state.lessonPrice?.maxDiscountPrice -
        this.state.viewPrice -
        this.state.freeLessonCountPrice -
        this.state.baseDiscount
    )
    //赠送课，价格
    const freeLessonDiscountPrice =
      this.state.lessonPrice.totalPrice - this.state.lessonPrice?.maxDiscountPrice + remainingAmount

    if (remainingAmount < 0) {
      message.error('剩余优惠额度不能为负数')
      return false
    }
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) return false
      //格式化订单数据
      let dingdanArr = []
      for (let i = 0; i < this.state.index + 1; i++) {
        dingdanArr[i] = values[`object${i}`]?.key + '^' + values[`startTime${i}`] + '^' + values[`type${i}`]
      }
      let params = {
        ...values,
        ...this.state.lessonPrice,
        // ...addressInfo,
        freeLessonDiscountPrice,
        totalPrice: this.state.lessonPrice?.totalPrice,
        unitPrice: this.state.lessonPrice?.unitPrice,
        maxDiscountPrice: this.state.lessonPrice?.totalPrice - this.state.lessonPrice?.paymentPrice,
        //子订单数据
        contractPreOrder: dingdanArr,
        refClientId: values.refLeads?.key,
        //购买课程数
        buyLessonCount: this.state.lessonCount,
        lessonCount: this.state.lessonCount,
        giftAmount: this.state.viewPrice ? this.state.viewPrice : 0,
        giftIds: values.giftId && values.giftId.join(''),
        giftId: 0,
        //要求开课时间
        validBeginDate: moment(values.requestBeginDate).format('YYYY-MM-DD'),
        requestBeginDate: moment(values.requestBeginDate).format('YYYY-MM-DD'),
        // 判断是新签还是续费
        newOrOld: this.state.newOrOld,
        //剩余优惠额度
        remainingAmount: remainingAmount,
        //手动优惠价格
        baseDiscountPrice: this.state.baseDiscount,
        //leadsId
        clientFid: this.state.info.clientFid,
        //leads年级Id
        gradeFid: this.state.selGrade.key,
        gradeName: this.state.selGrade.label,
        //赠送课时数
        freeLessonCount: Number(values.freeLessonCount) || 0,
        validPeriod: 0,
        eventFlagNum: 0,
        addOrderPro1: 0,
        addOrderPro2: 0,
        //备注
        contractMemo: values.bz,
        goodsId: this.state.selShangping?.key,
        goodsTypeId: this.state.selHetongType?.key,
        selectCouponType: this.state.hasCao ? (values.cao?.[0] ? 1 : 0) : undefined
      }
      this.props.isLoadingUp(true)
      //新建合同提交
      let { status } = await API.post('/biz/sales/contract/addNewContract', params)
      if (!status) {
        this.props.isLoadingUp(false)
        return false
      }
      await this.props.isLoadingUp(false)
      await message.success('您的操作已成功！')
      csSet('isClose', true, 1, '/', domain)
      this.setState({ addSuccess: true })
    })
  }
  temp = type => [
    {
      // text: `（${type ? '正式课订单' : '赠送课订单'}）学科`,
      text: `（${type ? '订单' : '订单'}）学科`,
      className: 'order1',
      key: 'object',
      rules: [{ required: true, message: '请选择内容' }],
      component: <UrlSel style={{ width: 240 }} noMultiple API={API} url={'/biz/sales/dict/subject'} maxLength={30} />
    },
    {
      text: '初始课时数',
      className: 'order2',
      key: 'startTime',
      rules: [{ required: true, message: '请填写' }],
      component: <InputNumber min={0} max={60} style={{ width: 110 }} placeholder={'请填写课时数'} />
    },
    { className: 'order3', initialValue: type ? 1 : 2, key: 'type', component: <Input type={'hidden'} /> }
  ]
  //增加订单
  addOrder = type => {
    let item = [...this.state.item, ...this.temp(type)?.map(a => ({ ...a, key: a.key + (this.state.index + 1) }))]
    this.setState({ item, index: this.state.index + 1 })
  }
  //减少
  reduceOrder = () => {
    if (this.state.index < 1) {
      message.success('不能再减少了')
      return false
    }
    let item = initial(this.state.item, 3)
    this.setState({ item, index: this.state.index - 1 })
  }
  //选择开课日期
  onChange = async (date, dateString) => {
    if (!this.state.selHetongType || !this.state.selShangping || !this.state.selGrade) {
      message.warning('请先选择商品类型、商品、年级！')
      return false
    }
    const { data: contractEndDate } = await API.post('/biz/sales/contract/goods/contract/valid', {
      totalLessonCount: this.state.lessonCount,
      validBeginDate: dateString,
      // gradeFid: this.state.selGrade?.key,
      goodsTypeId: this.state.selHetongType?.key
    })
    this.setState({ contractEndDate, validBeginDate: dateString })
  }

  render() {
    let disabledDate = current => current && current < moment().subtract(1, 'day')
    let { getFieldDecorator } = this.props.form
    let x = [
      {
        text: '学员信息',
        className: 'clientInfo',
        key: 'clientInfo',
        component: (
          <div className="top">
            <ul className="top-ul" style={{ padding: 0 }}>
              <li className="top-li">客户编号： {this.state.info && this.state.info.clientFid}</li>
              <li className="top-li">学员姓名： {this.state.info && this.state.info.realName}</li>
              <li className="top-li">当前年级： {this.state.info && this.state.info.gradeName}</li>
            </ul>
          </div>
        )
      },
      {
        text: '商品信息',
        className: 'contractInfo',
        key: 'contractInfo',
        component: <div />
      },
      {
        text: '商品类型',
        className: 'contract',
        key: 'shangpingType',
        rules: [{ required: true, message: '请选择商品类型' }],
        component: (
          <UrlSel
            style={{ width: 240 }}
            noMultiple
            API={API}
            disabled={!this.state.info?.clientFid}
            params={{ clientId: this.state.info?.clientFid }}
            url={'/biz/sales/contract/goods/type/list'}
            maxLength={30}
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
        rules: [{ required: true, message: '请选择商品' }],
        component: (
          <UrlSel
            style={{ width: 240 }}
            noMultiple
            method="post"
            disabled={!this.state.selHetongType}
            API={API}
            params={{ clientId: this.state.info?.clientFid, goodsTypeId: this.state.selHetongType?.key }}
            url={'/biz/sales/contract/goods/list'}
            maxLength={30}
            onChange={v => {
              this.props.form.setFieldsValue({ lessonCount: '' })
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
        rules: [{ required: true, message: '请选择' }],
        component: (
          <UrlSel
            disabled={!this.state.selShangping}
            style={{ width: 240 }}
            method="post"
            //disabled={!this.state.gradeNJ}
            noMultiple
            params={{ goodsId: this.state.selShangping?.key }}
            API={API}
            url={'/biz/sales/contract/goods/grade/list'}
            maxLength={30}
            onChange={val => {
              this.props.form.setFieldsValue({ lessonCount: '' })
              this.setState({ selGrade: val, lessonPrice: {}, hasCao: false })
            }}
          />
        )
      },
      {
        text: '购买课时数',
        className: 'contract',
        key: 'lessonCount',
        rules: [{ required: true, message: '请输入课时' }],
        component: (
          <InputNumber
            placeholder="请输入课时"
            onBlur={this.changeLessonCount}
            onChange={() => {
              this.setState({ hasCao: false })
            }}
            min={1}
            style={{ width: 110 }}
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
            key: 'cao',
            component: (
              <Checkbox.Group>
                <Checkbox value={1} onChange={v => this.caoChange(v)}>
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
        rules: [{ required: true, message: '请选择要求开课日期' }],
        component: (
          <DatePicker
            disabledDate={disabledDate}
            disabled={this.state.disabled}
            format={'YYYY-MM-DD'}
            onChange={this.onChange}
          />
        )
      },
      {
        text: '合同截至日期',
        className: 'contract',
        key: 'date',
        component: <span>{this.state.contractEndDate}</span>
      }
    ]
    let x4 = [
      {
        text: '（订单）学科',
        className: 'order1',
        key: 'object0',
        rules: [{ required: true, message: '请选择内容' }],
        component: <UrlSel style={{ width: 240 }} noMultiple API={API} url={'/biz/sales/dict/subject'} maxLength={30} />
      },
      {
        text: '初始课时数',
        className: 'order2',
        key: 'startTime0',
        rules: [{ required: true, message: '请填写内容' }],
        component: <InputNumber min={0} max={60} style={{ width: 120 }} placeholder={'请输入课时'} />
      },
      { className: 'order3', key: 'type0', initialValue: 1, component: <Input type={'hidden'} /> },
      ...this.state.item
    ]
    return !this.state.addSuccess ? (
      <div className="add-contract">
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          {compact(x).map((a, aa) => (
            <Form.Item label={a.text} className={a.className} key={aa}>
              {getFieldDecorator(a.key, { initialValue: a.initialValue, rules: a.rules })(a.component)}
              {a.other}
            </Form.Item>
          ))}
          <div className="pay" style={{ marginBottom: 20 }}>
            <span className="money">单价: ￥{this.state.lessonPrice?.unitPrice || ''}</span>
            <span className="money">课时总价: ￥{this.state.lessonPrice?.totalPrice || ''}</span>
            <span className="money">
              应付金额: ￥
              {Number(this.state.lessonPrice?.totalPrice - this.state.lessonPrice?.maxDiscountPrice) *
                (this.state.is1v2 ? 2 : 1) || ''}
            </span>
          </div>
          {x1.map((a, aa) => (
            <Form.Item label={a.text} className={a.className} key={aa}>
              {getFieldDecorator(a.key, { initialValue: a.initialValue, rules: a.rules })(a.component)}
              {a.other}
            </Form.Item>
          ))}
          <div style={{ margin: '20px 18px' }}>
            订单信息：（所有订单课时数之和必须等于合同总课时数且单个订单课时≤60）
          </div>
          {/*订单*/}
          {x4.map((a, aa) => (
            <Form.Item label={a.text} className={a.className} key={aa}>
              {getFieldDecorator(a.key, { initialValue: a.initialValue, rules: a.rules })(a.component)}
              {a.other}
            </Form.Item>
          ))}
          <div className="add">
            <Button type="primary" style={{ marginRight: 20 }} icon="plus" onClick={() => this.addOrder(1)}>
              增加订单
            </Button>
            {/*{Boolean(this.state.lessonPrice?.giveLessonHour) && (*/}
            {/*  <Button type={'ghost'} style={{ marginRight: 20 }} icon="plus" onClick={() => this.addOrder(0)}>*/}
            {/*    增加赠送课订单*/}
            {/*  </Button>*/}
            {/*)}*/}
            <Button icon="minus" onClick={this.reduceOrder}>
              删除
            </Button>
          </div>
          <Form.Item label={'合同备注'} className={'textarea'} key={'qw'}>
            {getFieldDecorator('bz', { initialValue: '', rules: [] })(
              <TextArea
                placeholder="家长的期望与关注点，希望安排的授课时间范围、频数和次数、cc的建议等信息（限300字）"
                maxLength={300}
                style={{ width: '100%', height: 120 }}
              />
            )}
          </Form.Item>
          <Form.Item label="" className={'noLabel'}>
            <Button type="primary" htmlType="submit" loading={(this.props.AddContract || {}).isLoading}>
              提交
            </Button>
            {/*<Button style={{ marginLeft: 20 }} onClick={() => this.props.showEditModalUp(false)}>*/}
            {/*取消*/}
            {/*</Button>*/}
          </Form.Item>
        </Form>
      </div>
    ) : (
      <div style={{ textAlign: 'center', paddingTop: 40 }} />
    )
  }
}
