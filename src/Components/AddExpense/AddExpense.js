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

const expenseCategory = {
  payments: 1, 
  food: 2, 
  home: 3, 
  clothing: 4, 
  education: 5, 
  recreation: 6, 
  transporation: 7, 
  other: 8
}

  return (
    <div className="AddIncome">
      <h1>Add Expense</h1>
      <section className="IncomeDetails">
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <DropdownButton id="dropdown-basic-button" title={category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'} >
          <Dropdown.Item name="payments" onClick={(e) => setCategory(e.target.name)}>
            Payments
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['payments'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="food" onClick={(e) => setCategory(e.target.name)}>
            Food  
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['food'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="home" onClick={(e) => setCategory(e.target.name)}>
            Home
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['home'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="clothing" onClick={(e) => setCategory(e.target.name)}>
            Clothing
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['clothing'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="education" onClick={(e) => setCategory(e.target.name)}>
            Education
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['education'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="recreation" onClick={(e) => setCategory(e.target.name)}>
            Recreation
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['recreation'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="transporation" onClick={(e) => setCategory(e.target.name)}>
            Transportation
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['transportation'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="other" onClick={(e) => setCategory(e.target.name)}>
            Other
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['other'] }}></div>      
          </Dropdown.Item>
        </DropdownButton>
        <section className="IncomeAmount">
          <span>$</span>
          <input placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </section>
        <button className="btn-expense" onClick={(e) => props.submitExpense(e, description, expenseCategory[category], amount, props.date)}>Submit</button>
      </section>
      <img onClick={() => props.setToggle(false)} src={Delete}/>
    </div>
  )
}

export default AddExpense