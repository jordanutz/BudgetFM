import React, {useState} from 'react'
import './AddIncome.scss'
import axios from 'axios'

// Components
import {Dropdown, DropdownButton} from 'react-bootstrap'

import Delete from './assets/delete.svg'

const AddIncome = (props) => {

const [description, setDescription] = useState('')
const [category, setCategory] = useState(null)
const [amount, setAmount] = useState('')
const [date, setDate] = useState(new Date())

const submitIncome = (e, description, category, amount, date) => {
  e.preventDefault()

  let income = {
    description, 
    category, 
    amount, 
    date
  }

  axios.post('/api/income', {income})
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
}

const colorSelection = {
  gift: '#36D82C', 
  investment: '#2C97D8', 
  rewards: '#F9F90A', 
  salary: '#F9390A', 
  other: '#F90AF9'
}

const incomeCategory = {
  gift: 1, 
  investment: 2, 
  rewards: 3, 
  salary: 4, 
  other: 5
}

  return (
    <div className="AddIncome">
      <h1>Add Income</h1>
      <section className="IncomeDetails">
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <DropdownButton id="dropdown-basic" title={category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'}>
          <Dropdown.Item name="gift" onClick={(e) => setCategory(e.target.name)}>Gift
            <div className="ColorLabel" style={{backgroundColor: colorSelection['gift'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="investment" onClick={(e) => setCategory(e.target.name)}>
            Investment
            <div className="ColorLabel" style={{backgroundColor: colorSelection['investment'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="rewards" onClick={(e) => setCategory(e.target.name)}>
            Rewards
            <div className="ColorLabel" style={{backgroundColor: colorSelection['rewards'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="salary" onClick={(e) => setCategory(e.target.name)}>
            Salary
            <div className="ColorLabel" style={{backgroundColor: colorSelection['salary'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="other" onClick={(e) => setCategory(e.target.name)}>
            Other
            <div className="ColorLabel" style={{backgroundColor: colorSelection['other'] }}></div>      
          </Dropdown.Item>
        </DropdownButton>
        <section className="IncomeAmount">
          <span>$</span>
          <input placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </section>
        <button className="btn-income" onClick={(e) => submitIncome(e, description, incomeCategory[category], amount, date)}>Submit</button>
      </section>
      <img onClick={() => props.setToggle(false)} src={Delete}/>
    </div>
  )
}

export default AddIncome