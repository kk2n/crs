import React from 'react'
import API from '../../../../utils/axios'
import { Table } from 'ymcmp'
import { Empty, Popover } from 'antd'
let data = {
  executionStuNum: {
    title: '执行中学员数',
    des: (
      <>
        满足以下条件的 <br />
        （1）所有客户状态为执行中（包含结课两周）的学员 <br />
        （2）在查询时间段截止日期的数据
      </>
    )
  },
  lessonStuNum: {
    title: '上课学员数',
    des: (
      <>
        （1）学员名下所有正价课合同剩余课时数>=1 <br />
        （2）订单已消耗课时数>=1课时（消耗定义：已完成、¥请假、旷课）
      </>
    )
  },
  enrolledStuNum: {
    title: '在读学员数',
    des: <>（1）学员名下所有正价课合同剩余课时数>=1 的执行中学员（包含过期学员）-即有课时的学员</>
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
    title: '退费人数（新签+续费）',
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
  renewalPaidAmount: {
    title: '续费实收',
    des: <>（1）续费金额=续费-续费退费金额</>
  },
  finishPersonNum: {
    title: '正常结课人数',
    des: (
      <>
        查询时段内，满足以下条件的学员数量 <br />
        （1）学员的所有合同（不包含退费）最后一次的订单课的已完成状态发生在查询时段内-即常规的订单课全部消耗完毕且没有续费
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
  studentPerUnit: {
    title: '在读学员人均单科数',
    des: (
      <>
        满足以下条件的 <br />
        （1）【在读单科数】/【在读学员数】
      </>
    )
  },
  recommendedLeadsNum: {
    title: '推荐leads数',
    des: (
      <>
        满足以下条件的 <br />
        （1）leads来源为推荐渠道 <br />
        （2）推荐渠道优先（原其他渠道，手动关联绑定后按推荐渠道计算）
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
        （4)leads的渠道来源为推荐
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
        （4)leads的渠道来源为推荐
      </>
    )
  },
  crFollowNum: {
    title: '客服跟进次数',
    des: (
      <>
        满足以下条件的 <br />
        （1）每在系统填写并提交一次跟进记录算一次客户跟进数 <br />
        （2）角色为CR <br />
        （3）不去重
      </>
    )
  },
  duration: {
    title: '通话时长',
    des: (
      <>
        满足以下条件的 <br />
        （1）接通通话的时长累加
      </>
    )
  },
  dialNum: {
    title: '拨号次数',
    des: (
      <>
        满足以下条件的 <br />
        （1）点击拨号按钮的次数
      </>
    )
  },
  severalNum: {
    title: '接通数',
    des: (
      <>
        满足以下条件的 <br />
        （1）接通的次数
      </>
    )
  },
  connectionRate: {
    title: '接通率',
    des: (
      <>
        满足以下条件的 <br />
        （1）接通数/拨号次数
      </>
    )
  }
}
let colu = key => {
  return {
    title: data[key].des ? (
      <Popover content={data[key].des} title={data[key].title} trigger="hover">
        {data[key].title}
      </Popover>
    ) : (
      data[key].title
    ),
    dataIndex: key,
    key,
    width: 130,
    ...(data[key].render ? { render: data[key].render } : {})
  }
}
export default ({ m }) => {
  let columns = [
    {
      title: '组织',
      width: 160,
      fixed: 'left',
      dataIndex: 'orgName',
      key: 'orgName'
    },
    {
      title: '员工',
      width: 140,
      fixed: 'left',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '学员',
      children: [colu('executionStuNum'), colu('lessonStuNum'), colu('enrolledStuNum'), colu('studySubjectNum')]
    },
    {
      title: '续费',
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
      title: '续费实收',
      children: [colu('renewalPaidAmount')]
    },
    {
      title: '结课',
      children: [colu('finishPersonNum')]
    },
    {
      title: '课消',
      children: [colu('productionLessonNum'), colu('studentPerUnit')]
    },
    {
      title: '推荐',
      children: [colu('recommendedLeadsNum'), colu('recommendedSignNum'), colu('recommendedSignAmount')]
    },
    {
      title: '客户跟进数据',
      //children: [colu('crFollowNum') /*colu('duration'), colu('dialNum'), colu('severalNum'), colu('connectionRate')*/]
      children: [colu('crFollowNum')]
    }
  ]
  return m.getListParams ? (
    <Table
      scroll={{ x: 1200 }}
      bordered
      columns={columns}
      API={API}
      method={'post'}
      params={{
        ...m.initParams,
        ...m.getListParams
      }}
      url={'/reportservice/list/kpi/cr'}
    />
  ) : (
    <div style={{ border: '1px solid #ededed' }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'无数据,请选择条件查询'} />
    </div>
  )
}
