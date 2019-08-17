import React, {useState} from 'react'
import './AddExpense.scss'

// Components
import {Dropdown, DropdownButton} from 'react-bootstrap'

import Delete from './assets/x-button.svg'

const AddExpense = (props) => {

const [description, setDescription] = useState('')
const [category, setCategory] = useState(null)
const [amount, setAmount] = useState('')

const submitIncome = (e) => {
  e.preventDefault()
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

  return (
    <div className="AddIncome">
      <h1>Add Expense</h1>
      <section className="IncomeDetails">
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <DropdownButton id="dropdown-basic-button" title={category ? category : 'Category'} >
          <Dropdown.Item name="Payments" onClick={(e) => setCategory(e.target.name)}>
            <span>Payments</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['payments'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Food" onClick={(e) => setCategory(e.target.name)}>
            <span>Food</span>  
            <div className="ColorLabel" style={{backgroundColor: colorSelection['food'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Home" onClick={(e) => setCategory(e.target.name)}>
            <span>Home</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['home'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Clothing" onClick={(e) => setCategory(e.target.name)}>
            <span>Clothing</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['clothing'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Education" onClick={(e) => setCategory(e.target.name)}>
            <span>Education</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['education'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Recreation" onClick={(e) => setCategory(e.target.name)}>
            <span>Recreation</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['recreation'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Transporation" onClick={(e) => setCategory(e.target.name)}>
            <span>Transportation</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['transportation'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Other" onClick={(e) => setCategory(e.target.name)}>
            <span>Other</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['other'] }}></div>      
          </Dropdown.Item>
        </DropdownButton>
        <section className="IncomeAmount">
          <span>$</span>
          <input placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </section>
        <button className="btn-expense" onClick={(e) => submitIncome(e)}>Submit</button>
      </section>
      <img onClick={() => props.setToggle(false)} src={Delete}/>
    </div>
  )
}

export default AddExpense