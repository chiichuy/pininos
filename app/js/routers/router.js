var Backbone	= require('backbone'),
	Todos		= require('../collections/todos'),
	Pacientes	= require('../collections/pacientes'),
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

		var sync = Backbone.sync;
		Backbone.sync = function(method,model,options){
			options.headers = {
				'Authorization' : 'Bearer a0ffa788583cfbdc8b1d24e59597d28b40ecdd40'
			};
			return sync(method,model,options);
		};
	    /*Backbone.sync = function (method, model) {
	        var basic = 'Basic  ' + btoa("chuy:chiichuy");
	        var type = method; 
	        switch(method){
	        	case 'create':
	        		type = 'POST';
	        		break;
	        	case 'read':
	        		type = 'GET';
	        		break;

	        	case 'update':
	        		type = 'PUT';
	        		break;
	        }
	       	
		    var modelJSON = (method === 'create' || method === 'update') ?  
		                    JSON.stringify(model.toJSON()) : null;  
		  
        	var base64 = btoa("chuy" + ":" + "chiichuy");
		    // Default JSON-request options.  
		    var params = {  
		     	url: model.url,  
		     	data: modelJSON,
			    type: type,
  				dataType: 'json',
		    };  
		  
		// I have removed the code handling emulateJSON and emulateHTTP to make this shorter  
		  
		    // Make the request.  
		   // $.sup^port.cors = true;
		    return $.ajax(params);
	    };*/

		Backbone.history.start();

	},
	index:function(){
		//this.fetchData();
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
		console.log("fetching paciente")
		var self = this;
		var x = this.pacientes.fetch({
			success: function(){
				var pacientes = self.pacientes.toJSON();
	        	for(var i=0;i<pacientes.length;i++){
	        		self.addTodo(pacientes[i].nombre);
				}
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