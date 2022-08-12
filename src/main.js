import './main.css';
import './ReactApp'; // import to use React for solution
import MockAPI from './MockApi/index';

const api = new MockAPI();

function DisplayTodos () {
  const todoList = document.querySelector("#app");
  console.log(todoList);
  todoList.innerHTML = "";

  api.todos.forEach(todo => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const task = document.createElement('div');
    const description = document.createElement('div');
    const icon = document.createElement('i');

    task.innerHTML = `<input type="text" value="${todo.task}" readonly>`;
    description.innerHTML = `<input type="text" value="${todo.description}" readonly>`;

    task.appendChild(description);
    todoItem.appendChild(task);
    todoList.appendChild(todoItem);

  });
}

window.addEventListener('load', () => {
  DisplayTodos();
});

// function createLi(className){
//   const li= document.createElement("li");
//   li.classList.add(className);
//   return li;
// }

// api.todos.forEach(item => {
//   console.log(item.task);
// })

// function showTasks (list) {
//   for (list)
// }
// function createList(todos) {
//   const liPending = document.createElement("li");
//   ulPending.append(liPending);
//   liPending.classList.add("liPending");
//   liPending.innerHTML = todos[0].task;
// }

// for (let i = 0, l = api.todos.length; i < l; i++) {
//     const obj = api.todos[i];
//     console.log(obj);
// }

// create two lists for tasks: "pending" and "done"
// const node = document.getElementById("app");
// const mainDiv = document.createElement("div");
// node.append(mainDiv);
//
// const pending = document.createElement("div");
// const done = document.createElement("div");
// mainDiv.append(pending);
// mainDiv.append(done);
//
// function createUl(className){
//   const ul = document.createElement("ul");
//   ul.classList.add(className);
//   return ul;
// }
// pending.append(createUl("pending"));
// done.append(createUl("done"));
