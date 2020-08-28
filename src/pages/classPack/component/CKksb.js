import { Modal, Table } from 'antd'
import React from 'react'
import { Item } from 'ymcmp'
import { toArr } from 'ymcmp/array'
import { compact } from 'underscore'
export default ({ ClassPack }) => {
  let detailInfo = ClassPack.classDetailRes.data
  let columns = [
    {
      title: '年级',
      dataIndex: 'gradeName'
    },
    {
      title: '课时价格',
      dataIndex: 'unitPrice'
    }
  ]
  toArr(detailInfo?.priceList?.[0]?.details).forEach((a, bb) => {
    columns.push({
      title: a.lessonHour,
      children: [
        {
          title: '总价',
          key: Math.random(),
          render: obj => obj?.['details']?.[bb]?.['totalPrice']
        },
        {
          title: '优惠上限',
          key: Math.random(),
          render: obj => obj?.['details']?.[bb]?.['maxDiscountAmount']
        }
      ]
    })
  })
  return (
    <Modal
      closable
      centered
      footer={false}
      title="查看课时包"
      width={'100%'}
      height={'100%'}
      style={{ top: 0 }}
      mask={false}
      wrapClassName={'chakan-modal'}
      visible={ClassPack.chakanModalShow}
      onCancel={() => ClassPack.chakanModalShowUp(false)}
    >
      <Item
        leftSpan={3}
        data={compact([
          {
            name: '名称',
            value: detailInfo.name
          },
          {
            name: '类型',
            value: detailInfo.typeName
          },
          // detailInfo.type === 5 &&
          //   ((detailInfo?.rule?.signingDay && detailInfo?.rule?.lessonHour) || detailInfo?.rule?.totalLessonHour) && {
          //     name: '规则',
          //     value: (
          //       <div>
          //         {detailInfo?.rule?.signingDay && detailInfo?.rule?.lessonHour && (
          //           <span>
          //             1、新签学员在签约后【{detailInfo?.rule?.signingDay ? detailInfo?.rule?.signingDay : '未设置'}】
          //             天内再续费，购买>【{detailInfo?.rule?.lessonHour ? detailInfo?.rule?.lessonHour : '未设置'}】
          //             课时都可以享受当前价格表最大的优惠
          //           </span>
          //         )}
          //         {detailInfo?.rule?.signingDay && detailInfo?.rule?.lessonHour ? <br /> : null}
          //         {detailInfo?.rule?.totalLessonHour && (
          //           <span>
          //             {detailInfo?.rule?.signingDay && detailInfo?.rule?.lessonHour ? 2 : 1}
          //             、学员累计已购买的常规课时数达到 【
          //             {detailInfo?.rule?.totalLessonHour ? detailInfo?.rule?.totalLessonHour : '未设置'}】
          //             课时后，可永久享受当前价格表最大的优惠
          //           </span>
          //         )}
          //       </div>
          //     )
          //   },
          detailInfo.type === 5 && {
            name: '规则',
            value: (
              <div>
                1、新签学员在签约后【{detailInfo?.rule?.signingDay ? detailInfo?.rule?.signingDay : '未设置'}】
                天内再续费，购买>【{detailInfo?.rule?.lessonHour ? detailInfo?.rule?.lessonHour : '未设置'}】
                课时都可以享受当前价格表最大的优惠 <br />
                2、学员累计已购买的常规课时数达到 【
                {detailInfo?.rule?.totalLessonHour ? detailInfo?.rule?.totalLessonHour : '未设置'}】
                课时后，可永久享受当前价格表最大的优惠
              </div>
            )
          },
          {
            name: '价格',
            value: (
              <Table rowKey="gradeId" columns={columns} bordered dataSource={detailInfo.priceList} pagination={false} />
            )
          },
          {
            name: '图片',
            value: (
              <a
                onClick={() => {
                  let newwin = window.open()
                  newwin.document.write('<img src=' + detailInfo.imageUrl + ' />')
                }}
              >
                <img src={detailInfo.imageUrl} alt="" style={{ maxWidth: 120 }} />
              </a>
            )
          }
        ])}
      />
    </Modal>
  )
}
