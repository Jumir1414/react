import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import  Table  from './Table'

export const Header = () => {
  return (
    <Container  fluid>
        <Row >
            <Col className="align-items-center" style={{color: 'rgb(17, 17, 48)' ,fontSize:"1.6rem"}} >
                <h1>User List</h1>
            </Col>

            <Col className='text-end' style={{color: 'green' ,fontSize:"1.6rem", cursor:'pointer'}} >
                <a >Create User</a>
            </Col>
        </Row>
        <Row>
            <Col>
                <Table/>
            </Col>
        </Row>
    </Container>
  )
}
