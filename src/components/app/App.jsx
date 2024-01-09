import { nanoid } from "nanoid"
import { useState, useEffect } from "react"
import ContactForm from "components/contact-form/ContactForm";
import Filter from "components/filter/Filter";
import ContactList from "components/contact-list/ContactList";

const App = () => {

  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const addContact = (data) => {
    const existingContact = contacts.find((contact) => contact.name.toLowerCase() === data.name.toLowerCase());
    if (existingContact) {
      alert(`${data.name} is already in contacts.`)
    } else {
      const newContact = {
        id: nanoid(),
        name: data.name,
        number: data.number
      }
      setContacts( [...contacts, newContact])
    }
  }

  const onSearch = (filter) => {
    setFilter(filter);
  }

  const getContactsBySearch = () => {
    const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter));
    return filteredContacts
  }

  const onDelete = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts)
  }

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter onSearch={onSearch} />
        <ContactList contacts={getContactsBySearch()} onDelete={onDelete} />
      </div>
  );
};

export default App