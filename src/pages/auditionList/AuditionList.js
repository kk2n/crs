import React, { Component } from 'react'
import moment from 'moment'
import { Button, Table, Modal, Tooltip, message } from 'antd'
import { connect as auditionList } from './auditionListModel'
import { getUrl } from 'ymcmp/getUrl'
import { lsDel } from 'ymcmp/localStorage'
import API, { host } from '../../utils/axios'
import './auditionList.scss'

@auditionList
class AuditionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leadsId: null, //leads管理点击后从地址栏中获取
      currentIndex: 0, //当前tab切换的序号
      lessonStatus: null, //试听课状态,默认null为全部
      pageNum: 1, //当前页面
      pageSize: 10, //当前页显示条数
      leadsTypeArr: [
        //tabs导航栏生成数据
        { name: '全部', type: null },
        { name: '预排', type: 1 },
        //{ name: '未备课', type: 2 },
        { name: '已上课', type: 3 },
        { name: '已逾期', type: 4 },
        { name: '已撤销', type: 5 }
      ],
      lessonStatuArr: [
        //状态数据
        {
          key: 1,
          label: '预排'
        },
        {
          key: 2,
          label: '未备课'
        },
        {
          key: 3,
          label: '已上课'
        },
        {
          key: 4,
          label: '已逾期'
        },
        {
          key: 5,
          label: '已撤销'
        }
      ],
      isShowAddSteps: false,
      isShowDetial: false,
      detailId: '',
      currentStep: null //新增窗口第几步
    }
  }
  componentDidMount = async () => {
    this.getList()
    window.receiveMessageFromIndex = event => {
      if (event !== undefined) {
        event.data === 2 &&
          this.setState({
            currentStep: event.data
          })
        // self.setState({
        //   modelId: event.data //2.给变量赋值
        // })
      }
    }
    //监听message事件
    window.addEventListener('message', window.receiveMessageFromIndex, false)
  }
  //获取试听列表
  getList = async page => {
    if (!getUrl('clientId') || !getUrl('clientName') || !getUrl('systSource')) return
    await this.props.clientIdUp(getUrl('clientId'))
    await this.props.clientNameUp(getUrl('clientName'))
    await this.props.systSourceUp(getUrl('systSource'))
    let { lessonStatus, pageSize } = this.state
    let params = {
      leadsId: this.props.clientId, //leads管理点击后从地址栏中获取
      lessonStatus,
      pageNum: page || 1,
      pageSize: pageSize || 10
    }
    await this.props.getList(params)
    // console.log('列表===', this.props.listenList)
  }
  //
  render() {
    const columns = [
      {
        title: '试听主题',
        dataIndex: 'lessonTopic',
        key: 'lessonTopic',
        render: (v, d) => (
          <div>
            <div
              className="myleads-table"
              onClick={async () => {
                let { status, msg } = await API.get('/biz/auth/detail/staff')
                if (!status) {
                  message.error(msg)
                  return
                } //检测token,如果失败跳至登陆页
                this.setState({ isShowDetial: true, detailId: d.id, subjectId: d.subjectId })
              }}
            >
              <Tooltip placement="top" title={v}>
                <span className="st-zhiti">{v}</span>
              </Tooltip>
            </div>
            <div className={'myleads-tag'}>
              <span className={'ke-mu'}>{d.subjectName}</span>
              <span className={'grade'}>{d.gradeName}</span>
            </div>
          </div>
        )
      },
      {
        title: '预排时间',
        align: 'center',
        dataIndex: 'teacherName',
        key: 'teacherName',
        render: (v, d) => (
          <div
            className={
              d.startTimeSchedule &&
              moment(d.startTimeSchedule.split(' ')[0]).isBefore(moment()) &&
              d.lessonStatus === 1
                ? 'st-ypsj red'
                : 'st-ypsj'
            }
          >
            <div className={d.lessonStatus === 5 ? 'grey' : ''}>{d.lessonStatus === 5 ? '—' : v}</div>
            <div className={d.lessonStatus === 5 ? 'grey' : ''}>{d.lessonStatus === 5 ? '—' : d.startTimeSchedule}</div>
          </div>
        )
      },
      {
        title: '状态',
        align: 'center',
        dataIndex: 'lessonStatus',
        render: (v /*d*/) => <span>{(this.state.lessonStatuArr.find(item => item.key === v) || {}).label}</span>
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'action',
        key: 'action',
        render: (v, d) => (
          <div className={d.lessonStatus === 5 ? 'stcs grey' : 'stcs'}>
            {d.lessonStatus === 5 && <span>已撤销</span>}
            {d.lessonStatus !== 5 && (
              <a
                href={`http://${host('h5')}/classroomreport?lessonId=${d.lessonId}`}
                target="_blank"
                rel="noopener noreferrer"
                disabled={!d.lessonReport}
              >
                报告
              </a>
            )}
          </div>
        )
      }
    ]
    let { currentIndex, isShowAddSteps, isShowDetial, subjectId } = this.state
    let { clientId, clientName, systSource } = this.props
    return (
      <div className="auditionListWrap">
        <Button
          type="primary"
          style={{ marginBottom: '16px' }}
          onClick={() => {
            window.close()
          }}
        >
          返回
        </Button>
        <h2 className="title">{this.props.clientName + '的试听'}</h2>
        <div className="tab-table">
          <div className="sttaps-nav">
            {this.state.leadsTypeArr.map((a, index) => (
              <span
                className={index === currentIndex ? 'tab onIt' : 'tab'}
                key={a.type}
                onClick={async () => {
                  //tab切换
                  await this.setState({
                    currentIndex: index,
                    lessonStatus: a.type
                  })
                  this.getList(1)
                  //await this.props.leadsTypeArrUp(a.type)
                }}
              >
                {a.name}
              </span>
            ))}
            <Button
              type="primary"
              onClick={async () => {
                let { status, msg } = await API.get('/biz/auth/detail/staff') //检测token,如果失败跳至登陆页
                if (!status) {
                  message.error(msg)
                  return
                }
                await this.setState({ isShowAddSteps: true })
              }}
            >
              +&nbsp;&nbsp;新建
            </Button>
          </div>
          <Table
            rowKey={'lessonId'}
            columns={columns}
            dataSource={(this.props.listenList || {}).list || []}
            pagination={{
              current: (this.props.listenList || {}).pageNum,
              pageSize: (this.props.listenList || {}).pageSize,
              total: (this.props.listenList || {}).total,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['10', '25', '50', '100', '200', '500'],
              showTotal: (t, r) => (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ marginRight: 10 }}>共 {t} 条记录</span>
                  <span>
                    第 {r[0] === 1 ? r[0] : Math.ceil(r[0] / (this.props.listenList || {}).pageSize)} /{' '}
                    {Math.ceil(t / (this.props.listenList || {}).pageSize)} 页
                  </span>
                </div>
              ),
              onChange: async page => {
                this.getList(page)
                this.setState({
                  pageNum: page
                })
              },
              onShowSizeChange: async (_, size) => {
                await this.setState({
                  pageSize: size
                })
                this.getList(1)
              }
            }}
          />
        </div>
        {/* 新建试听弹窗 */}
        {isShowAddSteps && (
          <Modal
            title="新建试听"
            centered
            maskClosable={false}
            className="detailModal"
            visible={isShowAddSteps}
            onCancel={() => {
              if (this.state.currentStep !== 2) {
                Modal.confirm({
                  title: '温馨提示',
                  content: '关闭后信息需重新输入，是否继续?',
                  cancelText: '否',
                  okText: '是',
                  onOk: async () => {
                    this.setState({
                      isShowAddSteps: false
                    })
                    this.getList()
                  }
                })
                return
              }
              this.setState({
                isShowAddSteps: false
              })
              this.getList()
            }}
            footer={null}
          >
            <iframe
              id="addAudition"
              style={{ width: '100%', height: 'calc(100vh - 160px)' }}
              src={`//${host()}/crm/myLeads/addStSteps?clientId=${clientId}&clientName=${clientName}&systSource=${systSource}`}
              frameBorder="0"
            />
          </Modal>
        )}
        {/* 试听课详情弹窗 */}
        {isShowDetial && (
          <Modal
            title="试听详情"
            centered
            maskClosable={false}
            className="detailModal"
            visible={isShowDetial}
            onCancel={() => {
              this.setState({
                isShowDetial: false
              })
              this.getList(this.state.pageNum)
              lsDel('EDIT_LESSONINFO')
            }}
            footer={null}
          >
            <iframe
              src={`//${host()}/crm/shiTingDetial?id=${this.state.detailId}&subjectId=${subjectId}&r=${Math.random()}`}
              style={{ width: '100%', height: 'calc(100vh - 160px)' }}
            />
          </Modal>
        )}
      </div>
    )
  }
}
export default AuditionList
