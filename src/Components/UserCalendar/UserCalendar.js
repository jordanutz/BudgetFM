import React, {useState, useContext} from 'react'
import './UserCalendar.scss'
import Calendar from 'react-calendar'
import CalendarIcon from '../Dashboard/assets/calendar.svg'
import Moment from 'react-moment'

const UserCalendar = (props) => {

  const selectDate = (active) => {
    props.setDate(active.activeStartDate)
   }


  const timeStamp = <Moment format="M/YY" style={{fontWeight: '800'}}>{props.date}</Moment>

  return (
    <section id="Calendar" className="CalendarModule">
      <h2>{timeStamp}</h2>
      <h3>Calendar</h3>
      <img src={CalendarIcon} />
      <section id="GoalsDarken" className="CalendarFooter" style={{padding: '0'}}>
      <Calendar 
        value={props.date} 
        onActiveDateChange={ (activeStartDate) => selectDate(activeStartDate) }
      />
      </section>
    </section>
  )
}

export default UserCalendar
