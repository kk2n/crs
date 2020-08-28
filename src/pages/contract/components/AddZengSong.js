import React from 'react'
import { Modal } from 'antd'
import ZengSongForm from './ZengSongForm'
import { model, useModel } from 'ymcore/useModel'
model({
  namespace: 'ZengSongForm',
  item: [{ subject: undefined, number: undefined }],
  isLoading: false,
  studentInfo: {},
  contractEndDate: '',
  clear() {
    this.contractEndDate = ''
    this.studentInfo = {}
    this.isLoading = false
    this.item = [{ subject: undefined, number: undefined }]
  }
})
function AddZengSong(props) {
  let m = useModel('ZengSongForm')
  let onCancel = () => {
    m.clear()
    props.zengSongModalShowUp(false)
  }
  return (
    <Modal
      title="新建赠送合同"
      width={840}
      centered
      footer={null}
      visible={props.ContractList.zengSongModalShow}
      onCancel={onCancel}
    >
      <ZengSongForm onCancel={onCancel} m={m} />
    </Modal>
  )
}

export default AddZengSong
