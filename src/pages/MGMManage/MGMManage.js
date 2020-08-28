import { connect } from './MGMManageModel'
import Search from './cmp/Search'
import { Button, Tag } from 'antd'
import API from '../../utils/axios'
import UrlTable from 'ymcmp/lib/UrlTable'
import 'ymcmp/lib/UrlTable/index.css'
import PingZheng from './cmp/PingZheng'
import Add from './cmp/Add'
import ZengSong from './cmp/ZengSong'
import rj from '../../utils/jsonRender'

export default connect(props => {
  let columns = [
    {
      title: '邀请时间',
      dataIndex: 'inviteDate',
      sorter: 1,
      sortOrder: props.MGMManage.params.sort === 'desc' ? 'descend' : 'ascend',
      onHeaderCell: () => ({
        onClick: () => props.sorterUp()
      })
    },
    {
      title: '邀请人姓名',
      dataIndex: 'inviteUserName',
      render: (v, d) => rj([v + ' ', { tag: Tag, isRender: d.inviteFreeContractFid !== 0, color: 'blue', body: '赠' }])
    },
    {
      title: '邀请人手机',
      dataIndex: 'inviteUserPhone'
    },
    {
      title: '被邀请人姓名',
      dataIndex: 'invitedUserName',
      render: (v, d) => rj([v + ' ', { tag: Tag, body: '赠', color: 'blue', isRender: d.invitedFreeContractFid !== 0 }])
    },
    {
      title: '被邀请人手机号',
      dataIndex: 'invitedUserPhone'
    },
    {
      title: '被邀请人状态',
      dataIndex: 'invitedUserStatusDesc'
    },
    {
      title: '渠道',
      dataIndex: 'channelName'
    },
    {
      title: '创建人',
      dataIndex: 'createName'
    },
    {
      title: '关系',
      dataIndex: 'relationName'
    },
    {
      title: '凭证',
      render: d =>
        rj({
          tag: 'a',
          onClick: async () => {
            await props.selPingZhengUp(d.imgUrlList)
            props.pzImgModalUp(true)
          },
          body: Boolean(d.imgUrlList?.length) && d.imgUrlList?.length
        })
    },
    {
      title: '操作',
      width: 150,
      render: d => {
        let body =
          (d.invitedUserStatusId === 4 || d.invitedUserStatusId === 5) &&
          (d.inviteFreeContractFid !== 0 || d.invitedFreeContractFid !== 0)
            ? '查看'
            : d.inviteFreeContractFid === 0 && d.invitedFreeContractFid === 0 && d.invitedUserStatusId === 4
            ? '赠送'
            : ''
        return rj({
          tag: 'a',
          body,
          onClick: async () => {
            await props.selInviteIdUp(d.id)
            let { data, status } = await API.get('/biz/sales/mgm/present/info', { inviteId: d.id })
            if (!status) return false
            await props.infoUp(data)
            props.isEditUp(false)
            props.zsModalUp(true)
          }
        })
      }
    }
  ]
  return rj({
    body: [
      {
        tag: Search,
        ...props
      },
      {
        tag: Button,
        style: { marginBottom: 20 },
        type: 'primary',
        body: '+ 新建MGM',
        onClick: () => props.addModalUp(true)
      },
      {
        tag: UrlTable,
        columns,
        API,
        method: 'post',
        url: '/biz/sales/mgm/invite/list',
        params: props.MGMManage.params,
        pageSizeOptions: ['10', '20', '30', '50', '100']
      },
      {
        tag: props.MGMManage.pzImgModal && PingZheng,
        ...props
      },
      {
        tag: props.MGMManage.addModal && Add,
        refresh: props.refresh,
        ...props
      },
      {
        tag: props.MGMManage.zsModal && ZengSong,
        ...props
      }
    ]
  })
})
