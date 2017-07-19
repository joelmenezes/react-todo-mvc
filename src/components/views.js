/*
	Contains 3 buttons to view tasks: Active, Completed and All.
	A 'Clear Completed' button clears all the tasks that have been marked completed.
	The 
*/
import React from 'react';
import Utils from './utils';

export default class Views extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countCompleted: 0
		}
	}

	componentWillReceiveProps(nextProps){
		if (this.props.countCompleted !== nextProps.countCompleted){
			this.setState({
			countCompleted: nextProps.countCompleted
		});
		}
	}

	pluralize(count, word) {
		return count === 1 ? word : word + 's';
	}

	clearCompleted() {
		if (this.state.countCompleted > 0){
			return (
				<button
					onClick={this.props.clearCompleted.bind(this)}
					className="btn btn-default-others">
					Clear Completed
				</button>
			);
		}
	}

	render() {
		var activeWord = this.pluralize(this.props.countActive, 'item');
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.countActive}</strong> {activeWord} left
				</span>

				<ul className="filters">
					<li className="list-group-item">
						<button
							onClick={this.props.activeTasks.bind(this)}
							className="btn btn-default">
							Active
						</button>
						
						<button
							onClick={this.props.completedTasks.bind(this)}
							className="btn btn-default">
							Completed
						</button>

						<button
							onClick={this.props.allTasks.bind(this)}
							className="btn btn-default">
							All
						</button>
					</li>
					<li>
						{this.clearCompleted()}
					</li>
				</ul>
			</footer>	
		);
	}
}
