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
	    Backbone.sync = function (method, model) {
	        var basic = 'Basic  ' + btoa("chuy:chiichuy");
	       	var type = method; 
		    var modelJSON = (method === 'create' || method === 'update') ?  
		                    JSON.stringify(model.toJSON()) : null;  
		  
		    // Default JSON-request options.  
		    var params = {  
		     	url: model.url,  
		     	data: modelJSON,
			    type: "post",
			    crossDomain: true,
			    contentType: 'application/json',
		        async: false,
		        headers: {"Authorization": "Basic Y2h1eTpjaGlpY2h1eQ=="},
		        headers: {"Authentication": "Basic Y2h1eTpjaGlpY2h1eQ=="},
		        headers: {"withCredentials": true},
		        xhrFields: {
			        withCredentials: true
			    },
  				dataType: 'json', // Pay attention to the dataType/contentType
			    beforeSend  : function(xhr){ 
			    	xhr.setRequestHeader("Authentication","Basic Y2h1eTpjaGlpY2h1eQ==");

			    	xhr.withCredentials = true;
			    },
		        error: function (xhr, err) {
		            alert(xhr.statusText);
		        },
		        username : "chuy",
		        password : "chiichuy"
		    };  
		  
		// I have removed the code handling emulateJSON and emulateHTTP to make this shorter  
		  
		    // Make the request.  
		   // $.support.cors = true;
		    return Backbone.ajax(params);  
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
		console.log("fetching paciente")
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