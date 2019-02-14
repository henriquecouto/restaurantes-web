import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Divider } from '@material-ui/core'

import Header from '../Header'
import Produto from './Produto'

import { loadData } from '../../api'

const styles = theme => ({
  grid: {
    marginTop: theme.spacing.unit * 2
  }
})

class Home extends Component {
  state = {
    result: []
  }

  async componentDidMount() {
    await loadData('estoque').onSnapshot(snapshot => {
      let result = []
      snapshot.docs.forEach(doc => {
        result.unshift({
          ...doc.data(),
          _id: doc.id
        })
      })
      this.setState({
        result
      })
    })
  }

  render() {
    const {classes} = this.props
    const {result} = this.state

    return (
      <Fragment>
        <Header title='Produtos'>
          <Divider />
          <Grid
            container
            spacing={ 24 }
            className={ classes.grid }
          >
            { result.map((produto, key) => {
                return (
                  <Grid
                    item
                    key={ key }
                  >
                    <Produto produto={ produto } />
                  </Grid>
                )
              }) }
          </Grid>
        </Header>
      </Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)