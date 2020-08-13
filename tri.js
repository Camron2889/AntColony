//namespace
this.graphics = this.graphics || {};

//class
(function() {
    "use strict";

    //constructor
    const Tri = function(v0, v1, v2) {
        this.v0 = v0 || new graphics.Vec3();
        this.v1 = v1 || new graphics.Vec3();
        this.v2 = v2 || new graphics.Vec3();
    };
    
    const proto = Tri.prototype;
    
    proto.clone = function(target) {
        if (target) {
            target.v0 = this.v0.clone();
            target.v1 = this.v1.clone();
            target.v2 = this.v2.clone();
        } else {
            target = new Tri(this.v0.clone(), this.v1.clone(), this.v2.clone());
        }
        
        return target;
    };
    
    proto.getBarycentricCoordinates = function(vec) {
        const y1y2 = this.v1.y - this.v2.y; //red
        const x0x2 = this.v0.x - this.v2.x; //blue
        const x2x1 = this.v2.x - this.v1.x; //yellow
        const xDiff = vec.x - this.v2.x; //purple
        const yDiff = vec.y - this.v2.y; //green
 
        const det = y1y2 * x0x2 + x2x1 * (this.v0.y - this.v2.y);
        const lambda0 = (y1y2 * xDiff + x2x1 * yDiff) / det;
        const lambda1 = ((this.v2.y - this.v0.y) * xDiff + x0x2 * yDiff) / det;
        const lambda2 = 1 - lambda0 - lambda1;
        
        return [lambda0, lambda1, lambda2];
    };
    
    graphics.Tri = Tri;
})();