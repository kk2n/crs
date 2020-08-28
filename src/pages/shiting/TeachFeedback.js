import React, { useMemo, useState, useEffect, useCallback } from 'react'

import API from '../../utils/axios'

import { Table } from 'antd'

import './TeachFeedback.scss'

function TeachFeedback(props) {
  const { applicationId } = props

  const [detail, setDetail] = useState({})

  const columns1 = useMemo(
    () => [
      {
        title: '维度',
        key: 'dimension',
        dataIndex: 'dimension'
      },
      {
        title: '优点分析',
        key: 'advantage',
        dataIndex: 'advantage'
      },
      {
        title: '不足之处',
        key: 'disadvantage',
        dataIndex: 'disadvantage'
      }
    ],
    []
  )

  const columns2 = useMemo(
    () => [
      {
        title: '知识点',
        key: 'point',
        dataIndex: 'point'
      },
      {
        title: '分值/等级',
        key: 'grade',
        dataIndex: 'grade'
      },
      {
        title: '优点分析',
        key: 'advantage',
        dataIndex: 'advantage'
      },
      {
        title: '不足之处',
        key: 'disadvantage',
        dataIndex: 'disadvantage'
      }
    ],
    []
  )

  const columns3 = useMemo(
    () => [
      {
        title: '模块',
        key: 'planNum',
        dataIndex: 'planNum'
      },
      {
        title: '预计内容',
        key: 'planContent',
        dataIndex: 'planContent'
      },
      {
        title: '预计课时数',
        key: 'planHours',
        dataIndex: 'planHours'
      }
    ],
    []
  )

  // 获取授课反馈详情
  const getFeedback = useCallback(async () => {
    const { status, data } = await API.get('/biz/sales/stk/lesson/teachingFeedBack/detail', { applicationId })
    if (status) setDetail(data)
  }, [])

  useEffect(() => {
    getFeedback()
  }, [])

  return (
    <div className="teach-fb-wrap">
      <div className="fb-row">
        <h5>试听课前学生对云教室了解情况：</h5>
        <div className="fb-fb">{detail.stuCloud}</div>
      </div>
      <div className="fb-row">
        <h5>本次试听课网络及APP状况：</h5>
        <div className="fb-fb">{detail.lessonNetwork}</div>
      </div>
      <div className="fb-main">
        <h4>本次试听课反映出学生的情况</h4>
        <div>
          <div className="fb-row">
            <h5>学习能力评价：</h5>
            <Table columns={columns1} dataSource={detail.learnAbilities} rowKey="tId" pagination={false} size="small" />
          </div>
          <div className="fb-row">
            <h5>学科等级评价：</h5>
            <Table columns={columns2} dataSource={detail.subjectGrades} rowKey="tId" pagination={false} size="small" />
          </div>
          <div className="fb-row">
            <h5>授课内容与当地学情考情匹配明细：</h5>
            <div className="fb-fb">{detail.lessonMatch}</div>
          </div>
          <div className="fb-row">
            <h5>预计课时规划：</h5>
            <Table
              columns={columns3}
              dataSource={detail.plansListMap}
              rowKey="planNum"
              pagination={false}
              size="small"
            />
          </div>
          <div className="fb-row">
            <h5>预期补习目标：</h5>
            <div className="fb-fb">{detail.lessonTarget}</div>
          </div>
          <div className="fb-row">
            <h5>家长对本次课程意见：</h5>
            <div className="fb-fb">{detail.parentOpinion}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeachFeedback
