import React, {useContext, useState, useEffect, useLayoutEffect} from 'react'
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
import Search from './assets/search.svg'
import Moment from 'react-moment'
import { Doughnut } from 'react-chartjs-2';

// Context
import {AuthContext} from '../../Context/AuthContext'
import {ProfileContext} from '../../Context/ProfileContext'

const Income = (props) => {

  // Component State

  const {user} = useContext(AuthContext)
  const {setBalance, date} = useContext(ProfileContext)
  const [toggle, setToggle] = useState(false)
  const [income, setIncome] = useState(null)
  const [sum, setSum] = useState(0)
  const [search, setSearch] = useState('')
  const [toggleDate, setToggleDate] = useState(false)
  const [summary, setSummary] = useState(null)
  const [toggleSummary, setToggleSummary] = useState(false)
  

  // Pagination & Results
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = income && income.slice(firstIndex, lastIndex)

  useEffect( () => {

    if (search) {
      axios.get(`/api/income/search?date=${date}&search=${search}`)
      .then(res => setIncome(res.data))
      .catch(err => console.log(err))
    } else {
      getIncome();
      getSummary();
    }
  }, [date, search, toggleDate])

  const toggleAdd = () => {
    setToggle(!toggle)
  }

  const getIncome = async () => {
    const res = await axios.get(`/api/income?date=${date}&dateOrder=${toggleDate}`)
    setIncome(res.data.getIncome)
    setSum(res.data.sumIncome)
  }

  const getSummary = async () => {
    const res = await axios.get(`/api/summary/income?date=${date}`)
    setSummary(res.data)
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
    getSummary();
  }

  const colorSelection = {
    gift: '#F52F57', 
    investment: '#5218E1', 
    other: '#FFE826',
    rewards: '#16E697', 
    salary: '#18C6E1'
  }

  // Income Summary 
  const incomeSummary  = {
    labels: [
      'Gift', 
      'Investment', 
      'Other', 
      'Rewards', 
      'Salary'
    ], 
    datasets: [{
      data: [summary && summary.gift, summary && summary.investment, summary && summary.otherIncome, summary && summary.reward, summary && summary.salary],
      backgroundColor: ['#F52F57', '#5218E1', '#FFE826', '#16E697', '#18C6E1']
    }]
  }

  const handleDateToggle = () => {
    setToggleDate(!toggleDate)
  }

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
      getSummary();
    })
    .catch(err => console.log(err))
  }

  const displayToggle = toggle &&
    <div className="ToggleOverlay">
      <AddIncome colorSelection={colorSelection} submitIncome={submitIncome} setToggle={setToggle} date={date}/>
    </div>

    const handleSummaryToggle = () => {
      setToggleSummary(!toggleSummary);
    }

  const incomeLog = currentPosts && currentPosts.map(single => {
    return (
      <Row className="HeadingRow IncomeLog" key={single.income}>
        <Col xs={12} sm={12} md={3} lg={3}>
        <Moment format="MM/DD/YYYY" style={{fontWeight: '800'}}>{single.date_posted}</Moment>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3}>
          <h2>{single.description}</h2>
        </Col>  
        <Col xs={12} sm={12} md={3} lg={3} className="IncomeCategory">
            <i className={single.icon} style={{backgroundColor: colorSelection[single.category.toLowerCase()]}}></i>
            <h2 className="MobileNone">{single.category}</h2>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3} style={{position: 'relative'}}>
          <h2><span>$</span>{parseFloat(Math.round(single.amount * 100) / 100).toFixed(2)}</h2>
          <i id="DeleteLog" className="fas fa-trash-alt" onClick={(e) => deleteEntry(e, single.income, single.amount)}></i>
        </Col>
      </Row>
    )
  })

  const displaySummary = 
    <Container fluid className="Summary">
      <Row style={{marginTop: '30px'}} >
        <Col xs={12} lg={8} style={{display: 'flex', justifyContent: 'center'}}>
          <section style={{ width: '300px', height: '300px'}}>
            <Doughnut data={incomeSummary}
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
        <Col xs={12} lg={4}>
          <h2 className="center">Categories</h2>

          <section className="IncomeCategory mb-3">
            <i className="fas fa-gift" style={{backgroundColor: colorSelection['gift']}}></i>
            <h2>Gift</h2>
          </section>

          <section className="IncomeCategory mb-3">
            <i className="fas fa-coins" style={{backgroundColor: colorSelection['investment']}}></i>
            <h2>Investment</h2>
          </section>

          <section className="IncomeCategory mb-3">
            <i className="fab fa-superpowers" style={{backgroundColor: colorSelection['other']}}></i>
            <h2>Other</h2>
          </section>

          <section className="IncomeCategory mb-3">
            <i className="fas fa-seedling" style={{backgroundColor: colorSelection['rewards']}}></i>
            <h2>Rewards</h2>
          </section>

          <section className="IncomeCategory mb-3">
            <i className="fas fa-dollar-sign" style={{backgroundColor: colorSelection['salary']}}></i>
            <h2>Salary</h2>
          </section>

         

        </Col>
      </Row>
    </Container>


  const displayIncome = user ? 
    <div className="Income">
      <Menu />
      <section className="IncomeMain">
        <Container className="MobilePosition">
          <Row className="IncomeDetails">
            <Col xs={12} sm={12} md={12} lg={8} style={{padding: '0'}}>
              <section className="IncomeHeader">
                <h1>Income</h1>
                <button onClick={toggleAdd}>Add New Income</button>    
              </section>
    
             <Row className="IncomeList">
              {!toggleSummary &&
                <Col xs={12} sm={12} md={12} lg={12} style={{padding: '0'}}>
                  <section className="IncomeSearch">
                    <input placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)} value={search} />
                    <img src={Search} />
                    {income && <Pagination
                      onChange={handlePageChange}
                      current={currentPage}
                      total={income && income.length}
                      pageSize={postsPerPage}
                      showTotal={(total, range) => `Displaying ${range[1]} of ${total}`}
                      />}
                    
                  </section>
                  
                </Col>
              }

                {!toggleSummary && <Row className="HeadingRow MobileNone">
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
                }
                
                {toggleSummary ? displaySummary : incomeLog}
                <button onClick={handleSummaryToggle}>{toggleSummary ? 'View Log' : 'View Summary'}</button> 
              </Row>
            
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className="MobileIncome">
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
      {displayIncome}
    </React.Fragment>
  )
}

export default Income