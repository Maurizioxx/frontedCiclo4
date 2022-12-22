import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';

const url = process.env.REACT_APP_APIEVE;
const field_id = '/eve_id/'

class PageEventos extends Component{

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    tipoModal:'',
    form:{
      eve_id:'',
      eve_fecha:'',
      equ_equipo1:'',
      equ_equipo2:'',
      eve_marca1:'',
      eve_marca2:'',
      dep_id:'',
      eve_descrip:''
    }
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      //console.log(response.data);
      this.setState({data:response.data})
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPost = async () => {
    delete this.state.form.eve_id //esto borra el campo usu_id
    await axios.post(url, this.state.form).then(response => {
      this.modalInsertar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPut = () => {
    axios.put(url+field_id+this.state.form.eve_id,this.state.form).then(response => {
      this.modalInsertar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionDelete = () => {
    axios.delete(url+field_id+this.state.form.eve_id).then(response => {
      this.modalEliminar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message);
    })
  }


  seleccionarUsuario=(evento)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        eve_id: evento.eve_id,
        eve_fecha: evento.eve_fecha,
        equ_equipo1: evento.equ_equipo1,
        equ_equipo2: evento.equ_equipo2,
        eve_marca1: evento.eve_marca1,
        eve_marca2: evento.eve_marca2,
        dep_id: evento.dep_id,
        eve_descrip: evento.eve_descrip
      }
    })
  }

  modalInsertar = () =>{
    this.setState({modalInsertar:!this.state.modalInsertar})
  }

  modalEliminar = () =>{
    this.setState({modalEliminar:!this.state.modalEliminar})
  }

  handleChange = async e=>{  /// función para capturar los datos del usuario. Es en 2do plano debe ser asincrona
    e.persist();           /// y por eso debemos especificar persistencia
    await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
      form:{
        ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
        [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
      }
    });
    console.log(this.state.form);  /// probar por consola lo que se guarda
  }

  //se ejecuta cuando lo realiza
  componentDidMount(){
    this.peticionGet();
  }

  render(){  

    const form = this.state.form

    return (
      <div className="App">
        <br /><br /><br />
        <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}} >Agregar Evento</button>
        <br /><br />
        <table className="table ">
        <thead>
          <tr>
            <th>EventoId</th>
            <th>EventoFecha</th>
            <th>Equipo1</th>
            <th>Equipo2</th>
            <th>Marcador1</th>
            <th>Marcador2</th>
            <th>Deporteid</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(evento => {
            return(
              <tr>
                <td>{evento.eve_id}</td> 
                <td>{evento.eve_fecha}</td> 
                <td>{evento.equ_equipo1}</td> 
                <td>{evento.equ_equipo2}</td> 
                <td>{evento.eve_marca1}</td>
                <td>{evento.eve_marca2}</td> 
                <td>{evento.dep_id}</td>
                <td>{evento.eve_descrip}</td>  
                <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarUsuario(evento); this.modalInsertar()}}/></button>
                    {" "}
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarUsuario(evento); this.modalEliminar()}}/></button>
                </td> 
              </tr>
            )
          })}
        </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display:'block'}}>
          </ModalHeader>
          <ModalBody>
            <div>
              <label htmlFor="eve_id">EventoId</label>
              <input className="form-control" type="text" name="eve_id" id="eve_id" readOnly onChange={this.handleChange} value = {form ? form.eve_id : this.state.data.length+1}></input>
              <br />

              <label htmlFor="eve_fecha">EventoFecha</label>
              <input className="form-control" type="text" name="eve_fecha" id="eve_fecha" onChange={this.handleChange} value = {form ? form.eve_fecha : ''}></input>
              <br />

              <label htmlFor="equ_equipo1">Equipo1</label>
              <input className="form-control" type="text" name="equ_equipo1" id="equ_equipo1" onChange={this.handleChange} value = {form ? form.equ_equipo1 : ''}></input>
              <br />

              <label htmlFor="equ_equipo2">Equipo2</label>
              <input className="form-control" type="text" name="equ_equipo2" id="equ_equipo2" onChange={this.handleChange} value = {form ? form.equ_equipo2 : ''}></input>
              <br />
              
              <label htmlFor="eve_marca1">Marcador1</label>
              <input className="form-control" type="text" name="eve_marca1" id="eve_marca1" onChange={this.handleChange} value = {form ? form.eve_marca1 : ''}></input>
              <br />

              <label htmlFor="eve_marca1">Marcador2</label>
              <input className="form-control" type="text" name="eve_marca2" id="eve_marca2" onChange={this.handleChange} value = {form ? form.eve_marca2 : ''}></input>
              <br />

              <label htmlFor="dep_id">Deporteid</label>
              <input className="form-control" type="text" name="dep_id" id="dep_id" onChange={this.handleChange} value = {form ? form.dep_id : ''}></input>
              <br />

              <label htmlFor="eve_descrip">Descripcion</label>
              <input className="form-control" type="text" name="eve_descrip" id="eve_descrip" onChange={this.handleChange} value = {form ? form.eve_descrip : ''}></input>
              <br />

            </div>
          </ModalBody>
          <ModalFooter>
            {
              this.state.tipoModal === 'insertar' ?
              <button className="btn btn-success" onClick={()=> this.peticionPost()}>Insertar</button>
              :
              <button className="btn btn-success" onClick={()=> this.peticionPut()}>Modificar</button>
            }
            <button className="btn btn-danger" onClick={()=> this.modalInsertar()} >Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            ¿Estas seguro que deseas eliminar?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=> this.peticionDelete()} >Si</button>
            <button className="btn btn-success" onClick={()=> this.modalEliminar()} >No</button>
          </ModalFooter>
        </Modal>

      </div>
    )}
}

export default PageEventos;