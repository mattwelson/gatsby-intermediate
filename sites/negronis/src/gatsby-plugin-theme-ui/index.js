import { roboto as theme } from '@theme-ui/presets'

export default {
  ...theme,
  colors: {
    ...theme.colors,
    muted: 'grey',
  },
  button: {
    hollow: {
      bg: 'background',
      border: theme => `2px solid ${theme.colors.primary}`,
      borderRadius: 10,
      display: 'inline-block',
      fontFamily: 'heading',
      fontWeight: 'bold',
      p: 3,
      textDecoration: 'none',
      transition: '200ms linear background',

      ':focus': {
        bg: 'highlight',
        outline: theme => `2px solid ${theme.colors.primary}`,
        outlineOffset: 2,
      },

      ':hover': {
        bg: 'highlight',
      },
    },
    primary: {
      bg: 'primary',
      color: 'background',
      border: theme => `2px solid ${theme.colors.primary}`,
      borderRadius: 10,
      display: 'inline-block',
      fontFamily: 'heading',
      fontWeight: 'bold',
      p: 3,
      textDecoration: 'none',
      transition: '200ms linear background',

      ':focus': {
        bg: 'secondary',
        outline: theme => `2px solid ${theme.colors.primary}`,
        outlineOffset: 2,
      },

      ':hover': {
        bg: 'secondary',
      },
    },
  },
}
