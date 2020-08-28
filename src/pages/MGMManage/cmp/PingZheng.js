import { Col, Modal, Row } from 'antd'
import { toArr } from 'ymcmp/array'
import React from 'react'

export default function PingZheng(props) {
  return (
    <Modal
      width={1000}
      title={false}
      footer={false}
      visible={props.MGMManage.pzImgModal}
      onCancel={() => {
        props.selImgUp('')
        props.pzImgModalUp(false)
      }}
    >
      <div>
        <Row>
          <Col span={6}>
            <div style={{ overflow: 'auto', maxHeight: 650 }}>
              {toArr(props.MGMManage.selPingZheng).map((a, aa) => (
                <div key={'img' + aa}>
                  <img src={a} alt="" style={{ width: '100%' }} onClick={() => props.selImgUp(a)} />
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </Col>
          <Col span={1} />
          <Col span={16}>
            <img
              style={{ width: '100%' }}
              src={props.MGMManage.selImg || toArr(props.MGMManage.selPingZheng)[0]}
              alt=""
            />
          </Col>
        </Row>
      </div>
    </Modal>
  )
}
