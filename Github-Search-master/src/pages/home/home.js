import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './home-style.css';
import searchIcon from './img/search-icon.svg';

export default class Home extends Component {


    searchUser = (event) => {
        event.preventDefault();
        browserHistory.push(`/result/${this.user.value}`);
    }

    render() {

        return (
            <main className="container d-flex h-100">

                <section className="row justify-content-center align-self-center">

                    <div className="col-md-12 col-sm-12 text-center">
                        <h1 className="github-search-title">Github<span className="text-style-1"> Search</span></h1>
                    </div>

                    <form onSubmit={this.searchUser}>
                        <div className="row d-flex justify-content-center">
                            <input type="text" className="search-input" ref={(input => (this.user = input))} required />
                            <button type="submit" className="button-search"><img src={searchIcon} alt="search icon" /></button>
                        </div>
                    </form>
                </section>
            </main>

        );
    }
}
