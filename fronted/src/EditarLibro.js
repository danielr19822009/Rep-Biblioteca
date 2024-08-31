import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";

// Importa la función desde el archivo functions.js
const export_addAutor = require("./AddAutor.js");
const export_addEditorial = require("./EditarEditorial.js");

// Componente para la gestión de la biblioteca
const Edit_Libro = () => {
  const [libroid, setlibroid] = useState("");
  const [nombrelibro, setnombrelibro] = useState("");

const[editorialid, seteditorialid]=useState()
  const [nombreditorial, setnombreditorial] = useState("");

  const [autorid, setautorid] = useState("");
  const [nombreautor, setnombreautor] = useState("");

  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");

  const [selectedlibro, setselectedlibro] = useState(null);

  // Definición de estados para manejar los datos del modal Add Autor
  const [NombreAutor, setNombreAutor] = useState("");
  const [ApellidoAutor, setApellidoAutor] = useState("");

  // Definición de estados para manejar los datos del modal Add editorial 
  const [NombreEditorial, setNombreEditorial] = useState("");
  const [DireccionEditorial, setDireccionEditorial] = useState("");
  const [TelefonoEditorial, setTelefonoEditorial] = useState("");

  //listas data
  const [listalibros, setListalibros] = useState([]);


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


  useEffect(() => {
    getLibros();

  }, []);


  const updateLibro = () => {
    // Validaciones para asegurarse de que las variables no sean nulas o indefinidas
    if (!libroid || !nombrelibro || !editorialid ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos. ' + libroid + ' ' + nombrelibro + ' ' + editorialid + ' ' + autorid+ ' ' + cantidad,
        showConfirmButton: true,
      });
      return;
    }

    Axios.put(`http://localhost:3001/update_libro/`, {
      libroid,
      nombrelibro,
      editorialid,
      autorid,
      cantidad,
      fecha,
    })
      .then(() => {
        Swal.fire({
          title: "Actualizado!",
          html: `<strong> ${nombrelibro} </strong>Se Ha Actualizado`,
          icon: "success",
          timer: 4000,
        });
        getLibros();
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el Libro:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al actualizar el Libro.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      });
  };

 // Handle Edit Button Click
 const handleEditClick = (editarlibro) => {
  setselectedlibro(editarlibro);
  setFecha(editarlibro.fechaCreacion);
};



  // Función para eliminar un libro
  const deleteLibro = (libroId, nombrelibro) => {
    // Añade nombre como argumento

    Axios.delete(`http://localhost:3001/delete_libros/${libroId}`)
      .then(() => {
        Swal.fire({
          title: "Eliminar!",
          html: `<strong>${nombrelibro}</strong> se ha eliminado`,
          icon: "success",
          timer: 4000,
        });
        getLibros();
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el nombre Editorial:", error);
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

  return (
    <div className="container-fluid">
      {/* tabla mostrar libros */}
      <div id="tablausers" className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 id="titablausers" className="m-0 font-weight-bold text-primary">
            Libros
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id Libro</th>
                  <th scope="col">Nombre Libro</th>
                  <th scope="col">Editorial</th>
                  <th scope="col">Autor</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Fecha Creación</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {listalibros.map((libro) => (
                  <tr key={libro.libroId}>
                    <td>{libro.libroId}</td>
                    <td>{libro.nombreLibro}</td>
                    <td>{libro.nombreEditorial}</td>
                    <td>{libro.nombreAutor + " " + libro.apellidoAutor}</td>
                    <td>{libro.cantidad}</td>
                    <td>{libro.fechaCreacion}</td>
                    <td className="opciones">

                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            setlibroid(libro.libroId);
                            setnombrelibro(libro.nombreLibro);

                            seteditorialid(libro.editorialId);
                            setnombreditorial(libro.nombreEditorial);

                            setautorid(libro.autorId);
                            setnombreautor(libro.nombreAutor);

                            setCantidad(libro.cantidad);
                            setFecha(libro.fechaCreacion);

                            setnombreautor(libro.nombreAutor + ' ' + libro.apellidoAutor);
                            setNombreEditorial(libro.nombreEditorial);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteLibro(libro.libroId)}
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

      {/* Modal para editar libro*/}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                EDITAR LIBRO
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text">ID</span>
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    onChange={(event) => setlibroid(event.target.value)}
                    value={libroid}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre Libro:</span>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setnombrelibro(e.target.value)}
                    value={nombrelibro}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Editorial ID:</span>
                  <input
                    type="text"
                    id="editorialid"
                    className="form-control"
                    onChange={(e) => seteditorialid(e.target.value)}
                    value={editorialid}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Autor ID:</span>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setautorid(e.target.value)}
                    value={autorid}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Cantidad:</span>
                  <input
                    type="number"
                    className="form-control"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Fecha:</span>
                  <input required
                    type="date"
                    className="form-control"
                    onChange={(e) => setFecha(e.target.value)}
                    value={fecha}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={(event) => { event.preventDefault(); updateLibro(); }}>
                Guardar Cambios
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>


      {/*     MODAL NUEVO AUTOR*/}
      <div
        className="modal fade"
        id="ModalAddAutor"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Nuevo Autor
              </h5>
            </div>
            <div className="modal-body">
              <form id="reg-pdo">
                <div className="form-group">
                  <h2>AUTOR</h2>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre</span>
                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) => setNombreAutor(event.target.value)}
                    value={NombreAutor}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Apellido</span>
                  <input
                    id="apellido"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) => setApellidoAutor(event.target.value)}
                    value={ApellidoAutor}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={export_addAutor}
                  >
                    Add Autor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*     MODAL NUEVO editorial*/}
      <div
        className="modal fade"
        id="ModalAddEditorial"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Nuevo Autor
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text">ID</span>
                  <input
                    id="nombreeditorial"
                    type="text"
                    className="form-control"
                    readOnly
                    onChange={(event) => seteditorialid(event.target.value)}
                    value={editorialid}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre</span>
                  <input
                    id="nombreeditorial"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) => setNombreEditorial(event.target.value)}
                    value={NombreEditorial}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Direccion:</span>
                  <input
                    id="direccioneditorial"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) =>
                      setDireccionEditorial(event.target.value)
                    }
                    value={DireccionEditorial}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Telefono:</span>
                  <input
                    id="telefonoeditorial"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) =>
                      setTelefonoEditorial(event.target.value)
                    }
                    value={TelefonoEditorial}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={export_addEditorial}
                  >
                    Add Autor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_Libro;
