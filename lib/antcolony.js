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
        this.w -= otherVec.w;

        return this;
    };

    proto.scale = function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;

        return this;
    };

    proto.invert = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;

        return this;
    };

    proto.fromLerp = function(v0, v1, ratio) {
        this.x = (v1.x - v0.x) * ratio + v0.x;
        this.y = (v1.y - v0.y) * ratio + v0.y;
        this.z = (v1.z - v0.z) * ratio + v0.z;
        this.w = (v1.w - v0.w) * ratio + v0.w;
    };

    graphics.Vec4 = Vec4;
})();

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

//requires: Vec4, Grad4

//requires: Vec4, Grad4

//class
(function() {
    "use strict";
    
    //The following line of code is StackBlur (c) 2010 Mario Klingemann (https://github.com/flozz/StackBlur/blob/master/src/stackblur.js)
    !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).StackBlur={})}(this,(function(t){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var r=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],n=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function a(t,r,n,a,o){if("string"==typeof t&&(t=document.getElementById(t)),!t||"object"!==e(t)||!("getContext"in t))throw new TypeError("Expecting canvas with `getContext` method in processCanvasRGB(A) calls!");var i=t.getContext("2d");try{return i.getImageData(r,n,a,o)}catch(t){throw new Error("unable to access image data: "+t)}}function o(t,e,r,n,o,f){if(!(isNaN(f)||f<1)){f|=0;var g=a(t,e,r,n,o);g=i(g,e,r,n,o,f),t.getContext("2d").putImageData(g,e,r)}}function i(t,e,a,o,i,f){for(var g,l=t.data,c=2*f+1,s=o-1,v=i-1,b=f+1,x=b*(b+1)/2,d=new u,y=d,h=1;h<c;h++)y=y.next=new u,h===b&&(g=y);y.next=d;for(var p=null,m=null,w=0,B=0,C=r[f],E=n[f],I=0;I<i;I++){y=d;for(var S=l[B],N=l[B+1],R=l[B+2],D=l[B+3],G=0;G<b;G++)y.r=S,y.g=N,y.b=R,y.a=D,y=y.next;for(var T=0,j=0,A=0,W=0,k=b*S,H=b*N,_=b*R,M=b*D,O=x*S,P=x*N,q=x*R,z=x*D,F=1;F<b;F++){var J=B+((s<F?s:F)<<2),K=l[J],L=l[J+1],Q=l[J+2],U=l[J+3],V=b-F;O+=(y.r=K)*V,P+=(y.g=L)*V,q+=(y.b=Q)*V,z+=(y.a=U)*V,T+=K,j+=L,A+=Q,W+=U,y=y.next}p=d,m=g;for(var X=0;X<o;X++){var Y=z*C>>E;if(l[B+3]=Y,0!==Y){var Z=255/Y;l[B]=(O*C>>E)*Z,l[B+1]=(P*C>>E)*Z,l[B+2]=(q*C>>E)*Z}else l[B]=l[B+1]=l[B+2]=0;O-=k,P-=H,q-=_,z-=M,k-=p.r,H-=p.g,_-=p.b,M-=p.a;var $=X+f+1;$=w+($<s?$:s)<<2,O+=T+=p.r=l[$],P+=j+=p.g=l[$+1],q+=A+=p.b=l[$+2],z+=W+=p.a=l[$+3],p=p.next;var tt=m,et=tt.r,rt=tt.g,nt=tt.b,at=tt.a;k+=et,H+=rt,_+=nt,M+=at,T-=et,j-=rt,A-=nt,W-=at,m=m.next,B+=4}w+=o}for(var ot=0;ot<o;ot++){var it=l[B=ot<<2],ft=l[B+1],gt=l[B+2],ut=l[B+3],lt=b*it,ct=b*ft,st=b*gt,vt=b*ut,bt=x*it,xt=x*ft,dt=x*gt,yt=x*ut;y=d;for(var ht=0;ht<b;ht++)y.r=it,y.g=ft,y.b=gt,y.a=ut,y=y.next;for(var pt=o,mt=0,wt=0,Bt=0,Ct=0,Et=1;Et<=f;Et++){B=pt+ot<<2;var It=b-Et;bt+=(y.r=it=l[B])*It,xt+=(y.g=ft=l[B+1])*It,dt+=(y.b=gt=l[B+2])*It,yt+=(y.a=ut=l[B+3])*It,Ct+=it,mt+=ft,wt+=gt,Bt+=ut,y=y.next,Et<v&&(pt+=o)}B=ot,p=d,m=g;for(var St=0;St<i;St++){var Nt=B<<2;l[Nt+3]=ut=yt*C>>E,ut>0?(ut=255/ut,l[Nt]=(bt*C>>E)*ut,l[Nt+1]=(xt*C>>E)*ut,l[Nt+2]=(dt*C>>E)*ut):l[Nt]=l[Nt+1]=l[Nt+2]=0,bt-=lt,xt-=ct,dt-=st,yt-=vt,lt-=p.r,ct-=p.g,st-=p.b,vt-=p.a,Nt=ot+((Nt=St+b)<v?Nt:v)*o<<2,bt+=Ct+=p.r=l[Nt],xt+=mt+=p.g=l[Nt+1],dt+=wt+=p.b=l[Nt+2],yt+=Bt+=p.a=l[Nt+3],p=p.next,lt+=it=m.r,ct+=ft=m.g,st+=gt=m.b,vt+=ut=m.a,Ct-=it,mt-=ft,wt-=gt,Bt-=ut,m=m.next,B+=o}}return t}function f(t,e,r,n,o,i){if(!(isNaN(i)||i<1)){i|=0;var f=a(t,e,r,n,o);f=g(f,e,r,n,o,i),t.getContext("2d").putImageData(f,e,r)}}function g(t,e,a,o,i,f){for(var g,l=t.data,c=2*f+1,s=o-1,v=i-1,b=f+1,x=b*(b+1)/2,d=new u,y=d,h=1;h<c;h++)y=y.next=new u,h===b&&(g=y);y.next=d;for(var p,m,w=null,B=null,C=r[f],E=n[f],I=0,S=0,N=0;N<i;N++){var R=l[S],D=l[S+1],G=l[S+2],T=b*R,j=b*D,A=b*G,W=x*R,k=x*D,H=x*G;y=d;for(var _=0;_<b;_++)y.r=R,y.g=D,y.b=G,y=y.next;for(var M=0,O=0,P=0,q=1;q<b;q++)p=S+((s<q?s:q)<<2),W+=(y.r=R=l[p])*(m=b-q),k+=(y.g=D=l[p+1])*m,H+=(y.b=G=l[p+2])*m,M+=R,O+=D,P+=G,y=y.next;w=d,B=g;for(var z=0;z<o;z++)l[S]=W*C>>E,l[S+1]=k*C>>E,l[S+2]=H*C>>E,W-=T,k-=j,H-=A,T-=w.r,j-=w.g,A-=w.b,p=I+((p=z+f+1)<s?p:s)<<2,W+=M+=w.r=l[p],k+=O+=w.g=l[p+1],H+=P+=w.b=l[p+2],w=w.next,T+=R=B.r,j+=D=B.g,A+=G=B.b,M-=R,O-=D,P-=G,B=B.next,S+=4;I+=o}for(var F=0;F<o;F++){var J=l[S=F<<2],K=l[S+1],L=l[S+2],Q=b*J,U=b*K,V=b*L,X=x*J,Y=x*K,Z=x*L;y=d;for(var $=0;$<b;$++)y.r=J,y.g=K,y.b=L,y=y.next;for(var tt=0,et=0,rt=0,nt=1,at=o;nt<=f;nt++)S=at+F<<2,X+=(y.r=J=l[S])*(m=b-nt),Y+=(y.g=K=l[S+1])*m,Z+=(y.b=L=l[S+2])*m,tt+=J,et+=K,rt+=L,y=y.next,nt<v&&(at+=o);S=F,w=d,B=g;for(var ot=0;ot<i;ot++)l[p=S<<2]=X*C>>E,l[p+1]=Y*C>>E,l[p+2]=Z*C>>E,X-=Q,Y-=U,Z-=V,Q-=w.r,U-=w.g,V-=w.b,p=F+((p=ot+b)<v?p:v)*o<<2,X+=tt+=w.r=l[p],Y+=et+=w.g=l[p+1],Z+=rt+=w.b=l[p+2],w=w.next,Q+=J=B.r,U+=K=B.g,V+=L=B.b,tt-=J,et-=K,rt-=L,B=B.next,S+=o}return t}var u=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.r=0,this.g=0,this.b=0,this.a=0,this.next=null};t.BlurStack=u,t.canvasRGB=f,t.canvasRGBA=o,t.image=function(t,e,r,n,a,i){if("string"==typeof t&&(t=document.getElementById(t)),t&&"naturalWidth"in t){var g=a?"offset":"natural",u=t[g+"Width"],l=t[g+"Height"];if("string"==typeof e&&(e=document.getElementById(e)),e&&"getContext"in e){i||(e.style.width=u+"px",e.style.height=l+"px"),e.width=u,e.height=l;var c=e.getContext("2d");c.clearRect(0,0,u,l),c.drawImage(t,0,0,t.naturalWidth,t.naturalHeight,0,0,u,l),isNaN(r)||r<1||(n?o(e,0,0,u,l,r):f(e,0,0,u,l,r))}}},t.imageDataRGB=g,t.imageDataRGBA=i,Object.defineProperty(t,"__esModule",{value:!0})}));

    //constructor
    const ComputeCanvas = function(width = 256, height = 256) {
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this.updateImageBuffer();
        
        this.wrapMode = "clamp"; //options: "clamp", "repeat"
    };

    const proto = ComputeCanvas.prototype;

    proto.updateImageBuffer = function() {
        const ctx = this._canvas.getContext("2d");
        this._imageBuffer = ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
    };
    
    proto.applyImageBuffer = function() {
        const ctx = this._canvas.getContext("2d");
        ctx.putImageData(this._imageBuffer, 0, 0);
    };
    
    proto.fill = function(style = "rgb(0, 0, 0)") {
        const canvas = this._canvas;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = style;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    proto.getPixel = function(x, y) {
        let _x = x;
        let _y = y;
        const width = this._canvas.width;
        const height = this._canvas.height;
        
        if (this.wrapMode === "clamp") {
            if (_x < 0) {
                _x = 0;
            } else if ( _x >= width) {
                _x = width - 1;
            }
            if (_y < 0) {
                _y = 0;
            } else if ( _y >= height) {
                _y = height - 1;
            }
        } else if (this.wrapMode === "repeat") {
            if (_x < 0 || x >= width) {
                _x = _x % width;
            }
            if (_y < 0 || y >= height) {
                _y = _y % height;
            }
            _x = Math.floor(_x);
            _y = Math.floor(_y);
        }
        
        let index = (_y * this._canvas.width + _x) * 4;
        const data = this._imageBuffer.data;
        const r = data[index];
        const g = data[++index];
        const b = data[++index];
        const a = data[++index];
        return new graphics.Vec4(r, g, b, a);
    };
    
    proto.setPixel = function(x, y, r = 0, g = 0, b = 0, a = 255) {
        let index = (y * this._canvas.width + x) * 4;
        const data = this._imageBuffer.data;
        data[index] = r;
        data[++index] = g;
        data[++index] = b;
        data[++index] = a;
    };
    
    proto.addToPixel = function(x, y, r = 0, g = 0, b = 0, a = 0) {
        let index = (y * this._canvas.width + x) * 4;
        const data = this._imageBuffer.data;
        data[index] += r;
        data[++index] += g;
        data[++index] += b;
        data[++index] += a;
    };
    
    proto.getGradientAt = function(x, y) {
        let index = (y * this._canvas.width + x) * 4;
        const cc = this.getPixel(x, y);
        const cu = this.getPixel(x, y - 1);
        const cr = this.getPixel(x + 1, y);
        const cd = this.getPixel(x, y + 1);
        const cl = this.getPixel(x - 1, y);
        

        const du = cc.subtract(cu);
        const dr = cr.subtract(cc);
        const dd = cd.subtract(cc);
        const dl = cc.subtract(cl);
        
        const dx = dl.add(dr).scale(0.5);
        const dy = du.add(dd).scale(0.5);
        
        return new graphics.Grad4(dx, dy);
    };
    
    proto.blur = function(radius) {
        StackBlur.imageDataRGBA(this._imageBuffer, 0, 0, this._canvas.width, this._canvas.height, radius);
    };

    graphics.ComputeCanvas = ComputeCanvas;
})();


