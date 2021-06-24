import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField
} from '@material-ui/core'
import { useRef } from 'react'
import useLoginForm from 'src/hooks/useLoginForm'
import loginStyles from 'src/views/login/LoginStyles'

const Login: React.FC = () => {
  const passwordInputRef = useRef<any>(null)
  const classes = loginStyles()

  const {
    loginData,
    errors,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  } = useLoginForm(passwordInputRef)

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
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} className={classes.loginBoxContent}>
            <Grid item className={classes.item}>
              <TextField
                label="Correo"
                variant="outlined"
                className={classes.input}
                value={loginData.email}
                onChange={handleEmailChange}
                error={errors.email !== undefined}
                helperText={errors.email}
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
                className={classes.input}
              >
                <CircularProgress size={20} color={'inherit'} />
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
