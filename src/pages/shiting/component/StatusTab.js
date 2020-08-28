import React from 'react'
let leadsTypeArr = [
  { name: '全部', type: 0 },
  { name: '申请中', type: 1 },
  { name: '已同意', type: 2 },
  { name: '已拒绝', type: 3 },
  { name: '过期未响应', type: 4 }
]
export default props => {
  return (
    <div className="leads-tab-com">
      <div className="sttaps-nav">
        <div>
          {leadsTypeArr.map(a => (
            <span
              className={a.type === props.status ? 'tab onIt' : 'tab'}
              key={a.type || 'no'}
              onClick={async () => {
                await props.pageUp(1)
                await props.statusUp(a.type)
                props.getList()
              }}
            >
              {a.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
