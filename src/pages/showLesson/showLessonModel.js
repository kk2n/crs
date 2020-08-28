import { createModel } from 'ymcore/createModel'

const demoModel = {
  //命名空间
  name: 'ShowLessonModel',
  //初始化数据
  initState: {
    //初始数据
    myLeadsList: { total: 0, pageNum: 1, pageSize: 10, list: [] },
    //当前页
    pageNum: 1,
    //页码
    pageSize: 10,
    //课程编号
    lessonId: '',
    //leads编号和姓名
    leadsIdOrName: '',
    //订单编号
    contractId: '',
    //年级选择
    gradeId: undefined,
    //课程状态
    lessonStatus: undefined,
    //学科老师
    teacherName: undefined,
    //报名时间
    startTime: [],
    //选择行
    selectedRowKeys: [],
    //选择的行的信息
    selectedRows: [],
    lessonStatusValue: ['预排', '完成', '请假', '¥请假', '旷课', '全部']
  },
  pageNumUp: 'pageNum',
  tkPostParamUp: 'tkPostParam',
  isLoadingUp: 'isLoading',
  startSDUp: 'startSD',
  endSDUp: 'endSD',
  kscsStartUp: 'kscsStart',
  kscsEndUp: 'kscsEnd',
  selTeacherIdUp: 'selTeacherId',
  tkStartTimeUp: 'tkStartTime',
  tkEndTimeUp: 'tkEndTime',
  tiaokeUp: 'tiaoke',
  gradeIdUp: 'gradeId',
  leadsIdOrNameUp: 'leadsIdOrName',
  lessonIdUp: 'lessonId',
  contractIdUp: 'contractId',
  subjectIdUp: 'subjectId',
  lessonStatusUp: 'lessonStatus',
  teacherNameUp: 'teacherName',
  startTimeUp: 'startTime',
  selectedRowsUp: 'selectedRows',
  selectedRowKeysUp: 'selectedRowKeys',
  isChangeTiaokeUp: 'isChangeTiaoke',
  deleteLesson: 'post /biz/sales/deleteLesson',
  lessonList: 'get /biz/sales/lesson/listDemoLesson',
  endTimeToLesson: 'get /biz/sales/endTimeToLesson',
  //清空
  clearFilter: {
    reduce: state => ({
      ...state,
      lessonId: '',
      leadsIdOrName: '',
      contractId: '',
      gradeId: undefined,
      subjectId: undefined,
      lessonStatus: '',
      teacherName: undefined,
      startTime: []
    })
  }
}
//第一种：加入指定模块的数据
export const { connect, reduce } = createModel(demoModel)

//四种方法定义
/*
//第一种：字符形式
  kk2nUp: 'kk2n',
  //第二种：自动处理异步，如果有会自动在初始状态中加入***Res:{msg: '',status: false,data: null}数据,promise支持string,和对象
  getList: {
    autoReduce: true,
    promise: 'get /biz/list'
  },
  // 第三种：非异步，并且为Object时，手动定义返回的数据
  bbUp: {
    reduce: (state, { meta }) => ({
      ...state,
      bbUp: meta
    })
  },
  //第四种：手动处理异步
  getData: {
    promise: {
      url: `get /biz/list`
    },
    reduce: (state, { payload, meta }) => ({
      ...state,
      bb: payload
    })
  }
* */

//四种导出方法定义，
/*
//第一种：加入指定模块的数据
export const { connect, reduce } = createAction(demoModel, 'Demo')

//第二种：数据和方案全部省略，自动加上所有的数据和方法
export const { connect, reduce } = createAction(homeModel)

//第三种：定义加入视图的数据,方法自动加入所有的方法
export const { connect, reduce } = createAction(homeModel,state=>{
  return {
    kk2n:state.Home.kk2n
  }
})

//第四种,定义加入视图的数据和方法
export const { connect, reduce } = createAction(homeModel,state=>{
    return {
      kk2n:state.Home.kk2n
    }
  },
  action => ({
    ...action,
    bbUp: action.aa2
  })
)
* */
