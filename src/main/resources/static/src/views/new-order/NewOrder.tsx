import { Box, IconButton } from '@material-ui/core'
import { useState, Suspense } from 'react'
import Loading from 'src/components/loading/Loading'
import StepperHorizontal from 'src/components/stepper-horizontal/StepperHorizontal'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import useStyles from './NewOrderStyles'
import React from 'react'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import { ActionType } from 'src/context/new-order/reducer/new-order-actions'
import UserInfo from 'src/components/user-info/UserInfo'
import { useAuth } from 'src/context/auth/AuthContext'

const NewOrderBasicData = React.lazy(
  () => import('src/views/new-order/new-order-basic-data/NewOrderBasicData')
)
const NewOrderTruckData = React.lazy(
  () => import('src/views/new-order/new-order-truck-data/NewOrderTruckData')
)
const NewOrderClientData = React.lazy(
  () => import('src/views/new-order/new-order-client-data/NewOrderClientData')
)
const NewOrderProductData = React.lazy(
  () => import('src/views/new-order/new-order-product-data/NewOrderProductData')
)
const NewOrderDetailData = React.lazy(
  () => import('src/views/new-order/new-order-detail-data/NewOrderDetailData')
)

const NewOrder: React.FC = () => {
  const classes = useStyles()

  const [activeStep, setActiveStep] = useState(0)

  const props = { classes }

  const { dispatch } = useNewOrder()

  const {
    state: { user }
  } = useAuth()

  const handlePrev = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep > 0 ? prevActiveStep - 1 : prevActiveStep
    )

    dispatch({
      type: ActionType.UpdateBtnCreateOrderClickHandler,
      payload: { btnCreateOrderClickHandler: undefined }
    })
  }

  const steps = [
    { bottomLabel: 'Datos orden', component: NewOrderBasicData },
    { bottomLabel: 'Camión', component: NewOrderTruckData },
    { bottomLabel: 'Cliente', component: NewOrderClientData },
    { bottomLabel: 'Producto', component: NewOrderProductData },
    { bottomLabel: 'Detalle', component: NewOrderDetailData }
  ]

  return (
    <Box className={classes.container}>
      <Box component={'h2'} className={classes.sectionTitle}>
        <Box>
          {activeStep > 0 ? (
            <IconButton
              aria-label="arrow-back"
              classes={{ root: classes.arrowBackRoot }}
              onClick={handlePrev}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : null}
          <span>Nueva orden</span>
        </Box>

        <UserInfo data={user} />
      </Box>
      <Suspense
        fallback={
          <Loading size={24} thickness={4} className={classes.loadingSm} />
        }
      >
        {RenderComponent(steps[activeStep].component, props)}
      </Suspense>
      <StepperHorizontal
        steps={steps.map((step) => step.bottomLabel)}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </Box>
  )
}

const RenderComponent = (Component, props) => <Component {...props} />

export default NewOrder
