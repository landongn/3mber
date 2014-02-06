App.ApplicationView = Ember.ContainerView.extend({

	camera: App.PerspectiveCamera.create(),
	scene: null,
	renderer: null,

	objects: [],
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
		camera.position.set(200, 200, 200);
		renderer.camera = camera;
		renderer.scene = scene;
		this.renderer = renderer;
		this.camera = camera;
		this.scene = scene;


		this.pushObject(renderer);
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


			this.scene.add(view);
			this.objects.push(view);
			this.renderer.pushObject(view);

		}

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		// this.renderer.$().css({
		// 	position: 'absolute'
		// });

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

			new TWEEN.Tween(this)
				.to({}, duration * 2)
				.onUpdate(this.renderer.renderScene)
				.start();
		}
	}
});
