import React from 'react'
import { Modal } from 'antd'
import AddForm from './AddForm'

export default ({ m, assignEnterpriseCode }) => {
  let onCancel = () => {
    m.selIdUp('')
    m.fuZhiModalShowUp(false)
  }
  return (
    <Modal
      mask={false}
      title="复制合同模板"
      visible={m.fuZhiModalShow}
      onCancel={onCancel}
      centered
      width={980}
      footer={null}
    >
      <AddForm m={m} onCancel={onCancel} assignEnterpriseCode={assignEnterpriseCode} />
    </Modal>
  )
}
