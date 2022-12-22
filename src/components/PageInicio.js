import React, { Component } from 'react'

import axios from "axios";//
import "bootstrap/dist/css/bootstrap.min.css";//


const urlEventos = process.env.REACT_APP_APIEVEINI;

class PageInicio extends Component{
   
    state={
        data: []
    }


    peticionGet = () => {
        axios.get(urlEventos).then(response => {
          //console.log(response.data);
          this.setState({data:response.data})
        }).catch(error => {
          console.log(error.message);
        })
      }

      componentDidMount(){
        this.peticionGet()
      }


    render(){
        return <div>
            <table className="table ">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Equipo1</th>            
            <th>Equipo2</th>
            <th>Deporte</th>            
            <th>Descripción</th>
            
            
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(evento => {
            return(
              <tr key={evento.sec}>
                <td>{evento.fecha}</td> 
                <td>{evento.equi1+": "+evento.marca1}</td> 
                <td>{evento.equi2+": "+evento.marca2}</td> 
                <td>{evento.deporte}</td> 
                <td>{evento.descrip}</td> 
                
              </tr>
            )
          })}
        </tbody>
        </table>
        </div>
    }
}

export default PageInicio