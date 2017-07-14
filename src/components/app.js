import React from 'react';

import TodosList from './todos-list'
import CreateTodo from './create-todo'
import Views from './views'

const todos = [];
const activeTodos = [];
const completeTodos = [];
const viewType = 'all';
const toggleStatus = false;
const countActive = 0;
const countComplete = 0;

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			todos, 
			activeTodos, 
			completeTodos,
			viewType, 
			toggleStatus, 
			countActive,
            countComplete
		}; 
	}

	/*
		Receives a task (String) from 'CreateTodo' and adds it to the array 'todos'.
	*/
	createTask(task) {
		this.state.todos.push({
			task,
			isCompleted: false
		});
		this.setState({ 
			viewType:'all',
        	toggleStatus : false,
        	countActive: this.countActive(),
            countCompleted: this.countCompleted()
        });
	}

	/*
		Receives a task (String) from 'TodosListItem', searches for it in the todos array,
		and toggles its 'isCompleted' value.
	*/
	toggleTask(task) {
        let foundTodo = this.state.todos.find(todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ 
        	todos: this.state.todos,
        	toggleStatus : false,
        	countActive: this.countActive(),
            countCompleted: this.countCompleted()
        });
    }

    /*
		Receives 2 tasks (String) from 'TodosListItem', searches for the 'oldTask' from the
		'todos' array and replaces it with the 'newTask'.
    */
    saveTask(oldTask, newTask) {
    	const foundTodo = this.state.todos.find(todo => todo.task === oldTask);
    	foundTodo.task = newTask;
    	this.setState({ 
    		todos: this.state.todos,
    		toggleStatus : false,
    		countActive: this.countActive(),
            countCompleted: this.countCompleted() 
    	});
    }

    /*
		Receives a task (String) from 'TodosListItem', and removes it from the 'todos' array.
    */
    deleteTask(taskToDelete) {
        var index = this.state.todosdo.indexOf(taskToDelete);
    	this.state.todos.splice(index, 1);
    	this.setState({ 
    		todos: this.state.todos,
    		toggleStatus : false,
    		countActive: this.countActive(),
            countCompleted: this.countCompleted() 
    	});
    }

    /*
		This method is called from 'Views' when the 'Active' button is clicked. It filters all
		the active tasks from the 'todos' array. It then updates the value of 'activeTodos' in
		the state.
    */
    activeTasks() {
    	const activeTasks = this.state.todos.filter(todo=> todo.isCompleted === false);
    	this.setState({
    		activeTodos: activeTasks,
    		viewType: 'active'
    	});
    }

    /*
		This method is called from 'Views' when the 'Completed' button is clicked. It filters all
		the completed tasks from the 'todos' array. It then updates the value of 'completedTodos' in
		the state.
    */
    completedTasks() {
    	const completedTasks = this.state.todos.filter(todo=> todo.isCompleted === true);
    	this.setState({
    		completeTodos: completedTasks,
    		viewType: 'completed'
    	});
    }

    /*
		This method is called from 'Views' when the 'All' button is clicked. It then updates the 
		the state.
    */
    allTasks() {
    	this.setState({ 
    		todos: this.state.todos,
    		viewType: 'all' 
    	});
    }

    /*
		This method is called from 'Views' when the 'Clear Completed' button is clicked. It 
		iterates through the 'todos' array and removes completed tasks.
    */
    clearCompleted() {
        var todoNow = this.state.todos;
        for (var j = 0; j < todoNow.length; j++) {
            if (todoNow[j].isCompleted === true) {
                todoNow.splice(j, 1);
            }
        }
        this.setState({
    		viewType: 'all',
            todos: todoNow,
    		countActive: this.countActive()
    	});
    }

    /*
    	This method is called from 'Views' when the 'Toggle All' button is clicked.
		It uses 'this.state.toggleStatus' to decide if the todos list was modified 
		after the previous click of 'Toggle All'
    */
    toggleAll() {
    	if (!this.state.toggleStatus) {
    		_.map(this.state.todos, function (todo) {
    			todo.isCompleted = true;
    		});
    		this.setState({
    			toggleStatus : true,
    			viewType: 'all',
    			countActive: this.countActive()
    		});
    	} else {
    		_.map(this.state.todos, function (todo) {
    			todo.isCompleted = !todo.isCompleted;
    		});
    		this.setState({
    			viewType: 'all',
    			countActive: this.countActive()
    		});
    	}
    }

    /*
		This method is called whenever there are any changes in the todos array to count the 
		number of active tasks.
    */
    countActive() {
    	const activeTasks = _.filter(this.state.todos, todo=> todo.isCompleted === false);
    	return _.size(activeTasks);
    }

    countCompleted() {
        const countCompleted = this.state.todos.length - this.countActive();
        return countCompleted;
    }

    /*
		This method decides which array of todos is to be passed to TodosList. It does so by
		switching 'this.state.viewType' and returning the relevant array.
    */
    setTodos() {
    	switch (this.state.viewType){
    		case 'all':
    			return this.state.todos;
    		case 'active':
    			return this.state.activeTodos;
    		case 'completed':
    			return this.state.completeTodos;
    		default: 
    			return this.state.todos;
    	}
    }

    renderViews() {
        if (this.countCompleted() > 0 || this.countActive() > 0){
            return(
                <Views 
                    activeTasks={this.activeTasks.bind(this)}
                    completedTasks={this.completedTasks.bind(this)}
                    allTasks={this.allTasks.bind(this)}
                    clearCompleted={this.clearCompleted.bind(this)}
                    toggleAll={this.toggleAll.bind(this)}
                    countActive={this.state.countActive}
                    countCompleted={this.state.countCompleted}
                />
            );
        }
    }

    render() {
		return (
			<section className="todoapp">
                <header>
				<h1>todos</h1>
				<CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)}/>
				</header>
                <TodosList 
					todos={this.setTodos()} 
					toggleTask={this.toggleTask.bind(this)}
					saveTask={this.saveTask.bind(this)}
					deleteTask={this.deleteTask.bind(this)}
				/>
                {this.renderViews()}
				
			</section>
		);
	}
}