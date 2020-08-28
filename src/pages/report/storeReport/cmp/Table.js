import React from 'react'
import API from '../../../../utils/axios'
import { Table } from 'ymcmp'
import { Empty, Popover } from 'antd'
let data = {
  ownLeadsNum: {
    title: '门店自有leads数',
    des: (
      <>
        满足以下条件的leads数去重： <br />
        （1）所有门店通过自己获取的leads的创建时间在查询日期范围内
      </>
    )
  },
  newTryPreviewNum: {
    title: '新签试听预排数',
    des: (
      <>
        满足以下条件的leads数去重： <br />
        （1）leads的新签试听课预排数，且试听排课预排时间在查询日期范围内
      </>
    )
  },
  newTryAttendNum: {
    title: '新签试听出席数',
    des: (
      <>
        满足以下条件的leads数去重： <br />
        （1）leads的新签试听课课程状态为【完成】且试听课上课时间在查询日期范围内
      </>
    )
  },
  newSignNum: {
    title: '新签人数',
    des: (
      <>
        满足以下条件的合同对应的客户数:（userid去重） <br />
        （1）合同属性为新签 <br />
        （2）合同的全款支付时间在对应查询日期内 <br />
        （3）首次支付的正价课，无论有没有课消
      </>
    )
  },
  newSignAmount: {
    title: '新签金额',
    des: (
      <>
        即满足以下条件的合同的实付金额之和 <br />
        （1）合同属性为新签 <br />
        （2）合同的全款支付时间在对应查询日期内 <br />
        （3）首次支付的正价课，无论有没有课消
      </>
    )
  },
  newCourseNum: {
    title: '新签课时数',
    des: (
      <>
        即满足以下条件的合同的课时数 <br />
        （1）合同属性为新签 <br />
        （2）合同的全款支付时间在对应查询日期内 <br />
        （3）该笔合同购买课时数+该笔合同常规赠送课时数
      </>
    )
  },
  renewalNum: {
    title: '续费人数',
    des: (
      <>
        满足以下条件的合同对应的客户数（userid去重） <br />
        （1）合同属性为续费 <br />
        （2）合同的全款支付时间在对应查询日期内 <br />
        （3）除首次支付的正价课，无论有没有课消的合同都算续费人数
      </>
    )
  },
  renewalAmount: {
    title: '续费金额',
    des: (
      <>
        即满足以下条件的合同的实付金额之和 <br />
        （1）合同属性为续费 <br />
        （2）合同的全款支付时间在对应查询日期内 <br />
        （3）除首次支付的正价课，无论有没有课消的合同都算续费人数
      </>
    )
  },
  renewalCourseNum: {
    title: '续费课时数',
    des: (
      <>
        即满足以下条件的合同的课时数 <br />
        （1）合同属性为续费 <br />
        （2）合同的全款支付时间在对应查询日期内 <br />
        （3）该笔合同购买课时数+该笔合同常规赠送课时数
      </>
    )
  },
  refundPersonNum: {
    title: '退费人数',
    des: (
      <>
        满足以下条件的合同的客户数 <br />
        （1）合同发生退费 <br />
        （2）退费时间处于查询时间之内 <br />
        （3）退费合同属性为【新签合同】+【续费合同】 <br />
        （4）学员去重
      </>
    )
  },
  newRefundAmount: {
    title: '新签退费金额',
    des: (
      <>
        满足以下条件的合同的退费金额之和， <br />
        （1）合同发生退费 <br />
        （2）退费完成时间处于查询时间之内 <br />
        （3）退费合同属性为【新签合同】
      </>
    )
  },
  renewalRefundAmount: {
    title: '续费退费金额',
    des: (
      <>
        满足以下条件的合同的退费金额之和， <br />
        （1）合同发生退费 <br />
        （2）退费完成时间处于查询时间之内 <br />
        （3）退费合同属性为【续费合同】
      </>
    )
  },
  totalRefundAmount: {
    title: '总退费金额',
    des: (
      <>
        满足以下条件的合同的退费金额之和， <br />
        （1）合同发生退费 <br />
        （2）退费完成时间处于查询时间之内 <br />
        （3）退费合同属性为【新签合同】+【续费合同】
      </>
    )
  },
  newRefundCourseNum: {
    title: '新签退费课时数',
    des: (
      <>
        满足以下条件的合同的退费课时数之和， <br />
        （1）合同发生退费 <br />
        （2）退费完成时间处于查询时间之内 <br />
        （3）退费合同属性为【新签合同】 <br />
        （4）退费课时数包含：购买课时+常规赠送课时
      </>
    )
  },
  renewalRefundCourseNum: {
    title: '续费退费课时数',
    des: (
      <>
        满足以下条件的合同的退费课时数之和， <br />
        （1）合同发生退费 <br />
        （2）退费完成时间处于查询时间之内 <br />
        （3）退费合同属性为【续费合同】 <br />
        （4）退费课时数包含：购买课时+常规赠送课时
      </>
    )
  },
  totalRefundCourseNum: {
    title: '总退费课时数',
    des: (
      <>
        满足以下条件的合同的退费课时数之和， <br />
        （1）合同发生退费 <br />
        （2）退费完成时间处于查询时间之内 <br />
        （3）退费合同属性为【新签合同】+【续费合同】 <br />
        （4）退费课时数包含：购买课时+常规赠送课时
      </>
    )
  },
  newSignPaidAmount: {
    title: '新签实收',
    des: <>（1）新签实收=新签金额-新签退费金额</>
  },
  renewalPaidAmount: {
    title: '续费实收',
    des: <>（1）续费金额=续费-续费退费金额</>
  },
  totalPaidAmount: {
    title: '总销售实收',
    des: <>（1）新签金额-新签退费金额+续费金额-续费退费金额</>
  },
  finishPersonNum: {
    title: '正常结课人数',
    des: (
      <>
        查询时段内，满足以下条件的学员数量 <br />
        （1）学员的所有合同（不包含退费）最后一次的订单课的已完成状态发生在查询时段内-即常规的订单课全部消耗完毕且没有续费。{' '}
        <br />
        （2）学员名下所有合同剩余课时数=0
      </>
    )
  },
  productionLessonNum: {
    title: '生产课时数',
    des: (
      <>
        对应个人/团队下，满足以下条件的课程的课时数之和： <br />
        （1）课程实际上课时间在查询时段内 <br />
        （2）课程属性为订单课（不含399课时消耗） <br />
        （3）课程为（完成|旷课|￥请假）
      </>
    )
  },
  studySubjectNum: {
    title: '在读单科数',
    des: (
      <>
        满足以下条件的订单的学员*科目数（去重） <br />
        （1）截至查询时段末订单状态为（待排课|停课|执行中） <br />
        （2）去除虚拟科目-PMTR
      </>
    )
  },
  recommendedSignNum: {
    title: '推荐签约人数',
    des: (
      <>
        满足以下条件： <br />
        （1）合同属性为新签 <br />
        （2）合同的全款支付时间在对应查询日期内 <br />
        （3）首次支付的正价课，无论有没有课消 <br />
        （4）leads的渠道来源为推荐
      </>
    )
  },
  recommendedSignAmount: {
    title: '推荐签约金额',
    des: (
      <>
        即满足以下条件的合同的实付金额之和 <br />
        （1）合同属性为新签 <br />
        （2）合同的全款支付时间在对应查询日期内 <br />
        （3）首次支付的正价课，无论有没有课消 <br />
        （4）leads的渠道来源为推荐
      </>
    )
  },
  recommendedSendNum: {
    title: '推荐赠送课时数',
    des: (
      <>
        即满足以下条件的合同的课时数 <br />
        （1）合同属性为赠送（包含推荐方和被推荐方） <br />
        （2）合同的创建时间在对应日期内 <br />
        （3）首次支付的正价课，无论有没有课消 <br />
        （4）leads的渠道来源为推荐
      </>
    )
  },
  sendNum: {
    title: '赠送课时数',
    des: (
      <>
        （1）单独由超管账号创建的赠送合同课时数+门店创建的MGM赠送课时数 <br />
        （2）查询日期范围内
      </>
    )
  }
}
let colu = key => {
  return {
    title: (
      <Popover content={data[key].des} title={data[key].title} trigger="hover">
        {data[key].title}
      </Popover>
    ),
    dataIndex: key,
    key,
    width: 130
  }
}
export default ({ m }) => {
  let columns = [
    {
      title: '名称',
      dataIndex: 'orgName',
      key: 'orgName',
      width: 220,
      fixed: 'left'
    },
    {
      title: '引流课',
      children: [
        {
          title: '引流人数',
          dataIndex: 'attractPersonNum',
          key: 'attractPersonNum',
          width: 130
        },
        {
          title: '引流金额',
          dataIndex: 'attractAmount',
          key: 'attractAmount',
          width: 130
        },
        {
          title: '引流课时数',
          dataIndex: 'attractLessonNum',
          key: 'attractLessonNum',
          width: 130
        }
      ]
    },
    {
      title: '新签数据',
      children: [
        colu('ownLeadsNum'),
        colu('newTryPreviewNum'),
        colu('newTryAttendNum'),
        colu('newSignNum'),
        colu('newSignAmount'),
        colu('newCourseNum')
      ]
    },
    {
      title: '续费数据',
      children: [colu('renewalNum'), colu('renewalAmount'), colu('renewalCourseNum')]
    },
    {
      title: '退费数据',
      children: [
        colu('refundPersonNum'),
        colu('newRefundAmount'),
        colu('renewalRefundAmount'),
        colu('totalRefundAmount'),
        colu('newRefundCourseNum'),
        colu('renewalRefundCourseNum'),
        colu('totalRefundCourseNum')
      ]
    },
    {
      title: '销售实收数据',
      children: [colu('newSignPaidAmount'), colu('renewalPaidAmount'), colu('totalPaidAmount')]
    },
    {
      title: '结课',
      children: [colu('finishPersonNum')]
    },
    {
      title: '生产数据',
      children: [colu('productionLessonNum'), colu('studySubjectNum')]
    },
    {
      title: '推荐数据',
      children: [colu('recommendedSignNum'), colu('recommendedSignAmount'), colu('recommendedSendNum')]
    },
    {
      title: '赠送数据',
      children: [colu('sendNum')]
    }
  ]
  return m.getListParams ? (
    <Table
      method={'post'}
      scroll={{ x: 1200 }}
      bordered
      columns={columns}
      API={API}
      params={{
        ...m.initParams,
        ...m.getListParams
      }}
      url={'/reportservice/list/store/operate'}
    />
  ) : (
    <div style={{ border: '1px solid #ededed' }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'无数据,请选择条件查询'} />
    </div>
  )
}
