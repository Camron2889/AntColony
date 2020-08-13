//namespace
this.graphics = this.graphics || {};

//class
(function() {
    "use strict";
    
    //shortcuts
    const Vec3 = graphics.Vec3

    //constructor
    const Mat3 = function(v0, v1, v2, v3) {
        this.v0 = v0 || new Vec3;
        this.v1 = v1 || new Vec3;
        this.v2 = v2 || new Vec3;
    };
    
    const proto = Mat3.prototype;
    
    proto.clone = function(target) {
        target = target || new Mat3();
        target.v0 = this.v0.clone();
        target.v1 = this.v1.clone();
        target.v2 = this.v2.clone();
        
        return target;
    };
    
    proto.multToVec3 = function(targetVec) {
        const x = (targetVec.x * this.v0.x) + (targetVec.y * this.v1.x) + (targetVec.z * this.v2.x);
        const y = (targetVec.x * this.v0.y) + (targetVec.y * this.v1.y) + (targetVec.z * this.v2.y);
        const z = (targetVec.x * this.v0.z) + (targetVec.y * this.v1.z) + (targetVec.z * this.v2.z);
        targetVec.x = x;
        targetVec.y = y;
        targetVec.z = z;
    };
    
    proto.toIdentity = function() {
        this.v0.set(1, 0, 0, 0);
        this.v1.set(0, 1, 0, 0);
        this.v2.set(0, 0, 1, 0);
        this.v3.set(0, 0, 0, 1);
        
        return this;
    };
    
    proto.rotate = function(tx, ty, tz) {
        this.v0.rotate(tx, ty, tz);
        this.v1.rotate(tx, ty, tz);
        this.v2.rotate(tx, ty, tz);
        
        return this;
    };
    
    proto.fromEulerAngles = function(tx, ty, tz) {
        this.toIdentity().rotate(tx, ty, tz);
        return this;
    };
    
    //TODO: multToMat3
    
    graphics.Mat3 = Mat3;
})();