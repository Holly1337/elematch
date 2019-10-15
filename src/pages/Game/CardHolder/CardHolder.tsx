import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from './Card/Card'

const CardHolder = () => {
  return (
    <Row>
      <Col>
        <Card isSelected />
      </Col>
      <Col>
        <Card />
      </Col>
      <Col>
        <Card />
      </Col>
      <Col>
        <Card />
      </Col>
    </Row>
  )
}

export default CardHolder
