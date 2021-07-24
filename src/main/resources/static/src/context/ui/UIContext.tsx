import { useReducer } from 'react'
import { createContext, useContext } from 'react'
import { uiReducer } from './reducer'
import { UIActions } from './reducer/ui-actions'
import { initialUIState, UIState } from './reducer/ui-state'

type UIContextType = {
  state: UIState
  dispatch: React.Dispatch<UIActions>
}

const UIContext = createContext<UIContextType>({
  state: initialUIState,
  dispatch: () => {}
})

export const useUI = () => useContext(UIContext)

export const UIContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialUIState)

  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  )
}
