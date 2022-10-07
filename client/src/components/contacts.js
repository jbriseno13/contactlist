import { useState, useEffect } from "react";
import Form from "./form";
import EditForm from "./editform";

function Contacts() {
  
  // this is my original state with an array of students 
  const [contacts, setContacts] = useState([]);
  const [editedContacts, setEditedContacts] = useState(null);

  // New State to contro the existing student Id that the user wants to edit

  
  useEffect(() => {
    fetch("http://localhost:8080/api/contacts")
      .then((response) => response.json())
      .then((contacts) => {
            setContacts(contacts);
          });
  }, []);

  const updateContacts = (existingContacts) => {
    return fetch(`http://localhost:8080/api/contacts/${existingContacts.id}`, {
      method:'PUT',
      headers: {'Content-Type' : 'applicationContact'},
      body: JSON.stringify(existingContacts)
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("From put request", data);
      setContacts(data);
      setEditedContacts(null);
    });
  }


  const addContacts = (newContacts) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    setContacts((contacts) => [...contacts, newContacts]);
  };

  //A function to control the update in the parent (student component)


  return (
    <div className="contacts">
      
      <ul>
      {editedContacts ? <EditForm onUpdate={updateContacts} editedContacts={editedContacts} />: null}
        {contacts.map((cont) => 
        {
          
          
          
          
          // return(
          // <li key={cont.id} className="cont-cards">
            
          //   {/* <img className="image-size" src={spec.image}></img> */}
          //   {" "}
          //   Population: {spec.population} Nickname:{spec.common_name} Scientific Name:{spec.scientific_name} Status:{spec.conservation_status}  
          // </li>
          // )
          })}
      </ul>
      
      <Form addContacts={addContacts} />
    </div>
  );
}

export default Contacts;
