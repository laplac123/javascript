var todoList = document.querySelector("#todo-list");

function TodoView(dataId, content, isCompleted) {
	this.dataId = dataId;
	this.content = content;
	this.isCompleted = isCompleted;
}

TodoView.prototype.addTodoView = function() {

	var newTodo =
		'<div class="view">' +
		'<input type="checkbox" class="toggle">' +
		'<label for="">' + this.content + '</label>' +
		'<button class="destroy"></button>' +
		'</div>' +
		'<input type="text" class="edit">';

	var newTodoChild, newTodoCheckbox, newTodoContent, newTodoDestroy, newTodoEdit;


	newTodoChild = document.createElement('LI');

	if (this.isCompleted) {
		newTodoChild.className = 'completed';
	}

	newTodoChild.innerHTML = newTodo;
	addEventHandler(newTodoChild, 'dblclick', dblclickEditTodo);

	newTodoChild.setAttribute('data-id', this.dataId);

	newTodoCheckbox = newTodoChild.querySelector('.toggle');
	newTodoCheckbox.checked = this.isCompleted;
	newTodoCheckbox.addEventListener('click', isCheckedTodo);

	newTodoDestroy = newTodoChild.querySelector('.destroy');
	addEventHandler(newTodoDestroy, 'click', delTodo);

	newTodoEdit = newTodoChild.querySelector('.edit');
	addEventHandler(newTodoEdit, 'blur', blurEditTodo);
	addEventHandler(newTodoEdit, 'keypress', enterEditTodo);

	todoList.appendChild(newTodoChild);

	todoInput.value = '';

	if (todoDb.length) {
		toggleAll.style.display = 'inherit';
		footer.style.display = 'block';
	} else {
		toggleAll.style.display = 'none';
		footer.style.display = 'none';
	}
};

TodoView.prototype.delTodoView = function() {
	var delTodoChild = todoList.querySelector('li[data-id="' + this.dataId + '"]');
	todoList.removeChild(delTodoChild);

	if (todoDb.length) {
		toggleAll.style.display = 'inherit';
		footer.style.display = 'block';
	} else {
		toggleAll.style.display = 'none';
		footer.style.display = 'none';
	}
};

TodoView.prototype.editTodoView = function() {
	var editTodoChild = todoList.querySelector('li[data-id="' + this.dataId + '"]'),
		editTodo = editTodoChild.querySelector('.edit');

	editTodoChild.className = 'editing';
	editTodo.value = editTodoChild.getElementsByTagName('LABEL')[0].innerHTML;
	editTodo.focus();
};

TodoView.prototype.updatedTodoView = function() {
	var updatedTodoChild, updatedTodoChildCheckbox;

	updatedTodoChild = todoList.querySelector('li[data-id="' + this.dataId + '"]');
	updatedTodoChildCheckbox = updatedTodoChild.querySelector('.toggle');
	updatedTodoChildCheckbox.checked = this.isCompleted;

	if (this.isCompleted) {
		updatedTodoChild.className = 'completed';
	} else {
		updatedTodoChild.className = '';
	}
	updatedTodoChild.getElementsByTagName('LABEL')[0].innerHTML = this.content;
};

TodoView.prototype.filterAllTodo = function() {
	var oldClassName, newClassName,
		allTodo = todoList.querySelectorAll('.hidden');

	filterAll.className = 'selected';
	filterActive.className = '';
	filterCompleted.className = '';

	for (var i = 0; i < allTodo.length; i++) {
		oldClassName = allTodo[i].className;
		newClassName = oldClassName.replace(' hidden', '');
		allTodo[i].className = newClassName;
	}
};

TodoView.prototype.filterActiveTodo = function() {
	var hasCompletedClass, hasHiddenClass, oldClassName, newClassName,
		activeTodo = todoList.querySelectorAll('li');

	filterAll.className = '';
	filterActive.className = 'selected';
	filterCompleted.className = '';

	for (var i = 0; i < activeTodo.length; i++) {
		hasCompletedClass = activeTodo[i].className.search('completed');
		hasHiddenClass = activeTodo[i].className.search('hidden');

		if (hasCompletedClass >= 0) {
			if (hasHiddenClass < 0) {
				activeTodo[i].className += ' hidden';
			}
		} else {
			oldClassName = activeTodo[i].className;
			newClassName = oldClassName.replace(' hidden', '');
			activeTodo[i].className = newClassName;
		}
	}
};

TodoView.prototype.filterCompletedTodo = function() {
	var hasCompletedClass, hasHiddenClass, oldClassName, newClassName,
		completedTodo = todoList.querySelectorAll('li');

	filterAll.className = '';
	filterActive.className = '';
	filterCompleted.className = 'selected';

	for (var i = 0; i < completedTodo.length; i++) {
		hasCompletedClass = completedTodo[i].className.search('completed');
		hasHiddenClass = completedTodo[i].className.search('hidden');

		if (hasCompletedClass >= 0) {
			oldClassName = completedTodo[i].className;
			newClassName = oldClassName.replace(' hidden', '');
			completedTodo[i].className = newClassName;
		} else {
			if (hasHiddenClass < 0) {
				completedTodo[i].className += ' hidden';
			}
		}
	}
};

TodoView.prototype.itemLeft = function(activeTodoCount) {
	var itemLeft = document.getElementById('item-left');
	itemLeft.innerHTML = activeTodoCount;

	if (activeTodoCount == 0) {
		toggleAll.checked = true;
	} else {
		toggleAll.checked = false;
	}
}

TodoView.prototype.initializeDisplay = function() {
	var localstorage = JSON.parse(localStorage.getItem('todoList')),
		itemLeft = 0;

	if (localstorage) {
		for (var i = 0; i < localstorage.length; i++) {
			if (!localstorage[i].isCompleted) {
				itemLeft++;
			}
			var todo = new TodoView(localstorage[i].dataId, localstorage[i].content, localstorage[i].isCompleted);
			todo.addTodoView();
		}
		document.getElementById('item-left').innerHTML = itemLeft;
	}
}
