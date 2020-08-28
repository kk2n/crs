import { createModel } from 'ymcore/createModel'
import moment from 'moment'

let date = x => x && moment(x).format('YYYY-MM-DD')
const demoModel = {
  name: 'BookDelivery',
  upState: {
    gjFilter: false,
    filter: {
      fieldLike: '',
      gradeId: undefined,
      subjectId: undefined,
      courseId: undefined,
      classCode: undefined,
      classState: undefined,
      teacherId: undefined,
      bookStatus: undefined,
      attendTimeStart: [],
      firstTimeStart: [],
      preFirstTimeStart: []
    },
    params: {
      pageNum: 1,
      pageSize: 10
    }
  },
  filterUp: {
    reduce: (state, { meta }) => ({ ...state, filter: { ...state.filter, [meta.key]: meta.value } })
  },
  //查询
  paramsUp: {
    reduce: state => {
      let { filter, params } = state
      return {
        ...state,
        params: {
          ...params,
          fieldLike: filter.fieldLike,
          gradeId: filter.gradeId?.key,
          subjectId: filter.subjectId?.key,
          courseId: filter.courseId?.key,
          classCode: filter.classCode,
          classState: filter.classState?.key,
          teacherId: filter.teacherId?.key,
          bookStatus: filter.bookStatus?.key,
          attendTimeStart: date(filter.attendTimeStart[0]),
          attendTimEnd: date(filter.attendTimeStart[1]),
          firstTimeStart: date(filter.firstTimeStart[0]),
          firstTimeEnd: date(filter.firstTimeStart[1]),
          preFirstTimeStart: date(filter.preFirstTimeStart[0]),
          preFirstTimeEnd: date(filter.preFirstTimeStart[1])
        }
      }
    }
  },
  //清除
  clear: {
    reduce: state => {
      return {
        ...state,
        filter: {
          fieldLike: '',
          gradeId: undefined,
          subjectId: undefined,
          courseId: undefined,
          classCode: undefined,
          classState: undefined,
          teacherId: undefined,
          bookStatus: undefined,
          attendTimeStart: [],
          preFirstTimeStart: [],
          firstTimeStart: []
        },
        params: {
          pageNum: 1,
          pageSize: 10
        }
      }
    }
  }
}
export const { connect, reduce } = createModel(demoModel)
