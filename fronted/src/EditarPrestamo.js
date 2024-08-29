import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";



function Editar_Prestamos(){


     // Definir las opciones de días
     const dayOptions = Array.from({ length: 30 }, (_, i) => i + 1);

     //variables para capturar los valores del los input
     const [usuarioid,setusuarioid]=useState("");
     const [libroid,setlibroid]=useState("");
     const [estado,setestado]=useState("");
     const [fechaini,setfechaini]=useState("");
     const [fechafin,setfechafin]=useState("");
     const [nombusu, setnombusu] = useState('');
     const [nomblibro, setnomblibro] = useState('');



     const [dias,setDias]=useState("0");

     const [listaprestamos, setlistaprestamos] = useState([]);
     const [listusuarios, setlistausuarios] = useState([]);

    
// Función para obtener los libros
const getPrestamos = () => {
  Axios.get("http://localhost:3001/get_prestamos")
    .then((response) => {
      console.log("prestamos obtenidos:", response.data); // Verifica los datos
      setlistaprestamos(response.data);
      
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los libros:", error);
    });
};

// Función para obtener los usuarios
const getusuarios = () => {
  Axios.get("http://localhost:3001/get_users")
    .then((response) => {
      console.log("Usuarios obtenidos:", response.data); // Verifica los datos
      setlistausuarios(response.data);
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los libros:", error);
    });
};
 //funcion delete users
 const deleteprestamo = (id, nombre) => {  // Añade nombre como argumento
  Axios.delete(`http://localhost:3001/delete_users/${id}`)
      .then(() => {
          Swal.fire({
              title: "Eliminar!",
              html: `<strong>${nombre}</strong> se ha eliminado`,
              icon: "success",
              timer: 4000,
          });
          getusuarios();
      })
      .catch((error) => {
          console.error("Hubo un error al eliminar el usuario:", error);
          Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al eliminar el usuario.",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
          });
      });
};

useEffect(() => {
  getPrestamos();
}, []);

  return (
    <div className="container-fluid">
      
    <hr />
    <div id="tabladatos" className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 id='titablausers' className="m-0 font-weight-bold text-primary">Libros Prestados</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Usuario</th>
              <th scope='col'>Libro</th>
              <th scope='col'>Estado</th>
              <th scope='col'>Fecha Prestamo</th>
              <th scope='col'>Fecha Devolucion</th>
              <th scope='col'>Opciones</th>
            </tr>
          </thead>
          <tbody id='prestamos'>
            {/* Contenido dinámico aquí */}
            
                {listaprestamos.map((prestamos) => (
                  <tr key={prestamos.prestamoId}>
                    <td>{prestamos.prestamoId}</td>
                    <td>{prestamos.nombusu}</td>
                    <td>{prestamos.nomblibro}</td>{" "}
                    <td>{prestamos.estado}</td>{" "}
                    
                    <td>{prestamos.fechaFin}</td>
                    <td>{prestamos.fechaCreacion}</td>
                    <td className="opciones">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            setusuarioid(prestamos.usuarioId);
                            setlibroid(prestamos.libroId);
                            setestado(prestamos.estado);
                            setfechaini(prestamos.fechaCreacion);
                            setfechafin(prestamos.fechaFin);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteprestamo(prestamos.prestamoId)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            

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
    </div>
        </div>
    
  )
}


export default Editar_Prestamos
