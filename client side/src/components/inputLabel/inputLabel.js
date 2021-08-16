import { useState } from 'react';

import './inputLabel.css';
function InputLabel(props) {
  const { type, name, id, onChange, validCheck } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  function validate() {
    let isValid = validCheck();
    if (isValid === "") {
      setErrorMessage(null);
    }
    else {
      setErrorMessage(`${isValid}`)
    }
  }

  return (
    <div>
      <br />
      <input className="inputNameEmailPhone" type={type} placeholder={name}
        onChange={(event) => onChange(id, event)} onBlur={validate} ></input>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

export default InputLabel;