var Backbone = require('backbone'),
    Todo     = require('../models/todo');

module.exports = Backbone.Collection.extend({
	model: Todo
});