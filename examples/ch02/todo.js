const todoState = ["Develop another yet TODO app", "Create my own framework"];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

const addTodo = () => {
  console.log(addTodoInput.value);
  // TODO
};

const removeTodo = (i) => {
  // TODO
  console.log("deleted");
};

const renderTodoInEditMode = (todoName) => {
  return document.createElement("hr");
};

const renderTodoInReadMode = (todoName) => {
  const todoElementLi = document.createElement("li");
  const todoElementSpan = document.createElement("span");
  const todoElementButton = document.createElement("button");

  todoElementSpan.textContent = todoName;
  todoElementSpan.addEventListener("dblclick", () => {
    const i = todoState.indexOf(todoName);

    todoList.replaceChild(
      renderTodoInEditMode(todoName),
      todoList.childNodes[i]
    );
  });
  todoElementLi.append(todoElementSpan);

  todoElementButton.textContent = "Done";
  todoElementButton.addEventListener("click", () => {
    const i = todoState.indexOf(todoName);

    removeTodo(i);
  });
  todoElementLi.append(todoElementButton);

  return todoElementLi;
};

addTodoInput.addEventListener(
  "input",
  () => (addTodoButton.disabled = addTodoInput.value.length < 3)
);

addTodoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && addTodoInput.value.length >= 3) {
    addTodo();
  }
});

addTodoButton.addEventListener("click", () => addTodo());

todoState.forEach((todo) => todoList.append(renderTodoInReadMode(todo)));
