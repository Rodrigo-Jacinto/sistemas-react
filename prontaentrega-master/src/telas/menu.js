import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Menu extends Component {


  sair(e) {
    e.preventDefault();
    let op = window.confirm("Tem certeza que deseja sair?");
    if (op) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div className="fundo-app">
        <nav className="container-fluid">
          <div className="list-group text-center">
            <Link to="/" onClick={this.sair.bind(this)} className="list-group-item text-white bg"><img className="mr-3" alt="" src="https://png.icons8.com/dusk/40/000000/exit.png" />Sair do Sistema</Link>
          </div>
        </nav>
        <main className="container">
          <div className="row">
            <div className="col-12">
              <div className="jumbotron mt-5 bg text-center bg">
                <h1 className="display-5 text-light">Pronta Entrega Sistemas</h1>
                <p className="text-primary">Escolha uma das opções abaixo</p>
                <hr />
                <Link to="/cliente" className="m-3 btn btn-dark text-warning border-warning btn-lg" role="button">Clientes</Link>
                <Link to="/prato" className="m-3 btn btn-light border-dark btn-lg" role="button">Pratos</Link>
                <Link to="/bebida" className="m-3 btn btn-info border-light btn-lg" role="button">Bebidas</Link>
              </div>
            </div>
          </div>
        </main>
      </div>

    );
  }

}
