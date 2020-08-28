import { Modal, Tabs } from 'antd'
import { host } from '../../../utils/axios'
import React from 'react'
const { TabPane } = Tabs
export default props => {
  return (
    <Modal
      title="教师详情"
      centered
      maskClosable={false}
      className="detailModal2"
      style={{ height: 'calc(100vh - 40px)' }}
      visible={props.AuditApp.teacherInfoModal}
      onCancel={() => props.teacherInfoModalUp(false)}
      footer={false}
    >
      <Tabs className="teacherInfo" style={{ padding: 0 }} onChange={() => {}} type="card">
        <TabPane tab="教师信息" key="1">
          <iframe
            src={`//${host()}/crm/teacherInfo?teacherId=${props.AuditApp.selTeacherId}&r=${Math.random()}`}
            style={{ width: '100%', height: 'calc(100vh - 160px)' }}
          />
        </TabPane>
        <TabPane tab="教师课表" key="2">
          <iframe
            src={`//${host()}/crm/teacherKB?teacherId=${props.AuditApp.selTeacherId}&r=${Math.random()}`}
            style={{ width: '100%', height: 'calc(100vh - 160px)' }}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
}
