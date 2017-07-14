/*
	Contains 3 buttons to view tasks: Active, Completed and All.
	A 'Clear Completed' button clears all the tasks that have been marked completed.
	The 
*/
import React from 'react';

export default class Views extends React.Component {
	
	render() {
		return (
			<ul className="list-group">
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
				<li className="list-group-item">	
					<button
						onClick={this.props.clearCompleted.bind(this)}
						className="btn btn-default-others">
						Clear Completed
					</button>
					
					<button
						onClick={this.props.toggleAll.bind(this)}
						className="btn btn-default-others">
						Toggle All
					</button>

					<p>{this.props.countActive} tasks to be completed</p>
				</li>
			</ul>
		);
	}
}
