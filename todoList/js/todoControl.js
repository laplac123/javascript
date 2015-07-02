addEventHandler(todoInput, 'keypress', addTodo);
addEventHandler(toggleAll, 'click', checkAllTodo);
addEventHandler(filterAll, 'click', filterAllTodo);
addEventHandler(filterActive, 'click', filterActiveTodo);
addEventHandler(filterCompleted, 'click', filterCompletedTodo);
addEventHandler(clearCompleted, 'click', clearCompletedTodo);

// Add a new-todo
function addTodo(e) {
	var keypressed, todoInput, todoModel;

	keypressed = e.keyCode || e.which;
	todoInput = document.getElementById('new-todo').value;

	if (keypressed == 13 && todoInput) {
		dataId++;
		todoModel = new TodoModel(dataId, todoInput, false);
		todoModel.addTodo();
		todoModel.activeTodoCount();

		if (filterActive.className == 'selected') {
			filterActiveTodo();
		} else if (filterCompleted.className == 'selected') {
			filterCompletedTodo();
		}
	}
}

// Delete a todo
function delTodo(e) {
	var delTodoChildId, todoModel;

	delTodoChildId = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
	todoModel = new TodoModel();
	todoModel.delTodo(delTodoChildId);
	todoModel.activeTodoCount();
}

// Edit a todo

function dblclickEditTodo(e) {
	var editTodoChild, editTodoChildId, editTodoChildContent, editTodoChildChecked, todoView;

	editTodoChild = e.currentTarget;
	editTodoChildId = editTodoChild.getAttribute('data-id');
	editTodoChildContent = editTodoChild.getElementsByTagName('LABEL')[0].innerHTML;
	editTodoChildChecked = editTodoChild.querySelector('.toggle').checked;

	todoView = new TodoView(editTodoChildId, editTodoChildContent, editTodoChildChecked);
	todoView.editTodoView();
}

function blurEditTodo(e) {
	var oldValue, newValue, editTodoChild, editTodoChildId, editTodoChildChecked, todoModel;

	editTodoChild = e.currentTarget.parentNode;
	editTodoChildId = editTodoChild.getAttribute('data-id');
	oldValue = editTodoChild.getElementsByTagName('LABEL')[0].innerHTML;
	newValue = e.currentTarget.value;
	editTodoChildChecked = editTodoChild.querySelector('.toggle').checked;

	todoModel = new TodoModel(editTodoChildId, newValue, editTodoChildChecked);
	if (!newValue) {
		todoModel.delTodo(editTodoChildId);
	} else {
		todoModel.updateTodo();
	}
	todoModel.activeTodoCount();
}

function enterEditTodo(e) {
	var oldValue, newValue, editTodoChild, editTodoChildId, editTodoChildChecked, todoModel,
		keypressed = e.keyCode || e.which;

	if (keypressed == 13) {
		editTodoChild = e.currentTarget.parentNode;
		editTodoChildId = editTodoChild.getAttribute('data-id');
		oldValue = editTodoChild.getElementsByTagName('LABEL')[0].innerHTML;
		newValue = e.currentTarget.value;
		editTodoChildChecked = editTodoChild.querySelector('.toggle').checked;

		todoModel = new TodoModel(editTodoChildId, newValue, editTodoChildChecked);
		if (!newValue) {
			todoModel.delTodo();
		} else {
			todoModel.updateTodo();
		}
		todoModel.activeTodoCount();
	}
}

function isCheckedTodo(e) {
	var todoIsChecked, todoChild, todoChildId, todoContent, todoModel;

	todoChild = e.currentTarget.parentNode.parentNode;
	todoChildId = todoChild.getAttribute('data-id');
	todoIsChecked = e.currentTarget.checked;
	todoContent = todoChild.getElementsByTagName('LABEL')[0].innerHTML;

	todoModel = new TodoModel(todoChildId, todoContent, todoIsChecked);
	todoModel.updateTodo();
	todoModel.activeTodoCount();

	if (filterActive.className == 'selected') {
		filterActiveTodo();
	} else if (filterCompleted.className == 'selected') {
		filterCompletedTodo();
	}
}

function checkAllTodo() {
	var toggleAllChecked, todoModel;

	toggleAllChecked = toggleAll.checked;
	todoModel = new TodoModel();

	if (toggleAllChecked) {
		todoModel.updateAllTodoChecked();
	} else {
		todoModel.updateAllTodoUnchecked();
	}
	todoModel.activeTodoCount();

	if (filterActive.className == 'selected') {
		filterActiveTodo();
	} else if (filterCompleted.className == 'selected') {
		filterCompletedTodo();
	}
}

function filterAllTodo() {
	var todoView = new TodoView();
	todoView.filterAllTodo();
}

function filterActiveTodo() {
	var todoView = new TodoView();
	todoView.filterActiveTodo();
}

function filterCompletedTodo() {
	var todoView = new TodoView();
	todoView.filterCompletedTodo();
}

function clearCompletedTodo() {
	var todoModel = new TodoModel();
	todoModel.clearCompletedTodo();
}
