import React from 'react'
import API from '../../../utils/axios'
import { Table as UrlTable } from 'ymcmp'
import { message, Modal } from 'antd'

function Table({ ClassPack }) {
  let columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      key: 'typeName'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: v => {
        if (v === 0) {
          return (
            <span key={'d1'} className={'dy'}>
              停用
            </span>
          )
        }
        return (
          <span key={'d2'} className={'qy'}>
            启用
          </span>
        )
      }
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      render: d => {
        return (
          <div key={'ds12'}>
            <a
              onClick={async () => {
                await ClassPack.classDetail({ coursePackageId: d.id })
                ClassPack.chakanModalShowUp(true)
              }}
            >
              查看
            </a>
            &nbsp; &nbsp;
            <a
              onClick={async () => {
                await ClassPack.classDetail({ coursePackageId: d.id })
                ClassPack.fzModalShowUp(true)
              }}
            >
              复制
            </a>
            &nbsp; &nbsp;
            {d.status === 0 && (
              <span>
                <a
                  onClick={() =>
                    Modal.confirm({
                      mask: false,
                      title: '同类型有且只有一个启用模板',
                      content: '若要启用此模板，同类型其他模板板将自动被停用.',
                      onOk: async () => {
                        await ClassPack.startOrStop({ coursePackageId: d.id })
                        if (ClassPack.startOrStopRes.status) {
                          await message.success('操作成功！', 2)
                          ClassPack.searchData()
                        }
                      }
                    })
                  }
                >
                  启动
                </a>
                &nbsp; &nbsp;
              </span>
            )}
            {d.status === 0 && (
              <a
                onClick={async () => {
                  Modal.confirm({
                    mask: false,
                    title: d.status !== 1 ? '确定要删除该模板？' : '启用中的模版不能删除！',
                    content: d.status !== 1 ? '删除后该模板将从系统彻底消失，不能找回！' : '仅可删除被停用的模板。',
                    onOk: async () => {
                      await ClassPack.del({ coursePackageId: d.id })
                      if (ClassPack.delRes.status) {
                        await message.success('操作成功！', 2)
                        ClassPack.searchData()
                      }
                    }
                  })
                }}
              >
                删除
              </a>
            )}
          </div>
        )
      }
    }
  ]
  return (
    <UrlTable
      API={API}
      url={'/orderservice/coursepack/list'}
      columns={columns}
      rowKey="id"
      params={ClassPack.getListParams}
      pageSizeOptions={[10, 20, 30, 50, 100]}
    />
  )
}

export default Table
