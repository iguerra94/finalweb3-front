import { Box } from '@material-ui/core'
import { useEffect, useState } from 'react'
import orderService from 'src/service/orderService'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import useStyles from './OrderListStyles'
import Orden from 'src/model/Orden'
import Loading from 'src/components/loading/Loading'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { createDataListView } from 'src/views/orders/order-common/OrderCommon'

interface Column {
  id: 'numeroOrden' | 'estado' | 'accion'
  label: string
  width?: number
  maxWidth?: number
  align?: 'left'
  display?: string
  justifyContent?: string
  alignItems?: string
  height?: string
}

const columns: Column[] = [
  { id: 'numeroOrden', label: '# Orden', width: 180, maxWidth: 180 },
  {
    id: 'estado',
    label: 'Estado',
    width: 180,
    maxWidth: 180,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '69px'
  },
  {
    id: 'accion',
    label: 'Accion',
    align: 'left'
  }
]

const OrderList: React.FC = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [ordersInStateTwo, setOrdersInStateTwo] = useState<Orden[]>([])
  const [checking, setChecking] = useState<boolean>(true)

  const {
    state: { loadingData },
    dispatch
  } = useUI()

  useEffect(() => {
    getOrders(true)
  }, [])

  useEffect(() => {
    if (loadingData) {
      getOrders(true)
    }
  }, [loadingData])

  useEffect(() => {
    if (ordersInStateTwo.length > 0) {
      const intervalId = setInterval(() => {
        setChecking(true)
        console.log(ordersInStateTwo)

        setOrdersInStateTwo([])
        // getOrders(false)
      }, 2000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [ordersInStateTwo, checking])

  const getOrders = async (showLoadingState: boolean) => {
    try {
      const results: Orden[] = await orderService.getOrders()

      const _data = results.map((orden) =>
        createDataListView(
          orden.id,
          orden.numeroOrden,
          orden.estado,
          orden.masaAcumulada
        )
      )

      setData(_data)

      setOrdersInStateTwo([
        ...results.filter(
          ({ estado, masaAcumulada }) => estado === 2 && masaAcumulada > 0
        )
      ])
    } catch (e) {
      console.log(e)
    } finally {
      if (showLoadingState) {
        setTimeout(() => {
          dispatch({
            type: ActionType.SetLoading,
            payload: { loadingData: false }
          })
          setLoading(false)
        }, 500)
      }
    }
  }

  return (
    <Box className={classes.container}>
      <Box component={'h2'} className={classes.sectionTitle}>
        <span>Ordenes</span>
      </Box>
      <Box className={classes.sectionContainer}>
        <Paper className={classes.tableRoot}>
          {loading || loadingData ? (
            <Loading size={24} className={classes.loadingSm} />
          ) : (
            <TableContainer className={classes.tableContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align ? column.align : 'center'}
                        style={{
                          width: column.width,
                          maxWidth: column.maxWidth
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((value) => {
                    return (
                      <TableRow hover tabIndex={-1} key={value.numeroOrden}>
                        {columns.map((column) => {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align ? column.align : 'center'}
                              style={{
                                width: column.width,
                                maxWidth: column.maxWidth,
                                display: column.display
                                  ? column.display
                                  : 'auto',
                                justifyContent: column.justifyContent
                                  ? column.justifyContent
                                  : 'auto',
                                alignItems: column.alignItems
                                  ? column.alignItems
                                  : 'auto',
                                height: column.height ? column.height : 'auto'
                              }}
                            >
                              {value[column.id]}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

export default OrderList
