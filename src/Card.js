import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
	static propTypes = {
		card: PropTypes.object.isRequired,
		addCard: PropTypes.func.isRequired,
		setCard: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
	}

	render() {
		let card = this.props.card;

		return (<div key={card.id} className='magic-card'>
            <img 
              onClick={() => this.props.setCard(card)} 
              src={card.imageUrl}
              className='card-image lightbox-trigger'
              alt={card.name}>
            </img>
            <a className="card-button" onClick={() => this.props.addCard(card)}>Add Card</a>
          </div>);
	}
}

export default Card;
