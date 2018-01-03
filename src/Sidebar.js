import React, {Component} from 'react';
import DeckCard from './DeckCard.js';
import {AreaChart} from 'react-easy-chart';
import PropTypes from 'prop-types';

class Sidebar extends React.Component {

	static propTypes = {
		cardCount: PropTypes.number.isRequired,
		clearDeck: PropTypes.func.isRequired,
		setCard: PropTypes.func.isRequired,
		removeCard: PropTypes.func.isRequired,
		cmc: PropTypes.array.isRequired,
		manaCount: PropTypes.array.isRequired,
		deck: PropTypes.array.isRequired
	}
	
	constructor(props) {
		super(props);
	}

	render() {
		let clearAllButton = null;

	    if(this.props.deck.length) {
	      clearAllButton = <a className="clear-button" onClick={this.props.clearDeck}>Clear All</a>
	    }

		return( 
			<div className="card-sidebar">
				<div id="sidebar-header">
	              Current Deck
	            </div>
	            <span className="card-count">Card Count: {this.props.cardCount}</span>
	            <div className="mana-colors">
	              {this.props.manaCount.map(mana => {
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
	              margin={{top: 10, right: 10, bottom: 30, left: 30}}
	              areaColors={['white']}
	              yDomainRange={[0, 30]}
	              yTicks={5}
	              width={450}
	              height={250}
	              data={this.props.cmc}
	            />
	            <div className="deck">
	              {clearAllButton}
	              {this.props.deck.map(card => {
	                return(
	                  <DeckCard
	                    setCard={() => this.props.setCard(card)}
	                    removeCard={() => this.props.removeCard(card)}
	                    card={card} 
	                  />
	                )
	              })}
	            </div>
	        </div>
        );
	}
}

export default Sidebar;
