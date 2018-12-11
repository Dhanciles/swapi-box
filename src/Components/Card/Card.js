import React from 'react'
import './Card.scss'

const handleLocalStorage = (e, card, saveToFavorites, removeFromFavorites) => {
  e.target.classList.toggle('active')
  if (e.target.classList.contains('active')) {
    saveToFavorites(card)
  } else {
    removeFromFavorites(card)
  }
}

const Card = ({card, saveToFavorites, removeFromFavorites}) => {
  let displayedCard
  if (Object.keys(card).includes('species')) {
    displayedCard = peopleCard(card)
  } else if (Object.keys(card).includes('model')) {
    displayedCard = vehicleCard(card)
  } else if (Object.keys(card).includes('terrain')) {
    displayedCard = planetCard(card)
  }

  return (
    <div className='card'>
      <h2>{card.name}</h2>
      <div className='fav-btn-div'>
        <button className='fav-btn' onClick={
          (e) => handleLocalStorage(e, card, saveToFavorites, removeFromFavorites)
          }>
            Favorite
          </button>
      </div>
      {displayedCard}

    </div>
  )
}

const peopleCard = (card) => {
  return (
  <div>
    <div className='image-div'>
      <img src={card.image} className='image' alt={card.name}/>
    </div>
    <p>Species: {card.species}</p>
    <p>Homeworld: {card.homeworld}</p>
    <p>Homeworld population: {card.homeworldPop}</p>
  </div>
  )
}

const vehicleCard = (card) => {
  return (
    <div>
       <div className='image-div'>
         <img src={card.image} className='image' alt={card.name}/>
       </div>
       <p>Model: {card.model}</p>
       <p>Class: {card.class}</p>
       <p>Available passengers: {card.numberOfPassengers}</p>
     </div>
  )
}

const planetCard = (card) => {
  return (
    <div>
       <div className='image-div'>
         <img src={card.image} className='image' alt={card.name}/>
       </div>
       <p className="short-space">Population: {isNaN(parseInt(card.population)) ? 'Uninhabited' : card.population}</p>
       <p className="short-space">Climate: {card.climate}</p>
       <p className="short-space">Terrain: {card.terrain}</p>
       <p className="residents-p">Residents:  </p>
       <select className='residents-list'>
         {card.residents.length ?
           card.residents.map(resident => {
             return <option key={resident} value={resident}>{resident}</option>
           }) : <option>No residents listed</option>
         }
       </select>
     </div>
  )
}

export default Card