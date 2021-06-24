import { useEffect, useState } from 'react'
import LoginData from 'src/model/dto/LoginData'
import LoginDataError from 'src/model/dto/LoginDataError'
import loginService from 'src/service/loginService'
import { digestMessage } from 'src/utils/function-utils'

const useLoginForm = (passwordInputRef: React.RefObject<any>) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: undefined
  })
  const [errors, setErrors] = useState<LoginDataError>({
    email: undefined,
    password: undefined
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, email: e.target.value })

    if (Object.keys(errors).length > 0)
      setErrors({ email: undefined, password: undefined })
  }

  const handlePasswordChange = () => {
    if (Object.keys(errors).length > 0)
      setErrors({ email: undefined, password: undefined })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrors(loginService.validateLoginDataValues(loginData, passwordInputRef))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      digestMessage(passwordInputRef.current?.value).then((value) => {
        setLoginData({ ...loginData, password: value })
        setIsSubmitting(false)
      })
    } else {
      setIsSubmitting(false)
    }
  }, [errors])

  return {
    loginData,
    errors,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  }
}

export default useLoginForm
