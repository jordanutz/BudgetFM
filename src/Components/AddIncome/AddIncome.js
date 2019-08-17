import React, {useState} from 'react'
import './AddIncome.scss'

// Components
import {Dropdown, DropdownButton} from 'react-bootstrap'

import Delete from './assets/delete.svg'

const AddIncome = (props) => {

const [description, setDescription] = useState('')
const [category, setCategory] = useState(null)
const [amount, setAmount] = useState('')

const submitIncome = (e) => {
  e.preventDefault()
}

const colorSelection = {
  gift: '#36D82C', 
  investment: '#2C97D8', 
  rewards: '#F9F90A', 
  salary: '#F9390A', 
  other: '#F90AF9'
}

  return (
    <div className="AddIncome">
      <h1>Add Income</h1>
      <section className="IncomeDetails">
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <DropdownButton id="dropdown-basic" title={category ? category : 'Category'}>
          <Dropdown.Item name="Gift" onClick={(e) => setCategory(e.target.name)}>
            <span>Gift</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['gift'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Investment" onClick={(e) => setCategory(e.target.name)}>
            <span>Investment</span>  
            <div className="ColorLabel" style={{backgroundColor: colorSelection['investment'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Rewards" onClick={(e) => setCategory(e.target.name)}>
            <span>Rewards</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['rewards'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="Salary" onClick={(e) => setCategory(e.target.name)}>
            <span>Salary</span>
            <div className="ColorLabel" style={{backgroundColor: colorSelection['salary'] }}></div>
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
        <button className="btn-income" onClick={(e) => submitIncome(e)}>Submit</button>
      </section>
      <img onClick={() => props.setToggle(false)} src={Delete}/>
    </div>
  )
}

export default AddIncome