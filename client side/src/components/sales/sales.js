import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import Cards from '../cards/cards'
import './sales.css'

function Sales(props) {
    const [cardsList, setCardsList] = useState([]);
    useEffect((res) => {
        fetch("http://localhost:3080/LapinDesignerData/getCardsDb", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(res),
        }).then(res => res.json())
            .then((res) => {
                setCardsList(res)
            }).catch(error => console.log('error', error));
    }, [])
    var image = ""
    return (
        <>
            <div class="animated fadeInDown">
                <div className="fade-in-down">
                    <MDBContainer>
                        <MDBRow>
                            {cardsList.map(item => {
                                image = require("../../images/cards/" + item.Image)
                                return <Cards  token={props.token} id={item._id} sale={item.Sale} text={item.Content} image={image.default} />
                            })}
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
            <h2 className="text">הטבות ומבצעים לרשומים לאתר בלבד*</h2>
        </>
    )
}
export default Sales;