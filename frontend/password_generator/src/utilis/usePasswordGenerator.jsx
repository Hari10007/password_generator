import { useState } from "react";

const usePasswordGenerator = (checkboxData, passwordLength) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [strength, setStrength] = useState("");

  const handleGeneratePassword = () => {
    let generatedPassword = "",
      charSet = "";
    let selectedCheckbox = checkboxData.filter((item) => item.checked);

    if (selectedCheckbox.length === 0) {
      setErrorMessage("Please select any one checkbox.");
      setStrength("");
      setPassword("");
      return;
    }
    setErrorMessage("");

    selectedCheckbox.map((data) => {
      if (data.name === "Include Uppercase") {
        charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      } else if (data.name === "Include Lowercase") {
        charSet += "abcdefghijklmnopqrstuvwxyz";
      } else if (data.name === "Include Symbols") {
        charSet += "!@#$%^&*?";
      } else if (data.name === "Include Numbers") {
        charSet += "0987654321";
      }
    });

    for (var i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }
    let passwordStrength = "";
    if (passwordLength < 4) {
      passwordStrength = "Poor";
    } else if (passwordLength < 8) {
      passwordStrength = "Weak";
    } else if (passwordLength < 10) {
      passwordStrength = "Medium";
    } else if (passwordLength < 15) {
      passwordStrength = "Good";
    } else if (passwordLength <= 20) {
      passwordStrength = "Strong";
    }
    setStrength(passwordStrength);
    setPassword(generatedPassword);
  };
  return { password, errorMessage, strength, handleGeneratePassword };
};

export default usePasswordGenerator;
