import React, {Component} from 'react'
import './Homepage.scss'

// Images
import Category from './assets/clipboard.svg'
import Chart from './assets/graph.svg'
import Credit from './assets/credit.svg'
import Dream from './assets/idea.svg'
import Feature from './assets/money.svg'
import Reminder from './assets/reminder.svg'


// React Bootstrap
import {Container, Row, Col, Card} from 'react-bootstrap'

class Homepage extends Component {
  constructor () {
    super()
    this.state = {
      email: ''
    }
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  render () {
    return (
      <main>
        <div className="Cover">
            <i className="fas fa-dollar-sign" id="DollarSign"></i>
            <i className="fas fa-comment" id="RedComment"></i>
            <i className="fas fa-money-check" id="MoneyCheck"></i>
            <i className="fab fa-modx" id="Modx"></i>
            <i className="fas fa-comment" id="BlueComment"></i>
            <i className="fas fa-gamepad" id="Game"></i>
            <i className="fas fa-headphones" id="Headphones"></i>
            <i className="fas fa-pizza-slice" id="Pizza"></i>
            <i className="fas fa-comment" id="YellowComment"></i>
            <i className="fas fa-plane" id="Plane"></i>

            <section className="CoverDetails">
                <h1>Where budgeting happens.</h1>
                <p>Expense tracker that works anywhere, anytime. Whatever budgeting means to you, BudgetFM brings all the pieces and tools you need together, so you can actually meet your goals.</p>
                <section className="CoverInput">
                  <input type="text" placeholder="Your Email" onChange={(e) => this.handleEmail(e)} value={this.state.email} />
                  <button>Try for Free</button>
                </section>
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
                      Set a budget for each category of expense and receive a reminder when you are close to exceed your budget.
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
                      Manage all your credit cards to not get charged interest on everything on your card. Plan to pay off in full each month.
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
                      Create categories for your expenses and incomes. Choose an icon and color making it unique for you.
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
                      Create dreams, save money and make it come true.
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
                      BudgetFM will remind you when your bills are due so you'll never miss a payment again.
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
                      See where you are spending all your money with powerful charts.
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
}

export default Homepage
