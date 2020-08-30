import React, { Component } from 'react';
import { Link } from 'react-router';
import InputForm from '../InputForm.js';
import api from '../../services/api';

export default class EditBebida extends Component {

  state = { _id: '', tipo: '', marca: '', sabor: '', volume: '', preco: '' };

  async componentDidMount() {

    let { id } = this.props.params;
    let response = await api.post('/bebida', { id });
    this.setState(response.data);
  }

  enviaForm = async (e) => {

    e.preventDefault();
    let response = await api.post('bebida/editar', this.state);
    let { nModified } = response.data;
    if (nModified) {
      alert('Bebida Atualizada com Sucesso');
    }

  }

  salvaAlteracao(nomeInput, e) {
    var campoAlterado = {};
    campoAlterado[nomeInput] = e.target.value;
    this.setState(campoAlterado);
  }

  render() {
    return ([
      <nav className="container-fluid">

        <div className="list-group text-center bg-dark">
          <Link to="/menu" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/home-page.png" />Início</Link>
          <Link to="/bebida" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-1" alt="" src="https://png.icons8.com/office/40/000000/wine-bottle.png" />Lista de Bebidas</Link>
        </div>
      </nav>,
      <main className="container mb-5">
        <div className="row border-bottom">
          <div className="mt-4 col-12 text-center">
            <h1>Bebida - <span className="badge badge-primary">Editar</span></h1>
          </div>
        </div>

        <form className="mt-5" onSubmit={this.enviaForm}>
          <div className="form-group">
            <label>Tipo</label>
            <select required value={this.state.tipo} onChange={this.salvaAlteracao.bind(this, 'tipo')} className="form-control">
              <option value="">Escolha o Tipo</option>
              <option value="Refrigerante">Refrigerantes</option>
              <option value="Suco">Sucos</option>
            </select>
          </div>
          <InputForm type="text" onChange={this.salvaAlteracao.bind(this, 'marca')} value={this.state.marca} id="marca" placeholder="Digite a Marca" label="Marca" />
          <InputForm type="text" onChange={this.salvaAlteracao.bind(this, 'sabor')} value={this.state.sabor} id="sabor" placeholder="Digite o Sabor" label="Sabor" />
          <InputForm type="text" onChange={this.salvaAlteracao.bind(this, 'volume')} value={this.state.volume} id="volume" placeholder="Digite o Volume" label="Volume" />
          <InputForm type="number" onChange={this.salvaAlteracao.bind(this, 'preco')} value={this.state.preco} id="preco" placeholder="Digite o Preço" label="Valor" />
          <button type="submit" className="btn btn-primary">Atualizar</button>
          <Link to="/bebida" className="ml-3 btn btn-danger">Cancelar</Link>
        </form>
      </main>

    ]);
  }

}
