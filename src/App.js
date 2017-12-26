import React, { Component } from 'react';
import './App.css';

import {AreaChart} from 'react-easy-chart';
import elasticlunr from 'elasticlunr';
import Lightbox from 'react-image-lightbox';

import cardList from './cards.json';

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
  };

  addCard = (card) => {
    let newDeck = this.state.deck.slice();
    let currMana = this.state.manaCount.slice();
    let newCmc = this.state.cmc.slice();

    let manaCost = card.cmc;

    if (manaCost > 6) {
      newCmc[0].find((cmc) => {return cmc.id === 7}).y += 1;
    } else {
      newCmc[0].find((cmc) => {return cmc.id === manaCost}).y += 1;
    }

    newDeck.push(card);

    for (let i = 0; i < card.colors.length; i++) {
      let color = card.colors[i].toLowerCase();
      currMana.find((mana) => {return mana.color === color}).count += 1;
    }

    this.setState({
      deck: newDeck,
      manaCount: currMana,
      cmc: newCmc
    })
  }

  removeCard = (card) => {
    let newDeck = this.state.deck.slice();
    let currMana = this.state.manaCount.slice();
    let newCmc = this.state.cmc.slice();

    let manaCost = card.cmc;

    if (manaCost > 6) {
      newCmc[0].find((cmc) => {return cmc.id === 7}).y -= 1;
    } else {
      newCmc[0].find((cmc) => {return cmc.id === manaCost}).y -= 1;
    }

    newDeck.splice(newDeck.indexOf(card), 1);
    
    for (let i = 0; i < card.colors.length; i++) {
      let color = card.colors[i].toLowerCase();
      currMana.find((mana) => {return mana.color === color}).count -= 1;
    }

    this.setState({
      deck: newDeck,
      manaCount: currMana,
      cmc: newCmc
    });
  }

  clearDeck = () => {
    this.setState({
      deck: []
    }); 
  }

  render() {
    let cardLightbox = null;
    let clearAllButton = null;

    if(this.state.deck.length) {
      clearAllButton = <a className="clear-button" onClick={this.clearDeck}>Clear All</a>
    }

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
                  <div key={card.id} className='magic-card'>
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
            <span className='mana-curve'>Mana Curve</span>
            <AreaChart
              verticalGrid
              grid
              axes
              xType={'text'}
              margin={{top: 10, right: 10, bottom: 50, left: 30}}
              yDomainRange={[0, 30]}
              yTicks={5}
              width={450}
              interpolate={'cardinal'}
              height={250}
              data={this.state.cmc}
            />
            <div className="deck">
              {clearAllButton}
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
                    <a className="deck-button" onClick={() => this.removeCard(card)}>Remove</a>
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
