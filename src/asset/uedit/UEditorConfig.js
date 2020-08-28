import { connect } from 'react-redux'
//uedit配置
export let UEditReduce = connect(() => ({
  UEditConfig: {
    //focus时自动清空初始化时的内容
    autoClearinitialContent: true,
    //关闭字数统计
    wordCount: false,
    elementPathEnabled: false,
    toolbars: [
      [
        //  全屏
        'fullscreen',
        'source',
        'fontsize',
        'fontfamily',
        // 字体颜色
        'forecolor',
        // 字体背景颜色
        'backcolor',
        // 加粗
        'bold',
        // 斜体
        'italic',
        // 下划线
        'underline',
        // 边框
        'fontborder',
        '|',
        // 撤销
        'undo',
        // 恢复
        'redo',
        // 上角标
        'superscript',
        // 下角标
        'subscript',
        // 插入有序列表
        'insertorderedlist',
        // 插入无序列表
        'insertunorderedlist',
        '|',
        // "simpleupload",
        'macros',
        'insertimage',
        '|',
        'inserttable',
        'deletetable',
        'insertparagraphbeforetable',
        'insertrow',
        'deleterow',
        'insertcol',
        'deletecol',
        'mergecells',
        'mergeright',
        'mergedown',
        'splittocells',
        'splittorows',
        'splittocols',
        'preview',
        'kity'
      ]
    ],
    //当鼠标放在工具栏上时显示的tooltip提示,留空支持自动多语言配置，否则以配置值为准
    labelMap: { macros: '图片上传', kity: '上传公式' }
  }
}))
