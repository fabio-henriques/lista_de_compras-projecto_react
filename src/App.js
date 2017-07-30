import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import dados from './config/dados'

import ShopList from './components/ShopList'

const preencherArray = (arrayPrincipal, arrayDinamico) =>{
  let elementosArray = arrayPrincipal.map(elemento => elemento[arrayDinamico])
  let elementosUnicos=[]
  elementosArray.forEach(elemento => {
    elementosUnicos.indexOf(elemento) === -1 
      ? elementosUnicos.push(elemento) 
      : null
    }
  )
  return elementosUnicos
}

class App extends Component {

  constructor (props) {
    super(props)

    const categoria = preencherArray(dados, "categoria")
    console.log(categoria)
    
    this.state = {
      
      productSelect: [],
      filterProdutos: dados.slice(),
      categoria: categoria,
      categoriaSeleccionada: ""
    }
  }

  handleAdd(prodIndex, evt){
    let productSelect = this.state.productSelect.slice()
    let currIndex = productSelect.indexOf(dados[prodIndex])
    //console.log(prodIndex, currIndex, productSelect, this.state.produtos[prodIndex])
    if (currIndex === -1) {
      productSelect.push(dados[prodIndex])
    }
    else {
     //productSelect.splice(currIndex, 1) 
    }
    //console.log(productSelect)
    this.setState({
      productSelect
    })
  }

  filterProdutos(produtos, val) {
    return produtos.filter((produtos) => {
      return produtos.nome.toLowerCase().search(val.toLowerCase()) !== -1;
    })
  }

  handleSearchProduct(evt){
      this.setState({
        filterProdutos: this.filterProdutos(dados, evt.target.value)
      })
  }

  handleDeleteProducts(indexProductSelect, evt){
    this.state.productSelect.splice(indexProductSelect, 1)
    this.setState({
      productSelect: this.state.productSelect
    })
  }

  handleShowCategoria(categoriaSeleccionada){
    this.setState({
      categoriaSeleccionada
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <input className="search__bar" type = "text" placeholder="Pesquise o seu produto" onChange={this.handleSearchProduct.bind(this)}/>
        </div>

        <div>
          <button onClick={this.handleShowCategoria.bind(this, "")} className="categoria__list"><li className="categorias__list">Todos</li></button>
          {
            this.state.categoria.map((categoria, index) => {
              return <button onClick={this.handleShowCategoria.bind(this, categoria)} className="categoria__list" key={"categorias" + index}><li className="categorias__list">{categoria}</li></button>
            })
          }
        </div>

        <div>
          <h1>Produtos</h1>
          <ul>  
            {
              this.state.filterProdutos
              .map((item, index) => { 
                if(this.state.productSelect.indexOf(item) === -1 && (item.categoria === this.state.categoriaSeleccionada || this.state.categoriaSeleccionada === "")) {
                  return <li className="produtos" key={"produtos" + index}><button className="produtos__button"  onClick={this.handleAdd.bind(this, index)}>{item.nome}</button></li> 
                }
                return null
              })
            }
          </ul>
        </div>
        <div className="produtos__sector__active">
          <div>
            {
              this.state.productSelect.map((item, index) => {
                return <ShopList key={"select" + index}
                  onDelete={this.handleDeleteProducts.bind(this, index)}
                >{item.nome}</ShopList>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
