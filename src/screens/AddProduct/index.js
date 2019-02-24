import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, CardHeader, Typography, CardContent, Avatar, TextField, Divider, IconButton, Tooltip, InputAdornment, CardActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AddAPhoto, Delete, Save } from '@material-ui/icons'

import crypto from 'crypto'

import MyCard from '../../components/Card'
import { createData } from '../../api'
import { storage } from '../../firebase'

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    width: 100,
    height: 100,
    backgroundColor: theme.palette.primary.main
  },
  image: {
    height: '100%',
  },
  input: {
    display: 'none',
  },
  media: {
    backgroundColor: theme.palette.secondary.light,
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

class AddProduct extends Component {

  state = {
    imageFile: null,
    imageObj: null,
    nome: '',
    val_unit: '',
    disp: 10,
    image: '',
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  save = async () => {
    const { imageObj } = this.state
    if (imageObj) {
      const [name, ext] = imageObj.name.split('.')
      const cryptName = name + crypto.randomBytes(16).toString('hex') + '.' + ext

      storage
        .child(`produtos/${cryptName}`)
        .put(imageObj)
        .on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            console.log(progress)
          },

          (error) => {
            console.log(error)
          },

          () => {
            storage
              .child(`produtos/${cryptName}`)
              .getDownloadURL()
              .then((image) => {
                const { nome, val_unit, disp } = this.state
                createData('estoque', { nome, val_unit, disp, image })
                console.log('sucesso')
              })
          },
        )
    } else {
      const { nome, val_unit, disp } = this.state
      createData('estoque', { nome, val_unit, disp })
    }
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangeImage = event => {
    const imageObj = event.target.files[0]
    if (imageObj) {
      this.setState({
        imageObj,
        imageFile: URL.createObjectURL(imageObj)
      })
    }
  }

  render() {
    const { classes } = this.props
    const { imageFile, nome, val_unit, disp } = this.state

    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        direction='column'
      >
        <Grid item>
          <MyCard type='determinateLarge'>
            <CardHeader
              title='Novo Produto'
              subheader='Preencha os dados abaixo para cadastrar um produto'
              action={
                <Tooltip title='Adicionar'>
                  <IconButton
                    color='secondary'
                    onClick={this.save}
                  ><Save /></IconButton>
                </Tooltip>
              }
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
                  onChange={this.handleChangeImage}
                  className={classes.input}
                />
                <Grid item xs>
                  <label htmlFor='input-image'>
                    <Button
                      component='span'
                      variant='outlined'
                      color='primary'
                      className={classes.iconButton}
                    > <AddAPhoto className={classes.iconButton} /> Selecionar Imagem </Button>
                  </label>
                  {
                    imageFile &&
                    <Tooltip title='Remover'>
                      <IconButton color='primary' onClick={() => this.setState({ imageFile: null })}>
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
                    onChange={this.handleChange('nome')}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='outlined'
                    label='Preço'
                    type='number'
                    value={val_unit}
                    onChange={this.handleChange('val_unit')}
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
                    onChange={this.handleChange('disp')}
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </MyCard>
        </Grid>
      </Grid>
    )
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddProduct)