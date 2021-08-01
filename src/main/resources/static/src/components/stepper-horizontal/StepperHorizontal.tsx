import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import useStyles from './StepperHorizontalStyles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { ActionType as NewOrderActionType } from 'src/context/new-order/reducer/new-order-actions'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'

const CancelNewOrder = React.lazy(
  () => import('src/components/modal-body/cancel-new-order/CancelNewOrder')
)

const StepperHorizontal = ({ steps, activeStep, setActiveStep }) => {
  const classes = useStyles()
  const { dispatch } = useUI()
  const {
    state: { newOrderUIData },
    dispatch: dispatchNewOrder
  } = useNewOrder()

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep < steps.length - 1 ? prevActiveStep + 1 : prevActiveStep
    )

    if (activeStep + 1 > 0 && !newOrderUIData.creatingNewOrder) {
      dispatchNewOrder({
        type: NewOrderActionType.UpdateCreatingNewOrderState,
        payload: { creatingNewOrder: true }
      })
    }

    if (newOrderUIData.btnCreateOrderClickHandler) {
      newOrderUIData.btnCreateOrderClickHandler()
    }
  }

  const showCancelNewOrderModal = () => {
    dispatch({
      type: ActionType.OpenModal,
      payload: {
        modalBody: CancelNewOrder,
        modalTitle: 'Cancelar Nueva orden'
      }
    })
  }

  return (
    <>
      <Divider />
      <Box className={classes.root}>
        <Stepper
          classes={{ root: classes.stepperRoot }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box className={classes.actionButtons}>
          <Button onClick={showCancelNewOrderModal}>Cancelar</Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!newOrderUIData.btnNextStepEnabled}
          >
            {activeStep >= steps.length - 1 ? 'Crear orden' : 'Siguiente'}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default StepperHorizontal
