var Backbone   	= require('backbone'),
    Handlebars 	= require('handlebars'),
    $          	= require('jquery'),
    Todo 		= require('../models/todo'),
    app        	= Backbone.app;

module.exports = Backbone.View.extend({
	el: $('#newTodo'),
	events:{
		"keypress" : "presiona"
	},
	initialize: function(){
		console.log("inicializando");
	},
	presiona: function(e){
		if(e.keyCode!=13){
			return;
		}

		this.collection.add(new Todo({
			todo:this.el.value,
			author:"chiichuy"
		}));

		this.el.value = '';
	},
	addOne:function(todo){
		var todoView = new TodoView({model:todo});
		this.$el.append(todoView.render().el);
	}
});