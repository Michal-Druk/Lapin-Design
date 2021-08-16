import React from 'react';
import Rating from 'react-star-rating-lite'
import './reaction.css'
function Reaction(props) {
  return (
    <div className="rate">
      <div class="card text-center">
        <div class="card-header">
          <Rating value={props.star} readonly />
        </div>
        <div class="card-body">
          <h5 class="card-title">{props.cName}</h5>
          <p class="card-text">{props.text}</p>
        </div>
      </div>
    </div>
  );
}
export default Reaction