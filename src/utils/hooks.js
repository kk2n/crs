import { useState, useCallback, useRef, useEffect } from 'react'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

/*
Input HOOKS
 initialState初始值
 otherFn 其他函数，可以理解为回调函数，
 by  返回对象的键，默认为：{ value:'*',onChange:fn }
 使用：
 let [value,onChange,onReset] = useInput(11)
 */
export let useInput = (initialState = '') => {
  let [value, setValue] = useState(initialState)
  let onChange = event => {
    setValue(event.target.value)
  }
  let onReset = newValue => {
    setValue(newValue || initialState)
  }
  return [value, onChange, onReset]
}
/*
 设置表单元素，适用于所有，输出为event的组件 ,如input,textarea
 initialState初始值
 otherFn 其他函数，可以理解为回调函数，
 by  返回对象的键，默认为：{ value:'*',onChange:fn }
 使用: <Input {...setInput(11, m.kk2nUp)} />
  */
export let setInput = (initialState = '', otherFn, by = 'value,onChange,onReset') => {
  let [value, setValue] = useState(initialState)
  let onChange = event => {
    setValue(event.target.value)
    otherFn && otherFn(event.target.value)
  }
  let reset = newValue => {
    setValue(newValue || initialState)
    otherFn && otherFn(newValue)
  }
  return [value, onChange, reset].reduce(
    (x, y, z) => ({
      ...x,
      ...(by.split(',')[z] ? { [by.split(',')[z]]: y } : {})
    }),
    {}
  )
}
/*
设置表单元素，适用于所有，输出为value的组件
 initialState初始值
 otherFn 其他函数，可以理解为回调函数，
 by  返回对象的键，默认为：{ value:'*',onChange:fn }
 使用: <Sel {...setFormItem(11, m.kk2nUp)} />
* */
export let setFormItem = (initialState = '', otherFn, by = 'value,onChange,onReset') => {
  let [value, setValue] = useState(initialState)
  let onChange = v => {
    setValue(v)
    otherFn && otherFn(v)
  }
  let reset = newValue => {
    setValue(newValue || initialState)
    otherFn && otherFn(newValue)
  }
  return [value, onChange, reset].reduce(
    (x, y, z) => ({
      ...x,
      ...(by.split(',')[z] ? { [by.split(',')[z]]: y } : {})
    }),
    {}
  )
}

export let useModal = (showCallback, hideCallback) => {
  let [isOpen, setIsOpen] = useState(false)
  let showModal = useCallback(extraParam => {
    setIsOpen(true)
    if (showCallback && extraParam !== undefined) {
      showCallback(extraParam)
    }
  })
  let hideModal = useCallback(extraParam => {
    setIsOpen(false)
    if (hideCallback && extraParam !== undefined) {
      hideCallback(extraParam)
    }
  })
  return [isOpen, showModal, hideModal]
}
