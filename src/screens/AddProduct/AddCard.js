import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  CardHeader,
  Tooltip,
  IconButton,
  CardContent,
  Grid,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  CardActions,
  Divider
} from '@material-ui/core';
import { AddAPhoto, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles'

import MyCard from '../../components/Card'

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    width: 100,
    height: 100,
    backgroundColor: theme.palette.secondary.main
  },
  image: {
    height: '100%',
  },
  input: {
    display: 'none',
  },
  media: {
    backgroundColor: theme.palette.primary.light,
  },
  iconButton: {
    marginRight: theme.spacing.unit
  },
  textField: {
    minWidth: '100%',
  },
  grid: {
    padding: theme.spacing.unit,
  },
})

class AddCard extends Component {
  render() {
    const {
      classes,
      nome,
      imageFile,
      val_unit,
      disp,
      handleChangeImage,
      handleChange,
      save,
      clear,
      clearImage,
    } = this.props
    return (
      <MyCard type='determinateLarge'>
        <CardHeader
          title='Novo Produto'
          subheader='Preencha os dados abaixo para cadastrar um produto'
        />
        <CardContent className={classes.media}>
          <Grid
            container
            spacing={24}
            alignItems='center'
            justify='center'
            className={classes.grid}
          >
            <Grid item>
              <Avatar className={classes.avatar}>
                {
                  imageFile ?
                    <img alt='Imagem do produto' src={imageFile} className={classes.image} /> :
                    'IMAGEM'
                }
              </Avatar>
            </Grid>
            <input
              id='input-image'
              accept='image/*'
              type="file"
              onChange={handleChangeImage}
              className={classes.input}
            />
            <Grid item xs>
              <label htmlFor='input-image'>
                <Button
                  component='span'
                  variant='contained'
                  color='secondary'
                  className={classes.iconButton}
                > <AddAPhoto className={classes.iconButton} /> Selecionar </Button>
              </label>
              {
                imageFile &&
                <Tooltip title='Remover'>
                  <IconButton color='secondary' onClick={clearImage}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              }
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid
            container
            spacing={24}
            alignItems='center'
            justify='center'
            className={classes.grid}
          >
            <Grid item xs={8}>
              <TextField
                variant='outlined'
                label='Nome do produto'
                value={nome}
                onChange={handleChange('nome')}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant='outlined'
                label='Preço'
                type='number'
                value={val_unit}
                onChange={handleChange('val_unit')}
                className={classes.textField}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant='outlined'
                label='Quantidade'
                type='number'
                value={disp}
                onChange={handleChange('disp')}
                className={classes.textField}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container justify='space-between'>
            <Button onClick={clear} >Limpar</Button>
            <Button
              color='secondary'
              onClick={save}
              variant='contained'
            >Salvar</Button>
          </Grid>
        </CardActions>
      </MyCard>
    )
  }
}

AddCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddCard)