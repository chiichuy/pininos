var Backbone	= require('backbone'),
	Todos		= require('../collections/todos'),
	Todo 		= require('../models/todo'),
	TodosView 	= require('../views/todos'),
	TodoFormView= require('../views/todoForm'),
	$			= require('jquery');

module.exports = Backbone.Router.extend({
	routes:{
		"":"index",
		"test/:name":"test"
	},
	initialize: function(){
		this.current = {},
		this.jsonData = {},
		this.todos = new Todos();
		this.todo = new TodosView({collection:this.todos});
		console.log("New todo");
		this.todoForm = new TodoFormView({collection:this.todos});
		console.log("despues todo");
		Backbone.history.start();
	},
	index:function(){
		this.fetchData();
	},
	test:function(name){
		console.log(name);
	},
	fetchData:function(){
		var self = this;
		return $.getJSON('data.json').then(function (data){
			self.jsonData = data;
			for(var i=0;i< data.todos.length;i++){
				self.addTodo(data.todos[i].todo);
			}
		});
	},
	addTodo: function(todo){
		this.todos.add(new Todo({
			todo:todo,
			author:"chiichuy"
		}));
	}

});