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