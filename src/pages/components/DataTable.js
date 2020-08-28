import { Table } from 'antd'
import React from 'react'

function DataTable(props) {
  return (
    <div className="leads-table">
      <Table
        // loading={props.loading.effects['MyLeads/getList']}
        columns={props.columns}
        dataSource={(props.myLeadsList || {}).list}
        rowKey="leadsId"
        pagination={{
          current: (props.myLeadsList || {}).pageNum,
          pageSize: (props.myLeadsList || {}).pageSize,
          total: (props.myLeadsList || {}).total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100', '200', '500'],
          showTotal: (t, r) => (
            <div style={{ float: 'left' }}>
              当前显示{r[0]}-{r[1]}条/共{t}条
            </div>
          ),
          onChange: async page => {
            await props.pageNumUp({ ...props.pageNum, [props.leadsType]: page })
            props.getList()
          },
          onShowSizeChange: async (_, size) => {
            await props.pageNumUp({ ...props.pageNum, [props.leadsType]: 1 })
            await props.pageSizeUp({ ...props.pageSize, [props.leadsType]: size })
            props.getList()
          }
        }}
      />
    </div>
  )
}

export default DataTable
