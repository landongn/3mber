App.CSS3DRendererView = Ember.View.create({
    init: function () {
        this._super();
        App.three.Object3D.call(this);
    }
});

App.CSS3DRenderer = Ember.View.extend({
    init: function () {
        this._super();

        console.log('THREE.CSS3DRenderer', THREE.REVISION);

        var _width, _height;
        var _widthHalf, _heightHalf;

        this.set("matrix", new THREE.Matrix4());
        this.$().css({
            overflow: 'hidden',
            WebkitTransformStyle: 'preserve-3d',
            WebkitPerspectiveOrigin: '50% 50%',
            MozTransformStyle: 'preserve-3d',
            MozPerspectiveOrigin: '50% 50%',
            oTransformStyle: 'preserve-3d',
            oPerspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            perspectiveOrigin: '50% 50%'
        });

        this.set('domElement', this.$()[0]);
        this.set("cameraElement", document.createElement('div'));

        var cameraElement = document.createElement('div');
        cameraElement.style.WebkitTransformStyle = 'preserve-3d';
        cameraElement.style.MozTransformStyle = 'preserve-3d';
        cameraElement.style.oTransformStyle = 'preserve-3d';
        cameraElement.style.transformStyle = 'preserve-3d';

        this.$().append(cameraElement);
        this.set('cameraElement', cameraElement);
    },
    setSize: function (width, height) {
        var _width, _height, _widthHalf, _heightHalf;
        _width = width;
        _height = height;

        _widthHalf = _width / 2;
        _heightHalf = _height / 2;

        this.set('height', height);
        this.set('width', width);
        this.set('_widthHalf', _widthHalf);
        this.set('_heightHalf', _heightHalf);

        var domElement = this.$()[0], cameraElement = this.get("cameraElement");
        domElement.style.width = width + 'px';
        domElement.style.height = height + 'px';
        cameraElement.style.width = width + 'px';
        cameraElement.style.height = height + 'px';
    },
    episilon: function (value) {
        return Math.abs(value) < 0.000001 ? 0 : value;
    },
    getCameraCSSMatrix: function (matrix) {
        var elements = matrix.elements;

        return 'matrix3d(' +
            this.epsilon(elements[0]) + ',' +
            this.epsilon(elements[1]) + ',' +
            this.epsilon(elements[2]) + ',' +
            this.epsilon(elements[3]) + ',' +
            this.epsilon(elements[4]) + ',' +
            this.epsilon(elements[5]) + ',' +
            this.epsilon(elements[6]) + ',' +
            this.epsilon(elements[7]) + ',' +
            this.epsilon(elements[8]) + ',' +
            this.epsilon(elements[9]) + ',' +
            this.epsilon(elements[10]) + ',' +
            this.epsilon(elements[11]) + ',' +
            this.epsilon(elements[12]) + ',' +
            this.epsilon(elements[13]) + ',' +
            this.epsilon(elements[14]) + ',' +
            this.epsilon(elements[15]) +
        ')';
    },
    getObjectCSSMatrix: function (matrix) {

        var elements = matrix.elements;

        return 'translate3d(-50%,-50%,0) matrix3d(' +
            this.epsilon(elements[0]) + ',' +
            this.epsilon(elements[1]) + ',' +
            this.epsilon(elements[2]) + ',' +
            this.epsilon(elements[3]) + ',' +
            this.epsilon(elements[4]) + ',' +
            this.epsilon(elements[5]) + ',' +
            this.epsilon(elements[6]) + ',' +
            this.epsilon(elements[7]) + ',' +
            this.epsilon(elements[8]) + ',' +
            this.epsilon(elements[9]) + ',' +
            this.epsilon(elements[10]) + ',' +
            this.epsilon(elements[11]) + ',' +
            this.epsilon(elements[12]) + ',' +
            this.epsilon(elements[13]) + ',' +
            this.epsilon(elements[14]) + ',' +
            this.epsilon(elements[15]) +
        ')';
    },
    renderObject: function (object, camera) {
        if (object instanceof THREE.CSS3DObject) {

            var cameraElement = this.get('cameraElement');
            var style;

            if (object instanceof THREE.CSS3DSprite) {
                var matrix = this.get('matrix');

                matrix.copy(camera.matrixWorldInverse);
                matrix.transpose();
                matrix.copyPosition(object.matrixWorld);
                matrix.scale(object.scale);

                matrix.elements[3] = 0;
                matrix.elements[7] = 0;
                matrix.elements[11] = 0;
                matrix.elements[15] = 1;

                style = this.getObjectCSSMatrix(matrix);

            } else {
                style = this.getObjectCSSMatrix(object.matrixWorld);
            }

            var element = object.element;
            element.style.WebkitTransform = style;
            element.style.MozTransform = style;
            element.style.oTransform = style;
            element.style.transform = style;

            if (element.parentNode !== cameraElement) {
                cameraElement.appendChild(element);
            }
        }

        for (var i = 0, l = object.children.length; i < l; i ++) {
            this.renderObject(object.children[i], camera);
        }
    },
    render: function (scene, camera) {

        var fov = 0.5 / Math.tan(THREE.Math.degToRad(camera.fov * 0.5)) * this.get('height');

        var cameraElement = this.get("cameraElement"),
            domElement = this.$()[0];

        domElement.style.WebkitPerspective = fov + "px";
        domElement.style.MozPerspective = fov + "px";
        domElement.style.oPerspective = fov + "px";
        domElement.style.perspective = fov + "px";

        scene.updateMatrixWorld();

        if (camera.parent === undefined) {
            camera.updateMatrixWorld();
        }

        camera.matrixWorldInverse.getInverse(camera.matrixWorld);

        var style = "translate3d(0,0," + fov + "px)" + this.getCameraCSSMatrix(camera.matrixWorldInverse) +
            " translate3d(" + this.get('_widthHalf') + "px," + this.get('_heightHalf') + "px, 0)";

        cameraElement.style.WebkitTransform = style;
        cameraElement.style.MozTransform = style;
        cameraElement.style.oTransform = style;
        cameraElement.style.transform = style;

        this.renderObject(scene, camera);
    }
});
