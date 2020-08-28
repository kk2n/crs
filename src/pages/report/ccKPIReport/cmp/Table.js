import React from 'react'
import API from '../../../../utils/axios'
import { Table } from 'ymcmp'
import { Popover, Empty } from 'antd'
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
  seaLeadsNum: {
    title: '内海leads数',
    des: (
      <>
        满足以下条件 <br />
        （1）门店或者个人名下的所有leads，以角色为单位 <br />
        （2）在查询时间段的截止日期当下的时刻的内海leads数据
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
  tryAttendPercent: {
    title: '试听出席率',
    des: (
      <>
        满足以下条件的 <br />
        （1）=新签试听出席数/新签试听预排数
      </>
    )
  },
  newSignNum: {
    title: '新签人数',
    des: (
      <>
        满足以下条件的合同对应的客户数（userid去重） <br />
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
  newSignAverage: {
    title: '新签单笔',
    des: (
      <>
        满足以下条件的 <br />
        （1）=新签金额/新签人数
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
  newRefundPersonNum: {
    title: '新签退费人数',
    des: (
      <>
        满足以下条件的合同的客户数 <br />
        （1）合同发生退费 <br />
        （2）退费时间处于查询时间之内 <br />
        （3）退费合同属性为【新签合同】 <br />
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
  newSignPaidAmount: {
    title: '新签实收',
    des: <>（1）新签实收=新签金额-新签退费金额</>
  },
  signConversionPercent: {
    title: 'leads-签约转化率',
    des: (
      <>
        满足以下条件的 <br />
        （1）=新签人数/门店自有leads数
      </>
    )
  },
  attendConversionPercent: {
    title: '出席-签约转化率',
    des: (
      <>
        满足以下条件的 <br />
        （1）=新签人数/新签试听出席数
      </>
    )
  },
  signFollowTimes: {
    title: '新签跟进次数',
    des: (
      <>
        满足以下条件的 <br />
        （1）每在系统填写并提交一次跟进记录算一次客户跟进数 <br />
        （2）角色为CC <br />
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
      key: ''
    },
    {
      title: '员工',
      width: 140,
      fixed: 'left',
      dataIndex: 'userName',
      key: 'userName'
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
      title: '客户',
      children: [colu('ownLeadsNum'), colu('seaLeadsNum')]
    },
    {
      title: '新签',
      children: [
        colu('newTryPreviewNum'),
        colu('newTryAttendNum'),
        colu('tryAttendPercent'),
        colu('newSignNum'),
        colu('newSignAmount'),
        colu('newSignAverage'),
        colu('newCourseNum')
      ]
    },
    {
      title: '退费（新签）',
      children: [colu('newRefundPersonNum'), colu('newRefundAmount'), colu('newRefundCourseNum')]
    },
    {
      title: '新签实收',
      children: [colu('newSignPaidAmount')]
    },
    {
      title: '转化率',
      children: [colu('signConversionPercent'), colu('attendConversionPercent')]
    },
    {
      title: '销售跟进数据',
      children: [
        colu('signFollowTimes') /*colu('duration'), colu('dialNum'), colu('severalNum'), colu('connectionRate')*/
      ]
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
      url={'/reportservice/list/kpi/cc'}
    />
  ) : (
    <div style={{ border: '1px solid #ededed' }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'无数据,请选择条件查询'} />
    </div>
  )
}
