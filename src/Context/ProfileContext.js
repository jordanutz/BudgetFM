import React, {createContext, useState} from 'react'

export const ProfileContext = createContext()

const ProfileContextProvider = (props) => {
  const [date, setDate] = useState(new Date())

  return (
    <ProfileContext.Provider value={{date, setDate}}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider