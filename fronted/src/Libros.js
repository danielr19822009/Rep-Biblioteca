import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";

// Importa la función desde el archivo functions.js
const export_addAutor = require("./Autores.js");
const export_addEditorial = require("./Editoriales.js");

// Componente para la gestión de la biblioteca
const Libros = () => {
  const [libroId, setlibroId] = useState("");
  const [nombrelibro, setnombrelibro] = useState("");
  const [nombreautor, setnombreautor] = useState("");
  const [nombreeditorial, setnombreeditorial] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");

  // del modal autor
  // Definición de estados para manejar los datos del autor y la lista de autores
  const [autorid, setAutorid] = useState("");
  const [nombreAutor, setNombreAutor] = useState("");
  const [apellidoAutor, setApellidoAutor] = useState("");

  // Definición de estados para manejar los datos del editorial y la lista de editoriales
  const [editorialId, setEditorialId] = useState(null);
  const [nombreEditorial, setNombreEditorial] = useState("");
  const [direccionEditorial, setDireccionEditorial] = useState("");
  const [telefonoEditorial, setTelefonoEditorial] = useState("");

  //listas data
  const [listalibros, setListalibros] = useState([]);
  const [listaautor, setlistaautor] = useState([]);
  const [listaeditorial, setlistaeditorial] = useState([]);

  // Función para obtener los libros
  const getLibros = () => {
    Axios.get("http://localhost:3001/get_libros")
      .then((response) => {
        console.log("Libros obtenidos:", response.data); // Verifica los datos
        setListalibros(response.data);
        setlistaautor(response.data);
        setlistaeditorial(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los libros:", error);
      });
  };

  // Función para obtener las editoriales
  const getEditoriales = () => {
    Axios.get("http://localhost:3001/get_libros_editoriales")
      .then((response) => {
        console.log("Editoriales obtenidas:", response.data); // Verifica los datos
        setlistaeditorial(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las editoriales:", error);
      });
  };

  // Función para obtener los autores
  const getautores = () => {
    Axios.get("http://localhost:3001/get_libros_autores")
      .then((response) => {
        console.log("Autores obtenidos:", response.data); // Verifica los datos
        setlistaautor(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los autores:", error);
      });
  };

  useEffect(() => {
    getLibros();
    getautores();
    getEditoriales();
  }, []);

  const addLibro = (e) => {
    e.preventDefault();

    console.log({
      nombrelibro,
      nombreautor,
      nombreeditorial,
      cantidad,
      fecha,
    });

    Axios.post("http://localhost:3001/add_libro", {
      nombrelibro,
      nombreautor,
      nombreeditorial,
      cantidad,
      fecha,
    })
      .then((response) => {
        Swal.fire("Éxito", "Libro registrado exitosamente", "success");
        setnombrelibro("");
        setnombreeditorial("");
        setnombreautor("");
        setCantidad("");
        setFecha("");
        getLibros();
        getEditoriales();
        getautores();
      })
      .catch((error) => {
        console.error("Error al registrar el libro:", error);
      });
  };

  const updateLibro = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:3001/update_libro/${libroId}`, {
      libroId,
      nombrelibro,
      nombreeditorial,
      nombreautor,
      cantidad,
      fecha,
    })
      .then((response) => {
        Swal.fire("Éxito", "Libro actualizado exitosamente", "success");
        setnombrelibro("");
        setnombreeditorial("");
        setnombreautor("");
        setCantidad("");
        setFecha("");
        getLibros();
        getEditoriales();
        getautores();
      })
      .catch((error) => {
        console.error("Error al actualizar el libro:", error);
      });
  };

  // Función para eliminar un editorial
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
        getEditoriales();
        getLibros();
        getautores();
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
      <div className="container" id="reg-libro">
        <div className="card text-center">
          <div className="card-header">Registra Nuevo Libro</div>
          <div className="card-body">
            <form>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre</span>
                <input
                  id="nombrelibro"
                  type="text"
                  className="form-control"
                  required
                  value={nombrelibro}
                  onChange={(event) => setnombrelibro(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Autor:</span>
                <select
                  name="autorId"
                  className="form-control"
                  id="autorId"
                  value={nombreautor}
                  onChange={(e) => setnombreautor(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {listaautor.map((autores) => (
                    <option key={autores.autorId} value={autores.autorId}>
                      {" "}
                      {autores.nombreAutor + " " + autores.apellidoAutor}
                    </option>
                  ))}
                </select>
                <button
                  id="btn-add"
                  type="button"
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalAddAutor"
                >
                  {" "}
                  Add Autor
                </button>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Editorial:</span>
                <select
                  className="form-control"
                  id="editorialId"
                  value={nombreeditorial}
                  onChange={(e) => setnombreeditorial(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {listaeditorial.map((editoriales) => (
                    <option
                      key={editoriales.editorialId}
                      value={editoriales.editorialId}
                    >
                      {editoriales.nombreEditorial}{" "}
                    </option>
                  ))}
                  <option value=""> Add Editorial </option>
                </select>
                <button
                  type="button"
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalAddEditorial"
                >
                  {" "}
                  Add Editorial
                </button>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Cantidad:</span>
                <input
                  name="cantidad"
                  type="number"
                  className="form-control"
                  required
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>
              <div className="input-group mb-3" id="fecha">
                <span className="input-group-text">Fecha:</span>
                <input
                  id="fecha"
                  type="date"
                  className="form-control"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div></div>
            </form>
            <button
              id="btn-registrar"
              onClick={addLibro}
              type="submit"
              className="btn btn-block btn-primary"
            >
              Registrar
            </button>
          </div>
        </div>
      </div>

      <hr />

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
                  <th scope="col">Nombre</th>
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
                    <td>{libro.nombreEditorial}</td>{" "}
                    <td>{libro.nombreAutor + " " + libro.apellidoAutor}</td>{" "}
                    <td>{libro.cantidad}</td>
                    <td>{libro.fechaCreacion}</td>
                    <td className="opciones">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            setnombrelibro(libro.nombreLibro);
                            setnombreeditorial(libro.nombreEditorial);
                            setnombreautor(libro.autorId);
                            setCantidad(libro.cantidad);
                            setFecha(libro.fechaCreacion);
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

      {/* Modal para editar */}
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
            </div>
            <div className="modal-body">
              <form onSubmit={updateLibro}>
                <div className="input-group mb-3">
                  <span className="input-group-text">id</span>
                  <input
                    type="text"
                    className="form-control"
                    value={libroId}
                    onChange={(event) => setlibroId(event.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre</span>
                  <input
                    type="text"
                    className="form-control"
                    value={nombrelibro}
                    onChange={(e) => setnombrelibro(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Autor:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={nombreautor}
                    onChange={(e) => setnombreautor(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Editorial:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={nombreeditorial}
                    onChange={(e) => setnombreeditorial(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Cantidad:</span>
                  <input
                    name="cantidad"
                    type="number"
                    className="form-control"
                    required
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Fecha:</span>
                  <input
                    name="fecha"
                    type="date"
                    className="form-control"
                    required
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
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
                  <button type="submit" className="btn btn-primary">
                    Actualizar
                  </button>
                </div>
              </form>
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
                    value={nombreAutor}
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
                    value={apellidoAutor}
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
                  <button type="submit" className="btn btn-primary" onClick={export_addAutor}>
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
                    onChange={(event) => setEditorialId(event.target.value)}
                    value={editorialId}
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
                    value={nombreEditorial}
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
                    value={direccionEditorial}
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
                    value={telefonoEditorial}
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
                  <button type="submit" className="btn btn-primary" onClick={export_addEditorial}>
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

export default Libros;
