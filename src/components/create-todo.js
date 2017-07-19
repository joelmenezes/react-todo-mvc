import React from 'react';

const ENTER_KEY = 13;

export default class CreateTodo extends React.Component {
  	constructor(props){
		super(props);

		this.state = { 
  	  		input : ''
		};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
	}

	handleChange(event){
		this.setState({ input: event.target.value });
  	}

  	handleCreate(val) {
		const task = this.state.input;

		this.props.createTask(val);
		this.setState ({ input : ''});
  	}

  	handleNewTodoKeyDown(event) {
  		if (event.keyCode !== ENTER_KEY) {
  			return;
  		}
  		var val = this.state.input.trim();
  		if(val){
  			this.handleCreate(val);
  		}
  	}

  	render() {
		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						className="new-todo"
						placeholder="What needs to be done?" 
						value={this.state.input} 
						onKeyDown={this.handleNewTodoKeyDown}
						onChange={this.handleChange}
						autoFocus={true}
					/>
				</header>
			</div>		  	
	  	);
  	}
}