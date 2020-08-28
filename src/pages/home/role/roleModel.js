import { createModel } from 'ymcore/createModel'

const roleModel = {
  //命名空间
  name: 'Home',
  //初始化数据
  initState: {
    roleList: {}
  },
  //==已下全部为方法,connect到页面后，使用this.props.**()调用==============
  //第一种：字符形式
  kk2nUp: 'kk2n',
  //搜索
  getRoleList: {
    autoReduce: true,
    promise: {
      url: `post /sys-manage/yimi/mid/manage/role/list`
    }
  },
  copyRoleAuth: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/copyRoleAuth`
    }
  },
  //角色启用/禁用接口
  roleStatus: {
    autoReduce: true,
    promise: {
      url: `post /sys-manage/yimi/mid/manage/role/status`
    }
  },
  //菜单功能接口
  menuFuncView: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/menuFuncView`
    }
  },
  //保存角色权限接口
  saveRoleAuth: {
    autoReduce: true,
    promise: {
      url: `post /sys-manage/yimi/mid/manage/config/saveRoleAuth`
    }
  },
  //查询角色启用账户
  userByRole: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/role/userByRole`
    }
  },
  //角色新增/修改接口
  update: {
    autoReduce: true,
    promise: {
      url: `post /sys-manage/yimi/mid/manage/role/update`
    }
  },
  //系统菜单树接口，对应角色权限页面的树(无需参数)
  sysMenuView: {
    autoReduce: true,
    promise: {
      url: `get /sys-manage/yimi/mid/manage/config/sysMenuView`
    }
  },
  //查询全部角色列表接口
  queryAllPage: {
    autoReduce: true,
    promise: {
      url: `post /sys-manage/yimi/mid/manage/role/queryAllPage`
    }
  }
}
//第一种：加入指定模块的数据
export const { connect, reduce } = createModel(roleModel)
