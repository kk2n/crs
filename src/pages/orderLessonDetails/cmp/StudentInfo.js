import { host } from '../../../utils/axios'
import { Modal } from 'antd'
import React from 'react'

export default props => {
  return (
    <Modal
      centered
      title="学员详情"
      className="studentInfoModal"
      width={1280}
      style={{ height: 'calc(100vh - 40px)' }}
      visible={props.OrderLessonDetails.infoModal}
      onCancel={() => props.infoModalUp(false)}
      footer={null}
    >
      <iframe
        style={{ width: '100%', height: 'calc(100vh - 160px)' }}
        title={'学员详情'}
        src={`//${host()}/crm/studtenInfo?clientId=${props.OrderLessonDetails.lessonId}`}
      />
    </Modal>
  )
}
