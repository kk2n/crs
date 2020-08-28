module.exports = {
  //获取赠送状态列表 fang
  'get /biz/sales/mgm/bestow/status/list': {
    data: [{ id: 0, name: '数据' }]
  },
  // 获取渠道列表 fang
  'get /biz/sales/mgm/channel/list': {
    data: [{ id: 0, name: '数据' }]
  },
  // 获取被邀请人状态列表 fang
  'get /biz/sales/mgm/invited/status/list': {
    data: [{ id: 0, name: '数据' }]
  },
  //  赠送\查看详情接口 良
  'get /biz/sales/mgm/present/info': {
    data: {
      contractId: 1001,
      lessonCount: 120,
      inviteCountLimit: 10,
      invitedCountLimit: 20,
      invite: {
        clientId: 1002,
        clientName: '哈里森福特',
        isPresent: false,
        contractId: 1004,
        presentCount: 10,
        subject: '数学',
        createdBy: '尚格云顿',
        createdOn: '2019-10-10 00:00:00',
        enterpriseCode: 'YIMI'
      },
      invited: {
        clientId: 1005,
        clientName: '梅尔吉普森',
        isPresent: false,
        contractId: 1006,
        presentCount: 10,
        subject: '数学',
        createdBy: '托尼屎大颗',
        createdOn: '2019-10-10 00:00:00',
        enterpriseCode: 'YIMI'
      }
    }
  },
  // 科目列表 良
  'get /biz/sales/mgm/subject/list': {
    data: [{ id: 1, name: '数据', remainCount: 10 }]
  },
  // 邀请关系列表 fang
  'get /biz/sales/mgm/invite/relation/list': {
    data: [{ id: 1, name: '数据' }]
  },
  // 赠送课时 良
  'post /biz/sales/mgm/present': {
    data: null
  },
  // 邀请人列表 fang
  /*
   * inviteKey
   * */
  'get /biz/sales/mgm/invite/user/list': {
    data: [{ id: 1, name: '数据' }]
  },
  // 邀请人列表 fang
  /*
   * inviteKey
   * */
  'get /biz/sales/mgm/invitedUserList': {
    data: [{ id: 1, name: '数据' }]
  },
  // 文件上传获取token fang
  /*
  fileTypeEnum truestring
fileName truestring
  * */
  'post /biz/sales/mgm/getUploadToken': {
    data: {
      bucketkey: 'test-file-system-public',
      key: 'contractInfo/2019/11/20/20/2c247b134dd944fc853b7261abaddf87',
      ak: 'c617485f0b8211eaa9e75394bda53fee',
      sk: 'd69af36b506e48d68f28fb5e85cfe596',
      endPoint: 'https://su.bcebos.com',
      sessionToken:
        'MjUzZjQzNTY4OTE0NDRkNjg3N2E4YzJhZTc4YmU5ZDh8AAAAAMkCAADQz4EFAX5dbHikEYrb24bz8A5flF/xQyiEENh5mVLwbQYbF7nS1NcObmZdxexWByojFvnSThjV+TnQ6JN+agmFP7jr44aQqBxK3tX5Y0XYYnveFhr4dj7zTPmuvryOdw7K5avtYNsUDV/jmo/P19yk+XIO23DI9H5Kv+AvAT2QOlSp0AKVC3x942Y3rxUQGsCu4W5ZFnZtpyODZe20NVZd9tpOnM7Ox8MXQjg8s4Z+rGdaPHC8WZZeM54o/LlnisDLVoN7l2JZ6pwb0M4UCTn39kjmFhWr4Cr0190tlEo0eebUIm3uDCuIk7mC+cbU06lJvdV7uEtotVoF6PKAs+htBSTfHi+XgSYi2Nc41CMCRyT7blOWh81dt90d0rfCgRTi5qVKiIRPbqf/2JFugUutbg5MF6c/qZiNxhgeHJr5NWijZLAH614BFS4gzBJWs4yiRS6q/NTKiDpnH3H518doDAVez20OMMqh2euo7rRGJk6tLWGwU+Dcd3NbN9MfGP+Y9Lr6Fh1JuyMIClu3b+vO2TUgBEjZd0jHK80axeu/V5VUdaBr+nQ+rTMLTguT52g=',
      viewDomain: null
    }
  },
  'get /biz/sales/mgm/getDownLoadUrl': {
    data: {
      invokeNo: '',
      fileKey: 'contractInfo/2019/11/20/20/2c247b134dd944fc853b7261abaddf87',
      downLoadUrl: 'https://sit03-login.yimifudao.com/asset/img/logo.png'
    }
  },
  //  新增邀请关系 fang
  /*
inviteUserId truenumber 邀请人Id
invitedUserId truenumber 被邀请人Id
relationName truestring 关系描述
imgUrl truearray[string] 凭证list
  * */
  'POST /biz/sales/mgm/invite/add': {
    data: null
  },
  // mgm邀请列表 fang
  'post /biz/sales/mgm/invite/list': {
    data: {
      pageSize: 10,
      pageNum: 1,
      total: 10,
      'list|2': [
        {
          inviteId: 0,
          inviteDate: '2019-22-23',
          inviteUserName: '@cname',
          invitedUserName: '@cname',
          inviteUserPhone: '13531544954',
          invitedId: 0,
          invitedUserPhone: '13531544954',
          'invitedUserStatusId|1': [0, 4, 5],
          invitedUserStatusDesc: 'sdfsdf',
          channelId: 0,
          channelName: 'aasd',
          relationName: 'sfsdf',
          imgUrlList: [
            'https://sit01-login.yimifudao.com/asset/img/beijing.e4037.png',
            'https://sit01-login.yimifudao.com/asset/img/logo.png'
          ],
          'inviteFreeContractFid|1': [1, 0],
          'invitedFreeContractFid|1': [1, 0],
          createUserId: 0,
          createName: '2019-22-23',
          id: '@id'
        }
      ]
    }
  }
}
