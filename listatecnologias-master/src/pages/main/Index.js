import React, { Component } from 'react';
import api from '../../services/api';
import './estilo.css';
import {Link } from 'react-router-dom';

export default class Main extends Component {

    state = {
        produtos: [],
        produtosInfo: {},
        page: 1
    }

    componentDidMount() {
        this.listaProdutos();
    }

    listaProdutos = async (page = 1) => {

        const response = await api.get(`/products?page=${page}`);
        const { docs, ...produtosInfo } = response.data;

        this.setState({ produtos: docs, produtosInfo, page });
    }

    proximaPagina = () => {
        const { page, produtosInfo } = this.state;
        if (page === produtosInfo.pages) return;

        let pagesNumber = page + 1;
        this.listaProdutos(pagesNumber);

    }

    paginaAnterior = () => {
        const { page } = this.state;

        if(page === 1) return;

        let pagesNumber = page - 1;
        this.listaProdutos(pagesNumber);
     }

    render() {

        const { produtos, produtosInfo, page } = this.state;

        return (
            <div className='lista-produtos'>
                {produtos.map(dados => (
                    <article key={dados._id}>
                        <strong>{dados.title}</strong>
                        <p>{dados.description}</p>
                        <Link to={`/produto/${dados._id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.paginaAnterior}>Antenrior</button>
                    <button disabled={page === produtosInfo.pages} onClick={this.proximaPagina}>Próximo</button>
                </div>
            </div>
        );

    }


}