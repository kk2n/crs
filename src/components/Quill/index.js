import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
export default class extends Component {
  componentDidMount() {
    if (this.q && typeof this.q.getEditor === 'function') {
      let q = this.q?.getEditor()
      this.props.getQuill(q)
    }
  }
  render() {
    return (
      <div>
        <ReactQuill
          placeholder={'请输入..'}
          ref={q => (this.q = q)}
          theme={'snow'}
          defaultValue={this.props.defaultValue}
          onChange={val => {
            console.log('val', val)
            this.setState({ val: val })
            this.props.onChange && this.props.onChange(val)
          }}
          {...this.props}
          style={{
            height: 180,
            width: 640,
            lineHeight: '20px',
            marginBottom: 42,
            ...this.props.style
          }}
        />
      </div>
    )
  }
}
