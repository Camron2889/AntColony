//requires: Vec2, Vec4

//class
(function() {
    "use strict";
    
    //constructor
    const Grad4 = function(dx, dy) {
        this.dx = dx ? dx.clone() : new graphics.Vec4();
        this.dy = dy ? dy.clone() : new Vec4();
    };

    const proto = Grad4.prototype;
    
    proto.dr = function() {
        return new graphics.Vec2(this.dx.r, this.dy.r);
    };
    
    proto.dg = function() {
        return new graphics.Vec2(this.dx.g, this.dy.g);
    };
    
    proto.db = function() {
        return new graphics.Vec2(this.dx.b, this.dy.b);
    };

    proto.da = function() {
        return new graphics.Vec2(this.dx.a, this.dy.a);
    };
    
    proto.scale = function(x, y) {
        this.dx.scale(x);
        this.dy.scale(y || x);
    }

    graphics.Grad4 = Grad4;
})();