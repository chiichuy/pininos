var Backbone = require('backbone'),
    Paciente     = require('../models/paciente');

module.exports = Backbone.Collection.extend({
	model: Paciente,
	url: 'http://dry-bastion-2612.herokuapp.com/paciente/'
});