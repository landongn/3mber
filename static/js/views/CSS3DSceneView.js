App.CSS3DSceneView = Ember.ContainerView.extend({
	_scene: null,
	_camera: null,
	_matrix: null,
	_graph: Ember.A(),

	init: function () {
		this._super();
		this.set("matrix", new THREE.Matrix4());
		this.set('camera', new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000));
		this.get('camera').position.z = 3000;
		this.set('scene', new THREE.Scene());
	},
	epsilon: function (value) {
		return Math.abs(value) < 0.000001 ? 0 : value;
	},
	render: Ember.K(),
	setup: Ember.K(),
	addChildObject: function (object) {
		this.pushObject(object);
		this.scene.add(object);
	},
	removeChildObject: function (object) {
		if (this.childViews.indexOf(object)) {
			this.removeObject(object);
		}
	}
});
