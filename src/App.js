import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Lightbox from 'react-image-lightbox';

import cardList from './cards.json';

class App extends Component {
  state = {
    cards: cardList.cards,
    Deck: [],
    selectedCard: null,
  }

  render() {
    let cardLightbox = null;

    if(this.state.selectedCard) {
      cardLightbox = 
        <Lightbox
          mainSrc={this.state.selectedCard}
          onCloseRequest={() => this.setState({selectedCard: null})}
        />;
    }

    return (
      <div className="App">
        <div id="header"> 
          Magic The Gathering Deck Builder
        </div>

        <div className="container">
          {this.state.cards.map(card => {
            return(
              <div key={card.multiverseid} className='magic-card'>
                <img 
                  onClick={(event) => {
                    this.setState({
                      selectedCard: event.target.src
                    })
                  }} 
                  src={card.imageUrl}
                  className='card-image lightbox-trigger'>
                </img>
              </div>
            )
          })}
          {cardLightbox}
        </div>
      </div>
    );
  }
}

export default App;
