import React, {useContext, useState, useEffect} from 'react'
import './Income.scss'
import CountUp from 'react-countup'
import axios from 'axios'

// Components
import Menu from '../Menu/Menu'
import NoAccess from '../NoAccess/NoAccess'
import {Container, Row, Col} from 'react-bootstrap'
import UserCalendar from '../UserCalendar/UserCalendar'
import AddIncome from '../AddIncome/AddIncome'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

// Context
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Income = () => {

  const {user} = useContext(AuthContext)
  const {setBalance} = useContext(ProfileContext)
  const [toggle, setToggle] = useState(false)
  const [date, setDate] = useState(new Date())
  const [income, setIncome] = useState(null)
  const [sum, setSum] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const [results, setResults] = useState(0)

  useEffect( () => {
    const getIncome = async () => {
      const res = await axios.get(`/api/income?date=${date}`)
      setIncome(res.data.getIncome)
      setSum(res.data.sumIncome)
      setResults(postsPerPage)
    }
    getIncome();
  }, [date])

  const toggleAdd = () => {
    setToggle(!toggle)
  }

  const deleteEntry = (e, id, amount) => {
    e.preventDefault()
    const deleteIncome = async () => {
      const res = await axios.delete(`/api/income?id=${id}&date=${date}&amount=${amount}`)
      setIncome(res.data.getIncome)
      setSum(res.data.sumIncome)
      setBalance(res.data.updatedBalance)
    }
    deleteIncome();
  }

  const colorSelection = {
    gift: '#F14135', 
    investment: '#5218E1', 
    rewards: '#18E12D', 
    salary: '#18C6E1', 
    other: '#FFE826'
  }

  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = income && income.slice(firstIndex, lastIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const submitIncome = (e, description, category, amount, date) => {
    e.preventDefault()
  
    let income = {
      description, 
      category, 
      amount, 
      date
    }
  
    axios.post('/api/income', {income})
    .then(res => {
      setToggle(false)
      setIncome(res.data.getIncome)
      setSum(res.data.sumIncome)
      setBalance(res.data.updatedBalance)
    })
    .catch(err => console.log(err))
  }

  const displayToggle = toggle &&
    <div className="ToggleOverlay">
      <AddIncome colorSelection={colorSelection} submitIncome={submitIncome} setToggle={setToggle} />
    </div>

  const incomeLog = currentPosts && currentPosts.map(single => {
    return (
      <Row className="HeadingRow IncomeLog" key={single.income}>
        <Col xs={12} sm={12} md={3} lg={3}>
          <h2>{single.date_posted}</h2>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3}>
          <h2>{single.description}</h2>
        </Col>  
        <Col xs={12} sm={12} md={3} lg={3} className="IncomeCategory">
            <i className={single.icon} style={{backgroundColor: colorSelection[single.type.toLowerCase()]}}></i>
            <h2>{single.type}</h2>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3} style={{position: 'relative'}}>
          <h2><span>$</span>{parseFloat(Math.round(single.amount * 100) / 100).toFixed(2)}</h2>
          <i id="DeleteLog" className="fas fa-trash-alt" onClick={(e) => deleteEntry(e, single.income, single.amount)}></i>
        </Col>
      </Row>
    )
  })

  const totalPosts = income && income.length

  const displayIncome = user ? 
    <div className="Income">
      <Menu />
      <section className="IncomeMain">
        <Container>
          <Row className="IncomeDetails">
            <Col xs={12} sm={12} md={8} lg={8} style={{padding: '0'}}>
              <section className="IncomeHeader">
                <h1>Income</h1>
                <button onClick={toggleAdd}>Add New Income</button>    
              </section>
              <Row className="IncomeList">
                <Col xs={12} sm={12} md={12} lg={12} style={{padding: '0'}}>
                  <section className="IncomeSearch">
                    <input placeholder="Search" type="text" />
                    <Pagination
                      onChange={handlePageChange}
                      current={currentPage}
                      total={income && income.length}
                      pageSize={postsPerPage}
                      />
                  </section>
                </Col>
                <Row className="HeadingRow">
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <h2>Date</h2>
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
                {incomeLog}
              </Row>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <section className="IncomeCard">
              <h3>$<span><CountUp
                  start={0}
                  end={sum ? parseInt(sum[0].sum) : 0}
                  delay={0}
                  decimals={0}
                  duration={1}
                >
                </CountUp></span></h3>
            </section>
            <UserCalendar date={date} setDate={setDate} />
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
      {displayIncome}
    </React.Fragment>
  )
}

export default Income