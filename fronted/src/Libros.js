import React from 'react'
import './App.css';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";

const LibraryManagement = () => {
  return (
    <div>
      <div className="row mt-5">
        <div className="col-lg-4 col-md-12 mb-2">
          <div className="card">
            <div className="card-body">
              <form method="POST" id="reg-editorial">
                <div className="form-group">
                  <h2>EDITORIAL</h2>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" id="editorialNombre" placeholder="Nombre editorial" required />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Registrar</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-2">
          <div className="card">
            <div className="card-body">
              <form method="POST" id="reg-autores">
                <div className="form-group">
                  <h2>AUTORES</h2>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" id="autoresNombre" placeholder="Nombre autor" required />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Registrar</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-2">
          <div className="card">
            <div className="card-body">
              <form method="POST" id="reg-lib">
                <div className="form-group">
                  <h2>Libro</h2>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" id="libro" placeholder="Nombre del libro" required />
                </div>
                <div className="form-group">
                  <select className="form-control" id="autorL">
                    <option value="1">Autor</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" id="editorialL">
                    <option value="1">Editorial</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" id="edicionL">
                    {/* Options will be populated dynamically */}
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" id="cantidadL">
                    {/* Options will be populated dynamically */}
                  </select>
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
              <th scope="col">Edición</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody id="libros">
            {/* Table rows will be populated dynamically */}
          </tbody>
        </table>
      </div>

      {/* Modal for editing */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">EDITAR PRODUCTO</h5>
            </div>
            <div className="modal-body">
              <form method="POST" id="edit-lib">
                <div className="form-group">
                  <input type="text" className="form-control" id="libroE" placeholder="Nombre del libro" required />
                </div>
                <div className="form-group">
                  <select className="form-control" id="autorE">
                    {/* Options will be populated dynamically */}
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" id="editorialE">
                    {/* Options will be populated dynamically */}
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" id="edicionE">
                    {/* Options will be populated dynamically */}
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" id="cantidadE">
                    {/* Options will be populated dynamically */}
                  </select>
                </div>
                <input type="hidden" id="idnes" value="" />
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="cerrador">Close</button>
                  <button type="submit" className="btn btn-primary">Editar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryManagement;
