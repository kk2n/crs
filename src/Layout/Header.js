import React from 'react'
import { Avatar, Icon, Layout, Popconfirm } from 'antd'
import API, { env, domain, host } from '../utils/axios'
import { goLogin } from 'ymcmp/goLogin'

const { Header } = Layout
export default function UserInfo(props) {
  let { staffRealName: userName, staffHeadUrl: headUrl } = props.Common.staffRes.data
  headUrl = headUrl && `//${host('static')}/static-files/user_pics/` + headUrl
  return (
    <Header className="sys-header">
      <Icon
        className="trigger"
        type={props.Common.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={props.onChangToggle}
      />
      <div className="header-user">
        <ul>
          <li>
            <Avatar icon="user" src={headUrl} />
            <span>&nbsp;&nbsp;{userName}，欢迎您！</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>
              <Popconfirm
                placement="bottomLeft"
                title="您确定要退出吗？"
                onConfirm={async () => {
                  //退出操作
                  const { status } = await API.get(`//${env}mid.${domain}/yimi/mid/userLogout`)
                  if (!status) return false
                  goLogin('退出成功，即将跳转到登录页面')
                }}
              >
                <Icon type="logout" />
                <a className="logout-a">&nbsp;&nbsp;注销</a>
              </Popconfirm>
            </span>
          </li>
        </ul>
      </div>
    </Header>
  )
}
