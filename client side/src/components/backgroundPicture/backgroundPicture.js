import React from "react";
import './backgroundPicture.css'
import logoMail1 from '../../images/logoMail1.png'
import logoPhone from '../../images/logoPhone.png'
import progectBackground from '../../images/progectBackground.png'

function MailPhoneProjects(props) {
  var picture;
  if (props.info === "mail") {
    picture = logoMail1;
  }
  else {
    if (props.info === "progectBackground") {
      picture = progectBackground;
    }
    else {
      picture = logoPhone;
    }
  }
  return (

    <div class="animated fadeInUp">
      <div className="fade-in-up"></div>
      <div className="mail">
        <img src={picture} class="img-fluid" alt=""></img>
      </div>
    </div>

  );
}
export default MailPhoneProjects