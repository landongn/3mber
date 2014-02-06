App.PerspectiveCamera = Ember.Object.extend({
    init: function (args) {
        this._super();
        var _camera = new App.three.PerspectiveCamera(this.angle, this.dimensions.width / this.dimensions.height, this.near, this.far);
        for (var prop in _camera) {
            if (this[prop]) {
                var _prop = '__' + prop;
                if (this[_prop]) {
                    continue;
                } else {
                    this[_prop] = _camera[prop];
                    continue;
                }
            }
            this.set(prop, _camera[prop]);
        }
    }
});
