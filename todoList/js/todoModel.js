function TodoModel(dataId, content, isCompleted) {
	this.dataId = dataId;
	this.content = content;
	this.isCompleted = isCompleted;
}


TodoModel.prototype.addTodo = function() {
	var newTodo, todoView;

	newTodo = new TodoModel(this.dataId, this.content, this.isCompleted);
	todoDb.push(newTodo);

	addLocalStorage(newTodo);

	todoView = new TodoView(this.dataId, this.content, this.isCompleted);
	todoView.addTodoView();
};

TodoModel.prototype.delTodo = function(dataId) {
	var todoView;

	for (var i = 0; i < todoDb.length; i++) {
		if (todoDb[i].dataId == dataId) {

			todoView = new TodoView(todoDb[i].dataId);

			todoDb.splice(i, 1);

			delLocalStorage(dataId);

			todoView.delTodoView();
		}
	}
};

TodoModel.prototype.updateTodo = function() {
	var todoView;
	for (var i = 0; i < todoDb.length; i++) {
		if (todoDb[i].dataId == this.dataId) {

			todoDb[i].content = this.content;
			todoDb[i].isCompleted = this.isCompleted;

			updateLocalStorage(todoDb[i].dataId, todoDb[i].content, todoDb[i].isCompleted);

			todoView = new TodoView(todoDb[i].dataId, todoDb[i].content, todoDb[i].isCompleted);
			todoView.updatedTodoView();

			break;
		}
	}
};

TodoModel.prototype.updateAllTodoChecked = function() {
	var todoView;

	for (var i = 0; i < todoDb.length; i++) {

		todoDb[i].isCompleted = true;
		updateAllTodoCheckedLocalStorage();

		todoView = new TodoView(todoDb[i].dataId, todoDb[i].content, todoDb[i].isCompleted);
		todoView.updatedTodoView();
	}
};

TodoModel.prototype.updateAllTodoUnchecked = function() {
	var todoView;

	for (var i = 0; i < todoDb.length; i++) {

		todoDb[i].isCompleted = false;
		updateAllTodoUncheckedLocalStorage();

		todoView = new TodoView(todoDb[i].dataId, todoDb[i].content, todoDb[i].isCompleted);
		todoView.updatedTodoView();
	}
};

TodoModel.prototype.activeTodoCount = function() {
	var activeTodo = 0,
		todoView;

	for (var i = 0; i < todoDb.length; i++) {
		if (!todoDb[i].isCompleted) {
			activeTodo++;
		}
	}

	todoView = new TodoView();
	todoView.itemLeft(activeTodo);
};

TodoModel.prototype.clearCompletedTodo = function() {
	var completedTodoList = [];

	for (var i = 0; i < todoDb.length; i++) {
		if (todoDb[i].isCompleted) {
			completedTodoList.push(todoDb[i].dataId);
		}
	}

	for (var i = 0; i < completedTodoList.length; i++) {
		this.delTodo(completedTodoList[i]);
	}
};
