import { Button, Input, message, Modal, DatePicker } from 'antd'
import { Select } from 'ymcmp'
import React from 'react'
import API from '../../../utils/axios'
import downAPI, { download } from '../../../utils/downAjax'
import { fmoment } from '../../../utils/function'

let { RangePicker } = DatePicker
let num = x => {
  if (isNaN(x)) {
    message.error('只能输入数字')
    return undefined
  }
  return x
}
export default props => {
  return (
    <div>
      <div className="search-div">
        学员编号/姓名：
        <Input
          style={{ width: 160, marginRight: 10 }}
          value={props.OrderLessonDetails.studentIdOrName}
          placeholder="学员编号/姓名"
          onChange={e => props.studentIdOrNameUp(e.target.value)}
        />
        课时编号：
        <Input
          style={{ width: 160, marginRight: 10 }}
          value={props.OrderLessonDetails.lessonId}
          placeholder="课时编号"
          onChange={async e => props.lessonIdUp(num(parseInt(e.target.value)))}
        />
        订单编号：
        <Input
          style={{ width: 160, marginRight: 10 }}
          value={props.OrderLessonDetails.contractId}
          placeholder="订单编号"
          onChange={async e => props.contractIdUp(num(parseInt(e.target.value)))}
        />
        <div style={{ height: 10 }} />
        年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：
        <Select
          API={API}
          style={{ width: 194, marginRight: 10 }}
          noMultiple
          url={'/biz/sales/gradeList'}
          vt={'gradeId,gradeName'}
          placeholder="全部年级"
          value={props.OrderLessonDetails.gradeId}
          onChange={props.gradeIdUp}
        />
        科目：
        <Select
          API={API}
          noMultiple
          placeholder="全部科目"
          style={{ width: 188, marginRight: 10 }}
          url="/biz/sales/subjectList"
          vt={'subjectId,subjectName'}
          value={props.OrderLessonDetails.subjectId}
          onChange={val => props.subjectIdUp(val)}
          optionFilterProp={'children'}
        />
        学科老师：
        <Select
          API={API}
          noMultiple
          placeholder="学科老师"
          style={{ width: 194, marginRight: 10 }}
          url="/biz/sales/teacherList"
          vt={'teacherId,teacherName'}
          params={{ subjectId: props.OrderLessonDetails.subjectId?.key || null }}
          value={props.OrderLessonDetails.teacherName}
          onChange={props.teacherNameUp}
          optionFilterProp={'children'}
        />
        班主任：
        <Select
          API={API}
          noMultiple
          url={'/biz/sales/contract/distributeCrList'}
          style={{ width: 160, marginRight: 10 }}
          placeholder="请选择"
          value={props.OrderLessonDetails.selCR}
          vt={'userId,realName'}
          onChange={props.selCRUp}
        />
        <div style={{ height: 10 }} />
        课程状态：
        <Select
          noMultiple
          style={{ width: 160, marginRight: 10 }}
          placeholder="课程状态"
          defaultValue="全部"
          data={[
            { a: 0, b: '预排' },
            { a: 1, b: '完成' },
            { a: 2, b: '请假' },
            { a: 3, b: '¥请假' },
            { a: 4, b: '旷课' },
            { a: 5, b: '全部' }
          ]}
          value={props.OrderLessonDetails.lessonStatus}
          onChange={props.lessonStatusUp}
        />
        星期：
        <Select
          noMultiple
          style={{ width: 188, marginRight: 10 }}
          className="search-sel"
          data={[
            {
              id: 1,
              name: '星期一'
            },
            {
              id: 2,
              name: '星期二'
            },
            {
              id: 3,
              name: '星期三'
            },
            {
              id: 4,
              name: '星期四'
            },
            {
              id: 5,
              name: '星期五'
            },
            {
              id: 6,
              name: '星期六'
            },
            {
              id: 0,
              name: '星期日'
            }
          ]}
          value={props.OrderLessonDetails.selXingQi}
          onChange={props.selXingQiUp}
        />
        课时：
        <Select
          noMultiple
          placeholder="选择课时"
          className="search-sel"
          data={[
            {
              id: 1,
              name: '1课时'
            },
            {
              id: 2,
              name: '2课时'
            },
            {
              id: 3,
              name: '3课时'
            }
          ]}
          value={props.OrderLessonDetails.selKeShi}
          onChange={props.selKeShiUp}
        />
        上课时间：
        <RangePicker
          style={{ width: 212, marginRight: 10 }}
          value={props.OrderLessonDetails.startTime}
          onChange={val => props.startTimeUp(val)}
        />
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <Button type="primary" className="search-bn" onClick={() => props.getList()}>
            查询
          </Button>
          <Button
            className="search-bn"
            onClick={async () => {
              await props.clearFilter()
              props.getList()
            }}
          >
            清空
          </Button>
        </div>
      </div>
      <div className="btn-box">
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={async () => {
            let info = props.OrderLessonDetails
            let params = {
              weekId: info.selXingQi?.key ?? undefined,
              courseHour: info.selKeShi?.key || undefined,
              lessonId: info.lessonId || undefined,
              studentIdOrName: info.studentIdOrName || undefined,
              contractId: info.contractId || undefined,
              gradeId: info.gradeId?.key || undefined,
              subjectId: info.subjectId?.key || undefined,
              lessonStatus: info?.lessonStatus?.key ?? 5,
              teacherName: info.teacherName?.label || undefined,
              startTimeStart: fmoment(info.startTime[0]) || undefined,
              startTimeEnd: fmoment(info.startTime[1]) || undefined,
              crId: info.selCR?.key || undefined
            }
            let { status } = await API.post('/biz/sales/export/lessonList', { ...params, checkFlag: true })
            if (!status) return false
            let { data } = await downAPI.post('/biz/sales/export/lessonList', { ...params, checkFlag: false })
            if (data?.type !== 'text/xml') {
              message.error('出现错误！')
              return false
            }
            download(data, `课时明细.xls`)
          }}
        >
          导出报表
        </Button>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          onClick={() => {
            if (!props.OrderLessonDetails.selectedRows.length) {
              message.error('请选择需要删除的课程')
              return false
            }
            Modal.confirm({
              title: '温馨提示',
              content: '您确认要删除吗?',
              cancelText: '点错了',
              zIndex: 1021,
              okText: '确定删除',
              onOk: async () => {
                let arr = props.OrderLessonDetails.selectedRows.map(a => [0].includes(a.lessonStatus) && a.lessonStatus)
                if (arr.includes(false)) {
                  message.error('已完成、旷课、请假、￥请假的课程不可删除!')
                  return false
                }
                //提交
                let { status } = await API.post('/biz/sales/deleteLesson', {
                  lessonIds: props.OrderLessonDetails.selectedRowKeys
                })
                if (!status) return false
                await props.selectedRowsUp([])
                await props.selectedRowKeysUp([])
                await message.success('删除成功', 2)
                props.getList()
              }
            })
          }}
        >
          删除
        </Button>
        {/*{props.Common.permission.DRW_LESSON_LIST_CANCEL_LEAVE && (*/}
        {/*  <Button*/}
        {/*    type="primary"*/}
        {/*    onClick={() => {*/}
        {/*      if (!props.OrderLessonDetails.selectedRows.length) {*/}
        {/*        message.error('请选择需要销假的课程')*/}
        {/*        return false*/}
        {/*      }*/}
        {/*      Modal.confirm({*/}
        {/*        title: '温馨提示',*/}
        {/*        content: '您确认要销假吗?',*/}
        {/*        cancelText: '点错了',*/}
        {/*        okText: '确定销假',*/}
        {/*        onOk: async () => {*/}
        {/*          let { status } = await API.post('/biz/sales/lesson/cancelLeave', {*/}
        {/*            lessonIdList: props.OrderLessonDetails.selectedRows.map(a => a.lessonId)*/}
        {/*          })*/}
        {/*          if (!status) return false*/}
        {/*          await message.success('操作成功', 2)*/}
        {/*          props.getList()*/}
        {/*        }*/}
        {/*      })*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    销假*/}
        {/*  </Button>*/}
        {/*)}*/}
      </div>
    </div>
  )
}
