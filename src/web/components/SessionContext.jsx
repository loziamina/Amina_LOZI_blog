import config from '@/web/config'
import apiClient from '@/web/services/apiClient'
import jsonwebtoken from 'jsonwebtoken'
import { createContext, useContext, useEffect, useState } from 'react'

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)

export const SessionProvider = (props) => {
  const [session, setSession] = useState(null)

  const saveSessionToken = (jwt) => {
    localStorage.setItem(config.security.session.storageKey, jwt)

    try {
      const { payload } = jsonwebtoken.decode(jwt)
      setSession(payload)
    } catch (error) {
      console.error('Error decoding JWT:', error)
    }
  }

  const signOut = async () => {
    localStorage.removeItem(config.security.session.storageKey)

    try {
      await apiClient.delete('/sessions')
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  useEffect(() => {
  try {
    if (config.security.session && config.security.session.storageKey) {
      const jwt = localStorage.getItem(config.security.session.storageKey);

      if (jwt) {
        const { payload } = jsonwebtoken.decode(jwt);
        setSession(payload);
      }
    }
  } catch (error) {
    console.error('Error while handling session:', error);
  }
}, [])

  return (
    <SessionContext.Provider
      {...props}
      value={{
        session,
        saveSessionToken,
        signOut,
      }}
    />
  )
}

export default SessionProvider;
