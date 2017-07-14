import React from 'react';
import _ from 'lodash';

import TodosListItem from './todos-list-item';


export default class TodosList extends React.Component {
	/*
		Separates props and 'todos' from the props it received from 'App'.
		Iterates through the props and renders tasks in 'TodoListItem'
	*/
	renderItems(){
		const props = _.omit(this.props, 'todos');

		return this.props.todos.map((todo, index) => <TodosListItem key={index}
			{...todo} {...props} />);
	}

	render() {
		return (
			<section className="main">
				<input 
                    className="toggle-all"
                    type="checkbox"
             	/>
				<ul className="todo-list">
					{this.renderItems()}
				</ul>
			
			</section>
		);
	}
}