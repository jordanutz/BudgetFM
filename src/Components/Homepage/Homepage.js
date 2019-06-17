import React from 'react'
import './Homepage.scss'

// Images
import Category from './assets/clipboard.svg'
import Chart from './assets/graph.svg'
import Credit from './assets/credit.svg'
import Dream from './assets/idea.svg'
import Feature from './assets/money.svg'
import Reminder from './assets/reminder.svg'
import Radio from '../Header/assets/radio.svg'


// React Bootstrap
import {Container, Row, Col, Card} from 'react-bootstrap'

const Homepage = (props) => {
  return (
    <main>
      <div className="Cover">
          <section className="CoverDetails">
          <div className="Overlay"></div>
            <h1>Where budgeting happens.</h1>
            <p>Expense tracker that works anywhere, anytime. Whatever budgeting means to you, BudgetFM brings all the pieces and tools you need togther, so you can actually meet your goals.</p>
            <button>Get Started</button>
          </section>
          <section className="CoverIcons">
            <img src={Radio} alt="Boombox"/>
          </section>
      </div>
    
      <section className="Features">
        <h2>Features</h2>
        <Container>
          <Row>
            <Col md={6} lg={4}>
              <Card className="FeatureCard" style={{ width: '100%'}}>
                <Card.Img variant="top" src={Feature} alt="Card" />
                <Card.Body>
                  <Card.Title className="CardHeader">Budget</Card.Title>
                  <Card.Text>
                    <p>Set a budget for each category of expense and receive a reminder when you are close to exceed your budget.</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="FeatureCard" style={{ width: '100%'}}>
                <Card.Img variant="top" src={Credit} alt="Card" />
                <Card.Body>
                  <Card.Title className="CardHeader">Credit Card</Card.Title>
                  <Card.Text>
                    <p>Manage all your credit cards to not get charged interest on everything on your card. Plan to pay off in full each month.</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="FeatureCard" style={{ width: '100%'}}>
                <Card.Img variant="top" src={Category} alt="Card" />
                <Card.Body>
                  <Card.Title className="CardHeader">Categories</Card.Title>
                  <Card.Text>
                    <p>Create categories for your expenses and incomes. Choose an icon and color making it unique for you.</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="FeatureCard" style={{ width: '100%'}}>
                <Card.Img variant="top" src={Dream} alt="Card" />
                <Card.Body>
                  <Card.Title className="CardHeader">Dreams Tool</Card.Title>
                  <Card.Text>
                    <p>Create dreams, save money and make it come true.</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="FeatureCard" style={{ width: '100%'}}>
                <Card.Img variant="top" src={Reminder} alt="Card" />
                <Card.Body>
                  <Card.Title className="CardHeader">Reminder</Card.Title>
                  <Card.Text>
                    <p>BudgetFM will remind you when your bills are due so you'll never miss a payment again.</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="FeatureCard" style={{ width: '100%'}}>
                <Card.Img variant="top" src={Chart} alt="Card" />
                <Card.Body>
                  <Card.Title className="CardHeader">Charts</Card.Title>
                  <Card.Text>
                    <p>See where you are spending all your money with powerful charts.</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  )
}

export default Homepage
