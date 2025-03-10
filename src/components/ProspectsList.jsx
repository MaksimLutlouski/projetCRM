//Les modules importés pour la liste des prospects
import React, {useState, useEffect} from "react";     // React et ses hooks pour gérer l'état et les effets
import "./ProspectsList.css";                         // Fichier CSS pour le style du composant
import ProspectForm from "./ProspectForm.jsx"         // Composant du formulaire pour ajouter un prospect
import axios from "axios";                            // Bibliothèque pour faire des requêtes HTTP vers l'API
import Edit from "../assets/edit-2.svg";
import Delete from "../assets/trash.svg";
import Save from "../assets/save.svg";

//Fonction flèche
const ProspectsList = () => {
  //Les états initiaux pour tous les éléments et les fonctions pour changer leurs états
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedCity, setSelectedCity] = useState(""); 
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRecrutYear, setSelectedRecrutYear] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [editProspect, setEditProspect]=useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState({});
  const [showComments, setShowComments]=useState(null);
  const [newComment, setNewComment]=useState("");
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [prospects, setProspects] = useState([]);
    
    //Requeté pour le serveur pour récupérer la liste des prospects
    useEffect(()=>{
      axios.get("/api/prospects").then(response=>setProspects(response.data)).catch(
        error=>console.error("Erreur lors du chargement des prospects", error)
      );
    },[]);

  // Les fonctions de filtrage : filtrer la liste des prospects selon le choix d'utilisateur
  const filteredProspects = prospects.filter((prospect) => {
    return (
      prospect.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === "" || prospect.type === selectedType) &&
      (selectedCity === "" || prospect.ville === selectedCity) &&
      (selectedYear === "" || String(prospect.annee_du_contact) === selectedYear)&&
      (selectedRecrutYear === "" || String(prospect.annee_de_recrutement) === selectedRecrutYear)&&
      (selectedFiliere === "" || prospect.entree_en === selectedFiliere)
    );
  });

  // Obtenir des valeurs uniques pour les filtres
  const uniqueTypes = [...new Set(prospects.map((p) => p.type))];
  const uniqueCities = [...new Set(prospects.map((p) => p.ville))];
  const uniqueYears = [...new Set(prospects.map((p) => String(p.annee_du_contact)))];
  const uniqueRecrutYear = [...new Set(prospects.map((p) => String(p.annee_de_recrutement)))];
  const uniqueFiliere = [...new Set(prospects.map((p) => p.entree_en))];

  // Fonction qui fait la requête sur le serveur pour supprimer le prospect du list
  const handleDelete = (id) => {
    axios.delete(`/api/prospects/${id}`).then(()=>{
      setProspects(prospects.filter(prospect => prospect.id !== id));
    }).catch(error=>console.error("Erreur lors de la suppression du prospect", error));
  };

  // Fonction pour sauvegarder les données du prospect édité et ouvrir une fenêtre modale
  const handleEdit = (prospect) =>{
    setEditProspect({...prospect});
    setShowModalEdit(true);
  };

  // Fonction pour envoyer PUT requete sur le serveur et sauvegarder les modifications 
  const handleSave = () =>{
    axios.put(`/api/prospects/${editProspect.id}`, editProspect).then(()=>{
       setProspects(prospects.map((p) => (p.id === editProspect.id ? editProspect : p)));
       setShowModalEdit(null);
    }).catch(error=>console.error("Erreur lors de la modification du prospect", error));
  };

  // Fonction pour envoyer POST requête sur le serveur, en envoyant un nouveau prospect et le sauvegarde dans une list
  const handleAddProspect = (newProspect) => {
    axios.post("/api/prospects", newProspect).then(response=>{
      setProspects(prev=>[...prev, response.data]);
      setShowModal(false);
    }).catch(error=>console.error("Erreur lors de l'ajout du prospect", error));
  };

  //Tout les methodes concernant des commentaires des prospects
  //Requeté pour le serveur pour récupérer les commentaires des prospects
  const fetchComments = (idProspect) =>{
    axios.get(`/api/comments/${idProspect}`).then(response=>setComments(prev=>({ ...prev, [idProspect]: response.data})))
    .catch(error=>console.error("Erreur chargement commentaires", error));
  };

  //Methode pour afficher les commentaires
  const handleShowComments = (idProspect) => {
    if(showComments===idProspect){
      setShowComments(null);
    }
    else{
      fetchComments(idProspect);
      setShowComments(idProspect);
    }
  };

  //Methode pour ajouter le commentaire pour le prospect
  const handleAddComment = (idProspect) => {
    if(!newComment.trim()) return;
    axios.post("/api/comments", {idProspect, commentaire: newComment})
    .then(response=>{setComments(prev=>({...prev, [idProspect]: [...(prev[idProspect] || []), response.data]}));
    setNewComment("");})
    .catch(error => console.error("Erreur ajout commentaire", error));
  };

  //Methode pour supprimer le commentaire du prospect
  const handleDeleteComment = (id) => {
    axios.delete(`/api/comments/${id}`).then(() => {
        setComments(prev => ({
          ...prev,
          [showComments]: prev[showComments].filter(comment => comment.id !== id)
        }));
      }).catch(error => console.error("Erreur suppression commentaire", error));
  };

  //Balisage de page HTML avec code JS
  //Fenêtre modale d'édition des prospectus avec tous les champs nécessaires et boutons pour enregistrer ou fermer
  //Une balise <input> pour faire le recherche par le nom d'utilisateur
  //Tous les cinq filtres pour la list des prospects
  //Un bouton pour ouvrir la fenêtre modale qui contient tous les champs et les boutons pour ajouter un nouveau prospect 
  //Un tableau qui contient toute la list des prospects et les boutons pour modifier, supprimer ou commenter les prospects
  return (
    <div className="Prospects-container">
      <h2>Liste des prospects</h2>
      
      {showModalEdit && (
        <div className="modal-overlay" onClick={()=>setShowModalEdit(false)}>
         <div className="modal-content edit-form" onClick={(e) => e.stopPropagation()}>
          <h3>Modifier un Prospect</h3>
          <input
            type="text"
            value={editProspect.type}
            onChange={(e) => setEditProspect({ ...editProspect, type: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.origine_du_lead}
            onChange={(e) => setEditProspect({ ...editProspect, origine_du_lead: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.mois}
            onChange={(e) => setEditProspect({ ...editProspect, mois: e.target.value })}
          />
          <input
            type="number"
            value={editProspect.annee_du_contact}
            onChange={(e) => setEditProspect({ ...editProspect, annee_du_contact: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.nom}
            onChange={(e) => setEditProspect({ ...editProspect, nom: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.prenom}
            onChange={(e) => setEditProspect({ ...editProspect, prenom: e.target.value })}
          />
          <input
            type="email"
            value={editProspect.email}
            onChange={(e) => setEditProspect({ ...editProspect, email: e.target.value })}
          />
          <input
            type="tel"
            value={editProspect.tel}
            onChange={(e) => setEditProspect({ ...editProspect, tel: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.niveau_actuel}
            onChange={(e) => setEditProspect({ ...editProspect, niveau_actuel: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.diplome_prepare}
            onChange={(e) => setEditProspect({ ...editProspect, diplome_prepare: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.specialite}
            onChange={(e) => setEditProspect({ ...editProspect, specialite: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.etablissement}
            onChange={(e) => setEditProspect({ ...editProspect, etablissement: e.target.value })}
          />
          <input
            type="number"
            value={editProspect.code_postale}
            onChange={(e) => setEditProspect({ ...editProspect, code_postale: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.ville}
            onChange={(e) => setEditProspect({ ...editProspect, ville: e.target.value })}
          />
          <input
            type="number"
            value={editProspect.annee_de_recrutement}
            onChange={(e) => setEditProspect({ ...editProspect, annee_de_recrutement: e.target.value })}
          />
          <input
            type="text"
            value={editProspect.entree_en}
            onChange={(e) => setEditProspect({ ...editProspect, entree_en: e.target.value })}
          />
          <button className="save-btn" onClick={handleSave}>
            <img src={Save} alt="Enregistrer" width="17" height="17"/> Enregistrer</button>
          <button className="cancel-btn" onClick={() => setShowModalEdit(false)}>❌ Annuler</button>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Rechercher par Nom..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <select value={selectedType} onChange={(e)=>setSelectedType(e.target.value)}>
        <option value="">Tous les types</option>
        {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">Tous les villes</option>
        {uniqueCities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Toutes les années de contact</option>
        {uniqueYears.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <select value={selectedRecrutYear} onChange={(e) => setSelectedRecrutYear(e.target.value)}>
        <option value="">Toutes les années de recrutement</option>
        {uniqueRecrutYear.map((year)=>(
            <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <select value={selectedFiliere} onChange={(e)=>setSelectedFiliere(e.target.value)}>
        <option value="">Toutes les filieres</option>
        {uniqueFiliere.map((entree_en)=>(
            <option key={entree_en} value={entree_en}>{entree_en}</option>
        ))}
      </select>

      <button className="add-btn" onClick={() => setShowModal(true)}>➕ Ajouter un prospect</button>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProspectForm onAddProspect={handleAddProspect} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {showComments!==null && (
          <div className="modal-overlay" onClick={() => setShowComments(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Commentaires pour {prospects.find(p => p.id === showComments)?.nom}</h3>
              <ul>
              {comments[showComments]?.length > 0 ? (
                comments[showComments].map((comment) => (
                  <li key={comment.id}>
                    {comment.commentaire}
                    <button onClick={() => handleDeleteComment(comment.id)}>🗑️</button>
                  </li>
                ))
              ) : (
                <li>Aucun commentaire</li>
              )}
            </ul>
            <div className="comments-form">
             <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
            />
            <button onClick={() => handleAddComment(showComments)}>
            <img src={Save} alt="Enregistrer" width="20" height="20"/> Ajouter</button>
            <button onClick={() => setShowComments(null)}>❌ Fermer</button>
            </div>
           </div>
          </div>
        )
      }
      <table className="Prospects-table">
        <thead>
            <tr>
            <th>Type</th>
            <th>Origine</th>
            <th>Mois</th>
            <th>Année</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Niveau actuel</th>
            <th>Diplôme préparé</th>
            <th>Spécialité</th>
            <th>Établissement</th>
            <th>Code Postal</th>
            <th>Ville</th>
            <th>Année recrutement</th>
            <th>Entrée en</th>
            <th>Modifier</th>
            <th>Supprimer</th>
            <th>Commenter</th>
            </tr>
        </thead>
        <tbody>
        {filteredProspects.length > 0 ? (
              filteredProspects.map((prospect) => (
                <tr key={prospect.id}>
                  <td>{prospect.type}</td>
                  <td>{prospect.origine_du_lead}</td>
                  <td>{prospect.mois}</td>
                  <td>{prospect.annee_du_contact}</td>
                  <td>{prospect.nom}</td>
                  <td>{prospect.prenom}</td>
                  <td>{prospect.email}</td>
                  <td>{prospect.tel}</td>
                  <td>{prospect.niveau_actuel}</td>
                  <td>{prospect.diplome_prepare}</td>
                  <td>{prospect.specialite}</td>
                  <td>{prospect.etablissement}</td>
                  <td>{prospect.code_postale}</td>
                  <td>{prospect.ville}</td>
                  <td>{prospect.annee_de_recrutement}</td>
                  <td>{prospect.entree_en}</td>
                  <td>
                    <button className="Modifier" onClick={()=>handleEdit(prospect)}>
                    <img src={Edit} alt="Modifier" width="17" height="17"/> Modifier</button>
                  </td>
                  <td>
                    <button className="Supprimer" onClick={()=>handleDelete(prospect.id)}>
                    <img src={Delete} alt="Supprimer" width="17" height="17"/> Supprimer</button>
                  </td>
                  <td>
                    <button className="AfficherComments" onClick={()=>handleShowComments(prospect.id)}>
                    {showComments === prospect.id ? "❌ Cacher" : "💬 Commentaire"}</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="17">Aucun prospect trouvé</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default ProspectsList;