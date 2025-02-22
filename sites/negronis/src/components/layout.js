/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Global } from '@emotion/core'
import { Link } from 'gatsby'
import { Fragment } from 'react'

const Layout = ({ children }) => (
  <Fragment>
    <Global
      styles={theme => ({
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          fontFamily: theme.fonts.body,
          fontSize: 20,
          margin: 0,
        },
      })}
    ></Global>
    <header
      sx={{
        bg: 'primary',
        color: 'background',
        p: 3,
      }}
    >
      <Link
        to="/"
        sx={{
          color: 'background',
          fontWeight: 'bold',
          textDecoration: 'none',
          ':focus': {
            outline: theme => `2px solid ${theme.colors.background}`,
            outlineOffset: 4,
          },
        }}
      >
        Negroni Appreciation Society
      </Link>
    </header>
    <main
      sx={{
        my: 4,
        mx: 'auto',
        maxWidth: 650,
        width: '90vw',
      }}
    >
      {children}
    </main>
  </Fragment>
)

export default Layout
