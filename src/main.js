import './main.css';
import './ReactApp'; // import to use React for solution
import MockAPI from './MockApi/index';

const api = new MockAPI();

// create two divs - pending and done
const mainDiv  = document.getElementById("app");

const pending = document.createElement("div");
pending.classList.add("pending");
mainDiv.append(pending);

const done = document.createElement("div");
done.classList.add("done");
mainDiv.append(done);

// add dragging option
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const task = document.getElementById(data);
  const checkbox = task.querySelector(".checkbox");
  const parent = ev.target.parentNode;

  if (ev.target.id === "dropZone2") {
    task.classList.add("completed");
    for (const key in api.todos) {
      if (parseInt(data, 10)  === api.todos[key].id)
        api.todos[key].done = true;
    }
  }

  if (ev.target.id === "dropZone1") {
    task.classList.remove("completed");
    for (const key in api.todos) {
      if (parseInt(data, 10) === api.todos[key].id)
        api.todos[key].done = false;
    }
  }

  if (task.classList.contains("completed")) {
    checkbox.checked = true;
    parent.insertBefore(task, ev.target);
  }
  else {
    checkbox.checked = false;
    parent.insertBefore(task, ev.target);
  }
}

function addDragging(){
  const dragInPending = document.createElement("div");
  dragInPending.innerText = "Drag n'drop here";
  dragInPending.classList.add("drag");
  dragInPending.setAttribute("id", "dropZone1");
  pending.appendChild(dragInPending);
  dragInPending.addEventListener("dragover", allowDrop);
  dragInPending.addEventListener("drop", drop);

  const dragInDone = document.createElement("div");
  dragInDone.innerText = "Drag n'drop here";
  dragInDone.classList.add("drag");
  dragInDone.setAttribute("id","dropZone2");
  done.appendChild(dragInDone);
  dragInDone.addEventListener("dragover", allowDrop);
  dragInDone.addEventListener("drop", drop);
}

function DisplayTodos () {
  const pendingList = document.querySelector(".pending");
  pendingList.innerHTML = "<h2>Todo</h2>";

  const doneList = document.querySelector(".done");
  doneList.innerHTML = "<h2>Done</h2>";

  api.todos.forEach(todo => {
    const todoItem = document.createElement("div");

    todoItem.classList.add("todo-item");
    todoItem.setAttribute("draggable", "true");
    todoItem.setAttribute("id", `${todo.id}`);
    todoItem.addEventListener("dragstart", drag);
    const icon = document.createElement('i');
    icon.className = `${todo.icon}`;
    todoItem.appendChild(icon);

    const task = document.createElement('div');
    task.innerHTML = `<h3>${todo.task}</h3>`;
    task.classList.add("task");
    todoItem.appendChild(task);

    const description = document.createElement('div');
    description.innerHTML = `${todo.description}`;
    description.classList.add("desc");
    task.appendChild(description);

    const input = document.createElement('input');
    input.type = "checkbox";
    input.classList.add("checkbox");
    todoItem.appendChild(input);

    if (todo.done) {
			todoItem.classList.add('completed');
		}

    input.addEventListener('change', (e) => {
      todo.done = e.target.checked;
      if (e.target.checked) {
				todoItem.classList.add("completed");
			} else {
				todoItem.classList.remove("completed");
			}
      DisplayTodos();
    });

    if (todoItem.classList.contains("completed")){
      input.checked = true;
      doneList.appendChild(todoItem);
    } else {
      input.checked = false;
      pendingList.appendChild(todoItem);
    }
  });
  addDragging();
}

window.addEventListener('load', () => {
    DisplayTodos();
});
