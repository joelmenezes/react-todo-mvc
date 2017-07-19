import React from 'react';

const ENTER_KEY = 13;

export default class CreateTodo extends React.Component {
  	constructor(props){
		super(props);

		this.state = { 
  	  		inputv : '',
	  		error: null
		};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
	}

	//This updates the state when the value in the input box is changed.
  	handleChange(event){
		this.setState({ inputv: event.target.value });
  	}

  	//Returns an error when an empty or repeated task is entered.
  	renderError() {
		if (!this.state.error) { return null; }

		return <div style={{ color: 'red' }}>{this.state.error}</div>;
  	}

  	/*
		Checks to see if the input is valid. If it is, it calls 'createTask'
		from 'App' and passes the input value.
  	*/
  	handleCreate(val) {
		const task = this.state.inputv;

		this.setState({ error: null });
		this.props.createTask(val);
		this.setState ({ inputv : ''});
  	}

  	handleNewTodoKeyDown(event) {
  		if (event.keyCode !== ENTER_KEY) {
  			return;
  		}
  		var val = this.state.inputv.trim();
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
						value={this.state.inputv} 
						onKeyDown={this.handleNewTodoKeyDown}
						onChange={this.handleChange}
						autoFocus={true}
					/>
				</header>
			</div>		  	
	  	);
  	}
}