import createModel from 'ymcore/createModel'

const model = {
  name: 'CoursePlan',
  //页面初始值
  initState: {
    CoursePlan: 1
  }
  //action
}
//其他模块动作
//取部分数据给页面[应用的页面]
export let { connect, reduce } = createModel(model, state => ({
  demo: state
}))
