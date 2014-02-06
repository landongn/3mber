App.Object3DView = Ember.View.extend({

	init: function () {
		this._super();
		var obj = new App.three.Object3D();
		for (var prop in obj) {
			if (this[prop]) {
				var _prop = '__' + prop;
				if (this[_prop]) {
					continue;
				} else {
					this[_prop] = obj[prop];
					continue;
				}
			}
			this.set(prop, obj[prop]);
		}
	}
});
