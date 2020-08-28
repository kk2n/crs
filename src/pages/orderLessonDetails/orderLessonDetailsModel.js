import { createModel } from 'ymcore/createModel'

const demoModel = {
  name: 'OrderLessonDetails',
  upState: {
    selCR: undefined,
    selXingQi: undefined,
    selKeShi: undefined,
    pageNum: 1,
    pageSize: 10,
    infoModal: false,
    isChangeTiaoke: false,
    studentIdOrName: '',
    lessonId: '',
    contractId: '',
    //科目选择
    subjectId: undefined,
    //课程状态
    lessonStatus: undefined,
    teacherName: undefined,
    //报名时间
    startTime: [],
    //选择行
    selectedRowKeys: [],
    //选择的行的信息
    selectedRows: [],
    tiaoke: false,
    tkStartTime: undefined,
    tkPostParam: null,
    gradeId: undefined,
    isLoading: false,
    endSD: undefined,
    startSD: undefined,
    kscsStart: undefined,
    selTeacherId: '',
    tkEndTime: undefined,
    kscsEnd: undefined
  },
  deleteLesson: 'post /biz/sales/deleteLesson',
  lessonList: 'post /biz/sales/lessonList',
  endTimeToLesson: 'get /biz/sales/endTimeToLesson',
  clearFilter: {
    reduce: state => ({
      ...state,
      pageNum: 1,
      pageSize: 10,
      lessonId: '',
      studentIdOrName: '',
      contractId: '',
      gradeId: undefined,
      subjectId: undefined,
      lessonStatus: undefined,
      teacherName: undefined,
      startTime: [],
      selKeShi: undefined,
      selXingQi: undefined,
      selCR: undefined
    })
  }
}
export const { connect, reduce } = createModel(demoModel)
