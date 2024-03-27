import React from 'react'
import { Image } from "react-bootstrap"
import { Container, Row, Col } from "react-bootstrap"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import '../styles/landing.css';

function landing() {
  return (
    <div className="landing-page">
    <Container>
        <Row className="justify-content-md-center welcome" >
          <Col >
            <h2>Welcome to</h2>
          </Col>
        </Row>
        <Row></Row>
        <Row lg={3} className="justify-content-md-center body-content">
          <Col>
            <Image src={Redivivus} />
          </Col>
        </Row>
        <Row className="justify-content-md-center body-content" >
          <Col>
            <h5>The best online garbage recycling platform</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Lottie
              options={defaultOptions}
              height={200}
              width={200} />
          </Col>
        </Row>

        <Row className="justify-content-md-center body-content">
          <Col>
            <Button>
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
  </div>
  )
}

export default landing