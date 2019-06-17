import React from 'react'
import './Footer.scss'

// React Bootstrap
import {Container, Row, Col} from 'react-bootstrap'

const Footer = (props) => {
  return (
    <footer>
      <Container>
        <Row>

          <Col xs={6} lg={3}>
            <h4 className="PrimaryText">Company</h4>
            <ul>
              <li>About Us</li>
              <li>Leadership</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </Col>

  

          <Col xs={6} lg={3}>
            <h4 className="PrimaryAccent">Product</h4>
            <ul>
              <li>Enterprise</li>
              <li>Developers</li>
              <li>Pricing</li>
              <li>Testimonials</li>
            </ul>
          </Col>

          <Col xs={6} lg={3}>
            <h4 className="SecondaryAccent">Legal</h4>
            <ul>
              <li>Privacy</li>
              <li>Security</li>
              <li>Policies</li>
              <li>Terms of Service</li>
            </ul>
          </Col>

          <Col xs={6} lg={3}>
            <h4 className="SecondaryText">Resources</h4>
            <ul>
              <li>Directory</li>
              <li>Budgeting Tips</li>
              <li>Help Center</li>
              <li>Meet Developer</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
