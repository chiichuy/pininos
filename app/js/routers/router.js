var Backbone	= require('backbone'),
	Todos		= require('../collections/todos'),
	Pacientes		= require('../collections/pacientes'),
	Todo 		= require('../models/todo'),
	Paciente 	= require('../models/paciente'),
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
		this.pacientes = new Pacientes();
		this.todo = new TodosView({collection:this.todos});
		console.log("New todo");
		this.todoForm = new TodoFormView({collection:this.todos});
		console.log("despues todo");
		var backboneSync = Backbone.sync;
	    Backbone.sync = function (method, model, options) {
	        options.headers = {'Authorization': 'Basic ' + btoa("chuy:chiichuy")};

	        if (!options.crossDomain) {
		      options.crossDomain = true;
		    }
		    if (!options.xhrFields) {
		      options.xhrFields = {withCredentials:true};
		    }

	        
	        backboneSync(method, model, options);
	    };

		Backbone.history.start();

	},
	index:function(){
		this.fetchData();
		this.fetchPaciente();
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
	fetchPaciente:function(){
		this.pacientes.fetch();
		console.log(this.pacientes.length);
	},
	addTodo: function(todo){
		this.todos.add(new Todo({
			todo:todo,
			author:"chiichuy"
		}));
	}

});