import React, { Component } from 'react'
import { Button, Row, Col, Modal } from 'antd'
import { connect as saleManage } from './saleManageModel'
import AddEditModal from './components/AddEditModal'
import './saleManage.scss'
import OrgTree from './components/OrgTree'
import UserTable from './components/UserTable'

const error = Modal.error
@saleManage
class SaleManage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    //获取组织
    await this.props.getOrgList()
    //获取用户
    let orgId = this.props.SaleManage.getOrgListRes.data.value
    if (!orgId) return false
    this.props.selOrgIdUp(orgId)
    this.getUserList()
  }
  getUserList = async () => {
    if (!this.props.SaleManage.selOrgId) return false
    await this.props.getUserList({
      orgId: this.props.SaleManage.selOrgId
    })
  }
  render() {
    return (
      <div className="saleManageWrap">
        <Button
          type="primary"
          onClick={async () => {
            if (!this.props.SaleManage.selOrgId) {
              //没有选组织不给新建
              error({
                title: `请先选组织再新建CC账号！`,
                okText: '确定'
              })
              return
            }
            await this.props.isShowModalUp(true)
          }}
        >
          +新建CC账号
        </Button>
        <div className={'saleManage-page'}>
          <Row>
            <Col span={6} style={{ maxWidth: 280, minWidth: 240 }}>
              <div style={{ padding: 10, border: '#ededed 1px solid', marginRight: 10 }}>
                <OrgTree
                  {...this.props}
                  data={this.props.SaleManage.getOrgListRes.data ? [this.props.SaleManage.getOrgListRes.data] : []}
                  getList={this.getUserList}
                />
              </div>
            </Col>
            <Col span={16}>
              <UserTable {...this.props} data={this.props.SaleManage.getUserListRes.data} getList={this.getUserList} />
            </Col>
          </Row>
        </div>
        {/* 新增/编辑cc账号弹窗 */}
        {this.props.SaleManage.isShowModal && <AddEditModal {...this.props} getList={this.getUserList} />}
      </div>
    )
  }
}
export default SaleManage
