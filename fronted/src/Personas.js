import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import mysqli from 'react'
import Swal from 'sweetalert2'
import Axios from "axios";



const PeopleManagement = () => {

  const [id, setId] = useState('')
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')



  const addusers = () => {

    if (cedula=="" || nombre=="" || direccion=="" || telefono==""){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Oops...",
            text: "Uno o Mas Campos estan vacios Verifique!",
            
          });

         
    }
    else{
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
            text: "Hello ,"+ " " + nombre,
          });

          Axios.post("http://localhost:3001/createusers", {
            cedula: cedula,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono
          });
 }
};


  return (
    <div className='form-regi-personas'>
      <form method='POST' id='reg-pdo'>
        <div className='form-group'>
          <p className='h5'>
            User Manager
          </p>
        </div>
        <div className='input-group mb-3'>
          <span class='input-group-text' id='inputGroup-sizing-default'>Cedula</span>
          <input
            id='cedula'
            type='text'
            class='form-control'
            aria-label='Sizing example input'
            aria-describedby='inputGroup-sizing-default'
            onChange={(event) =>{
                    setCedula(event.target.value);
                }} />
        </div>
        <div className='input-group mb-3'>
          <span class='input-group-text' id='inputGroup-sizing-default'>Nombre</span>
          <input
            id='nombre'
            type='text'
            class='form-control'
            aria-label='Sizing example input'
            aria-describedby='inputGroup-sizing-default'
            onChange={(event) =>{
                    setNombre(event.target.value);
                }} />
        </div>
        <div className='input-group mb-3'>
          <span class='input-group-text' id='inputGroup-sizing-default'>Direccion</span>
          <input
            id='direccion'
            type='text'
            class='form-control'
            aria-label='Sizing example input'
            aria-describedby='inputGroup-sizing-default' 
            onChange={(event) =>{
                    setDireccion(event.target.value);
                }}
            />
        </div>
        <div className='input-group mb-3'>
          <span class='input-group-text' id='inputGroup-sizing-default'>Telefono</span>
          <input
            id='telefono'
            type='text'
            class='form-control'
            aria-label='Sizing example input'
            aria-describedby='inputGroup-sizing-default' 
            onChange={(event) =>{
                    setTelefono(event.target.value);
                }}
            />
        </div>
        
      </form>
      <button type='submit' className='btn btn-primary btn-block' onClick={addusers}>
          Registrar persona
        </button>
        <div/>
      <div/>

      
      <div className='col-lg-9 col-md-12'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>
                N° Cédula
              </th>
              <th scope='col'>
                Nombre
              </th>
              <th scope='col'>
                Teléfono
              </th>
              <th scope='col'>
                Dirección
              </th>
              <th scope='col'>
                Opciones
              </th>
            </tr>
          </thead>
          <tbody id='personas'>
            {/* Contenido dinámico aquí */}
          </tbody>
        </table>
      </div>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>Editar persona</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form method='POST' id='edit-per'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='cedulaE'
                    placeholder='Cédula'
                    required />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='nombrePedidosE'
                    placeholder='Nombre'
                    required />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='direccionPedidosE'
                    placeholder='Dirección'
                    required />
                </div>
                <div className='form-group'>
                  <input
                    type='tel'
                    className='form-control'
                    id='telefonoPedidosE'
                    placeholder='Teléfono'
                    required />
                </div>
                <input type='hidden' id='idnes' value='' />
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                    Cerrar
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    Editar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeopleManagement
