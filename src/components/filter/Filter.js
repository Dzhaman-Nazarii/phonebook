import { Component } from 'react';

class Filter extends Component {
  handleSeacrh = evt => {
    this.props.onSearch(evt.target.value);
  };

  render() {
    return (
      <label>
        Find contacts by name
        <input
          name="search"
          placeholder="Search..."
          onChange={this.handleSeacrh}
        />
      </label>
    );
  }
}

export default Filter;
