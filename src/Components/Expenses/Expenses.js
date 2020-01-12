import React, {useContext, useState, useEffect} from 'react'
import './Expenses.scss'
import CountUp from 'react-countup'
import axios from 'axios'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import UserCalendar from '../UserCalendar/UserCalendar'
import AddExpense from '../AddExpense/AddExpense'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Search from '../Income/assets/search.svg'
import Moment from 'react-moment'
import { Doughnut } from 'react-chartjs-2';

// Context
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Expenses = (props) => {

  const {user} = useContext(AuthContext)
  const {setBalance, date} = useContext(ProfileContext)
  const [toggle, setToggle] = useState(false)
  const [expenses, setExpenses] = useState(null)
  const [sum, setSum] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [toggleDate, setToggleDate] = useState(false)
  const [summary, setSummary] = useState(null)
  const [toggleSummary, setToggleSummary] = useState(false)
  const [previous, setPrevious] = useState(null)

  useEffect( () => {

    if (search) {
      axios.get(`/api/expense/search?date=${date}&search=${search}`)
      .then(res => {
        setExpenses(res.data)
      })
      .catch(err => console.log(err))
    } else {
      getExpense()
      getSummary();
    }

  }, [date, search, toggleDate])

  const getExpense = () => {
    axios.get(`/api/expense?date=${date}&dateOrder=${toggleDate}`)
    .then(res => {
      setExpenses(res.data.getExpense)
      setSum(res.data.sumExpense)
    })
    .catch(err => console.log(err))
  }

  const toggleAdd = () => {
    setToggle(!toggle)
  }

  const getSummary = () => {
    axios.get(`/api/summary/expense?date=${date}`)
    .then(res => setSummary(res.data))
    .catch(err => console.log(err))
  }

  const deleteEntry = (e, id, amount) => {
    e.preventDefault()

    const deleteExpense = () => {
      axios.delete(`/api/expense?id=${id}&date=${date}&amount=${amount}`)
      .then(res => {
        setExpenses(res.data.getExpense)
        setSum(res.data.sumExpense)
        setBalance(res.data.updatedBalance)
        getSummary();
      }).catch(err => console.log(err))
    }
    deleteExpense();
  }

  const colorSelection = {
    payments: '#F52F57', 
    food: '#E118A7', 
    home: '#5218E1', 
    clothing: '#16E697', 
    education: '#1843E1', 
    recreation: '#18C6E1', 
    transportation: '#B318E1', 
    other: '#FFE826'
  }

  const handleDateToggle = () => {
    setToggleDate(!toggleDate)
  }

  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = expenses && expenses.slice(firstIndex, lastIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const submitExpense = (e, description, category, amount, date) => {
    e.preventDefault()
  
    let expense = {
      description, 
      category, 
      amount, 
      date, 
      previous
    }
  
    axios.post('/api/expense', {expense})
    .then(res => {
      setToggle(false)
      setExpenses(res.data.getExpense)
      setSum(res.data.sumExpense)
      setBalance(res.data.updatedBalance)
      setPrevious(res.data.previous)
      getSummary();
    })
    .catch(err => console.log(err))
  }
  
  const displayToggle = toggle &&
    <div className="ToggleOverlay">
      <AddExpense 
        colorSelection={colorSelection} 
        submitExpense={submitExpense} 
        setToggle={setToggle} 
        date={date} />
    </div>

  const handleSummaryToggle = () => {
    setToggleSummary(!toggleSummary);
  }

  const expenseSummary = {
    labels: [
      'Clothing', 
      'Education', 
      'Food', 
      'Home', 
      'Other', 
      'Payments', 
      'Recreation', 
      'Transportation'
    ], 
    datasets: [{
      data: [
        summary && summary.clothing, 
        summary && summary.education, 
        summary && summary.food, 
        summary && summary.home, 
        summary && summary.otherExpense, 
        summary && summary.payments, 
        summary && summary.recreation, 
        summary && summary.transportation 
      ], 
      backgroundColor: [ '#16E697', '#1843E1', '#E118A7', '#5218E1', '#FFE826', '#F52F57', '#18C6E1', '#B318E1']
    }]
  }


  const expensesLog = currentPosts && currentPosts.map(single => {
    return (
      <Row className="HeadingRow ExpenseLog" key={single.expense}>
        <Col xs={12} sm={12} md={3} lg={3}>
          <Moment format="MM/DD/YYYY" style={{fontWeight: '800'}}>{single.date_posted}</Moment>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3}>
          <h2>{single.description}</h2>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3} className="ExpenseCategory">
            <i className={single.icon} style={{backgroundColor: colorSelection[single.category.toLowerCase()]}}></i>
            <h2 className="MobileNone">{single.category}</h2>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3}>
          <h2><span>$</span>{parseFloat(Math.round(single.amount * 100) / 100).toFixed(2)}</h2>
          <i id="DeleteLog" className="fas fa-trash-alt" onClick={(e) => deleteEntry(e, single.expense, single.amount)}></i>
        </Col>
      </Row>
    )
  })

  const displaySummary = 
    <Container fluid className="Summary">
      <Row style={{marginTop: '10px'}} >
        <Col xs={12} lg={8} style={{display: 'flex', justifyContent: 'center'}}>
          <section style={{ width: '300px', height: '300px'}}>
            <Doughnut data={expenseSummary}
              width={100}
              height={100}
              options={{
                legend: {
                  display:false
                },
                  maintainAspectRatio: true
              }}/>
            </section> 
        </Col>
        <Col xs={12} lg={4} className="more-pd">
          <h2 className="center">Categories</h2>

          <section className="ExpenseCategory mb-2">
            <i className="fas fa-tshirt" style={{backgroundColor: colorSelection['clothing']}}></i>
            <h2>Clothing</h2>
          </section>

          <section className="ExpenseCategory mb-2">
            <i className="fas fa-pizza-slice" style={{backgroundColor: colorSelection['food']}}></i>
            <h2>Food</h2>
          </section>

          <section className="ExpenseCategory mb-2">
            <i className="fas fa-graduation-cap" style={{backgroundColor: colorSelection['education']}}></i>
            <h2>Education</h2>
          </section>

          <section className="ExpenseCategory mb-2">
            <i className="fas fa-home" style={{backgroundColor: colorSelection['home']}}></i>
            <h2>Home</h2>
          </section>

          <section className="ExpenseCategory mb-2">
            <i className="fab fa-superpowers" style={{backgroundColor: colorSelection['other']}}></i>
            <h2>Other</h2>
          </section>

          <section className="ExpenseCategory mb-2">
            <i className="fas fa-money-check" style={{backgroundColor: colorSelection['payments']}}></i>
            <h2>Payments</h2>
          </section>

          <section className="ExpenseCategory mb-2">
            <i className="fas fa-futbol" style={{backgroundColor: colorSelection['recreation']}}></i>
            <h2>Recreation</h2>
          </section>

          <section className="ExpenseCategory mb-2">
            <i className="fas fa-car" style={{backgroundColor: colorSelection['transportation']}}></i>
            <h2>Transportation</h2>
          </section>

        </Col>
      </Row>
    </Container>

  const displayExpenses = user ? 
    <div className="Expense">
      <Menu />
      <section className="ExpenseMain">
        <Container className="MobilePosition">
          <Row className="ExpenseDetails">
            <Col xs={12} sm={12} md={12} lg={8} style={{padding: '0'}}>
              <section className="ExpenseHeader">
                <h1>Expenses</h1>
                <button onClick={toggleAdd}>Add New Expense</button>    
              </section>
              <Row className="ExpenseList">
              {!toggleSummary &&
                <Col xs={12} sm={12} md={12} lg={12} style={{padding: '0'}}>
                  <section className="ExpenseSearch">
                    <input placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)} />
                    <img src={Search} />
                    {expenses && <Pagination
                      onChange={handlePageChange}
                      current={currentPage}
                      total={expenses && expenses.length}
                      pageSize={postsPerPage}
                      showTotal={(total, range) => `Displaying ${range[1]} of ${total}`}
                    /> }
                  </section>
                </Col>
              }
                { !toggleSummary && <Row className="HeadingRow MobileNone" style={{background: '#1E1F22'}}>
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <h2 style={{cursor: 'pointer', color: '#eee'}} onClick={handleDateToggle}>Date</h2>
                  </Col>
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <h2 style={{color: '#eee'}}>Description</h2>
                  </Col>
                  <Col xs={12} sm={12} md={3} lg={3}>
                      <h2 style={{color: '#eee'}}>Category</h2>
                  </Col>
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <h2 style={{color: '#eee'}}>Amount</h2>
                  </Col>
                </Row>
                }       
                {toggleSummary ? displaySummary : expensesLog}
                <button onClick={handleSummaryToggle}>{toggleSummary ? 'View Log' : 'View Summary'}</button> 
              </Row>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className="MobileExpense">
            <section className="ExpenseCard">
              <h3>$<span><CountUp
                  start={0}
                  end={sum ? parseFloat(sum[0].sum) : 0}
                  delay={0}
                  decimals={2}
                  duration={1}
                >
                </CountUp></span></h3>
            </section>
 
            <UserCalendar />
          </Col>
        </Row>
      </Container>  
    </section>
    {displayToggle}
  </div>

  : 

  <NoAccess />

  return (
    <React.Fragment>
      {displayExpenses}
    </React.Fragment>
  )
}

export default Expenses