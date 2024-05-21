import { useState } from "react";
import Image from "../img/logo.png";
import "./styles.css";

const ValidateCPF = () => {
  const [cpf, setCpf] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setCpf(maskCPF(event.target.value));
  };

  const handleValidate = () => {
    const isValidCPF = validateCPF(cpf);
    setResult("Validando...");

    setTimeout(() => {
      setResult(isValidCPF ? "CPF Válido!" : "CPF Inválido!");
    }, 3000);

    setTimeout(() => {
      setResult("");
    }, 5500);

    setCpf("");
  };

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <div className="container">
      <header>
        <img src={Image} alt="Logo do validador de CPF." />
      </header>
      <main>
        <label htmlFor="cpfInput">
          Olá, digite o número de CPF e clique no botão para{" "}
          <strong>validar</strong>. &#x1F60A;
        </label>
        <input
          type="text"
          id="cpfInput"
          value={cpf}
          onChange={handleInputChange}
          placeholder="Digite o CPF (apenas números)"
        />
        <button onClick={handleValidate}>Validar</button>
        <p className="result">{result}</p>
      </main>
    </div>
  );
};

function validateCPF(cpf) {
  // remove caracteres que não sejam um digito do cpf
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // calcula o primeiro dígito
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let checkDigit1 = remainder === 10 || remainder === 11 ? 0 : remainder;

  // verifica o primeiro dígito
  if (checkDigit1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let checkDigit2 = remainder === 10 || remainder === 11 ? 0 : remainder;

  // verifica o segundo dígito verificador
  if (checkDigit2 !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

export default ValidateCPF;