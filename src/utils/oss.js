import OSS from '../../node_modules/ali-oss/dist/aliyun-oss-sdk'
import { ajax } from './axios'
import uuidv5 from 'uuid/v5'
import { stringify } from 'qs'
import { message } from 'antd'
import store from '../common/store'
import { env } from '../utils/axios'
import { getFileExtensionName } from './function'
let userId = store.getState().Common.logger.id

/**
 * OSS服务
 * @param filePath 文件在oss里的路径
 * @param file
 */

export const fileToOss = async ({ file, filePath }) => {
  //模拟上传
  if (env === 'my-') return [`/asset/img/logo.png`]
  if (!file) throw new Error('文件对象不能为空')
  let date = new Date()
  //文件名
  let fileName = uuidv5(String(Date.now()), uuidv5.URL)
  //文件类型
  let fileType = getFileExtensionName(file.name)

  let param = {
    userId: userId < 10 ? 99 : userId,
    name: filePath
  }
  //验证用户
  let res = await ajax.get(`/support/oss/security?${stringify(param)}`)
  if (res.status !== 2000) return false
  //存放路径
  filePath = `/ptkjy/${res.data.bucketInfo.preffix}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  //放入oss的全路径
  let storeAs = `${filePath}/${fileName}.${fileType}`

  //创建oss实例
  let ossClient = new OSS.Wrapper({
    endpoint: null,
    region: 'oss-cn-hangzhou',
    accessKeyId: res.data.keyId,
    accessKeySecret: res.data.secret,
    stsToken: res.data.token,
    bucket: res.data.bucketInfo.bucket
  })
  //执行上传操作
  try {
    let ossRes = await ossClient.multipartUpload(storeAs, file, {
      progress: async function(p, checkpoint) {
        message.info('oss上传进度：' + parseInt(p * 100) + '%')
        //let tempCheckpoint = checkpoint
      },
      meta: { year: 2017, people: 'test' },
      mime: 'image/jpeg'
    })
    if (ossRes.res.status !== 200) {
      message.error('oss上传出现错误！')
      return false
    }
    message.success(`${file.name}上传成功！`)
    //返回上传文件的信息
    return [`http://${res.data.bucketInfo.bucket}.yimixuexi.com${ossRes.name}`]
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * antd 的上传组件调用oss方法
 * @param action
 * @param filePath
 * @return {Promise<boolean|string[]>}
 *
 * 用法：
 * <Dragger
 name="bigCoverUrl"
 accept="image/*"
 customRequest={action => uploadToOss({ action, filePath: 'course' })}
 onSuccess={this.onFileSuccessBig}
 >...
 */
export const uploadToOss = async ({ action, filePath = 'yimifudao' }) => {
  let ossRes = await fileToOss({ file: action.file, filePath })
  action.onSuccess && action.onSuccess(ossRes)
  return ossRes
}
