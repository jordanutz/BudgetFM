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

// Context
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Expenses = () => {

  const {user} = useContext(AuthContext)
  const {setBalance} = useContext(ProfileContext)
  const [toggle, setToggle] = useState(false)
  const [date, setDate] = useState(new Date())
  const [expenses, setExpenses] = useState(null)
  const [sum, setSum] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [toggleDate, setToggleDate] = useState(false)
  

  useEffect( () => {

    if (search) {
      axios.get(`/api/expense/search?date=${date}&search=${search}`)
      .then(res => setExpenses(res.data))
      .catch(err => console.log(err))
    } else {
      getExpense()
    }

  }, [date, search, toggleDate])

  const getExpense = async () => {
    const res = await axios.get(`/api/expense?date=${date}&dateOrder=${toggleDate}`)
    setExpenses(res.data.getExpense)
    setSum(res.data.sumExpense)
  }

  const toggleAdd = () => {
    setToggle(!toggle)
  }

  const deleteEntry = (e, id, amount) => {
    e.preventDefault()
    const deleteExpense = async () => {
      const res = await axios.delete(`/api/expense?id=${id}&date=${date}&amount=${amount}`)
      setExpenses(res.data.getExpense)
      setSum(res.data.sumExpense)
      setBalance(res.data.updatedBalance)
    }
    deleteExpense();
  }

  const colorSelection = {
    payments: '#F14135', 
    food: '#E118A7', 
    home: '#5218E1', 
    clothing: '#18E12D', 
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
      date
    }
  
    axios.post('/api/expense', {expense})
    .then(res => {
      setToggle(false)
      setExpenses(res.data.getExpense)
      setSum(res.data.sumExpense)
      setBalance(res.data.updatedBalance)
    })
    .catch(err => console.log(err))
  }
  
  const displayToggle = toggle &&
    <div className="ToggleOverlay">
      <AddExpense colorSelection={colorSelection} submitExpense={submitExpense} setToggle={setToggle} />
    </div>

  const expensesLog = currentPosts && currentPosts.map(single => {
    return (
      <Row className="HeadingRow ExpenseLog" key={single.expenses}>
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
                <Col xs={12} sm={12} md={12} lg={12} style={{padding: '0'}}>
                  <section className="ExpenseSearch">
                    <input placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)} />
                    <img src={Search} />
                    <Pagination
                      onChange={handlePageChange}
                      current={currentPage}
                      total={expenses && expenses.length}
                      pageSize={postsPerPage}

                    />
                  </section>
                </Col>
                <Row className="HeadingRow MobileNone">
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <h2 style={{cursor: 'pointer'}} onClick={handleDateToggle}>Date</h2>
                  </Col>
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <h2>Description</h2>
                  </Col>
                  <Col xs={12} sm={12} md={3} lg={3}>
                      <h2>Category</h2>
                  </Col>
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <h2>Amount</h2>
                  </Col>
                </Row>
                {expensesLog}
              </Row>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className="MobileExpense">
            <section className="ExpenseCard">
              <h3>$<span><CountUp
                  start={0}
                  end={sum ? sum[0].sum : 0}
                  delay={0}
                  decimals={0}
                  duration={1}
                >
                </CountUp></span></h3>
            </section>
 
            <UserCalendar 
              date={date}
              setDate={setDate}
            />
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