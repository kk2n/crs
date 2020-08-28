import React from 'react'
import { Menu } from 'ymcmp'
import { env } from '../utils/axios'
import { toArr, rejectBad } from 'ymcore/array'
import { getHost } from 'ymcmp/getHost'

let hostUrl = (sys, url, prefix, xt = 'CRS') => {
  let pathname = url.split('/').map(a => a && !a.includes('.com') && !a.includes('http') && a)
  pathname = ('/' + rejectBad(pathname).join('/')).replace('/?', '?').split('?')[0]
  return {
    url: (prefix === 's-' ? '' : getHost({ to: sys !== xt ? sys : '', env })) + url,
    isOpen: sys !== xt,
    pathname
  }
}
let dg = (data, prefix = 's-') => {
  return toArr(data).map((a, aa) => {
    return {
      ...hostUrl(a.sys, a.url, prefix),
      name: a.name,
      show: true,
      icon: a.icon,
      key: prefix + aa,
      subMenu: toArr(a.menuList).length && dg(a.menuList, aa + '-')
    }
  })
}

export default props => (
  <div className="menu-com">
    <Menu history={props.history} menuData={dg(props.Common.menuRes.data)} collapsed={props.Common.collapsed} />
  </div>
)
