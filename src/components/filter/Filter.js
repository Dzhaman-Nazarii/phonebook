const Filter = ({ onSearch }) => {
  const handleSeacrh = evt => {
    onSearch(evt.target.value);
  };

  return (
    <label>
      Find contacts by name
      <input name="search" placeholder="Search..." onChange={handleSeacrh} />
    </label>
  );
};

export default Filter;
