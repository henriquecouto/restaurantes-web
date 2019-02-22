import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
  },
}

function LinearIndeterminate(props) {
  const { classes } = props
  return (
    <LinearProgress className={classes.root} color='secondary' />
  )
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LinearIndeterminate)