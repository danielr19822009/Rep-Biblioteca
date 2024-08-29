import React from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu'; // Asegúrate de que el camino sea correcto
import Libros from './Libros'; // Asegúrate de que estos componentes existen
import Autores from './Autores';
import Editoriales from './Editoriales';

function App() {
  return (
    <Router>
      <Menu />
      
      <div className="container-fluid">
      
      <h1 id="tituloprin">Biblio`Cloud SM</h1>
        <Routes>
        
          <Route path="/libros" element={<Libros />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/editoriales" element={<Editoriales />} />
          <Route path="/" element={<h1>Bienvenido a la aplicación</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
