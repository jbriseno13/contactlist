import { useState, useEffect } from "react";

// passing in the contact you're editing, two callback functions (one for all the contacts, and one for the edited contact)
const EditForm = (props) => {
  const [editedContact, setEditedContact] = useState({
    id: props.editedContact.id,
    name: props.editedContact.name,
    m_phone_number: props.editedContact.m_phone_number,
    h_phone_number: props.editedContact.h_phone_number,
    email: props.editedContact.email,
    notes: props.editedContact.notes,
  });

  useEffect(() => {
    console.log(editedContact);
    // if(props.editedContact){setEditedContact(props.editedContact)}}
  }, []);

  //create functions that handle the event of the user typing into the form
  const handleNameChange = (event) => {
    const newContactName = event.target.value;
    setEditedContact((contact) => ({ ...contact, name: newContactName }));
  };

  // const handleEmailChange = (event) => {
  //   const newContactName = event.target.value;
  //   setEditedContact((contact) => ({ ...contact, name: newContactName }));
  // };

  const updateContact = (existingContacts) => {
    console.log(existingContacts);
    return fetch(`http://localhost:8080/api/contacts/${existingContacts.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingContacts),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From put request", data);
        // props.setContacts(data);
        props.setEditedContact(null);
        props.getContacts();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inside edit Form", editedContact);
    updateContact(editedContact);
    // props.setEditedContact(null); //sends back to form
  };

  return (
    <tr>
      <td>{editedContact.id}</td>
      <td>
        {/* <form onSubmit={handleSubmit}> */}
        
        <input
          type="text"
          placeholder="Contact Name"
          require
          defaultValue={editedContact.name}
          onChange={(e) => {
            setEditedContact((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </td>

      <td>
        <input
          type="text"
          id="add-mobile-number"
          placeholder="mobile"
          required
          defaultValue={editedContact.m_phone_number}
          onChange={(e) => {
            setEditedContact((prev) => ({
              ...prev,
              m_phone_number: e.target.value,
            }));
          }}
        />
      </td>

      <td>
        <input
          type="text"
          id="add-home-number"
          placeholder="home"
          required
          defaultValue={editedContact.h_phone_number}
          onChange={(e) => {
            setEditedContact((prev) => ({
              ...prev,
              h_phone_number: e.target.value,
            }));
          }}
        />
      </td>

      <td>
        <input
          type="email"
          id="add-contact-email"
          placeholder="email"
          required
          value={editedContact.email}
          onChange={(e) => {
            setEditedContact((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
      </td>

      <td>
        <input
          type="text"
          id="notes"
          placeholder="notes"
          required
          value={editedContact.notes}
          onChange={(e) => {
            setEditedContact((prev) => ({ ...prev, notes: e.target.value }));
          }}
        />
      </td>
      <td>
        <button className="submit" onClick={handleSubmit}type="submit">
          Save
        </button>
      </td>
    </tr>
  );
};

export default EditForm;
