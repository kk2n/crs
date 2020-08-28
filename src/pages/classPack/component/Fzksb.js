import { Modal } from 'antd'
import React from 'react'
import FzForm from './FzForm'
export default ({ ClassPack }) => {
  return (
    <Modal
      closable
      footer={false}
      title="复制课时包"
      width={'100%'}
      style={{ top: 0, minWidth: 1040 }}
      mask={false}
      wrapClassName={'addksb-modal'}
      visible={ClassPack.fzModalShow}
      onCancel={() => ClassPack.fzModalShowUp(false)}
    >
      <FzForm
        info={ClassPack.classDetailRes?.data}
        onCancel={() => ClassPack.fzModalShowUp(false)}
        searchData={ClassPack.searchData}
      />
    </Modal>
  )
}
