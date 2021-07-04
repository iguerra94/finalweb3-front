import AppRouter from './config/router/router'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </div>
  )
}

export default App
