
import React, { useState, useEffect } from 'react';
import ModalCard from '../modal/modal'
import './rate.css'
import Reaction from '../reaction/reaction'
import Rating from '@material-ui/lab/Rating';


function Rate() {
  const [fidbek, setFidbek] = useState([]);
  useEffect((res) => {
    fetch("http://localhost:3080/LapinDesignerData/getReactionDb", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    }).then(res => res.json())
      .then((res) => {
        setFidbek(res)
      }).catch(error => console.log('error', error));
  }, [])
  const [state, setState] = useState({
    star: 0,
    cName: "",
    text: "",
  })
  const [modal, setModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  function inputChange(content, event, newValue) {
    if (content === "star") {
      if (newValue !== 0) {
        setErrorMessage(false)
      }
      setState({ ...state, [content]: newValue })
    }
    else {
      setState({ ...state, [content]: event.target.value })
    }
  }

  function submit() {
    if (state.star === 0) {
      setErrorMessage(true)
      return
    }
    var fidbekDetails = {
      star: state.star,
      cName: state.cName,
      text: state.text
    }

    addFidbek(fidbekDetails)
    debugger
    setModal(true)

  };

  const addFidbek = async (fidbekDetails) => {
    await fetch("http://localhost:3080/LapinDesignerData/createReaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({
        "star": fidbekDetails.star,
        "clientName": fidbekDetails.cName,
        "content": fidbekDetails.text

      }),
    }).catch(error => console.log('error', error));
  }

  return (

    <div class="animated fadeInDown">
      <div className="fade-in-down">
        <div className="rate">
          <div class="card text-center">
            <div class="card-header">
              <h5 class="title">!דרג אותנו</h5>
              <Rating
                size="large"
                value={state.star}
                onChange={(event, newValue) => inputChange("star", event, newValue)}
              />
              <div class="card-body">
                <h5 class="card-title"><input className="inputName" type="text" placeholder="השם שלך"
                  onChange={(event) => inputChange("cName", event)} ></input></h5>
                <p class="card-text"> <textarea className="inputName" name="rate" placeholder={""}
                  cols="62" rows="5" onChange={(event) => inputChange("text", event)}></textarea></p>
                <button className="submitRate" type="submit" onClick={submit} >אישור</button>
                {errorMessage && <div> לפני הקשה חובה לדרג</div>}
                {modal && <ModalCard text1="תגובתך נקלטה במערכת" text2="!תודה רבה" reloadPage="true" />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {fidbek.map(item => {
        return <Reaction star={item.Star} cName={item.ClientName} text={item.Content} />
      })}
    </div>

  );
};

export default Rate;

