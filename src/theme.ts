import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          '&.MuiButton-outlined': {
            color: '#93a5cf',
            borderColor: '#93a5cf',
            '&:hover': {
              backgroundColor: '#93a5cf',
              color: 'white',
            },
          },
          '&.MuiButton-contained': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            borderColor: 'white',
            color: '#93a5cf',
            marginRight: '5px',
            fontWeight: '600',
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
          color: 'white',
          borderColor: 'white',
          '&.Mui-selected': {
            backgroundColor: 'white',
            color: '#93a5cf',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          backgroundColor: 'white',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
          '&.Mui-focused': {
            backgroundColor: '#e6f7ff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
})

export default theme
