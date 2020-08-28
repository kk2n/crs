import React, { Component } from 'react'
import { connect as AuditApp } from './auditApplicationModel'
import GjFilterShenqing from './component/GjFilterShenqing'
import './auditManage.scss'
import TabPage from './component/Tab'
import StatusTab from './component/StatusTab'
import Table from './component/Table'
import TeachInfo from './component/TeachInfo'
import StudentInfo from './component/StudentInfo'

@AuditApp
class AuditManage extends Component {
  componentDidMount = () => {
    this.getList()
  }
  getList = () => {
    this.props.getList({
      clientName: this.props.AuditApp.keyword,
      status: this.props.AuditApp.status,
      pageNum: this.props.AuditApp.page,
      pageSize: this.props.AuditApp.pageSize
    })
  }
  render() {
    return (
      <div className="auditManageWrap">
        <TabPage isShenQin history={this.props.history} />
        <div className="Audition">
          <GjFilterShenqing
            className="gjFilter"
            keyword={this.props.AuditApp.keyword}
            keywordUp={this.props.keywordUp}
            getList={this.getList}
            clear={async () => {
              await this.props.clearFilter()
              this.getList()
            }}
          />
          <div className="space" />
          <StatusTab
            getList={this.getList}
            status={this.props.AuditApp.status}
            statusUp={this.props.statusUp}
            pageUp={this.props.pageUp}
          />
          <Table {...this.props} getList={this.getList} />
        </div>
        {/*教师详情*/}
        {this.props.AuditApp.teacherInfoModal && <TeachInfo {...this.props} />}
        {this.props.AuditApp.studentInfoModal && <StudentInfo {...this.props} />}
      </div>
    )
  }
}
export default AuditManage
