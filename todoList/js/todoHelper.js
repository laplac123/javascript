
var todoInput = document.getElementById('new-todo'),
	toggleAll = document.getElementById('toggle-all'),
	filterAll = document.getElementById('filter-all'),
	filterActive = document.getElementById('filter-active'),
	filterCompleted = document.getElementById('filter-completed'),
	clearCompleted = document.getElementById('clear-completed'),
	footer = document.getElementById('footer'),
	dataId,
	todoDb = [],
	lastDataId;

// Set initialize for filter is filter-all
filterAll.className = 'selected';

// Check quantity of todo in localStorage
todoDb = JSON.parse(localStorage.getItem('todoList')) || [];
if (todoDb.length) {
	lastDataId = todoDb[todoDb.length - 1].dataId;
}

//Set ID-start
if (lastDataId) {
	dataId = lastDataId;
} else {
	dataId = 0;
}

/**
 * Add an event
 * In Internet Explorer use attachEvent()
 * On other browsers use addEventListener()
 */
function addEventHandler(node, eventHandler, func) {
	if (typeof node.addEventListener === 'function') {
		node.addEventListener(eventHandler, func);
	} else {
		node.attachEvent('on' + eventHandler, func);
	}

}

// Add todo into local storage
function addLocalStorage(newTodo) {
	var oldTodoDb = JSON.parse(localStorage.getItem('todoList')) || [];
	oldTodoDb.push(newTodo);
	localStorage.setItem('todoList', JSON.stringify(oldTodoDb));
}

// Delete todo from local storage
function delLocalStorage(dataId) {
	var oldTodoDb = JSON.parse(localStorage.getItem('todoList')) || [];
	for (var i = 0; i < oldTodoDb.length; i++) {
		if (oldTodoDb[i].dataId == dataId) {
			oldTodoDb.splice(i, 1);
			localStorage.setItem('todoList', JSON.stringify(oldTodoDb));

			break;
		}
	}
}

// Update todo in local storage
function updateLocalStorage(dataId, content, isCompleted) {
	var oldTodoDb = JSON.parse(localStorage.getItem('todoList')) || [];
	for (var i = 0; i < oldTodoDb.length; i++) {
		if (oldTodoDb[i].dataId == dataId) {
			oldTodoDb[i].content = content;
			oldTodoDb[i].isCompleted = isCompleted;
			localStorage.setItem('todoList', JSON.stringify(oldTodoDb));

			break;
		}
	}
}

// Update isCompleted of all todo in Local Storage to TRUE value
function updateAllTodoCheckedLocalStorage() {
	var oldTodoDb = JSON.parse(localStorage.getItem('todoList')) || [];
	for (var i = 0; i < oldTodoDb.length; i++) {
		oldTodoDb[i].isCompleted = true;
	}
	localStorage.setItem('todoList', JSON.stringify(oldTodoDb));
}

// Update isCompleted of all todo in Local Storage to FALSE value
function updateAllTodoUncheckedLocalStorage() {
	var oldTodoDb = JSON.parse(localStorage.getItem('todoList')) || [];
	for (var i = 0; i < oldTodoDb.length; i++) {
		oldTodoDb[i].isCompleted = false;
	}
	localStorage.setItem('todoList', JSON.stringify(oldTodoDb));
}
