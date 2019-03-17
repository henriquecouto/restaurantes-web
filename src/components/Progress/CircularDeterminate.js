import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    marginTop: theme.spacing.unit * 10
  }
})

function CircularDeterminate(props) {
  const { classes, value } = props
  return (
    <div>
      <CircularProgress 
      className={classes.progress}
      color='secondary' 
      variant='determinate'
      value={value}
      />
    </div>
  )
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CircularDeterminate)
