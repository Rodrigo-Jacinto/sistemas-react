import React from 'react';
import starIcon from './img/star-icon.svg';
import "./repositories-style.css";

const Repositorie = (props) => {

    let repositories = props.repos;
    
    repositories.sort((a, b) => {
        return a.stargazers_count > b.stargazers_count ? -1 : a.stargazers_count < b.stargazers_count ? 1 : 0;
    });

    return (
        repositories.map(repos =>
            (
                <div className="mb-5" key={repos.id}>
                    <h1 className="repo-name">{repos.name}</h1>
                    <span className="repo-description">{repos.description}</span>
                    <span className="star-count">
                        <img src={starIcon} alt="star icon" />
                        {repos.stargazers_count}
                    </span>
                </div>

            )
        )
    )
}


export default Repositorie;

