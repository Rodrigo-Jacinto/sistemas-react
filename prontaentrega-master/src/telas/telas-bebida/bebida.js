import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router';

export default class Bebida extends Component {

  state = { lista: [], tipo: '' };

  async componentDidMount() {
    let response = await api.get('/bebida');
    this.setState({ lista: response.data });
  }

  pesquisaBebida = async (e) => {
    e.preventDefault();
    let response = await api.get(`/bebida?tipo=${this.state.tipo}`);
    this.setState({ lista: response.data });
  }

  salvaAlteracao(nomeInput, e) {
    var campo = {};
    campo[nomeInput] = e.target.value;
    this.setState(campo);
  }


  render() {

    let { lista } = this.state;

    return ([
      <nav className="container-fluid">

        <div className="list-group text-center bg-dark">
          <Link to="/menu" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/home-page.png" />Início</Link>
          <Link to="/formbebida" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/wine-glass.png" />Nova Bebida</Link>
        </div>

      </nav>,

      <main className="container">

        <div className="row mt-5 text-center">
          <div className="col-12">
            <h1 className="text-dark font-weight-bold display-5">Lista de Bebidas</h1>
          </div>
        </div>

        <form onSubmit={this.pesquisaBebida}>
          <div className="row mt-3">
            <div className=" form-group col-md-6">
              <select required value={this.state.tipo} onChange={this.salvaAlteracao.bind(this, 'tipo')} className="form-control">
                <option value="">Escolha o Tipo</option>
                <option value="Refrigerante">Refrigerantes</option>
                <option value="Suco">Sucos</option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <button type="submit" className="btn btn-primary">Pesquisar</button>
            </div>
          </div>
        </form>

        <div className="row mt-3">
          {
            lista.map((bebida) => {
              return (
                <div className="col-md-6 col-sm-12">
                  <div className="card tam bg-info mb-3 text-white mx-auto">
                    <div className="card-header">
                      <img className="float-left" alt="" src="https://png.icons8.com/dusk/40/000000/bar.png" />
                      <h3 className="text-center mt-2 card-title">Bebida</h3>
                    </div>

                    <div className="card-body">
                      <p><span className="text-dark">Tipo:</span> {bebida.tipo}</p>
                      <p><span className="text-dark">Marca:</span> {bebida.marca}</p>
                      <p><span className="text-dark">Sabor:</span> {bebida.sabor}</p>
                      <p><span className="text-dark">Volume:</span> {bebida.volume}</p>
                      <p><span className="text-dark">Preco:</span> R$ {bebida.preco}</p>
                    </div>

                    <div className="card-footer">
                      <Link to={`/editbebida/${bebida._id}`} id="btn-conta" className="btn btn-light ml-3">Editar</Link>
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
