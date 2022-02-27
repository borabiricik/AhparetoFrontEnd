import React from 'react'
import { FcApproval } from 'react-icons/fc'
import { Row } from 'reactstrap'

const Approved = () => {
  return (
    <Row className='align-items-center'>
        <FcApproval color="#5CECC0" size={24} /> 
        <p>Approved</p>
    </Row>
  )
}

export default Approved