import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField
} from '@material-ui/core'
import { useRef } from 'react'
import { useAuth } from 'src/context/auth/AuthContext'
import useLoginForm from 'src/hooks/useLoginForm'
import loginStyles from 'src/views/login/LoginStyles'

const Login: React.FC = () => {
  const passwordInputRef = useRef<any>(null)
  const classes = loginStyles()

  const {
    loginData,
    errors,
    isSubmitting,
    handleUsernameChange,
    handlePasswordChange,
    // handleClick
    handleSubmit
  } = useLoginForm(passwordInputRef)

  const {
    state: { loginError }
  } = useAuth()

  return (
    <Box className={classes.root}>
      {/* App Title */}
      <Box component={'h1'} className={classes.appTitle}>
        Final IW3
      </Box>

      {/* Top Box with elevation */}
      <Box className={classes.topBox}></Box>

      {/* Login Card */}
      <Paper className={classes.loginBox} elevation={2}>
        <Box component="h3" className={classes.loginBoxTitle}>
          Inicia sesión en tu cuenta
        </Box>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Grid container spacing={2} className={classes.loginBoxContent}>
            <Grid item className={classes.item}>
              <TextField
                label="Usuario"
                variant="outlined"
                className={classes.input}
                value={loginData.username}
                onChange={handleUsernameChange}
                error={errors.username !== undefined}
                helperText={errors.username}
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                inputRef={passwordInputRef}
                label="Contraseña"
                variant="outlined"
                type="password"
                className={classes.input}
                onChange={handlePasswordChange}
                error={errors.password !== undefined}
                helperText={errors.password}
              />
            </Grid>
            <Grid item className={classes.item}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                // className={classes.button}
                fullWidth={true}
                disabled={isSubmitting}
                // onClick={handleClick}
              >
                {isSubmitting ? (
                  <CircularProgress size={14} className={classes.progress} />
                ) : null}
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
          {loginError ? (
            <Box className={`${classes['response']} ${classes['failure']}`}>
              {loginError}
            </Box>
          ) : null}
        </form>
      </Paper>
    </Box>
  )
}

export default Login
