import React, { Component } from 'react';
import api from '../../services/api';
import Profile from '../../components/profile/profile.js';
import Message from '../../components/message/message.js';
import searchIcon from './img/search-icon.svg';
import { Link } from 'react-router';
import "./result-style.css";

export default class Result extends Component {

    state =
        {
            userGit: null,
            repoGit: null
        }

    componentDidMount() {
        this.searchUser();
    }

    searchUser = async () => {
        try {
            let { user } = this.props.params;
            let responseUser = await api.get(`/${user}`);
            let responseRepos = await api.get(`/${user}/repos`);
        
             if (responseUser.status === 200) {
                this.setState({ userGit: [responseUser.data], repoGit: responseRepos.data });
            }
           
            this.user.value = user;
        }
        catch (err) {
            this.setState({ userGit: [] });
        }

    }


    search = async (event) => {

        event.preventDefault();
        try {
            var responseUser = await api.get(`/${this.user.value}`);
            var responseRepos = await api.get(`/${this.user.value}/repos`);
         
            if (responseUser.status === 200) {
                this.setState({ userGit: [responseUser.data], repoGit: responseRepos.data });

            }
        }
        catch (err) {
            this.setState({ userGit: [] });
        }

    }

    loadUser = () => {

        let { userGit } = this.state;
        let { repoGit } = this.state;

        if (!userGit) {
            return <Message optionMessage={1} />

        }
        else if (Array.isArray(userGit) && userGit.length > 0) {

            return <Profile user={userGit} repos={repoGit} />
        }
        else {
            return <Message optionMessage={0} />
        }
    }

    render() {

        return (
            <main className="container m-5">

                <section className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <Link to="/" className="link-home"> <h1 className="github-search-title github-search-title-result">Github<span className="text-style-1"> Search</span></h1></Link>
                    </div>

                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <form onSubmit={this.search}>
                            <div className="row d-flex">
                                <input type="text" className="search-input" ref={(input => (this.user = input))} required />
                                <button type="submit" className="button-search"><img src={searchIcon} alt="search icon" /></button>
                            </div>
                        </form>
                    </div>

                </section>

                {
                    this.loadUser()
                }

            </main>

        )

    }
}
