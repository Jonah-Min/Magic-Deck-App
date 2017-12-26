import React, { Component } from 'react';
import './App.css';

import Lightbox from 'react-image-lightbox';

import cardList from './cards.json';

class App extends Component {
  state = {
    cards: cardList.cards,
    deck: [],
    selectedCard: null,
  }

  addCard = (card) => {
    let newDeck = this.state.deck.slice();
    newDeck.push(card);
    this.setState({
      deck: newDeck
    })
  }

  render() {
    let cardLightbox = null;

    if(this.state.selectedCard) {
      let {selectedCard} = this.state;

      cardLightbox = 
        <Lightbox
          mainSrc={selectedCard.imageUrl}
          imageTitle={selectedCard.name}
          imageCaption={selectedCard.text }
          onCloseRequest={() => this.setState({selectedCard: null})}
        />;
    }

    return (
      <div className="App">
        <div className="container">
          <div className="cards-container">
            <div id="header">
              Card List
            </div>
            <div className="card-list">
              {this.state.cards.map(card => {
                return(
                  <div key={card.multiverseid} className='magic-card'>
                    <img 
                      onClick={(event) => {
                        this.setState({
                          selectedCard: card
                        })
                      }} 
                      src={card.imageUrl}
                      className='card-image lightbox-trigger'
                      alt={card.name}>
                    </img>
                    <a className="card-button" onClick={() => this.addCard(card)}>Add Card</a>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="card-sidebar">
            <div id="sidebar-header">
              Current Deck
            </div>
            <div className="deck">
              {this.state.deck.map(card => {
                return(
                  <div className="deck-card">
                    <img src={card.imageUrl} alt={card.name} className='card-image-small'/>
                    <span className="card-name">{card.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
          {cardLightbox}
        </div>
      </div>
    );
  }
}

export default App;
