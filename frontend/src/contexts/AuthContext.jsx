import { createContext, useContext, useState } from 'react'
import { USER_KEY } from '../services/api.js'

const AuthContext = createContext(null)

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser)

  function signIn(newUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setUser(newUser)
  }

  function signOut() {
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
