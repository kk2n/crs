import React from 'react'
import { Modal } from 'antd'
let tags = [
  {
    color: '#3bbd15',
    title: '客户资料',
    mark: '$Customer',
    template: '<p>学生姓名：</p><p>用户注册名：</p><p>家长姓名：</p><p>家长联系方式：</p>'
  },
  {
    color: '#259ebd',
    title: '合同资料',
    mark: '$contract',
    template: `<table class="preview-table">
    <tr><td>合同号</td><td>购买课时</td><td>课时单价</td><td>课时总价</td><td>有效期开始日期</td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>赠送课时</td><td>优惠金额</td><td>加价购</td><td>合同应付金额</td><td>有效期结束日期</td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </table>`
  },
  {
    color: '#1f52bd',
    title: '赠品',
    mark: '$giftInfo',
    template: `<table class="preview-table">
    <tr><td>编号</td><td>赠品名称</td><td>价值</td></tr>
    <tr><td></td><td></td><td></td></tr>
  </table>`
  },
  {
    color: '#7a28bd',
    title: '重点条款',
    mark: '$$',
    template: '<input class="preview-checkbox js-important" type="checkbox"/>'
  }
]
export default ({ m }) => {
  let onCancel = () => {
    m.selIdUp('')
    m.infoModalShowUp(false)
  }
  let txt = m.getInfoRes?.data?.content || ''
  let marksReg = new RegExp(tags.map(tag => tag.mark.replace(/\$/g, '\\$')).join('|'), 'g')
  let markTemplateMap = tags.reduce((prev, tag) => ({ ...prev, [tag.mark]: tag.template }), {})
  let replaceMark = text => text.replace(marksReg, item => markTemplateMap[item])
  let previewContent = replaceMark(txt)
  return (
    <Modal
      mask={false}
      title={m.getInfoRes?.data?.name}
      visible={m.infoModalShow}
      onCancel={onCancel}
      centered
      width={780}
      footer={null}
    >
      <div className="c-contract-preview yulan" dangerouslySetInnerHTML={{ __html: previewContent }} />
    </Modal>
  )
}
