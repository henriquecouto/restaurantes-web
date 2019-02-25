import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

import crypto from 'crypto'

import { createData } from '../../api'
import { storage } from '../../firebase'
import AddCard from './AddCard'
import AddedCard from './AddedCard'
import { CircularDeterminate } from '../../components/Progress'

const INITIAL_STATE = {
  imageFile: null,
  imageObj: null,
  nome: '',
  val_unit: '',
  disp: 10,
  image: '',
  progress: 0
}

class AddProduct extends Component {

  state = INITIAL_STATE

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  clear = () =>{
    this.setState(INITIAL_STATE)
  }

  save = async () => {
    this.setState({ progress: 1 })
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
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 98) + 1
            this.setState({ progress })
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
                this.setState({ progress: 100 })
              })
          },
        )
    } else {
      const { nome, val_unit, disp } = this.state
      createData('estoque', { nome, val_unit, disp })
      this.setState({ progress: 100 })
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
    const { imageFile, nome, val_unit, disp, progress } = this.state

    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        direction='column'
      >
        <Grid item>

          {
            progress === 0 ?
              (<AddCard
                imageFile={imageFile}
                nome={nome}
                val_unit={val_unit}
                disp={disp}
                handleChangeImage={this.handleChangeImage}
                handleChange={this.handleChange}
                save={this.save}
                clear={this.clear}
              />) : (progress === 100 ?
                (<AddedCard
                  avatar={imageFile}
                  nome={nome}
                  val_unit={val_unit}
                  disp={disp}
                  back={this.clear}
                />) :
                (<CircularDeterminate value={progress} />)
              )
          }
        </Grid>
      </Grid>
    )
  }
}

export default AddProduct