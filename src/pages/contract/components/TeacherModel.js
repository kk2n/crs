import React from 'react'
import { Modal } from 'antd'
import TeacherM from './TeacherM'

export default function(props) {
  return (
    <Modal
      className={'teacher-modal'}
      title="分配老师(全部必填)"
      visible={props.ContractList.showTeacherModal}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={null}
      width={800}
    >
      <TeacherM {...props} />
    </Modal>
  )
}
