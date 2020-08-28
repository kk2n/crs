import { createModel } from 'ymcore/createModel'

const demoModel = {
  //命名空间
  name: 'Demo',
  //初始化数据
  initState: {
    kk2n: 'fff',
    bb: 'aa'
  },
  //==已下全部为方法,connect到页面后，使用this.props.**()调用==============
  //第一种：字符形式
  kk2nUp: 'kk2n',
  //第二种：自动处理异步，如果有会自动在初始状态中加入***Res:{msg: '',status: false,data: null}数据,promise支持string,和对象
  getList: 'get /biz/list',
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
      url: `post /yimi/mid/manage/role/list`
    },
    reduce: (state, { payload }) => ({
      ...state,
      bb: payload
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
