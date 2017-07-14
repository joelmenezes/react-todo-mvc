import React from 'react';

export default class TodosListItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isEditing: false,
			inputv: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
    	this.setState( {inputv: event.target.value });
  	}

  	/*
		This method checks if a task is being edited. If it is, it creates an input box.
  	*/
	renderTaskSection() {
		const {task, isCompleted } = this.props;

		const taskStyle = {
			textDecoration: isCompleted? 'line-through' : '',
			color: isCompleted? 'green' : 'black',
			cursor: 'pointer'
		};
		
		if(this.state.isEditing){
			return(
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input 
							type="text" 
							placeholder={task}
        					onChange={this.handleChange}
        					className="edit-input"
						/>
					</form>
				</td>
			);
		}

		return(
			
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
					/>
					<label
						onDoubleClick={this.onEditClick.bind(this)}>
						{task}
					</label>
				</div>
			
		);
	}

	/*
		Renders the 'Cancel' button if a task is being edited. 
		Renders 'Done' and 'Delete' buttons when cursor is over a task.
	*/
	
	renderActionsSection() {
		if (this.state.isEditing){
			return(
				<td>
					<button 
						onClick={this.onCancelClick.bind(this)}
						className="btn btn-default">
						Cancel
					</button>
				</td>
			);
		}

		return(
			<td>
				<button 
					onClick={this.props.toggleTask.bind(this, this.props.task)} 
					className="done-button">
					&#x2714;  
				</button>
				
				<button 
					onClick={this.props.deleteTask.bind(this, this.props.task)}
					className="delete-button">
					&#10060;
				</button>
			</td>
		);
	}
	
	
	onEditClick() {
		this.setState({ isEditing: true });
	}

	onCancelClick() {
		this.setState({ isEditing: false });	
	}

	/*
		Saves the old and new tasks and calles 'saveTask' from 'App'
	*/
	onSaveClick(event) {
		event.preventDefault();

		const oldTask = this.props.task;
		const newTask = this.state.inputv;

		this.props.saveTask(oldTask, newTask);
		this.setState({	isEditing: false });
	}

	render() {
		return (
			<li>
				{this.renderTaskSection()}
				
			</li>
		);
	}
}