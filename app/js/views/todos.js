var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    TodoView  = require('./todo'),
    $          = require('jquery');

module.exports = Backbone.View.extend({
	el: $('#seccion'),
	template: Handlebars.compile($('#todo-template').html()),
	initialize: function(){
		this.listenTo(this.collection, 'add',this.addOne,this);
	},

	render: function(){
		this.collection.forEach(this.addOne,this);
	},

	addOne:function(todo){
		var todoView = new TodoView({model:todo});
		this.$el.append(todoView.render().el);
	}
});