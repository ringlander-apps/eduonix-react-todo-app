import React, { Component } from "react";
import "./TodoItem.css";

class TodoItem extends Component {
  state = {
    isExpanded: false,
    todoIsEdited: false,
    todoDescription: ""
  };

  componentWillMount() {
    const { description } = this.props.todo;
    this.setState({ todoDescription: description });
  }

  descriptionChanged = (id, event) => {
    this.setState({ todoDescription: event.target.value });
    const { onDescriptionChange } = this.props;
    onDescriptionChange(id, event.target.value);
  };
  /***
   *
   */
  completedChange = (id, completed) => {
    const { onCompletedChange } = this.props;
    onCompletedChange(id, completed);
  };
  /**
   *
   */
  expandCollapseTodo = event => {
    const { isExpanded } = this.state;
    const icon = document.getElementById(event.target.id);

    icon.className = isExpanded ? "fas fa-sort-down" : "fas fa-sort-up";

    this.setState({ isExpanded: !isExpanded });
  };

  render() {
    const { todo, onDeleteClick, onSaveClick } = this.props;
    const { isExpanded, todoIsEdited, todoDescription } = this.state;

    return (
      <li>
        <div className="item-card">
          <div className="item-card-title">
            <h3>{todo.title}</h3>
            <div className="item-card-expand-icon">
              <i
                id={"iconExpandCollapse_" + todo.id}
                onClick={this.expandCollapseTodo}
                style={{
                  cursor: "pointer"
                }}
                className="fas fa-sort-down"
              />
            </div>
            <div className="item-card-delete-action">
              <i
                style={{ cursor: "pointer" }}
                onClick={onDeleteClick}
                className="delete far fa-times-circle fa-2x"
              />
            </div>
          </div>
          {isExpanded ? (
            <div className="item-card-description">
              <form>
                <textarea
                  onChange={this.descriptionChanged.bind(this, todo.id)}
                  className="edit-text-details"
                  id="todoDescription"
                  type="textarea"
                  rows="2"
                  name="todoDescription"
                  value={todoDescription}
                />
              </form>
            </div>
          ) : null}

          <div className="item-card-actions">
            <div className="check-wrapper">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={this.completedChange.bind(
                  this,
                  todo.id,
                  !todo.completed
                )}
                id="completed"
                name="completed"
              />
              <label htmlFor="completed">Completed</label>
            </div>
            <div className="actions-wrapper">
              {todoIsEdited ? (
                <i
                  style={{ cursor: "pointer" }}
                  onClick={onSaveClick}
                  className="save far fa-save fa-2x"
                />
              ) : null}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default TodoItem;
