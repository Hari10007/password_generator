const Checkbox = ({ handleChange, name, customClass }) => {
    return (
      <div className={customClass}>
        <input type="checkbox" onChange={handleChange} />
        <label>{name}</label>
      </div>
    );
  };
  
  export default Checkbox;
  