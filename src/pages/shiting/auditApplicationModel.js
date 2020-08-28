import { createModel } from 'ymcore/createModel'
const auditManageModel = {
  name: 'AuditApp',
  upState: {
    keyword: undefined,
    page: 1,
    pageSize: 10,
    status: 0,
    teacherInfoModal: false,
    selTeacherId: undefined,
    selStudentId: undefined,
    studentInfoModal: false
  },
  clearFilter: {
    reduce: state => {
      return {
        ...state,
        keyword: undefined,
        status: 0
      }
    }
  },
  getList: 'post /biz/sales/stk/plan/lesson/apply/list'
}

export const { connect, reduce } = createModel(auditManageModel)
