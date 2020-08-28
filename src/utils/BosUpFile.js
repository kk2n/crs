import { BosClient, HttpClient, MimeType } from '@baiducloud/sdk/dist/baidubce-sdk.bundle'
import API, { local } from './axios'
import { message } from 'antd'

let default_doRequest = HttpClient.prototype._doRequest
HttpClient.prototype._doRequest = function(options, body, outputStream) {
  options.withCredentials = false
  return default_doRequest.call(this, options, body, outputStream)
}

/*
 * 上传文件
 * @param client，BosToken方法，方法的obj
 * @param file 文件流
 * @return {*} 返回Promise
 */
export function uploadFile({ bucketkey, key, ak, sk, endPoint: endpoint, sessionToken }, file) {
  let params = {
    endpoint,
    credentials: { ak, sk },
    sessionToken
  }
  //console.log('params', params)
  let client = new BosClient(params)
  let fileName = file.name
  let ext = fileName.split(/\./g).pop()
  let mimeType = MimeType.guess(ext)
  if (/^text\//.test(mimeType)) {
    mimeType += '; charset=UTF-8'
  }
  let options = {
    headers: {
      'Content-Type': mimeType
    }
  }
  if (!local) return client.putObjectFromBlob(bucketkey, key, file, options)
  else
    return new Promise(resolver => {
      resolver({})
    })
}

/*
 * 获取token
 * @params fileName 文件名
 * @params fileTypeEnum 接口定义的枚举类型，一般是字符，有后端定义
 * @params clientId 选填
 */
export async function bosToken(fileName, fileTypeEnum, clientId) {
  //获取BOS token
  let { data, status, msg } = await API.post('/biz/sales/upload/token', {
    fileName,
    fileTypeEnum,
    clientId
  })
  if (!status) {
    message.error(msg)
    return false
  }
  let { bucketkey, key, accessKeyId: ak, secretAccessKey: sk, endPoint, sessionToken, viewDomain, invokeNo } = data
  return { bucketkey, key, ak, sk, endPoint, sessionToken, viewDomain, invokeNo }
}

/*
 * 再次封装的BOS方法,作用：获取bostoken，上传，上传成功后，根据需求执行其他方法
 * @param action //antd upfile组件的action
 * @param fileTypeEnum  //获取token时的参数，接口上传文件标示，通常是：后台约定枚举
 * @param clientId  //clientId
 * @return 无
 * 方法调用 action.onSuccess方法，回调数据,包括：data,file,url
 */
export default async ({ action, fileTypeEnum, clientId = null }) => {
  let { file } = action
  if (!file) {
    throw new Error('文件对象不能为空')
  }
  let fileName = file.name
  let getToken = await bosToken(fileName, fileTypeEnum, clientId)
  //console.log('getToken', getToken)
  let { key, bucketkey } = getToken
  //上传res
  uploadFile(getToken, file)
    .then(async res => {
      console.log('res', res)
      //上传百度成功后调后台接口拿文件url
      let { data, status, msg } = await API.post('/biz/sales/upload/success/file', { key, fileName, fileTypeEnum })
      if (!status) {
        action.onError && action.onError(msg)
        return false
      }
      //执行onSuccess事件
      action.onSuccess &&
        action.onSuccess({ data, file, key, bucketkey, url: `https://${bucketkey}.gz.bcebos.com/${key}` })
    })
    .catch(error => {
      // eslint-disable-next-line no-new
      new Error(error.message || '文件读取异常')
      action.onError && action.onError(error.message)
    })
}
