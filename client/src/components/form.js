import { useState } from "react";
import { useEffect } from "react";
import EditForm from "./editform";

const Form = (props) => {
  const [contacts, setContacts] = useState([]);
  const [editedContact, setEditedContact] = useState(null);
  // const [editMode, setEditMode] = useState(false);

  const [newContacts, setNewContacts] = useState({
    id: "",
    name: "",
    m_phone_number: "",
    h_phone_number: "",
    email: "",
    notes: "",
  });

  const set = (m_phone_number) => {
    return ({ target: { value } }) => {
      setNewContacts((originalValues) => ({
        ...originalValues,
        [m_phone_number]: value,
      }));
    };
  };

  // const postContacts = (newContacts) => {
  //   return fetch("http://localhost:8080/api/contacts", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newContacts),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("From the post ", data);
  //       props.addContacts(data);
  //     });
  // };

  const getContacts = async () => {
    const response = await fetch("http://localhost:8080/api/contacts");
    const contacts = await response.json();
    setContacts(contacts);
  };

  useEffect(() => {
    getContacts();
  }, []);

  //A function to handle the post request

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addedContacts = {
      id: newContacts.id,
      name: newContacts.name,
      m_phone_number: newContacts.m_phone_number,
      h_phone_number: newContacts.h_phone_number,
      email: newContacts.email,
      notes: newContacts.notes,
    };

    const response = await fetch("http://localhost:8080/api/contacts", {
      method: "POST",
      headers: {
        Accpect: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedContacts),
    });
    const content = await response.json();

    setContacts([...contacts, content]);
    setNewContacts({
      id: "",
      name: "",
      m_phone_number: "",
      h_phone_number: "",
      email: "",
      notes: "",
    });
  };

  const handleDeleteContacts = async (deleteContacts) => {
    let response = await fetch(
      `http://localhost:8080/api/contacts/${deleteContacts}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(contacts),
      }
    );
    await response.json();
    const deleteContactsFunction = contacts.filter(
      (i) => i.id !== deleteContacts
    );
    console.log(deleteContactsFunction);
    setContacts(deleteContactsFunction);
  };

  return (
    <section className="maping-section">
      <h2>Contact List</h2>
      <table id="contact-list-table">
        <thead>
          <tr>
            {/* <th>Contact</th> */}
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Home</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <ul id="sightings-list"> */}
          {/* display all existing Users here */}
          {/* {editMode ? (
            <EditForm
              editedContact={editedContact}
              setContacts={setContacts}
              setEditedContact={setEditedContact}
            />
          ) : ( */}
          {contacts.map((contact, index) => {
            if (editedContact === contact) {
              return (
                <EditForm
                  key={index}
                  editedContact={editedContact}
                  setContacts={setContacts}
                  setEditedContact={setEditedContact}
                  getContacts={getContacts}
                  // setEditMode={setEditMode}
                />
              );
            } else {
              return (
                <tr key={index}>
                  <td>{contact.id} </td>
                  <td>{contact.name}</td>
                  <td>{contact.m_phone_number} </td>
                  <td>{contact.h_phone_number}</td>
                  <td>{contact.email}</td>
                  <td>{contact.notes}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditedContact(contact);
                        // setEditMode(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="contacts-dlt-btn"
                      onClick={() => handleDeleteContacts(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
          })}
          {/* )} */}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div id="form-card">
          <fieldset>
            {/* <label>id</label>
            <input
              type="integer"
              id="add-contact-id"
              // placeholder="First Name"
              // required
              value={newContacts.id}
              onChange={set("id")}
            /> */}
            <br />
            <label>Name</label>
            <input
              type="text"
              id="add-contact-name"
              // placeholder="First Name"
              // required
              value={newContacts.name}
              onChange={set("name")}
            />
            <br />
            <label>Mobile</label>
            <input
              type="text"
              id="add-mobile-number"
              placeholder="mobile"
              required
              value={newContacts.m_phone_number}
              onChange={set("m_phone_number")}
            />
            <br />
            <label>Home</label>
            <input
              type="text"
              id="add-home-number"
              placeholder="home"
              required
              value={newContacts.h_phone_number}
              onChange={set("h_phone_number")}
            />
            <br />
            {/* <label>Id</label>
                <input
                  type="number"
                  id="add-individual-id"
                  placeholder="ID"
                  required
                  value={newSighting.individual_id}
                  onChange={set("individual_id")}
                />
                <br /> */}
            <label>Email</label>
            <input
              type="email"
              id="add-contact-email"
              placeholder="email"
              required
              value={newContacts.email}
              onChange={set("email")}
            />
            <br />
            <label>Notes</label>
            <input
              type="text"
              id="notes"
              placeholder="notes"
              required
              value={newContacts.notes}
              onChange={set("notes")}
            />
          </fieldset>
        </div>
        <button className="add-contact-btn" type="submit">
          Add
        </button>
      </form>
    </section>
  );
};

export default Form;
