import { nanoid } from "nanoid"
import { Component } from "react"
import ContactForm from "components/contact-form/ContactForm";
import Filter from "components/filter/Filter";
import ContactList from "components/contact-list/ContactList";

class App extends Component {
  
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  addContact = (data) => {
    const { contacts } = this.state;
    const existingContact = contacts.find((contact) => contact.name.toLowerCase() === data.name.toLowerCase());
    if (existingContact) {
      alert(`${data.name} is already in contacts.`)
    } else {
      const newContact = {
        id: nanoid(),
        name: data.name,
        number: data.number
      }
      this.setState({contacts: [...contacts, newContact]})
    }
  }

  onSearch = (filter) => {
    this.setState({filter});
  }

  getContactsBySearch = () => {
    const { contacts, filter } = this.state
    const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter));
    return filteredContacts
  }

  onDelete = (id) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    this.setState({ contacts: updatedContacts })
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onSearch={this.onSearch} />
        <ContactList contacts={this.getContactsBySearch()} onDelete={this.onDelete} />
      </div>
  );
  }
};

export default App