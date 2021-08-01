import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'

import useStyles from './OrderConciliationStyles'
import { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { useState } from 'react'
import Conciliacion from 'src/model/Conciliacion'
import conciliationService from 'src/service/conciliationService'
import Loading from 'src/components/loading/Loading'

const OrderConciliation = () => {
  const [isLoading, setLoading] = useState(true)
  const [conciliation, setConciliation] = useState<Conciliacion>()

  const classes = useStyles()

  const {
    state: {
      modalData: { modalDynamicData }
    },
    dispatch
  } = useUI()

  useEffect(() => {
    getConciliationByOrderNumber()
  }, [])

  const handleClose = () => {
    dispatch({ type: ActionType.CloseModal })
  }

  const getConciliationByOrderNumber = async () => {
    try {
      const result: Conciliacion =
        await conciliationService.getConciliationByOrderNumber(
          modalDynamicData.numeroOrden
        )

      setConciliation(result)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }

  return (
    <>
      <DialogContent className={classes.dialogContent}>
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
          <span>Pesaje inicial:</span>
          {isLoading ? (
            <Loading
              size={12}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <span>{conciliation?.pesajeInicial} kg</span>
          )}
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
          <span>Pesaje final:</span>
          {isLoading ? (
            <Loading
              size={12}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <span>{conciliation?.pesajeFinal} kg</span>
          )}
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
          <span>Producto cargado:</span>
          {isLoading ? (
            <Loading
              size={12}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <span>{conciliation?.productoCargado}L</span>
          )}
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
          Neto por balanza:
          {isLoading ? (
            <Loading
              size={12}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <span>{conciliation?.netoBalanza} kg</span>
          )}
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
          Diferencia entre balanza y caudalímetro:
          {isLoading ? (
            <Loading
              size={12}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <span>{conciliation?.diferenciaBalanzaCaudalimetro} kg</span>
          )}
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
          Promedio de densidad del producto:
          {isLoading ? (
            <Loading
              size={12}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <span>{conciliation?.densidad.toFixed(2)} kg/m3</span>
          )}
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
          Promedio de temperatura del producto:
          {isLoading ? (
            <Loading
              size={12}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <span>{conciliation?.temperatura.toFixed(2)} °C</span>
          )}
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
          Promedio de Caudal:
          {isLoading ? (
            <Loading
              size={12}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <span>{conciliation?.caudal.toFixed(2)} kg/h</span>
          )}
        </Box>
      </DialogContent>
      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          Volver
        </Button>
      </DialogActions>
    </>
  )
}

export default OrderConciliation
