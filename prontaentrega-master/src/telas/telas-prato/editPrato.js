import React, { Component } from 'react';
import { Link } from 'react-router';
import InputForm from '../InputForm.js';
import api from '../../services/api';

export default class EditCliente extends Component {

  state = { _id: '', nome: '', descricao: '', preco: '' };

  async componentDidMount() {
    let { id } = this.props.params;
    let response = await api.post('/prato', { id });
    this.setState(response.data);
  }

  enviaForm = async (e) => {
    e.preventDefault();
    let response = await api.post('/prato/editar', this.state);
    let {nModified} = response.data;

    if (nModified) {
      alert('Prato Atualizado com Sucesso');
    }
  }

  salvaAteracao(nomeInput, e) {
    var campoAlterado = {};
    campoAlterado[nomeInput] = e.target.value;
    this.setState(campoAlterado);
  }

  render() {
    return ([
      <nav className="container-fluid">

        <div className="list-group text-center bg-dark">
          <Link to="/menu" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/home-page.png" />Início</Link>
          <Link to="/prato" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/ultraviolet/40/000000/meal.png" />Lista de Pratos</Link>
        </div>

      </nav>,
      <main className="container mb-5">
        <div className="row border-bottom">
          <div className="mt-4 col-12 text-center">
            <h1>Prato - <span className="badge badge-primary">Editar</span></h1>
          </div>
        </div>
        <form className="mt-5" onSubmit={this.enviaForm}>

          <InputForm value={this.state.nome} onChange={this.salvaAteracao.bind(this, 'nome')} type="text" id="nome" placeholder="Digite o Nome" label="Nome" />
          <InputForm value={this.state.descricao} onChange={this.salvaAteracao.bind(this, 'descricao')} type="tel" id="tel1" placeholder="Digite a Descrição" label="Descrição" />
          <InputForm value={this.state.preco} onChange={this.salvaAteracao.bind(this, 'preco')} type="tel" id="tel2" placeholder="Digite o Preço" label="Preco" />

          <button type="submit" className="btn btn-primary">Atualizar</button>
          <Link to="/prato" className="btn ml-3 btn-danger">Cancelar</Link>
        </form>
      </main>

    ]);
  }

}
