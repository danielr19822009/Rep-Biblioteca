import React, { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";

// Componente para la gestión de libros
const Editorial = () => {

  const [editoriales, setEditoriales] = useState([]);
  const [nombreEditorial, setNombreEditorial] = useState([]);
  const [direEditorial, setDireEditorial] = useState([]);
  const [teleEditorial, setTeleEditorial] = useState([]);


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

  // Function to add editorial
  const addEditoriales = () => {
    if (nombreEditorial === "" || direEditorial === "" || teleEditorial === "") {
      Swal.fire({
        icon: "danger",
        title: "Errrado",
        text: `campos vacios`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Registrado",
        html: `<strong>${nombreEditorial}</strong>, Registrado`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Axios.post("http://localhost:3001/add_editoriales", {
        nombreEditorial,
        direEditorial,
        teleEditorial,

      }).then(() => {
        getEditoriales();
      })
        .catch((error) => {
          console.error("Hubo un error al registrar:", error);
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  useEffect(() => {
    getEditoriales();
  }, []);


  return (
    <div>
      <div className="row mt-5">
        {/* Formulario para Editorial */}
        <div className="col-lg-4 col-md-12 mb-2">
          <div className="card">
            <div className="card-body">
              <form >
                <div className="form-group">
                  <h2>EDITORIAL</h2>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Editorial</span>
                  <input
                    id="editorial"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) => setNombreEditorial(event.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Dirección Editorial</span>
                  <input
                    name="direccion"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Teléfono Editorial</span>
                  <input
                    name="telefono"
                    type="text"
                    className="form-control"
                  />
                </div>

              </form>
              <button type="submit" className="btn btn-block btn-primary"
                onClick={addEditoriales}>Registrar</button>
            </div>
          </div>
        </div>


      </div>

      <hr />
      <div className="row mt-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Editorial</th>
              <th scope="col">Direccion</th>
              <th scope="col">telefono</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {editoriales.map((editorial) => (
              <tr key={editorial.editorialId}>
                <td>{editorial.editorialId}</td>
                <td>{editorial.nombreEditorial}</td>
                <td>{editorial.direccioEditorial}</td>
                <td>{editorial.telefonoEditorial}</td>

                <td className="opciones">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
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
                    placeholder="Nombre del libro"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="autorE"
                  >
                    {editoriales.map((autor) => (
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
                    placeholder="Cantidad"
                    required
                  />
                </div>
                <input type="hidden" id="idnes" value={editoriales?.editorialId || ''} />
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

export default Editorial;
