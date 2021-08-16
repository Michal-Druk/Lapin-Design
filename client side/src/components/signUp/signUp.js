import { useState } from 'react';
import InputLabel from '../inputLabel/inputLabel'
import './signUp.css';
import ModalCard from '../modal/modal'

import {
  validateID,
  validateName,
  validateEmail,
  validatePassword,
  Password
}
  from '../validation/validation'

function SignUp() {

  const [state, setState] = useState({
    ID: "",
    Name: "",
    Email: "",
    Password: "",
    PasswordValidation: ""
  });
  const [errorMessage, setErrorMessage] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState(false)
  const [modal, setModal] = useState(false)
  function inputChange(content, event) {
    setState({ ...state, [content]: event.target.value })
  }

  const addUser = async (UserDetails) => {
    let respons =
      await fetch("http://localhost:3080/LapinDesignerData/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({
          "ID": UserDetails.ID,
          "userName": UserDetails.Name,
          "userEmail": UserDetails.Email,
          "password": UserDetails.Password

        }),
      }).catch(error => console.log('error', error));
    if (respons.status === 409) {
      setEmailErrorMessage(true)
    }
    else {
      setEmailErrorMessage(false)
      setModal(true)
    }
  }

  function submit(event) {
    var UserDetails = {
      ID: state.ID,
      Name: state.Name,
      Email: state.Email,
      Password: state.Password
    }
    if (validateName(state.Name) === ""
      && validateEmail(state.Email) === ""
      && validateID(state.ID) === ""
      && validatePassword(state.Password, state.PasswordValidation) === "") {
      setErrorMessage(false)

      addUser(UserDetails);
      event.preventDefault();
    }
    else {
      setEmailErrorMessage(false)
      setErrorMessage(true)
      event.preventDefault();
    }
  }
  return (
    <>
      {modal && <ModalCard isSignUp="true" text1="!נרשמת בהצלחה" text2="פרטים יישלחו במייל" reloadPage="true" />}
      <div class="animated fadeInDown">
        <div className="fade-in-down">

          <form className="sign-up">
            <h2 className="sign-up-title">הרשם\י לקבלת עידכונים והטבות במייל</h2>
            <InputLabel type="text" name="מספר זהות" id="ID"
              onChange={inputChange} validCheck={() => validateID(state.ID)} />
            <InputLabel type="text" name="השם שלך" id="Name"
              onChange={inputChange} validCheck={() => validateName(state.Name)} />
            <InputLabel type="email" name="כתובת הדואר האלקטרוני שלך" id="Email"
              onChange={inputChange} validCheck={() => validateEmail(state.Email)} />
            <InputLabel type="password" name="סיסמא" id="Password"
              onChange={inputChange} validCheck={() => Password(state.Password)} />
            <InputLabel type="password" name="אימות הסיסמא" id="PasswordValidation"
              onChange={inputChange} validCheck={() => validatePassword(state.Password, state.PasswordValidation)} />
            <br />
            <button className="submit" type="submit" onClick={submit} >הרשמה</button>
            {emailErrorMessage && <div>משתמש בעל ת"ז זו כבר רשום במערכת</div>}
            {errorMessage && <div>אחד הפרטים שהוזנו שגוי, שנה/י אותו ונסה שנית</div>}
          </form>
        </div>
      </div>
    </>

  )
}

export default SignUp;