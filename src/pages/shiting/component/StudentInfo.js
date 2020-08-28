import { Modal } from 'antd'
import { host } from '../../../utils/axios'
import React from 'react'
export default props => {
  return (
    <Modal
      centered
      title="学员详情"
      className="studentInfoModal"
      width={1280}
      style={{ height: 'calc(100vh - 40px)' }}
      visible={props.AuditApp.studentInfoModal}
      onCancel={() => props.studentInfoModalUp(false)}
      footer={null}
    >
      <iframe
        style={{ width: '100%', height: 'calc(100vh - 140px)' }}
        title={'学员详情'}
        src={`//${host()}/crm/studtenInfo?clientId=${props.AuditApp.selStudentId}`}
      />
    </Modal>
  )
}
