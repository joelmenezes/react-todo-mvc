import React from 'react';
import Utils from './utils';

export default class Views extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countCompleted: 0
		}
	}

	componentDidMount(){
		this.setState({
			countCompleted: this.props.countCompleted
		});
	}

	pluralize(count, word) {
		return count === 1 ? word : word + 's';
	}

	render() {
		var activeWord = this.pluralize(this.props.countActive, 'item');
		var clearCompletedButton = null;
		
		if (this.props.countCompleted > 0){
			clearCompletedButton = (
				<button
					onClick={this.props.clearCompleted.bind(this)}
					className="btn btn-default-others">
					Clear Completed
				</button>
			);
		}

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.countActive}</strong> {activeWord} left
				</span>

				<ul className="filters">
					<li className="list-group-item">
						<button
							onClick={this.props.allTasks.bind(this)}
							className="btn btn-default">
							All
						</button>
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
					</li>
					
					<li>
						{clearCompletedButton}
					</li>
				</ul>
			</footer>	
		);
	}
}
