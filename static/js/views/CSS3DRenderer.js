App.CSS3DRendererView = Ember.ContainerView.extend({
    classNames: ['renderer-view'],
    tagName: 'div',
    hasInsertedIntoDom: false,

    /**
     * three properties
     */
    matrix: null,
    camera: null,
    renderer: null,

    init: function () {
        this._super();
    },
    setSize: function (width, height) {
        var _widthHalf, _heightHalf;
        _widthHalf = width / 2;
        _heightHalf = height / 2;

        this.set('height', height);
        this.set('width', width);
        this.set('_widthHalf', _widthHalf);
        this.set('_heightHalf', _heightHalf);

        var domElement = this.element, cameraElement = this.get("cameraElement");
        $(this.element).css({
            width: width + 'px',
            height: height + 'px'
        });
        $(cameraElement).css({
            width: width + 'px',
            height: height + 'px'
        });
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
    renderScene: function () {
        if (this.get('hasInsertedIntoDom') === false) {
            return;
        }
        var fov = 0.5 / Math.tan(THREE.Math.degToRad(this.camera.fov * 0.5)) * this.get('height');

        var cameraElement = this.camera.$()[0],
            domElement = this.scene.$()[0];

        domElement.style.WebkitPerspective = fov + "px";
        domElement.style.MozPerspective = fov + "px";
        domElement.style.oPerspective = fov + "px";
        domElement.style.perspective = fov + "px";

        this.scene.updateMatrixWorld();

        if (this.camera.parent === undefined) {
            this.camera.updateMatrixWorld();
        }

        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);

        var style = "translate3d(0,0," + fov + "px)" + this.getCameraCSSMatrix(this.camera.matrixWorldInverse) +
            " translate3d(" + this.get('_widthHalf') + "px," + this.get('_heightHalf') + "px, 0)";

        cameraElement.style.WebkitTransform = style;
        cameraElement.style.MozTransform = style;
        cameraElement.style.oTransform = style;
        cameraElement.style.transform = style;

        this.renderObject(this.scene, this.camera);
    },
    didInsertElement: function () {
        this.set('hasInsertedIntoDom', true);
    }
});
