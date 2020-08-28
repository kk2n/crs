import { Button, DatePicker, message, Modal } from 'antd'
import moment from 'moment'
import API from '../../../utils/axios'
import { Select } from 'ymcmp'
import React from 'react'
import { findObj } from 'ymcmp/array'
let disabledDate = current => current && current <= moment().subtract(1, 'days')
const dateFormat = 'YYYY-MM-DD'
export default props => {
  let save = async () => {
    //调课 post
    let param = {
      lessonId: props.OrderLessonDetails.tkPostParam.lessonId,
      contractId: props.OrderLessonDetails.tkPostParam.contractId,
      studentId: props.OrderLessonDetails.tkPostParam.studentId,
      clientId: props.OrderLessonDetails.tkPostParam.clientId,
      teacherId: props.OrderLessonDetails.tkPostParam.teacherId,
      lessonStatus: props.OrderLessonDetails.tkPostParam.lessonStatus,
      courseHours: props.OrderLessonDetails.tkPostParam.courseHours,
      scheduleId: (
        findObj(props.OrderLessonDetails.kscsStart, {
          text: props.OrderLessonDetails.startSD?.label
        }) || {}
      ).scheduleId,
      startTime:
        moment(props.OrderLessonDetails.tkStartTime).format('YYYY-MM-DD') +
        ' ' +
        props.OrderLessonDetails.startSD?.label +
        ':00',
      endTime:
        moment(props.OrderLessonDetails.tkEndTime).format('YYYY-MM-DD') +
        ' ' +
        props.OrderLessonDetails.endSD?.label +
        ':00'
    }
    if (moment(param.endTime).isBefore(moment(param.startTime))) {
      message.error('开始时间不能晚于结束时间')
      return false
    }
    props.isLoadingUp(true)
    let { status } = await API.post('/biz/sales/updateLessonTime', param)
    if (!status) {
      props.isLoadingUp(false)
      return false
    }
    await message.success('操作成功！')
    props.isLoadingUp(false)
    props.tiaokeUp(false)
    props.getList()
    await props.isChangeTiaokeUp(false)
  }
  return (
    <Modal
      title={'调课'}
      visible={props.OrderLessonDetails.tiaoke}
      onOk={props.handleOk}
      onCancel={() => props.tiaokeUp(false)}
      width={450}
      maskClosable={false}
      footer={null}
    >
      开始时间：
      <DatePicker
        defaultValue={moment((props.OrderLessonDetails.tkPostParam || {}).startTime, dateFormat)}
        onChange={async val => {
          await props.tkStartTimeUp(val)
          let { data } = await API.get('/biz/sales/getScheduleTimeList', {
            date: moment(props.OrderLessonDetails.tkStartTime).format('YYYY-MM-DD'),
            type: 'S'
          })
          await props.kscsStartUp(data)
          await props.startSDUp(undefined)
        }}
        disabledDate={disabledDate}
      />
      <Select
        vt={'scheduleId,text'}
        noMultiple
        placeholder="选择时段"
        style={{ width: 120, marginLeft: 10 }}
        data={props.OrderLessonDetails.kscsStart || []}
        value={props.OrderLessonDetails.startSD}
        onChange={async v => {
          await props.startSDUp(v)
          //计算结束时段
          let courseHours = props.OrderLessonDetails.tkPostParam.courseHours
          let params = {
            startTimeDate: moment(props.OrderLessonDetails.tkStartTime).format('YYYY-MM-DD'),
            startTimeHour: v.label,
            courseHours
          }
          let { data, status } = await API.get('/biz/sales/endTimeToLesson', params)
          if (!status) return false
          let endTimeDate = data?.endTimeDate
          let endTimeHour = data?.endTimeHour
          let endT = moment(endTimeDate).format('YYYY-MM-DD') + ' ' + endTimeHour
          await props.tkEndTimeUp(endT)
          await props.endSDUp({ key: moment(endT).format('HH:mm'), label: moment(endT).format('HH:mm') })
          props.tkPostParamUp({
            ...props.OrderLessonDetails.tkPostParam,
            endTime: endT
          })
        }}
      />
      <br /> <br />
      结束时间：
      <DatePicker
        value={moment(props.OrderLessonDetails.tkPostParam?.endTime, dateFormat)}
        disabled
        // onChange={async val => {
        //   await props.tkEndTimeUp(val)
        //   let { data } = await API.get('/biz/sales/getScheduleTimeList', {
        //     date: moment(props.OrderLessonDetails.tkEndTime).format('YYYY-MM-DD'),
        //     type: 'E'
        //   })
        //   await props.kscsEndUp(data)
        //   await props.endSDUp(undefined)
        // }}
      />
      <Select
        noMultiple
        disabled
        placeholder="选择时段"
        style={{ width: 120, marginLeft: 10 }}
        data={props.OrderLessonDetails.kscsEnd || []}
        value={props.OrderLessonDetails.endSD}
        vt={'scheduleId,text'}
        // onChange={v => props.endSDUp(v)}
      />
      <br />
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Button
          loading={props.OrderLessonDetails.isLoading}
          type="primary"
          onClick={async () => {
            if (!props.OrderLessonDetails.tkStartTime) {
              message.error('没有选择时间！')
              return false
            }
            if (!props.OrderLessonDetails.startSD?.label) {
              message.error('没有选择时间！')
              return false
            }
            if (!props.OrderLessonDetails.tkEndTime) {
              message.error('没有选择时间！')
              return false
            }
            if (!props.OrderLessonDetails.endSD?.label) {
              message.error('没有选择时间！')
              return false
            }
            let time =
              moment(props.OrderLessonDetails.tkStartTime).format('YYYY-MM-DD') +
              ' ' +
              props.OrderLessonDetails.startSD?.label +
              ':00'
            if (moment(time).isBefore(moment())) {
              message.error('开始时间不能在此刻之前!')
            } else if (moment(time).isBefore(moment().add(1, 'days'))) {
              Modal.info({
                title: '距离上课时间已不足24H，请确保与老师沟通并达成一致！',
                okText: '已与老师确认',
                onOk: () => save()
              })
            } else save()
          }}
        >
          提交
        </Button>
      </div>
    </Modal>
  )
}
