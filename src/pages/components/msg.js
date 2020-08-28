import { message } from 'antd'

message.config({
  top: '5%',
  duration: 2,
  maxCount: 1
})
export default message

/*
message.success(content, [duration], onClose)

message.error(content, [duration], onClose)

message.info(content, [duration], onClose)

message.warning(content, [duration], onClose)

message.warn(content, [duration], onClose) // alias of warning

message.loading(content, [duration], onClose)

例子
 message.info('msg');
 message.success('msg', 10)
 message.loading('msg', 2.5).then(() => message.success('msg', 2.5))



还提供了全局配置和全局销毁方法：
message.config(options)
message.destroy()
* */
