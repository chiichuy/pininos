var Backbone = require('backbone'),
    Paciente     = require('../models/paciente');

module.exports = Backbone.Collection.extend({
	model: Paciente,
	url: 'http://consul.herokuapp.com/paciente/'
});