/////////

this.colony = this.colony || {};

//namespace
this.colony = this.colony || {};

//class
(function() {
    "use strict";

    //constructor
    const ObjectPool = function(ctrFunc, amount = 64) {
        this._ctrFunc = ctrFunc;
        this._cache = [];
        this._activeMap = [];
        this._activeCount = 0;
        for (let i = 0; i < amount; i++) {
            this._cache[i] = new ctrFunc();
            this._activeMap[i] = false;
        }
        Object.defineProperty(this, "length", {
            get() {
                return this._cache.length;
            }
        });
    };

    const proto = ObjectPool.prototype;

    proto._firstInactive = function() {
        let i = 0;
        while (i < this._cache.length && this._activeMap[i]) {
            ++i;
        }
        const obj = (i === this._cache.length) ? null : this._cache[i];
        return [obj, i];
    };

    proto.getObject = function() {
        let obj;
        if (this._activeCount === this._cache.length) {
            obj = new this._ctrFunc()
            this._cache.push(obj);
            this._activeMap.push(true);
        } else {
            const arr = this._firstInactive();
            obj = arr[0];
            const i = arr[1];
            this._activeMap[i] = true;
        }
        ++this._activeCount;
        return obj;
    };

    proto.putObject = function(obj) {
        const i = this._cache.indexOf(obj);
        const active = this._activeMap[i];
        if (this._activeMap[i]) {
            this._activeMap[i] = false;
            --this._activeCount;
        }
    };

    proto.forEach = function(func) {
        for (let i = 0; i < this._activeMap.length; i++) {
            if (this._activeMap[i]) {
                const discard = func.apply(this._cache[i]);
                if (discard) {
                    this._activeMap[i] = false;
                    --this._activeCount;
                }
            }
        }
    }

    colony.ObjectPool = ObjectPool;
})();

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

    proto.rotate = function(theta) {
        this.angle += theta;
        return this;
    }

    colony.Ant = Ant;
})();

//requires: ant.js, objectpool.js

//namespace
this.colony = this.colony || {};

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
                computeCanvas.addToPixel(x, y, 50, 0, 0, 0);
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
        this._computeCanvas.applyImageBuffer();
        const cc = this._computeCanvas._canvas;
        ctx.drawImage(cc, 0, 0, canvas.width, canvas.height);
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
                if (angle) {
                    this.angle -= (angle - this.angle)/100;
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