import React from 'react'
import { Col, Input } from 'reactstrap'

const DynamicFormInput = ({label,}) => {
  return (
    <Col md="4">
        <Input type='text' />
    </Col>
  )
}

export default DynamicFormInput