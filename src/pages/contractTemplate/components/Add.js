import React from 'react'
import { Modal } from 'antd'
import AddForm from './AddForm'

export default ({ m, assignEnterpriseCode }) => {
  let onCancel = () => {
    m.addModalShowUp(false)
  }
  return (
    <Modal
      mask={false}
      title="新建合同模板"
      visible={m.addModalShow}
      onCancel={onCancel}
      centered
      width={980}
      footer={null}
    >
      <AddForm m={m} onCancel={onCancel} assignEnterpriseCode={assignEnterpriseCode} />
    </Modal>
  )
}
