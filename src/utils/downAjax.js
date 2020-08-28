import { message } from 'antd'
import { Api } from 'ymcmp/axios'
import { getToken } from 'ymcmp/getToken'
import { isLocal } from 'ymcmp/isLocal'

//isLocal设置为1时本地mock
let local = isLocal(1)
let token = getToken()
//解码
function deCode(str) {
  return decodeURIComponent(decodeURIComponent(str))
}
//下载文件流
export function download(data, fileName) {
  if (!data) return
  let murl = window.webkitURL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = murl
  link.setAttribute('download', deCode(fileName))
  document.body.appendChild(link)
  link.click()
}

let API = new Api({
  apiName: local ? 'l' : 'crmapi',
  apiPort: local && '8011',
  apiPath: local && '/db',
  timeout: 120000,
  responseType: 'blob',
  headers: {
    'X-AUTH-TOKEN': token,
    'X-AUTH-REQUEST-FROM': 'CRM',
    'X-AUTH-REQUEST-INFO': 'CROME'
  },
  resIntercept: res => {
    !res.config.noLoad && message.destroy()
    if (res.headers) {
      //let fileName = res.headers['content-disposition']
      //fileName = ((((fileName || '').split(';') || [])[1] || '').split('=') || [])[1]
      //download(res.request.response, deCode(fileName || JSON.parse(res.config.data)?.fileName))
      return res
    }
  },
  reqIntercept: config => {
    let noLogin = []
    if (noLogin.includes(config.url.split('?')[0].replace(config.baseURL, ''))) config.noLoad = true
    config.load = !config.noLoad && (() => message.loading('加载中...', 0))
    return config
  }
})
export default API
