import AppRouter from './config/router/router'
import { UIContextProvider } from './context/ui/UIContext'
import { AuthContextProvider } from './context/auth/AuthContext'
import { NewOrderContextProvider } from 'src/context/new-order/NewOrderContext'
import { OrdersLoadContextProvider } from './context/orders-load/OrdersLoad'

function App() {
  return (
    <div className="App">
      <UIContextProvider>
        <AuthContextProvider>
          <OrdersLoadContextProvider>
            <NewOrderContextProvider>
              <AppRouter />
            </NewOrderContextProvider>
          </OrdersLoadContextProvider>
        </AuthContextProvider>
      </UIContextProvider>
    </div>
  )
}

export default App
