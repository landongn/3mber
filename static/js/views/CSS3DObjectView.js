App.CSS3DObjectView = Ember.View.extend({
	init: function () {
		this._super();
		App.three.Object3D.call(this);
	}
});
