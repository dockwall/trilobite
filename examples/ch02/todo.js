const todoState = [
  { description: "Develop another yet TODO app", isDone: false },
  { description: "Create my own framework", isDone: false },
];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

function isTodoExists(description) {
  const preparedState = todoState.map(({ description }) =>
    description.trim().toLowerCase()
  );
  return preparedState.includes(description.trim().toLowerCase());
}

function addTodo() {
  if (isTodoExists(addTodoInput.value)) {
    alert("This todo already exists!");
    return;
  }

  const newTodo = { description: addTodoInput.value, isDone: false };

  todoState.push(newTodo);
  todoList.append(renderTodoInReadMode(newTodo));

  addTodoInput.value = "";
  addTodoButton.disabled = true;
}

function removeTodo(i) {
  todoState[i].isDone = true;

  todoList.replaceChild(
    renderTodoInReadMode(todoState[i]),
    todoList.childNodes[i]
  );
}

function updateTodo(i, newTodoName) {
  todoState[i].description = newTodoName;

  todoList.replaceChild(
    renderTodoInReadMode(todoState[i]),
    todoList.childNodes[i]
  );
}

function renderTodoInEditMode(todo) {
  const todoElementLi = document.createElement("li");
  const todoElementInput = document.createElement("input");
  const todoElementSaveButton = document.createElement("button");
  const todoElementCancelButton = document.createElement("button");

  todoElementInput.type = "text";
  todoElementInput.value = todo.description;
  todoElementLi.append(todoElementInput);

  todoElementSaveButton.textContent = "Save";
  todoElementSaveButton.addEventListener("click", () => {
    const i = todoState.indexOf(todo);

    updateTodo(i, todoElementInput.value);
  });
  todoElementLi.append(todoElementSaveButton);

  todoElementCancelButton.textContent = "Cancel";
  todoElementCancelButton.addEventListener("click", () => {
    const i = todoState.indexOf(todo);

    todoList.replaceChild(renderTodoInReadMode(todo), todoList.childNodes[i]);
  });
  todoElementLi.append(todoElementCancelButton);

  return todoElementLi;
}

function renderTodoInReadMode(todo) {
  const todoElementLi = document.createElement("li");
  const todoElementSpan = document.createElement("span");

  todoElementSpan.textContent = todo.description;

  if (todo.isDone) {
    todoElementSpan.classList.add("done");
  } else {
    todoElementSpan.addEventListener("dblclick", () => {
      const i = todoState.indexOf(todo);

      todoList.replaceChild(renderTodoInEditMode(todo), todoList.childNodes[i]);
    });
  }
  todoElementLi.append(todoElementSpan);

  if (!todo.isDone) {
    const todoElementButton = document.createElement("button");

    todoElementButton.textContent = "Done";
    todoElementButton.addEventListener("click", () => {
      const i = todoState.indexOf(todo);

      removeTodo(i);
    });
    todoElementLi.append(todoElementButton);
  }

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
