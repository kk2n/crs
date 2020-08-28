import { createModel } from 'ymcore/createModel'

const addEditModalModel = {
  name: 'AddEditModal',
  //初始化数据
  initState: {
    newInfo: {}, // 新增CC账号信息
    editInfo: {}, //编辑CC账号信息
    gradeList: [], //年级列表
    subjectList: [] //科目列表
  },
  newInfoUp: 'newInfo',
  editInfoUp: 'editInfo',
  gradeListUp: 'gradeList',
  subjectListUp: 'subjectList',
  //年级列表
  getGradeList: {
    promise: {
      url: `get /biz/sales/juren/grade/list`
    },
    reduce: (state, { payload }) => ({
      ...state,
      gradeList: payload.data
    })
  },
  //学科列表
  getSubjectList: {
    promise: {
      url: `get /biz/sales/juren/subject/list`
    },
    reduce: (state, { payload }) => ({
      ...state,
      subjectList: payload.data
    })
  },
  //角色列表
  getRoleList: 'get /biz/sales/juren/role/list',
  // 职级列表
  getLevelList: 'get /biz/sales/juren/level/list',
  // 根据userId查询用户详情
  getUserInfoById: {
    promise: {
      url: `get /biz/sales/juren/getUserInfoById`
    },
    reduce: (state, { payload }) => ({
      ...state,
      editInfo: payload.data
    })
  },
  //新增或修改用户
  addOrUpdateUser: 'post /biz/sales/juren/addOrUpdateUser'
}

export const { connect, reduce } = createModel(addEditModalModel)
