import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'
import Moment from 'react-moment'


export const ProfileContext = createContext()

const ProfileContextProvider = (props) => {
  const [balance, setBalance] = useState(null)
  const [date, setDate] = useState(new Date())

  return (
    <ProfileContext.Provider value={{balance, setBalance, date, setDate}}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider