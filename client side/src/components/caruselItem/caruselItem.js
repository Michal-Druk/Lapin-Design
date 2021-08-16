import React from "react";
import '../caruselPage/carouselPage.css';
import { MDBCarouselItem, MDBView, } from "mdbreact";
function CaruselItem(props) {
  return (
    <MDBCarouselItem itemId={props.index + 1}>
      <MDBView>
        <img
          className="d-block w-100"
          src={props.image}
          alt="slide"
        />
      </MDBView>
    </MDBCarouselItem>
  )
}
export default CaruselItem