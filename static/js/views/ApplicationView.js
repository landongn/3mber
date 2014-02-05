App.ApplicationView = App.CSS3DSceneView.extend({
	targets: {},

	init: function () {
		this._super();
		this.targets = {table: [], sphere: [], helix: [], grid: []};
	},

	didInsertElement: function () {
		var table = this.get("controller").content,
				scene = this.get("scene"),
				camera = this.get("camera");

		var that = this;

		for (var i = 0; i < table.length; i += 5) {

			var contextObject = Ember.Object.create({
				number: (i + 1),
				symbol: table[i],
				details: table[i + 1],
				detailsNumber: table[i + 2]
			});

			var CSS3DView = App.CSS3DObjectView.create({
				classNames: ['element'],
				templateName: 'element',
				controller: contextObject,
				click: function (e) {
					that.removeObject(this);
				}
			});
		}
	}
});
