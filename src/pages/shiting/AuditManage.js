import React, { Component } from 'react'
import moment from 'moment'
import { Modal, Table, Tooltip, message, Tabs } from 'antd'
import { connect as auditManage } from './auditManageModel'
import GjFilter from './component/GjFilter'
import StudentInfoModal from './../../components/studentInfo/StudentInfoModal'
import './auditManage.scss'
import API, { host } from '../../utils/axios'
import TeachFeedback from './TeachFeedback'
import TabPage from './component/Tab'
import { rest } from 'underscore'

const { TabPane } = Tabs
@auditManage
class AuditManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teacherInfo: false,
      teacherId: '',
      isShowDetial: false,
      isShowFeedback: false, // 是否显示授课反馈
      selLeads: '',
      leadsId: null, //leads管理点击后从地址栏中获取
      currentIndex: 0, //当前tab切换的序号
      lessonStatus: null, //试听课状态,默认null为全部
      pageNum: 1, //当前页面
      pageSize: 10, //当前页显示条数
      leadsTypeArr: [
        //tabs导航栏生成数据
        { name: '全部', type: null, orderArea: 2, orderType: 1 }, //按照预排时间-降序
        { name: '预排', type: 1, orderArea: 2, orderType: 1 }, //按照预排时间-降序
        //{ name: '未备课', type: 2, orderArea: 2, orderType: 1 }, //按照预排时间-降序
        { name: '已上课', type: 3, orderArea: 2, orderType: 1 }, //按照预排时间-排序
        { name: '已逾期', type: 4, orderArea: 2, orderType: 1 }, //按照预排时间-降序
        { name: '已撤销', type: 5, orderArea: 2, orderType: 1 } //按照预排时间-降序
      ],
      //orderArea排序字段(1:创建时间 2：预排时间 3：完成时间)
      //orderType排序顺序(0:正序 1：倒序)
      orderAreaArr: [
        { name: '按创建时间', value: 1 },
        { name: '按预排时间', value: 2 },
        { name: '按完成时间', value: 3 }
      ],
      applicationId: 0 // 试听申请编号
    }
  }
  componentDidMount = async () => {
    if (this.props.history.location.search.indexOf('index=3') !== -1) {
      this.setState({
        currentIndex: 1,
        lessonStatus: 1
      })
      await this.props.gjIsShowUp(true)
      await this.props.lessonDateUp([moment(), moment()])
      await this.props.gjFilterDataUp({
        lessonBeginDate: moment().format('YYYY-MM-DD'),
        lessonEndDate: moment().format('YYYY-MM-DD')
      })
    }
    this.getDetailList()
    // this.props.getOrganize() //获取高级筛选中的组织
    // this.props.getCooper() //获取高级筛选中的协作人
    // this.props.getTeacher() //获取高级筛选中的老师
    this.props.getSubject() //获取科目
    this.props.getGrade() //获取年级
  }
  //获取试听列表
  getDetailList = async page => {
    let { currentIndex, lessonStatus, leadsTypeArr, pageSize } = this.state
    let { gjFilterData } = this.props
    let params = {
      ...gjFilterData,
      lessonStatus,
      orderType: leadsTypeArr[currentIndex].orderType,
      orderArea: leadsTypeArr[currentIndex].orderArea,
      pageNum: page || 1,
      pageSize: pageSize || 10,
      shopStaffIdList: rest(this.props.AuditManage.selMenDian?.key || [])
    }
    await this.props.getAuditDetail(params)
  }
  render() {
    const columns = [
      {
        title: '试听主题',
        dataIndex: 'lessonTopic',
        key: 'lessonTopic',
        render: (v, d) => (
          <div>
            <div className="myleads-table">
              <Tooltip placement="top" title={v}>
                <span
                  className="myleads-name"
                  onClick={async () => {
                    await this.setState({ selLeads: d.id })
                    let { status, msg } = await API.get('/biz/auth/detail/staff') //检测token,如果失败跳至登陆页
                    if (!status) return !message.error(msg)
                    this.setState({ isShowDetial: true })
                  }}
                >
                  {v}
                </span>
              </Tooltip>
            </div>
            <div className="myleads-tag">
              {d.tryProperty === 0 && <i className="type">新</i>}
              {d.tryProperty === 1 && <i className="type">扩</i>}
              {d.tryProperty === 2 && <i className="type">换</i>}
              {d.subjectName && <i className="ke-mu">{d.subjectName}</i>}
              {d.gradeName && <i className="grade">{d.gradeName}</i>}
              {d.selfDefineTopic === 1 && <i className="custom">自定义</i>}
            </div>
          </div>
        )
      },
      {
        title: '学员姓名',
        key: 'leadsName',
        dataIndex: 'leadsName',
        align: 'center',
        render: (txt, d) => (
          <div>
            <StudentInfoModal name={txt} data={d} id={d.leadsId} />
            {d.refClientName && <StudentInfoModal name={d.refClientName} data={d} id={d.refClientId} />}
          </div>
        )
      },
      {
        title: '创建人',
        key: 'createdBy',
        dataIndex: 'createdBy',
        align: 'center'
      },
      // {
      //   title: '协作人',
      //   key: 'cooperateConsultant',
      //   dataIndex: 'cooperateConsultant',
      //   align: 'center',
      //   render: t => {
      //     return t ? t : '-'
      //   }
      // },
      {
        title: '老师姓名',
        key: 'teacherName',
        dataIndex: 'teacherName',
        align: 'center',
        render: (v, d) => {
          return (
            <a
              onClick={async () => {
                await this.setState({ teacherId: d.teacherId })
                this.setState({ teacherInfo: true })
              }}
            >
              {v}
            </a>
          )
        }
      },
      {
        title: '预排时间',
        key: 'startTimeSchedule',
        dataIndex: 'startTimeSchedule',
        align: 'center',
        render: (val, data) => (
          <div className={moment(val && val.split(' ')[0]).isBefore(moment()) && data.lessonStatus === 1 ? 'red' : ''}>
            {val}
          </div>
        )
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (val, data) => {
          return (
            <div>
              <a
                href={`http://${host('h5')}/freeTrialResult?classId=${data.lessonId}&report=1`}
                target="_blank"
                rel="noopener noreferrer"
                disabled={!data.lessonReport}
              >
                报告
              </a>
              <a
                style={{ marginLeft: 10 }}
                disabled={data.teachingFeedBack !== 1}
                onClick={() => this.setState({ isShowFeedback: true, applicationId: data.id })}
              >
                授课反馈
              </a>
            </div>
          )
        }
      }
    ]
    let { currentIndex, leadsTypeArr } = this.state
    return (
      <div className="auditManageWrap">
        <TabPage history={this.props.history} />
        <div className="Audition">
          <GjFilter {...this.props} isShiTing className="gjFilter" getDetailList={this.getDetailList} />
          <div className="space" />
          <div className="leads-tab-com">
            <div className="sttaps-nav">
              <div>
                {leadsTypeArr.map((a, aa) => (
                  <span
                    className={aa === currentIndex ? 'tab onIt' : 'tab'}
                    key={a.type}
                    onClick={async () => {
                      await this.setState({ currentIndex: aa, lessonStatus: a.type })
                      this.getDetailList(1)
                    }}
                  >
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="leads-table">
            <Table
              className="auditionTable"
              columns={columns}
              dataSource={(this.props.auditDetail || {}).list}
              rowKey="id"
              pagination={{
                current: (this.props.auditDetail || {}).pageNum,
                pageSize: (this.props.auditDetail || {}).pageSize,
                total: (this.props.auditDetail || {}).total,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ['10', '25', '50', '100', '200', '500'],
                showTotal: (t, r) => (
                  <div style={{ float: 'left' }}>
                    当前显示{r[0]}-{r[1]}条/共{t}条
                  </div>
                ),
                onChange: page => {
                  this.getDetailList(page)
                  this.setState({
                    pageNum: page
                  })
                },
                onShowSizeChange: async (current, size) => {
                  await this.setState({
                    pageSize: size
                  })
                  this.getDetailList(1)
                }
              }}
            />
          </div>
          {/* 试听课详情弹窗 */}
          <Modal
            title="试听详情"
            centered
            maskClosable={false}
            className="detailModal"
            style={{ width: '1200px' }}
            visible={this.state.isShowDetial}
            onCancel={() => {
              this.setState({ isShowDetial: false })
              this.getDetailList(this.state.pageNum)
            }}
            footer={null}
          >
            <iframe
              src={`//${host()}/crm/shiTingDetial?id=${this.state.selLeads}&r=${Math.random()}`}
              style={{ width: '100%', height: 'calc(100vh - 160px)' }}
            />
          </Modal>
          {this.state.teacherInfo && (
            <Modal
              centered
              title="教师详情"
              maskClosable={false}
              className="detailModal2"
              visible={this.state.teacherInfo}
              style={{ width: '100%', height: 'calc(100vh - 40px)' }}
              onCancel={() => this.setState({ teacherInfo: false })}
              footer={null}
            >
              <Tabs className="teacherInfo" style={{ padding: 0 }} onChange={() => {}} type="card">
                <TabPane tab="教师信息" key="1">
                  <iframe
                    src={`//${host()}/crm/teacherInfo?teacherId=${this.state.teacherId}&r=${Math.random()}`}
                    style={{ width: '100%', height: 'calc(100vh - 160px)' }}
                  />
                </TabPane>
                <TabPane tab="教师课表" key="2">
                  <iframe
                    src={`//${host()}/crm/teacherKB?teacherId=${this.state.teacherId}&r=${Math.random()}`}
                    style={{ width: '100%', height: 'calc(100vh - 160px)' }}
                  />
                </TabPane>
              </Tabs>
            </Modal>
          )}
          <Modal
            centered
            title="授课反馈"
            visible={this.state.isShowFeedback}
            onCancel={() => this.setState({ isShowFeedback: false })}
            width={1220}
            footer={null}
            destroyOnClose={true}
          >
            <TeachFeedback applicationId={this.state.applicationId} />
          </Modal>
        </div>
      </div>
    )
  }
}
export default AuditManage
