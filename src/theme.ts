import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          '&.MuiButton-outlined': {
            color: '#2eb7af',
            borderColor: '#2eb7af',
            '&:hover': {
              backgroundColor: '#2eb7af',
              color: 'white',
            },
          },
          '&.MuiButton-contained': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            borderColor: 'white',
            color: 'white',
            marginRight: '5px',
            '&:hover': {
              opacity: 0.5,
              boxShadow: 'none',
            },
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#18586d',
          '&.Mui-selected': {
            backgroundColor: '#18586d',
            color: 'white',
            pointerEvents: 'none',
            '&:hover': {
              backgroundColor: '#18586d',
              opacity: 1,
            },
          },
          '&:hover': {
            backgroundColor: '#18586d33',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          minHeight: '13rem',
          cursor: 'pointer',
        },
      },
    },
  },
})

export default theme
