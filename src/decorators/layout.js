import React from 'react'
import { Breadcrumb, Layout } from 'antd'
import Menu from '../Layout/Menu'
import Header from '../Layout/Header'
import { Link } from 'react-router-dom'
import { connect } from '../pages/commonModel'

const { Content, Footer, Sider } = Layout
export default Page =>
  connect(props => {
    const { breadcrumb, location } = props
    let breadcrumbNameMap = {}
    breadcrumb?.Pages.forEach(item => (breadcrumbNameMap[item.path] = item.title))
    const pathSnippets = location?.pathname.split('/').filter(i => i)
    const breadcrumbItems =
      breadcrumb?.breakData && breadcrumb.breakData.length > 0
        ? breadcrumb?.breakData.map((route, index) => {
            if (!route.url) return <Breadcrumb.Item key={index}>{route.title}</Breadcrumb.Item>
            return (
              <Breadcrumb.Item key={index}>
                <Link to={route.url}>{route.title}</Link>
              </Breadcrumb.Item>
            )
          })
        : (pathSnippets || []).map((route, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
            if (pathSnippets.length - 1 <= index) {
              return (
                <Breadcrumb.Item key={url}>
                  {breadcrumbNameMap[url] ? breadcrumbNameMap[url] : breadcrumbNameMap[url]}
                </Breadcrumb.Item>
              )
            }
            return (
              <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url] ? breadcrumbNameMap[url] : breadcrumbNameMap[url]}</Link>
              </Breadcrumb.Item>
            )
          })
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsed={props.Common.collapsed} width={252}>
          <Link to={'/'}>
            <Logo collapsed={props.Common.collapsed} />
          </Link>
          <Menu collapsed={props.Common.collapsed} history={props.history} Common={props.Common} />
        </Sider>
        <Layout>
          <Header onChangToggle={() => props.collapsedUp(!props.Common.collapsed)} Common={props.Common} />
          <Content id="main" style={{ display: 'flex', flexDirection: 'column', minWidth: 1000 }}>
            <div style={{ padding: 10 }}>
              <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            </div>
            <div className="sys-content">
              <Page {...props} />
            </div>
          </Content>
          <Footer className="sys-foot">版权所有 ©2019 溢米辅导</Footer>
        </Layout>
      </Layout>
    )
  })

/**
 * @Logo，外框组件的logo
 * @param {object} props 属性
 * @return {*} description
 * @constructor
 */
function Logo(props) {
  return (
    <div className="logo-wrap">
      <div className="logo" />
      {!props.collapsed && <div className="logo-text">溢米辅导</div>}
    </div>
  )
}
