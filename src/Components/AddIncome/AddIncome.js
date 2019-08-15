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

console.log(props)

  return (
    <div className="AddIncome">
      <h1>Add Income</h1>
      <section className="IncomeDetails">
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <DropdownButton id="dropdown-basic-button" title={category ? category : 'Category'}>
          <Dropdown.Item name="Gift" onClick={(e) => setCategory(e.target.name)}>Gift</Dropdown.Item>
          <Dropdown.Item name="Investment" onClick={(e) => setCategory(e.target.name)}>Investment</Dropdown.Item>
          <Dropdown.Item name="Rewards" onClick={(e) => setCategory(e.target.name)}>Rewards</Dropdown.Item>
          <Dropdown.Item name="Salary" onClick={(e) => setCategory(e.target.name)}>Salary</Dropdown.Item>
          <Dropdown.Item name="Other" onClick={(e) => setCategory(e.target.name)}>Other</Dropdown.Item>
        </DropdownButton>
        <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className="btn-income" onClick={(e) => submitIncome(e)}>Submit</button>
      </section>
      <img onClick={() => props.setToggle(false)} src={Delete}/>
    </div>
  )
}

export default AddIncome