import React from 'react'

export default props => {
  return (
    <div style={{ marginBottom: 30, height: 46, lineHeight: '46px', borderBottom: '1px solid #ededed' }}>
      <span
        onClick={() => props.history.push('/crm/shiting')}
        style={{
          cursor: 'pointer',
          fontSize: 16,
          padding: '0 20px 10px',
          borderBottom: !props.isShenQin ? '3px solid #3385ff' : 'none'
        }}
      >
        试听课列表
      </span>
      <span
        onClick={() => props.history.push('/crm/auditApplication')}
        style={{
          cursor: 'pointer',
          lineHeight: '46px',
          fontSize: 16,
          padding: '0 20px 10px',
          borderBottom: props.isShenQin ? '3px solid #3385ff' : 'none'
        }}
      >
        试听课申请
      </span>
    </div>
  )
}
