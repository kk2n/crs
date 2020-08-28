import React from 'react'
import { Modal } from 'antd'
import AddForm from './AddForm'

export default ({ m, assignEnterpriseCode }) => {
  let onCancel = () => {
    m.selIdUp('')
    m.editModalShowUp(false)
  }
  return (
    <Modal
      mask={false}
      title="编辑合同模板"
      visible={m.editModalShow}
      onCancel={onCancel}
      centered
      width={980}
      footer={null}
    >
      <AddForm isEdit m={m} onCancel={onCancel} assignEnterpriseCode={assignEnterpriseCode} />
    </Modal>
  )
}
