import React from 'react';

import TodosList from './todos-list'
import CreateTodo from './create-todo'
import Views from './views'

const todos = [];
const viewType = 'all';
const toggleStatus = false;
const countActive = 0;
const countComplete = 0;

export default class App extends React.Component {
	
    constructor(props){
		super(props);

		this.state = {
			todos, 
			viewType, 
			toggleStatus, 
			countActive,
            countComplete
		};
	}

    createUUID() {
        var i, random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                    .toString(16);
            }

        return uuid;
    }

    //Receives a task (String) from 'CreateTodo' and adds it to the array 'todos'.
	createTask(task) {
        var uuid = this.createUUID();
		this.state.todos.push({
			task,
			isCompleted: false,
            uuid: uuid
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
	toggleTask(uuid) {
        let foundTodo = this.state.todos.find(todo => todo.uuid === uuid);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ 
        	todos: this.state.todos,
        	toggleStatus : false,
        	countActive: this.countActive(),
            countCompleted: this.countCompleted()
        });
    }

    
    //Receives a task (String) from 'TodosListItem', and removes it from the 'todos' array.
    deleteTask(uuid) {
        let newTodos = this.state.todos.filter(todo => todo.uuid !== uuid);
        this.setState({ 
            todos: newTodos,
            toggleStatus : false,
            countActive: this.countActive(),
            countCompleted: this.countCompleted() 
        });
    }

    
    /*
		Receives 2 tasks (String) from 'TodosListItem', searches for the 'oldTask' from the
		'todos' array and replaces it with the 'newTask'.
    */
    saveTask(oldUUID, newTask) {
    	const foundTodo = this.state.todos.find(todo => todo.uuid === oldUUID);
    	foundTodo.task = newTask;
    	this.setState({ 
    		todos: this.state.todos,
    		toggleStatus : false,
    		countActive: this.countActive(),
            countCompleted: this.countCompleted() 
    	});
    }    

    /*
		This method is called from 'Views' when the 'Completed' button is clicked. It filters all
		the completed tasks from the 'todos' array. It then updates the value of 'completedTodos' in
		the state.
    */
    completedTasks() {    	
    	this.setState({
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
        var todoNow = this.state.todos.filter(function(todo) {
                if (todo.isCompleted === false){
                    return todo;
                }
            });
        
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
    		this.state.todos.map(function (todo) {
    			todo.isCompleted = true;
    		});
    		this.setState({
    			toggleStatus : true,
    			viewType: 'all',
    			countActive: this.countActive()
    		});
    	} else {
    		this.state.todos.map(function (todo) {
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
    	const activeTasks = this.state.todos.filter(todo=> todo.isCompleted === false);
    	return activeTasks.length;
    }

    countCompleted() {
        const countCompleted = this.state.todos.length - this.countActive();
        return countCompleted;
    }

    /*
		This method decides which array of todos is to be passed to TodosList. It does so by
		switching 'this.state.viewType' and returning the relevant array.
    */

    activeTasks(){
        this.setState({
            viewType: 'active'
        })
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
                <CreateTodo 
                    todos={this.state.todos} 
                    createTask={this.createTask.bind(this)}
                />
    			
                <TodosList 
                    toggleAll={this.toggleAll.bind(this)}
					todos={this.state.todos} 
					toggleTask={this.toggleTask.bind(this)}
					saveTask={this.saveTask.bind(this)}
					deleteTask={this.deleteTask.bind(this)}
                    viewType={this.state.viewType}
				/>
                {this.renderViews()}
				
			</section>
		);
	}
}