import { useEffect, useState } from 'react'
import { ActionType } from 'src/context/auth/reducer/auth-actions'
import { useAuth } from 'src/context/auth/AuthContext'
import LoginData from 'src/model/dto/LoginData'
import LoginDataError from 'src/model/dto/LoginDataError'
import authService from 'src/service/authService'
import { TIMEOUT_500_MS } from 'src/utils/config-utils'
import { digestMessage } from 'src/utils/function-utils'
import useLocalStorage, { LS_KEYS } from './useLocalStorage'

const useLoginForm = (passwordInputRef: React.RefObject<any>) => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: undefined
  })
  const [errors, setErrors] = useState<LoginDataError>({
    username: undefined,
    password: undefined
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [, setToken] = useLocalStorage(LS_KEYS.AUTH_TOKEN, '')
  const {
    state: { loginError },
    dispatch
  } = useAuth()

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, username: e.target.value })

    removeErrors()
  }

  const handlePasswordChange = () => {
    removeErrors()
  }

  const removeErrors = () => {
    if (Object.keys(errors).length > 0)
      setErrors({ username: undefined, password: undefined })

    if (loginError)
      dispatch({
        type: ActionType.HideLoginError
      })
  }

  // const handleClick = () => {
  const handleSubmit = () => {
    setErrors(authService.validateLoginDataValues(loginData, passwordInputRef))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      digestMessage(passwordInputRef.current?.value).then((value) => {
        setLoginData({ ...loginData, password: value })

        authService
          .login({
            username: loginData.username,
            password: passwordInputRef.current?.value
          })
          .then((res) => {
            setToken(res.data.token)

            setTimeout(() => {
              window.location.reload()
              setIsSubmitting(false)
            }, TIMEOUT_500_MS)
          })
          .catch((err) => {
            setTimeout(() => {
              dispatch({
                type: ActionType.ShowLoginError,
                payload: err.response.data.message
              })
              setIsSubmitting(false)
            }, TIMEOUT_500_MS)
          })
      })
    } else {
      setIsSubmitting(false)
    }
  }, [errors])

  return {
    loginData,
    errors,
    isSubmitting,
    handleUsernameChange,
    handlePasswordChange,
    // handleClick,
    handleSubmit
  }
}

export default useLoginForm
