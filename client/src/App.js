import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import './Style.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} exact />
          <Route path="/add" element={<Add />} exact />
          <Route path="/update/:id" element={<Update />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
