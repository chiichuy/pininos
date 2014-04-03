var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
	tagName: 'article',
	template: Handlebars.compile($('#todo-template').html()),
	render: function(){
		var todo = this.model.toJSON();
		var html = this.template(todo);
		this.$el.html(html);
		return this;
	}
});