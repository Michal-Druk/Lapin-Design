
import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBView } from 'mdbreact';
import ModalCard from '../modal/modal'
import '../sales/sales.css'

function Cards(props) {
  const [modal, setModal] = useState(
    {
      notRegister: false,
      cantTwice: false,
      sendEmail: false,
    }
  )

  const addSaler = async (SalerDetails) => {

    let respond =
      await fetch("http://localhost:3080/LapinDesignerData/createcreateBonusUtilized", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        },
        body: JSON.stringify(SalerDetails),
      });
    return respond;
  }

  async function click() {
    let canGet = true
    var SalerDetails = {
      userId: props.customerID,
      bonusId: props.id,
      userEmail: props.customerEmail
    }
    if (canGet) {
      let respond = await addSaler(SalerDetails);
      if (respond.status === 401) {
        setModal({ ...modal, notRegister: true })
      }
      else {
        if (respond.status === 409) {
          setModal({ ...modal, cantTwice: true })
          canGet = false
        }
        else {
          if (respond.status !== 404) {
            setModal({ ...modal, sendEmail: true })
          }
        }
      }

    }
    else {
      canGet = true
    }
  }
  const setModal2 = (name) => {
    setModal({ ...modal, [name]: false })
  }
  return (
    <>
      {modal.cantTwice && <ModalCard setModal={setModal2} name="cantTwice"
        text1="לא ניתן לממש קופון פעמיים" text2="נסה/י קופון אחר" reloadPage="false" />}
      {modal.notRegister && <ModalCard setModal={setModal2} name="notRegister"
        text1="הקופונים לרשומים לאתר בלבד" text2="!הרשם/י או הכנס/י לאתר וזכה/י בהטבות" reloadPage="false" />}
      {modal.sendEmail && <ModalCard setModal={setModal2} name="sendEmail"
        text1="הנך זכאי להטבה" text2="קוד קופון נשלח ברגעים אלו למייל שלך" reloadPage="false" />}
      <MDBCol md='4'>
        <MDBCard narrow className="card">
          <MDBView cascade>
            <MDBCardImage
              hover
              className='card-img-top'
              src={props.image}
            />
          </MDBView>
          <MDBCardBody cascade className='text-center'>
            <MDBCardTitle className='font-weight-bold'>{props.sale}</MDBCardTitle>
            <MDBCardText >{props.text}</MDBCardText>
            <MDBBtn color='red' onClick={click}>למימוש ההטבה</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  )
}
export default Cards