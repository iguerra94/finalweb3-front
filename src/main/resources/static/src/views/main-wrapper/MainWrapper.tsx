import { useEffect, useState } from 'react'
import CustomModal from 'src/components/custom-modal/CustomModal'
import CustomSnackbar from 'src/components/custom-snackbar/CustomSnackbar'
import MainDrawer from 'src/components/main-drawer/MainDrawer'
import { useAuth } from 'src/context/auth/AuthContext'
import { useOrdersLoad } from 'src/context/orders-load/OrdersLoad'
import { ActionType as OrdersLoadActionType } from 'src/context/orders-load/reducer/orders-load-actions'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { useUI } from 'src/context/ui/UIContext'
import PumpOrderData from 'src/model/dto/PumpOrderData'
import Orden from 'src/model/Orden'
import orderService from 'src/service/orderService'
import orderUtils from 'src/utils/order-utils'

const MainWrapper: React.FC = ({ children }) => {
  const [checking, setChecking] = useState<boolean>(true)
  const [masasAcumuladas, setMasasAcumuladas] = useState<any>({})

  const {
    state: { user, userIsLogged }
  } = useAuth()

  const {
    state: { modalData, snackbarData },
    dispatch
  } = useUI()

  const {
    state: { orders },
    dispatch: ordersLoadDispatch
  } = useOrdersLoad()

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getOrders()
    }
  }, [])

  useEffect(() => {
    if (orders.length > 0) {
      const intervalId = setInterval(() => {
        setChecking(true)

        // Update Pump of each order
        updateOrdersPump()

        getOrders()
      }, 4000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [orders, checking])

  const generatePumpOrderData = (
    idOrden: string,
    password: string,
    valorPrevioMasaAcumulada: number
  ) => {
    const current_timestamp = new Date()
    current_timestamp.setHours(current_timestamp.getHours())
    const fecha = current_timestamp.toISOString()

    const randomValues = orderUtils.generateRandomValues()

    const nuevaMasaAcumulada =
      valorPrevioMasaAcumulada + randomValues.masaAcumulada

    const pumpOrderData: PumpOrderData = {
      fecha,
      idOrden,
      masaAcumulada: nuevaMasaAcumulada,
      password,
      // temperatura: 30
      temperatura: randomValues.temperatura
    }

    return pumpOrderData
  }

  const updateOrdersPump = async () => {
    await Promise.all(
      orders.map(async ({ idOrden, password }) => {
        const data = generatePumpOrderData(
          idOrden,
          password!,
          masasAcumuladas[idOrden] ? masasAcumuladas[idOrden] : 0
        )

        const orden: Orden = await orderService.updatePump(data)
        setMasasAcumuladas((prev) => ({
          ...prev,
          [`${idOrden}`]: orden.masaAcumulada
        }))

        if (orden.estado === 3) {
          ordersLoadDispatch({
            type: OrdersLoadActionType.UpdateOrdersLoadList,
            payload: orders.filter((data) => data.idOrden !== idOrden)
          })

          const _masasAcumuladas = masasAcumuladas
          delete _masasAcumuladas[idOrden]

          setMasasAcumuladas(_masasAcumuladas)

          dispatch({
            type: ActionType.SetLoading,
            payload: { loadingData: true }
          })
        }
      })
    )
  }

  const getOrders = async () => {
    try {
      dispatch({
        type: ActionType.SetLoading,
        payload: { loadingData: true }
      })

      const results: Orden[] = await orderService.getOrders()

      ordersLoadDispatch({
        type: OrdersLoadActionType.UpdateOrdersLoadList,
        payload: [
          ...results
            .filter(
              ({ estado, masaAcumulada }) => estado === 2 && masaAcumulada > 0
            )
            .map((orden) => ({
              idOrden: orden.numeroOrden,
              password: orden.password
            }))
        ]
      })

      const ordenesCargandoSurtidor: Orden[] = results.filter(
        ({ estado, masaAcumulada }) => estado === 2 && masaAcumulada > 0
      )

      const mapaMasasAcumuladas = ordenesCargandoSurtidor.map((orden) => {
        return [orden.numeroOrden, orden.masaAcumulada]
      })

      setMasasAcumuladas(Object.fromEntries(mapaMasasAcumuladas))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {/* MainDrawer */}
      {userIsLogged ? <MainDrawer /> : null}

      {/* CustomModal */}
      {modalData.modalOpen ? <CustomModal /> : null}

      {/* CustomSnackbar */}
      {snackbarData.snackbarOpen ? <CustomSnackbar /> : null}

      {/* Logged User router */}
      {children}
    </>
  )
}

export default MainWrapper
