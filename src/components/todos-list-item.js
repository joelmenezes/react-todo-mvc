import React from 'react';

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

export default class TodosListItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isEditing: false,
			input: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleChange(event){
    	this.setState( {input: event.target.value });
  	}		
	
	onEditClick() {
		this.setState({ isEditing: true });
	}

	handleKeyDown(event) {
		if (event.which === ESCAPE_KEY) {
			this.setState({ isEditing: false });
		} else if (event.which === ENTER_KEY) {
			this.onSaveClick();
		}
	}

	/*
		Saves the old and new tasks and calles 'saveTask' from 'App'
	*/
	onSaveClick(event) {
		const oldUUID = this.props.uuid;
		const newTask = this.state.input;

		this.props.saveTask(oldUUID, newTask);
		this.setState({	isEditing: false });
	}

	renderTaskSection() {
		const {task, isCompleted, uuid} = this.props;
		
		if(this.state.isEditing){
			return(
				<input 
					className="edit"
					type="text" 
					placeholder={task}
					
        			onChange={this.handleChange}
        			onKeyDown={this.handleKeyDown}
				/>
			);
		}

		return(
			
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						onChange={this.props.toggleTask.bind(this, this.props.uuid)}
						checked={isCompleted}
					/>
					<label
						onDoubleClick={this.onEditClick.bind(this)}>
						{task}
					</label>
					<button
						className="destroy"
						onClick={this.props.deleteTask.bind(this, this.props.uuid)}
					/>
				</div>
			
		);
	}

	render() {
		return (
			<li>
				{this.renderTaskSection()}
			</li>
		);
	}
}