import React, {useState, useContext} from 'react'
import './UserCalendar.scss'
import {ProfileContext} from '../../Context/ProfileContext'
import Calendar from 'react-calendar'
import CalendarIcon from '../Dashboard/assets/calendar.svg'
import Moment from 'react-moment'
import {withRouter} from 'react-router-dom'

const UserCalendar = (props) => {

  const {date, setDate} = useContext(ProfileContext)

  const selectDate = (active) => {
    setDate(active.activeStartDate)
   }

  const timeStamp = <Moment format="M/YY" style={{fontWeight: '800'}}>{date}</Moment>

  return (
    <section id="Calendar" className={ 
      props.match.path === '/user/:id/income' || 
      props.match.path === '/user/:id/expenses' ? 
      'CalendarModule CalendarIncome' : 'CalendarModule'}>
      <h2>{timeStamp}</h2>
      <h3>Calendar</h3>
      <img src={CalendarIcon} />
      <section id="GoalsDarken" className="CalendarFooter" style={{padding: '0'}}>
      <Calendar 
        value={date} 
        onActiveDateChange={ (activeStartDate) => selectDate(activeStartDate) }
      />
      </section>
    </section>
  )
}

export default withRouter(UserCalendar)
