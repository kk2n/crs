import { createModel } from 'ymcore/createModel'

const auditManageModel = {
  name: 'AuditManage',
  upState: {
    selMenDian: undefined
  },
  //初始化数据
  initState: {
    gjIsShow: false, //高级筛选显示还是隐藏
    lessonDate: [], //预排时间
    lessonCreateDate: [], //创建时间
    gjFilterData: {
      //顶部高级筛选项
      keyword: '', //搜索字（编写编号/leads/学院名称）
      // orgIds: [], //组织多选
      cooperateConsultant: '', //协作人
      teacher: '', //教师id
      subjectIds: [], //科目ids，多选
      gradeIds: [], //年级ids，多选
      tryProperty: [], //试听课属性 (0:新签 1：扩科 2：换老师)
      lessonBeginDate: '',
      lessonEndDate: '', //预排结束时间
      lessonCreateBeginDate: '',
      lessonCreateEndDate: ''
    },
    tryPropertyArr: [
      { name: '新签', value: 0 },
      { name: '扩科', value: 1 },
      { name: '换老师', value: 2 }
    ] //试听属性列表
  },
  //高级筛选显示还是隐藏
  gjIsShowUp: 'gjIsShow',
  //清空
  clearFilter: {
    reduce: state => {
      return {
        ...state,
        lessonDate: [],
        lessonCreateDate: [],
        selMenDian: undefined,
        gjFilterData: {
          keyword: '',
          orgIds: [],
          cooperateConsultant: '',
          teacher: '',
          subjectIds: [],
          gradeIds: [],
          tryProperty: [],
          lessonBeginDate: '',
          lessonEndDate: '', //预排结束时间
          lessonCreateBeginDate: '',
          lessonCreateEndDate: ''
        }
      }
    }
  },
  //高级筛选中筛选项数据
  gjFilterDataUp: {
    reduce: (state, { meta }) => ({
      ...state,
      gjFilterData: { ...state.gjFilterData, ...meta }
    })
  },
  lessonDateUp: 'lessonDate',
  lessonCreateDateUp: 'lessonCreateDate',
  getAuditDetail: 'post /biz/sales/stk/lesson/list',
  getOrganize: 'get /biz/sales/stk/lesson/account',
  getTeacher: 'get /biz/sales/stk/lesson/teacher',
  getCooper: 'get /biz/sales/stk/lesson/cooperateConsultant',
  getSubject: 'get /biz/sales/stk/plan/subject/list',
  getGrade: 'get /biz/sales/stk/plan/grade/list'
}

export const { connect, reduce } = createModel(auditManageModel, state => {
  return {
    gjIsShow: state.AuditManage.gjIsShow,
    gjFilterData: state.AuditManage.gjFilterData,
    lessonDate: state.AuditManage.lessonDate,
    lessonCreateDate: state.AuditManage.lessonCreateDate,
    tryPropertyArr: state.AuditManage.tryPropertyArr,
    auditDetail: state.AuditManage.getAuditDetailRes.data,
    organizeList: state.AuditManage.getOrganizeRes.data,
    teacherList: state.AuditManage.getTeacherRes.data,
    cooperList: state.AuditManage.getCooperRes.data,
    subjectList: state.AuditManage.getSubjectRes.data,
    gradeList: state.AuditManage.getGradeRes.data
  }
})
// export const { connect, reduce } = createModel(stListModalModel)
