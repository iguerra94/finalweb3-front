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
      }, 5000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [orders, checking])

  const generatePumpOrderData = (
    idOrden: string,
    password: string,
    valorPrevioMasaAcumulada: number,
    capacidad: number
  ) => {
    const current_timestamp = new Date()
    current_timestamp.setHours(current_timestamp.getHours())
    const fecha = current_timestamp.toISOString()

    const randomValues = orderUtils.generateRandomValues()

    let masaAcumulada
    const nuevaMasaAcumulada =
      valorPrevioMasaAcumulada + randomValues.masaAcumulada

    if (nuevaMasaAcumulada < capacidad) {
      masaAcumulada = nuevaMasaAcumulada
    } else {
      masaAcumulada = capacidad + 1
    }

    const pumpOrderData: PumpOrderData = {
      fecha,
      idOrden,
      masaAcumulada,
      password,
      temperatura: randomValues.temperatura
    }

    return pumpOrderData
  }

  const updateOrdersPump = async () => {
    await Promise.all(
      orders.map(async ({ idOrden, password, capacidad }) => {
        const data = generatePumpOrderData(
          idOrden,
          password,
          masasAcumuladas[idOrden] ? masasAcumuladas[idOrden] : 0,
          capacidad ? capacidad : 0
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
            .map((orden) => {
              const preset = orden.preset
              const capacidadCisternas = orden.camion.cisternaList!.reduce(
                (previous, current) => previous + current.capacidad!,
                0
              )

              const capacidad = Math.min(preset, capacidadCisternas)

              return {
                idOrden: orden.numeroOrden,
                password: orden.password,
                capacidad
              }
            })
        ]
      })

      const ordenesCargandoSurtidor: Orden[] = results.filter(
        ({ estado, masaAcumulada }) => estado === 2 && masaAcumulada > 0
      )

      const mapaMasasAcumuladas = ordenesCargandoSurtidor.map((orden) => {
        const preset = orden.preset
        const capacidadCisternas = orden.camion.cisternaList!.reduce(
          (previous, current) => previous + current.capacidad!,
          0
        )

        const capacidad = Math.min(preset, capacidadCisternas)

        return [
          orden.numeroOrden,
          { masaAcumulada: orden.masaAcumulada, capacidad }
        ]
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
