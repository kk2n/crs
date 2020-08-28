import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { Button } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
function ContractContent(props) {
  // value必须加上默认空字符串，否则报错
  const { value = '', onChange } = props
  const [previewContent, setPreviewContent] = useState('')
  const [isPreview, setPreview] = useState(false)
  const reactQuillRef = useRef(null)
  const editorRef = useRef(null)
  const tags = [
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
  const marksReg = useMemo(() => new RegExp(tags.map(tag => tag.mark.replace(/\$/g, '\\$')).join('|'), 'g'), [])
  const markTemplateMap = useMemo(() => tags.reduce((prev, tag) => ({ ...prev, [tag.mark]: tag.template }), {}), [])
  // 插入标记
  const insertMark = mark => {
    const range = editorRef.current.getSelection()
    const position = range ? range.index : 0
    editorRef.current.insertText(position, mark)
  }
  // 替换标记
  const replaceMark = useCallback(text => text.replace(marksReg, item => markTemplateMap[item]), [])
  useEffect(() => {
    if (isPreview) {
      setPreviewContent(replaceMark(value))
    }
  }, [isPreview])
  useEffect(() => {
    if (reactQuillRef.current && typeof reactQuillRef.current.getEditor === 'function') {
      editorRef.current = reactQuillRef.current.getEditor()
    }
  })
  return !isPreview ? (
    <div className="c-contract-content">
      <div>
        {/* 注意：这里不能使用Tag，而是使用Button。使用Tag会导致getSelection无法获取位置 */}
        {tags.map(tag => (
          <Button
            key={tag.title}
            size={'small'}
            style={{
              marginRight: 6,
              color: tag.color,
              border: `1px solid ${tag.color}`
            }}
            onClick={() => insertMark(tag.mark)}
          >{`${tag.title} ${tag.mark}`}</Button>
        ))}
      </div>
      <div className="tips_kk">
        <p>在下方编辑器内编辑时，点击上面的标签可插入相应资料</p>
        <p>举例：点击重点条款，在$$后输入条款内容</p>
      </div>
      <ReactQuill
        ref={reactQuillRef}
        value={value}
        onChange={onChange}
        theme={'snow'}
        style={{ height: 180, width: 640, lineHeight: '20px', marginBottom: 42 }}
      />
      <Button
        onClick={async () => {
          await setPreview(!isPreview)
          console.log('value', value)
        }}
      >
        预览
      </Button>
    </div>
  ) : (
    <div className="c-contract-preview" dangerouslySetInnerHTML={{ __html: previewContent }} />
  )
}

const ContractContentWithRef = React.forwardRef(() => <ContractContent />)
export default ContractContentWithRef
