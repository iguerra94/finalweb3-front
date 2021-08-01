import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import Tooltip from '@material-ui/core/Tooltip'
import { HelpOutline } from '@material-ui/icons'

import useStyles from './LoadInfoStyles'
import { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Theme, LinearProgress } from '@material-ui/core'
import { withStyles, createStyles } from '@material-ui/styles'

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 4
    },
    colorPrimary: {
      backgroundColor: '700'
    },
    bar: {
      borderRadius: 4,
      backgroundColor: '#4CAF50'
    }
  })
)(LinearProgress)

const LoadInfo = () => {
  const classes = useStyles()

  const {
    // state: {
    //   modalData: { modalDynamicData }
    // },
    dispatch
  } = useUI()

  useEffect(() => {}, [])

  const handleClose = () => {
    dispatch({ type: ActionType.CloseModal })
  }

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            flexDirection="column"
            marginRight="1rem"
            flex="3"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="14px"
              bgcolor="rgba(196, 196, 196, 0.2)"
              height={48}
              paddingLeft="14px"
              paddingRight="14px"
            >
              <span>Ultima masa acumulada: </span>
              <span>XXXX</span>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="14px"
              height={48}
              paddingLeft="14px"
              paddingRight="14px"
            >
              <span>Ultima densidad del producto:</span>
              <span>XXXX</span>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="14px"
              bgcolor="rgba(196, 196, 196, 0.2)"
              height={48}
              paddingLeft="14px"
              paddingRight="14px"
            >
              <span>Ultima temperatura del producto:</span>
              <span>XXXX</span>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="14px"
              height={48}
              paddingLeft="14px"
              paddingRight="14px"
            >
              <span>Ultima caudal:</span>
              <span>XXXX</span>
            </Box>
            {}
            <Box display="flex" justifyContent="flex-end" marginTop="1rem">
              <Typography
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#F44336',
                  margin: '0 1rem 0 2rem'
                }}
              >
                Temperatura alta
              </Typography>

              <Button
                variant="contained"
                style={{
                  backgroundColor: '#F44336',
                  color: 'white',
                  textTransform: 'none'
                }}
              >
                Aceptar
              </Button>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" flex="2">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              fontSize="14px"
              height="50%"
              paddingLeft="14px"
              paddingRight="14px"
            >
              <span style={{ lineHeight: '32px' }}>Tiempo de carga: </span>
              <span style={{ lineHeight: '32px' }}>XXXX</span>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              fontSize="14px"
              height="50%"
              paddingLeft="14px"
              paddingRight="14px"
            >
              <Box display="flex" alignItems="center">
                <Tooltip title="Tiempo estimado de llenado">
                  <HelpOutline />
                </Tooltip>
                <span style={{ marginLeft: '8px', lineHeight: '32px' }}>
                  ETA:
                </span>
              </Box>
              <span style={{ lineHeight: '32px' }}>XXXX</span>
            </Box>
          </Box>
        </Box>
        <Box fontWeight="600" marginTop="3rem" marginBottom="8px">
          <span>Progreso de carga</span>
        </Box>
        <BorderLinearProgress variant="determinate" value={50} />
      </DialogContent>
      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          Volver
        </Button>
      </DialogActions>
    </>
  )
}

export default LoadInfo
