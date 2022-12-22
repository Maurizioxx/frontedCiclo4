import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';

const url = process.env.REACT_APP_APIEQU;
const field_id = '/equ_id/'

class PageEquipos extends Component{

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    tipoModal:'',
    form:{
      equ_id:'',
      equ_nombre:''
      
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
    delete this.state.form.equ_id //esto borra el campo usu_id
    await axios.post(url, this.state.form).then(response => {
      this.modalInsertar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPut = () => {
    axios.put(url+field_id+this.state.form.equ_id,this.state.form).then(response => {
      this.modalInsertar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionDelete = () => {
    axios.delete(url+field_id+this.state.form.equ_id).then(response => {
      this.modalEliminar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message);
    })
  }


  seleccionarUsuario=(equipo)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        
        equ_id: equipo.equ_id,
        equ_nombre: equipo.equ_nombre
        
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
        <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}} >Agregar Equipo</button>
        <br /><br />
        <table className="table ">
        <thead>
          <tr>
            <th>EquipoId</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(equipo => {
            return(
              <tr>
                <td>{equipo.equ_id}</td> 
                <td>{equipo.equ_nombre}</td> 
    
                <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarUsuario(equipo); this.modalInsertar()}}/></button>
                    {" "}
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarUsuario(equipo); this.modalEliminar()}}/></button>
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
              <label htmlFor="equ_id">EquipoId</label>
              <input className="form-control" type="text" name="equ_id" id="equ_id" readOnly onChange={this.handleChange} value = {form ? form.equ_id : this.state.data.length+1}></input>
              <br />

              <label htmlFor="equ_nombre">Nombre</label>
              <input className="form-control" type="text" name="equ_nombre" id="equ_nombre" onChange={this.handleChange} value = {form ? form.equ_nombre : ''}></input>
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

export default PageEquipos;