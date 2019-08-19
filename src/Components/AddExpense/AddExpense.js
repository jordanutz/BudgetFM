import React, {useState} from 'react'
import './AddExpense.scss'
import axios from 'axios'

// Components
import {Dropdown, DropdownButton} from 'react-bootstrap'

import Delete from './assets/x-button.svg'

const AddExpense = (props) => {

const [description, setDescription] = useState('')
const [category, setCategory] = useState(null)
const [amount, setAmount] = useState('')
const [date, setDate] = useState(new Date())

const submitExpense = (e, description, category, amount, date) => {
  e.preventDefault()

  let expense = {
    description, 
    category, 
    amount, 
    date
  }

  axios.post('/api/expense', {expense})
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
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

const expenseCategory = {
  payments: 1, 
  food: 2, 
  home: 3, 
  clohing: 4, 
  education: 5, 
  recreation: 6, 
  transporation: 7, 
  other: 8
}

console.log(expenseCategory[category])

  return (
    <div className="AddIncome">
      <h1>Add Expense</h1>
      <section className="IncomeDetails">
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <DropdownButton id="dropdown-basic-button" title={category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'} >
          <Dropdown.Item name="payments" onClick={(e) => setCategory(e.target.name)}>
            Payments
            <div className="ColorLabel" style={{backgroundColor: colorSelection['payments'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="food" onClick={(e) => setCategory(e.target.name)}>
            Food  
            <div className="ColorLabel" style={{backgroundColor: colorSelection['food'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="home" onClick={(e) => setCategory(e.target.name)}>
            Home
            <div className="ColorLabel" style={{backgroundColor: colorSelection['home'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="clothing" onClick={(e) => setCategory(e.target.name)}>
            Clothing
            <div className="ColorLabel" style={{backgroundColor: colorSelection['clothing'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="education" onClick={(e) => setCategory(e.target.name)}>
            Education
            <div className="ColorLabel" style={{backgroundColor: colorSelection['education'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="recreation" onClick={(e) => setCategory(e.target.name)}>
            Recreation
            <div className="ColorLabel" style={{backgroundColor: colorSelection['recreation'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="transporation" onClick={(e) => setCategory(e.target.name)}>
            Transportation
            <div className="ColorLabel" style={{backgroundColor: colorSelection['transportation'] }}></div>
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
        <button className="btn-expense" onClick={(e) => submitExpense(e, description, expenseCategory[category], amount, date)}>Submit</button>
      </section>
      <img onClick={() => props.setToggle(false)} src={Delete}/>
    </div>
  )
}

export default AddExpense