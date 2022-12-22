import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import MenuAdmin from "./components/MenuAdmin"
import PageInicio from './components/PageInicio'
import PageEventos from './components/PageEventos';
import PageUsuarios from './components/PageUsuarios';
import PageEquipos from './components/PageEquipos';
import PageDeportes from './components/PageDeportes';


import MenuInicial from './components/MenuInicial';
import PageLogin from './components/PageLogin';
//import PageLogout from './components/PageEventos';


class App extends Component {

  render() {
    return (
      <Router>
        <MenuInicial />
        <Routes>
          <Route path='/' element={<PageInicio />} />
          <Route path='/PageLogin' element={<PageLogin />} />
          <Route path='/PageEventos' element={<PageEventos />} />
          <Route path='/PageUsuarios' element={<PageUsuarios />} />
          <Route path='/PageEquipos' element={<PageEquipos />} />
          <Route path='/PageDeportes' element={<PageDeportes />} />
          
        </Routes>
      </Router>

      /*<Router>
        <MenuAdmin />
        <Routes>
          <Route path='/' element={<PageInicio />} />
          <Route path='/PageUsuarios' element={<PageUsuarios />} />
          <Route path='/PageEventos' element={<PageEventos />} />
        </Routes>
      </Router>*/




    );
  }
}

export default App;
