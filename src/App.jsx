import { useState, useEffect } from "react";
import axios from "axios";
import ProspectsList from "./components/ProspectsList.jsx";
import ProspectForm from "./components/ProspectForm.jsx";
import "./App.css";

function App() {
  return (
    <div className="SystemTitle">
      <h1>CRM - Gestion des prospects</h1>
      <ProspectsList />
    </div>
  );
}

export default App;