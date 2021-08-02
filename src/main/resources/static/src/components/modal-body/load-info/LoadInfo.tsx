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
import {
  displayUpdateOrderEmailSendModal,
  displayCloseOrderQuestionWarningModal
} from 'src/utils/function-utils'
import Orden from 'src/model/Orden'
import orderService from 'src/service/orderService'
import moment from 'moment'
import { TIMEOUT_500_MS } from 'src/utils/config-utils'
import Loading from 'src/components/loading/Loading'

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
  const [isLoading, setLoading] = useState(true)
  const [order, setOrder] = useState<Orden>()
  const [orderLoadProgress, setOrderLoadProgress] = useState(0)
  const [orderLoadTime, setOrderLoadTime] = useState<string>('00:00:00')
  const [orderETA, setOrderETA] = useState<string>('00:00:00')
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

      const progress =
        result.estado === 2 ? (result.masaAcumulada / capacidad) * 100 : 100
      setOrderLoadProgress(progress)

      const dateA = moment(result.fechaInicioCarga)
      const dateB = moment(result.fechaUltimoAlmacenamiento)

      const diff = moment(dateB).diff(dateA)

      const seconds = moment.duration(diff).seconds()
      const minutes = moment.duration(diff).minutes()
      const hours = Math.trunc(moment.duration(diff).asHours())

      const tiempoCarga =
        `${hours}`.padStart(2, '0') +
        ':' +
        `${minutes}`.padStart(2, '0') +
        ':' +
        `${seconds}`.padStart(2, '0')

      setOrderLoadTime(tiempoCarga)

      // (capacidad - masaAcumulada) * 3600 / caudal
      const eta =
        result.estado === 2
          ? Math.floor(
              ((capacidad - result.masaAcumulada) * 3600) / result.caudal
            )
          : 0

      const _hours = result.estado === 2 ? Math.floor(eta / 60 / 60) : 0
      const _minutes =
        result.estado === 2 ? Math.floor(eta / 60) - _hours * 60 : 0
      const _seconds = result.estado === 2 ? eta % 60 : 0

      const formattedEta =
        _hours.toString().padStart(2, '0') +
        ':' +
        _minutes.toString().padStart(2, '0') +
        ':' +
        _seconds.toString().padStart(2, '0')

      setOrderETA(formattedEta)

      setReloadData(result.estado === 2)

      if (result.estado === 3) {
        dispatch({
          type: ActionType.SetLoading,
          payload: { loadingData: true }
        })
      }
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, TIMEOUT_500_MS)
    }
  }

  const handleClose = () => {
    dispatch({ type: ActionType.CloseModal })
  }

  const actualizarEnvioMail = () => {
    displayUpdateOrderEmailSendModal(order!.id, order!.numeroOrden, dispatch)
  }

  const cerrarOrdenManual = () => {
    displayCloseOrderQuestionWarningModal(
      order!.id,
      order!.numeroOrden,
      dispatch
    )
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
            {isLoading ? (
              <Loading size={12} style={{ width: '20px', height: '20px' }} />
            ) : (
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
            )}
            {isLoading ? (
              <Loading size={12} style={{ width: '20px', height: '20px' }} />
            ) : (
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
            )}
            {isLoading ? (
              <Loading size={12} style={{ width: '20px', height: '20px' }} />
            ) : (
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
            )}
            {isLoading ? (
              <Loading size={12} style={{ width: '20px', height: '20px' }} />
            ) : (
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
            )}
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
                  onClick={actualizarEnvioMail}
                >
                  Aceptar
                </Button>
              </Box>
            ) : null}
          </Box>
          <Box display="flex" flexDirection="column" flex="2">
            {isLoading ? (
              <Loading size={12} style={{ width: '20px', height: '20px' }} />
            ) : (
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
            )}
            {isLoading ? (
              <Loading size={12} style={{ width: '20px', height: '20px' }} />
            ) : (
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
            )}
            {order?.estado === 2 ? (
              <Box display="flex" justifyContent="flex-end" marginTop="1rem">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    textTransform: 'none'
                  }}
                  onClick={cerrarOrdenManual}
                >
                  Cerrar orden
                </Button>
              </Box>
            ) : null}
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
