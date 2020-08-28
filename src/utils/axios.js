import { message } from 'antd'
import { Api } from 'ymcmp/axios'
import { getToken } from 'ymcmp/getToken'
import { goLogin } from 'ymcmp/goLogin'
import { url } from 'ymcmp/url'
import { isLocal } from 'ymcmp/isLocal'
import { useAPI as useFetch } from 'ymcore/useAPI'

message.config({ maxCount: 1 })
//isLocal设置为1时本地mock
export let isBD = val => (/-l\./.test(location.hostname) ? 'l' : /-o\./.test(location.hostname) ? 'o' : val) //调用外部网址用的
export let local = isLocal(1)
export let env = url().env
export let domain = url().domain
export let token = getToken()
export let assignEnterpriseCode = url().query.from
export let host = sys => `${env}${isBD(sys || 'crm')}.${domain}`

let API = new Api({
  apiName: local ? 'l' : 'crmapi',
  apiPort: local && '8011',
  apiPath: local && '/db',
  timeout: 120000,
  headers: {
    'X-AUTH-TOKEN': token,
    'X-AUTH-REQUEST-FROM': 'CRM',
    'X-AUTH-REQUEST-INFO': 'CROME'
  },
  resIntercept: res => {
    !res.config.noLoad && message.destroy()
    let { code, msg } = res.data
    res.data.status = code === '000000' || res.data.success === true
    if (typeof code !== 'string') throw new Error('接口返回的code类型错误！')
    if (typeof msg !== 'string') throw new Error('接口返回的msg类型错误！')
    if (code === '660002') goLogin('token验证失效，即将跳转到登录')
    if (!res.data.status) message.error(msg)
    return res.data
  },
  reqIntercept: config => {
    let noLogin = [
      '/biz/sales/contract/getPreOrderListByContractId',
      '/biz/sales/contract/freeLessonNetworkList',
      '/biz/sales/contract/studyKeeperList',
      '/biz/sales/dict/area',
      '/biz/sales/dict/subject',
      '/biz/sales/dict/gift/getGiftList',
      '/biz/sales/dict/getActivityList',
      '/biz/sales/dict/grade',
      '/biz/sales/contract/updateOrRepealContractLimit',
      '/biz/auth/operation/permission',
      '/biz/sales/dict/getContractTypeList',
      '/biz/sales/contract/isNewOrOld',
      '/biz/sales/contract/detail/get'
    ]
    if (noLogin.includes(config.url.split('?')[0].replace(config.baseURL, ''))) config.noLoad = true
    config.load = !config.noLoad && (() => message.loading('加载中...', 0))
    return config
  }
})
export default API
export const useAPI = (path, parmas, desp) => useFetch(API, path, parmas, desp)
