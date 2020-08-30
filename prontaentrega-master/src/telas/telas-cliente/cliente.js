import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import api from '../../services/api';

export default class Cliente extends Component {

  state = { lista: [], nome: '', valor: '' };

  carregaLista = async () => {
    const response = await api.get('/cliente');
    this.setState({ lista: response.data });
  }

  pesquisaCliente = async (e) => {
  
    e.preventDefault();
    try {
      const response = await api.get(`/cliente?nome=${this.state.nome.value}`)
      if (response.data.length) {
        this.setState({ lista: response.data })
        console.log(response.data);
      }
      else {
        alert('Cliente não encontrado')
        this.setState({ lista: response.data })
      }
    }
    catch (erro) {
      console.warn(erro);
    }

  }

  pegaValorConta(id) {
    sessionStorage.setItem('id-cliente-conta', id);
    browserHistory.push('/conta');
  }

  render() {

    const {lista} = this.state;

    return ([

      <nav className="container-fluid">

        <div className="list-group text-center bg-dark">
          <Link to="/menu" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/home-page.png" />Início</Link>
          <Link to="/formcliente" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/add-user-group-man-man.png" />Novo Cliente</Link>
        </div>

      </nav>,

      <main className="container">

        <div className="row mt-5">

          <div className="col-12 text-dark">
            <h1 className="display-5 font-weight-bold text-dark">Lista de Clientes</h1>
          </div>
        </div>

        <form method="post" onSubmit={this.pesquisaCliente}>

          <div className="row mt-3">

            <div className="col-md-6 col-sm-8 form-group">
              <input type="text" name="nome" className="form-control" ref={(input) => this.state.nome = input} placeholder="Pesquisa cliente" required />
            </div>

            <div className="col-md-6 col-sm-4">
              <button type="submit" className="btn mr-3 btn-primary">Pesquisar</button>
              <button type="button" onClick={this.carregaLista} className="btn btn-secondary">Ver todos os Clientes</button>
            </div>

          </div>
        </form>

        <div className="row mt-5">
          {
            lista.map((cliente) => {
              return (
                <div key={cliente._id} className="col-md-6 col-sm-12">
                  <div className="card tam bg-dark mb-3 text-white mx-auto">
                    <div className="card-header">
                      <img className="float-left" src="https://png.icons8.com/office/40/000000/user-group-man-man.png" />
                      <h3 className="text-center mt-2 card-title">Cliente</h3>
                    </div>

                    <div className="card-body">
                      <p><span className="text-warning">Nome:</span> {cliente.nome}</p>
                      <p><span className="text-warning">Telefone:</span> {cliente.telefone}</p>
                      <p><span className="text-warning">Cidade:</span> {cliente.cidade} {cliente.estado} </p>
                    </div>

                    <div className="card-footer">
                      <Link to={`conta/${cliente._id}`} id="btn-conta" className="btn btn-danger">Conta</Link>
                      <Link to={`/editCliente/${cliente._id}`} id="btn-conta" className="btn btn-primary ml-3">Editar</Link>
                    </div>
                  </div>
                </div>
              );

            })
          }

        </div>{/* fim da row */}

      </main>
    ]);
  }

}
