import { Modal } from 'antd'
import React from 'react'
import AddForm from './AddForm'
export default ({ ClassPack }) => {
  return (
    <Modal
      closable
      footer={false}
      title="新建课时包"
      width={'100%'}
      style={{ top: 0, minWidth: 1040 }}
      mask={false}
      wrapClassName={'addksb-modal'}
      visible={ClassPack.addModalShow}
      onCancel={() => ClassPack.addModalShowUp(false)}
    >
      <AddForm onCancel={() => ClassPack.addModalShowUp(false)} searchData={ClassPack.searchData} />
    </Modal>
  )
}
