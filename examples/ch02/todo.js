const todoState = ['Develop another yet TODO app', 'Create my own framework'];

const addTodoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

const renderTodoInReadMode = (todoName) => {
    console.log(todoName)
    // TODO
};

const addTodo = () => {
    console.log(addTodoInput.value)
    // TODO
}

todoState.forEach((todo) => todoList.append(renderTodoInReadMode(todo)));

addTodoInput.addEventListener('input', () => addTodoButton.disabled = addTodoInput.value.length < 3)

addTodoInput.addEventListener('keydown', ({ key }) => {
    if (key === 'Enter' && addTodoInput.value.length >= 3) {
        addTodo()
    }
})

addTodoButton.addEventListener('click', () => addTodo())



