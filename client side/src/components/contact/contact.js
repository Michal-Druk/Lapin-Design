import { useState } from 'react';
import InputLabel from '../inputLabel/inputLabel'
import './contact.css';
import ModalCard from '../modal/modal'
import {
  validateName,
  validateEmail,
  validatePhone,
  validateSubject
}
  from '../validation/validation'

function Contact() {
  const [state, setState] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Subject: "",
    Text: ""
  });
  const [modal, setModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  function inputChange(content, event) {
    setState({ ...state, [content]: event.target.value })
    setModal(false);
  }

  const sendEmail =  (data) => {
    fetch("http://localhost:3080/LapinDesignerData/contactEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch(error => console.log('error', error));
  }

  function submit(event) {
    var UserDetails = {
      Name: state.Name,
      Email: state.Email,
      Phone: state.Phone,
      Subject: state.Subject,
      Text: state.Text
    }
    if (validateName(state.Name) === ""
      && validateEmail(state.Email) === ""
      && validatePhone(state.Phone) === ""
      && validateSubject(state.Subject) === "") {
      setErrorMessage(false)
      event.preventDefault();
      let data = {
        userName: UserDetails.Name,
        subject: UserDetails.Subject,
        massege: UserDetails.Text,
        userEmail: UserDetails.Email,
        userPhone: UserDetails.Phone
      }
      sendEmail(data)
      setModal(true);
    }
    else {
      setErrorMessage(true)
      event.preventDefault();
    }
  }
  return (
    <>
      {modal && <ModalCard text1="הפרטים נקלטו בהצלחה"
        text2="יישלח מייל לכתובת המייל שהזנת" reloadPage="true" />}
      <div class="animated fadeInDown">
        <div className="fade-in-down">
          <h3 className="contact-title">הכנס/י את פרטיך ונשוב אליך בהקדם</h3>
          <form className="contact">
            <InputLabel type="text" name="השם שלך" id="Name"
              onChange={inputChange} validCheck={() => validateName(state.Name)} />
            <InputLabel type="email" name="כתובת הדואר האלקטרוני שלך" id="Email"
              onChange={inputChange} validCheck={() => validateEmail(state.Email)} />
            <InputLabel type="text" name="מספר הטלפון שלך (10 ספרות)" id="Phone"
              onChange={inputChange} validCheck={() => validatePhone(state.Phone)} />
            <InputLabel type="text" name="נושא הפניה" id="Subject"
              onChange={inputChange} validCheck={() => validateSubject(state.Subject)} />
            <br />
            <textarea className="text" placeholder={"הודעה"} cols="62" rows="5"
              onChange={(event) => inputChange("Text", event)}></textarea>
            <button className="submit" type="submit" onClick={submit} >צור קשר</button>
            {errorMessage && <div>אחד הפרטים שהוזנו שגוי, שנה/י אותו ונסה שנית</div>}
          </form>
        </div>
      </div>
    </>

  )
}

export default Contact;