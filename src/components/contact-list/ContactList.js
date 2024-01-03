import { Component } from 'react';

class ContactList extends Component {
  handleDelete = id => {
    this.props.onDelete(id);
  };

  render() {
    const { contacts } = this.props;
    return (
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}
            <button type="button" onClick={() => this.handleDelete(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ContactList;
