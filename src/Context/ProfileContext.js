import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const ProfileContext = createContext()

const ProfileContextProvider = (props) => {
  const [balance, setBalance] = useState(null)

  return (
    <ProfileContext.Provider value={{balance, setBalance}}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider