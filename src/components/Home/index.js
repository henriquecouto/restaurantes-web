import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Header from '../Header'

const styles = theme => ({

})

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header title='Últimos Pedidos' >
          <p>HOME</p>
          <p>
          Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mé, boa gentis num é. Cevadis im ampola pa arma uma pindureta. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Viva Forevis aptent taciti sociosqu ad litora torquent.

          Interagi no mé, cursus quis, vehicula ac nisi. Paisis, filhis, espiritis santis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Delegadis gente finis, bibendum egestas augue arcu ut est.

          Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Sapien in monti palavris qui num significa nadis i pareci latim. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.

          Diuretics paradis num copo é motivis de denguis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Casamentiss faiz malandris se pirulitá.

          Aenean aliquam molestie leo, vitae iaculis nisl. Mé faiz elementum girarzis, nisi eros vermeio. Quem manda na minha terra sou euzis! Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.

          Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. In elementis mé pra quem é amistosis quis leo. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.

          Leite de capivaris, leite de mula manquis sem cabeça. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Manduma pindureta quium dia nois paga.

          Suco de cevadiss deixa as pessoas mais interessantis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Detraxit consequat et quo num tendi nada.

          Pra lá , depois divoltis porris, paradis. Per aumento de cachacis, eu reclamis. A ordem dos tratores não altera o pão duris. Copo furadis é disculpa de bebadis, arcu quam euismod magna.

          Atirei o pau no gatis, per gatis num morreus. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Si num tem leite então bota uma pinga aí cumpadi! Quem num gosta di mim que vai caçá sua turmis!
          </p>
        </Header>
      </Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)