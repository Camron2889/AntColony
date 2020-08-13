//namespace
this.graphics = this.graphics || {};

//class
(function() {
    "use strict";
    
    //shortcuts
    const Vec4 = graphics.Vec4

    //constructor
    const Mat4 = function(v0, v1, v2, v3) {
        this.v0 = v0 || new Vec4;
        this.v1 = v1 || new Vec4;
        this.v2 = v2 || new Vec4;
        this.v3 = v3 || new Vec4;
    };
    
    const proto = Mat4.prototype;
    
    proto.clone = function(target) {
        target = target || new Mat4();
        target.v0 = this.v0.clone();
        target.v1 = this.v1.clone();
        target.v2 = this.v2.clone();
        target.v3 = this.v3.clone();
        
        return target;
    };
    
    proto.multToVec4 = function(targetVec) {
        const x = (targetVec.x * this.v0.x) + (targetVec.y * this.v1.x) + (targetVec.z * this.v2.x) + (targetVec.w * this.v3.x);
        const y = (targetVec.x * this.v0.y) + (targetVec.y * this.v1.y) + (targetVec.z * this.v2.y) + (targetVec.w * this.v3.y);
        const z = (targetVec.x * this.v0.z) + (targetVec.y * this.v1.z) + (targetVec.z * this.v2.z) + (targetVec.w * this.v3.z);
        const w = (targetVec.x * this.v0.w) + (targetVec.y * this.v1.w) + (targetVec.z * this.v2.w) + (targetVec.w * this.v3.w);
        targetVec.x = x;
        targetVec.y = y;
        targetVec.z = z;
        targetVec.w = w;
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
    
    proto.multToMat4 = function(targetMat) {
        const that = targetMat;
        const m00 = (this.v0.x * that.v0.x) + (this.v1.x * that.v0.y) + (this.v2.x * that.v0.z) + (this.v3.x * that.v0.w);
        const m01 = (this.v0.y * that.v0.x) + (this.v1.y * that.v0.y) + (this.v2.y * that.v0.z) + (this.v3.y * that.v0.w);
        const m02 = (this.v0.z * that.v0.x) + (this.v1.z * that.v0.y) + (this.v2.z * that.v0.z) + (this.v3.z * that.v0.w);
        const m03 = (this.v0.w * that.v0.x) + (this.v1.w * that.v0.y) + (this.v2.w * that.v0.z) + (this.v3.w * that.v0.w);
        
        const m10 = (this.v0.x * that.v1.x) + (this.v1.x * that.v1.y) + (this.v2.x * that.v1.z) + (this.v3.x * that.v1.w);
        const m11 = (this.v0.y * that.v1.x) + (this.v1.y * that.v1.y) + (this.v2.y * that.v1.z) + (this.v3.y * that.v1.w);
        const m12 = (this.v0.z * that.v1.x) + (this.v1.z * that.v1.y) + (this.v2.z * that.v1.z) + (this.v3.z * that.v1.w);
        const m13 = (this.v0.w * that.v1.x) + (this.v1.w * that.v1.y) + (this.v2.w * that.v1.z) + (this.v3.w * that.v1.w);
        
        const m20 = (this.v0.x * that.v2.x) + (this.v1.x * that.v2.y) + (this.v2.x * that.v2.z) + (this.v3.x * that.v2.w);
        const m21 = (this.v0.y * that.v2.x) + (this.v1.y * that.v2.y) + (this.v2.y * that.v2.z) + (this.v3.y * that.v2.w);
        const m22 = (this.v0.z * that.v2.x) + (this.v1.z * that.v2.y) + (this.v2.z * that.v2.z) + (this.v3.z * that.v2.w);
        const m23 = (this.v0.w * that.v2.x) + (this.v1.w * that.v2.y) + (this.v2.w * that.v2.z) + (this.v3.w * that.v2.w);
        
        const m30 = (this.v0.x * that.v3.x) + (this.v1.x * that.v3.y) + (this.v2.x * that.v3.z) + (this.v3.x * that.v3.w);
        const m31 = (this.v0.y * that.v3.x) + (this.v1.y * that.v3.y) + (this.v2.y * that.v3.z) + (this.v3.y * that.v3.w);
        const m32 = (this.v0.z * that.v3.x) + (this.v1.z * that.v3.y) + (this.v2.z * that.v3.z) + (this.v3.z * that.v3.w);
        const m33 = (this.v0.w * that.v3.x) + (this.v1.w * that.v3.y) + (this.v2.w * that.v3.z) + (this.v3.w * that.v3.w);
        
        that.v0.set(m00, m01, m02, m03);
        that.v1.set(m10, m11, m12, m13);
        that.v2.set(m20, m21, m22, m23);
        that.v3.set(m30, m31, m32, m33);
    };
    
    proto.toArray = function() {
        const arr = [[], [], [], []];
        const round = (val) => Math.round((val + Number.EPSILON) * 1000000000) / 1000000000;
        arr[0][0] = round(this.v0.x);
        arr[0][1] = round(this.v0.y);
        arr[0][2] = round(this.v0.z);
        arr[0][3] = round(this.v0.w);
        
        arr[1][0] = round(this.v1.x);
        arr[1][1] = round(this.v1.y);
        arr[1][2] = round(this.v1.z);
        arr[1][3] = round(this.v1.w);
        
        arr[2][0] = round(this.v2.x);
        arr[2][1] = round(this.v2.y);
        arr[2][2] = round(this.v2.z);
        arr[2][3] = round(this.v2.w);
        
        arr[3][0] = round(this.v3.x);
        arr[3][1] = round(this.v3.y);
        arr[3][2] = round(this.v3.z);
        arr[3][3] = round(this.v3.w);
        
        return arr;
    };
    
    graphics.Mat4 = Mat4;
})();