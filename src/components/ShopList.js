import React, { Component } from 'react';

	
class ShopList extends Component {
	
	handleDelete () {
		!this.props.onDelete || this.props.onDelete ()
	}
	
	render() {
		return (
			<li className="products__list">
				<input type="checkbox"/>
				{this.props.prefix}
        		{this.props.children}
				<button className="list__close" onClick={this.handleDelete.bind(this)}>&times;</button>
			</li>
		);
	}
}

export default ShopList;