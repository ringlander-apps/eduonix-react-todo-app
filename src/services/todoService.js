/**
 *
 */
class TodoService {
  constructor() {
    this.storage_key = "mytodo-app-todos";
  }
  /**
   *
   */
  getTodos() {
    let todos = JSON.parse(localStorage.getItem(this.storage_key) || "[]");
    return todos;
  }
  /**
   *
   * @param {*} todos
   */
  saveTodos(todos) {
    localStorage.setItem(this.storage_key, JSON.stringify(todos));
  }
  saveTodo(todo) {}
}
export default TodoService;
