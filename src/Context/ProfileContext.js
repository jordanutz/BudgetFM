import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const ProfileContext = createContext()

const ProfileContextProvider = (props) => {
  const [date, setDate] = useState(new Date())
  const [balance, setBalance] = useState(null)

  return (
    <ProfileContext.Provider value={{date, setDate, balance, setBalance}}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider