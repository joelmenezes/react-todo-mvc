import React from 'react';
import _ from 'lodash';

export default class CreateTodo extends React.Component {
  	constructor(props){
		super(props);

		this.state = { 
  	  		inputv : '',
	  		error: null
		};
	
		this.handleChange = this.handleChange.bind(this);
	}

	//This updates the state when the value in the input box is changed.
  	handleChange(event){
		this.setState( {inputv: event.target.value });
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
  	handleCreate(event) {
		event.preventDefault();

		const task = this.state.inputv;
		const validateInput = this.validateInput(task);

		if(validateInput) {
	  		this.setState({ error: validateInput });
	  		return;
		}

		this.setState({ error: null });
		this.props.createTask(this.state.inputv);
		this.setState ({ inputv : ''});
  	}

  	//Returns an error if task is empty or repeated. 
  	validateInput(task) {
		if (!task) {
	  		return 'Please enter a task';
		} else if (_.find(this.props.todos, todo => todo.task === task )) {
	  	  	return 'Task already exists';
		} else {
	  		return null;
		}
  	}

  	render() {
		return (
	  	<form onSubmit={this.handleCreate.bind(this)}>
			<input 
				type="text" 
				placeholder="Enter Item" 
				value={this.state.inputv} 
				onChange={this.handleChange}
				className="new-todo"/>
				{this.renderError()}
	  	</form>  
		);
  	}
}