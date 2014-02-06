App.ApplicationView = Ember.ContainerView.extend({

	camera: null,
	scene: null,
	renderer: null,

	objects: [],
	targets: [],
	classNames: ['container'],
	tagName: 'div',


	init: function () {
		this._super();
	},

	didInsertElement: function () {
		// bootstrap the scene only when the element's been added to the graph.
		var renderer = App.CSS3DRendererView.create();
		var scene = App.Scene.create();
		var camera = App.PerspectiveCamera.create({
			angle: 45,
			dimensions: {
				width: window.innerWidth,
				height: window.innerHeight
			},
			near: 0.1,
			far: 10000
		});
		scene.add(camera);
		scene.pushObject(camera);
		camera.position.set(200, 200, 200);
		renderer.camera = camera;
		renderer.scene = scene;

		this.pushObject(renderer);
		this.pushObject(scene);

		this.renderer = renderer;
		this.camera = camera;
		this.scene = scene;

		this.$().css({
			position: 'absolute'
		});


		this.createObjects();
	},

	createObjects: function () {
		var table = this.get('controller.content');
		for (var i = 0; i < table.length; i += 5) {

			var ctrl = Ember.Object.create({
				number: (i + 1),
				symbol: table[i],
				details: table[i + 1],
				detailsNumber: table[i + 2]
			});

			var view = App.PeriodicTableElementView.create({
				controller: ctrl
			});

			var css3dObject = new App.three.Object3D();
			css3dObject.position.x = (table[i + 3] * 140) - 1330;
			css3dObject.position.y = - (table[i + 4] * 180) + 990;

			view.position.x = Math.random() * 4000 - 2000;
			view.position.y = Math.random() * 4000 - 2000;
			view.position.z = Math.random() * 4000 - 2000;

			this.scene.add(view);
			this.objects.push(view);
			this.targets.push(css3dObject);
			this.camera.pushObject(view);

		}

		this.transform(this.targets, 5000);
		Ember.run.later(function () {
			animate();
		}.bind(this), 1000);
	},
	transform: function (targets, duration) {
		/*global TWEEN */
		TWEEN.removeAll();

		for (var i = 0; i < this.objects.length; i++) {
			var object = this.objects[i];
			var target = targets[i];

			new TWEEN.Tween(object.position)
				.to({x: target.position.x,
					y: target.position.y,
					z: target.position.z})
				.easing(TWEEN.Easing.Exponential.InOut)
				.start();

			new TWEEN.Tween(object.rotation)
				.to({x: target.rotation.x,
					y: target.rotation.y,
					z: target.rotation.z})
				.easing(TWEEN.Easing.Exponential.InOut)
				.start();
		}

		var that = this;
		Ember.run.later(function () {
			new TWEEN.Tween(this)
				.to({}, duration * 2)
				.onUpdate(this.renderScene)
				.start();
		}.bind(this.renderer), 5000);
	}
});

var animate = function () {
	TWEEN.update();
	requestAnimationFrame(animate);
};
