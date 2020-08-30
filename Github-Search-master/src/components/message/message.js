import React from 'react';
import "./message-style.css";

const Message = (props) => (

    <section className="row mt-5">
        <div className="col-md-12 text-center">
            {props.optionMessage ? <h1 className="loading-message">Loading...</h1>:<h1 className="not-found-message">User not found :(</h1>}
        </div>
    </section>

)

export default Message;
