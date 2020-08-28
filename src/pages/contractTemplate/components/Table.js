import React from 'react'
import { Divider, /*Tag,*/ Modal } from 'antd'
import { Table } from 'ymcmp'
import API from '../../../utils/axios'

export default ({ m, assignEnterpriseCode }) => {
  const columns = [
    {
      title: '模版名称',
      dataIndex: 'name'
    },
    {
      title: '模板类型',
      dataIndex: 'typeDesc'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: txt => {
        if (txt === 3) {
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
      title: '最后编辑人',
      dataIndex: 'updateByName'
    },
    {
      title: '最后编辑时间',
      dataIndex: 'updateByTime'
    },
    {
      title: '操作',
      render: d => {
        return (
          <div key={'s'}>
            <a
              onClick={async () => {
                await m.selIdUp(d.id)
                await m.getInfo({ templateId: d.id })
                if (!m.getInfoRes.data?.status) return false
                m.infoModalShowUp(true)
              }}
            >
              查看
            </a>
            <Divider type="vertical" />
            <a
              onClick={async () => {
                await m.selIdUp(d.id)
                await m.getInfo({ templateId: d.id })
                if (!m.getInfoRes.data?.status) return false
                m.editModalShowUp(true)
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={async () => {
                await m.selIdUp(d.id)
                await m.getInfo({ templateId: d.id })
                if (!m.getInfoRes.data?.status) return false
                m.fuZhiModalShowUp(true)
              }}
            >
              复制
            </a>
            {[3].includes(d.status) && (
              <span>
                <Divider type="vertical" />
                <a
                  onClick={() => {
                    if ([2, 3].includes(d.status)) {
                      Modal.confirm({
                        mask: false,
                        title: `你确定要${d.status === 3 ? '启用' : '停用'}吗`,
                        content:
                          d.status === 3
                            ? '同类型有且只有一个启用模板，若要启用此模板，同类型其他模板板将自动被停用'
                            : '',
                        onOk: async () => {
                          await m.qidongAndTingYong({ templateId: d.id, isEnable: d.status === 2 ? 3 : 2 })
                          m.search()
                        }
                      })
                    }
                  }}
                >
                  {d.status === 3 ? '启用' : d.status === 2 ? '停用' : ''}
                </a>
              </span>
            )}

            {d.status !== 2 && (
              <span>
                <Divider type="vertical" />
                <a
                  onClick={() => {
                    Modal.confirm({
                      mask: false,
                      title: '确定要删除该模板？',
                      content: '删除后该模板将从系统彻底消失，不能找回！',
                      onOk: async () => {
                        await m.del({ templateId: d.id })
                        m.search()
                      }
                    })
                  }}
                >
                  删除
                </a>
              </span>
            )}
          </div>
        )
      }
    }
  ]
  return (
    <Table
      columns={columns}
      API={API}
      pageSizeOptions={['10', '20', '30', '50', '100']}
      url="/orderservice/contract/protocoltemplates/list"
      params={{ ...m.seachParams, assignEnterpriseCode }}
      onChange={v => m.search(v.current, v.pageSize)}
    />
  )
}
