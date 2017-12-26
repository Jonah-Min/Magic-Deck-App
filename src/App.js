import React, { Component } from 'react';
import './App.css';

import Lightbox from 'react-image-lightbox';

import cardList from './cards.json';

class App extends Component {
  state = {
    cards: cardList.cards,
    deck: [],
    selectedCard: null,
    manaCount: [
      {
        color: "blue",
        count: 0
      },
      {
        color: "black",
        count: 0
      },
      {
        color: "red",
        count: 0
      },
      {
        color: "green",
        count: 0
      },
      {
        color: "white",
        count: 0
      }
    ]
  }

  addCard = (card) => {
    let newDeck = this.state.deck.slice();
    let currMana = this.state.manaCount.slice();

    newDeck.push(card);

    for (let i = 0; i < card.colors.length; i++) {
      let color = card.colors[i].toLowerCase();
      currMana.find((mana) => {return mana.color == color}).count += 1;
    }

    this.setState({
      deck: newDeck,
      manaCount: currMana
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
            <span className="card-count">Card Count: {this.state.deck.length}</span>
            <div className="mana-colors">
              {this.state.manaCount.map(mana => {
                return(
                  <div key={mana.color} className="mana">
                    <span className={mana.color}></span>
                    <span className="mana-count">{mana.count}</span>
                  </div>
                )
              })}
            </div>
            <div className="deck">
              {this.state.deck.map(card => {
                return(
                  <div className="deck-card">
                    <img
                      onClick={(event) => {
                        this.setState({
                          selectedCard: card
                        })
                      }}  
                      src={card.imageUrl} 
                      alt={card.name} 
                      className='card-image-small'/>
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
