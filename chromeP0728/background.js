var myImport = function() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "./JSlib/pdf.js"); // 引用文件的路径
    document.getElementsByTagName('head')[0].appendChild(script); // 引用文件
}

window.onload = function() {
    myImport();
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
            url: chrome.runtime.getURL("test.html"),
            type: "panel"
        },
        function(win) { // win represents the Window object from windows API 
            // Do something after opening 
        });
});



var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, n) {
    if (t == Array.prototype || t == Object.prototype) return t;
    t[e] = n.value;
    return t
};
$jscomp.getGlobal = function(t) { t = ["object" == typeof globalThis && globalThis, t, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global]; for (var e = 0; e < t.length; ++e) { var n = t[e]; if (n && n.Math == Math) return n } throw Error("Cannot find global object") };
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(t, e) {
    var n = $jscomp.propertyToPolyfillSymbol[e];
    if (null == n) return t[e];
    n = t[n];
    return void 0 !== n ? n : t[e]
};
$jscomp.polyfill = function(t, e, n, o) { e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(t, e, n, o) : $jscomp.polyfillUnisolated(t, e, n, o)) };
$jscomp.polyfillUnisolated = function(t, e, n, o) {
    n = $jscomp.global;
    t = t.split(".");
    for (o = 0; o < t.length - 1; o++) {
        var r = t[o];
        if (!(r in n)) return;
        n = n[r]
    }
    t = t[t.length - 1];
    o = n[t];
    e = e(o);
    e != o && null != e && $jscomp.defineProperty(n, t, { configurable: !0, writable: !0, value: e })
};
$jscomp.polyfillIsolated = function(t, e, n, o) {
    var r = t.split(".");
    t = 1 === r.length;
    o = r[0];
    o = !t && o in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var i = 0; i < r.length - 1; i++) {
        var s = r[i];
        if (!(s in o)) return;
        o = o[s]
    }
    r = r[r.length - 1];
    n = $jscomp.IS_SYMBOL_NATIVE && "es6" === n ? o[r] : null;
    e = e(n);
    null != e && (t ? $jscomp.defineProperty($jscomp.polyfills, r, { configurable: !0, writable: !0, value: e }) : e !== n && (void 0 === $jscomp.propertyToPolyfillSymbol[r] && (n = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[r] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(r) : $jscomp.POLYFILL_PREFIX + n + "$" + r), $jscomp.defineProperty(o, $jscomp.propertyToPolyfillSymbol[r], { configurable: !0, writable: !0, value: e })))
};
$jscomp.underscoreProtoCanBeSet = function() {
    var t = { a: !0 },
        e = {};
    try { return e.__proto__ = t, e.a } catch (t) {}
    return !1
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(t, e) { t.__proto__ = e; if (t.__proto__ !== e) throw new TypeError(t + " is not extensible"); return t } : null;
$jscomp.arrayIteratorImpl = function(t) { var e = 0; return function() { return e < t.length ? { done: !1, value: t[e++] } : { done: !0 } } };
$jscomp.arrayIterator = function(t) { return { next: $jscomp.arrayIteratorImpl(t) } };
$jscomp.makeIterator = function(t) { var e = "undefined" != typeof Symbol && Symbol.iterator && t[Symbol.iterator]; return e ? e.call(t) : $jscomp.arrayIterator(t) };
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(t) { if (!(t instanceof Object)) throw new TypeError("Iterator result " + t + " is not an object") };
$jscomp.generator.Context = function() {
    this.isRunning_ = !1;
    this.yieldAllIterator_ = null;
    this.yieldResult = void 0;
    this.nextAddress = 1;
    this.finallyAddress_ = this.catchAddress_ = 0;
    this.finallyContexts_ = this.abruptCompletion_ = null
};
$jscomp.generator.Context.prototype.start_ = function() {
    if (this.isRunning_) throw new TypeError("Generator is already running");
    this.isRunning_ = !0
};
$jscomp.generator.Context.prototype.stop_ = function() { this.isRunning_ = !1 };
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() { this.nextAddress = this.catchAddress_ || this.finallyAddress_ };
$jscomp.generator.Context.prototype.next_ = function(t) { this.yieldResult = t };
$jscomp.generator.Context.prototype.throw_ = function(t) {
    this.abruptCompletion_ = { exception: t, isException: !0 };
    this.jumpToErrorHandler_()
};
$jscomp.generator.Context.prototype.return = function(t) {
    this.abruptCompletion_ = { return: t };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(t) {
    this.abruptCompletion_ = { jumpTo: t };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.yield = function(t, e) { this.nextAddress = e; return { value: t } };
$jscomp.generator.Context.prototype.yieldAll = function(t, e) {
    t = $jscomp.makeIterator(t);
    var n = t.next();
    $jscomp.generator.ensureIteratorResultIsObject_(n);
    if (n.done) this.yieldResult = n.value, this.nextAddress = e;
    else return this.yieldAllIterator_ = t, this.yield(n.value, e)
};
$jscomp.generator.Context.prototype.jumpTo = function(t) { this.nextAddress = t };
$jscomp.generator.Context.prototype.jumpToEnd = function() { this.nextAddress = 0 };
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(t, e) {
    this.catchAddress_ = t;
    void 0 != e && (this.finallyAddress_ = e)
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(t) {
    this.catchAddress_ = 0;
    this.finallyAddress_ = t || 0
};
$jscomp.generator.Context.prototype.leaveTryBlock = function(t, e) {
    this.nextAddress = t;
    this.catchAddress_ = e || 0
};
$jscomp.generator.Context.prototype.enterCatchBlock = function(t) {
    this.catchAddress_ = t || 0;
    t = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return t
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(t, e, n) {
    n ? this.finallyContexts_[n] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
    this.catchAddress_ = t || 0;
    this.finallyAddress_ = e || 0
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(t, e) {
    e = this.finallyContexts_.splice(e || 0)[0];
    if (e = this.abruptCompletion_ = this.abruptCompletion_ || e) {
        if (e.isException) return this.jumpToErrorHandler_();
        void 0 != e.jumpTo && this.finallyAddress_ < e.jumpTo ? (this.nextAddress = e.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
    } else this.nextAddress = t
};
$jscomp.generator.Context.prototype.forIn = function(t) { return new $jscomp.generator.Context.PropertyIterator(t) };
$jscomp.generator.Context.PropertyIterator = function(t) {
    this.object_ = t;
    this.properties_ = [];
    for (var e in t) this.properties_.push(e);
    this.properties_.reverse()
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() { for (; 0 < this.properties_.length;) { var t = this.properties_.pop(); if (t in this.object_) return t } return null };
$jscomp.generator.Engine_ = function(t) {
    this.context_ = new $jscomp.generator.Context;
    this.program_ = t
};
$jscomp.generator.Engine_.prototype.next_ = function(t) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_.next, t, this.context_.next_);
    this.context_.next_(t);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.return_ = function(t) {
    this.context_.start_();
    var e = this.context_.yieldAllIterator_;
    if (e) return this.yieldAllStep_("return" in e ? e["return"] : function(t) { return { value: t, done: !0 } }, t, this.context_.return);
    this.context_.return(t);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.throw_ = function(t) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], t, this.context_.next_);
    this.context_.throw_(t);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(t, e, n) {
    try {
        var o = t.call(this.context_.yieldAllIterator_, e);
        $jscomp.generator.ensureIteratorResultIsObject_(o);
        if (!o.done) return this.context_.stop_(), o;
        var r = o.value
    } catch (t) { return this.context_.yieldAllIterator_ = null, this.context_.throw_(t), this.nextStep_() }
    this.context_.yieldAllIterator_ = null;
    n.call(this.context_, r);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
    for (; this.context_.nextAddress;) try { var t = this.program_(this.context_); if (t) return this.context_.stop_(), { value: t.value, done: !1 } } catch (t) { this.context_.yieldResult = void 0, this.context_.throw_(t) }
    this.context_.stop_();
    if (this.context_.abruptCompletion_) {
        t = this.context_.abruptCompletion_;
        this.context_.abruptCompletion_ = null;
        if (t.isException) throw t.exception;
        return { value: t.return, done: !0 }
    }
    return { value: void 0, done: !0 }
};
$jscomp.generator.Generator_ = function(e) {
    this.next = function(t) { return e.next_(t) };
    this.throw = function(t) { return e.throw_(t) };
    this.return = function(t) { return e.return_(t) };
    this[Symbol.iterator] = function() { return this }
};
$jscomp.generator.createGenerator = function(t, e) {
    e = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(e));
    $jscomp.setPrototypeOf && t.prototype && $jscomp.setPrototypeOf(e, t.prototype);
    return e
};
$jscomp.asyncExecutePromiseGenerator = function(r) {
    function i(t) { return r.next(t) }

    function s(t) { return r.throw(t) }
    return new Promise(function(e, n) {
        function o(t) { t.done ? e(t.value) : Promise.resolve(t.value).then(i, s).then(o, n) }
        o(r.next())
    })
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(t) { return $jscomp.asyncExecutePromiseGenerator(t()) };
$jscomp.asyncExecutePromiseGeneratorProgram = function(t) { return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(t))) };
$jscomp.initSymbol = function() {};
$jscomp.polyfill("Symbol", function(t) {
    if (t) return t;
    var e = function(t, e) {
        this.$jscomp$symbol$id_ = t;
        $jscomp.defineProperty(this, "description", { configurable: !0, writable: !0, value: e })
    };
    e.prototype.toString = function() { return this.$jscomp$symbol$id_ };
    var n = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_",
        o = 0,
        r = function(t) { if (this instanceof r) throw new TypeError("Symbol is not a constructor"); return new e(n + (t || "") + "_" + o++, t) };
    return r
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(t) {
    if (t) return t;
    t = Symbol("Symbol.iterator");
    for (var e = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), n = 0; n < e.length; n++) { var o = $jscomp.global[e[n]]; "function" === typeof o && "function" != typeof o.prototype[t] && $jscomp.defineProperty(o.prototype, t, { configurable: !0, writable: !0, value: function() { return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this)) } }) }
    return t
}, "es6", "es3");
$jscomp.iteratorPrototype = function(t) {
    t = { next: t };
    t[Symbol.iterator] = function() { return this };
    return t
};
$jscomp.polyfill("Promise", function(t) {
    function e() { this.batch_ = null }

    function a(n) { return n instanceof c ? n : new c(function(t, e) { t(n) }) }
    if (t && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) return t;
    e.prototype.asyncExecute = function(t) {
        if (null == this.batch_) {
            this.batch_ = [];
            var e = this;
            this.asyncExecuteFunction(function() { e.executeBatch_() })
        }
        this.batch_.push(t)
    };
    var n = $jscomp.global.setTimeout;
    e.prototype.asyncExecuteFunction = function(t) { n(t, 0) };
    e.prototype.executeBatch_ = function() {
        for (; this.batch_ && this.batch_.length;) {
            var t = this.batch_;
            this.batch_ = [];
            for (var e = 0; e < t.length; ++e) {
                var n = t[e];
                t[e] = null;
                try { n() } catch (t) { this.asyncThrow_(t) }
            }
        }
        this.batch_ = null
    };
    e.prototype.asyncThrow_ = function(t) { this.asyncExecuteFunction(function() { throw t }) };
    var c = function(t) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        this.isRejectionHandled_ = !1;
        var e = this.createResolveAndReject_();
        try { t(e.resolve, e.reject) } catch (t) { e.reject(t) }
    };
    c.prototype.createResolveAndReject_ = function() {
        function t(e) { return function(t) { o || (o = !0, e.call(n, t)) } }
        var n = this,
            o = !1;
        return { resolve: t(this.resolveTo_), reject: t(this.reject_) }
    };
    c.prototype.resolveTo_ = function(t) {
        if (t === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (t instanceof c) this.settleSameAsPromise_(t);
        else {
            t: switch (typeof t) {
                case "object":
                    var e = null != t;
                    break t;
                case "function":
                    e = !0;
                    break t;
                default:
                    e = !1
            }
            e ? this.resolveToNonPromiseObj_(t) : this.fulfill_(t)
        }
    };
    c.prototype.resolveToNonPromiseObj_ = function(t) { var e = void 0; try { e = t.then } catch (t) { this.reject_(t); return } "function" == typeof e ? this.settleSameAsThenable_(e, t) : this.fulfill_(t) };
    c.prototype.reject_ = function(t) { this.settle_(2, t) };
    c.prototype.fulfill_ = function(t) { this.settle_(1, t) };
    c.prototype.settle_ = function(t, e) {
        if (0 != this.state_) throw Error("Cannot settle(" + t + ", " + e + "): Promise already settled in state" + this.state_);
        this.state_ = t;
        this.result_ = e;
        2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
        this.executeOnSettledCallbacks_()
    };
    c.prototype.scheduleUnhandledRejectionCheck_ = function() {
        var e = this;
        n(function() { if (e.notifyUnhandledRejection_()) { var t = $jscomp.global.console; "undefined" !== typeof t && t.error(e.result_) } }, 1)
    };
    c.prototype.notifyUnhandledRejection_ = function() {
        if (this.isRejectionHandled_) return !1;
        var t = $jscomp.global.CustomEvent,
            e = $jscomp.global.Event,
            n = $jscomp.global.dispatchEvent;
        if ("undefined" === typeof n) return !0;
        "function" === typeof t ? t = new t("unhandledrejection", { cancelable: !0 }) : "function" === typeof e ? t = new e("unhandledrejection", { cancelable: !0 }) : (t = $jscomp.global.document.createEvent("CustomEvent"), t.initCustomEvent("unhandledrejection", !1, !0, t));
        t.promise = this;
        t.reason = this.result_;
        return n(t)
    };
    c.prototype.executeOnSettledCallbacks_ = function() {
        if (null != this.onSettledCallbacks_) {
            for (var t = 0; t < this.onSettledCallbacks_.length; ++t) r.asyncExecute(this.onSettledCallbacks_[t]);
            this.onSettledCallbacks_ = null
        }
    };
    var r = new e;
    c.prototype.settleSameAsPromise_ = function(t) {
        var e = this.createResolveAndReject_();
        t.callWhenSettled_(e.resolve, e.reject)
    };
    c.prototype.settleSameAsThenable_ = function(t, e) { var n = this.createResolveAndReject_(); try { t.call(e, n.resolve, n.reject) } catch (t) { n.reject(t) } };
    c.prototype.then = function(t, e) {
        function n(e, t) { return "function" == typeof e ? function(t) { try { o(e(t)) } catch (t) { r(t) } } : t }
        var o, r, i = new c(function(t, e) {
            o = t;
            r = e
        });
        this.callWhenSettled_(n(t, o), n(e, r));
        return i
    };
    c.prototype.catch = function(t) { return this.then(void 0, t) };
    c.prototype.callWhenSettled_ = function(t, e) {
        function n() {
            switch (o.state_) {
                case 1:
                    t(o.result_);
                    break;
                case 2:
                    e(o.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + o.state_)
            }
        }
        var o = this;
        null == this.onSettledCallbacks_ ? r.asyncExecute(n) : this.onSettledCallbacks_.push(n);
        this.isRejectionHandled_ = !0
    };
    c.resolve = a;
    c.reject = function(n) { return new c(function(t, e) { e(n) }) };
    c.race = function(r) { return new c(function(t, e) { for (var n = $jscomp.makeIterator(r), o = n.next(); !o.done; o = n.next()) a(o.value).callWhenSettled_(t, e) }) };
    c.all = function(t) {
        var i = $jscomp.makeIterator(t),
            s = i.next();
        return s.done ? a([]) : new c(function(n, t) {
            function e(e) {
                return function(t) {
                    o[e] = t;
                    r--;
                    0 == r && n(o)
                }
            }
            var o = [],
                r = 0;
            do { o.push(void 0), r++, a(s.value).callWhenSettled_(e(o.length - 1), t), s = i.next() } while (!s.done)
        })
    };
    return c
}, "es6", "es3");
chrome.browserAction.onClicked.addListener(function(t) { chrome.tabs.create({ url: chrome.extension.getURL("index.html") }) });
var CAPABILITIES = ' {      "version": "1.0",      "printer": {       "supported_content_type": [          {"content_type": "application/pdf","min_version":"1.5","max_version":"1.5"},          {"content_type": "image/pwg-raster"}        ],        "copies": {          "default": 1,          "max": 100        },        "color":{          "option": [       {"type":  "STANDARD_MONOCHROME", "is_default":  true}          ]        },    "copies": {       "default": 1,       "max": 100     },        "collate": { "default": true},        "page_orientation":{"option":[{"type":"PORTRAIT","is_default":true},{"type":"LANDSCAPE"}]},        "margins":{"option":[{"type":"BORDERLESS","top":0,"left":0,"right":0,"bottom":0},{"type":"STANDARD","is_default":true},{"type":"CUSTOM"}]},        "media_size": {      "option": [        {    "name": "ISO_4.00x6.00 inch",          "width_microns": 102000,          "height_microns": 152000,         "is_default": true         },         {          "name": "ISO_2.25x1.25 inch",          "width_microns": 57000,          "height_microns": 32000,          "is_default": false        },         {          "name": "ISO_1.25x2.25 inch",          "width_microns": 32000,          "height_microns": 57000,          "is_default": false        },         {          "name": "ISO_1.50x0.50 inch",          "width_microns": 38000,          "height_microns": 13000,          "is_default": false        },         {          "name": "ISO_1.50x1.00 inch",          "width_microns": 38000,          "height_microns": 25000,          "is_default": false        },         {          "name": "ISO_1.50x2.00 inch",          "width_microns": 38000,          "height_microns": 51000,          "is_default": false        },         {          "name": "ISO_2.00x0.50 inch",          "width_microns": 51000,          "height_microns": 13000,          "is_default": false        },         {          "name": "ISO_2.00x1.00 inch",          "width_microns": 51000,          "height_microns": 25000,          "is_default": false        },         {          "name": "ISO_2.00x1.25 inch",          "width_microns": 51000,          "height_microns": 32000,          "is_default": false        },         {          "name": "ISO_2.00x2.00 inch",          "width_microns": 51000,          "height_microns": 51000,          "is_default": false        },         {          "name": "ISO_2.00x4.00 inch",          "width_microns": 51000,          "height_microns": 102000,          "is_default": false        },         {          "name": "ISO_2.00x5.50 inch",          "width_microns": 51000,          "height_microns": 140000,          "is_default": false        },         {          "name": "ISO_2.25x0.50 inch",          "width_microns": 57000,          "height_microns": 13000,          "is_default": false        },         {          "name": "ISO_2.25x4.00 inch",          "width_microns": 57000,          "height_microns": 102000,          "is_default": false        },         {          "name": "ISO_2.25x5.50 inch",          "width_microns": 57000,          "height_microns": 140000,          "is_default": false        },         {          "name": "ISO_2.38x5.50 inch",          "width_microns": 60000,          "height_microns": 140000,          "is_default": false        },         {          "name": "ISO_2.50x1.00 inch",          "width_microns": 64000,          "height_microns": 25000,          "is_default": false        },         {          "name": "ISO_2.50x2.00 inch",          "width_microns": 64000,          "height_microns": 51000,          "is_default": false        },         {          "name": "ISO_2.75x1.25 inch",          "width_microns": 70000,          "height_microns": 32000,          "is_default": false        },         {          "name": "ISO_3.00x1.00 inch",          "width_microns": 76000,          "height_microns": 25000,          "is_default": false        },         {          "name": "ISO_3.00x1.25 inch",          "width_microns": 76000,          "height_microns": 32000,          "is_default": false        },         {          "name": "ISO_3.00x2.00 inch",          "width_microns": 76000,          "height_microns": 51000,          "is_default": false        },         {          "name": "ISO_3.00x3.00 inch",          "width_microns": 76000,          "height_microns": 76000,          "is_default": false        },         {          "name": "ISO_3.00x5.00 inch",          "width_microns": 76000,          "height_microns": 127000,          "is_default": false        },         {          "name": "ISO_3.25x2.00 inch",          "width_microns": 83000,          "height_microns": 51000,          "is_default": false        },         {          "name": "ISO_3.25x5.00 inch",          "width_microns": 83000,          "height_microns": 127000,          "is_default": false        },         {          "name": "ISO_3.25x5.50 inch",          "width_microns": 83000,          "height_microns": 140000,          "is_default": false        },         {          "name": "ISO_3.25x5.83 inch",          "width_microns": 83000,          "height_microns": 148000,          "is_default": false        },         {          "name": "ISO_3.25x7.38 inch",          "width_microns": 83000,          "height_microns": 188000,          "is_default": false        },         {          "name": "ISO_3.50x1.00 inch",          "width_microns": 89000,          "height_microns": 25000,          "is_default": false        },         {          "name": "ISO_4.00x1.00 inch",          "width_microns": 102000,          "height_microns": 25000,          "is_default": false        },         {          "name": "ISO_4.00x2.00 inch",          "width_microns": 102000,          "height_microns": 51000,          "is_default": false        },         {          "name": "ISO_4.00x2.50 inch",          "width_microns": 102000,          "height_microns": 64000,          "is_default": false        },         {          "name": "ISO_4.00x3.00 inch",          "width_microns": 102000,          "height_microns": 76000,          "is_default": false        },         {          "name": "ISO_4.00x4.00 inch",          "width_microns": 102000,          "height_microns": 102000,          "is_default": false        },         {          "name": "ISO_4.00x6.50 inch",          "width_microns": 102000,          "height_microns": 165000,          "is_default": false        },         {          "name": "ISO_4.00x8.00 inch",          "width_microns": 102000,          "height_microns": 203000,          "is_default": false        },         {          "name": "ISO_4.00x11.00 inch",          "width_microns": 102000,          "height_microns": 280000,          "is_default": false        },         {          "name": "ISO_4.00x13.00 inch",          "width_microns": 102000,          "height_microns": 330000,          "is_default": false        }    ]    }      }    } ',
    cdd = JSON.parse(CAPABILITIES);
chrome.printerProvider.onGetPrintersRequested.addListener(function(e) {
    return $jscomp.asyncExecutePromiseGeneratorProgram(function(t) {
        e([{ id: "printer", name: "Printer" }]);
        t.jumpToEnd()
    })
});
chrome.printerProvider.onGetCapabilityRequested.addListener(function(t, e) { return e(cdd) });

function openPage(g, j, x, S, w) {
    console.log("openPage");
    g.getPage(j).then(function(r) {
        var m = 4;
        var f = 8;
        var i = 1;
        var d = 0;
        var y = 2;
        chrome.storage.sync.get(function(t) {
            var e = r.getViewport().width;
            var n = S * 8;
            if (i == 2) { n = S * 12 } else { n = S * 8 }
            var o = n / r.getViewport(1).width;
            debug = "wi:" + S.toString() + "width:" + n.toString() + "f.getViewport(1).width:" + r.getViewport(1).width.toString() + "\r\n";
            viewport = r.getViewport(o);
            var u = x.canvas;

            u.width = viewport.width;
            u.height = viewport.height;
            window.wi = u.width;
            window.he = u.height;
            debug = "e:" + o.toString() + "h.width:" + u.width.toString() + "h.height:" + u.height.toString() + "window.wi:" + window.wi.toString() + "window.he:" + window.he.toString() + "\r\n";
            u.style.width = "100%";
            u.style.height = "100%";
            console.log(r);
            console.log(typeof(r));

            imgData = x.getImageData(0, 0, u.width, u.height).data;
            console.log(imgData);

        })
    })
}

if (dataURL == undefined){
	var dataURL;
}
chrome.printerProvider.onPrintRequested.addListener(function(job, rcb) {
    var pdfblob = job.document;
    pdfurl = URL.createObjectURL(pdfblob)
    let loadingTask = pdfjsLib.getDocument(pdfurl);
    console.log("hi");
    loadingTask.promise.then((pdf) => {
        //页数
        let numPages = pdf.numPages;
        let scale = 2;
        let Mycanvas = document.querySelector("#the-canvas");
        let imgList = [];
        let top = 0;
        let height = 0;
        let width = 0;
        dataURL = [];
        let okRender = new Promise(async(res, rej) => {
            for (let i = 1; i <= numPages; i++) {
                let page = await pdf.getPage(i);
                let viewport = page.getViewport({
                    scale: scale * 1.41,
                });
                let canvas = document.createElement("canvas");
                canvas.height = viewport.height; // 读取文件宽高->标签宽高
                canvas.width = viewport.width;
                let context = canvas.getContext("2d");
                let renderContext = {
                    canvasContext: context, // 此为canvas的context
                    viewport: viewport,
                };
                let success = await page.render(renderContext).promise;
                if (i === 1) {
                    height = viewport.height;
                    width = viewport.width;
                    Mycanvas.height = viewport.height * numPages;
                    Mycanvas.width = viewport.width;
                }
                dataURL = canvas.toDataURL("image/jpeg", 1);
                console.log(dataURL);
                imgList.push(dataURL);
                if (i === numPages) {
                    res();
                }
                new p5(s);

            }
        });
    });
    return rcb("OK");
});

function saveBlob(t, e) {
    var n = document.createElement("a");
    document.body.appendChild(n);
    n.style = "display: none";
    t = window.URL.createObjectURL(t);
    n.href = t;
    n.download = e;
    n.click();
    window.URL.revokeObjectURL(t)
}