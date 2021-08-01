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
      justifyContent: 'space-evenly',
      margin: '0 2rem',
      height: 'calc(100vh - 90px)'
    },
    sectionContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100%'
    },
    tableRoot: {
      width: '100%'
    },
    tableContainer: {
      maxHeight: 'calc(100vh - 120px)'
    },
    orderStateItem: {
      color: 'white',
      borderRadius: '50%',
      fontSize: '12px',
      padding: '8px',
      width: '20px',
      height: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    itemDetailText: {
      fontSize: '14px',
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center'
    },
    gridContainer: {
      margin: 0,
      marginBottom: '12px',
      gap: '12px'
    },
    gridItem: {
      backgroundColor: 'rgba(0,0,0,0.08)',
      minHeight: '80px',
      padding: '16px !important'
    },
    gridInnerItem: {
      backgroundColor: 'transparent',
      minHeight: '80px',
      padding: '0 !important'
    },
    orderActionBtn: {
      backgroundColor: '#0288D1',
      color: 'white',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#006297',
        boxShadow: 'none'
      },
      '&:active': {
        backgroundColor: '#006297',
        boxShadow: 'none'
      }
    },
    loadingSm: { height: '100%', margin: '0 1rem' }
  })
)

export default useStyles
