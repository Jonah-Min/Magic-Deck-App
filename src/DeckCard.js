import React, {Component} from 'react';

class DeckCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const card = this.props.card;

		return(
			<div className="deck-card">
                <img
                  onClick={() => this.props.setCard(card)} 
                  src={card.imageUrl} 
                  alt={card.name} 
                  className='card-image-small'/>
                <span className="card-name">{card.name}</span>
                <span className="card-deck-count"><strong className="bold">Count: </strong>{card.count}</span>
                <span className="card-color"><strong className="bold">Color(s): </strong>{card.colors.join(", ")}</span>
                <span className="card-cmc"><strong className="bold">Converted Cost: </strong>{card.cmc}</span>
                <span className="card-text">{card.text}</span>
                <a className="deck-button" onClick={() => this.props.removeCard(card)}>Remove</a>
            </div>
		);
	}
}

export default DeckCard;
