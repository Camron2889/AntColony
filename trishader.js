//namespace
this.graphics = this.graphics || {};

//class
(function() {
    "use strict";

    //constructor
    const TriShader = function(canvas, sourceSize = 8, scaledSize) {
        this.canvas = canvas;

        this._canvasSource = document.createElement("canvas");
        this._canvasScaler = document.createElement("canvas");
        this._canvasCache = document.createElement("canvas");
        
        this.setCanvasSizes(sourceSize, scaledSize || sourceSize);
    };

    const proto = TriShader.prototype;
    
    proto.setCanvasSizes = function(sourceSize, scaledSize, padding = 1) {
        this._canvasSource.width = sourceSize;
        this._canvasSource.height = sourceSize;
        
        this._canvasScaler.width = scaledSize || sourceSize;
        this._canvasScaler.height = scaledSize || sourceSize;
        
        this._canvasCache.width = this.canvas.width;
        this._canvasCache.height = this.canvas.height;
        
        const ctxSource = this._canvasSource.getContext("2d");
        ctxSource.fillStyle = "rgba(0, 0, 0, 1)";
        ctxSource.fillRect(0, 0, sourceSize, sourceSize);
        
        const ctxScaler = this._canvasScaler.getContext("2d");
        const s = scaledSize / sourceSize;
        ctxScaler.scale(s, s);
        
        this._tri = {
            v0: {
                x: sourceSize / 2,
                y: padding
            },
            v1: {
                x: sourceSize - padding,
                y: sourceSize - padding
            },
            v2: {
                x: padding,
                y: sourceSize - padding
            },
        };
        const ratio = scaledSize / sourceSize;
        this._tri.v0Scaled = {
            x: this._tri.v0.x * ratio,
            y: this._tri.v0.y * ratio
        };
        this._tri.v1Scaled = {
            x: this._tri.v1.x * ratio,
            y: this._tri.v1.y * ratio
        };
        this._tri.v2Scaled = {
            x: this._tri.v2.x * ratio,
            y: this._tri.v2.y * ratio
        };
        
        this._tri.y1y2 = this._tri.v1.y - this._tri.v2.y;
        this._tri.x0x2 = this._tri.v0.x - this._tri.v2.x;
        this._tri.x2x1 = this._tri.v2.x - this._tri.v1.x;
    };
    
    proto.renderGradient = function(color0, color1, color2) {     
        const size = this._canvasSource.width;
        const midX = size / 2;
        
        const ctxSource = this._canvasSource.getContext("2d");
        const img = ctxSource.getImageData(0, 0, size, size);
        const data = img.data;
        
        for (let y = 0; y < size; y++) {
            let offset = Math.floor(y / 2 + 1.5);
            if (offset > midX) {
                offset = midX;
            }
            for (let x = ~~(midX - offset); x < midX + offset; x++) {
                const coords = this._getBarycentricCoordinates(x + 0.5, y + 0.5);
                const newColor = color0.clone();
                newColor.scale(coords[0]).add(color1.clone().scale(coords[1]));
                newColor.add(color2.clone().scale(coords[2]));
                const i = size * 4 * y + x * 4;
                data[i] = newColor.r * 255;
                data[i + 1] = newColor.g * 255;
                data[i + 2] = newColor.b * 255;
                data[i + 3] = newColor.a * 255;
            }
        }
        
        ctxSource.putImageData(img, 0, 0);
        
        const ctxScaler = this._canvasScaler.getContext("2d");
        ctxScaler.drawImage(this._canvasSource, 0, 0);
    };
    
    proto._getBarycentricCoordinates = function(x, y) {
        const y1y2 = this._tri.y1y2;
        const x0x2 = this._tri.x0x2;
        const x2x1 = this._tri.x2x1;
        const xDiff = x - this._tri.v2.x;
        const yDiff = y - this._tri.v2.y;
 
        const det = y1y2 * x0x2 + x2x1 * (this._tri.v0.y - this._tri.v2.y);
        const lambda0 = (y1y2 * xDiff + x2x1 * yDiff) / det;
        const lambda1 = ((this._tri.v2.y - this._tri.v0.y) * xDiff + x0x2 * yDiff) / det;
        const lambda2 = 1 - lambda0 - lambda1;
        
        return [lambda0, lambda1, lambda2];
    };
    
    proto.fill = function(tri) { //tri, vec4, vec4, vec4
        const ctxCache = this._canvasCache.getContext("2d");
        ctxCache.resetTransform();
        
        //transformations
        const scaledWidth = this._canvasScaler.width;
        const v1RelScaler = [(this._tri.v1Scaled.x - this._tri.v0Scaled.x), (this._tri.v1Scaled.y - this._tri.v0Scaled.y)];
        const v2RelScaler = [(this._tri.v2Scaled.x - this._tri.v0Scaled.x), (this._tri.v2Scaled.y - this._tri.v0Scaled.y)];
        
        const det = (v2RelScaler[0] * v1RelScaler[1]) - (v1RelScaler[0] * v2RelScaler[1]);
        const a = -v2RelScaler[1] / det;
        const b = v1RelScaler[1] / det;
        const c = v2RelScaler[0] / det;
        const d = -v1RelScaler[0] / det;
        const e = ((this._tri.v0Scaled.x * v2RelScaler[1]) - (this._tri.v0Scaled.y * v2RelScaler[0])) / det;
        const f = -((this._tri.v0Scaled.x * v1RelScaler[1]) - (this._tri.v0Scaled.y * v1RelScaler[0])) / det;
        
        const canvasWidth = this.canvas.width;
        
        
        const v1Rel = [(tri.v1.x - tri.v0.x) / canvasWidth, (tri.v1.y - tri.v0.y) / canvasWidth];
        const v2Rel = [(tri.v2.x - tri.v0.x) / canvasWidth, (tri.v2.y - tri.v0.y) / canvasWidth];
        
        ctxCache.transform(v1Rel[0], v1Rel[1], v2Rel[0], v2Rel[1], tri.v0.x, tri.v0.y);
        ctxCache.transform(this.canvas.width, 0, 0, this.canvas.width, 0, 0);
        ctxCache.transform(a, b, c, d, e, f);
      
        ctxCache.drawImage(this._canvasScaler, 0, 0);
      
        //draw
        
        const ctxCanvas = this.canvas.getContext("2d");
        
        ctxCanvas.beginPath();
        ctxCanvas.moveTo(tri.v2.x, tri.v2.y);
        ctxCanvas.lineTo(tri.v0.x, tri.v0.y);
        ctxCanvas.lineTo(tri.v1.x, tri.v1.y);
        ctxCanvas.closePath();

        ctxCanvas.fillStyle = ctxCanvas.createPattern(this._canvasCache, "no-repeat");
        ctxCanvas.fill();
    };

    graphics.TriShader = TriShader;
})();