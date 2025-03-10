import React, {useState} from "react";
import "./ProspectForm.css";
import Save from "../assets/save.svg";

const ProspectForm = ({ onAddProspect, onCancel }) =>{
  //Un objet qui contient tout les types d'information des prospects  
  const [newProspect, setNewProspect]=useState({
        type: "",
        origine_du_lead: "",
        mois: "",
        annee_du_contact: "",
        nom: "",
        prenom: "",
        email: "",
        tel: "",
        niveau_actuel: "",
        diplome_prepare: "",
        specialite: "",
        etablissement: "",
        code_postale: "",
        ville: "",
        annee_de_recrutement: "",
        entree_en: "",
      });

      //Traitement des données d'entrée lorsque des modifications se produisent
      const handleChange = (e) => {
        setNewProspect({ ...newProspect, [e.target.name]: e.target.value });
      };
      //Vérification des champs remplis, ajout d'un nouveau prospectus et effacement du formulaire
      const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(newProspect).some(value => value === "")) {
          alert("Veuillez remplir tous les champs !");
          return;
        }
        onAddProspect(newProspect);
        setNewProspect({ type: "", origine_du_lead: "", mois: "", annee_du_contact: "", nom: "", prenom: "", email: "", tel: "",
          niveau_actuel: "", diplome_prepare: "", specialite: "", etablissement: "", code_postale: "", ville: "", annee_de_recrutement: "",
          entree_en: "" });
      };

      return(
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Ajouter un Prospect</h3>
          <input type="text" name="type" placeholder="Type" value={newProspect.type} onChange={handleChange} />
          <input type="text" name="origine_du_lead" placeholder="Origine" value={newProspect.origine_du_lead} onChange={handleChange} />
          <input type="text" name="mois" placeholder="Mois" value={newProspect.mois} onChange={handleChange} />
          <input type="number" name="annee_du_contact" placeholder="Année du contact" value={newProspect.annee_du_contact} onChange={handleChange}/>
          <input type="text" name="nom" placeholder="Nom" value={newProspect.nom} onChange={handleChange} />
          <input type="text" name="prenom" placeholder="Prenom" value={newProspect.prenom} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={newProspect.email} onChange={handleChange} />
          <input type="tel" name="tel" placeholder="Téléphone" value={newProspect.tel} onChange={handleChange} />
          <input type="text" name="niveau_actuel" placeholder="Niveau actuel" value={newProspect.niveau_actuel} onChange={handleChange} />
          <input type="text" name="diplome_prepare" placeholder="Diplome" value={newProspect.diplome_prepare} onChange={handleChange} />
          <input type="text" name="specialite" placeholder="Spécialité" value={newProspect.specialite} onChange={handleChange} />
          <input type="text" name="etablissement" placeholder="Établissement" value={newProspect.etablissement} onChange={handleChange} />
          <input type="number" name="code_postale" placeholder="Code postal" value={newProspect.code_postale} onChange={handleChange} />
          <input type="text" name="ville" placeholder="Ville" value={newProspect.ville} onChange={handleChange} />
          <input type="number" name="annee_de_recrutement" placeholder="Année de recrutement" value={newProspect.annee_de_recrutement} onChange={handleChange}/>
          <input type="text" name="entree_en" placeholder="Filière" value={newProspect.entree_en} onChange={handleChange} />
          <button className="save-btn" type="submit">
          <img src={Save} alt="Enregistrer" width="17" height="17"/> Enregistrer</button>
          <button className="cancel-btn" onClick={onCancel}>❌ Annuler</button>
        </form>
      );
};

export default ProspectForm;