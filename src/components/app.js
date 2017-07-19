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

    //Creates a random UUID
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

	//Toggles a task using its UUID
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

    
    //Receives uuid from 'TodosListItem', and removes it from the 'todos' array.
    deleteTask(uuid) {
        let newTodos = this.state.todos.filter(todo => todo.uuid !== uuid);
        this.setState({ 
            todos: newTodos,
            toggleStatus : false,
            countActive: this.countActive(),
            countCompleted: this.countCompleted() 
        });
    }

    
    //Receives uuid and new task. Searches for uuid and replaces the old task with the 'newTask'.
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

    activeTasks(){
        this.setState({
            viewType: 'active'
        })
    }

    completedTasks() {    	
    	this.setState({
    		viewType: 'completed'
    	});
    }
  
    allTasks() {
    	this.setState({ 
    		todos: this.state.todos,
    		viewType: 'all' 
    	});
    }

    //Filters out completed tasks and stores new array in 'todos'
    clearCompleted() {
        var todoNow = this.state.todos.filter(function(todo) {
                if (todo.isCompleted === false){
                    return todo;
                }
            });
        
        this.setState({
    		viewType: 'all',
            todos: todoNow,
    		countActive: this.countActive(),
            countCompleted: this.countCompleted()
    	});
    }

    //Toggles isCompleted property of all todos
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

    //Counts active and completed tasks
    countActive() {
    	const activeTasks = this.state.todos.filter(todo=> todo.isCompleted === false);
    	return activeTasks.length;
    }

    countCompleted() {
        const countCompleted = this.state.todos.length - this.countActive();
        return countCompleted;
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