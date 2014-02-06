App.Scene = Ember.ContainerView.extend({
    classNames: ['scene-view'],
    init: function () {
        this._super();
        var scene = new App.three.Scene();
        for (var prop in scene) {
            if (this[prop]) {
                var _prop = '__' + prop;
                if (this[_prop]) {
                    continue;
                } else {
                    this[_prop] = scene[prop];
                    continue;
                }
            }
            this.set(prop, scene[prop]);
        }
    },
    didInsertElement: function () {
        console.log("scene installed");
    }
});
