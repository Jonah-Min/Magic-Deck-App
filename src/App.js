import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Lightbox from 'react-image-lightbox';

import cardList from './cards.json';

class App extends Component {
  state = {
    cards: cardList.cards,
    Deck: [],
    cardSelected: false,
    selectedCard: null,
  }

  handleCardClick = (event) => {
    this.setState({
      cardSelected: true,
      selectedCard: event.target.src
    });
  }

  render() {
    const {cardSelected} = this.state;

    return (
      <div className="App">
        {this.state.cards.map(card => {
          return(
            <div key={card.multiverseid} className='magic-card'>
              <img 
                onClick={this.handleCardClick} 
                src={card.imageUrl}
                className='card-image lightbox-trigger'>
              </img>
            </div>
          )
        })}
        {cardSelected && 
          <Lightbox 
            mainSrc={this.state.selectedCard}
            onCloseRequest={() => this.setState({cardSelected: false, selectedCard: null})}
          />}
      </div>
    );
  }
}

export default App;
