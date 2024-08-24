import React, { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";

// Componente para la gestión de la biblioteca
const LibraryManagement = () => {
  const [librosList, setLibrosList] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [autores, setAutores] = useState([]);
  
  const [formEditorial, setFormEditorial] = useState({ nombre: '', direccion: '', telefono: '' });
  const [formAutor, setFormAutor] = useState({ nombre: '', apellido: '' });
  const [formLibro, setFormLibro] = useState({ nombre: '', autorId: '', editorialId: '', cantidad: '' });
  const [currentLibro, setCurrentLibro] = useState(null);

  // Función para obtener los libros
  const getLibros = () => {
    Axios.get("http://localhost:3001/get_libros")
      .then((response) => {
        setLibrosList(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los Libros:", error);
      });
  };

  // Función para obtener las editoriales y autores
  const getEditoriales = () => {
    Axios.get("http://localhost:3001/get_editoriales")
      .then((response) => {
        setEditoriales(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las Editoriales:", error);
      });
  };

  const getAutores = () => {
    Axios.get("http://localhost:3001/get_autores")
      .then((response) => {
        setAutores(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los Autores:", error);
      });
  };

  useEffect(() => {
    getLibros();
    getEditoriales();
    getAutores();
  }, []);

  const handleEditorialChange = (e) => {
    const { name, value } = e.target;
    setFormEditorial((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutorChange = (e) => {
    const { name, value } = e.target;
    setFormAutor((prev) => ({ ...prev, [name]: value }));
  };

  const handleLibroChange = (e) => {
    const { name, value } = e.target;
    setFormLibro((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEditorial = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/add_editorial", formEditorial)
      .then((response) => {
        Swal.fire("Éxito", "Editorial registrada exitosamente", "success");
        setFormEditorial({ nombre: '', direccion: '', telefono: '' });
        getEditoriales();
      })
      .catch((error) => {
        console.error("Error al registrar la editorial:", error);
      });
  };

  const handleSubmitAutor = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/add_autor", formAutor)
      .then((response) => {
        Swal.fire("Éxito", "Autor registrado exitosamente", "success");
        setFormAutor({ nombre: '', apellido: '' });
        getAutores();
      })
      .catch((error) => {
        console.error("Error al registrar el autor:", error);
      });
  };

  const handleSubmitLibro = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/add_libro", formLibro)
      .then((response) => {
        Swal.fire("Éxito", "Libro registrado exitosamente", "success");
        setFormLibro({ nombre: '', autorId: '', editorialId: '', cantidad: '' });
        getLibros();
      })
      .catch((error) => {
        console.error("Error al registrar el libro:", error);
      });
  };

  const handleEdit = (libro) => {
    setCurrentLibro(libro);
    // Aquí deberías abrir el modal y poblar los datos del libro actual
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete_libro/${id}`)
      .then((response) => {
        Swal.fire("Éxito", "Libro eliminado exitosamente", "success");
        getLibros();
      })
      .catch((error) => {
        console.error("Error al eliminar el libro:", error);
      });
  };

  return (
    <div>
      <div className="row mt-5">
        {/* Formulario para Editorial */}
        <div className="col-lg-4 col-md-12 mb-2">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmitEditorial}>
                <div className="form-group">
                  <h2>EDITORIAL</h2>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre Editorial</span>
                  <input
                    name="nombre"
                    value={formEditorial.nombre}
                    onChange={handleEditorialChange}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Dirección Editorial</span>
                  <input
                    name="direccion"
                    value={formEditorial.direccion}
                    onChange={handleEditorialChange}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Teléfono Editorial</span>
                  <input
                    name="telefono"
                    value={formEditorial.telefono}
                    onChange={handleEditorialChange}
                    type="text"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Registrar</button>
              </form>
            </div>
          </div>
        </div>

        {/* Formulario para Autor */}
        <div className="col-lg-4 col-md-12 mb-2">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmitAutor}>
                <div className="form-group">
                  <h2>AUTOR</h2>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre</span>
                  <input
                    name="nombre"
                    value={formAutor.nombre}
                    onChange={handleAutorChange}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Apellido</span>
                  <input
                    name="apellido"
                    value={formAutor.apellido}
                    onChange={handleAutorChange}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Registrar</button>
              </form>
            </div>
          </div>
        </div>

        {/* Formulario para Libro */}
        <div className="col-lg-4 col-md-12 mb-2">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmitLibro}>
                <div className="form-group">
                  <h2>LIBRO</h2>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre</span>
                  <input
                    name="nombre"
                    value={formLibro.nombre}
                    onChange={handleLibroChange}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Autor:</span>
                  <select
                    name="autorId"
                    value={formLibro.autorId}
                    onChange={handleLibroChange}
                    className="form-control"
                    required
                  >
                    <option value="">Seleccionar</option>
                    {autores.map((autor) => (
                      <option key={autor.autorId} value={autor.autorId}>
                        {autor.nombre} {autor.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Editorial:</span>
                  <select
                    name="editorialId"
                    value={formLibro.editorialId}
                    onChange={handleLibroChange}
                    className="form-control"
                    required
                  >
                    <option value="">Seleccionar</option>
                    {editoriales.map((editorial) => (
                      <option key={editorial.editorialId} value={editorial.editorialId}>
                        {editorial.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Cantidad:</span>
                  <input
                    name="cantidad"
                    value={formLibro.cantidad}
                    onChange={handleLibroChange}
                    type="number"
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Registrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="row mt-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Editorial</th>
              <th scope="col">Autor</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Fecha Creación</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {librosList.map((libro) => (
              <tr key={libro.libroId}>
                <td>{libro.nombreLibro}</td>
                <td>{libro.editorialNombre}</td> {/* Debes modificar esto si el nombre de la editorial está en otro lugar */}
                <td>{libro.autorNombre}</td> {/* Lo mismo para el nombre del autor */}
                <td>{libro.cantidad}</td>
                <td>{libro.fechaCreacion}</td>

                <td className="opciones">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => handleEdit(libro)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(libro.libroId)}
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

      {/* Modal para editar */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">EDITAR LIBRO</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="libroE"
                    value={currentLibro?.nombre || ''}
                    onChange={(e) => setCurrentLibro({ ...currentLibro, nombre: e.target.value })}
                    placeholder="Nombre del libro"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="autorE"
                    value={currentLibro?.autorId || ''}
                    onChange={(e) => setCurrentLibro({ ...currentLibro, autorId: e.target.value })}
                  >
                    {autores.map((autor) => (
                      <option key={autor.autorId} value={autor.autorId}>
                        {autor.nombre} {autor.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="editorialE"
                    value={currentLibro?.editorialId || ''}
                    onChange={(e) => setCurrentLibro({ ...currentLibro, editorialId: e.target.value })}
                  >
                    {editoriales.map((editorial) => (
                      <option key={editorial.editorialId} value={editorial.editorialId}>
                        {editorial.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="cantidadE"
                    value={currentLibro?.cantidad || ''}
                    onChange={(e) => setCurrentLibro({ ...currentLibro, cantidad: e.target.value })}
                    placeholder="Cantidad"
                    required
                  />
                </div>
                <input type="hidden" id="idnes" value={currentLibro?.libroId || ''} />
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="submit" className="btn btn-primary">Editar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryManagement;
