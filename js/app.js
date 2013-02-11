Todos = Ember.Application.create();

Todos.Todo = Ember.Object.extend({
	title: null,
	completed: false
});

Todos.Controller = Ember.Controller.extend({
	todos: Ember.A(),

	init: function()
	{
		var items = this.get('todos');

		items.addObject(Todos.Todo.create({title: 'Item Number 1'}));
		items.addObject(Todos.Todo.create({title: 'Another Item'}));
	},
	
	createTodo: function(title)
	{
		this.get('todos').addObject(Todos.Todo.create({title: title}));
	},

	clearCompleted: function()
	{
		var todos = this.get('todos');

		todos.removeObjects(todos.filterProperty('completed'));
	},

	markAllComplete: function(reversed) {
		this.get('todos').setEach('completed', !reversed);
	},

	countCompleted: function()
	{
		return this.get('todos').filterProperty('completed', true).length
	}.property('todos.@each.completed'),

	remainingCount: function()
	{
		return this.get('todos').filterProperty('completed', false).length
	}.property('todos.@each.completed')
});

Todos.todosController = Todos.Controller.create();


Todos.CreateTodoView = Ember.TextField.extend({
	insertNewline: function()
	{
		var value = this.get('value');

		if (value != null)
		{
			Todos.todosController.createTodo(value);
			this.set('value', '');
		}
	}
});

Todos.MarkAllCompleteView = Ember.Checkbox.extend({
	remainingCountBinding: 'Todos.todosController.remainingCount',

	// disabled: function() 
	// {
	// 	return this.get('remainingCount') === 0
	// }.property('remainingCount'),

	markAllComplete:function() {
		if (this.get('checked')) {
			Todos.todosController.markAllComplete(false);
		} else {
			Todos.todosController.markAllComplete(true);
		}
	}.observes('checked')
});