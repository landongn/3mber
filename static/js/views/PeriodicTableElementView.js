App.PeriodicTableElementView = App.Object3DView.extend({
    templateName: 'element',
    classNames: 'element',
    didInsertElement: function () {
        this.$().css({
            position: 'absolute',
            perspective: 'preserve-3d',
            backgroundColor: 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')'
        });
        this.position.x = Math.random() * 4000 - 2000;
        this.position.y = Math.random() * 4000 - 2000;
        this.position.z = Math.random() * 4000 - 2000;
    }
});
