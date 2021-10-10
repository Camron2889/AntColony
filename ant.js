//requires: vec2.js

//namespace
this.colony = this.colony || {};

//class
(function() {
    "use strict";

    //constructor
    const Ant = function(x = 0, y = 0, angle = 0) {
        this.position = new graphics.Vec2(x, y);
        this.angle = angle;
        
        this.speed = 1;
    };
    
    const proto = Ant.prototype;
    
    proto.step = function(dist = this.speed) {
        this.position.x += dist * Math.cos(this.angle);
        this.position.y += dist * Math.sin(this.angle);
        return this;
    }
    
    colony.Ant = Ant;
})();