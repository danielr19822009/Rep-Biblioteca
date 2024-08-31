import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";

function Editar_Prestamos() {
  // State variables
  const [usuario, setUsuario] = useState("");
  const [libro, setLibro] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaprestamo, setFechaPrestamo] = useState("");
  const [fechadevolucion, setFechaDevolucion] = useState("");

  const [listalibros, setListaLibros] = useState([]);
  const [listusuarios, setListaUsuarios] = useState([]);
  const [listaprestamos, setListaPrestamos] = useState([]);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);

  // Fetch Prestamos
  const getPrestamos = () => {
    Axios.get("http://localhost:3001/get_prestamos")
      .then((response) => {
        console.log("Prestamos obtenidos:", response.data);
        setListaPrestamos(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los prestamos:", error);
      });
  };

  // Fetch Usuarios
  const getUsuarios = () => {
    Axios.get("http://localhost:3001/get_users")
      .then((response) => {
        console.log("Usuarios obtenidos:", response.data);
        setListaUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  };

  // Fetch Libros (if needed)
  const getLibros = () => {
    Axios.get("http://localhost:3001/get_libros")
      .then((response) => {
        console.log("Libros obtenidos:", response.data);
        setListaLibros(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los libros:", error);
      });
  };

  // Delete Prestamo
  const deletePrestamo = (id) => {
    Axios.delete(`http://localhost:3001/delete_prestamo/${id}`)
      .then(() => {
        Swal.fire({
          title: "Eliminar!",
          text: "El prestamo ha sido eliminado.",
          icon: "success",
          timer: 4000,
        });
        getPrestamos();
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el prestamo:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al eliminar el prestamo.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      });
  };

  // Handle Edit Button Click
  const handleEditClick = (prestamo) => {
    setSelectedPrestamo(prestamo);
    setUsuario(prestamo.usuarioId);
    setLibro(prestamo.libroId);
    setEstado(prestamo.estado);
    setFechaPrestamo(prestamo.fechaPrestamo);
    setFechaDevolucion(prestamo.fechaDevolucion);
  };

    // Función para actualizar un autor
    const updateprestamo = () => {
      if (!usuario || !libro || !estado || !fechaprestamo) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
        return;
      }
      console.log(  usuario + libro)
  
      Axios.put("http://localhost:3001/update_editoriales", {
        usuario,
        libro,
        estado,
        fechaprestamo,
        fechadevolucion,
        
      })
        .then(() => {
          Swal.fire({
            title: "Actualizado!",
            html: `<strong>${libro}</strong> Se ha actualizado`,
            icon: "success",
            timer: 4000,
          });
          getPrestamos(); // Actualiza la lista de autores después de la actualización
        })
        .catch((error) => {
          console.error("Hubo un error al actualizar el autor:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al actualizar el autor.",
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
    getUsuarios();
    getLibros(); // Fetch libros if needed
  }, []);

  return (
    <div className="container-fluid">
      <hr />
      <div id="tabladatos" className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 id="titablausers" className="m-0 font-weight-bold text-primary">Libros Prestados</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col"> # Prestamo</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Libro</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha Prestamo</th>
                  <th scope="col">Fecha Devolucion</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody id="prestamos">
                {listaprestamos.map((prestamo) => (
                  <tr key={prestamo.prestamoId}>
                    <td>{prestamo.prestamoId}</td>
                    <td>{prestamo.nombusu}</td>
                    <td>{prestamo.nomblibro}</td>
                    <td>{prestamo.estado}</td>
                    <td>{prestamo.fechaCreacion}</td>
                    <td>{prestamo.fechaFin}</td>
                    <td className="opciones">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#Modalprestamos"
                          onClick={() => handleEditClick(prestamo)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deletePrestamo(prestamo.prestamoId)}
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
        </div>
      </div>

      {/* Modal Editar Prestamos */}
      <div className="modal fade" id="Modalprestamos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Prestamo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form method="POST" id="reg-pdo">
                <div className="input-group mb-3">
                  <span className="input-group-text">Usuario:</span>
                  <select
                    required
                    name="usuario"
                    className="form-control"
                    id="usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {listusuarios.map((usuario) => (
                      <option key={usuario.usuarioId} value={usuario.usuarioId}>
                        {usuario.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Libro:</span>
                  <select
                    required
                    name="libro"
                    className="form-control"
                    id="libro"
                    value={libro}
                    onChange={(e) => setLibro(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {listalibros.map((libro) => (
                      <option key={libro.libroId} value={libro.libroId}>
                        {libro.nombreLibro}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Estado Libro:</span>
                  <input
                    required
                    id="estado"
                    type="text"
                    className="form-control"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Fecha Prestamo:</span>
                  <input
                    required
                    id="fechaprestamo"
                    type="date"
                    className="form-control"
                    value={fechaprestamo}
                    onChange={(e) => setFechaPrestamo(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Fecha Devolucion:</span>
                  <input
                    id="fechadevolucion"
                    type="date"
                    className="form-control"
                    value={fechadevolucion}
                    onChange={(e) => setFechaDevolucion(e.target.value)}
                  />
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" onClick={(event) => { event.preventDefault(); updateprestamo(); }}>Actualizar</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editar_Prestamos;
