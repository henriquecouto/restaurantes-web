import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  CardHeader,
  Button,
  CardActions,
  Grid,
  CardContent,
  Typography,
  Avatar,
  Divider
} from '@material-ui/core';
import { Save, AddAPhoto, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles'

import MyCard from '../../components/Card'

const styles = theme => ({
  media: {
    backgroundColor: theme.palette.primary.light,
  },
  grid: {
    padding: theme.spacing.unit,
  },
  text: {
    color: theme.palette.textPrimary.main,
  },
  avatar: {
    margin: theme.spacing.unit,
    width: 100,
    height: 100,
    backgroundColor: theme.palette.secondary.main
  },
  image: {
    height: '100%',
  },
})

class AddedCard extends Component {
  render() {
    const {
      classes,
      nome,
      disp,
      val_unit,
      avatar,
      back,
    } = this.props
    return (
      <MyCard type='determinateLarge'>
        <CardHeader
          title='Produto Adicionado'
        />
        <CardContent className={classes.media}>
          <Grid
            container
            spacing={24}
            alignItems='center'
            justify='flex-start'
            className={classes.grid}
          >
            <Grid item>
              <Avatar className={classes.avatar}>
                {
                  avatar ?
                    <img alt='Imagem do produto' src={avatar} className={classes.image} /> :
                    'IMAGEM'
                }
              </Avatar>
            </Grid>
            <Grid item>
              <Grid container direction='column'>
                <Grid item>
                  <Typography variant='subtitle2' className={classes.text} > Nome: {nome} </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2' className={classes.text} > Quantidade: {disp} </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2' className={classes.text} > Preço: R${val_unit} </Typography>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container justify='space-between'>
            <Button onClick={back}>Voltar</Button>
            <Button variant='contained' color='secondary' component={Link} to='/produtos'>Ver Produtos</Button>
          </Grid>
        </CardActions>
      </MyCard>
    )
  }
}

AddedCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddedCard)