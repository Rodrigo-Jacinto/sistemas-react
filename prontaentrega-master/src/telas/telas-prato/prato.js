import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router';

export default class Prato extends Component {

  state = { lista: [], nome: '' };

  async componentDidMount() {
    let response = await api.get('/prato');
    this.setState({lista:response.data});
  }

  pesquisaPrato = async (e) => {
    e.preventDefault();
    let response = await api.get(`/prato?nome=${this.state.nome}`);
    this.setState({lista: response.data});
  }

  salvaAteracao(nomeInput, e) {
    var campo = {};
    campo[nomeInput] = e.target.value;
    this.setState(campo);
  }

  render() {

    let {lista} = this.state;

    return ([
      <nav className="container-fluid">

        <div className="list-group text-center bg-dark">
          <Link to="/menu" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/home-page.png" />Início</Link>
          <Link to="/formprato" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/meal.png" />Novo Prato</Link>
        </div>

      </nav>
      ,

      <main className="container">

        <div className="row mt-5 text-center">
          <div className="col-12">
            <h1 className="text-dark font-weight-bold display-5">Lista de Pratos</h1>
          </div>
        </div>

        <form onSubmit={this.pesquisaPrato}>
          <div className="row mt-3">
            <div className=" form-group col-md-6">
              <input type="text" onChange={this.salvaAteracao.bind(this, 'nome')} value={this.state.nome} className="form-control" placeholder="Pesquise a comida " required />
            </div>

            <div className="form-group col-md-6">
              <button type="submit" className="btn btn-primary">Pesquisar</button>
            </div>
          </div>
        </form>

        <div className="row mt-3">
          {
            lista.map((prato) => {
              return (
                <div key={prato._id} className="col-md-6 col-sm-12">
                  <div className="card tam bg-light mb-3 text-dark mx-auto">
                    <div className="card-header">
                      <img className="float-left" alt="" src="https://png.icons8.com/dusk/50/000000/meal.png" />
                      <h3 className="text-center mt-2 card-title">Prato</h3>
                    </div>

                    <div className="card-body">
                      <p><span className="text-primary">Nome:</span> {prato.nome}</p>
                      <p><span className="text-primary">Descrição:</span> {prato.descricao}</p>
                      <p><span className="text-primary">Preço:</span> R$ {prato.preco}</p>
                    </div>

                    <div className="card-footer">
                      <Link to={`/editprato/${prato._id}`} className="btn btn-primary ml-3">Editar</Link>
                    </div>
                  </div>
                </div>
              );

            })
          }
        </div>

      </main>

    ]);
  }

}
