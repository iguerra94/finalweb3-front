import CustomModal from 'src/components/custom-modal/CustomModal'
import CustomSnackbar from 'src/components/custom-snackbar/CustomSnackbar'
import MainDrawer from 'src/components/main-drawer/MainDrawer'
import { useAuth } from 'src/context/auth/AuthContext'
import { useUI } from 'src/context/ui/UIContext'

const MainWrapper: React.FC = ({ children }) => {
  const {
    state: { userIsLogged }
  } = useAuth()

  const {
    state: { modalData, snackbarData }
  } = useUI()

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
