import React, { useCallback, useState } from 'react'
import { model, useModel } from 'ymcore/useModel'
import API from '../../utils/axios'
import Component from './cmp/component'
import { setInput } from '../../utils/hooks'
import { Input, Button } from 'antd'
import { Dialog } from 'ymcmp'

model({
  API,
  namespace: 'Demo',
  kk2n: 1,
  bb: 'a',
  getList: 'get /biz/auth/detail/staff',
  t: false
})

function Demo() {
  let m = useModel('Demo')
  return (
    <div>
      <Dialog text={'ddzxczx'} visible={m.t}></Dialog>
      <Input {...setInput(11, m.kk2nUp)} />
      <Button
        onClick={() => {
          m.tUp(!m.t)
        }}
      >
        ssd
      </Button>
      <Component kk2n={m.kk2n} />
      同步数据：{m.kk2n}
      <br />
      <button
        onClick={() => {
          m.kk2nUp(22)
        }}
      >
        异步
      </button>
      <br />
      异步数据：{m.getListRes?.data?.staffRealName}
      <br />
      <button
        onClick={() => {
          m.getList({ kk: 'ss' })
        }}
      >
        异步
      </button>
    </div>
  )
}

export default Demo
