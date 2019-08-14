import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [balance, setBalance] = useState(null)

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider