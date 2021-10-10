//namespace
this.colony = this.colony || {};

//class
(function() {
    "use strict";

    //constructor
    const Simulation = function(parentElement = document.body, width = 640, height = 480, poolSize = 200) {

        //data members
        this._parentElement = parentElement;
        this._width = width;
        this._height = height;
        this._aspectRatio = width / height;

        //setup canvases
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._parentElement.appendChild(this._canvas);
        this._canvas.setAttribute("style", "display: block; margin: auto; background-color: #000;");

        this._computeCanvas = new graphics.ComputeCanvas(width, height);

        //ants
        this._ants = new colony.ObjectPool(colony.Ant, poolSize);

        //settings
        this.colonyPositon = new graphics.Vec2(width / 2, height / 2);
        this.jitter = 0.5;
    };

    const proto = Simulation.prototype;


    proto.newAnt = function(x = 0, y = 0, angle = 0) {
        const ant = this._ants.getObject();
        ant.position.set(x, y);
        ant.angle = angle;
        return ant;
    };

    proto.drawAnts = function() {
        const ctx = this._canvas.getContext("2d");
        this._ants.forEach(function() {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 0.2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        });
    };

    proto.dropPheromones = function() {
        const computeCanvas = this._computeCanvas;
        this._ants.forEach(function() {
            const x = Math.floor(this.position.x);
            const y = Math.floor(this.position.y);
            const width = computeCanvas._canvas.width;
            const height = computeCanvas._canvas.height;  
            if (x >= 0 && x < width && y >= 0 && y < height) {
                computeCanvas.addToPixel(x, y, 50, 0, 0, 50);
            }
        });
    };

    proto.fill = function(style = "rgb(0, 0, 0)") {
        const canvas = this._canvas;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = style;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    proto.drawPheromones = function() {
        const canvas = this._canvas;
        const ctx = canvas.getContext("2d");
        const cc = this._computeCanvas._canvas;
        ctx.drawImage(cc, 0, 0, canvas.width, canvas.height);
    };
    
    proto._minDiff = function(t0, t1) {
        const twoPi = Math.PI * 2;
        const diff = ( t1 - t0 + Math.PI ) % twoPi - Math.PI;
        return diff < -Math.PI ? diff + twoPi : diff;
    };

    proto.tick = function() {
        const jitter = this.jitter;
        const computeCanvas = this._computeCanvas;
        this._ants.forEach(function() { 
            const x = Math.floor(this.position.x);
            const y = Math.floor(this.position.y);
            const width = computeCanvas._canvas.width;
            const height = computeCanvas._canvas.height;
            if (x >= 0 && x < width && y >= 0 && y < height) {
                const gradient = computeCanvas.getGradientAt(x, y).dr();
                const angle = gradient.getAngle();
                const twoPi = Math.PI * 2;
                let diff = ( angle - this.angle + Math.PI ) % twoPi - Math.PI;
                diff = diff < -Math.PI ? diff + twoPi : diff;
                if (angle) {
                    this.angle += diff;
                }
            }

            this.angle += Math.random() * jitter - jitter / 2;
            this.step(1);
        });

        this.dropPheromones();
        this._computeCanvas.blur(4);
    };

    colony.Simulation = Simulation;
})();