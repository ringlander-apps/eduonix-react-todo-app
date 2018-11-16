import React, { Component } from "react";
import TodoService from "../../services/todoService";

import "./TodoList.css";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  todoService = null;

  componentWillMount() {
    this.todoService = new TodoService();
    this.setState({ todos: this.todoService.getTodos() });
  }

  state = {
    todos: []
  };
  /***
   *
   */
  handleItemCompleted = (itemId, isCompleted) => {
    //Get todos in state
    const { todos } = this.state;

    //Find the todo to edit
    let todo = todos.find(todo => {
      return todo.id === itemId;
    });

    todo.completed = isCompleted;

    //Call save
    this.saveTodos();
    //Refresh todos from the localstorage
    this.setState({ todos: this.todoService.getTodos() });
  };
  handleDescriptionChanged = (itemId, description) => {
    console.log(itemId, description);
    const { todos } = this.state;

    let todo = todos.find(t => {
      return t.id === itemId;
    });

    todo.description = description;
    this.saveTodos();
    this.setState({ todos: this.todoService.getTodos() });
  };
  /***
   *
   */
  saveTodos = () => {
    this.todoService.saveTodos(this.state.todos);
  };
  /**
   *
   */
  handleAddTodo = event => {
    event.preventDefault();
    const { todos } = this.state;
    const id = this.getNextId();
    const title = event.target.elements.todoTitle.value;
    const description = event.target.elements.todoDescription.value;

    todos.push({
      title,
      id,
      completed: false,
      description
    });
    this.setState({ todos });
    event.target.elements.todoTitle.value = "";
    event.target.elements.todoDescription.value = "";
    this.saveTodos();
  };
  /**
   *
   */
  getNextId = () => {
    const { todos } = this.state;
    return todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  };
  /***
   *
   */
  handleDeleteClick = itemId => {
    const { todos } = this.state;

    const result = todos.filter(t => {
      return t.id !== itemId;
    });

    this.setState({ todos: result });
    this.saveTodos();
  };

  render() {
    const { todos } = this.state;
    const listItems = todos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteClick={() => this.handleDeleteClick(todo.id)}
          onSaveClick={() => this.handleSaveEditedTodo}
          onCompletedChange={this.handleItemCompleted}
          onDescriptionChange={this.handleDescriptionChanged}
        />
      );
    });
    return (
      <div className="container">
        <div className="list-header">
          <h1>Tasks for the day!</h1>
          <p>@ringlander-dev</p>
          <div className="add-todo-container">
            <form onSubmit={event => this.handleAddTodo(event)}>
              <div className="input-group">
                <label htmlFor="todoTitle">Title</label>
                <input
                  className="text-input"
                  id="todoTitle"
                  type="text"
                  name="todoTitle"
                  placeholder="What should you do?!?"
                />
              </div>
              <div className="input-group">
                <label htmlFor="todoDescription">Description</label>
                <textarea
                  className="text-input"
                  id="todoDescription"
                  type="textarea"
                  rows="2"
                  name="todoDescription"
                  placeholder="Brief description"
                />
              </div>
              <input className="submit-button" type="submit" value="Add todo" />
            </form>
          </div>
        </div>
        <div className="list-body">
          <div className="todo-list">
            {todos.length > 0 ? (
              <ul>{listItems}</ul>
            ) : (
              <div>
                <h1 style={{ opacity: 0.5 }}>Keep calm and relax</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
