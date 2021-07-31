import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'

import useStyles from './OrderConciliationStyles'
import { useEffect } from 'react'
import Box from '@material-ui/core/Box'

const OrderConciliation = () => {
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
          <span>Pesaje final:</span>
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
          <span>Producto cargado:</span>
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
          Neto por balanza:
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
          Diferencia entre balanza y caudalímetro:
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
          Promedio de densidad del producto:
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
          Promedio de temperatura del producto:
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
          Promedio de Caudal:
          <span>XXXX</span>
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
