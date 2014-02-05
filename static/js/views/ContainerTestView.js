App.ContainerTestView = Ember.ContainerView.extend(App.CSS3DRenderer, {

    controls: null,
    camera: null,
    scene: null,
    renderer: null,

    objects: [],
    targets: {},

    init: function () {
        this._super();
        this.targets = {table: [], sphere: [], helix: [], grid: []};
        this.set('camera', new App.three.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000));
        this.get('camera').position.z = 3000;
        this.set('scene', new App.three.Scene());
    },

    setupScene: function () {
        var table = this.get('controller').content;
        var objects = this.get('objects');
        var scene = this.get("scene");
        var targets = this.get("targets");
        var camera = this.get("camera");
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


            CSS3DView.position.x = Math.random() * 4000 - 2000;
            CSS3DView.position.y = Math.random() * 4000 - 2000;
            CSS3DView.position.z = Math.random() * 4000 - 2000;
            scene.add(CSS3DView);
            objects.pushObject(CSS3DView);

            console.log(CSS3DView.position);

            // var object = new App.three.Object3D();
            // object.position.x = (table[i + 3] * 140) - 1330;
            // object.position.y = - (table[i + 4] * 180) + 990;

            // targets.table.pushObject(CSS3DView);
            this.pushObject(CSS3DView);

        }

        // sphere

        var vector = new App.three.Vector3();
        var length = objects.length;
        for (var x = 0; x < objects.length; x++) {

            var xphi = Math.acos(-1 + (2 * x) / length);
            var theta = Math.sqrt(length * Math.PI) * xphi;

            var xobj = new App.three.Object3D();

            xobj.position.x = 800 * Math.cos(theta) * Math.sin(xphi);
            xobj.position.y = 800 * Math.sin(theta) * Math.sin(xphi);
            xobj.position.z = 800 * Math.cos(xphi);

            vector.copy(xobj.position).multiplyScalar(2);

            xobj.lookAt(vector);

            targets.sphere.push(xobj);

        }

        // helix

        var yv = new App.three.Vector3();

        for (var y = 0; y < objects.length; y++) {

            var yphi = y * 0.175 + Math.PI;

            var yobj = new App.three.Object3D();

            yobj.position.x = 900 * Math.sin(yphi);
            yobj.position.y = - (y * 8) + 450;
            yobj.position.z = 900 * Math.cos(yphi);

            yv.x = yobj.position.x * 2;
            yv.y = yobj.position.y;
            yv.z = yobj.position.z * 2;

            yobj.lookAt(yv);

            targets.helix.push(yobj);

        }

        // grid

        for (var z = 0; z < objects.length; z++) {

            var zobject = new App.three.Object3D();

            zobject.position.x = ((z % 5) * 400) - 800;
            zobject.position.y = (-(Math.floor(z / 5) % 5) * 400) + 800;
            zobject.position.z = (Math.floor(z / 25)) * 1000 - 2000;

            targets.grid.push(zobject);

        }

        //


        var renderer = $(this.get('domElement'));
        this.setSize(window.innerWidth, window.innerHeight);
        renderer.css({position: 'absolute'});

        // var controls = new App.three.TrackballControls(camera, renderer);
        // controls.rotateSpeed = 0.5;
        // controls.minDistance = 500;
        // controls.maxDistance = 6000;
        // controls.addEventListener('change', this.render);


        this.transform(targets.table, 5000);

        window.addEventListener('resize', this.onWindowResize, false);
    },
    transform: function (targets, duration) {
        var objects = this.get('objects');
        /*global TWEEN */
        TWEEN.removeAll();

        objects.forEach(function (item, index) {
            var object = item;
            var target = targets[index];

            // new TWEEN.Tween()
            //     .to({x: target.position.x, y: target.position.y, z: target.position.z}, Math.random() * duration + duration)
            //     .easing(TWEEN.Easing.Exponential.InOut)
            //     .start();

            // new TWEEN.Tween()
            //     .to({x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            //     .easing(TWEEN.Easing.Exponential.InOut)
            //     .start();

        });

        var that = this;
        new TWEEN.Tween(that)
            .to({}, duration * 2)
            .onUpdate(that.render)
            .start();
    },
    onWindowResize: function () {
        this.get('camera').aspect = window.innerWidth / window.innerHeight;
        this.get('camera').updateProjectionMatrix();

        this.get('renderer').setSize(window.innerWidth, window.innerHeight);

        this.render();
    },
    onDidInsertElement: function () {
        this.setupScene();
    }.on('didInsertElement')
});
