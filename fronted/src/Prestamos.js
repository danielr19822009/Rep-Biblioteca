import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import mysqli from 'react'

import Swal from 'sweetalert2'



function Prestamos(){


     // Definir las opciones de días
     const dayOptions = Array.from({ length: 30 }, (_, i) => i + 1);

     //variables para capturar los valores del los input
     const [email,setEmail]=useState("");
     const [libro,setLibro]=useState("");
     const [dias,setDias]=useState("0");

     
     const mostrarDatos = () => {

        if (email==""){
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
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                
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
                text: "Hello ,"+ " " + email,
              });
        }


    };
    

  return (
    <div className='row mt-3'>
      <div className='col-lg-3 col-md-12 mb-3'>
        <div className='card'>
          <div className='card-body'>
            <form method="POST" id='reg-pdo'>
              <div className='form-group'>
                <p>
                  REGISTRAR PRÉSTAMO
                </p>
              </div>
              <div className='form-group'>
              <label>Email</label>
                <input className='form-control' id='personitas'  
                onChange={(event) =>{
                    setEmail(event.target.value);
                }} />
                  {/* Opciones dinámicas aquí */}
                
              </div>
              <div className='form-group'>
              <label>Name Libro</label>
                <select className='form-control' id='libritos'
                onChange={(event) =>{
                    setLibro(event.target.value);
                }} >
                  {/* Opciones dinámicas aquí */}
                </select>
              </div>
              <br/>
              <div className='form-group'>
                <select className='form-control' id='cant-pdts' placeholder="Dias" 
                onChange={(event) =>{
                    setDias(event.target.value);
                }}>
                  {dayOptions.map(day => (
                     <option key={day} value={day}>
                       {day}
                       {day === 1 ? ' día ' : ' días'}
                     </option>
                   ))}
                </select>
              </div><br/><br/>
              
            </form>
            <button className='btn btn-primary btn-block'
              onClick={mostrarDatos}>
                Registrar nuevo pedido
              </button>
          </div>
        </div>
      </div>


/// dashboard para mostrar los libros

      <div className='col-lg-9 col-md-12'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>
                Cédula
              </th>
              <th scope='col'>
                Persona
              </th>
              <th scope='col'>
                Libro
              </th>
              <th scope='col'>
                Cantidad
              </th>
              <th scope='col'>
                Estado
              </th>
              <th scope='col'>
                Tiempo de Entrega
              </th>
              <th scope='col'>
                Opciones
              </th>
            </tr>
          </thead>
          <tbody id='prestamos'>
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
              <h5 className='modal-title' id='staticBackdropLabel'>Editar préstamo</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form method='POST' id='editarForm'>
                <div className='form-group'>
                  <input type='hidden' id='idnes' value='' />
                  <select className='form-control' id='estadoE'>
                    {/* Opciones dinámicas aquí */}
                  </select>
                </div>
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


export default Prestamos
