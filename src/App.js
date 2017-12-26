import React, { Component } from 'react';
import './App.css';

import Lightbox from 'react-image-lightbox';

import cardList from './cards.json';

class App extends Component {
  state = {
    cards: cardList.cards,
    deck: [],
    selectedCard: null,
    black: 0,
    white: 0,
    green: 0,
    red: 0,
    blue: 0
  }

  addCard = (card) => {
    let newDeck = this.state.deck.slice();
    newDeck.push(card);

    for (let i = 0; i < card.colors.length; i++) {
      if (card.colors[i] === "White") {
        let whiteCount = this.state.white;
        this.setState({
          white: whiteCount + 1
        })
      } else if (card.colors[i] === "Blue") {
        let blueCount = this.state.blue;
        this.setState({
          blue: blueCount + 1
        })
      } else if (card.colors[i] === "Green") {
        let greenCount = this.state.green;
        this.setState({
          green: greenCount + 1
        })
      } else if (card.colors[i] === "Black") {
        let blackCount = this.state.black;
        this.setState({
          black: blackCount + 1
        })
      } else if (card.colors[i] === "Red") {
        let redCount = this.state.red;
        this.setState({
          red: redCount + 1
        })
      }
    }

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
            <span className="card-count">Card Count: {this.state.deck.length}</span>
            <div className="mana-colors">
              <div className="mana">
                <span className="black"></span>
                <span className="mana-count">{this.state.black}</span>
              </div>
              <div className="mana">
                <span className="blue"></span>
                <span className="mana-count">{this.state.blue}</span>
              </div>
              <div className="mana">
                <span className="green"></span>
                <span className="mana-count">{this.state.green}</span>
              </div>
              <div className="mana">
                <span className="white"></span>
                <span className="mana-count">{this.state.white}</span>
              </div>
              <div className="mana">
                <span className="red"></span>
                <span className="mana-count">{this.state.red}</span>
              </div>
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
