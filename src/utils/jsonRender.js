import React, { Fragment } from 'react'
import { isArray, isObject, isString, rest, isUndefined, compact, isBoolean } from 'underscore'

//处理className
let createClass = (temp, className) => {
  let classArr = compact([...temp, ...(isArray(className) ? className : [className])])
  if (!classArr.length) {
    return undefined
  }
  return classArr.join(' ')
}

//判断是JSX组件或字符串或bool等能直接渲染的元素
let isJsx = target => isObject(target) && !target.$$typeof
//renderJson
export default function rj(target) {
  //渲染JSX
  let render = (tar, key = '_key') => {
    //是对象，又不是JSX时
    if (isJsx(tar)) {
      let { tag: Tag, body, isRender = true, ...props } = tar
      if (isBoolean(Tag) && !Tag) return null
      //如obj带有isRender，直接禁止渲染
      if (!isRender) return null
      //如果没有设置Tag，直接用占位符代替
      if (isUndefined(Tag) && !isJsx(body)) return body
      //如果tag是字符串，顺便处理一下className
      if (isString(Tag)) {
        let temp = Tag.split('.')
        props.className = createClass(rest(temp), props.className)
        Tag = temp[0]
      }
      //如果Tag未空，用Fragment代替
      if (isUndefined(Tag)) {
        Tag = Fragment
      }
      return (
        <Tag key={key} {...props}>
          {body && rj(body)}
        </Tag>
      )
    } else {
      return tar
    }
  }

  //根据类型
  if (isArray(target)) {
    return target.map(render)
  } else if (isJsx(target)) {
    return render(target)
  }
  return target
}
