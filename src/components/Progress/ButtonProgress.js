import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class CircularIntegration extends React.Component {
  render() {
    const { classes, title, loading } = this.props;

    return (
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={this.props.onClick}
        >
          {title}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} color='secondary' />}
      </div>
    );
  }
}

CircularIntegration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIntegration);