import React from 'react';

import TodosListItem from './todos-list-item';


export default class TodosList extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			viewType: this.props.viewType
		}
	}

	//Updates state if viewType changes
	componentWillReceiveProps(nextProps){
		if (this.props.viewType !== nextProps.viewType){
			this.setState({
			viewType: nextProps.viewType
		});
		}
	}


	renderItems(){
		const props = this.props;
		var todosToRender = this.props.todos;
		
		switch (this.state.viewType){
    		case 'all':
    			todosToRender = this.props.todos;
    			break;
    		case 'active':
    			todosToRender = this.props.todos.filter(todo=> todo.isCompleted === false);
    			break;
    		case 'completed':
    			todosToRender = this.props.todos.filter(todo=> todo.isCompleted === true);
    			break;
    	}

		return todosToRender.map((todo, index) => 
			<TodosListItem 
				key={index}
				{...todo} {...props}
			/>
		);
	}

	renderToggleAll() {
		if (this.props.todos.length > 0) {
			return (
				<input 
                    className="toggle-all"
                    type="checkbox"
                    onChange={this.props.toggleAll}
             	/>
			);
		}
	}
	
	render() {
		return (
			<section className="main">
				{this.renderToggleAll()}
				<ul className="todo-list">
					{this.renderItems()}
				</ul>
			
			</section>
		);
	}
}