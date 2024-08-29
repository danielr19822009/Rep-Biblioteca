import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import "./AddAutor";

import Swal from "sweetalert2";
import Axios from "axios";
function Add_Prestamo() {
  // Definir las opciones de días
  const dayOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  // Componente para la gestión de la biblioteca
  const [usuario, setusuario] = useState("");
  const [libro, setLibro] = useState("");
  const [estado, setestado] = useState("");
  const [fechaprestamo, setfechaprestamo] = useState("");
  const [fechadevolucion, setfechadevolucion] = useState("");

  const [dias, setDias] = useState("0");

  //listas data
  const [listalibros, setListalibros] = useState([]);
  const [listusuarios, setlistausuarios] = useState([]);
  const [listaprestamos, setlistaprestamos] = useState([]);

  // Función para obtener los libros
  const getLibros = () => {
    Axios.get("http://localhost:3001/get_libros")
      .then((response) => {
        console.log("Libros obtenidos:", response.data); // Verifica los datos
        setListalibros(response.data);
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

  const addprestamo = (e) => {
    e.preventDefault();
    console.log({
      usuario,
      libro,
      estado,
      fechaprestamo,
      fechadevolucion,
    });

    Axios.post("http://localhost:3001/add_prestamo", {
      usuario,
      libro,
      estado,
      fechaprestamo,
      fechadevolucion,
    })
      .then((response) => {
        Swal.fire("Éxito", "Libro registrado exitosamente", "success");
        setusuario("");
        setLibro("");
        setestado("");
        setfechadevolucion("");
        setfechaprestamo("");
        getPrestamos();
        getLibros();
        getusuarios();
      })
      .catch((error) => {
        console.error("Error al registrar el libro:", error);
      });
  };

  
  useEffect(() => {
    getPrestamos();
    getLibros();
    getusuarios();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container" id="reg-libro">
        <div className="card text-center">
          <div className="card-header">Registra Prestamo</div>
          <div className="card-body">
            <form method="POST" id="reg-pdo">
              <div className="input-group mb-3">
                <span className="input-group-text">Usuario:</span>
                <select
                  name="usuario"
                  className="form-control"
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setusuario(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {listusuarios.map((usuarios) => (
                    <option key={usuarios.usuarioId} value={usuarios.usuarioId}>
                      {usuarios.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Libro:</span>
                <select
                  name="autorId"
                  className="form-control"
                  id="autorId"
                  value={libro}
                  onChange={(e) => setLibro(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {listalibros.map((libros) => (
                    <option key={libros.libroId} value={libros.libroId}>
                      {libros.nombreLibro}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estado Libro</span>
                <input
                  id="nombrelibro"
                  type="text"
                  className="form-control"
                  required
                  value={estado}
                  onChange={(event) => setestado(event.target.value)}
                />
              </div>

              {/* <div className='form-group'>
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
              </div> */}

              <div className="input-group mb-3" id="fecha">
                <span className="input-group-text">Fecha Prestamo:</span>
                <input
                  id="fechaprestamo"
                  type="date"
                  className="form-control"
                  required
                  value={fechaprestamo}
                  onChange={(e) => setfechaprestamo(e.target.value)}
                />
              </div>
              <div className="input-group mb-3" id="fecha">
                <span className="input-group-text">Fecha Devolucion:</span>
                <input
                  id="fechadevolucion"
                  type="date"
                  className="form-control"
                  required
                  value={fechadevolucion}
                  onChange={(e) => setfechadevolucion(e.target.value)}
                />
              </div>
            </form>
            <button className="btn btn-primary btn-block" onClick={addprestamo}>
              Registrar nuevo pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_Prestamo;
