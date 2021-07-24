import { createContext, useContext, useReducer } from 'react'
import { newOrderReducer } from './reducer'
import { NewOrderActions } from './reducer/new-order-actions'
import { NewOrderState, initialNewOrderState } from './reducer/new-order-state'

type NewOrderContextType = {
  state: NewOrderState
  dispatch: React.Dispatch<NewOrderActions>
}

const NewOrderContext = createContext<NewOrderContextType>({
  state: initialNewOrderState,
  dispatch: () => {}
})

export const useNewOrder = () => useContext(NewOrderContext)

export const NewOrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newOrderReducer, initialNewOrderState)

  return (
    <NewOrderContext.Provider value={{ state, dispatch }}>
      {children}
    </NewOrderContext.Provider>
  )
}
