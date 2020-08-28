import { createModel } from 'ymcore/createModel'

const organizationModel = {
  //命名空间
  name: 'Organization',
  //初始化数据
  initState: {
    // roleAuthView: {}
  },
  //==已下全部为方法,connect到页面后，使用this.props.**()调用==============
  //第一种：字符形式
  kk2nUp: 'kk2n',
  //菜单功能接口
  menuFuncView: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/menuFuncView`
    }
  },
  //获取用户数据、字段、功能权限接口
  userOtherAuthView: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/userOtherAuthView`
    }
  },
  //获取用户角色接口
  userRoleAuthView: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/userRoleAuthView`
    }
  },
  //保存用户权限接口
  saveUserAuth: {
    autoReduce: true,
    promise: {
      url: `post /sys-manage/yimi/mid/manage/config/saveUserAuth`
    }
  },
  //获取组织架构接口
  orgTree: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/orgTree`
    }
  },
  //根据组织获取员工接口
  getUserByDep: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/getUserByDep`
    }
  },
  //树结构
  sysMenuView: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/sysMenuView`
    }
  }
}

export const { connect, reduce } = createModel(organizationModel)
