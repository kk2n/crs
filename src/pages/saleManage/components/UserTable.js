import React from 'react'
import { Table } from 'antd'
import API from '../../../utils/axios'
import { message, Modal, DatePicker } from 'antd'
import OrgTree from './OrgTree'
import moment from 'moment'

export default props => {
  function disabledDate(current) {
    return current && current <= moment().subtract(1, 'days')
  }

  let columns = [
    {
      title: 'CC姓名',
      dataIndex: 'realName',
      key: 'realName'
    },
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '操作',
      render: data => {
        return (
          <div>
            <a
              style={{ marginRight: 20 }}
              onClick={() => {
                props.isShowModalUp(true)
                props.selUserIdUp(data.userId)
              }}
            >
              编辑
            </a>
            {/*<a*/}
            {/*style={{ marginRight: 20 }}*/}
            {/*onClick={async () => {*/}
            {/*await props.selUserIdUp(data.userId)*/}
            {/*await props.sxsjUp(undefined)*/}
            {/*props.yidingModalShowUp(true)*/}
            {/*}}*/}
            {/*>*/}
            {/*移动*/}
            {/*</a>*/}
            <a
              style={{ marginRight: 20 }}
              onClick={async () => {
                //启用——禁用
                let { status } = await API.post('/biz/sales/juren/changeUserStatus', {
                  userId: data.userId,
                  userStatus: data.status === 0 ? 1 : 0
                })
                if (!status) return false
                await props.getList()
                message.success('操作成功')
              }}
            >
              {data.status === 0 ? '启用' : <span style={{ color: '#f00' }}>禁用</span>}
            </a>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      {props.SaleManage.yidingModalShow && (
        <Modal
          title="移动至其他部门"
          width={500}
          visible={props.SaleManage.yidingModalShow}
          onCancel={() => props.yidingModalShowUp(false)}
          onOk={async () => {
            if (!props.SaleManage.selYDOrgId) {
              message.error('操作错误，您没有选择组织')
              return false
            }
            if (!props.SaleManage.sxsj) {
              message.error('操作错误，您没有选择有效期')
              return false
            }
            let { status } = await API.post('/biz/sales/juren/move/user', {
              userId: props.SaleManage.selUserId,
              newOrgId: props.SaleManage.selYDOrgId,
              oldOrgId: props.SaleManage.selOrgId,
              applyDate: moment(props.SaleManage.sxsj).format('YYYY-MM-DD HH:mm')
            })
            if (!status) return false
            await props.getList()
            message.success('操作成功')
            props.selYDOrgIdUp('')
            props.yidingModalShowUp(false)
          }}
        >
          <div>
            <div style={{ padding: 10, border: '#ededed 1px solid' }}>
              <OrgTree {...props} data={[props.SaleManage.getOrgListRes.data]} isYd />
            </div>
            <br />
            生效日期<em className="required">*</em>
            <br />
            <br />
            <DatePicker
              disabledDate={disabledDate}
              value={props.SaleManage.sxsj}
              format={'YYYY-MM-DD'}
              onChange={props.sxsjUp}
            />
          </div>
        </Modal>
      )}
      <Table rowKey={'userId'} columns={columns} dataSource={props.data} pagination={false} bordered />
    </div>
  )
}
