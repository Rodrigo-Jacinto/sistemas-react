import React, { Component } from 'react';
import { Link } from 'react-router';
import MaskedInput from 'react-maskedinput';
import api from '../../services/api';
import InputForm from '../InputForm';

export default class FormCliente extends Component {

  state = { nome: '', telefone: '', cidade: '', estado: '', rua: '', numero: '' };

  enviaForm = async (e) => {

    e.preventDefault();

    const response = await api.post('/cliente', this.state);

    if (response.data.msg) {
      alert('Cadastrado com Sucesso');
      this.setState({ nome: '', telefone: '', cidade: '', estado: '', rua: '', numero: '' });
    }
  }

  salvaAlteracao = (nomeInput, e) => {
    var campoAlterado = {};
    campoAlterado[nomeInput] = e.target.value;
    this.setState(campoAlterado);
  }

  render() {

    return ([
      <nav className="container-fluid">

        <div className="list-group text-center bg-dark">
          <Link to="/menu" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/office/40/000000/home-page.png" />Início</Link>
          <Link to="/cliente" className="list-group-item list-group-item-action text-white bg-dark"><img className="mr-3" alt="" src="https://png.icons8.com/ultraviolet/40/000000/user-group-man-man.png" />Lista de Clientes</Link>
        </div>

      </nav>,
      <div className="container-fluid">
        <div className="row border-bottom">
          <div className="mt-4 col-12 text-center">
            <h1>Cliente - <span className="badge badge-secondary">Cadastro</span></h1>
          </div>
        </div>

      </div>,
      <main className="container mb-5">
        <form className="mt-5" onSubmit={this.enviaForm}>

          <InputForm value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} type="text" id="nome" placeholder="Digite o Nome" name="nome" label="Nome" />

          <div className="form-group">
            <label htmlFor="tel1">Telefone</label>
            <MaskedInput className="form-control" mask="(11) 11111-1111" value={this.state.telefone} onChange={this.salvaAlteracao.bind(this, 'telefone')} id="tel1" placeholder="Digite seu Telefone" />
          </div>

          <div className="form-group">
            <label className="label">Estado</label>
            <select required value={this.state.estado} onChange={this.salvaAlteracao.bind(this, 'estado')} className="form-control" name="estados-brasil">
              <option value="">Selecione o Estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>

          <InputForm value={this.state.cidade} onChange={this.salvaAlteracao.bind(this, 'cidade')} type="text" id="cidade" placeholder="Digite sua Cidade" name="cidade" label="Cidade" />
          <InputForm value={this.state.rua} onChange={this.salvaAlteracao.bind(this, 'rua')} type="text" id="rua" placeholder="Digite sua Cidade" name="rua" label="Rua" />
          <InputForm value={this.state.numero} onChange={this.salvaAlteracao.bind(this, 'numero')} type="number" id="numero" placeholder="Digite o numero da Casa" name="numero" label="Número da casa" />

          <button type="submit" className="btn btn-primary">Cadastrar</button>
          <Link to="/cliente" className="btn ml-3 btn-danger">Cancelar</Link>
        </form>
      </main>
    ]);
  }

}
