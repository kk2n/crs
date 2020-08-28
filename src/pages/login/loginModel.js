import { createModel } from 'ymcore/createModel'

const loginModel = {
  //命名空间
  name: 'Login',
  //初始化数据
  initState: {},
  userLogin: {
    autoReduce: true,
    promise: {
      url: `get /yimi/mid/userLogin`
    }
  }
}
//第一种：加入指定模块的数据
export const { connect, reduce } = createModel(loginModel)

/*
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
