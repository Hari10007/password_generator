import React, { useState } from 'react'
import "../../pages/css/Home.css"


import Button from './Button';
import usePasswordGenerator from '../../utilis/usePasswordGenerator';
import Checkbox from './Checkbox';
import useAxios from '../../utilis/useAxios';


function PasswordGenerator({handlePasswordUpdate}) {
  const [passwordLength, setPasswordLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const api = useAxios();

  const [checkboxData, setCheckboxData] = useState([
    { name: "Include Uppercase", checked: false },
    { name: "Include Lowercase", checked: false },
    { name: "Include Symbols", checked: false },
    { name: "Include Numbers", checked: false }
  ]);

  const handleCheckbox = (i) => {
    let updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].checked = !updatedCheckboxData[i].checked;
    setCheckboxData(updatedCheckboxData);
  };

  const {
    password,
    errorMessage,
    strength,
    handleGeneratePassword
  } = usePasswordGenerator(checkboxData, passwordLength);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const handleSavePassword = async () => {
    const response = await api.post('password_generator/save', {'password':password});

    if (response.status === 200) {
      handlePasswordUpdate();
      console.log(response.data)
    }
};

  return (
    <div className="password_generator">
      {password && (
        <div className="header">
          <div className="password">{password}</div>
          <Button
            text={copied ? "Copied" : "Copy"}
            onclick={handleCopy}
            customClass="copyBtn"
          />
        </div>
      )}
      <div className="charLengthContainer">
        <div className="charLength">
          <span>Character Length</span>
          <span>{passwordLength}</span>
        </div>
        <input
          type="range"
          className="charLengthInput"
          min="4"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>

      <div className="checkboxes">
        {checkboxData.length > 0 &&
          checkboxData.map((item, index) => (
            <Checkbox
              name={item.name}
              customClass="checkboxItem"
              key={index}
              handleChange={() => handleCheckbox(index)}
            />
          ))}
      </div>

      {errorMessage && <div className="error">{errorMessage}</div>}

      {strength && (
        <div className="strength">
          <span>Strength</span>
          <span>{strength}</span>
        </div>
      )}

      <button
        className="generatePassBtn"
        onClick={() => handleGeneratePassword()}
      >
        Generate Password Button
      </button>
        
    {password &&
      <button
      className="generatePassBtn my-3"
      onClick={() => handleSavePassword()}
      >
        Save
      </button>
    }
    </div>
  );
}

export default PasswordGenerator
