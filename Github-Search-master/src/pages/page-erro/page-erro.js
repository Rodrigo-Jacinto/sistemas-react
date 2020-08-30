import React, { Component } from 'react';
import { Link } from 'react-router';



export default class PageErro extends Component {

    render() {

        return (

            <main className="container">

                <section className="row mt-5">

                    <div className="col-md-12 col-sm-12 text-center">
                        <Link to="/" className="link-home">
                            <h1 className="github-search-title">Github<span className="text-style-1"> Search</span></h1>
                        </Link>
                        <h1 className="not-found-message">Page not found - 404</h1>
                    </div>

                </section>
            </main>

        );
    }
}
