import React, {useState, useContext} from 'react'
import './AddIncome.scss'
import axios from 'axios'

// Components
import {Dropdown, DropdownButton} from 'react-bootstrap'
import Delete from './assets/delete.svg'

// Context
import {ProfileContext} from '../../Context/ProfileContext'

const AddIncome = (props) => {

const [description, setDescription] = useState('')
const [category, setCategory] = useState(null)
const [amount, setAmount] = useState('')

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
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['gift'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="investment" onClick={(e) => setCategory(e.target.name)}>
            Investment
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['investment'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="rewards" onClick={(e) => setCategory(e.target.name)}>
            Rewards
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['rewards'] }}></div>
          </Dropdown.Item>
          <Dropdown.Item name="salary" onClick={(e) => setCategory(e.target.name)}>
            Salary
            <div className="ColorLabel" style={{backgroundColor: props.colorSelection['salary'] }}></div>
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
        <button className="btn-income" onClick={(e) => props.submitIncome(e, description, incomeCategory[category], amount, props.date)}>Submit</button>
      </section>
      <img onClick={() => props.setToggle(false)} src={Delete}/>
    </div>
  )
}

export default AddIncome