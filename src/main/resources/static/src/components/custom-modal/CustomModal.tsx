import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { useUI } from 'src/context/ui/UIContext'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { Suspense, useRef } from 'react'
import Loading from '../loading/Loading'

const CustomModal: React.FC = () => {
  const nodeRef = useRef(null)

  const {
    state: { modalData },
    dispatch
  } = useUI()

  const handleClose = (_, reason) => {
    if (reason !== 'backdropClick') {
      dispatch({ type: ActionType.CloseModal })
    }
  }

  return (
    <Dialog
      ref={nodeRef}
      open={modalData.modalOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="form-dialog-title">{modalData.modalTitle}</DialogTitle>
      <Suspense fallback={<Loading />}>
        {RenderComponent(modalData.modalBody)}
      </Suspense>
    </Dialog>
  )
}

const RenderComponent = (Component) => <Component />

export default CustomModal
