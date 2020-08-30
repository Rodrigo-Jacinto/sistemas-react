import React, { Component } from 'react';
import { Link } from 'react-router';
import InputForm from '../InputForm.js';
import api from '../../services/api';

export default class FormPrato extends Component {

  state = { nome: '', descricao: '', preco: '' };

  enviaForm = async (e) => {
    e.preventDefault();

    let response = await api.post('/prato', this.state);
    if (response.data.msg) {
      alert('Prato Cadastrado com Sucesso');
      this.setState({ nome: '', descricao: '', preco: '' });
    }
  }

  salvaAlteracao(nomeInput, e) {
    var campo = {};
    campo[nomeInput] = e.target.value;
    this.setState(campo);
  }

  render() {
    return ([
      <nav className="container-fluid">

        <div className="list-group text-center bg-dark">
          <Link to="/menu" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/home-page.png" />Início</Link>
          <Link to="/prato" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/ultraviolet/40/000000/meal.png" />Lista de Pratos</Link>
        </div>

      </nav>,

      <div className="container-fluid">
        <div className="row border-bottom">
          <div className="mt-4 col-12 text-center">
            <h1>Prato - <span className="badge badge-secondary">Cadastro</span></h1>
          </div>
        </div>

      </div>,

      <div className="container mb-5">

        <div className="row">
          <div className="col-12">
            <form onSubmit={this.enviaForm} className="mt-5">
              <InputForm type="text" onChange={this.salvaAlteracao.bind(this, 'nome')} value={this.state.nome} id="nome" placeholder="Digite o nome do prato" label="Nome" />
              <InputForm type="text" onChange={this.salvaAlteracao.bind(this, 'descricao')} value={this.state.descricao} id="desc" placeholder="Digite a Descrição" label="Descrição" />
              <InputForm type="number" onChange={this.salvaAlteracao.bind(this, 'preco')} value={this.state.preco} id="valor" placeholder="Digite o Preço" label="Preço" />

              <button type="submit" className="btn btn-primary">Cadastrar</button>
              <Link to="/prato" className="ml-3 btn btn-danger">Cancelar</Link>
            </form>
          </div>
        </div>

      </div>
    ]);
  }


}
