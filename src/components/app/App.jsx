import { nanoid } from "nanoid"
import { Component } from "react"
import ContactForm from "components/contact-form/ContactForm";
import Filter from "components/filter/Filter";
import ContactList from "components/contact-list/ContactList";

class App extends Component {
  
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'))
    this.setState({contacts:parsedContacts || []})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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