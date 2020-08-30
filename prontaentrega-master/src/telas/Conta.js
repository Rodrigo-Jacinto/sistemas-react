import React, { Component } from 'react';
import { Link } from 'react-router';
import api from '../services/api';

export default class Conta extends Component {

  state = { cliente: {}, listaPratos: [], listaBebidas: [], listaConta: [], idPrato: 0, idBebida: 0 };

  enviaform = async (e) => {

    e.preventDefault();
    let dataAtual = new Date();

    let { cliente, idPrato, idBebida, listaPratos, listaBebidas } = this.state;

    if (!idPrato && !idBebida) {
      alert('Selecione pelo menos um produto para adicinar a conta do cliente');
    }
    else if (!idPrato && idBebida !== 0) {

      for (let i = 0; i < listaBebidas.length; i++) {

        if (listaBebidas[i]._id === idBebida) {
          delete listaBebidas[i]._id;
          this.bebidaSelecionada = listaBebidas[i];
          break;
        }
      };

      this.bebidaSelecionada.data = dataAtual.toLocaleDateString();
      let response = await api.post('/cliente/conta', { id: cliente._id, produtosConsumidos: [this.bebidaSelecionada] });
      this.setState({ listaConta: response.data });
      alert('Adicionado com Sucesso!');
    }

    else if (!idBebida && idPrato !== 0) {

      for (let i = 0; i < listaPratos.length; i++) {

        if (listaPratos[i]._id === idPrato) {
          delete listaPratos[i]._id;
          this.pratoSelecionado = listaPratos[i];
          break;
        }
      };

      this.pratoSelecionado.data = dataAtual.toLocaleDateString();
      let response = await api.post('/cliente/conta', { id: cliente._id, produtosConsumidos: [this.pratoSelecionado] });
      this.setState({ listaConta: response.data });
      alert('Adicionado com Sucesso!');

    }
    else {

      for (let i = 0; i < listaPratos.length; i++) {

        if (listaPratos[i]._id === idPrato) {
          delete listaPratos[i]._id;
          this.pratoSelecionado = listaPratos[i];

          for (let i = 0; i < listaBebidas.length; i++) {

            if (listaBebidas[i]._id === idBebida) {
              delete listaBebidas[i]._id;
              this.bebidaSelecionada = listaBebidas[i];
              break;
            }

            break;
          };
        }
      };

      this.pratoSelecionado.data = dataAtual.toLocaleDateString();
      this.bebidaSelecionada.data = dataAtual.toLocaleDateString();
      let response = await api.post('/cliente/conta', { id: cliente._id, produtosConsumidos: [this.pratoSelecionado, this.bebidaSelecionada] });
      this.setState({ listaConta: response.data });
      alert('Adicionado com Sucesso!');

    }
  }

  async componentDidMount() {

    let { id } = this.props.params;

    let response = await api.post('/cliente', { id });
    this.setState({ cliente: response.data });

    if (this.state.cliente.conta) {
      this.setState({ listaConta: this.state.cliente.conta });
    }

    response = await api.get('/prato');
    this.setState({ listaPratos: response.data });

    response = await api.get('/bebida');
    this.setState({ listaBebidas: response.data });

    console.log(this.state.listaConta);
  }

  salvaAlteracao(nomeCampo, e) {
    var campo = {};
    if (e.target.value === "0") {
      campo[nomeCampo] = Number(e.target.value);
      this.setState(campo);
    }
    else {
      campo[nomeCampo] = e.target.value;
      this.setState(campo);
    }

  }

  exibeConta(conta) {
    if (conta.nome) {
      return (
        <p>
          <span className="text-danger">Prato:</span> {conta.nome} - R$ {conta.preco} <br />
        </p>
      );
    }
    else {
      return (
        <p>
          <span className="text-danger">Bebida:</span> {conta.tipo} {conta.marca} - R$ {conta.preco} <br />
        </p>
      );
    }
  }

  produtoDescriminado(conta) {

    if (conta.nome) {

      return 'Data: ' + conta.data + '\n\nPrato: ' + conta.nome + ' - R$ ' + conta.preco + '\n\nTotal: R$ ' + conta.preco;
    }

    else (conta.tipo)

    return 'Data: ' + conta.data + '\n\nBebida: ' + conta.tipo + '\n\nMarca ' + conta.marca + ' - R$ ' + conta.preco + '\n\nTotal: R$ ' + conta.preco;

  }

