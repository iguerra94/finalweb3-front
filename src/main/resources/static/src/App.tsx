import AppRouter from './config/router/router'
import { UIContextProvider } from './context/ui/UIContext'
import { AuthContextProvider } from './context/auth/AuthContext'
import { NewOrderContextProvider } from 'src/context/new-order/NewOrderContext'

function App() {
  return (
    <div className="App">
      <UIContextProvider>
        <AuthContextProvider>
          <NewOrderContextProvider>
            <AppRouter />
          </NewOrderContextProvider>
        </AuthContextProvider>
      </UIContextProvider>
    </div>
  )
}

export default App
