import { useCallback, useState } from 'react'

export const LS_KEYS = { AUTH_TOKEN: 'auth_token' }

const useLocalStorage = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState)

  const updatedSetValue = useCallback(
    (newValue) => {
      if (newValue === initialState || typeof newValue === 'undefined') {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, newValue)
      }
      setValue(newValue ?? initialState)
    },
    [initialState, key]
  )

  return [value, updatedSetValue]
}

export default useLocalStorage
