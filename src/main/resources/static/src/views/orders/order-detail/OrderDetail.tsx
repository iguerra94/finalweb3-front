import { Box } from '@material-ui/core'

import useStyles from './OrderDetailStyles'
import { useHistory, useParams } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { ROUTES } from 'src/config/router/routes'

import { useEffect, useState } from 'react'
import orderService from 'src/service/orderService'
import Orden from 'src/model/Orden'
import Loading from 'src/components/loading/Loading'
import { createDataDetailView } from '../order-common/OrderCommon'
import { formatDate } from 'src/utils/function-utils'
import UserInfo from 'src/components/user-info/UserInfo'
import { useAuth } from 'src/context/auth/AuthContext'

const OrderDetail: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [orden, setOrden] = useState<Orden>()
  const [orderData, setOrderData] = useState<any>()

  const classes = useStyles()
  const params = useParams()

  const {
    state: { user }
  } = useAuth()

  const history = useHistory()

  useEffect(() => {
    getOrderById()
  }, [])

  const getOrderById = async () => {
    try {
      const result: Orden = await orderService.getOrderById(params.id)

      setOrden(result)

      setOrderData(
        createDataDetailView(
          result.id,
          result.numeroOrden,
          result.estado,
          result.masaAcumulada
        )
      )
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }

  return (
    <Box className={classes.container}>
      <Box component={'h2'} className={classes.sectionTitle}>
        <Breadcrumbs aria-label="breadcrumb">
          <Box
            component={'h2'}
            style={{
              color: '#303F9F',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => {
              history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())
            }}
          >
            Ordenes
          </Box>
          {loading ? (
            <Loading size={12} style={{ height: '100%' }} />
          ) : (
            <Box component={'h2'} style={{ color: 'black' }}>
              <span>Orden #{orderData.numeroOrden || 0} </span>
            </Box>
          )}
        </Breadcrumbs>
        <UserInfo data={user} />
      </Box>
      <Box className={classes.sectionContainer}>
        {loading ? (
          <Loading
            size={12}
            style={{ display: 'flex', alignItems: 'center' }}
          />
        ) : (
          <Box
            component={'h4'}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="24px"
          >
            <Box display="flex" alignItems="center">
              <Box marginRight="8px">Estado:</Box>
              {orderData.estado}
            </Box>

            {orderData.accion}
          </Box>
        )}

        <Grid
          container
          spacing={2}
          classes={{ container: classes.gridContainer }}
        >
          <Grid item xs classes={{ item: classes.gridItem }}>
            <Box component={'h3'} marginBottom="8px">
              Datos de la orden
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="calc(100% - 15px)"
            >
              {loading ? (
                <Loading size={12} style={{ width: '20px', height: '20px' }} />
              ) : (
                <Typography className={classes.itemDetailText}>
                  <strong style={{ marginRight: '8px' }}>
                    Fecha prevista de carga:
                  </strong>
                  {formatDate(orden!.fechaPrevistaCarga)}
                </Typography>
              )}
              {loading ? (
                <Loading size={12} style={{ width: '20px', height: '20px' }} />
              ) : (
                <>
                  {(orden?.estado || 0) > 1 ? (
                    <Typography className={classes.itemDetailText}>
                      <strong style={{ marginRight: '8px' }}>
                        Pesaje inicial:{' '}
                      </strong>
                      {orden?.pesajeInicial || ''} kg.
                    </Typography>
                  ) : null}
                </>
              )}
              {loading ? (
                <Loading size={12} style={{ width: '20px', height: '20px' }} />
              ) : (
                <>
                  {(orden?.estado || 0) > 2 ? (
                    <Typography className={classes.itemDetailText}>
                      <strong style={{ marginRight: '8px' }}>
                        Producto cargado:{' '}
                      </strong>
                      {orden?.masaAcumulada || ''}L
                    </Typography>
                  ) : null}
                </>
              )}
              {loading ? (
                <Loading size={12} style={{ width: '20px', height: '20px' }} />
              ) : (
                <>
                  {(orden?.estado || 0) > 3 ? (
                    <Typography className={classes.itemDetailText}>
                      <strong style={{ marginRight: '8px' }}>
                        Pesaje final:{' '}
                      </strong>
                      {orden?.pesajeFinal || ''} kg.
                    </Typography>
                  ) : null}
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs></Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          classes={{ container: classes.gridContainer }}
        >
          <Grid item xs classes={{ item: classes.gridItem }}>
            <Grid
              container
              spacing={2}
              classes={{ container: classes.gridContainer }}
              style={{ marginBottom: '0 !important' }}
            >
              <Grid item xs classes={{ item: classes.gridInnerItem }}>
                <Box component={'h3'} marginBottom="8px">
                  Camion
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  height="calc(100% - 15px)"
                >
                  <img
                    src={'/assets/camion.svg'}
                    alt="Camion"
                    style={{ height: '70px', marginRight: '1rem' }}
                  />

                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-evenly"
                    height="100%"
                  >
                    {loading ? (
                      <Loading
                        size={12}
                        style={{ width: '20px', height: '20px' }}
                      />
                    ) : (
                      <Typography className={classes.itemDetailText}>
                        <strong style={{ marginRight: '8px' }}>
                          Dominio:{' '}
                        </strong>
                        {orden?.camion.dominio || ''}
                      </Typography>
                    )}
                    {loading ? (
                      <Loading
                        size={12}
                        style={{ width: '20px', height: '20px' }}
                      />
                    ) : (
                      orden?.camion?.cisternaList?.map((cisterna, index) => (
                        <Typography
                          key={index}
                          className={classes.itemDetailText}
                        >
                          <strong style={{ marginRight: '8px' }}>
                            Cisterna #{index + 1}:
                          </strong>{' '}
                          {cisterna.capacidad}L
                        </Typography>
                      )) || null
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs classes={{ item: classes.gridInnerItem }}>
                <Box component={'h3'} marginBottom="8px">
                  Chofer
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  height="calc(100% - 15px)"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-evenly"
                    height="100%"
                  >
                    {loading ? (
                      <Loading
                        size={12}
                        style={{ width: '20px', height: '20px' }}
                      />
                    ) : (
                      <Typography className={classes.itemDetailText}>
                        <strong style={{ marginRight: '8px' }}>Nombre: </strong>
                        {`${orden?.camion.chofer.nombre || ''} ${
                          orden?.camion.chofer.apellido || ''
                        }`}
                      </Typography>
                    )}
                    {loading ? (
                      <Loading
                        size={12}
                        style={{ width: '20px', height: '20px' }}
                      />
                    ) : (
                      <Typography className={classes.itemDetailText}>
                        <strong style={{ marginRight: '8px' }}>DNI: </strong>
                        {orden?.camion.chofer.dni || ''}
                      </Typography>
                    )}
                    {loading ? (
                      <Loading
                        size={12}
                        style={{ width: '20px', height: '20px' }}
                      />
                    ) : (
                      <Typography className={classes.itemDetailText}>
                        <strong style={{ marginRight: '8px' }}>
                          Telefono:{' '}
                        </strong>
                        {orden?.camion.chofer.telefono || ''}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs classes={{ item: classes.gridItem }}>
            <Box component={'h3'} marginBottom="8px">
              Producto
            </Box>

            <Box display="flex" alignItems="center" height="calc(100% - 15px)">
              <img
                src={'/assets/producto.svg'}
                alt="Producto"
                style={{ height: '70px' }}
              />

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
                height="100%"
              >
                {loading ? (
                  <Loading
                    size={12}
                    style={{ width: '20px', height: '20px' }}
                  />
                ) : (
                  <Typography className={classes.itemDetailText}>
                    <strong style={{ marginRight: '8px' }}>Nombre: </strong>
                    {orden?.producto.nombre || ''}
                  </Typography>
                )}
                {loading ? (
                  <Loading
                    size={12}
                    style={{ width: '20px', height: '20px' }}
                  />
                ) : (
                  <Typography className={classes.itemDetailText}>
                    <strong style={{ marginRight: '8px' }}>
                      Descripción:{' '}
                    </strong>
                    {orden?.producto.descripcion || ''}
                  </Typography>
                )}
                {loading ? (
                  <Loading
                    size={12}
                    style={{ width: '20px', height: '20px' }}
                  />
                ) : (
                  <Typography className={classes.itemDetailText}>
                    <strong style={{ marginRight: '8px' }}>Precio: </strong>
                    {`$${orden?.producto.precio || ''}`}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          classes={{ container: classes.gridContainer }}
        >
          <Grid item xs classes={{ item: classes.gridItem }}>
            <Box component={'h3'} marginBottom="8px">
              Cliente
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="calc(100% - 15px)"
            >
              {loading ? (
                <Loading size={12} style={{ width: '20px', height: '20px' }} />
              ) : (
                <Typography className={classes.itemDetailText}>
                  <strong style={{ marginRight: '8px' }}>Nombre: </strong>
                  {`${orden?.cliente.nombre || ''} ${
                    orden?.cliente.apellido || ''
                  }`}
                </Typography>
              )}
              {loading ? (
                <Loading size={12} style={{ width: '20px', height: '20px' }} />
              ) : (
                <Typography className={classes.itemDetailText}>
                  <strong style={{ marginRight: '8px' }}>DNI: </strong>
                  {orden?.cliente.dni || ''}
                </Typography>
              )}
              {loading ? (
                <Loading size={12} style={{ width: '20px', height: '20px' }} />
              ) : (
                <Typography className={classes.itemDetailText}>
                  <strong style={{ marginRight: '8px' }}>Telefono: </strong>
                  {orden?.cliente.telefono || ''}
                </Typography>
              )}
              {loading ? (
                <Loading size={12} style={{ width: '20px', height: '20px' }} />
              ) : (
                <Typography className={classes.itemDetailText}>
                  <strong style={{ marginRight: '8px' }}>Email: </strong>
                  {orden?.cliente.email || ''}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default OrderDetail
