import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App';
import Menu from './telas/menu.js';

import registerServiceWorker from './registerServiceWorker';

import Cliente from './telas/telas-cliente/cliente.js';
import EditCliente from './telas/telas-cliente/editCliente.js';
import FormCliente from './telas/telas-cliente/FormCliente.js';

import Prato from './telas/telas-prato/prato.js';
import EditPrato from './telas/telas-prato/editPrato.js';
import FormPrato from './telas/telas-prato/FormPrato.js';

import Bebida from './telas/telas-bebida/bebida.js';
import EditBebida from './telas/telas-bebida/editBebida.js';
import FormBebida from './telas/telas-bebida/FormBebida.js';

import { Router, Route, browserHistory } from "react-router";

import Conta from './telas/Conta.js';

  function validaUsuario(nextState, replace) {

      if(sessionStorage.getItem('user-token') == null) {
          replace('/?Faça Login para poder ter acesso!');
      }

  }

ReactDOM.render(
  <Router history={browserHistory}>

    <Route path="/cliente" component={Cliente} onEnter={validaUsuario} />
    <Route path="/formcliente" component={FormCliente}  onEnter={validaUsuario}/>
    <Route path="/editcliente/:id" component={EditCliente} onEnter={validaUsuario}/>

    <Route path="/prato" component={Prato} onEnter={validaUsuario} />
    <Route path="/editprato/:id" component={EditPrato} onEnter={validaUsuario} />
    <Route path="/formprato" component={FormPrato} onEnter={validaUsuario}/>

    <Route path="/bebida" component={Bebida} onEnter={validaUsuario} />
    <Route path="/editbebida/:id" component={EditBebida}  onEnter={validaUsuario} />
    <Route path="/formbebida" component={FormBebida}  onEnter={validaUsuario}/>

    <Route path="/conta/:id" component={Conta} onEnter={validaUsuario} />
    <Route path="/menu" component={Menu} onEnter={validaUsuario}/>
    <Route path="/" component={App} />
  </Router>

  , document.getElementById('root'));
registerServiceWorker();
