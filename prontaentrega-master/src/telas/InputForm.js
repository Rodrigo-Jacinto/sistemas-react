import React, { Component } from 'react';


class InputForm extends Component {

    render() {

        return (

            <div className="form-group">
                <label className={this.props.id}>{this.props.label}</label>
                <input ref={this.props.inputref} className="form-control"  {...this.props} />
            </div>
        );
    }



}

export default InputForm;