import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: 'calc(100vw - 240px)',
      height: '100vh',
      position: 'fixed',
      right: 0,
      bottom: 0
    },
    sectionTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 2rem',
      height: '90px'
    },
    sectionContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 2rem',
      height: 'calc(100vh - 190px)'
    },
    sectionContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100%'
    },
    inputContainer: { display: 'flex', alignItems: 'center' },
    input: { width: '40%', paddingRight: '1rem' },
    inputWide: { width: '80%' },
    arrowBackRoot: { color: 'black', marginRight: '8px' },
    itemWrapper: { marginBottom: '8px', width: '400px' },
    itemActive: { backgroundColor: '#ddd' },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 1rem'
    },
    itemColumn: { display: 'flex', alignItems: 'center' },
    imageSm: { width: '60px', height: '60px', marginRight: '1rem' },
    imageMd: {
      width: '140px',
      height: '140px',
      display: 'flex',
      margin: '0 auto'
    },
    gridContainer: { flex: 1 },
    gridItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    itemDetailWrapper: { width: '400px', height: '85%', margin: 0 },
    itemDetail: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: '100%',
      padding: '0 1rem'
    },
    itemDetailText: {
      fontSize: '13px',
      color: '#888'
    },
    loadingSm: { width: '100%', height: '100vh', marginLeft: '2rem' }
  })
)

export default useStyles