  valorTotal(listaConta) {

    let listaValores = listaConta.map(function (conta) {
      return Number(conta.preco);
    });

    let valorTotal = listaValores.reduce(function (total, valor) {
      return total + valor;
    }, 0);

    return valorTotal;
  }

  async apagaConta(conta) {

    let op = window.confirm("Tem certeza que deseja apagar essa conta?\n\n" + this.produtoDescriminado(conta));

    if (op) {
      let response = await api.post('/cliente/conta-excluir', { id:this.state.cliente._id, codigoConta: conta.codigo });
      this.setState({listaConta: response.data});
      alert('Conta Apagada com Sucesso!!');
    }

  }


  render() {

    let { cliente, listaConta } = this.state;


    return ([

      <nav className="container-fluid">
        <div className="list-group text-center bg-dark">
          <Link to="/menu" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/home-page.png" />Início</Link>
          <Link to="/cliente" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/ultraviolet/40/000000/user-group-man-man.png" />Lista de Clientes</Link>
        </div>
      </nav>,

      <main className="container mt-5 mb-5">

        <div className="row">
          <div className="col-sm-12">
            {

              <div className="card mx-auto tam bg-light">
                <div className="card-header">
                  <h3 className="">Dados do Cliente</h3>
                </div>
                <div className="card-body">

                  <p><span className="text-primary">Nome:</span> {cliente.nome}</p>
                  <p><span className="text-primary">Telefone:</span> {cliente.telefone}</p>
                  <p><span className="text-primary">Cidade:</span> {cliente.cidade} - {cliente.estado} </p>
                  <p><span className="text-primary">Rua:</span> {cliente.rua}</p>
                  <p><span className="text-primary">Número da Casa:</span> {cliente.numero}</p>
                </div>
              </div>

            }

          </div>
        </div>


        <div className="card bg-light mt-3">

          <div className="row">
            <div className="col-sm-12">

              <div className="card-header">
                <h4 className="card-title">Adicionar a Conta</h4>
                <form onSubmit={this.enviaform}>
                  <div className="form-group">
                    <select onChange={this.salvaAlteracao.bind(this, 'idPrato')} className="form-control">
                      <option value="0">Selecionar Prato</option>
                      {
                        this.state.listaPratos.map(function (prato) {
                          return (
                            <option value={prato._id}>{prato.nome} - R$ {prato.preco}</option>
                          );
                        })
                      }

                    </select>
                  </div>

                  <div className="form-group">
                    <select onChange={this.salvaAlteracao.bind(this, 'idBebida')} className="form-control">
                      <option value="0">Selecionar Bebida</option>
                      {
                        this.state.listaBebidas.map(function (bebida) {
                          return (
                            <option value={bebida._id}>{bebida.tipo} {bebida.marca} - R$ {bebida.preco}</option>
                          );
                        })
                      }
                    </select>
                  </div>
                  <button type="submit" className="btn btn-danger">Adicionar</button>
                </form>
              </div>{/* fim da card-header*/}
            </div>{/* fim da cow-sm-12*/}
          </div> {/* fim da row*/}

          <div className="row">
            <div className="col-sm-12">
              <div className="card-header">
                <h3>Conta do Cliente</h3>
              </div> {/* fim da card-header*/}
            </div>{/* fim da cow-sm-12*/}
          </div> {/* fim da row*/}


          <div className="row">
            <div className="col-sm-12">
              <div className="card-body">
                {
                  listaConta.map((conta) => {
                    return (
                      <div>
                        <h6 className="card-title text-primary">Data: {conta.data}</h6>
                        {this.exibeConta(conta)}
                        <button onClick={this.apagaConta.bind(this, conta)} type="button" className="btn btn-success">Pagar</button>
                        <hr />
                      </div>
                    );
                  })
                }

              </div> {/* fim da card-body*/}
            </div>{/* fim da cow-sm-12*/}
          </div> {/* fim da row*/}

          <div className="card-footer">
            <div className="row">

              <div className="col-6">
                <span>Total a Pagar:<br /> <span className="text-danger">R$ {this.valorTotal(listaConta)}</span></span>
              </div>{/* fim da col-sm-12*/}

            </div> {/* fim da row*/}

            <div className="row mt-3">

            </div> {/* fim da row*/}

          </div> {/* fim da card-footer*/}
        </div>{/* fim da card*/}

      </main>

    ]);
  }



}
