//namespace
this.graphics = this.graphics || {};

//class
(function() {
    "use strict";

    //constructor
    const Vec4 = function(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        
        Object.defineProperty(this, 'r', {
          get() {
            return this.x;
          },
          set(value) {
            this.x = value;
          }
        });
        
        Object.defineProperty(this, 'g', {
          get() {
            return this.y;
          },
          set(value) {
            this.y = value;
          }
        });
        
        Object.defineProperty(this, 'b', {
          get() {
            return this.z;
          },
          set(value) {
            this.z = value;
          }
        });
        
        Object.defineProperty(this, 'a', {
          get() {
            return this.w;
          },
          set(value) {
            this.w = value;
          }
        });
    };
    
    const proto = Vec4.prototype;
    
    proto.set = function(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        
        return this;
    };
    
    proto.rotateZ = function(t) {
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        const x1 = this.x * cosT - this.y * sinT;
        const y1 = this.x * sinT + this.y * cosT;
        this.x = x1;
        this.y = y1;

        return this;
    };
    
    proto.rotateY = function(t) {
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        const z1 = this.z * cosT - this.x * sinT;
        const x1 = this.z * sinT + this.x * cosT;
        this.z = z1;
        this.x = x1;

        return this;
    };
    
    proto.rotateX = function(t) {
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        const y1 = this.y * cosT - this.z * sinT;
        const z1 = this.y * sinT + this.z * cosT;
        this.y = y1;
        this.z = z1;

        return this;
    };
    
    proto.rotate = function(tx, ty, tz) {
        if (tz) this.rotateZ(tz);
        if (ty) this.rotateY(ty);
        if (tx) this.rotateX(tx);
        
        return this;
    };
    
    proto.clone = function(target) {
        if (target) {
            target.x = this.x;
            target.y = this.y;
            target.z = this.z;
            target.w = this.w;
        } else {
            target = new Vec4(this.x, this.y, this.z, this.w);
        }
        
        return target;
    };
    
    proto.add = function(otherVec) {
        this.x += otherVec.x;
        this.y += otherVec.y;
        this.z += otherVec.z;
        this.w += otherVec.w;
        
        return this;
    };
    
    proto.subtract = function(otherVec) {
        this.x -= otherVec.x;
        this.y -= otherVec.y;
        this.z -= otherVec.z;
        
        return this;
    };
    
    proto.scale = function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        
        return this;
    };
    
    proto.invert = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        
        return this;
    };
    
    proto.normalize = function() {
        const magnitude = this.getMagnitude();
        this.scale(1 / magnitude);
        return this;
    };
    
    proto.getMagnitude = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    
    proto.getUnitVec = function() {
        return this.clone().normalize();
    };
    
    proto.fromLerp = function(v0, v1, ratio) {
        this.x = (v1.x - v0.x) * ratio + v0.x;
        this.y = (v1.y - v0.y) * ratio + v0.y;
        this.z = (v1.z - v0.z) * ratio + v0.z;
        this.w = (v1.w - v0.w) * ratio + v0.w;
    };
    
    //TODO: getEulerAnglesZYX
    
    proto.dot = function(otherVec) {
        return (this.x * otherVec.x) + (this.y * otherVec.y) + (this.z * otherVec.z) + (this.w * otherVec.w);
    };
    
    graphics.Vec4 = Vec4;
})();