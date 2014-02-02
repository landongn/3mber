var App = window.App = Ember.Application.create();

App.three = Ember.Namespace.create(window.THREE);



require('js/mixins/*');
require('js/controllers/*');
require('js/models/*');
require('js/routes/*');
require('js/components/*');
require('js/views/*');
require('js/router');
