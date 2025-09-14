const todoState = ["Develop another yet TODO app", "Create my own framework"];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

function addTodo() {
  const todoName = addTodoInput.value;

  todoState.push(todoName);
  todoList.append(renderTodoInReadMode(todoName));

  addTodoInput.value = "";
  addTodoButton.disabled = true;
}

function removeTodo(i) {
  todoList.replaceChild(
    renderTodoInDoneMode(todoState[i]),
    todoList.childNodes[i]
  );
}

function updateTodo(i, newTodoName) {
  todoState[i] = newTodoName;

  todoList.replaceChild(
    renderTodoInReadMode(newTodoName),
    todoList.childNodes[i]
  );
}

function renderTodoInEditMode(todoName) {
  const todoElementLi = document.createElement("li");
  const todoElementInput = document.createElement("input");
  const todoElementSaveButton = document.createElement("button");
  const todoElementCancelButton = document.createElement("button");

  todoElementInput.type = "text";
  todoElementInput.value = todoName;
  todoElementLi.append(todoElementInput);

  todoElementSaveButton.textContent = "Save";
  todoElementSaveButton.addEventListener("click", () => {
    const i = todoState.indexOf(todoName);

    updateTodo(i, todoElementInput.value);
  });
  todoElementLi.append(todoElementSaveButton);

  todoElementCancelButton.textContent = "Cancel";
  todoElementCancelButton.addEventListener("click", () => {
    const i = todoState.indexOf(todoName);

    todoList.replaceChild(
      renderTodoInReadMode(todoName),
      todoList.childNodes[i]
    );
  });
  todoElementLi.append(todoElementCancelButton);

  return todoElementLi;
}

function renderTodoInReadMode(todoName) {
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
}

function renderTodoInDoneMode(todoName) {
  const todoElementLi = document.createElement("li");
  const todoElementSpan = document.createElement("span");
  const todoElementStriketrough = document.createElement("s");

  todoElementStriketrough.textContent = todoName;
  todoElementSpan.append(todoElementStriketrough);
  todoElementLi.append(todoElementSpan);

  return todoElementLi;
}

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
