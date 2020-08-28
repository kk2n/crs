import React from 'react'

export default () => {
  return (
    <div className="reportLayout">
      <iframe
        style={{ width: '100%', height: 'calc(100vh - 42px - 64px - 18px - 18px - 42px)' }}
        src="/crm/durationReportIfr"
      />
    </div>
  )
}
