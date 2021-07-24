import { Box, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import orderService from 'src/service/orderService'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import useStyles from './OrderListStyles'
import Orden from 'src/model/Orden'
import {
  orderStateColorMap,
  orderStateActionLabelMap,
  orderStateActionClickHandlerMap,
  displayLoadInfoModal
} from 'src/utils/function-utils'
import { ROUTES } from 'src/config/router/routes'
import Loading from 'src/components/loading/Loading'

interface Column {
  id: 'numeroOrden' | 'estado' | 'accion'
  label: string
  maxWidth?: number
  align?: 'left'
}

const columns: Column[] = [
  { id: 'numeroOrden', label: '# Orden', maxWidth: 40 },
  { id: 'estado', label: 'Estado', maxWidth: 40 },
  {
    id: 'accion',
    label: 'Accion',
    maxWidth: 170,
    align: 'left'
  }
]

const OrderState = ({ estado }) => {
  const classes = useStyles()

  return (
    <Box
      style={{
        backgroundColor: orderStateColorMap[estado]
      }}
      className={classes.orderStateItem}
    >
      {estado}
    </Box>
  )
}

const OrderAction = ({ id, estado, masaAcumulada }) => {
  const classes = useStyles()

  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          className={classes.orderActionBtn}
          onClick={() => {
            if (estado === 2 && masaAcumulada > 0) {
              displayLoadInfoModal()
            } else {
              orderStateActionClickHandlerMap[estado]()
            }
          }}
        >
          {estado === 2 && masaAcumulada > 0
            ? 'Ver información de carga'
            : orderStateActionLabelMap[estado]}
        </Button>
        {estado === 2 ? (
          <Box display="flex" alignItems="center">
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

      <Link to={ROUTES.PrivateRoutes.OrderDetail.pathUrl(id)}>
        <Button style={{ textTransform: 'none' }}>Detalle</Button>
      </Link>
    </Box>
  )
}

function createData(
  id: number,
  numeroOrden: string,
  estado: number,
  masaAcumulada: number
) {
  return {
    numeroOrden,
    estado: <OrderState estado={estado} />,
    accion: (
      <OrderAction id={id} estado={estado} masaAcumulada={masaAcumulada} />
    )
  }
}

const OrderList: React.FC = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])

  // const [, setToken] = useLocalStorage(LS_KEYS.AUTH_TOKEN, '')
  // const { dispatch } = useAuth()

  // const handleLogout = () => {
  //   dispatch({ type: ActionType.ValidateCredentials })

  //   setTimeout(() => {
  //     setToken(undefined)
  //     dispatch({ type: ActionType.Logout })
  //   }, TIMEOUT_500_MS)
  // }

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    try {
      const results: Orden[] = await orderService.getOrders()

      const _data = results.map((orden) =>
        createData(
          orden.id,
          orden.numeroOrden,
          orden.estado,
          orden.masaAcumulada
        )
      )

      setData(_data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className={classes.container}>
      <Box component={'h2'} className={classes.sectionTitle}>
        <span>Ordenes</span>
      </Box>
      <Box className={classes.sectionContainer}>
        <Paper className={classes.tableRoot}>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align ? column.align : 'center'}
                      style={{ maxWidth: column.maxWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <Loading className={classes.loadingSm} />
                ) : (
                  data.map((value) => {
                    return (
                      <TableRow hover tabIndex={-1} key={value.numeroOrden}>
                        {columns.map((column) => {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align ? column.align : 'center'}
                              style={{ maxWidth: column.maxWidth }}
                            >
                              {value[column.id]}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  )
}

export default OrderList
