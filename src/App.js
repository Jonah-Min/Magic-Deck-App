import React, { Component } from 'react';
import './App.css';

import elasticlunr from 'elasticlunr';
import Lightbox from 'react-image-lightbox';

import cardList from './cards.json';
import Card from './Card.js';
import Sidebar from './Sidebar.js';

const searchFields = {
  fields: {
    name: {
      boost: 4,
    }
  },
  expand: true,
};

class App extends Component {
  state = {
    cards: cardList.cards,
    deck: [],
    cardCount: 0,
    selectedCard: null,
    cmc: [[
      {id: 0, x: "0", y: 0},
      {id: 1, x: "1", y: 0},
      {id: 2, x: "2", y: 0},
      {id: 3, x: "3", y: 0},
      {id: 4, x: "4", y: 0},
      {id: 5, x: "5", y: 0},
      {id: 6, x: "6", y: 0},
      {id: 7, x: "7+", y: 0},
    ]],
    manaCount: [
      {
        color: "white",
        count: 0
      },
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
    ]
  };

  /*
   *  Add one instance of card to state deck
   */
  addCard = (card) => {
    let newDeck = this.state.deck.slice();
    let currMana = this.state.manaCount.slice();
    let newCmc = this.state.cmc.slice();
    let newCount = this.state.cardCount + 1;

    let manaCost = card.cmc;

    // Increment manacurve for given card
    if (manaCost > 6) {
      newCmc[0].find((cmc) => {return cmc.id === 7}).y += 1;
    } else {
      newCmc[0].find((cmc) => {return cmc.id === manaCost}).y += 1;
    }

    // Either add to the deck or increment the count of the card
    if (newDeck.find((c) => {return c.name == card.name})) {
      newDeck.find((c) => {return c.name == card.name}).count += 1;
    } else {
      card.count = 1;
      newDeck.push(card);
    }

    // Update the count for the mana color
    for (let i = 0; i < card.colors.length; i++) {
      let color = card.colors[i].toLowerCase();
      currMana.find((mana) => {return mana.color === color}).count += 1;
    }

    this.setState({
      deck: newDeck,
      manaCount: currMana,
      cmc: newCmc,
      cardCount: newCount,
    })
  }

  /*
   *  Remove one instance of card from state deck
   */
  removeCard = (card) => {
    let newDeck = this.state.deck.slice();
    let currMana = this.state.manaCount.slice();
    let newCmc = this.state.cmc.slice();
    let newCount = this.state.cardCount - 1;

    let manaCost = card.cmc;

    // Decrement mana curve amount
    if (manaCost > 6) {
      newCmc[0].find((cmc) => {return cmc.id === 7}).y -= 1;
    } else {
      newCmc[0].find((cmc) => {return cmc.id === manaCost}).y -= 1;
    }

    let cardInDeck = newDeck.find((c) => {return c.name == card.name});

    // Decrement or remove the card from the deck
    if (cardInDeck.count == 1) {
      newDeck.splice(newDeck.indexOf(card), 1);
    } else {
      cardInDeck.count -= 1;
    }
    
    // Decrement count for mana color
    for (let i = 0; i < card.colors.length; i++) {
      let color = card.colors[i].toLowerCase();
      currMana.find((mana) => {return mana.color === color}).count -= 1;
    }

    this.setState({
      deck: newDeck,
      manaCount: currMana,
      cmc: newCmc,
      cardCount: newCount,
    });
  }

  updateSelectedCard = (card) => {
    this.setState({
      selectedCard: card
    });
  }

  /*
   * Remove Evercard from the current deck
   */
  clearDeck = () => {
    this.setState({
      deck: [],
      cmc: [[
        {id: 0, x: "0", y: 0},
        {id: 1, x: "1", y: 0},
        {id: 2, x: "2", y: 0},
        {id: 3, x: "3", y: 0},
        {id: 4, x: "4", y: 0},
        {id: 5, x: "5", y: 0},
        {id: 6, x: "6", y: 0},
        {id: 7, x: "7+", y: 0},
      ]],
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
      ],
      cardCount: 0,
    }); 
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
              <input
                type='input'
                className='search-field'
                placeholder='Search Card'
                ref={(search) => { this.search = search }}
                onChange={this.handleSearch}
              ></input>
            </div>
            <div className="card-list">
              {this.state.cards.map(card => {
                return(
                  <Card
                    setCard={this.updateSelectedCard}
                    addCard={this.addCard}
                    card={card}
                  />
                )
              })}
            </div>
          </div>
          <Sidebar
            cardCount={this.state.cardCount}
            manaCount={this.state.manaCount}
            cmc={this.state.cmc}
            deck={this.state.deck}
            clearDeck={this.clearDeck}
            setCard={this.updateSelectedCard}
            removeCard={this.removeCard}
          />
          {cardLightbox}
        </div>
      </div>
    );
  }
}

export default App;
