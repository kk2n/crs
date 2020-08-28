export default [
  {
    title: '通时通次报表',
    component: require('bundle-loader?lazy&name=[name]!./durationReport/TongHuaTongJi'),
    exact: true,
    noLayout: true,
    path: '/crm/durationReportIfr'
  },
  {
    title: '通时通次报表',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '通时通次报表' }],
    component: require('bundle-loader?lazy&name=[name]!./durationReport/Layout'),
    path: '/report/durationReport'
  },
  {
    title: '门店总表',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '门店运营总表' }],
    component: require('bundle-loader?lazy&name=[name]!./storeReport/storeReport'),
    path: '/report/storeReport'
  },
  {
    title: '销售KPI报表',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '销售KPI报表' }],
    component: require('bundle-loader?lazy&name=[name]!./ccKPIReport/ccKPI'),
    path: '/report/ccKPIReport'
  },
  {
    title: '客服KPI报表',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '客服KPI报表' }],
    component: require('bundle-loader?lazy&name=[name]!./crKPIReport/crKPI'),
    path: '/report/crKPIReport'
  }
  /*{
    title: '销售KPI报表',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '销售KPI报表' }],
    component: require('bundle-loader?lazy&name=[name]!./durationReport/Layout'),
    path: '/report/durationReport'
  },*/
  /*  {
    title: '客服KPI报表',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '客服KPI报表' }],
    component: require('bundle-loader?lazy&name=[name]!./durationReport/Layout'),
    path: '/report/durationReport'
  }*/
]
