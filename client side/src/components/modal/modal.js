import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { useHistory, withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import './modal.css'
const ModalCard = withRouter(function (props) {
    const [modalShow, setModalShow] = useState(true);
    const history = useHistory()
    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    if (props.reloadPage === "true") history.push('/');
                   else props.setModal(props.name);
                }
                }
                size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal"></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className="text1">{props.text1}</h2>
                    <h4 className="text2">{props.text2}</h4>
                </Modal.Body>

                <Modal.Footer>
                    {props.isSignUp === "true" && <Link to="signIn" className="modal-link" >לאזור האישי</Link>}
                </Modal.Footer>
            </Modal>
        </>
    );
})
export default ModalCard;
