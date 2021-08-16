import React, {useEffect, useState} from "react";
import './carouselPage.css';
import { MDBCarousel, MDBCarouselInner } from "mdbreact";
import CaruselItem from '../caruselItem/caruselItem'
import 'bootstrap/dist/css/bootstrap.min.css';
function CarouselPage() {
  const [pictures,setPictures]=useState([]);
  useEffect((res) => {
    fetch("http://localhost:3080/LapinDesignerData/getPictures", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
  }).then(res => res.json())
      .then((res) => {
        setPictures(res[3].Pictures)
      });
},[]);
  let index = -1;
  let image = "";
  return (
    <div style={{height:'100%',width:'100%'}}>
      <MDBCarousel
        activeItem={1}
        length={6}
        showControls={true}
        showIndicators={false}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          {pictures.map(item => {
            image = require("../../images/carusel/" + item);
            index++
            return <CaruselItem index={index} image={image.default} />
          })}
        </MDBCarouselInner>
      </MDBCarousel>
      <div className="footer-place">
        <footer className="bg-dark text-center text-white footer-place" >
          <div class="text-center p-3" >
            © Dvora Lapin:
            dvora679@gmail.com
          </div> 
        </footer>
      </div>
    </div>

  );
}

export default CarouselPage;
