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
	    Backbone.sync = function (method, model) {
	        var basic = 'Basic  ' + btoa("chuy:chiichuy");
	       	var type = method; 
		    var modelJSON = (method === 'create' || method === 'update') ?  
		                    JSON.stringify(model.toJSON()) : null;  
		  
        	var base64 = btoa("chuy" + ":" + "chiichuy");
		    // Default JSON-request options.  
		    var params = {  
		     	url: model.url,  
		     	data: modelJSON,
			    type: type,
			    crossDomain: true,
			    contentType: 'application/json',
				accepts:"application/json",
  				dataType: 'json',
  				jsonp: "callback",
  				undefined:function(data){
  					console.log("micall");
  				},
			    jsonpCallback: function(){
			    	console.log("callback");
			    },
			    success: function (data) {
			        console.log('on success!');
			        console.log(data);
			    },
			    error: function (xhr, ajaxOptions, thrownError) {
			       console.log('on error!');
			       console.log("xhr.status: " + xhr.status);
			       console.log("xhr.statusText: " + xhr.statusText);
			       console.log("xhr.readyState: " + xhr.readyState);
			       console.log("errorThrown: " + thrownError);
			       console.log("xhr.redirect: " + xhr.redirect);
			    }
		    };  
		  
		// I have removed the code handling emulateJSON and emulateHTTP to make this shorter  
		  
		    // Make the request.  
		   // $.sup^port.cors = true;
		    return $.ajax(params).done(function(res){
		    	console.log(this.pacientes.length);
		    });
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
		console.log(this.pacientes.fetch());
		
	},
	addTodo: function(todo){
		this.todos.add(new Todo({
			todo:todo,
			author:"chiichuy"
		}));
	}

});