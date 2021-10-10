//namespace
this.graphics = this.graphics || {};

//class
(function() {
    "use strict";

    //constructor
    const Vec2 = function(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    };
    
    const proto = Vec2.prototype;
    
    proto.set = function(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        
        return this;
    };
    
    proto.rotate = function(t) {
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        const x1 = this.x * cosT - this.y * sinT;
        const y1 = this.x * sinT + this.y * cosT;
        this.x = x1;
        this.y = y1;

        return this;
    };
    
    proto.clone = function(target) {
        if (target) {
            target.x = this.x;
            target.y = this.y;
        } else {
            target = new Vec2(this.x, this.y);
        }
        
        return target;
    };
    
    proto.add = function(otherVec) {
        this.x += otherVec.x;
        this.y += otherVec.y;
        
        return this;
    };
    
    proto.subtract = function(otherVec) {
        this.x -= otherVec.x;
        this.y -= otherVec.y;
        
        return this;
    };
    
    proto.scale = function(s) {
        this.x *= s;
        this.y *= s;
        
        return this;
    };
    
    proto.invert = function() {
        this.x = -this.x;
        this.y = -this.y;
        
        return this;
    };
    
    proto.normalize = function() {
        const magnitude = this.getMagnitude();
        this.scale(1 / magnitude);
        return this;
    };
    
    proto.getMagnitude = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    
    proto.getUnitVec = function() {
        return this.clone().normalize();
    };
    
    proto.getAngle = function() {
        let angle = Math.atan(this.y / this.x);
        
        if (this.x >= 0) {
            if (this.y < 0) {
                angle += 2 * Math.PI;
            }
        } else {
            angle += Math.PI;
        }
        
        return angle;
    };
    
    proto.dot = function(otherVec) {
        return (this.x * otherVec.x) + (this.y * otherVec.y);
    };
    
    proto.fromLerp = function(v0, v1, ratio) {
        this.x = (v1.x - v0.x) * ratio + v0.x;
        this.y = (v1.y - v0.y) * ratio + v0.y;
    };
    
    graphics.Vec2 = Vec2;
})();