import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import Tooltip from '@material-ui/core/Tooltip'
import { HelpOutline } from '@material-ui/icons'

import useStyles from './LoadInfoStyles'
import { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import {
  withStyles,
  createStyles,
  LinearProgress,
  LinearProgressProps
} from '@material-ui/core'
import Orden from 'src/model/Orden'
import orderService from 'src/service/orderService'
import moment from 'moment'

const BorderLinearProgress = withStyles(() =>
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

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

const LoadInfo = () => {
  const [order, setOrder] = useState<Orden>()
  const [orderLoadProgress, setOrderLoadProgress] = useState(0)
  const [orderLoadTime, setOrderLoadTime] = useState<string>()
  const [orderETA, setOrderETA] = useState<number>()
  const [reloadData, setReloadData] = useState(true)

  const classes = useStyles()

  const {
    state: {
      modalData: { modalDynamicData }
    },
    dispatch
  } = useUI()

  useEffect(() => {
    if (reloadData) {
      const intervalId = setInterval(() => {
        getOrderById()
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [reloadData])

  const getOrderById = async () => {
    try {
      const result: Orden = await orderService.getOrderById(
        modalDynamicData.idOrden
      )

      setOrder(result)

      const preset = result.preset
      const capacidadCisternas = result.camion.cisternaList!.reduce(
        (previous, current) => previous + current.capacidad!,
        0
      )

      const capacidad = Math.min(preset, capacidadCisternas)

      const progress = (result.masaAcumulada / capacidad) * 100
      setOrderLoadProgress(progress)
      const diff = moment(result.fechaUltimoAlmacenamiento).diff(
        result.fechaInicioCarga
      )

      setOrderLoadTime(moment.utc(diff).format('HH:mm'))

      // (capacidad - masaAcumulada) (kg) / caudal (kg/h) => h
      const eta = Math.round((capacidad - result.masaAcumulada) / result.caudal)
      console.log('eta', eta)
      setOrderETA(eta)

      setReloadData(result.estado === 2)
    } catch (e) {}
  }

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
              <span>{order?.masaAcumulada.toFixed(2) || 0} kg.</span>
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
              <span>{order?.densidad.toFixed(2) || 0} kg/m3</span>
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
              <span>{order?.temperatura.toFixed(2) || 0} °C</span>
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
              <span>Ultimo caudal:</span>
              <span>{order?.caudal.toFixed(2) || 0} kg/h</span>
            </Box>
            {order?.estado === 2 && order?.envioMail === 1 ? (
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
            ) : null}
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
              <span style={{ lineHeight: '32px' }}>{orderLoadTime}</span>
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
              <span style={{ lineHeight: '32px' }}>{orderETA}</span>
            </Box>
          </Box>
        </Box>
        <Box fontWeight="600" marginTop="3rem" marginBottom="8px">
          <span>Progreso de carga</span>
        </Box>
        <LinearProgressWithLabel
          variant="determinate"
          value={orderLoadProgress}
        />
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
