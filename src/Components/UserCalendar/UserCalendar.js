import React, {useState, useContext} from 'react'
import './UserCalendar.scss'
import Calendar from 'react-calendar'
import CalendarIcon from '../Dashboard/assets/calendar.svg'

// Context
import {ProfileContext} from '../../Context/ProfileContext'

const UserCalendar = () => {

  const {date, setDate} = useContext(ProfileContext)

  const selectDate = (active) => {
    setDate(active.activeStartDate)
   }

  return (
    <section id="Calendar" className="CalendarModule">
      <h2>8/19</h2>
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

export default UserCalendar
