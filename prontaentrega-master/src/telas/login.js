import React, { Component } from 'react';
import InputForm from './InputForm';
import { browserHistory } from "react-router";
import api from '../services/api'


export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        if (sessionStorage.getItem('user-token')) {
            sessionStorage.removeItem('user-token');
        }
    }

    enviaForm = async (e) => {
        e.preventDefault();

        let response = await api.post('/login', { usuario: this.usuario.value, senha: this.senha.value })

        if (response.data.resultado) {
            sessionStorage.setItem('user-token', true);
            browserHistory.push('/menu');
        }

    }

    render() {
        return ([

            <div className="container">
                <div className="row mt-5">

                    <div className="col">

                        <div className="card mx-auto tam bg-light">

                            <div className="card-header">
                                <img className="float-left" alt="" src="https://png.icons8.com/dusk/40/000000/password.png" />
                                <h2 className="text-center">Login</h2>
                            </div>
                            <form onSubmit={this.enviaForm.bind(this)}>

                                <div className="card-body">

                                    <InputForm inputref={(input) => { this.usuario = input }} placeholder="Digite seu Usuário" type="text" label="Usuário" />

                                    <InputForm inputref={(input) => { this.senha = input }} placeholder="Digite sua Senha" type="password" label="Senha" />


                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Entrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col mt-3">
                    <div className="card mx-auto tam bg-dark">

                        <div className="card-header">
                            <h5 className="text-center text-light">Conta para acessar o sistema</h5>
                        </div>

                        <div className="card-body">
                            <span className="text-primary">Usuario: </span><span className="text-light">admin</span><br/>
                            <span className="text-primary">Senha: </span><span className="text-light">admin</span>
                        </div>
                    </div>
                </div>

            </div>
        ]);
    }

}