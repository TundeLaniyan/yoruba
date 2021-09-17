import React, { memo } from 'react';
import { lesson } from '../../data.json';
import './card.css';

const CardText = memo(function CardText({ state, exercise, onClick, hide, brightness }) {
  return (
    <div 
      className="card" 
      onClick={() => onClick(state)} 
      style={
        hide ? 
        { backgroundColor: "#bbb7aa35" } : 
        brightness ? 
        { filter: `brightness(${brightness})`} : {}
      }
    >
      <h1 className="card__text--large">
        {!(hide >= 0) && lesson[0].lessons[exercise - 1]}
      </h1>
    </div>
  )
});

export default CardText;