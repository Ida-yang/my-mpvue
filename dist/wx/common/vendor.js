global.webpackJsonpMpvue([0],{

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// fix env
try {
  if (!global) global = {};
  global.process = global.process || {};
  global.process.env = global.process.env || {};
  global.App = global.App || App;
  global.Page = global.Page || Page;
  global.Component = global.Component || Component;
  global.getApp = global.getApp || getApp;

  if (typeof wx !== 'undefined') {
    global.mpvue = wx;
    global.mpvuePlatform = 'wx';
  } else if (typeof swan !== 'undefined') {
    global.mpvue = swan;
    global.mpvuePlatform = 'swan';
  }else if (typeof tt !== 'undefined') {
    global.mpvue = tt;
    global.mpvuePlatform = 'tt';
  }else if (typeof my !== 'undefined') {
    global.mpvue = my;
    global.mpvuePlatform = 'my';
  }
} catch (e) {}

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated', 'onLaunch',
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onTabItemTap',
  'attached',
  'ready',
  'moved',
  'detached'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;

var formatComponentName = (null); // work around flow check

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = ['mpvue-runtime'].join();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  // } else if (typeof MutationObserver !== 'undefined' && (
  //   isNative(MutationObserver) ||
  //   // PhantomJS and iOS 7.x
  //   MutationObserver.toString() === '[object MutationObserverConstructor]'
  // )) {
  //   // use MutationObserver where native Promise is not available,
  //   // e.g. PhantomJS IE11, iOS7, Android 4.4
  //   var counter = 1
  //   var observer = new MutationObserver(nextTickHandler)
  //   var textNode = document.createTextNode(String(counter))
  //   observer.observe(textNode, {
  //     characterData: true
  //   })
  //   timerFunc = () => {
  //     counter = (counter + 1) % 2
  //     textNode.data = String(counter)
  //   }
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value, key) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  if (key) {
    this.key = key;
  }
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData, key) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value, key);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val, undefined, key);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, undefined, key);
      dep.notify();

      if (!obj.__keyPath) {
        def(obj, '__keyPath', {}, false);
      }
      obj.__keyPath[key] = true;
      if (newVal instanceof Object && !(newVal instanceof Array)) {
        // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
        def(newVal, '__newReference', true, false);
      }
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  // Vue.set 添加对象属性，渲染时候把 val 传给小程序渲染
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  target.__keyPath[key] = true;
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  // Vue.del 删除对象属性，渲染时候把这个属性设置为 undefined
  target.__keyPath[key] = 'del';
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var mark;
var measure;

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;


function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  "production" !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {}
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  "production" !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    
  }
}

function initWatch (vm, watch) {
  "production" !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (false) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // keep listeners
  var listeners = data.on;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.1';
Vue$3.mpvueVersion = '2.0.6';

/* globals renderer */



var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
var canBeLeftOpenTag = makeMap(
  'web,spinner,switch,video,textarea,canvas,' +
  'indicator,marquee,countdown',
  true
);

var isUnaryTag = makeMap(
  'embed,img,image,input,link,meta',
  true
);

function mustUseProp () { /* console.log('mustUseProp') */ }
function getTagNamespace () { /* console.log('getTagNamespace') */ }
function isUnknownElement () { /* console.log('isUnknownElement') */ }



function getComKey (vm) {
  return vm && vm.$attrs ? vm.$attrs['mpcomid'] : '0'
}

// 用于小程序的 event type 到 web 的 event
var eventTypeMap = {
  tap: ['tap', 'click'],
  touchstart: ['touchstart'],
  touchmove: ['touchmove'],
  touchcancel: ['touchcancel'],
  touchend: ['touchend'],
  longtap: ['longtap'],
  input: ['input'],
  blur: ['change', 'blur'],
  submit: ['submit'],
  focus: ['focus'],
  scrolltoupper: ['scrolltoupper'],
  scrolltolower: ['scrolltolower'],
  scroll: ['scroll']
};

/*  */

// import { namespaceMap } from 'mp/util/index'

var obj = {};

function createElement$1 (tagName, vnode) {
  return obj
}

function createElementNS (namespace, tagName) {
  return obj
}

function createTextNode (text) {
  return obj
}

function createComment (text) {
  return obj
}

function insertBefore (parentNode, newNode, referenceNode) {}

function removeChild (node, child) {}

function appendChild (node, child) {}

function parentNode (node) {
  return obj
}

function nextSibling (node) {
  return obj
}

function tagName (node) {
  return 'div'
}

function setTextContent (node, text) {
  return obj
}

function setAttribute (node, key, val) {
  return obj
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (false
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

// import baseModules from 'core/vdom/modules/index'
// const platformModules = []
// import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// const modules = platformModules.concat(baseModules)
var modules = [ref];

var corePatch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

function patch () {
  corePatch.apply(this, arguments);
  this.$updateDataToMP();
}

function callHook$1 (vm, hook, params) {
  var handlers = vm.$options[hook];
  if (hook === 'onError' && handlers) {
    handlers = [handlers];
  } else if (hook === 'onPageNotFound' && handlers) {
    handlers = [handlers];
  }

  var ret;
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        ret = handlers[i].call(vm, params);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  // for child
  if (vm.$children.length) {
    vm.$children.forEach(function (v) { return callHook$1(v, hook, params); });
  }

  return ret
}

// mpType 小程序实例的类型，可能的值是 'app', 'page'
// rootVueVM 是 vue 的根组件实例，子组件中访问 this.$root 可得
function getGlobalData (app, rootVueVM) {
  var mp = rootVueVM.$mp;
  if (app && app.globalData) {
    mp.appOptions = app.globalData.appOptions;
  }
}

// 格式化 properties 属性，并给每个属性加上 observer 方法

// properties 的 一些类型 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
// properties: {
//   paramA: Number,
//   myProperty: { // 属性名
//     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
//     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
//     observer: function(newVal, oldVal, changedPath) {
//        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
//        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
//     }
//   },
// }

// props 的一些类型 https://cn.vuejs.org/v2/guide/components-props.html#ad
// props: {
//   // 基础的类型检查 (`null` 匹配任何类型)
//   propA: Number,
//   // 多个可能的类型
//   propB: [String, Number],
//   // 必填的字符串
//   propC: {
//     type: String,
//     required: true
//   },
//   // 带有默认值的数字
//   propD: {
//     type: Number,
//     default: 100
//   },
//   // 带有默认值的对象
//   propE: {
//     type: Object,
//     // 对象或数组且一定会从一个工厂函数返回默认值
//     default: function () {
//       return { message: 'hello' }
//     }
//   },
//   // 自定义验证函数
//   propF: {
//     validator: function (value) {
//       // 这个值必须匹配下列字符串中的一个
//       return ['success', 'warning', 'danger'].indexOf(value) !== -1
//     }
//   }
// }

// core/util/options
function normalizeProps$1 (props, res, vm) {
  if (!props) { return }
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }

  // fix vueProps to properties
  for (var key$1 in res) {
    if (res.hasOwnProperty(key$1)) {
      var item = res[key$1];
      if (item.default) {
        item.value = item.default;
      }
      var oldObserver = item.observer;
      item.observer = function (newVal, oldVal) {
        vm[name] = newVal;
        // 先修改值再触发原始的 observer，跟 watch 行为保持一致
        if (typeof oldObserver === 'function') {
          oldObserver.call(vm, newVal, oldVal);
        }
      };
    }
  }

  return res
}

function normalizeProperties (vm) {
  var properties = vm.$options.properties;
  var vueProps = vm.$options.props;
  var res = {};

  normalizeProps$1(properties, res, vm);
  normalizeProps$1(vueProps, res, vm);

  return res
}

/**
 * 把 properties 中的属性 proxy 到 vm 上
 */
function initMpProps (vm) {
  var mpProps = vm._mpProps = {};
  var keys = Object.keys(vm.$options.properties || {});
  keys.forEach(function (key) {
    if (!(key in vm)) {
      proxy(vm, '_mpProps', key);
      mpProps[key] = undefined; // for observe
    }
  });
  observe(mpProps, true);
}

function initMP (mpType, next) {
  var rootVueVM = this.$root;
  if (!rootVueVM.$mp) {
    rootVueVM.$mp = {};
  }

  var mp = rootVueVM.$mp;

  // Please do not register multiple Pages
  // if (mp.registered) {
  if (mp.status) {
    // 处理子组件的小程序生命周期
    if (mpType === 'app') {
      callHook$1(this, 'onLaunch', mp.appOptions);
    } else {
      callHook$1(this, 'onLoad', mp.query);
      callHook$1(this, 'onReady');
    }
    return next()
  }
  // mp.registered = true

  mp.mpType = mpType;
  mp.status = 'register';

  if (mpType === 'app') {
    global.App({
      // 页面的初始数据
      globalData: {
        appOptions: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // Do something initial when launch.
      onLaunch: function onLaunch (options) {
        if ( options === void 0 ) options = {};

        mp.app = this;
        mp.status = 'launch';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onLaunch', options);
        next();
      },

      // Do something when app show.
      onShow: function onShow (options) {
        if ( options === void 0 ) options = {};

        mp.status = 'show';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onShow', options);
      },

      // Do something when app hide.
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
      },

      onError: function onError (err) {
        callHook$1(rootVueVM, 'onError', err);
      },

      onPageNotFound: function onPageNotFound (err) {
        callHook$1(rootVueVM, 'onPageNotFound', err);
      }
    });
  } else if (mpType === 'component') {
    initMpProps(rootVueVM);

    global.Component({
      // 小程序原生的组件属性
      properties: normalizeProperties(rootVueVM),
      // 页面的初始数据
      data: {
        $root: {}
      },
      methods: {
        handleProxy: function handleProxy (e) {
          return rootVueVM.$handleProxyWithVue(e)
        }
      },
      // mp lifecycle for vue
      // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
      created: function created () {
        mp.status = 'created';
        mp.page = this;
      },
      // 组件生命周期函数，在组件实例进入页面节点树时执行
      attached: function attached () {
        mp.status = 'attached';
        callHook$1(rootVueVM, 'attached');
      },
      // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
      ready: function ready () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'ready');
        next();

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },
      // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
      moved: function moved () {
        callHook$1(rootVueVM, 'moved');
      },
      // 组件生命周期函数，在组件实例被从页面节点树移除时执行
      detached: function detached () {
        mp.status = 'detached';
        callHook$1(rootVueVM, 'detached');
      }
    });
  } else {
    var app = global.getApp();
    global.Page({
      // 页面的初始数据
      data: {
        $root: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // mp lifecycle for vue
      // 生命周期函数--监听页面加载
      onLoad: function onLoad (query) {
        mp.page = this;
        mp.query = query;
        mp.status = 'load';
        getGlobalData(app, rootVueVM);
        callHook$1(rootVueVM, 'onLoad', query);
      },

      // 生命周期函数--监听页面显示
      onShow: function onShow () {
        mp.page = this;
        mp.status = 'show';
        callHook$1(rootVueVM, 'onShow');

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },

      // 生命周期函数--监听页面初次渲染完成
      onReady: function onReady () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'onReady');
        next();
      },

      // 生命周期函数--监听页面隐藏
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
        mp.page = null;
      },

      // 生命周期函数--监听页面卸载
      onUnload: function onUnload () {
        mp.status = 'unload';
        callHook$1(rootVueVM, 'onUnload');
        mp.page = null;
      },

      // 页面相关事件处理函数--监听用户下拉动作
      onPullDownRefresh: function onPullDownRefresh () {
        callHook$1(rootVueVM, 'onPullDownRefresh');
      },

      // 页面上拉触底事件的处理函数
      onReachBottom: function onReachBottom () {
        callHook$1(rootVueVM, 'onReachBottom');
      },

      // 用户点击右上角分享
      onShareAppMessage: rootVueVM.$options.onShareAppMessage
        ? function (options) { return callHook$1(rootVueVM, 'onShareAppMessage', options); } : null,

      // Do something when page scroll
      onPageScroll: function onPageScroll (options) {
        callHook$1(rootVueVM, 'onPageScroll', options);
      },

      // 当前是 tab 页时，点击 tab 时触发
      onTabItemTap: function onTabItemTap (options) {
        callHook$1(rootVueVM, 'onTabItemTap', options);
      }
    });
  }
}

var updateDataTotal = 0; // 总共更新的数据量
function diffLog (updateData) {
  updateData = JSON.stringify(updateData);
  if (!Vue$3._mpvueTraceTimer) {
    Vue$3._mpvueTraceTimer = setTimeout(function () {
      clearTimeout(Vue$3._mpvueTraceTimer);
      updateDataTotal = (updateDataTotal / 1024).toFixed(1);
      console.log('这次操作引发500ms内数据更新量:' + updateDataTotal + 'kb');
      Vue$3._mpvueTraceTimer = 0;
      updateDataTotal = 0;
    }, 500);
  } else if (Vue$3._mpvueTraceTimer) {
    updateData = updateData.replace(/[^\u0000-\u00ff]/g, 'aa'); // 中文占2字节，中文替换成两个字母计算占用空间
    updateDataTotal += updateData.length;
  }
}

var KEY_SEP$1 = '_';

function getDeepData (keyList, viewData) {
  if (keyList.length > 1) {
    var _key = keyList.splice(0, 1);
    var _viewData = viewData[_key];
    if (_viewData) {
      return getDeepData(keyList, _viewData)
    } else {
      return null
    }
  } else {
    if (viewData[keyList[0]]) {
      return viewData[keyList[0]]
    } else {
      return null
    }
  }
}

function compareAndSetDeepData (key, newData, vm, data, forceUpdate) {
  // 比较引用类型数据
  try {
    var keyList = key.split('.');
    // page.__viewData__老版小程序不存在，使用mpvue里绑的data比对
    var oldData = getDeepData(keyList, vm.$root.$mp.page.data);
    if (oldData === null || JSON.stringify(oldData) !== JSON.stringify(newData) || forceUpdate) {
      data[key] = newData;
    } else {
      var keys = Object.keys(oldData);
      keys.forEach(function (_key) {
        var properties = Object.getOwnPropertyDescriptor(oldData, _key);
        if (!properties['get'] && !properties['set']) {
          data[key + '.' + _key] = newData[_key];
        }
      });
    }
  } catch (e) {
    console.log(e, key, newData, vm);
  }
}

function cleanKeyPath (vm) {
  if (vm.__mpKeyPath) {
    Object.keys(vm.__mpKeyPath).forEach(function (_key) {
      delete vm.__mpKeyPath[_key]['__keyPath'];
    });
  }
}

function minifyDeepData (rootKey, originKey, vmData, data, _mpValueSet, vm) {
  try {
    if (vmData instanceof Array) {
       // 数组
      compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data, true);
    } else {
      // Object
      var _keyPathOnThis = {}; // 存储这层对象的keyPath
      if (vmData.__keyPath && !vmData.__newReference) {
        // 有更新列表 ，按照更新列表更新
        _keyPathOnThis = vmData.__keyPath;
        Object.keys(vmData).forEach(function (_key) {
          if (vmData[_key] instanceof Object) {
            // 引用类型 递归
            if (_key === '__keyPath') {
              return
            }
            minifyDeepData(rootKey + '.' + originKey, _key, vmData[_key], data, null, vm);
          } else {
            // 更新列表中的 加入data
            if (_keyPathOnThis[_key] === true) {
              if (originKey) {
                data[rootKey + '.' + originKey + '.' + _key] = vmData[_key];
              } else {
                data[rootKey + '.' + _key] = vmData[_key];
              }
            }
          }
        });
         // 根节点可能有父子引用同一个引用类型数据，依赖树都遍历完后清理
        vm['__mpKeyPath'] = vm['__mpKeyPath'] || {};
        vm['__mpKeyPath'][vmData.__ob__.dep.id] = vmData;
      } else {
        // 没有更新列表
        compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data);
      }
      // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
      def(vmData, '__newReference', false, false);
    }
  } catch (e) {
    console.log(e, rootKey, originKey, vmData, data);
  }
}

function getRootKey (vm, rootKey) {
  if (!vm.$parent.$attrs) {
    rootKey = '$root.0' + KEY_SEP$1 + rootKey;
    return rootKey
  } else {
    rootKey = vm.$parent.$attrs.mpcomid + KEY_SEP$1 + rootKey;
    return getRootKey(vm.$parent, rootKey)
  }
}

function diffData (vm, data) {
  var vmData = vm._data || {};
  var vmProps = vm._props || {};
  var rootKey = '';
  if (!vm.$attrs) {
    rootKey = '$root.0';
  } else {
    rootKey = getRootKey(vm, vm.$attrs.mpcomid);
  }
  Vue$3.nextTick(function () {
    cleanKeyPath(vm);
  });
  // console.log(rootKey)

  // 值类型变量不考虑优化，还是直接更新
  var __keyPathOnThis = vmData.__keyPath || vm.__keyPath || {};
  delete vm.__keyPath;
  delete vmData.__keyPath;
  delete vmProps.__keyPath;
  if (vm._mpValueSet === 'done') {
    // 第二次赋值才进行缩减操作
    Object.keys(vmData).forEach(function (vmDataItemKey) {
      if (vmData[vmDataItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmDataItemKey, vmData[vmDataItemKey], data, vm._mpValueSet, vm);
      } else if (vmData[vmDataItemKey] !== undefined) {
        // _data上的值属性只有要更新的时候才赋值
        if (__keyPathOnThis[vmDataItemKey] === true) {
          data[rootKey + '.' + vmDataItemKey] = vmData[vmDataItemKey];
        }
      }
    });

    Object.keys(vmProps).forEach(function (vmPropsItemKey) {
      if (vmProps[vmPropsItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmPropsItemKey, vmProps[vmPropsItemKey], data, vm._mpValueSet, vm);
      } else if (vmProps[vmPropsItemKey] !== undefined) {
        data[rootKey + '.' + vmPropsItemKey] = vmProps[vmPropsItemKey];
      }
      // _props上的值属性只有要更新的时候才赋值
    });

    // 检查完data和props,最后补上_mpProps & _computedWatchers
    var vmMpProps = vm._mpProps || {};
    var vmComputedWatchers = vm._computedWatchers || {};
    Object.keys(vmMpProps).forEach(function (mpItemKey) {
      data[rootKey + '.' + mpItemKey] = vm[mpItemKey];
    });
    Object.keys(vmComputedWatchers).forEach(function (computedItemKey) {
      data[rootKey + '.' + computedItemKey] = vm[computedItemKey];
    });
    // 更新的时候要删除$root.0:{},否则会覆盖原正确数据
    delete data[rootKey];
  }
  if (vm._mpValueSet === undefined) {
    // 第一次设置数据成功后，标记位置true,再更新到这个节点如果没有keyPath数组认为不需要更新
    vm._mpValueSet = 'done';
  }
  if (Vue$3.config._mpTrace) {
    // console.log('更新VM节点', vm)
    // console.log('实际传到Page.setData数据', data)
    diffLog(data);
  }
}

// 节流方法，性能优化
// 全局的命名约定，为了节省编译的包大小一律采取形象的缩写，说明如下。
// $c === $child
// $k === $comKey

// 新型的被拍平的数据结构
// {
//   $root: {
//     '1-1'{
//       // ... data
//     },
//     '1.2-1': {
//       // ... data1
//     },
//     '1.2-2': {
//       // ... data2
//     }
//   }
// }

var KEY_SEP = '_';

function getVmData (vm) {
  // 确保当前 vm 所有数据被同步
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._props || {}),
    Object.keys(vm._mpProps || {}),
    Object.keys(vm._computedWatchers || {})
  );
  return dataKeys.reduce(function (res, key) {
    res[key] = vm[key];
    return res
  }, {})
}

function getParentComKey (vm, res) {
  if ( res === void 0 ) res = [];

  var ref = vm || {};
  var $parent = ref.$parent;
  if (!$parent) { return res }
  res.unshift(getComKey($parent));
  if ($parent.$parent) {
    return getParentComKey($parent, res)
  }
  return res
}

function formatVmData (vm) {
  var $p = getParentComKey(vm).join(KEY_SEP);
  var $k = $p + ($p ? KEY_SEP : '') + getComKey(vm);

  // getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据
  // 改动 vue.runtime 所获的的核心能力
  var data = Object.assign(getVmData(vm), { $k: $k, $kk: ("" + $k + KEY_SEP), $p: $p });
  var key = '$root.' + $k;
  var res = {};
  res[key] = data;
  return res
}

function collectVmData (vm, res) {
  if ( res === void 0 ) res = {};

  var vms = vm.$children;
  if (vms && vms.length) {
    vms.forEach(function (v) { return collectVmData(v, res); });
  }
  return Object.assign(res, formatVmData(vm))
}

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 * 自动合并 data
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
function throttle (func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) { options = {}; }
  // 延迟执行函数
  function later () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) { context = args = null; }
  }
  return function (handle, data) {
    var now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) { previous = now; }
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = args ? [handle, Object.assign(args[1], data)] : [handle, data];
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) { context = args = null; }
    // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result
  }
}

// 优化频繁的 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
var throttleSetData = throttle(function (handle, data) {
  handle(data);
}, 50);

function getPage (vm) {
  var rootVueVM = vm.$root;
  var ref = rootVueVM.$mp || {};
  var mpType = ref.mpType; if ( mpType === void 0 ) mpType = '';
  var page = ref.page;

  // 优化后台态页面进行 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
  if (mpType === 'app' || !page || typeof page.setData !== 'function') {
    return
  }
  return page
}

// 优化js变量动态变化时候引起全量更新
// 优化每次 setData 都传递大量新数据
function updateDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = formatVmData(this);
  diffData(this, data);
  throttleSetData(page.setData.bind(page), data);
}

function initDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = collectVmData(this.$root);
  page.setData(data);
}

// 虚拟dom的compid与真实dom的comkey匹配，多层嵌套的先补齐虚拟dom的compid直到完全匹配为止
function isVmKeyMatchedCompkey (k, comkey) {
  if (!k || !comkey) {
    return false
  }
  // 完全匹配 comkey = '1_0_1', k = '1_0_1'
  // 部分匹配 comkey = '1_0_10_1', k = '1_0_10'
  // k + KEY_SEP防止k = '1_0_1'误匹配comkey = '1_0_10_1'
  return comkey === k || comkey.indexOf(k + KEY_SEP$2) === 0
}

function getVM (vm, comkeys) {
  if ( comkeys === void 0 ) comkeys = [];

  var keys = comkeys.slice(1);
  if (!keys.length) { return vm }

  // bugfix #1375: 虚拟dom的compid和真实dom的comkey在组件嵌套时匹配出错，comid会丢失前缀，需要从父节点补充
  var comkey = keys.join(KEY_SEP$2);
  var comidPrefix = '';
  return keys.reduce(function (res, key) {
    var len = res.$children.length;
    for (var i = 0; i < len; i++) {
      var v = res.$children[i];
      var k = getComKey(v);
      if (comidPrefix) {
        k = comidPrefix + KEY_SEP$2 + k;
      }
      // 找到匹配的父节点
      if (isVmKeyMatchedCompkey(k, comkey)) {
        comidPrefix = k;
        res = v;
        return res
      }
    }
    return res
  }, vm)
}

function getHandle (vnode, eventid, eventTypes) {
  if ( eventTypes === void 0 ) eventTypes = [];

  var res = [];
  if (!vnode || !vnode.tag) {
    return res
  }

  var ref = vnode || {};
  var data = ref.data; if ( data === void 0 ) data = {};
  var children = ref.children; if ( children === void 0 ) children = [];
  var componentInstance = ref.componentInstance;
  if (componentInstance) {
    // 增加 slot 情况的处理
    // Object.values 会多增加几行编译后的代码
    Object.keys(componentInstance.$slots).forEach(function (slotKey) {
      var slot = componentInstance.$slots[slotKey];
      var slots = Array.isArray(slot) ? slot : [slot];
      slots.forEach(function (node) {
        res = res.concat(getHandle(node, eventid, eventTypes));
      });
    });
  } else {
    // 避免遍历超出当前组件的 vm
    children.forEach(function (node) {
      res = res.concat(getHandle(node, eventid, eventTypes));
    });
  }

  var attrs = data.attrs;
  var on = data.on;
  if (attrs && on && attrs['eventid'] === eventid) {
    eventTypes.forEach(function (et) {
      var h = on[et];
      if (typeof h === 'function') {
        res.push(h);
      } else if (Array.isArray(h)) {
        res = res.concat(h);
      }
    });
    return res
  }

  return res
}

function getWebEventByMP (e) {
  var type = e.type;
  var timeStamp = e.timeStamp;
  var touches = e.touches;
  var detail = e.detail; if ( detail === void 0 ) detail = {};
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget; if ( currentTarget === void 0 ) currentTarget = {};
  var x = detail.x;
  var y = detail.y;
  var event = {
    mp: e,
    type: type,
    timeStamp: timeStamp,
    x: x,
    y: y,
    target: Object.assign({}, target, detail),
    currentTarget: currentTarget,
    stopPropagation: noop,
    preventDefault: noop
  };

  if (touches && touches.length) {
    Object.assign(event, touches[0]);
    event.touches = touches;
  }
  return event
}

var KEY_SEP$2 = '_';
function handleProxyWithVue (e) {
  var rootVueVM = this.$root;
  var type = e.type;
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget;
  var ref = currentTarget || target;
  var dataset = ref.dataset; if ( dataset === void 0 ) dataset = {};
  var comkey = dataset.comkey; if ( comkey === void 0 ) comkey = '';
  var eventid = dataset.eventid;
  var vm = getVM(rootVueVM, comkey.split(KEY_SEP$2));

  if (!vm) {
    return
  }

  var webEventTypes = eventTypeMap[type] || [type];
  var handles = getHandle(vm._vnode, eventid, webEventTypes);

  // TODO, enevt 还需要处理更多
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Event
  if (handles.length) {
    var event = getWebEventByMP(e);
    if (handles.length === 1) {
      var result = handles[0](event);
      return result
    }
    handles.forEach(function (h) { return h(event); });
  }
}

// for platforms
// import config from 'core/config'
// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform patch function
Vue$3.prototype.__patch__ = patch;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  var this$1 = this;

  // el = el && inBrowser ? query(el) : undefined
  // return mountComponent(this, el, hydrating)

  // 初始化小程序生命周期相关
  var options = this.$options;

  if (options && (options.render || options.mpType)) {
    var mpType = options.mpType; if ( mpType === void 0 ) mpType = 'page';
    return this._initMP(mpType, function () {
      return mountComponent(this$1, undefined, undefined)
    })
  } else {
    return mountComponent(this, undefined, undefined)
  }
};

// for mp
Vue$3.prototype._initMP = initMP;

Vue$3.prototype.$updateDataToMP = updateDataToMP;
Vue$3.prototype._initDataToMP = initDataToMP;

Vue$3.prototype.$handleProxyWithVue = handleProxyWithVue;

/*  */

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.echarts={})}(this,function(t){"use strict";function e(t){var e={},n={},i=t.match(/Firefox\/([\d.]+)/),r=t.match(/MSIE\s([\d.]+)/)||t.match(/Trident\/.+?rv:(([\d.]+))/),a=t.match(/Edge\/([\d.]+)/),o=/micromessenger/i.test(t);return i&&(n.firefox=!0,n.version=i[1]),r&&(n.ie=!0,n.version=r[1]),a&&(n.edge=!0,n.version=a[1]),o&&(n.weChat=!0),{browser:n,os:e,node:!1,canvasSupported:!!document.createElement("canvas").getContext,svgSupported:"undefined"!=typeof SVGRect,touchEventsSupported:"ontouchstart"in window&&!n.ie&&!n.edge,pointerEventsSupported:"onpointerdown"in window&&(n.edge||n.ie&&n.version>=11),domSupported:"undefined"!=typeof document}}function n(t,e){"createCanvas"===t&&(Pd=null),kd[t]=e}function i(t){if(null==t||"object"!=typeof t)return t;var e=t,n=bd.call(t);if("[object Array]"===n){if(!z(t)){e=[];for(var r=0,a=t.length;a>r;r++)e[r]=i(t[r])}}else if(wd[n]){if(!z(t)){var o=t.constructor;if(t.constructor.from)e=o.from(t);else{e=new o(t.length);for(var r=0,a=t.length;a>r;r++)e[r]=i(t[r])}}}else if(!_d[n]&&!z(t)&&!I(t)){e={};for(var s in t)t.hasOwnProperty(s)&&(e[s]=i(t[s]))}return e}function r(t,e,n){if(!S(e)||!S(t))return n?i(e):t;for(var a in e)if(e.hasOwnProperty(a)){var o=t[a],s=e[a];!S(s)||!S(o)||_(s)||_(o)||I(s)||I(o)||M(s)||M(o)||z(s)||z(o)?!n&&a in t||(t[a]=i(e[a],!0)):r(o,s,n)}return t}function a(t,e){for(var n=t[0],i=1,a=t.length;a>i;i++)n=r(n,t[i],e);return n}function o(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function s(t,e,n){for(var i in e)e.hasOwnProperty(i)&&(n?null!=e[i]:null==t[i])&&(t[i]=e[i]);return t}function l(){return Pd||(Pd=Ad().getContext("2d")),Pd}function u(t,e){if(t){if(t.indexOf)return t.indexOf(e);for(var n=0,i=t.length;i>n;n++)if(t[n]===e)return n}return-1}function h(t,e){function n(){}var i=t.prototype;n.prototype=e.prototype,t.prototype=new n;for(var r in i)t.prototype[r]=i[r];t.prototype.constructor=t,t.superClass=e}function c(t,e,n){t="prototype"in t?t.prototype:t,e="prototype"in e?e.prototype:e,s(t,e,n)}function d(t){return t?"string"==typeof t?!1:"number"==typeof t.length:void 0}function f(t,e,n){if(t&&e)if(t.forEach&&t.forEach===Md)t.forEach(e,n);else if(t.length===+t.length)for(var i=0,r=t.length;r>i;i++)e.call(n,t[i],i,t);else for(var a in t)t.hasOwnProperty(a)&&e.call(n,t[a],a,t)}function p(t,e,n){if(t&&e){if(t.map&&t.map===Cd)return t.map(e,n);for(var i=[],r=0,a=t.length;a>r;r++)i.push(e.call(n,t[r],r,t));return i}}function g(t,e,n,i){if(t&&e){if(t.reduce&&t.reduce===Dd)return t.reduce(e,n,i);for(var r=0,a=t.length;a>r;r++)n=e.call(i,n,t[r],r,t);return n}}function v(t,e,n){if(t&&e){if(t.filter&&t.filter===Td)return t.filter(e,n);for(var i=[],r=0,a=t.length;a>r;r++)e.call(n,t[r],r,t)&&i.push(t[r]);return i}}function m(t,e,n){if(t&&e)for(var i=0,r=t.length;r>i;i++)if(e.call(n,t[i],i,t))return t[i]}function y(t,e){var n=Id.call(arguments,2);return function(){return t.apply(e,n.concat(Id.call(arguments)))}}function x(t){var e=Id.call(arguments,1);return function(){return t.apply(this,e.concat(Id.call(arguments)))}}function _(t){return"[object Array]"===bd.call(t)}function w(t){return"function"==typeof t}function b(t){return"[object String]"===bd.call(t)}function S(t){var e=typeof t;return"function"===e||!!t&&"object"===e}function M(t){return!!_d[bd.call(t)]}function T(t){return!!wd[bd.call(t)]}function I(t){return"object"==typeof t&&"number"==typeof t.nodeType&&"object"==typeof t.ownerDocument}function C(t){return t!==t}function D(){for(var t=0,e=arguments.length;e>t;t++)if(null!=arguments[t])return arguments[t]}function k(t,e){return null!=t?t:e}function A(t,e,n){return null!=t?t:null!=e?e:n}function P(){return Function.call.apply(Id,arguments)}function L(t){if("number"==typeof t)return[t,t,t,t];var e=t.length;return 2===e?[t[0],t[1],t[0],t[1]]:3===e?[t[0],t[1],t[2],t[1]]:t}function O(t,e){if(!t)throw new Error(e)}function B(t){return null==t?null:"function"==typeof t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}function E(t){t[Ld]=!0}function z(t){return t[Ld]}function R(t){function e(t,e){n?i.set(t,e):i.set(e,t)}var n=_(t);this.data={};var i=this;t instanceof R?t.each(e):t&&f(t,e)}function F(t){return new R(t)}function N(t,e){for(var n=new t.constructor(t.length+e.length),i=0;i<t.length;i++)n[i]=t[i];var r=t.length;for(i=0;i<e.length;i++)n[i+r]=e[i];return n}function H(){}function W(t,e){var n=new Bd(2);return null==t&&(t=0),null==e&&(e=0),n[0]=t,n[1]=e,n}function V(t,e){return t[0]=e[0],t[1]=e[1],t}function G(t){var e=new Bd(2);return e[0]=t[0],e[1]=t[1],e}function X(t,e,n){return t[0]=e,t[1]=n,t}function Y(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t}function j(t,e,n,i){return t[0]=e[0]+n[0]*i,t[1]=e[1]+n[1]*i,t}function q(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t}function U(t){return Math.sqrt(Z(t))}function Z(t){return t[0]*t[0]+t[1]*t[1]}function $(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t}function K(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t}function Q(t,e){return t[0]*e[0]+t[1]*e[1]}function J(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t}function te(t,e){var n=U(e);return 0===n?(t[0]=0,t[1]=0):(t[0]=e[0]/n,t[1]=e[1]/n),t}function ee(t,e){return Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]))}function ne(t,e){return(t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1])}function ie(t,e){return t[0]=-e[0],t[1]=-e[1],t}function re(t,e,n,i){return t[0]=e[0]+i*(n[0]-e[0]),t[1]=e[1]+i*(n[1]-e[1]),t}function ae(t,e,n){var i=e[0],r=e[1];return t[0]=n[0]*i+n[2]*r+n[4],t[1]=n[1]*i+n[3]*r+n[5],t}function oe(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t}function se(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t}function le(){this.on("mousedown",this._dragStart,this),this.on("mousemove",this._drag,this),this.on("mouseup",this._dragEnd,this),this.on("globalout",this._dragEnd,this)}function ue(t,e){return{target:t,topTarget:e&&e.topTarget}}function he(t,e){var n=t._$eventProcessor;return null!=e&&n&&n.normalizeQuery&&(e=n.normalizeQuery(e)),e}function ce(t,e,n,i,r,a){var o=t._$handlers;if("function"==typeof n&&(r=i,i=n,n=null),!i||!e)return t;n=he(t,n),o[e]||(o[e]=[]);for(var s=0;s<o[e].length;s++)if(o[e][s].h===i)return t;var l={h:i,one:a,query:n,ctx:r||t,callAtLast:i.zrEventfulCallAtLast},u=o[e].length-1,h=o[e][u];return h&&h.callAtLast?o[e].splice(u,0,l):o[e].push(l),t}function de(t){return t.getBoundingClientRect?t.getBoundingClientRect():{left:0,top:0}}function fe(t,e,n,i){return n=n||{},i||!xd.canvasSupported?pe(t,e,n):xd.browser.firefox&&null!=e.layerX&&e.layerX!==e.offsetX?(n.zrX=e.layerX,n.zrY=e.layerY):null!=e.offsetX?(n.zrX=e.offsetX,n.zrY=e.offsetY):pe(t,e,n),n}function pe(t,e,n){var i=de(t);n.zrX=e.clientX-i.left,n.zrY=e.clientY-i.top}function ge(t,e,n){if(e=e||window.event,null!=e.zrX)return e;var i=e.type,r=i&&i.indexOf("touch")>=0;if(r){var a="touchend"!==i?e.targetTouches[0]:e.changedTouches[0];a&&fe(t,a,e,n)}else fe(t,e,e,n),e.zrDelta=e.wheelDelta?e.wheelDelta/120:-(e.detail||0)/3;var o=e.button;return null==e.which&&void 0!==o&&Gd.test(e.type)&&(e.which=1&o?1:2&o?3:4&o?2:0),e}function ve(t,e,n){Vd?t.addEventListener(e,n):t.attachEvent("on"+e,n)}function me(t,e,n){Vd?t.removeEventListener(e,n):t.detachEvent("on"+e,n)}function ye(t){var e=t[1][0]-t[0][0],n=t[1][1]-t[0][1];return Math.sqrt(e*e+n*n)}function xe(t){return[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2]}function _e(t,e,n){return{type:t,event:n,target:e.target,topTarget:e.topTarget,cancelBubble:!1,offsetX:n.zrX,offsetY:n.zrY,gestureEvent:n.gestureEvent,pinchX:n.pinchX,pinchY:n.pinchY,pinchScale:n.pinchScale,wheelDelta:n.zrDelta,zrByTouch:n.zrByTouch,which:n.which,stop:we}}function we(){Xd(this.event)}function be(){}function Se(t,e,n){if(t[t.rectHover?"rectContain":"contain"](e,n)){for(var i,r=t;r;){if(r.clipPath&&!r.clipPath.contain(e,n))return!1;r.silent&&(i=!0),r=r.parent}return i?qd:!0}return!1}function Me(){var t=new $d(6);return Te(t),t}function Te(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t}function Ie(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t}function Ce(t,e,n){var i=e[0]*n[0]+e[2]*n[1],r=e[1]*n[0]+e[3]*n[1],a=e[0]*n[2]+e[2]*n[3],o=e[1]*n[2]+e[3]*n[3],s=e[0]*n[4]+e[2]*n[5]+e[4],l=e[1]*n[4]+e[3]*n[5]+e[5];return t[0]=i,t[1]=r,t[2]=a,t[3]=o,t[4]=s,t[5]=l,t}function De(t,e,n){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4]+n[0],t[5]=e[5]+n[1],t}function ke(t,e,n){var i=e[0],r=e[2],a=e[4],o=e[1],s=e[3],l=e[5],u=Math.sin(n),h=Math.cos(n);return t[0]=i*h+o*u,t[1]=-i*u+o*h,t[2]=r*h+s*u,t[3]=-r*u+h*s,t[4]=h*a+u*l,t[5]=h*l-u*a,t}function Ae(t,e,n){var i=n[0],r=n[1];return t[0]=e[0]*i,t[1]=e[1]*r,t[2]=e[2]*i,t[3]=e[3]*r,t[4]=e[4]*i,t[5]=e[5]*r,t}function Pe(t,e){var n=e[0],i=e[2],r=e[4],a=e[1],o=e[3],s=e[5],l=n*o-a*i;return l?(l=1/l,t[0]=o*l,t[1]=-a*l,t[2]=-i*l,t[3]=n*l,t[4]=(i*s-o*r)*l,t[5]=(a*r-n*s)*l,t):null}function Le(t){var e=Me();return Ie(e,t),e}function Oe(t){return t>Jd||-Jd>t}function Be(t){this._target=t.target,this._life=t.life||1e3,this._delay=t.delay||0,this._initialized=!1,this.loop=null==t.loop?!1:t.loop,this.gap=t.gap||0,this.easing=t.easing||"Linear",this.onframe=t.onframe,this.ondestroy=t.ondestroy,this.onrestart=t.onrestart,this._pausedTime=0,this._paused=!1}function Ee(t){return t=Math.round(t),0>t?0:t>255?255:t}function ze(t){return t=Math.round(t),0>t?0:t>360?360:t}function Re(t){return 0>t?0:t>1?1:t}function Fe(t){return Ee(t.length&&"%"===t.charAt(t.length-1)?parseFloat(t)/100*255:parseInt(t,10))}function Ne(t){return Re(t.length&&"%"===t.charAt(t.length-1)?parseFloat(t)/100:parseFloat(t))}function He(t,e,n){return 0>n?n+=1:n>1&&(n-=1),1>6*n?t+(e-t)*n*6:1>2*n?e:2>3*n?t+(e-t)*(2/3-n)*6:t}function We(t,e,n){return t+(e-t)*n}function Ve(t,e,n,i,r){return t[0]=e,t[1]=n,t[2]=i,t[3]=r,t}function Ge(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function Xe(t,e){pf&&Ge(pf,e),pf=ff.put(t,pf||e.slice())}function Ye(t,e){if(t){e=e||[];var n=ff.get(t);if(n)return Ge(e,n);t+="";var i=t.replace(/ /g,"").toLowerCase();if(i in df)return Ge(e,df[i]),Xe(t,e),e;if("#"!==i.charAt(0)){var r=i.indexOf("("),a=i.indexOf(")");if(-1!==r&&a+1===i.length){var o=i.substr(0,r),s=i.substr(r+1,a-(r+1)).split(","),l=1;switch(o){case"rgba":if(4!==s.length)return void Ve(e,0,0,0,1);l=Ne(s.pop());case"rgb":return 3!==s.length?void Ve(e,0,0,0,1):(Ve(e,Fe(s[0]),Fe(s[1]),Fe(s[2]),l),Xe(t,e),e);case"hsla":return 4!==s.length?void Ve(e,0,0,0,1):(s[3]=Ne(s[3]),je(s,e),Xe(t,e),e);case"hsl":return 3!==s.length?void Ve(e,0,0,0,1):(je(s,e),Xe(t,e),e);default:return}}Ve(e,0,0,0,1)}else{if(4===i.length){var u=parseInt(i.substr(1),16);return u>=0&&4095>=u?(Ve(e,(3840&u)>>4|(3840&u)>>8,240&u|(240&u)>>4,15&u|(15&u)<<4,1),Xe(t,e),e):void Ve(e,0,0,0,1)}if(7===i.length){var u=parseInt(i.substr(1),16);return u>=0&&16777215>=u?(Ve(e,(16711680&u)>>16,(65280&u)>>8,255&u,1),Xe(t,e),e):void Ve(e,0,0,0,1)}}}}function je(t,e){var n=(parseFloat(t[0])%360+360)%360/360,i=Ne(t[1]),r=Ne(t[2]),a=.5>=r?r*(i+1):r+i-r*i,o=2*r-a;return e=e||[],Ve(e,Ee(255*He(o,a,n+1/3)),Ee(255*He(o,a,n)),Ee(255*He(o,a,n-1/3)),1),4===t.length&&(e[3]=t[3]),e}function qe(t){if(t){var e,n,i=t[0]/255,r=t[1]/255,a=t[2]/255,o=Math.min(i,r,a),s=Math.max(i,r,a),l=s-o,u=(s+o)/2;if(0===l)e=0,n=0;else{n=.5>u?l/(s+o):l/(2-s-o);var h=((s-i)/6+l/2)/l,c=((s-r)/6+l/2)/l,d=((s-a)/6+l/2)/l;i===s?e=d-c:r===s?e=1/3+h-d:a===s&&(e=2/3+c-h),0>e&&(e+=1),e>1&&(e-=1)}var f=[360*e,n,u];return null!=t[3]&&f.push(t[3]),f}}function Ue(t,e){var n=Ye(t);if(n){for(var i=0;3>i;i++)n[i]=0>e?n[i]*(1-e)|0:(255-n[i])*e+n[i]|0,n[i]>255?n[i]=255:t[i]<0&&(n[i]=0);return tn(n,4===n.length?"rgba":"rgb")}}function Ze(t){var e=Ye(t);return e?((1<<24)+(e[0]<<16)+(e[1]<<8)+ +e[2]).toString(16).slice(1):void 0}function $e(t,e,n){if(e&&e.length&&t>=0&&1>=t){n=n||[];var i=t*(e.length-1),r=Math.floor(i),a=Math.ceil(i),o=e[r],s=e[a],l=i-r;return n[0]=Ee(We(o[0],s[0],l)),n[1]=Ee(We(o[1],s[1],l)),n[2]=Ee(We(o[2],s[2],l)),n[3]=Re(We(o[3],s[3],l)),n}}function Ke(t,e,n){if(e&&e.length&&t>=0&&1>=t){var i=t*(e.length-1),r=Math.floor(i),a=Math.ceil(i),o=Ye(e[r]),s=Ye(e[a]),l=i-r,u=tn([Ee(We(o[0],s[0],l)),Ee(We(o[1],s[1],l)),Ee(We(o[2],s[2],l)),Re(We(o[3],s[3],l))],"rgba");return n?{color:u,leftIndex:r,rightIndex:a,value:i}:u}}function Qe(t,e,n,i){return t=Ye(t),t?(t=qe(t),null!=e&&(t[0]=ze(e)),null!=n&&(t[1]=Ne(n)),null!=i&&(t[2]=Ne(i)),tn(je(t),"rgba")):void 0}function Je(t,e){return t=Ye(t),t&&null!=e?(t[3]=Re(e),tn(t,"rgba")):void 0}function tn(t,e){if(t&&t.length){var n=t[0]+","+t[1]+","+t[2];return("rgba"===e||"hsva"===e||"hsla"===e)&&(n+=","+t[3]),e+"("+n+")"}}function en(t,e){return t[e]}function nn(t,e,n){t[e]=n}function rn(t,e,n){return(e-t)*n+t}function an(t,e,n){return n>.5?e:t}function on(t,e,n,i,r){var a=t.length;if(1===r)for(var o=0;a>o;o++)i[o]=rn(t[o],e[o],n);else for(var s=a&&t[0].length,o=0;a>o;o++)for(var l=0;s>l;l++)i[o][l]=rn(t[o][l],e[o][l],n)}function sn(t,e,n){var i=t.length,r=e.length;if(i!==r){var a=i>r;if(a)t.length=r;else for(var o=i;r>o;o++)t.push(1===n?e[o]:yf.call(e[o]))}for(var s=t[0]&&t[0].length,o=0;o<t.length;o++)if(1===n)isNaN(t[o])&&(t[o]=e[o]);else for(var l=0;s>l;l++)isNaN(t[o][l])&&(t[o][l]=e[o][l])}function ln(t,e,n){if(t===e)return!0;var i=t.length;if(i!==e.length)return!1;if(1===n){for(var r=0;i>r;r++)if(t[r]!==e[r])return!1}else for(var a=t[0].length,r=0;i>r;r++)for(var o=0;a>o;o++)if(t[r][o]!==e[r][o])return!1;return!0}function un(t,e,n,i,r,a,o,s,l){var u=t.length;if(1===l)for(var h=0;u>h;h++)s[h]=hn(t[h],e[h],n[h],i[h],r,a,o);else for(var c=t[0].length,h=0;u>h;h++)for(var d=0;c>d;d++)s[h][d]=hn(t[h][d],e[h][d],n[h][d],i[h][d],r,a,o)}function hn(t,e,n,i,r,a,o){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*o+(-3*(e-n)-2*s-l)*a+s*r+e}function cn(t){if(d(t)){var e=t.length;if(d(t[0])){for(var n=[],i=0;e>i;i++)n.push(yf.call(t[i]));return n}return yf.call(t)}return t}function dn(t){return t[0]=Math.floor(t[0]),t[1]=Math.floor(t[1]),t[2]=Math.floor(t[2]),"rgba("+t.join(",")+")"}function fn(t){var e=t[t.length-1].value;return d(e&&e[0])?2:1}function pn(t,e,n,i,r,a){var o=t._getter,s=t._setter,l="spline"===e,u=i.length;if(u){var h,c=i[0].value,f=d(c),p=!1,g=!1,v=f?fn(i):0;i.sort(function(t,e){return t.time-e.time}),h=i[u-1].time;for(var m=[],y=[],x=i[0].value,_=!0,w=0;u>w;w++){m.push(i[w].time/h);var b=i[w].value;if(f&&ln(b,x,v)||!f&&b===x||(_=!1),x=b,"string"==typeof b){var S=Ye(b);S?(b=S,p=!0):g=!0}y.push(b)}if(a||!_){for(var M=y[u-1],w=0;u-1>w;w++)f?sn(y[w],M,v):!isNaN(y[w])||isNaN(M)||g||p||(y[w]=M);f&&sn(o(t._target,r),M,v);var T,I,C,D,k,A,P=0,L=0;if(p)var O=[0,0,0,0];var B=function(t,e){var n;if(0>e)n=0;else if(L>e){for(T=Math.min(P+1,u-1),n=T;n>=0&&!(m[n]<=e);n--);n=Math.min(n,u-2)}else{for(n=P;u>n&&!(m[n]>e);n++);n=Math.min(n-1,u-2)}P=n,L=e;var i=m[n+1]-m[n];if(0!==i)if(I=(e-m[n])/i,l)if(D=y[n],C=y[0===n?n:n-1],k=y[n>u-2?u-1:n+1],A=y[n>u-3?u-1:n+2],f)un(C,D,k,A,I,I*I,I*I*I,o(t,r),v);else{var a;if(p)a=un(C,D,k,A,I,I*I,I*I*I,O,1),a=dn(O);else{if(g)return an(D,k,I);a=hn(C,D,k,A,I,I*I,I*I*I)}s(t,r,a)}else if(f)on(y[n],y[n+1],I,o(t,r),v);else{var a;if(p)on(y[n],y[n+1],I,O,1),a=dn(O);else{if(g)return an(y[n],y[n+1],I);a=rn(y[n],y[n+1],I)}s(t,r,a)}},E=new Be({target:t._target,life:h,loop:t._loop,delay:t._delay,onframe:B,ondestroy:n});return e&&"spline"!==e&&(E.easing=e),E}}}function gn(t,e,n,i,r,a,o,s){function l(){h--,h||a&&a()}b(i)?(a=r,r=i,i=0):w(r)?(a=r,r="linear",i=0):w(i)?(a=i,i=0):w(n)?(a=n,n=500):n||(n=500),t.stopAnimation(),vn(t,"",t,e,n,i,s);var u=t.animators.slice(),h=u.length;h||a&&a();for(var c=0;c<u.length;c++)u[c].done(l).start(r,o)}function vn(t,e,n,i,r,a,o){var s={},l=0;for(var u in i)i.hasOwnProperty(u)&&(null!=n[u]?S(i[u])&&!d(i[u])?vn(t,e?e+"."+u:u,n[u],i[u],r,a,o):(o?(s[u]=n[u],mn(t,e,u,i[u])):s[u]=i[u],l++):null==i[u]||o||mn(t,e,u,i[u]));l>0&&t.animate(e,!1).when(null==r?500:r,s).delay(a||0)}function mn(t,e,n,i){if(e){var r={};r[e]={},r[e][n]=i,t.attr(r)}else t.attr(n,i)}function yn(t,e,n,i){0>n&&(t+=n,n=-n),0>i&&(e+=i,i=-i),this.x=t,this.y=e,this.width=n,this.height=i}function xn(t){for(var e=0;t>=Pf;)e|=1&t,t>>=1;return t+e}function _n(t,e,n,i){var r=e+1;if(r===n)return 1;if(i(t[r++],t[e])<0){for(;n>r&&i(t[r],t[r-1])<0;)r++;wn(t,e,r)}else for(;n>r&&i(t[r],t[r-1])>=0;)r++;return r-e}function wn(t,e,n){for(n--;n>e;){var i=t[e];t[e++]=t[n],t[n--]=i}}function bn(t,e,n,i,r){for(i===e&&i++;n>i;i++){for(var a,o=t[i],s=e,l=i;l>s;)a=s+l>>>1,r(o,t[a])<0?l=a:s=a+1;var u=i-s;switch(u){case 3:t[s+3]=t[s+2];case 2:t[s+2]=t[s+1];case 1:t[s+1]=t[s];break;default:for(;u>0;)t[s+u]=t[s+u-1],u--}t[s]=o}}function Sn(t,e,n,i,r,a){var o=0,s=0,l=1;if(a(t,e[n+r])>0){for(s=i-r;s>l&&a(t,e[n+r+l])>0;)o=l,l=(l<<1)+1,0>=l&&(l=s);l>s&&(l=s),o+=r,l+=r}else{for(s=r+1;s>l&&a(t,e[n+r-l])<=0;)o=l,l=(l<<1)+1,0>=l&&(l=s);l>s&&(l=s);var u=o;o=r-l,l=r-u}for(o++;l>o;){var h=o+(l-o>>>1);a(t,e[n+h])>0?o=h+1:l=h}return l}function Mn(t,e,n,i,r,a){var o=0,s=0,l=1;if(a(t,e[n+r])<0){for(s=r+1;s>l&&a(t,e[n+r-l])<0;)o=l,l=(l<<1)+1,0>=l&&(l=s);l>s&&(l=s);var u=o;o=r-l,l=r-u}else{for(s=i-r;s>l&&a(t,e[n+r+l])>=0;)o=l,l=(l<<1)+1,0>=l&&(l=s);l>s&&(l=s),o+=r,l+=r}for(o++;l>o;){var h=o+(l-o>>>1);a(t,e[n+h])<0?l=h:o=h+1}return l}function Tn(t,e){function n(t,e){l[c]=t,u[c]=e,c+=1}function i(){for(;c>1;){var t=c-2;if(t>=1&&u[t-1]<=u[t]+u[t+1]||t>=2&&u[t-2]<=u[t]+u[t-1])u[t-1]<u[t+1]&&t--;else if(u[t]>u[t+1])break;a(t)}}function r(){for(;c>1;){var t=c-2;t>0&&u[t-1]<u[t+1]&&t--,a(t)}}function a(n){var i=l[n],r=u[n],a=l[n+1],h=u[n+1];u[n]=r+h,n===c-3&&(l[n+1]=l[n+2],u[n+1]=u[n+2]),c--;var d=Mn(t[a],t,i,r,0,e);i+=d,r-=d,0!==r&&(h=Sn(t[i+r-1],t,a,h,h-1,e),0!==h&&(h>=r?o(i,r,a,h):s(i,r,a,h)))}function o(n,i,r,a){var o=0;for(o=0;i>o;o++)d[o]=t[n+o];var s=0,l=r,u=n;if(t[u++]=t[l++],0!==--a){if(1===i){for(o=0;a>o;o++)t[u+o]=t[l+o];return void(t[u+a]=d[s])}for(var c,f,p,g=h;;){c=0,f=0,p=!1;do if(e(t[l],d[s])<0){if(t[u++]=t[l++],f++,c=0,0===--a){p=!0;break}}else if(t[u++]=d[s++],c++,f=0,1===--i){p=!0;break}while(g>(c|f));if(p)break;do{if(c=Mn(t[l],d,s,i,0,e),0!==c){for(o=0;c>o;o++)t[u+o]=d[s+o];if(u+=c,s+=c,i-=c,1>=i){p=!0;break}}if(t[u++]=t[l++],0===--a){p=!0;break}if(f=Sn(d[s],t,l,a,0,e),0!==f){for(o=0;f>o;o++)t[u+o]=t[l+o];if(u+=f,l+=f,a-=f,0===a){p=!0;break}}if(t[u++]=d[s++],1===--i){p=!0;break}g--}while(c>=Lf||f>=Lf);if(p)break;0>g&&(g=0),g+=2}if(h=g,1>h&&(h=1),1===i){for(o=0;a>o;o++)t[u+o]=t[l+o];t[u+a]=d[s]}else{if(0===i)throw new Error;for(o=0;i>o;o++)t[u+o]=d[s+o]}}else for(o=0;i>o;o++)t[u+o]=d[s+o]}function s(n,i,r,a){var o=0;for(o=0;a>o;o++)d[o]=t[r+o];var s=n+i-1,l=a-1,u=r+a-1,c=0,f=0;if(t[u--]=t[s--],0!==--i){if(1===a){for(u-=i,s-=i,f=u+1,c=s+1,o=i-1;o>=0;o--)t[f+o]=t[c+o];return void(t[u]=d[l])}for(var p=h;;){var g=0,v=0,m=!1;do if(e(d[l],t[s])<0){if(t[u--]=t[s--],g++,v=0,0===--i){m=!0;break}}else if(t[u--]=d[l--],v++,g=0,1===--a){m=!0;break}while(p>(g|v));if(m)break;do{if(g=i-Mn(d[l],t,n,i,i-1,e),0!==g){for(u-=g,s-=g,i-=g,f=u+1,c=s+1,o=g-1;o>=0;o--)t[f+o]=t[c+o];if(0===i){m=!0;break}}if(t[u--]=d[l--],1===--a){m=!0;break}if(v=a-Sn(t[s],d,0,a,a-1,e),0!==v){for(u-=v,l-=v,a-=v,f=u+1,c=l+1,o=0;v>o;o++)t[f+o]=d[c+o];if(1>=a){m=!0;break}}if(t[u--]=t[s--],0===--i){m=!0;break}p--}while(g>=Lf||v>=Lf);if(m)break;0>p&&(p=0),p+=2}if(h=p,1>h&&(h=1),1===a){for(u-=i,s-=i,f=u+1,c=s+1,o=i-1;o>=0;o--)t[f+o]=t[c+o];t[u]=d[l]}else{if(0===a)throw new Error;for(c=u-(a-1),o=0;a>o;o++)t[c+o]=d[o]}}else for(c=u-(a-1),o=0;a>o;o++)t[c+o]=d[o]}var l,u,h=Lf,c=0,d=[];l=[],u=[],this.mergeRuns=i,this.forceMergeRuns=r,this.pushRun=n}function In(t,e,n,i){n||(n=0),i||(i=t.length);var r=i-n;if(!(2>r)){var a=0;if(Pf>r)return a=_n(t,n,i,e),void bn(t,n,i,n+a,e);var o=new Tn(t,e),s=xn(r);do{if(a=_n(t,n,i,e),s>a){var l=r;l>s&&(l=s),bn(t,n,n+l,n+a,e),a=l}o.pushRun(n,a),o.mergeRuns(),r-=a,n+=a}while(0!==r);o.forceMergeRuns()}}function Cn(t,e){return t.zlevel===e.zlevel?t.z===e.z?t.z2-e.z2:t.z-e.z:t.zlevel-e.zlevel}function Dn(t,e,n){var i=null==e.x?0:e.x,r=null==e.x2?1:e.x2,a=null==e.y?0:e.y,o=null==e.y2?0:e.y2;e.global||(i=i*n.width+n.x,r=r*n.width+n.x,a=a*n.height+n.y,o=o*n.height+n.y),i=isNaN(i)?0:i,r=isNaN(r)?1:r,a=isNaN(a)?0:a,o=isNaN(o)?0:o;var s=t.createLinearGradient(i,a,r,o);return s}function kn(t,e,n){var i=n.width,r=n.height,a=Math.min(i,r),o=null==e.x?.5:e.x,s=null==e.y?.5:e.y,l=null==e.r?.5:e.r;e.global||(o=o*i+n.x,s=s*r+n.y,l*=a);var u=t.createRadialGradient(o,s,0,o,s,l);return u}function An(){return!1}function Pn(t,e,n){var i=Ad(),r=e.getWidth(),a=e.getHeight(),o=i.style;return o&&(o.position="absolute",o.left=0,o.top=0,o.width=r+"px",o.height=a+"px",i.setAttribute("data-zr-dom-id",t)),i.width=r*n,i.height=a*n,i}function Ln(t){if("string"==typeof t){var e=jf.get(t);return e&&e.image}return t}function On(t,e,n,i,r){if(t){if("string"==typeof t){if(e&&e.__zrImageSrc===t||!n)return e;var a=jf.get(t),o={hostEl:n,cb:i,cbPayload:r};return a?(e=a.image,!En(e)&&a.pending.push(o)):(e=new Image,e.onload=e.onerror=Bn,jf.put(t,e.__cachedImgObj={image:e,pending:[o]}),e.src=e.__zrImageSrc=t),e}return t}return e}function Bn(){var t=this.__cachedImgObj;this.onload=this.onerror=this.__cachedImgObj=null;for(var e=0;e<t.pending.length;e++){var n=t.pending[e],i=n.cb;i&&i(this,n.cbPayload),n.hostEl.dirty()}t.pending.length=0}function En(t){return t&&t.width&&t.height}function zn(t,e){e=e||Kf;var n=t+":"+e;if(qf[n])return qf[n];for(var i=(t+"").split("\n"),r=0,a=0,o=i.length;o>a;a++)r=Math.max(Un(i[a],e).width,r);return Uf>Zf&&(Uf=0,qf={}),Uf++,qf[n]=r,r}function Rn(t,e,n,i,r,a,o,s){return o?Nn(t,e,n,i,r,o,a,s):Fn(t,e,n,i,r,a,s)}function Fn(t,e,n,i,r,a,o){var s=Zn(t,e,r,a,o),l=zn(t,e);r&&(l+=r[1]+r[3]);var u=s.outerHeight,h=Hn(0,l,n),c=Wn(0,u,i),d=new yn(h,c,l,u);return d.lineHeight=s.lineHeight,d}function Nn(t,e,n,i,r,a,o,s){var l=$n(t,{rich:o,truncate:s,font:e,textAlign:n,textPadding:r,textLineHeight:a}),u=l.outerWidth,h=l.outerHeight,c=Hn(0,u,n),d=Wn(0,h,i);return new yn(c,d,u,h)}function Hn(t,e,n){return"right"===n?t-=e:"center"===n&&(t-=e/2),t}function Wn(t,e,n){return"middle"===n?t-=e/2:"bottom"===n&&(t-=e),t}function Vn(t,e,n){var i=e.x,r=e.y,a=e.height,o=e.width,s=a/2,l="left",u="top";switch(t){case"left":i-=n,r+=s,l="right",u="middle";break;case"right":i+=n+o,r+=s,u="middle";break;case"top":i+=o/2,r-=n,l="center",u="bottom";break;case"bottom":i+=o/2,r+=a+n,l="center";break;case"inside":i+=o/2,r+=s,l="center",u="middle";break;case"insideLeft":i+=n,r+=s,u="middle";break;case"insideRight":i+=o-n,r+=s,l="right",u="middle";break;case"insideTop":i+=o/2,r+=n,l="center";break;case"insideBottom":i+=o/2,r+=a-n,l="center",u="bottom";break;case"insideTopLeft":i+=n,r+=n;break;case"insideTopRight":i+=o-n,r+=n,l="right";break;case"insideBottomLeft":i+=n,r+=a-n,u="bottom";break;case"insideBottomRight":i+=o-n,r+=a-n,l="right",u="bottom"}return{x:i,y:r,textAlign:l,textVerticalAlign:u}}function Gn(t,e,n,i,r){if(!e)return"";var a=(t+"").split("\n");r=Xn(e,n,i,r);for(var o=0,s=a.length;s>o;o++)a[o]=Yn(a[o],r);return a.join("\n")}function Xn(t,e,n,i){i=o({},i),i.font=e;var n=k(n,"...");i.maxIterations=k(i.maxIterations,2);var r=i.minChar=k(i.minChar,0);i.cnCharWidth=zn("国",e);var a=i.ascCharWidth=zn("a",e);i.placeholder=k(i.placeholder,"");for(var s=t=Math.max(0,t-1),l=0;r>l&&s>=a;l++)s-=a;var u=zn(n,e);return u>s&&(n="",u=0),s=t-u,i.ellipsis=n,i.ellipsisWidth=u,i.contentWidth=s,i.containerWidth=t,i}function Yn(t,e){var n=e.containerWidth,i=e.font,r=e.contentWidth;if(!n)return"";var a=zn(t,i);if(n>=a)return t;for(var o=0;;o++){if(r>=a||o>=e.maxIterations){t+=e.ellipsis;break}var s=0===o?jn(t,r,e.ascCharWidth,e.cnCharWidth):a>0?Math.floor(t.length*r/a):0;t=t.substr(0,s),a=zn(t,i)}return""===t&&(t=e.placeholder),t}function jn(t,e,n,i){for(var r=0,a=0,o=t.length;o>a&&e>r;a++){var s=t.charCodeAt(a);r+=s>=0&&127>=s?n:i}return a}function qn(t){return zn("国",t)}function Un(t,e){return Qf.measureText(t,e)}function Zn(t,e,n,i,r){null!=t&&(t+="");var a=k(i,qn(e)),o=t?t.split("\n"):[],s=o.length*a,l=s;if(n&&(l+=n[0]+n[2]),t&&r){var u=r.outerHeight,h=r.outerWidth;if(null!=u&&l>u)t="",o=[];else if(null!=h)for(var c=Xn(h-(n?n[1]+n[3]:0),e,r.ellipsis,{minChar:r.minChar,placeholder:r.placeholder}),d=0,f=o.length;f>d;d++)o[d]=Yn(o[d],c)}return{lines:o,height:s,outerHeight:l,lineHeight:a}}function $n(t,e){var n={lines:[],width:0,height:0};if(null!=t&&(t+=""),!t)return n;for(var i,r=$f.lastIndex=0;null!=(i=$f.exec(t));){var a=i.index;a>r&&Kn(n,t.substring(r,a)),Kn(n,i[2],i[1]),r=$f.lastIndex}r<t.length&&Kn(n,t.substring(r,t.length));var o=n.lines,s=0,l=0,u=[],h=e.textPadding,c=e.truncate,d=c&&c.outerWidth,f=c&&c.outerHeight;h&&(null!=d&&(d-=h[1]+h[3]),null!=f&&(f-=h[0]+h[2]));for(var p=0;p<o.length;p++){for(var g=o[p],v=0,m=0,y=0;y<g.tokens.length;y++){var x=g.tokens[y],_=x.styleName&&e.rich[x.styleName]||{},w=x.textPadding=_.textPadding,b=x.font=_.font||e.font,S=x.textHeight=k(_.textHeight,qn(b));if(w&&(S+=w[0]+w[2]),x.height=S,x.lineHeight=A(_.textLineHeight,e.textLineHeight,S),x.textAlign=_&&_.textAlign||e.textAlign,x.textVerticalAlign=_&&_.textVerticalAlign||"middle",null!=f&&s+x.lineHeight>f)return{lines:[],width:0,height:0};x.textWidth=zn(x.text,b);var M=_.textWidth,T=null==M||"auto"===M;if("string"==typeof M&&"%"===M.charAt(M.length-1))x.percentWidth=M,u.push(x),M=0;else{if(T){M=x.textWidth;var I=_.textBackgroundColor,C=I&&I.image;C&&(C=Ln(C),En(C)&&(M=Math.max(M,C.width*S/C.height)))}var D=w?w[1]+w[3]:0;M+=D;var P=null!=d?d-m:null;null!=P&&M>P&&(!T||D>P?(x.text="",x.textWidth=M=0):(x.text=Gn(x.text,P-D,b,c.ellipsis,{minChar:c.minChar}),x.textWidth=zn(x.text,b),M=x.textWidth+D))}m+=x.width=M,_&&(v=Math.max(v,x.lineHeight))}g.width=m,g.lineHeight=v,s+=v,l=Math.max(l,m)}n.outerWidth=n.width=k(e.textWidth,l),n.outerHeight=n.height=k(e.textHeight,s),h&&(n.outerWidth+=h[1]+h[3],n.outerHeight+=h[0]+h[2]);for(var p=0;p<u.length;p++){var x=u[p],L=x.percentWidth;x.width=parseInt(L,10)/100*l}return n}function Kn(t,e,n){for(var i=""===e,r=e.split("\n"),a=t.lines,o=0;o<r.length;o++){var s=r[o],l={styleName:n,text:s,isLineHolder:!s&&!i};if(o)a.push({tokens:[l]});else{var u=(a[a.length-1]||(a[0]={tokens:[]})).tokens,h=u.length;1===h&&u[0].isLineHolder?u[0]=l:(s||!h||i)&&u.push(l)}}}function Qn(t){var e=(t.fontSize||t.fontFamily)&&[t.fontStyle,t.fontWeight,(t.fontSize||12)+"px",t.fontFamily||"sans-serif"].join(" ");return e&&B(e)||t.textFont||t.font}function Jn(t,e){var n,i,r,a,o=e.x,s=e.y,l=e.width,u=e.height,h=e.r;0>l&&(o+=l,l=-l),0>u&&(s+=u,u=-u),"number"==typeof h?n=i=r=a=h:h instanceof Array?1===h.length?n=i=r=a=h[0]:2===h.length?(n=r=h[0],i=a=h[1]):3===h.length?(n=h[0],i=a=h[1],r=h[2]):(n=h[0],i=h[1],r=h[2],a=h[3]):n=i=r=a=0;var c;n+i>l&&(c=n+i,n*=l/c,i*=l/c),r+a>l&&(c=r+a,r*=l/c,a*=l/c),i+r>u&&(c=i+r,i*=u/c,r*=u/c),n+a>u&&(c=n+a,n*=u/c,a*=u/c),t.moveTo(o+n,s),t.lineTo(o+l-i,s),0!==i&&t.arc(o+l-i,s+i,i,-Math.PI/2,0),t.lineTo(o+l,s+u-r),0!==r&&t.arc(o+l-r,s+u-r,r,0,Math.PI/2),t.lineTo(o+a,s+u),0!==a&&t.arc(o+a,s+u-a,a,Math.PI/2,Math.PI),t.lineTo(o,s+n),0!==n&&t.arc(o+n,s+n,n,Math.PI,1.5*Math.PI)}function ti(t){return ei(t),f(t.rich,ei),t}function ei(t){if(t){t.font=Qn(t);var e=t.textAlign;"middle"===e&&(e="center"),t.textAlign=null==e||tp[e]?e:"left";var n=t.textVerticalAlign||t.textBaseline;"center"===n&&(n="middle"),t.textVerticalAlign=null==n||ep[n]?n:"top";var i=t.textPadding;i&&(t.textPadding=L(t.textPadding))}}function ni(t,e,n,i,r,a){i.rich?ri(t,e,n,i,r,a):ii(t,e,n,i,r,a)}function ii(t,e,n,i,r,a){var o,s=li(i),l=!1,u=e.__attrCachedBy===zf.PLAIN_TEXT;a!==Rf?(a&&(o=a.style,l=!s&&u&&o),e.__attrCachedBy=s?zf.NONE:zf.PLAIN_TEXT):u&&(e.__attrCachedBy=zf.NONE);var h=i.font||Jf;l&&h===(o.font||Jf)||(e.font=h);var c=t.__computedFont;t.__styleFont!==h&&(t.__styleFont=h,c=t.__computedFont=e.font);var d=i.textPadding,f=i.textLineHeight,p=t.__textCotentBlock;(!p||t.__dirtyText)&&(p=t.__textCotentBlock=Zn(n,c,d,f,i.truncate));var g=p.outerHeight,v=p.lines,m=p.lineHeight,y=ci(g,i,r),x=y.baseX,_=y.baseY,w=y.textAlign||"left",b=y.textVerticalAlign;oi(e,i,r,x,_);var S=Wn(_,g,b),M=x,T=S;if(s||d){var I=zn(n,c),C=I;d&&(C+=d[1]+d[3]);var D=Hn(x,C,w);s&&ui(t,e,i,D,S,C,g),d&&(M=vi(x,w,d),T+=d[0])}e.textAlign=w,e.textBaseline="middle",e.globalAlpha=i.opacity||1;for(var k=0;k<np.length;k++){var A=np[k],P=A[0],L=A[1],O=i[P];l&&O===o[P]||(e[L]=Ef(e,L,O||A[2]))}T+=m/2;var B=i.textStrokeWidth,E=l?o.textStrokeWidth:null,z=!l||B!==E,R=!l||z||i.textStroke!==o.textStroke,F=fi(i.textStroke,B),N=pi(i.textFill);if(F&&(z&&(e.lineWidth=B),R&&(e.strokeStyle=F)),N&&(l&&i.textFill===o.textFill||(e.fillStyle=N)),1===v.length)F&&e.strokeText(v[0],M,T),N&&e.fillText(v[0],M,T);else for(var k=0;k<v.length;k++)F&&e.strokeText(v[k],M,T),N&&e.fillText(v[k],M,T),T+=m}function ri(t,e,n,i,r,a){a!==Rf&&(e.__attrCachedBy=zf.NONE);var o=t.__textCotentBlock;(!o||t.__dirtyText)&&(o=t.__textCotentBlock=$n(n,i)),ai(t,e,o,i,r)}function ai(t,e,n,i,r){var a=n.width,o=n.outerWidth,s=n.outerHeight,l=i.textPadding,u=ci(s,i,r),h=u.baseX,c=u.baseY,d=u.textAlign,f=u.textVerticalAlign;oi(e,i,r,h,c);var p=Hn(h,o,d),g=Wn(c,s,f),v=p,m=g;l&&(v+=l[3],m+=l[0]);var y=v+a;li(i)&&ui(t,e,i,p,g,o,s);for(var x=0;x<n.lines.length;x++){for(var _,w=n.lines[x],b=w.tokens,S=b.length,M=w.lineHeight,T=w.width,I=0,C=v,D=y,k=S-1;S>I&&(_=b[I],!_.textAlign||"left"===_.textAlign);)si(t,e,_,i,M,m,C,"left"),T-=_.width,C+=_.width,I++;for(;k>=0&&(_=b[k],"right"===_.textAlign);)si(t,e,_,i,M,m,D,"right"),T-=_.width,D-=_.width,k--;for(C+=(a-(C-v)-(y-D)-T)/2;k>=I;)_=b[I],si(t,e,_,i,M,m,C+_.width/2,"center"),C+=_.width,I++;m+=M}}function oi(t,e,n,i,r){if(n&&e.textRotation){var a=e.textOrigin;"center"===a?(i=n.width/2+n.x,r=n.height/2+n.y):a&&(i=a[0]+n.x,r=a[1]+n.y),t.translate(i,r),t.rotate(-e.textRotation),t.translate(-i,-r)}}function si(t,e,n,i,r,a,o,s){var l=i.rich[n.styleName]||{};l.text=n.text;var u=n.textVerticalAlign,h=a+r/2;"top"===u?h=a+n.height/2:"bottom"===u&&(h=a+r-n.height/2),!n.isLineHolder&&li(l)&&ui(t,e,l,"right"===s?o-n.width:"center"===s?o-n.width/2:o,h-n.height/2,n.width,n.height);var c=n.textPadding;c&&(o=vi(o,s,c),h-=n.height/2-c[2]-n.textHeight/2),di(e,"shadowBlur",A(l.textShadowBlur,i.textShadowBlur,0)),di(e,"shadowColor",l.textShadowColor||i.textShadowColor||"transparent"),di(e,"shadowOffsetX",A(l.textShadowOffsetX,i.textShadowOffsetX,0)),di(e,"shadowOffsetY",A(l.textShadowOffsetY,i.textShadowOffsetY,0)),di(e,"textAlign",s),di(e,"textBaseline","middle"),di(e,"font",n.font||Jf);var d=fi(l.textStroke||i.textStroke,p),f=pi(l.textFill||i.textFill),p=k(l.textStrokeWidth,i.textStrokeWidth);d&&(di(e,"lineWidth",p),di(e,"strokeStyle",d),e.strokeText(n.text,o,h)),f&&(di(e,"fillStyle",f),e.fillText(n.text,o,h))}function li(t){return!!(t.textBackgroundColor||t.textBorderWidth&&t.textBorderColor)}function ui(t,e,n,i,r,a,o){var s=n.textBackgroundColor,l=n.textBorderWidth,u=n.textBorderColor,h=b(s);if(di(e,"shadowBlur",n.textBoxShadowBlur||0),di(e,"shadowColor",n.textBoxShadowColor||"transparent"),di(e,"shadowOffsetX",n.textBoxShadowOffsetX||0),di(e,"shadowOffsetY",n.textBoxShadowOffsetY||0),h||l&&u){e.beginPath();var c=n.textBorderRadius;c?Jn(e,{x:i,y:r,width:a,height:o,r:c}):e.rect(i,r,a,o),e.closePath()}if(h)if(di(e,"fillStyle",s),null!=n.fillOpacity){var d=e.globalAlpha;e.globalAlpha=n.fillOpacity*n.opacity,e.fill(),e.globalAlpha=d}else e.fill();else if(S(s)){var f=s.image;f=On(f,null,t,hi,s),f&&En(f)&&e.drawImage(f,i,r,a,o)}if(l&&u)if(di(e,"lineWidth",l),di(e,"strokeStyle",u),null!=n.strokeOpacity){var d=e.globalAlpha;e.globalAlpha=n.strokeOpacity*n.opacity,e.stroke(),e.globalAlpha=d}else e.stroke()}function hi(t,e){e.image=t}function ci(t,e,n){var i=e.x||0,r=e.y||0,a=e.textAlign,o=e.textVerticalAlign;if(n){var s=e.textPosition;if(s instanceof Array)i=n.x+gi(s[0],n.width),r=n.y+gi(s[1],n.height);else{var l=Vn(s,n,e.textDistance);i=l.x,r=l.y,a=a||l.textAlign,o=o||l.textVerticalAlign}var u=e.textOffset;u&&(i+=u[0],r+=u[1])}return{baseX:i,baseY:r,textAlign:a,textVerticalAlign:o}}function di(t,e,n){return t[e]=Ef(t,e,n),t[e]}function fi(t,e){return null==t||0>=e||"transparent"===t||"none"===t?null:t.image||t.colorStops?"#000":t
}function pi(t){return null==t||"none"===t?null:t.image||t.colorStops?"#000":t}function gi(t,e){return"string"==typeof t?t.lastIndexOf("%")>=0?parseFloat(t)/100*e:parseFloat(t):t}function vi(t,e,n){return"right"===e?t-n[1]:"center"===e?t+n[3]/2-n[1]/2:t+n[3]}function mi(t,e){return null!=t&&(t||e.textBackgroundColor||e.textBorderWidth&&e.textBorderColor||e.textPadding)}function yi(t){t=t||{},If.call(this,t);for(var e in t)t.hasOwnProperty(e)&&"style"!==e&&(this[e]=t[e]);this.style=new Nf(t.style,this),this._rect=null,this.__clipPaths=[]}function xi(t){yi.call(this,t)}function _i(t){return parseInt(t,10)}function wi(t){return t?t.__builtin__?!0:"function"!=typeof t.resize||"function"!=typeof t.refresh?!1:!0:!1}function bi(t,e,n){return up.copy(t.getBoundingRect()),t.transform&&up.applyTransform(t.transform),hp.width=e,hp.height=n,!up.intersect(hp)}function Si(t,e){if(t===e)return!1;if(!t||!e||t.length!==e.length)return!0;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!0}function Mi(t,e){for(var n=0;n<t.length;n++){var i=t[n];i.setTransform(e),e.beginPath(),i.buildPath(e,i.shape),e.clip(),i.restoreTransform(e)}}function Ti(t,e){var n=document.createElement("div");return n.style.cssText=["position:relative","overflow:hidden","width:"+t+"px","height:"+e+"px","padding:0","margin:0","border-width:0"].join(";")+";",n}function Ii(t){return"mousewheel"===t&&xd.browser.firefox?"DOMMouseScroll":t}function Ci(t){t._touching=!0,clearTimeout(t._touchTimer),t._touchTimer=setTimeout(function(){t._touching=!1},700)}function Di(t){var e=t.pointerType;return"pen"===e||"touch"===e}function ki(t){function e(t,e){return function(){return e._touching?void 0:t.apply(e,arguments)}}f(gp,function(e){t._handlers[e]=y(yp[e],t)}),f(mp,function(e){t._handlers[e]=y(yp[e],t)}),f(pp,function(n){t._handlers[n]=e(yp[n],t)})}function Ai(t){function e(e,n){f(e,function(e){ve(t,Ii(e),n._handlers[e])},n)}Wd.call(this),this.dom=t,this._touching=!1,this._touchTimer,this._handlers={},ki(this),xd.pointerEventsSupported?e(mp,this):(xd.touchEventsSupported&&e(gp,this),e(pp,this))}function Pi(t,e){var n=new Mp(md(),t,e);return bp[n.id]=n,n}function Li(t){if(t)t.dispose();else{for(var e in bp)bp.hasOwnProperty(e)&&bp[e].dispose();bp={}}return this}function Oi(t){return bp[t]}function Bi(t,e){wp[t]=e}function Ei(t){delete bp[t]}function zi(t){return t instanceof Array?t:null==t?[]:[t]}function Ri(t,e,n){if(t){t[e]=t[e]||{},t.emphasis=t.emphasis||{},t.emphasis[e]=t.emphasis[e]||{};for(var i=0,r=n.length;r>i;i++){var a=n[i];!t.emphasis[e].hasOwnProperty(a)&&t[e].hasOwnProperty(a)&&(t.emphasis[e][a]=t[e][a])}}}function Fi(t){return!Cp(t)||Dp(t)||t instanceof Date?t:t.value}function Ni(t){return Cp(t)&&!(t instanceof Array)}function Hi(t,e){e=(e||[]).slice();var n=p(t||[],function(t){return{exist:t}});return Ip(e,function(t,i){if(Cp(t)){for(var r=0;r<n.length;r++)if(!n[r].option&&null!=t.id&&n[r].exist.id===t.id+"")return n[r].option=t,void(e[i]=null);for(var r=0;r<n.length;r++){var a=n[r].exist;if(!(n[r].option||null!=a.id&&null!=t.id||null==t.name||Gi(t)||Gi(a)||a.name!==t.name+""))return n[r].option=t,void(e[i]=null)}}}),Ip(e,function(t){if(Cp(t)){for(var e=0;e<n.length;e++){var i=n[e].exist;if(!n[e].option&&!Gi(i)&&null==t.id){n[e].option=t;break}}e>=n.length&&n.push({option:t})}}),n}function Wi(t){var e=F();Ip(t,function(t){var n=t.exist;n&&e.set(n.id,t)}),Ip(t,function(t){var n=t.option;O(!n||null==n.id||!e.get(n.id)||e.get(n.id)===t,"id duplicates: "+(n&&n.id)),n&&null!=n.id&&e.set(n.id,t),!t.keyInfo&&(t.keyInfo={})}),Ip(t,function(t,n){var i=t.exist,r=t.option,a=t.keyInfo;if(Cp(r)){if(a.name=null!=r.name?r.name+"":i?i.name:kp+n,i)a.id=i.id;else if(null!=r.id)a.id=r.id+"";else{var o=0;do a.id="\x00"+a.name+"\x00"+o++;while(e.get(a.id))}e.set(a.id,t)}})}function Vi(t){var e=t.name;return!(!e||!e.indexOf(kp))}function Gi(t){return Cp(t)&&t.id&&0===(t.id+"").indexOf("\x00_ec_\x00")}function Xi(t,e){return null!=e.dataIndexInside?e.dataIndexInside:null!=e.dataIndex?_(e.dataIndex)?p(e.dataIndex,function(e){return t.indexOfRawIndex(e)}):t.indexOfRawIndex(e.dataIndex):null!=e.name?_(e.name)?p(e.name,function(e){return t.indexOfName(e)}):t.indexOfName(e.name):void 0}function Yi(){var t="__\x00ec_inner_"+Pp++ +"_"+Math.random().toFixed(5);return function(e){return e[t]||(e[t]={})}}function ji(t,e,n){if(b(e)){var i={};i[e+"Index"]=0,e=i}var r=n&&n.defaultMainType;!r||qi(e,r+"Index")||qi(e,r+"Id")||qi(e,r+"Name")||(e[r+"Index"]=0);var a={};return Ip(e,function(i,r){var i=e[r];if("dataIndex"===r||"dataIndexInside"===r)return void(a[r]=i);var o=r.match(/^(\w+)(Index|Id|Name)$/)||[],s=o[1],l=(o[2]||"").toLowerCase();if(!(!s||!l||null==i||"index"===l&&"none"===i||n&&n.includeMainTypes&&u(n.includeMainTypes,s)<0)){var h={mainType:s};("index"!==l||"all"!==i)&&(h[l]=i);var c=t.queryComponents(h);a[s+"Models"]=c,a[s+"Model"]=c[0]}}),a}function qi(t,e){return t&&t.hasOwnProperty(e)}function Ui(t,e,n){t.setAttribute?t.setAttribute(e,n):t[e]=n}function Zi(t,e){return t.getAttribute?t.getAttribute(e):t[e]}function $i(t){return"auto"===t?xd.domSupported?"html":"richText":t||"html"}function Ki(t){var e={main:"",sub:""};return t&&(t=t.split(Lp),e.main=t[0]||"",e.sub=t[1]||""),e}function Qi(t){O(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t),'componentType "'+t+'" illegal')}function Ji(t){t.$constructor=t,t.extend=function(t){var e=this,n=function(){t.$constructor?t.$constructor.apply(this,arguments):e.apply(this,arguments)};return o(n.prototype,t),n.extend=this.extend,n.superCall=er,n.superApply=nr,h(n,this),n.superClass=e,n}}function tr(t){var e=["__\x00is_clz",Bp++,Math.random().toFixed(3)].join("_");t.prototype[e]=!0,t.isInstance=function(t){return!(!t||!t[e])}}function er(t,e){var n=P(arguments,2);return this.superClass.prototype[e].apply(t,n)}function nr(t,e,n){return this.superClass.prototype[e].apply(t,n)}function ir(t,e){function n(t){var e=i[t.main];return e&&e[Op]||(e=i[t.main]={},e[Op]=!0),e}e=e||{};var i={};if(t.registerClass=function(t,e){if(e)if(Qi(e),e=Ki(e),e.sub){if(e.sub!==Op){var r=n(e);r[e.sub]=t}}else i[e.main]=t;return t},t.getClass=function(t,e,n){var r=i[t];if(r&&r[Op]&&(r=e?r[e]:null),n&&!r)throw new Error(e?"Component "+t+"."+(e||"")+" not exists. Load it first.":t+".type should be specified.");return r},t.getClassesByMainType=function(t){t=Ki(t);var e=[],n=i[t.main];return n&&n[Op]?f(n,function(t,n){n!==Op&&e.push(t)}):e.push(n),e},t.hasClass=function(t){return t=Ki(t),!!i[t.main]},t.getAllClassMainTypes=function(){var t=[];return f(i,function(e,n){t.push(n)}),t},t.hasSubTypes=function(t){t=Ki(t);var e=i[t.main];return e&&e[Op]},t.parseClassType=Ki,e.registerWhenExtend){var r=t.extend;r&&(t.extend=function(e){var n=r.call(this,e);return t.registerClass(n,e.type)})}return t}function rr(t){return t>-Vp&&Vp>t}function ar(t){return t>Vp||-Vp>t}function or(t,e,n,i,r){var a=1-r;return a*a*(a*t+3*r*e)+r*r*(r*i+3*a*n)}function sr(t,e,n,i,r){var a=1-r;return 3*(((e-t)*a+2*(n-e)*r)*a+(i-n)*r*r)}function lr(t,e,n,i,r,a){var o=i+3*(e-n)-t,s=3*(n-2*e+t),l=3*(e-t),u=t-r,h=s*s-3*o*l,c=s*l-9*o*u,d=l*l-3*s*u,f=0;if(rr(h)&&rr(c))if(rr(s))a[0]=0;else{var p=-l/s;p>=0&&1>=p&&(a[f++]=p)}else{var g=c*c-4*h*d;if(rr(g)){var v=c/h,p=-s/o+v,m=-v/2;p>=0&&1>=p&&(a[f++]=p),m>=0&&1>=m&&(a[f++]=m)}else if(g>0){var y=Wp(g),x=h*s+1.5*o*(-c+y),_=h*s+1.5*o*(-c-y);x=0>x?-Hp(-x,Yp):Hp(x,Yp),_=0>_?-Hp(-_,Yp):Hp(_,Yp);var p=(-s-(x+_))/(3*o);p>=0&&1>=p&&(a[f++]=p)}else{var w=(2*h*s-3*o*c)/(2*Wp(h*h*h)),b=Math.acos(w)/3,S=Wp(h),M=Math.cos(b),p=(-s-2*S*M)/(3*o),m=(-s+S*(M+Xp*Math.sin(b)))/(3*o),T=(-s+S*(M-Xp*Math.sin(b)))/(3*o);p>=0&&1>=p&&(a[f++]=p),m>=0&&1>=m&&(a[f++]=m),T>=0&&1>=T&&(a[f++]=T)}}return f}function ur(t,e,n,i,r){var a=6*n-12*e+6*t,o=9*e+3*i-3*t-9*n,s=3*e-3*t,l=0;if(rr(o)){if(ar(a)){var u=-s/a;u>=0&&1>=u&&(r[l++]=u)}}else{var h=a*a-4*o*s;if(rr(h))r[0]=-a/(2*o);else if(h>0){var c=Wp(h),u=(-a+c)/(2*o),d=(-a-c)/(2*o);u>=0&&1>=u&&(r[l++]=u),d>=0&&1>=d&&(r[l++]=d)}}return l}function hr(t,e,n,i,r,a){var o=(e-t)*r+t,s=(n-e)*r+e,l=(i-n)*r+n,u=(s-o)*r+o,h=(l-s)*r+s,c=(h-u)*r+u;a[0]=t,a[1]=o,a[2]=u,a[3]=c,a[4]=c,a[5]=h,a[6]=l,a[7]=i}function cr(t,e,n,i,r,a,o,s,l,u,h){var c,d,f,p,g,v=.005,m=1/0;jp[0]=l,jp[1]=u;for(var y=0;1>y;y+=.05)qp[0]=or(t,n,r,o,y),qp[1]=or(e,i,a,s,y),p=Fd(jp,qp),m>p&&(c=y,m=p);m=1/0;for(var x=0;32>x&&!(Gp>v);x++)d=c-v,f=c+v,qp[0]=or(t,n,r,o,d),qp[1]=or(e,i,a,s,d),p=Fd(qp,jp),d>=0&&m>p?(c=d,m=p):(Up[0]=or(t,n,r,o,f),Up[1]=or(e,i,a,s,f),g=Fd(Up,jp),1>=f&&m>g?(c=f,m=g):v*=.5);return h&&(h[0]=or(t,n,r,o,c),h[1]=or(e,i,a,s,c)),Wp(m)}function dr(t,e,n,i){var r=1-i;return r*(r*t+2*i*e)+i*i*n}function fr(t,e,n,i){return 2*((1-i)*(e-t)+i*(n-e))}function pr(t,e,n,i,r){var a=t-2*e+n,o=2*(e-t),s=t-i,l=0;if(rr(a)){if(ar(o)){var u=-s/o;u>=0&&1>=u&&(r[l++]=u)}}else{var h=o*o-4*a*s;if(rr(h)){var u=-o/(2*a);u>=0&&1>=u&&(r[l++]=u)}else if(h>0){var c=Wp(h),u=(-o+c)/(2*a),d=(-o-c)/(2*a);u>=0&&1>=u&&(r[l++]=u),d>=0&&1>=d&&(r[l++]=d)}}return l}function gr(t,e,n){var i=t+n-2*e;return 0===i?.5:(t-e)/i}function vr(t,e,n,i,r){var a=(e-t)*i+t,o=(n-e)*i+e,s=(o-a)*i+a;r[0]=t,r[1]=a,r[2]=s,r[3]=s,r[4]=o,r[5]=n}function mr(t,e,n,i,r,a,o,s,l){var u,h=.005,c=1/0;jp[0]=o,jp[1]=s;for(var d=0;1>d;d+=.05){qp[0]=dr(t,n,r,d),qp[1]=dr(e,i,a,d);var f=Fd(jp,qp);c>f&&(u=d,c=f)}c=1/0;for(var p=0;32>p&&!(Gp>h);p++){var g=u-h,v=u+h;qp[0]=dr(t,n,r,g),qp[1]=dr(e,i,a,g);var f=Fd(qp,jp);if(g>=0&&c>f)u=g,c=f;else{Up[0]=dr(t,n,r,v),Up[1]=dr(e,i,a,v);var m=Fd(Up,jp);1>=v&&c>m?(u=v,c=m):h*=.5}}return l&&(l[0]=dr(t,n,r,u),l[1]=dr(e,i,a,u)),Wp(c)}function yr(t,e,n){if(0!==t.length){var i,r=t[0],a=r[0],o=r[0],s=r[1],l=r[1];for(i=1;i<t.length;i++)r=t[i],a=Zp(a,r[0]),o=$p(o,r[0]),s=Zp(s,r[1]),l=$p(l,r[1]);e[0]=a,e[1]=s,n[0]=o,n[1]=l}}function xr(t,e,n,i,r,a){r[0]=Zp(t,n),r[1]=Zp(e,i),a[0]=$p(t,n),a[1]=$p(e,i)}function _r(t,e,n,i,r,a,o,s,l,u){var h,c=ur,d=or,f=c(t,n,r,o,ig);for(l[0]=1/0,l[1]=1/0,u[0]=-1/0,u[1]=-1/0,h=0;f>h;h++){var p=d(t,n,r,o,ig[h]);l[0]=Zp(p,l[0]),u[0]=$p(p,u[0])}for(f=c(e,i,a,s,rg),h=0;f>h;h++){var g=d(e,i,a,s,rg[h]);l[1]=Zp(g,l[1]),u[1]=$p(g,u[1])}l[0]=Zp(t,l[0]),u[0]=$p(t,u[0]),l[0]=Zp(o,l[0]),u[0]=$p(o,u[0]),l[1]=Zp(e,l[1]),u[1]=$p(e,u[1]),l[1]=Zp(s,l[1]),u[1]=$p(s,u[1])}function wr(t,e,n,i,r,a,o,s){var l=gr,u=dr,h=$p(Zp(l(t,n,r),1),0),c=$p(Zp(l(e,i,a),1),0),d=u(t,n,r,h),f=u(e,i,a,c);o[0]=Zp(t,r,d),o[1]=Zp(e,a,f),s[0]=$p(t,r,d),s[1]=$p(e,a,f)}function br(t,e,n,i,r,a,o,s,l){var u=oe,h=se,c=Math.abs(r-a);if(1e-4>c%Jp&&c>1e-4)return s[0]=t-n,s[1]=e-i,l[0]=t+n,void(l[1]=e+i);if(tg[0]=Qp(r)*n+t,tg[1]=Kp(r)*i+e,eg[0]=Qp(a)*n+t,eg[1]=Kp(a)*i+e,u(s,tg,eg),h(l,tg,eg),r%=Jp,0>r&&(r+=Jp),a%=Jp,0>a&&(a+=Jp),r>a&&!o?a+=Jp:a>r&&o&&(r+=Jp),o){var d=a;a=r,r=d}for(var f=0;a>f;f+=Math.PI/2)f>r&&(ng[0]=Qp(f)*n+t,ng[1]=Kp(f)*i+e,u(s,ng,s),h(l,ng,l))}function Sr(t,e,n,i,r,a,o){if(0===r)return!1;var s=r,l=0,u=t;if(o>e+s&&o>i+s||e-s>o&&i-s>o||a>t+s&&a>n+s||t-s>a&&n-s>a)return!1;if(t===n)return Math.abs(a-t)<=s/2;l=(e-i)/(t-n),u=(t*i-n*e)/(t-n);var h=l*a-o+u,c=h*h/(l*l+1);return s/2*s/2>=c}function Mr(t,e,n,i,r,a,o,s,l,u,h){if(0===l)return!1;var c=l;if(h>e+c&&h>i+c&&h>a+c&&h>s+c||e-c>h&&i-c>h&&a-c>h&&s-c>h||u>t+c&&u>n+c&&u>r+c&&u>o+c||t-c>u&&n-c>u&&r-c>u&&o-c>u)return!1;var d=cr(t,e,n,i,r,a,o,s,u,h,null);return c/2>=d}function Tr(t,e,n,i,r,a,o,s,l){if(0===o)return!1;var u=o;if(l>e+u&&l>i+u&&l>a+u||e-u>l&&i-u>l&&a-u>l||s>t+u&&s>n+u&&s>r+u||t-u>s&&n-u>s&&r-u>s)return!1;var h=mr(t,e,n,i,r,a,s,l,null);return u/2>=h}function Ir(t){return t%=yg,0>t&&(t+=yg),t}function Cr(t,e,n,i,r,a,o,s,l){if(0===o)return!1;var u=o;s-=t,l-=e;var h=Math.sqrt(s*s+l*l);if(h-u>n||n>h+u)return!1;if(Math.abs(i-r)%xg<1e-4)return!0;if(a){var c=i;i=Ir(r),r=Ir(c)}else i=Ir(i),r=Ir(r);i>r&&(r+=xg);var d=Math.atan2(l,s);return 0>d&&(d+=xg),d>=i&&r>=d||d+xg>=i&&r>=d+xg}function Dr(t,e,n,i,r,a){if(a>e&&a>i||e>a&&i>a)return 0;if(i===e)return 0;var o=e>i?1:-1,s=(a-e)/(i-e);(1===s||0===s)&&(o=e>i?.5:-.5);var l=s*(n-t)+t;return l===r?1/0:l>r?o:0}function kr(t,e){return Math.abs(t-e)<bg}function Ar(){var t=Mg[0];Mg[0]=Mg[1],Mg[1]=t}function Pr(t,e,n,i,r,a,o,s,l,u){if(u>e&&u>i&&u>a&&u>s||e>u&&i>u&&a>u&&s>u)return 0;var h=lr(e,i,a,s,u,Sg);if(0===h)return 0;for(var c,d,f=0,p=-1,g=0;h>g;g++){var v=Sg[g],m=0===v||1===v?.5:1,y=or(t,n,r,o,v);l>y||(0>p&&(p=ur(e,i,a,s,Mg),Mg[1]<Mg[0]&&p>1&&Ar(),c=or(e,i,a,s,Mg[0]),p>1&&(d=or(e,i,a,s,Mg[1]))),f+=2===p?v<Mg[0]?e>c?m:-m:v<Mg[1]?c>d?m:-m:d>s?m:-m:v<Mg[0]?e>c?m:-m:c>s?m:-m)}return f}function Lr(t,e,n,i,r,a,o,s){if(s>e&&s>i&&s>a||e>s&&i>s&&a>s)return 0;var l=pr(e,i,a,s,Sg);if(0===l)return 0;var u=gr(e,i,a);if(u>=0&&1>=u){for(var h=0,c=dr(e,i,a,u),d=0;l>d;d++){var f=0===Sg[d]||1===Sg[d]?.5:1,p=dr(t,n,r,Sg[d]);o>p||(h+=Sg[d]<u?e>c?f:-f:c>a?f:-f)}return h}var f=0===Sg[0]||1===Sg[0]?.5:1,p=dr(t,n,r,Sg[0]);return o>p?0:e>a?f:-f}function Or(t,e,n,i,r,a,o,s){if(s-=e,s>n||-n>s)return 0;var l=Math.sqrt(n*n-s*s);Sg[0]=-l,Sg[1]=l;var u=Math.abs(i-r);if(1e-4>u)return 0;if(1e-4>u%wg){i=0,r=wg;var h=a?1:-1;return o>=Sg[0]+t&&o<=Sg[1]+t?h:0}if(a){var l=i;i=Ir(r),r=Ir(l)}else i=Ir(i),r=Ir(r);i>r&&(r+=wg);for(var c=0,d=0;2>d;d++){var f=Sg[d];if(f+t>o){var p=Math.atan2(s,f),h=a?1:-1;0>p&&(p=wg+p),(p>=i&&r>=p||p+wg>=i&&r>=p+wg)&&(p>Math.PI/2&&p<1.5*Math.PI&&(h=-h),c+=h)}}return c}function Br(t,e,n,i,r){for(var a=0,o=0,s=0,l=0,u=0,h=0;h<t.length;){var c=t[h++];switch(c===_g.M&&h>1&&(n||(a+=Dr(o,s,l,u,i,r))),1===h&&(o=t[h],s=t[h+1],l=o,u=s),c){case _g.M:l=t[h++],u=t[h++],o=l,s=u;break;case _g.L:if(n){if(Sr(o,s,t[h],t[h+1],e,i,r))return!0}else a+=Dr(o,s,t[h],t[h+1],i,r)||0;o=t[h++],s=t[h++];break;case _g.C:if(n){if(Mr(o,s,t[h++],t[h++],t[h++],t[h++],t[h],t[h+1],e,i,r))return!0}else a+=Pr(o,s,t[h++],t[h++],t[h++],t[h++],t[h],t[h+1],i,r)||0;o=t[h++],s=t[h++];break;case _g.Q:if(n){if(Tr(o,s,t[h++],t[h++],t[h],t[h+1],e,i,r))return!0}else a+=Lr(o,s,t[h++],t[h++],t[h],t[h+1],i,r)||0;o=t[h++],s=t[h++];break;case _g.A:var d=t[h++],f=t[h++],p=t[h++],g=t[h++],v=t[h++],m=t[h++];h+=1;var y=1-t[h++],x=Math.cos(v)*p+d,_=Math.sin(v)*g+f;h>1?a+=Dr(o,s,x,_,i,r):(l=x,u=_);var w=(i-d)*g/p+d;if(n){if(Cr(d,f,g,v,v+m,y,e,w,r))return!0}else a+=Or(d,f,g,v,v+m,y,w,r);o=Math.cos(v+m)*p+d,s=Math.sin(v+m)*g+f;break;case _g.R:l=o=t[h++],u=s=t[h++];var b=t[h++],S=t[h++],x=l+b,_=u+S;if(n){if(Sr(l,u,x,u,e,i,r)||Sr(x,u,x,_,e,i,r)||Sr(x,_,l,_,e,i,r)||Sr(l,_,l,u,e,i,r))return!0}else a+=Dr(x,u,x,_,i,r),a+=Dr(l,_,l,u,i,r);break;case _g.Z:if(n){if(Sr(o,s,l,u,e,i,r))return!0}else a+=Dr(o,s,l,u,i,r);o=l,s=u}}return n||kr(s,u)||(a+=Dr(o,s,l,u,i,r)||0),0!==a}function Er(t,e,n){return Br(t,0,!1,e,n)}function zr(t,e,n,i){return Br(t,e,!0,n,i)}function Rr(t){yi.call(this,t),this.path=null}function Fr(t,e,n,i,r,a,o,s,l,u,h){var c=l*(zg/180),d=Eg(c)*(t-n)/2+Bg(c)*(e-i)/2,f=-1*Bg(c)*(t-n)/2+Eg(c)*(e-i)/2,p=d*d/(o*o)+f*f/(s*s);p>1&&(o*=Og(p),s*=Og(p));var g=(r===a?-1:1)*Og((o*o*s*s-o*o*f*f-s*s*d*d)/(o*o*f*f+s*s*d*d))||0,v=g*o*f/s,m=g*-s*d/o,y=(t+n)/2+Eg(c)*v-Bg(c)*m,x=(e+i)/2+Bg(c)*v+Eg(c)*m,_=Ng([1,0],[(d-v)/o,(f-m)/s]),w=[(d-v)/o,(f-m)/s],b=[(-1*d-v)/o,(-1*f-m)/s],S=Ng(w,b);Fg(w,b)<=-1&&(S=zg),Fg(w,b)>=1&&(S=0),0===a&&S>0&&(S-=2*zg),1===a&&0>S&&(S+=2*zg),h.addData(u,y,x,o,s,_,S,c,a)}function Nr(t){if(!t)return new mg;for(var e,n=0,i=0,r=n,a=i,o=new mg,s=mg.CMD,l=t.match(Hg),u=0;u<l.length;u++){for(var h,c=l[u],d=c.charAt(0),f=c.match(Wg)||[],p=f.length,g=0;p>g;g++)f[g]=parseFloat(f[g]);for(var v=0;p>v;){var m,y,x,_,w,b,S,M=n,T=i;switch(d){case"l":n+=f[v++],i+=f[v++],h=s.L,o.addData(h,n,i);break;case"L":n=f[v++],i=f[v++],h=s.L,o.addData(h,n,i);break;case"m":n+=f[v++],i+=f[v++],h=s.M,o.addData(h,n,i),r=n,a=i,d="l";break;case"M":n=f[v++],i=f[v++],h=s.M,o.addData(h,n,i),r=n,a=i,d="L";break;case"h":n+=f[v++],h=s.L,o.addData(h,n,i);break;case"H":n=f[v++],h=s.L,o.addData(h,n,i);break;case"v":i+=f[v++],h=s.L,o.addData(h,n,i);break;case"V":i=f[v++],h=s.L,o.addData(h,n,i);break;case"C":h=s.C,o.addData(h,f[v++],f[v++],f[v++],f[v++],f[v++],f[v++]),n=f[v-2],i=f[v-1];break;case"c":h=s.C,o.addData(h,f[v++]+n,f[v++]+i,f[v++]+n,f[v++]+i,f[v++]+n,f[v++]+i),n+=f[v-2],i+=f[v-1];break;case"S":m=n,y=i;var I=o.len(),C=o.data;e===s.C&&(m+=n-C[I-4],y+=i-C[I-3]),h=s.C,M=f[v++],T=f[v++],n=f[v++],i=f[v++],o.addData(h,m,y,M,T,n,i);break;case"s":m=n,y=i;var I=o.len(),C=o.data;e===s.C&&(m+=n-C[I-4],y+=i-C[I-3]),h=s.C,M=n+f[v++],T=i+f[v++],n+=f[v++],i+=f[v++],o.addData(h,m,y,M,T,n,i);break;case"Q":M=f[v++],T=f[v++],n=f[v++],i=f[v++],h=s.Q,o.addData(h,M,T,n,i);break;case"q":M=f[v++]+n,T=f[v++]+i,n+=f[v++],i+=f[v++],h=s.Q,o.addData(h,M,T,n,i);break;case"T":m=n,y=i;var I=o.len(),C=o.data;e===s.Q&&(m+=n-C[I-4],y+=i-C[I-3]),n=f[v++],i=f[v++],h=s.Q,o.addData(h,m,y,n,i);break;case"t":m=n,y=i;var I=o.len(),C=o.data;e===s.Q&&(m+=n-C[I-4],y+=i-C[I-3]),n+=f[v++],i+=f[v++],h=s.Q,o.addData(h,m,y,n,i);break;case"A":x=f[v++],_=f[v++],w=f[v++],b=f[v++],S=f[v++],M=n,T=i,n=f[v++],i=f[v++],h=s.A,Fr(M,T,n,i,b,S,x,_,w,h,o);break;case"a":x=f[v++],_=f[v++],w=f[v++],b=f[v++],S=f[v++],M=n,T=i,n+=f[v++],i+=f[v++],h=s.A,Fr(M,T,n,i,b,S,x,_,w,h,o)}}("z"===d||"Z"===d)&&(h=s.Z,o.addData(h),n=r,i=a),e=h}return o.toStatic(),o}function Hr(t,e){var n=Nr(t);return e=e||{},e.buildPath=function(t){if(t.setData){t.setData(n.data);var e=t.getContext();e&&t.rebuildPath(e)}else{var e=t;n.rebuildPath(e)}},e.applyTransform=function(t){Lg(n,t),this.dirty(!0)},e}function Wr(t,e){return new Rr(Hr(t,e))}function Vr(t,e){return Rr.extend(Hr(t,e))}function Gr(t,e){for(var n=[],i=t.length,r=0;i>r;r++){var a=t[r];a.path||a.createPathProxy(),a.__dirtyPath&&a.buildPath(a.path,a.shape,!0),n.push(a.path)}var o=new Rr(e);return o.createPathProxy(),o.buildPath=function(t){t.appendPath(n);var e=t.getContext();e&&t.rebuildPath(e)},o}function Xr(t,e,n,i,r,a,o){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*o+(-3*(e-n)-2*s-l)*a+s*r+e}function Yr(t,e,n){var i=e.points,r=e.smooth;if(i&&i.length>=2){if(r&&"spline"!==r){var a=Zg(i,r,n,e.smoothConstraint);t.moveTo(i[0][0],i[0][1]);for(var o=i.length,s=0;(n?o:o-1)>s;s++){var l=a[2*s],u=a[2*s+1],h=i[(s+1)%o];t.bezierCurveTo(l[0],l[1],u[0],u[1],h[0],h[1])}}else{"spline"===r&&(i=Ug(i,n)),t.moveTo(i[0][0],i[0][1]);for(var s=1,c=i.length;c>s;s++)t.lineTo(i[s][0],i[s][1])}n&&t.closePath()}}function jr(t,e,n){var i=n&&n.lineWidth;if(e&&i){var r=e.x1,a=e.x2,o=e.y1,s=e.y2;Qg(2*r)===Qg(2*a)?t.x1=t.x2=Ur(r,i,!0):(t.x1=r,t.x2=a),Qg(2*o)===Qg(2*s)?t.y1=t.y2=Ur(o,i,!0):(t.y1=o,t.y2=s)}}function qr(t,e,n){var i=n&&n.lineWidth;if(e&&i){var r=e.x,a=e.y,o=e.width,s=e.height;t.x=Ur(r,i,!0),t.y=Ur(a,i,!0),t.width=Math.max(Ur(r+o,i,!1)-t.x,0===o?0:1),t.height=Math.max(Ur(a+s,i,!1)-t.y,0===s?0:1)}}function Ur(t,e,n){var i=Qg(2*t);return(i+Qg(e))%2===0?i/2:(i+(n?1:-1))/2}function Zr(t,e,n){var i=t.cpx2,r=t.cpy2;return null===i||null===r?[(n?sr:or)(t.x1,t.cpx1,t.cpx2,t.x2,e),(n?sr:or)(t.y1,t.cpy1,t.cpy2,t.y2,e)]:[(n?fr:dr)(t.x1,t.cpx1,t.x2,e),(n?fr:dr)(t.y1,t.cpy1,t.y2,e)]}function $r(t){yi.call(this,t),this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.notClear=!0}function Kr(t){return Rr.extend(t)}function Qr(t,e){return Vr(t,e)}function Jr(t,e,n,i){var r=Wr(t,e);return n&&("center"===i&&(n=ea(n,r.getBoundingRect())),na(r,n)),r}function ta(t,e,n){var i=new xi({style:{image:t,x:e.x,y:e.y,width:e.width,height:e.height},onload:function(t){if("center"===n){var r={width:t.width,height:t.height};i.setStyle(ea(e,r))}}});return i}function ea(t,e){var n,i=e.width/e.height,r=t.height*i;r<=t.width?n=t.height:(r=t.width,n=r/i);var a=t.x+t.width/2,o=t.y+t.height/2;return{x:a-r/2,y:o-n/2,width:r,height:n}}function na(t,e){if(t.applyTransform){var n=t.getBoundingRect(),i=n.calculateTransform(e);t.applyTransform(i)}}function ia(t){var e=t.shape,n=t.style.lineWidth;return cv(2*e.x1)===cv(2*e.x2)&&(e.x1=e.x2=aa(e.x1,n,!0)),cv(2*e.y1)===cv(2*e.y2)&&(e.y1=e.y2=aa(e.y1,n,!0)),t}function ra(t){var e=t.shape,n=t.style.lineWidth,i=e.x,r=e.y,a=e.width,o=e.height;return e.x=aa(e.x,n,!0),e.y=aa(e.y,n,!0),e.width=Math.max(aa(i+a,n,!1)-e.x,0===a?0:1),e.height=Math.max(aa(r+o,n,!1)-e.y,0===o?0:1),t}function aa(t,e,n){var i=cv(2*t);return(i+cv(e))%2===0?i/2:(i+(n?1:-1))/2}function oa(t){return null!=t&&"none"!==t}function sa(t){if("string"!=typeof t)return t;var e=mv.get(t);return e||(e=Ue(t,-.1),1e4>yv&&(mv.set(t,e),yv++)),e}function la(t){if(t.__hoverStlDirty){t.__hoverStlDirty=!1;var e=t.__hoverStl;if(!e)return void(t.__cachedNormalStl=t.__cachedNormalZ2=null);var n=t.__cachedNormalStl={};t.__cachedNormalZ2=t.z2;var i=t.style;for(var r in e)null!=e[r]&&(n[r]=i[r]);n.fill=i.fill,n.stroke=i.stroke}}function ua(t){var e=t.__hoverStl;if(e&&!t.__highlighted){var n=t.useHoverLayer;t.__highlighted=n?"layer":"plain";var i=t.__zr;if(i||!n){var r=t,a=t.style;n&&(r=i.addHover(t),a=r.style),ka(a),n||la(r),a.extendFrom(e),ha(a,e,"fill"),ha(a,e,"stroke"),Da(a),n||(t.dirty(!1),t.z2+=gv)}}}function ha(t,e,n){!oa(e[n])&&oa(t[n])&&(t[n]=sa(t[n]))}function ca(t){var e=t.__highlighted;if(e)if(t.__highlighted=!1,"layer"===e)t.__zr&&t.__zr.removeHover(t);else if(e){var n=t.style,i=t.__cachedNormalStl;i&&(ka(n),t.setStyle(i),Da(n));var r=t.__cachedNormalZ2;null!=r&&t.z2-r===gv&&(t.z2=r)}}function da(t,e){t.isGroup?t.traverse(function(t){!t.isGroup&&e(t)}):e(t)}function fa(t,e){e=t.__hoverStl=e!==!1&&(e||{}),t.__hoverStlDirty=!0,t.__highlighted&&(t.__cachedNormalStl=null,ca(t),ua(t))}function pa(t){return t&&t.__isEmphasisEntered}function ga(t){this.__hoverSilentOnTouch&&t.zrByTouch||!this.__isEmphasisEntered&&da(this,ua)}function va(t){this.__hoverSilentOnTouch&&t.zrByTouch||!this.__isEmphasisEntered&&da(this,ca)}function ma(){this.__isEmphasisEntered=!0,da(this,ua)}function ya(){this.__isEmphasisEntered=!1,da(this,ca)}function xa(t,e,n){t.isGroup?t.traverse(function(t){!t.isGroup&&fa(t,t.hoverStyle||e)}):fa(t,t.hoverStyle||e),_a(t,n)}function _a(t,e){var n=e===!1;if(t.__hoverSilentOnTouch=null!=e&&e.hoverSilentOnTouch,!n||t.__hoverStyleTrigger){var i=n?"off":"on";t[i]("mouseover",ga)[i]("mouseout",va),t[i]("emphasis",ma)[i]("normal",ya),t.__hoverStyleTrigger=!n}}function wa(t,e,n,i,r,a,o){r=r||pv;var s,l=r.labelFetcher,u=r.labelDataIndex,h=r.labelDimIndex,c=n.getShallow("show"),d=i.getShallow("show");(c||d)&&(l&&(s=l.getFormattedLabel(u,"normal",null,h)),null==s&&(s=w(r.defaultText)?r.defaultText(u,r):r.defaultText));var f=c?s:null,p=d?k(l?l.getFormattedLabel(u,"emphasis",null,h):null,s):null;(null!=f||null!=p)&&(ba(t,n,a,r),ba(e,i,o,r,!0)),t.text=f,e.text=p}function ba(t,e,n,i,r){return Ma(t,e,i,r),n&&o(t,n),t}function Sa(t,e,n){var i,r={isRectText:!0};n===!1?i=!0:r.autoColor=n,Ma(t,e,r,i)}function Ma(t,e,n,i){if(n=n||pv,n.isRectText){var r=e.getShallow("position")||(i?null:"inside");"outside"===r&&(r="top"),t.textPosition=r,t.textOffset=e.getShallow("offset");var a=e.getShallow("rotate");null!=a&&(a*=Math.PI/180),t.textRotation=a,t.textDistance=k(e.getShallow("distance"),i?null:5)}var o,s=e.ecModel,l=s&&s.option.textStyle,u=Ta(e);if(u){o={};for(var h in u)if(u.hasOwnProperty(h)){var c=e.getModel(["rich",h]);Ia(o[h]={},c,l,n,i)}}return t.rich=o,Ia(t,e,l,n,i,!0),n.forceRich&&!n.textStyle&&(n.textStyle={}),t}function Ta(t){for(var e;t&&t!==t.ecModel;){var n=(t.option||pv).rich;if(n){e=e||{};for(var i in n)n.hasOwnProperty(i)&&(e[i]=1)}t=t.parentModel}return e}function Ia(t,e,n,i,r,a){n=!r&&n||pv,t.textFill=Ca(e.getShallow("color"),i)||n.color,t.textStroke=Ca(e.getShallow("textBorderColor"),i)||n.textBorderColor,t.textStrokeWidth=k(e.getShallow("textBorderWidth"),n.textBorderWidth),t.insideRawTextPosition=t.textPosition,r||(a&&(t.insideRollbackOpt=i,Da(t)),null==t.textFill&&(t.textFill=i.autoColor)),t.fontStyle=e.getShallow("fontStyle")||n.fontStyle,t.fontWeight=e.getShallow("fontWeight")||n.fontWeight,t.fontSize=e.getShallow("fontSize")||n.fontSize,t.fontFamily=e.getShallow("fontFamily")||n.fontFamily,t.textAlign=e.getShallow("align"),t.textVerticalAlign=e.getShallow("verticalAlign")||e.getShallow("baseline"),t.textLineHeight=e.getShallow("lineHeight"),t.textWidth=e.getShallow("width"),t.textHeight=e.getShallow("height"),t.textTag=e.getShallow("tag"),a&&i.disableBox||(t.textBackgroundColor=Ca(e.getShallow("backgroundColor"),i),t.textPadding=e.getShallow("padding"),t.textBorderColor=Ca(e.getShallow("borderColor"),i),t.textBorderWidth=e.getShallow("borderWidth"),t.textBorderRadius=e.getShallow("borderRadius"),t.textBoxShadowColor=e.getShallow("shadowColor"),t.textBoxShadowBlur=e.getShallow("shadowBlur"),t.textBoxShadowOffsetX=e.getShallow("shadowOffsetX"),t.textBoxShadowOffsetY=e.getShallow("shadowOffsetY")),t.textShadowColor=e.getShallow("textShadowColor")||n.textShadowColor,t.textShadowBlur=e.getShallow("textShadowBlur")||n.textShadowBlur,t.textShadowOffsetX=e.getShallow("textShadowOffsetX")||n.textShadowOffsetX,t.textShadowOffsetY=e.getShallow("textShadowOffsetY")||n.textShadowOffsetY}function Ca(t,e){return"auto"!==t?t:e&&e.autoColor?e.autoColor:null}function Da(t){var e=t.insideRollbackOpt;if(e&&null==t.textFill){var n,i=e.useInsideStyle,r=t.insideRawTextPosition,a=e.autoColor;i!==!1&&(i===!0||e.isRectText&&r&&"string"==typeof r&&r.indexOf("inside")>=0)?(n={textFill:null,textStroke:t.textStroke,textStrokeWidth:t.textStrokeWidth},t.textFill="#fff",null==t.textStroke&&(t.textStroke=a,null==t.textStrokeWidth&&(t.textStrokeWidth=2))):null!=a&&(n={textFill:null},t.textFill=a),n&&(t.insideRollback=n)}}function ka(t){var e=t.insideRollback;e&&(t.textFill=e.textFill,t.textStroke=e.textStroke,t.textStrokeWidth=e.textStrokeWidth,t.insideRollback=null)}function Aa(t,e){var n=e||e.getModel("textStyle");return B([t.fontStyle||n&&n.getShallow("fontStyle")||"",t.fontWeight||n&&n.getShallow("fontWeight")||"",(t.fontSize||n&&n.getShallow("fontSize")||12)+"px",t.fontFamily||n&&n.getShallow("fontFamily")||"sans-serif"].join(" "))}function Pa(t,e,n,i,r,a){"function"==typeof r&&(a=r,r=null);var o=i&&i.isAnimationEnabled();if(o){var s=t?"Update":"",l=i.getShallow("animationDuration"+s),u=i.getShallow("animationEasing"+s),h=i.getShallow("animationDelay"+s);"function"==typeof h&&(h=h(r,i.getAnimationDelayParams?i.getAnimationDelayParams(e,r):null)),"function"==typeof l&&(l=l(r)),l>0?e.animateTo(n,l,h||0,u,a,!!a):(e.stopAnimation(),e.attr(n),a&&a())}else e.stopAnimation(),e.attr(n),a&&a()}function La(t,e,n,i,r){Pa(!0,t,e,n,i,r)}function Oa(t,e,n,i,r){Pa(!1,t,e,n,i,r)}function Ba(t,e){for(var n=Te([]);t&&t!==e;)Ce(n,t.getLocalTransform(),n),t=t.parent;return n}function Ea(t,e,n){return e&&!d(e)&&(e=tf.getLocalTransform(e)),n&&(e=Pe([],e)),ae([],t,e)}function za(t,e,n){var i=0===e[4]||0===e[5]||0===e[0]?1:Math.abs(2*e[4]/e[0]),r=0===e[4]||0===e[5]||0===e[2]?1:Math.abs(2*e[4]/e[2]),a=["left"===t?-i:"right"===t?i:0,"top"===t?-r:"bottom"===t?r:0];return a=Ea(a,e,n),Math.abs(a[0])>Math.abs(a[1])?a[0]>0?"right":"left":a[1]>0?"bottom":"top"}function Ra(t,e,n){function i(t){var e={};return t.traverse(function(t){!t.isGroup&&t.anid&&(e[t.anid]=t)}),e}function r(t){var e={position:G(t.position),rotation:t.rotation};return t.shape&&(e.shape=o({},t.shape)),e}if(t&&e){var a=i(t);e.traverse(function(t){if(!t.isGroup&&t.anid){var e=a[t.anid];if(e){var i=r(t);t.attr(r(e)),La(t,i,n,t.dataIndex)}}})}}function Fa(t,e){return p(t,function(t){var n=t[0];n=dv(n,e.x),n=fv(n,e.x+e.width);var i=t[1];return i=dv(i,e.y),i=fv(i,e.y+e.height),[n,i]})}function Na(t,e){var n=dv(t.x,e.x),i=fv(t.x+t.width,e.x+e.width),r=dv(t.y,e.y),a=fv(t.y+t.height,e.y+e.height);return i>=n&&a>=r?{x:n,y:r,width:i-n,height:a-r}:void 0}function Ha(t,e,n){e=o({rectHover:!0},e);var i=e.style={strokeNoScale:!0};return n=n||{x:-1,y:-1,width:2,height:2},t?0===t.indexOf("image://")?(i.image=t.slice(8),s(i,n),new xi(e)):Jr(t.replace("path://",""),e,n,"center"):void 0}function Wa(t,e,n){this.parentModel=e,this.ecModel=n,this.option=t}function Va(t,e,n){for(var i=0;i<e.length&&(!e[i]||(t=t&&"object"==typeof t?t[e[i]]:null,null!=t));i++);return null==t&&n&&(t=n.get(e)),t}function Ga(t,e){var n=Tv(t).getParent;return n?n.call(t,e):t.parentModel}function Xa(t){return[t||"",Iv++,Math.random().toFixed(5)].join("_")}function Ya(t){var e={};return t.registerSubTypeDefaulter=function(t,n){t=Ki(t),e[t.main]=n},t.determineSubType=function(n,i){var r=i.type;if(!r){var a=Ki(n).main;t.hasSubTypes(n)&&e[a]&&(r=e[a](i))}return r},t}function ja(t,e){function n(t){var n={},a=[];return f(t,function(o){var s=i(n,o),l=s.originalDeps=e(o),h=r(l,t);s.entryCount=h.length,0===s.entryCount&&a.push(o),f(h,function(t){u(s.predecessor,t)<0&&s.predecessor.push(t);var e=i(n,t);u(e.successor,t)<0&&e.successor.push(o)})}),{graph:n,noEntryList:a}}function i(t,e){return t[e]||(t[e]={predecessor:[],successor:[]}),t[e]}function r(t,e){var n=[];return f(t,function(t){u(e,t)>=0&&n.push(t)}),n}t.topologicalTravel=function(t,e,i,r){function a(t){l[t].entryCount--,0===l[t].entryCount&&u.push(t)}function o(t){h[t]=!0,a(t)}if(t.length){var s=n(e),l=s.graph,u=s.noEntryList,h={};for(f(t,function(t){h[t]=!0});u.length;){var c=u.pop(),d=l[c],p=!!h[c];p&&(i.call(r,c,d.originalDeps.slice()),delete h[c]),f(d.successor,p?o:a)}f(h,function(){throw new Error("Circle dependency may exists")})}}}function qa(t){return t.replace(/^\s+/,"").replace(/\s+$/,"")}function Ua(t,e,n,i){var r=e[1]-e[0],a=n[1]-n[0];if(0===r)return 0===a?n[0]:(n[0]+n[1])/2;if(i)if(r>0){if(t<=e[0])return n[0];if(t>=e[1])return n[1]}else{if(t>=e[0])return n[0];if(t<=e[1])return n[1]}else{if(t===e[0])return n[0];if(t===e[1])return n[1]}return(t-e[0])/r*a+n[0]}function Za(t,e){switch(t){case"center":case"middle":t="50%";break;case"left":case"top":t="0%";break;case"right":case"bottom":t="100%"}return"string"==typeof t?qa(t).match(/%$/)?parseFloat(t)/100*e:parseFloat(t):null==t?0/0:+t}function $a(t,e,n){return null==e&&(e=10),e=Math.min(Math.max(0,e),20),t=(+t).toFixed(e),n?t:+t}function Ka(t){return t.sort(function(t,e){return t-e}),t}function Qa(t){if(t=+t,isNaN(t))return 0;for(var e=1,n=0;Math.round(t*e)/e!==t;)e*=10,n++;return n}function Ja(t){var e=t.toString(),n=e.indexOf("e");if(n>0){var i=+e.slice(n+1);return 0>i?-i:0}var r=e.indexOf(".");return 0>r?0:e.length-1-r}function to(t,e){var n=Math.log,i=Math.LN10,r=Math.floor(n(t[1]-t[0])/i),a=Math.round(n(Math.abs(e[1]-e[0]))/i),o=Math.min(Math.max(-r+a,0),20);return isFinite(o)?o:20}function eo(t,e,n){if(!t[e])return 0;var i=g(t,function(t,e){return t+(isNaN(e)?0:e)},0);if(0===i)return 0;for(var r=Math.pow(10,n),a=p(t,function(t){return(isNaN(t)?0:t)/i*r*100}),o=100*r,s=p(a,function(t){return Math.floor(t)}),l=g(s,function(t,e){return t+e},0),u=p(a,function(t,e){return t-s[e]});o>l;){for(var h=Number.NEGATIVE_INFINITY,c=null,d=0,f=u.length;f>d;++d)u[d]>h&&(h=u[d],c=d);++s[c],u[c]=0,++l}return s[e]/r}function no(t){var e=2*Math.PI;return(t%e+e)%e}function io(t){return t>-Cv&&Cv>t}function ro(t){if(t instanceof Date)return t;if("string"==typeof t){var e=kv.exec(t);if(!e)return new Date(0/0);if(e[8]){var n=+e[4]||0;return"Z"!==e[8].toUpperCase()&&(n-=e[8].slice(0,3)),new Date(Date.UTC(+e[1],+(e[2]||1)-1,+e[3]||1,n,+(e[5]||0),+e[6]||0,+e[7]||0))}return new Date(+e[1],+(e[2]||1)-1,+e[3]||1,+e[4]||0,+(e[5]||0),+e[6]||0,+e[7]||0)}return new Date(null==t?0/0:Math.round(t))}function ao(t){return Math.pow(10,oo(t))}function oo(t){return Math.floor(Math.log(t)/Math.LN10)}function so(t,e){var n,i=oo(t),r=Math.pow(10,i),a=t/r;return n=e?1.5>a?1:2.5>a?2:4>a?3:7>a?5:10:1>a?1:2>a?2:3>a?3:5>a?5:10,t=n*r,i>=-20?+t.toFixed(0>i?-i:0):t}function lo(t,e){var n=(t.length-1)*e+1,i=Math.floor(n),r=+t[i-1],a=n-i;return a?r+a*(t[i]-r):r}function uo(t){function e(t,n,i){return t.interval[i]<n.interval[i]||t.interval[i]===n.interval[i]&&(t.close[i]-n.close[i]===(i?-1:1)||!i&&e(t,n,1))}t.sort(function(t,n){return e(t,n,0)?-1:1});for(var n=-1/0,i=1,r=0;r<t.length;){for(var a=t[r].interval,o=t[r].close,s=0;2>s;s++)a[s]<=n&&(a[s]=n,o[s]=s?1:1-i),n=a[s],i=o[s];a[0]===a[1]&&o[0]*o[1]!==1?t.splice(r,1):r++}return t}function ho(t){return t-parseFloat(t)>=0}function co(t){return isNaN(t)?"-":(t=(t+"").split("."),t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(t.length>1?"."+t[1]:""))}function fo(t,e){return t=(t||"").toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase()}),e&&t&&(t=t.charAt(0).toUpperCase()+t.slice(1)),t
}function po(t){return null==t?"":(t+"").replace(Lv,function(t,e){return Ov[e]})}function go(t,e,n){_(e)||(e=[e]);var i=e.length;if(!i)return"";for(var r=e[0].$vars||[],a=0;a<r.length;a++){var o=Bv[a];t=t.replace(Ev(o),Ev(o,0))}for(var s=0;i>s;s++)for(var l=0;l<r.length;l++){var u=e[s][r[l]];t=t.replace(Ev(Bv[l],s),n?po(u):u)}return t}function vo(t,e,n){return f(e,function(e,i){t=t.replace("{"+i+"}",n?po(e):e)}),t}function mo(t,e){t=b(t)?{color:t,extraCssText:e}:t||{};var n=t.color,i=t.type,e=t.extraCssText,r=t.renderMode||"html",a=t.markerId||"X";return n?"html"===r?"subItem"===i?'<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:'+po(n)+";"+(e||"")+'"></span>':'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+po(n)+";"+(e||"")+'"></span>':{renderMode:r,content:"{marker"+a+"|}  ",style:{color:n}}:""}function yo(t,e){return t+="","0000".substr(0,e-t.length)+t}function xo(t,e,n){("week"===t||"month"===t||"quarter"===t||"half-year"===t||"year"===t)&&(t="MM-dd\nyyyy");var i=ro(e),r=n?"UTC":"",a=i["get"+r+"FullYear"](),o=i["get"+r+"Month"]()+1,s=i["get"+r+"Date"](),l=i["get"+r+"Hours"](),u=i["get"+r+"Minutes"](),h=i["get"+r+"Seconds"](),c=i["get"+r+"Milliseconds"]();return t=t.replace("MM",yo(o,2)).replace("M",o).replace("yyyy",a).replace("yy",a%100).replace("dd",yo(s,2)).replace("d",s).replace("hh",yo(l,2)).replace("h",l).replace("mm",yo(u,2)).replace("m",u).replace("ss",yo(h,2)).replace("s",h).replace("SSS",yo(c,3))}function _o(t){return t?t.charAt(0).toUpperCase()+t.substr(1):t}function wo(t,e,n,i,r){var a=0,o=0;null==i&&(i=1/0),null==r&&(r=1/0);var s=0;e.eachChild(function(l,u){var h,c,d=l.position,f=l.getBoundingRect(),p=e.childAt(u+1),g=p&&p.getBoundingRect();if("horizontal"===t){var v=f.width+(g?-g.x+f.x:0);h=a+v,h>i||l.newline?(a=0,h=v,o+=s+n,s=f.height):s=Math.max(s,f.height)}else{var m=f.height+(g?-g.y+f.y:0);c=o+m,c>r||l.newline?(a+=s+n,o=0,c=m,s=f.width):s=Math.max(s,f.width)}l.newline||(d[0]=a,d[1]=o,"horizontal"===t?a=h+n:o=c+n)})}function bo(t,e,n){n=Pv(n||0);var i=e.width,r=e.height,a=Za(t.left,i),o=Za(t.top,r),s=Za(t.right,i),l=Za(t.bottom,r),u=Za(t.width,i),h=Za(t.height,r),c=n[2]+n[0],d=n[1]+n[3],f=t.aspect;switch(isNaN(u)&&(u=i-s-d-a),isNaN(h)&&(h=r-l-c-o),null!=f&&(isNaN(u)&&isNaN(h)&&(f>i/r?u=.8*i:h=.8*r),isNaN(u)&&(u=f*h),isNaN(h)&&(h=u/f)),isNaN(a)&&(a=i-s-u-d),isNaN(o)&&(o=r-l-h-c),t.left||t.right){case"center":a=i/2-u/2-n[3];break;case"right":a=i-u-d}switch(t.top||t.bottom){case"middle":case"center":o=r/2-h/2-n[0];break;case"bottom":o=r-h-c}a=a||0,o=o||0,isNaN(u)&&(u=i-d-a-(s||0)),isNaN(h)&&(h=r-c-o-(l||0));var p=new yn(a+n[3],o+n[0],u,h);return p.margin=n,p}function So(t,e,n){function i(n,i){var o={},l=0,u={},h=0,c=2;if(Nv(n,function(e){u[e]=t[e]}),Nv(n,function(t){r(e,t)&&(o[t]=u[t]=e[t]),a(o,t)&&l++,a(u,t)&&h++}),s[i])return a(e,n[1])?u[n[2]]=null:a(e,n[2])&&(u[n[1]]=null),u;if(h!==c&&l){if(l>=c)return o;for(var d=0;d<n.length;d++){var f=n[d];if(!r(o,f)&&r(t,f)){o[f]=t[f];break}}return o}return u}function r(t,e){return t.hasOwnProperty(e)}function a(t,e){return null!=t[e]&&"auto"!==t[e]}function o(t,e,n){Nv(t,function(t){e[t]=n[t]})}!S(n)&&(n={});var s=n.ignoreSize;!_(s)&&(s=[s,s]);var l=i(Wv[0],0),u=i(Wv[1],1);o(Wv[0],t,l),o(Wv[1],t,u)}function Mo(t){return To({},t)}function To(t,e){return e&&t&&Nv(Hv,function(n){e.hasOwnProperty(n)&&(t[n]=e[n])}),t}function Io(t){var e=[];return f(Yv.getClassesByMainType(t),function(t){e=e.concat(t.prototype.dependencies||[])}),e=p(e,function(t){return Ki(t).main}),"dataset"!==t&&u(e,"dataset")<=0&&e.unshift("dataset"),e}function Co(t,e){for(var n=t.length,i=0;n>i;i++)if(t[i].length>e)return t[i];return t[n-1]}function Do(t){var e=t.get("coordinateSystem"),n={coordSysName:e,coordSysDims:[],axisMap:F(),categoryAxisMap:F()},i=$v[e];return i?(i(t,n,n.axisMap,n.categoryAxisMap),n):void 0}function ko(t){return"category"===t.get("type")}function Ao(t){this.fromDataset=t.fromDataset,this.data=t.data||(t.sourceFormat===tm?{}:[]),this.sourceFormat=t.sourceFormat||em,this.seriesLayoutBy=t.seriesLayoutBy||im,this.dimensionsDefine=t.dimensionsDefine,this.encodeDefine=t.encodeDefine&&F(t.encodeDefine),this.startIndex=t.startIndex||0,this.dimensionsDetectCount=t.dimensionsDetectCount}function Po(t){var e=t.option.source,n=em;if(T(e))n=nm;else if(_(e)){0===e.length&&(n=Qv);for(var i=0,r=e.length;r>i;i++){var a=e[i];if(null!=a){if(_(a)){n=Qv;break}if(S(a)){n=Jv;break}}}}else if(S(e)){for(var o in e)if(e.hasOwnProperty(o)&&d(e[o])){n=tm;break}}else if(null!=e)throw new Error("Invalid data");am(t).sourceFormat=n}function Lo(t){return am(t).source}function Oo(t){am(t).datasetMap=F()}function Bo(t){var e=t.option,n=e.data,i=T(n)?nm:Kv,r=!1,a=e.seriesLayoutBy,o=e.sourceHeader,s=e.dimensions,l=Ho(t);if(l){var u=l.option;n=u.source,i=am(l).sourceFormat,r=!0,a=a||u.seriesLayoutBy,null==o&&(o=u.sourceHeader),s=s||u.dimensions}var h=Eo(n,i,a,o,s),c=e.encode;!c&&l&&(c=No(t,l,n,i,a,h)),am(t).source=new Ao({data:n,fromDataset:r,seriesLayoutBy:a,sourceFormat:i,dimensionsDefine:h.dimensionsDefine,startIndex:h.startIndex,dimensionsDetectCount:h.dimensionsDetectCount,encodeDefine:c})}function Eo(t,e,n,i,r){if(!t)return{dimensionsDefine:zo(r)};var a,o,s;if(e===Qv)"auto"===i||null==i?Ro(function(t){null!=t&&"-"!==t&&(b(t)?null==o&&(o=1):o=0)},n,t,10):o=i?1:0,r||1!==o||(r=[],Ro(function(t,e){r[e]=null!=t?t:""},n,t)),a=r?r.length:n===rm?t.length:t[0]?t[0].length:null;else if(e===Jv)r||(r=Fo(t),s=!0);else if(e===tm)r||(r=[],s=!0,f(t,function(t,e){r.push(e)}));else if(e===Kv){var l=Fi(t[0]);a=_(l)&&l.length||1}var u;return s&&f(r,function(t,e){"name"===(S(t)?t.name:t)&&(u=e)}),{startIndex:o,dimensionsDefine:zo(r),dimensionsDetectCount:a,potentialNameDimIndex:u}}function zo(t){if(t){var e=F();return p(t,function(t){if(t=o({},S(t)?t:{name:t}),null==t.name)return t;t.name+="",null==t.displayName&&(t.displayName=t.name);var n=e.get(t.name);return n?t.name+="-"+n.count++:e.set(t.name,{count:1}),t})}}function Ro(t,e,n,i){if(null==i&&(i=1/0),e===rm)for(var r=0;r<n.length&&i>r;r++)t(n[r]?n[r][0]:null,r);else for(var a=n[0]||[],r=0;r<a.length&&i>r;r++)t(a[r],r)}function Fo(t){for(var e,n=0;n<t.length&&!(e=t[n++]););if(e){var i=[];return f(e,function(t,e){i.push(e)}),i}}function No(t,e,n,i,r,a){var o=Do(t),s={},l=[],u=[],h=t.subType,c=F(["pie","map","funnel"]),d=F(["line","bar","pictorialBar","scatter","effectScatter","candlestick","boxplot"]);if(o&&null!=d.get(h)){var p=t.ecModel,g=am(p).datasetMap,v=e.uid+"_"+r,m=g.get(v)||g.set(v,{categoryWayDim:1,valueWayDim:0});f(o.coordSysDims,function(t){if(null==o.firstCategoryDimIndex){var e=m.valueWayDim++;s[t]=e,u.push(e)}else if(o.categoryAxisMap.get(t))s[t]=0,l.push(0);else{var e=m.categoryWayDim++;s[t]=e,u.push(e)}})}else if(null!=c.get(h)){for(var y,x=0;5>x&&null==y;x++)Vo(n,i,r,a.dimensionsDefine,a.startIndex,x)||(y=x);if(null!=y){s.value=y;var _=a.potentialNameDimIndex||Math.max(y-1,0);u.push(_),l.push(_)}}return l.length&&(s.itemName=l),u.length&&(s.seriesName=u),s}function Ho(t){var e=t.option,n=e.data;return n?void 0:t.ecModel.getComponent("dataset",e.datasetIndex||0)}function Wo(t,e){return Vo(t.data,t.sourceFormat,t.seriesLayoutBy,t.dimensionsDefine,t.startIndex,e)}function Vo(t,e,n,i,r,a){function o(t){return null!=t&&isFinite(t)&&""!==t?!1:b(t)&&"-"!==t?!0:void 0}var s,l=5;if(T(t))return!1;var u;if(i&&(u=i[a],u=S(u)?u.name:u),e===Qv)if(n===rm){for(var h=t[a],c=0;c<(h||[]).length&&l>c;c++)if(null!=(s=o(h[r+c])))return s}else for(var c=0;c<t.length&&l>c;c++){var d=t[r+c];if(d&&null!=(s=o(d[a])))return s}else if(e===Jv){if(!u)return;for(var c=0;c<t.length&&l>c;c++){var f=t[c];if(f&&null!=(s=o(f[u])))return s}}else if(e===tm){if(!u)return;var h=t[u];if(!h||T(h))return!1;for(var c=0;c<h.length&&l>c;c++)if(null!=(s=o(h[c])))return s}else if(e===Kv)for(var c=0;c<t.length&&l>c;c++){var f=t[c],p=Fi(f);if(!_(p))return!1;if(null!=(s=o(p[a])))return s}return!1}function Go(t,e){if(e){var n=e.seiresIndex,i=e.seriesId,r=e.seriesName;return null!=n&&t.componentIndex!==n||null!=i&&t.id!==i||null!=r&&t.name!==r}}function Xo(t,e){var n=t.color&&!t.colorLayer;f(e,function(e,a){"colorLayer"===a&&n||Yv.hasClass(a)||("object"==typeof e?t[a]=t[a]?r(t[a],e,!1):i(e):null==t[a]&&(t[a]=e))})}function Yo(t){t=t,this.option={},this.option[om]=1,this._componentsMap=F({series:[]}),this._seriesIndices,this._seriesIndicesMap,Xo(t,this._theme.option),r(t,qv,!1),this.mergeOption(t)}function jo(t,e){_(e)||(e=e?[e]:[]);var n={};return f(e,function(e){n[e]=(t.get(e)||[]).slice()}),n}function qo(t,e,n){var i=e.type?e.type:n?n.subType:Yv.determineSubType(t,e);return i}function Uo(t,e){t._seriesIndicesMap=F(t._seriesIndices=p(e,function(t){return t.componentIndex})||[])}function Zo(t,e){return e.hasOwnProperty("subType")?v(t,function(t){return t.subType===e.subType}):t}function $o(t){f(lm,function(e){this[e]=y(t[e],t)},this)}function Ko(){this._coordinateSystems=[]}function Qo(t){this._api=t,this._timelineOptions=[],this._mediaList=[],this._mediaDefault,this._currentMediaIndices=[],this._optionBackup,this._newBaseOption}function Jo(t,e,n){var i,r,a=[],o=[],s=t.timeline;if(t.baseOption&&(r=t.baseOption),(s||t.options)&&(r=r||{},a=(t.options||[]).slice()),t.media){r=r||{};var l=t.media;hm(l,function(t){t&&t.option&&(t.query?o.push(t):i||(i=t))})}return r||(r=t),r.timeline||(r.timeline=s),hm([r].concat(a).concat(p(o,function(t){return t.option})),function(t){hm(e,function(e){e(t,n)})}),{baseOption:r,timelineOptions:a,mediaDefault:i,mediaList:o}}function ts(t,e,n){var i={width:e,height:n,aspectratio:e/n},r=!0;return f(t,function(t,e){var n=e.match(pm);if(n&&n[1]&&n[2]){var a=n[1],o=n[2].toLowerCase();es(i[o],t,a)||(r=!1)}}),r}function es(t,e,n){return"min"===n?t>=e:"max"===n?e>=t:t===e}function ns(t,e){return t.join(",")===e.join(",")}function is(t,e){e=e||{},hm(e,function(e,n){if(null!=e){var i=t[n];if(Yv.hasClass(n)){e=zi(e),i=zi(i);var r=Hi(i,e);t[n]=dm(r,function(t){return t.option&&t.exist?fm(t.exist,t.option,!0):t.exist||t.option})}else t[n]=fm(i,e,!0)}})}function rs(t){var e=t&&t.itemStyle;if(e)for(var n=0,i=mm.length;i>n;n++){var a=mm[n],o=e.normal,s=e.emphasis;o&&o[a]&&(t[a]=t[a]||{},t[a].normal?r(t[a].normal,o[a]):t[a].normal=o[a],o[a]=null),s&&s[a]&&(t[a]=t[a]||{},t[a].emphasis?r(t[a].emphasis,s[a]):t[a].emphasis=s[a],s[a]=null)}}function as(t,e,n){if(t&&t[e]&&(t[e].normal||t[e].emphasis)){var i=t[e].normal,r=t[e].emphasis;i&&(n?(t[e].normal=t[e].emphasis=null,s(t[e],i)):t[e]=i),r&&(t.emphasis=t.emphasis||{},t.emphasis[e]=r)}}function os(t){as(t,"itemStyle"),as(t,"lineStyle"),as(t,"areaStyle"),as(t,"label"),as(t,"labelLine"),as(t,"upperLabel"),as(t,"edgeLabel")}function ss(t,e){var n=vm(t)&&t[e],i=vm(n)&&n.textStyle;if(i)for(var r=0,a=Ap.length;a>r;r++){var e=Ap[r];i.hasOwnProperty(e)&&(n[e]=i[e])}}function ls(t){t&&(os(t),ss(t,"label"),t.emphasis&&ss(t.emphasis,"label"))}function us(t){if(vm(t)){rs(t),os(t),ss(t,"label"),ss(t,"upperLabel"),ss(t,"edgeLabel"),t.emphasis&&(ss(t.emphasis,"label"),ss(t.emphasis,"upperLabel"),ss(t.emphasis,"edgeLabel"));var e=t.markPoint;e&&(rs(e),ls(e));var n=t.markLine;n&&(rs(n),ls(n));var i=t.markArea;i&&ls(i);var r=t.data;if("graph"===t.type){r=r||t.nodes;var a=t.links||t.edges;if(a&&!T(a))for(var o=0;o<a.length;o++)ls(a[o]);f(t.categories,function(t){os(t)})}if(r&&!T(r))for(var o=0;o<r.length;o++)ls(r[o]);var e=t.markPoint;if(e&&e.data)for(var s=e.data,o=0;o<s.length;o++)ls(s[o]);var n=t.markLine;if(n&&n.data)for(var l=n.data,o=0;o<l.length;o++)_(l[o])?(ls(l[o][0]),ls(l[o][1])):ls(l[o]);"gauge"===t.type?(ss(t,"axisLabel"),ss(t,"title"),ss(t,"detail")):"treemap"===t.type?(as(t.breadcrumb,"itemStyle"),f(t.levels,function(t){os(t)})):"tree"===t.type&&os(t.leaves)}}function hs(t){return _(t)?t:t?[t]:[]}function cs(t){return(_(t)?t[0]:t)||{}}function ds(t,e){e=e.split(",");for(var n=t,i=0;i<e.length&&(n=n&&n[e[i]],null!=n);i++);return n}function fs(t,e,n,i){e=e.split(",");for(var r,a=t,o=0;o<e.length-1;o++)r=e[o],null==a[r]&&(a[r]={}),a=a[r];(i||null==a[e[o]])&&(a[e[o]]=n)}function ps(t){f(xm,function(e){e[0]in t&&!(e[1]in t)&&(t[e[1]]=t[e[0]])})}function gs(t){f(t,function(e,n){var i=[],r=[0/0,0/0],a=[e.stackResultDimension,e.stackedOverDimension],o=e.data,s=e.isStackedByIndex,l=o.map(a,function(a,l,u){var h=o.get(e.stackedDimension,u);if(isNaN(h))return r;var c,d;s?d=o.getRawIndex(u):c=o.get(e.stackedByDimension,u);for(var f=0/0,p=n-1;p>=0;p--){var g=t[p];if(s||(d=g.data.rawIndexOf(g.stackedByDimension,c)),d>=0){var v=g.data.getByRawIndex(g.stackResultDimension,d);if(h>=0&&v>0||0>=h&&0>v){h+=v,f=v;break}}}return i[0]=h,i[1]=f,i});o.hostModel.setData(l),e.data=l})}function vs(t,e){Ao.isInstance(t)||(t=Ao.seriesDataToSource(t)),this._source=t;var n=this._data=t.data,i=t.sourceFormat;i===nm&&(this._offset=0,this._dimSize=e,this._data=n);var r=Mm[i===Qv?i+"_"+t.seriesLayoutBy:i];o(this,r)}function ms(){return this._data.length}function ys(t){return this._data[t]}function xs(t){for(var e=0;e<t.length;e++)this._data.push(t[e])}function _s(t,e,n){return null!=n?t[n]:t}function ws(t,e,n,i){return bs(t[i],this._dimensionInfos[e])}function bs(t,e){var n=e&&e.type;if("ordinal"===n){var i=e&&e.ordinalMeta;return i?i.parseAndCollect(t):t}return"time"===n&&"number"!=typeof t&&null!=t&&"-"!==t&&(t=+ro(t)),null==t||""===t?0/0:+t}function Ss(t,e,n){if(t){var i=t.getRawDataItem(e);if(null!=i){var r,a,o=t.getProvider().getSource().sourceFormat,s=t.getDimensionInfo(n);return s&&(r=s.name,a=s.index),Tm[o](i,e,a,r)}}}function Ms(t){return new Ts(t)}function Ts(t){t=t||{},this._reset=t.reset,this._plan=t.plan,this._count=t.count,this._onDirty=t.onDirty,this._dirty=!0,this.context}function Is(t,e,n,i,r,a){Am.reset(n,i,r,a),t._callingProgress=e,t._callingProgress({start:n,end:i,count:i-n,next:Am.next},t.context)}function Cs(t,e){t._dueIndex=t._outputDueEnd=t._dueEnd=0,t._settedOutputEnd=null;var n,i;!e&&t._reset&&(n=t._reset(t.context),n&&n.progress&&(i=n.forceFirstProgress,n=n.progress),_(n)&&!n.length&&(n=null)),t._progress=n,t._modBy=t._modDataCount=null;var r=t._downstream;return r&&r.dirty(),i}function Ds(t){var e=t.name;Vi(t)||(t.name=ks(t)||e)}function ks(t){var e=t.getRawData(),n=e.mapDimension("seriesName",!0),i=[];return f(n,function(t){var n=e.getDimensionInfo(t);n.displayName&&i.push(n.displayName)}),i.join(" ")}function As(t){return t.model.getRawData().count()}function Ps(t){var e=t.model;return e.setData(e.getRawData().cloneShallow()),Ls}function Ls(t,e){t.end>e.outputData.count()&&e.model.getRawData().cloneShallow(e.outputData)}function Os(t,e){f(t.CHANGABLE_METHODS,function(n){t.wrapMethod(n,x(Bs,e))})}function Bs(t){var e=Es(t);e&&e.setOutputEnd(this.count())}function Es(t){var e=(t.ecModel||{}).scheduler,n=e&&e.getPipeline(t.uid);if(n){var i=n.currentTask;if(i){var r=i.agentStubMap;r&&(i=r.get(t.uid))}return i}}function zs(){this.group=new Af,this.uid=Xa("viewChart"),this.renderTask=Ms({plan:Ns,reset:Hs}),this.renderTask.context={view:this}}function Rs(t,e){if(t&&(t.trigger(e),"group"===t.type))for(var n=0;n<t.childCount();n++)Rs(t.childAt(n),e)}function Fs(t,e,n){var i=Xi(t,e);null!=i?f(zi(i),function(e){Rs(t.getItemGraphicEl(e),n)}):t.eachItemGraphicEl(function(t){Rs(t,n)})}function Ns(t){return Rm(t.model)}function Hs(t){var e=t.model,n=t.ecModel,i=t.api,r=t.payload,a=e.pipelineContext.progressiveRender,o=t.view,s=r&&zm(r).updateMethod,l=a?"incrementalPrepareRender":s&&o[s]?s:"render";return"render"!==l&&o[l](e,n,i,r),Nm[l]}function Ws(t,e,n){function i(){h=(new Date).getTime(),c=null,t.apply(o,s||[])}var r,a,o,s,l,u=0,h=0,c=null;e=e||0;var d=function(){r=(new Date).getTime(),o=this,s=arguments;var t=l||e,d=l||n;l=null,a=r-(d?u:h)-t,clearTimeout(c),d?c=setTimeout(i,t):a>=0?i():c=setTimeout(i,-a),u=r};return d.clear=function(){c&&(clearTimeout(c),c=null)},d.debounceNextCall=function(t){l=t},d}function Vs(t,e,n,i){var r=t[e];if(r){var a=r[Hm]||r,o=r[Vm],s=r[Wm];if(s!==n||o!==i){if(null==n||!i)return t[e]=a;r=t[e]=Ws(a,n,"debounce"===i),r[Hm]=a,r[Vm]=i,r[Wm]=n}return r}}function Gs(t,e,n,i){this.ecInstance=t,this.api=e,this.unfinished;var n=this._dataProcessorHandlers=n.slice(),i=this._visualHandlers=i.slice();this._allHandlers=n.concat(i),this._stageTaskMap=F()}function Xs(t,e,n,i,r){function a(t,e){return t.setDirty&&(!t.dirtyMap||t.dirtyMap.get(e.__pipeline.id))}r=r||{};var o;f(e,function(e){if(!r.visualType||r.visualType===e.visualType){var s=t._stageTaskMap.get(e.uid),l=s.seriesTaskMap,u=s.overallTask;if(u){var h,c=u.agentStubMap;c.each(function(t){a(r,t)&&(t.dirty(),h=!0)}),h&&u.dirty(),Zm(u,i);var d=t.getPerformArgs(u,r.block);c.each(function(t){t.perform(d)}),o|=u.perform(d)}else l&&l.each(function(s){a(r,s)&&s.dirty();var l=t.getPerformArgs(s,r.block);l.skip=!e.performRawSeries&&n.isSeriesFiltered(s.context.model),Zm(s,i),o|=s.perform(l)})}}),t.unfinished|=o}function Ys(t,e,n,i,r){function a(n){var a=n.uid,s=o.get(a)||o.set(a,Ms({plan:Ks,reset:Qs,count:tl}));s.context={model:n,ecModel:i,api:r,useClearVisual:e.isVisual&&!e.isLayout,plan:e.plan,reset:e.reset,scheduler:t},el(t,n,s)}var o=n.seriesTaskMap||(n.seriesTaskMap=F()),s=e.seriesType,l=e.getTargetSeries;e.createOnAllSeries?i.eachRawSeries(a):s?i.eachRawSeriesByType(s,a):l&&l(i,r).each(a);var u=t._pipelineMap;o.each(function(t,e){u.get(e)||(t.dispose(),o.removeKey(e))})}function js(t,e,n,i,r){function a(e){var n=e.uid,i=s.get(n);i||(i=s.set(n,Ms({reset:Us,onDirty:$s})),o.dirty()),i.context={model:e,overallProgress:h,modifyOutputEnd:c},i.agent=o,i.__block=h,el(t,e,i)}var o=n.overallTask=n.overallTask||Ms({reset:qs});o.context={ecModel:i,api:r,overallReset:e.overallReset,scheduler:t};var s=o.agentStubMap=o.agentStubMap||F(),l=e.seriesType,u=e.getTargetSeries,h=!0,c=e.modifyOutputEnd;l?i.eachRawSeriesByType(l,a):u?u(i,r).each(a):(h=!1,f(i.getSeries(),a));var d=t._pipelineMap;s.each(function(t,e){d.get(e)||(t.dispose(),o.dirty(),s.removeKey(e))})}function qs(t){t.overallReset(t.ecModel,t.api,t.payload)}function Us(t){return t.overallProgress&&Zs}function Zs(){this.agent.dirty(),this.getDownstream().dirty()}function $s(){this.agent&&this.agent.dirty()}function Ks(t){return t.plan&&t.plan(t.model,t.ecModel,t.api,t.payload)}function Qs(t){t.useClearVisual&&t.data.clearAllVisual();var e=t.resetDefines=zi(t.reset(t.model,t.ecModel,t.api,t.payload));return e.length>1?p(e,function(t,e){return Js(e)}):$m}function Js(t){return function(e,n){var i=n.data,r=n.resetDefines[t];if(r&&r.dataEach)for(var a=e.start;a<e.end;a++)r.dataEach(i,a);else r&&r.progress&&r.progress(e,i)}}function tl(t){return t.data.count()}function el(t,e,n){var i=e.uid,r=t._pipelineMap.get(i);!r.head&&(r.head=n),r.tail&&r.tail.pipe(n),r.tail=n,n.__idxInPipeline=r.count++,n.__pipeline=r}function nl(t){Km=null;try{t(Qm,Jm)}catch(e){}return Km}function il(t,e){for(var n in e.prototype)t[n]=H}function rl(t){if(b(t)){var e=new DOMParser;t=e.parseFromString(t,"text/xml")}for(9===t.nodeType&&(t=t.firstChild);"svg"!==t.nodeName.toLowerCase()||1!==t.nodeType;)t=t.nextSibling;return t}function al(){this._defs={},this._root=null,this._isDefine=!1,this._isText=!1}function ol(t,e){for(var n=t.firstChild;n;){if(1===n.nodeType){var i=n.getAttribute("offset");i=i.indexOf("%")>0?parseInt(i,10)/100:i?parseFloat(i):0;var r=n.getAttribute("stop-color")||"#000000";e.addColorStop(i,r)}n=n.nextSibling}}function sl(t,e){t&&t.__inheritedStyle&&(e.__inheritedStyle||(e.__inheritedStyle={}),s(e.__inheritedStyle,t.__inheritedStyle))}function ll(t){for(var e=B(t).split(sy),n=[],i=0;i<e.length;i+=2){var r=parseFloat(e[i]),a=parseFloat(e[i+1]);n.push([r,a])}return n}function ul(t,e,n,i){var r=e.__inheritedStyle||{},a="text"===e.type;if(1===t.nodeType&&(cl(t,e),o(r,dl(t)),!i))for(var s in hy)if(hy.hasOwnProperty(s)){var l=t.getAttribute(s);null!=l&&(r[hy[s]]=l)}var u=a?"textFill":"fill",h=a?"textStroke":"stroke";e.style=e.style||new Nf;var c=e.style;null!=r.fill&&c.set(u,hl(r.fill,n)),null!=r.stroke&&c.set(h,hl(r.stroke,n)),f(["lineWidth","opacity","fillOpacity","strokeOpacity","miterLimit","fontSize"],function(t){var e="lineWidth"===t&&a?"textStrokeWidth":t;null!=r[t]&&c.set(e,parseFloat(r[t]))}),r.textBaseline&&"auto"!==r.textBaseline||(r.textBaseline="alphabetic"),"alphabetic"===r.textBaseline&&(r.textBaseline="bottom"),"start"===r.textAlign&&(r.textAlign="left"),"end"===r.textAlign&&(r.textAlign="right"),f(["lineDashOffset","lineCap","lineJoin","fontWeight","fontFamily","fontStyle","textAlign","textBaseline"],function(t){null!=r[t]&&c.set(t,r[t])}),r.lineDash&&(e.style.lineDash=B(r.lineDash).split(sy)),c[h]&&"none"!==c[h]&&(e[h]=!0),e.__inheritedStyle=r}function hl(t,e){var n=e&&t&&t.match(cy);if(n){var i=B(n[1]),r=e[i];return r}return t}function cl(t,e){var n=t.getAttribute("transform");if(n){n=n.replace(/,/g," ");var i=null,r=[];n.replace(dy,function(t,e,n){r.push(e,n)});for(var a=r.length-1;a>0;a-=2){var o=r[a],s=r[a-1];switch(i=i||Me(),s){case"translate":o=B(o).split(sy),De(i,i,[parseFloat(o[0]),parseFloat(o[1]||0)]);break;case"scale":o=B(o).split(sy),Ae(i,i,[parseFloat(o[0]),parseFloat(o[1]||o[0])]);break;case"rotate":o=B(o).split(sy),ke(i,i,parseFloat(o[0]));break;case"skew":o=B(o).split(sy),console.warn("Skew transform is not supported yet");break;case"matrix":var o=B(o).split(sy);i[0]=parseFloat(o[0]),i[1]=parseFloat(o[1]),i[2]=parseFloat(o[2]),i[3]=parseFloat(o[3]),i[4]=parseFloat(o[4]),i[5]=parseFloat(o[5])}}e.setLocalTransform(i)}}function dl(t){var e=t.getAttribute("style"),n={};if(!e)return n;var i={};fy.lastIndex=0;for(var r;null!=(r=fy.exec(e));)i[r[1]]=r[2];for(var a in hy)hy.hasOwnProperty(a)&&null!=i[a]&&(n[hy[a]]=i[a]);return n}function fl(t,e,n){var i=e/t.width,r=n/t.height,a=Math.min(i,r),o=[a,a],s=[-(t.x+t.width/2)*a+e/2,-(t.y+t.height/2)*a+n/2];return{scale:o,position:s}}function pl(t){return function(e,n,i){e=e&&e.toLowerCase(),Wd.prototype[t].call(this,e,n,i)}}function gl(){Wd.call(this)}function vl(t,e,n){function r(t,e){return t.__prio-e.__prio}n=n||{},"string"==typeof e&&(e=Yy[e]),this.id,this.group,this._dom=t;var a="canvas",o=this._zr=Pi(t,{renderer:n.renderer||a,devicePixelRatio:n.devicePixelRatio,width:n.width,height:n.height});this._throttledZrFlush=Ws(y(o.flush,o),17);var e=i(e);e&&wm(e,!0),this._theme=e,this._chartsViews=[],this._chartsMap={},this._componentsViews=[],this._componentsMap={},this._coordSysMgr=new Ko;var s=this._api=Bl(this);In(Xy,r),In(Wy,r),this._scheduler=new Gs(this,s,Wy,Xy),Wd.call(this,this._ecEventProcessor=new El),this._messageCenter=new gl,this._initEvents(),this.resize=y(this.resize,this),this._pendingActions=[],o.animation.on("frame",this._onframe,this),Ml(o,this),E(this)}function ml(t,e,n){var i,r=this._model,a=this._coordSysMgr.getCoordinateSystems();e=ji(r,e);for(var o=0;o<a.length;o++){var s=a[o];if(s[t]&&null!=(i=s[t](r,e,n)))return i}}function yl(t){var e=t._model,n=t._scheduler;n.restorePipelines(e),n.prepareStageTasks(),Tl(t,"component",e,n),Tl(t,"chart",e,n),n.plan()}function xl(t,e,n,i,r){function a(i){i&&i.__alive&&i[e]&&i[e](i.__model,o,t._api,n)}var o=t._model;if(!i)return void yy(t._componentsViews.concat(t._chartsViews),a);var s={};s[i+"Id"]=n[i+"Id"],s[i+"Index"]=n[i+"Index"],s[i+"Name"]=n[i+"Name"];var l={mainType:i,query:s};r&&(l.subType=r);var u=n.excludeSeriesId;null!=u&&(u=F(zi(u))),o&&o.eachComponent(l,function(e){u&&null!=u.get(e.id)||a(t["series"===i?"_chartsMap":"_componentsMap"][e.__viewId])},t)}function _l(t,e){var n=t._chartsMap,i=t._scheduler;e.eachSeries(function(t){i.updateStreamModes(t,n[t.__viewId])})}function wl(t,e){var n=t.type,i=t.escapeConnect,r=Ny[n],a=r.actionInfo,l=(a.update||"update").split(":"),u=l.pop();l=null!=l[0]&&wy(l[0]),this[Oy]=!0;var h=[t],c=!1;t.batch&&(c=!0,h=p(t.batch,function(e){return e=s(o({},e),t),e.batch=null,e}));var d,f=[],g="highlight"===n||"downplay"===n;yy(h,function(t){d=r.action(t,this._model,this._api),d=d||o({},t),d.type=a.event||d.type,f.push(d),g?xl(this,u,t,"series"):l&&xl(this,u,t,l.main,l.sub)},this),"none"===u||g||l||(this[By]?(yl(this),Ry.update.call(this,t),this[By]=!1):Ry[u].call(this,t)),d=c?{type:a.event||n,escapeConnect:i,batch:f}:f[0],this[Oy]=!1,!e&&this._messageCenter.trigger(d.type,d)}function bl(t){for(var e=this._pendingActions;e.length;){var n=e.shift();wl.call(this,n,t)}}function Sl(t){!t&&this.trigger("updated")}function Ml(t,e){t.on("rendered",function(){e.trigger("rendered"),!t.animation.isFinished()||e[By]||e._scheduler.unfinished||e._pendingActions.length||e.trigger("finished")})}function Tl(t,e,n,i){function r(t){var e="_ec_"+t.id+"_"+t.type,r=s[e];if(!r){var h=wy(t.type),c=a?Om.getClass(h.main,h.sub):zs.getClass(h.sub);r=new c,r.init(n,u),s[e]=r,o.push(r),l.add(r.group)}t.__viewId=r.__id=e,r.__alive=!0,r.__model=t,r.group.__ecComponentInfo={mainType:t.mainType,index:t.componentIndex},!a&&i.prepareView(r,t,n,u)}for(var a="component"===e,o=a?t._componentsViews:t._chartsViews,s=a?t._componentsMap:t._chartsMap,l=t._zr,u=t._api,h=0;h<o.length;h++)o[h].__alive=!1;a?n.eachComponent(function(t,e){"series"!==t&&r(e)}):n.eachSeries(r);for(var h=0;h<o.length;){var c=o[h];c.__alive?h++:(!a&&c.renderTask.dispose(),l.remove(c.group),c.dispose(n,u),o.splice(h,1),delete s[c.__id],c.__id=c.group.__ecComponentInfo=null)}}function Il(t){t.clearColorPalette(),t.eachSeries(function(t){t.clearColorPalette()})}function Cl(t,e,n,i){Dl(t,e,n,i),yy(t._chartsViews,function(t){t.__alive=!1}),kl(t,e,n,i),yy(t._chartsViews,function(t){t.__alive||t.remove(e,n)})}function Dl(t,e,n,i,r){yy(r||t._componentsViews,function(t){var r=t.__model;t.render(r,e,n,i),Ol(r,t)})}function kl(t,e,n,i,r){var a,o=t._scheduler;e.eachSeries(function(e){var n=t._chartsMap[e.__viewId];n.__alive=!0;var s=n.renderTask;o.updatePayload(s,i),r&&r.get(e.uid)&&s.dirty(),a|=s.perform(o.getPerformArgs(s)),n.group.silent=!!e.get("silent"),Ol(e,n),Ll(e,n)}),o.unfinished|=a,Pl(t._zr,e),Ym(t._zr.dom,e)}function Al(t,e){yy(Gy,function(n){n(t,e)})}function Pl(t,e){var n=t.storage,i=0;n.traverse(function(t){t.isGroup||i++}),i>e.get("hoverLayerThreshold")&&!xd.node&&n.traverse(function(t){t.isGroup||(t.useHoverLayer=!0)})}function Ll(t,e){var n=t.get("blendMode")||null;e.group.traverse(function(t){t.isGroup||t.style.blend!==n&&t.setStyle("blend",n),t.eachPendingDisplayable&&t.eachPendingDisplayable(function(t){t.setStyle("blend",n)})})}function Ol(t,e){var n=t.get("z"),i=t.get("zlevel");e.group.traverse(function(t){"group"!==t.type&&(null!=n&&(t.z=n),null!=i&&(t.zlevel=i))})}function Bl(t){var e=t._coordSysMgr;return o(new $o(t),{getCoordinateSystems:y(e.getCoordinateSystems,e),getComponentByElement:function(e){for(;e;){var n=e.__ecComponentInfo;if(null!=n)return t._model.getComponent(n.mainType,n.index);e=e.parent}}})}function El(){this.eventInfo}function zl(t){function e(t,e){for(var n=0;n<t.length;n++){var i=t[n];i[a]=e}}var n=0,i=1,r=2,a="__connectUpdateStatus";yy(Hy,function(o,s){t._messageCenter.on(s,function(o){if(Uy[t.group]&&t[a]!==n){if(o&&o.escapeConnect)return;var s=t.makeActionFromEvent(o),l=[];yy(qy,function(e){e!==t&&e.group===t.group&&l.push(e)}),e(l,n),yy(l,function(t){t[a]!==i&&t.dispatchAction(s)}),e(l,r)}})})}function Rl(t,e,n){var i=Wl(t);if(i)return i;var r=new vl(t,e,n);return r.id="ec_"+Zy++,qy[r.id]=r,Ui(t,Ky,r.id),zl(r),r}function Fl(t){if(_(t)){var e=t;t=null,yy(e,function(e){null!=e.group&&(t=e.group)}),t=t||"g_"+$y++,yy(e,function(e){e.group=t})}return Uy[t]=!0,t}function Nl(t){Uy[t]=!1}function Hl(t){"string"==typeof t?t=qy[t]:t instanceof vl||(t=Wl(t)),t instanceof vl&&!t.isDisposed()&&t.dispose()}function Wl(t){return qy[Zi(t,Ky)]}function Vl(t){return qy[t]}function Gl(t,e){Yy[t]=e}function Xl(t){Vy.push(t)}function Yl(t,e){Ql(Wy,t,e,Ty)}function jl(t){Gy.push(t)}function ql(t,e,n){"function"==typeof e&&(n=e,e="");var i=_y(t)?t.type:[t,t={event:e}][0];t.event=(t.event||i).toLowerCase(),e=t.event,my(Ey.test(i)&&Ey.test(e)),Ny[i]||(Ny[i]={action:n,actionInfo:t}),Hy[e]=i}function Ul(t,e){Ko.register(t,e)}function Zl(t){var e=Ko.get(t);return e?e.getDimensionsInfo?e.getDimensionsInfo():e.dimensions.slice():void 0}function $l(t,e){Ql(Xy,t,e,Cy,"layout")}function Kl(t,e){Ql(Xy,t,e,ky,"visual")}function Ql(t,e,n,i,r){(xy(e)||_y(e))&&(n=e,e=i);var a=Gs.wrapStageHandler(n,r);return a.__prio=e,a.__raw=n,t.push(a),a}function Jl(t,e){jy[t]=e}function tu(t){return Yv.extend(t)}function eu(t){return Om.extend(t)}function nu(t){return Lm.extend(t)}function iu(t){return zs.extend(t)}function ru(t){n("createCanvas",t)}function au(t,e,n){gy.registerMap(t,e,n)}function ou(t){var e=gy.retrieveMap(t);return e&&e[0]&&{geoJson:e[0].geoJSON,specialAreas:e[0].specialAreas}}function su(t){return t}function lu(t,e,n,i,r){this._old=t,this._new=e,this._oldKeyGetter=n||su,this._newKeyGetter=i||su,this.context=r}function uu(t,e,n,i,r){for(var a=0;a<t.length;a++){var o="_ec_"+r[i](t[a],a),s=e[o];null==s?(n.push(o),e[o]=a):(s.length||(e[o]=s=[s]),s.push(a))}}function hu(t){var e={},n=e.encode={},i=F(),r=[],a=[];f(t.dimensions,function(e){var o=t.getDimensionInfo(e),s=o.coordDim;if(s){var l=n[s];n.hasOwnProperty(s)||(l=n[s]=[]),l[o.coordDimIndex]=e,o.isExtraCoord||(i.set(s,1),du(o.type)&&(r[0]=e)),o.defaultTooltip&&a.push(e)}tx.each(function(t,e){var i=n[e];n.hasOwnProperty(e)||(i=n[e]=[]);var r=o.otherDims[e];null!=r&&r!==!1&&(i[r]=o.name)})});var o=[],s={};i.each(function(t,e){var i=n[e];s[e]=i[0],o=o.concat(i)}),e.dataDimsOnCoord=o,e.encodeFirstDimNotExtra=s;var l=n.label;l&&l.length&&(r=l.slice());var u=n.tooltip;return u&&u.length?a=u.slice():a.length||(a=r.slice()),n.defaultedLabel=r,n.defaultedTooltip=a,e}function cu(t){return"category"===t?"ordinal":"time"===t?"time":"float"}function du(t){return!("ordinal"===t||"time"===t)}function fu(t){return t._rawCount>65535?ox:lx}function pu(t){var e=t.constructor;return e===Array?t.slice():new e(t)}function gu(t,e){f(ux.concat(e.__wrappedMethods||[]),function(n){e.hasOwnProperty(n)&&(t[n]=e[n])}),t.__wrappedMethods=e.__wrappedMethods,f(hx,function(n){t[n]=i(e[n])}),t._calculationInfo=o(e._calculationInfo)}function vu(t,e,n,i,r){var a=ax[e.type],o=i-1,s=e.name,l=t[s][o];if(l&&l.length<n){for(var u=new a(Math.min(r-o*n,n)),h=0;h<l.length;h++)u[h]=l[h];t[s][o]=u}for(var c=i*n;r>c;c+=n)t[s].push(new a(Math.min(r-c,n)))}function mu(t){var e=t._invertedIndicesMap;f(e,function(n,i){var r=t._dimensionInfos[i],a=r.ordinalMeta;if(a){n=e[i]=new sx(a.categories.length);for(var o=0;o<n.length;o++)n[o]=ix;for(var o=0;o<t._count;o++)n[t.get(i,o)]=o}})}function yu(t,e,n){var i;if(null!=e){var r=t._chunkSize,a=Math.floor(n/r),o=n%r,s=t.dimensions[e],l=t._storage[s][a];if(l){i=l[o];var u=t._dimensionInfos[s].ordinalMeta;u&&u.categories.length&&(i=u.categories[i])}}return i}function xu(t){return t}function _u(t){return t<this._count&&t>=0?this._indices[t]:-1}function wu(t,e){var n=t._idList[e];return null==n&&(n=yu(t,t._idDimIdx,e)),null==n&&(n=rx+e),n}function bu(t){return _(t)||(t=[t]),t}function Su(t,e){var n=t.dimensions,i=new cx(p(n,t.getDimensionInfo,t),t.hostModel);gu(i,t);for(var r=i._storage={},a=t._storage,o=0;o<n.length;o++){var s=n[o];a[s]&&(u(e,s)>=0?(r[s]=Mu(a[s]),i._rawExtent[s]=Tu(),i._extent[s]=null):r[s]=a[s])}return i}function Mu(t){for(var e=new Array(t.length),n=0;n<t.length;n++)e[n]=pu(t[n]);return e}function Tu(){return[1/0,-1/0]}function Iu(t,e,n){function r(t,e,n){null!=tx.get(e)?t.otherDims[e]=n:(t.coordDim=e,t.coordDimIndex=n,h.set(e,!0))}Ao.isInstance(e)||(e=Ao.seriesDataToSource(e)),n=n||{},t=(t||[]).slice();for(var a=(n.dimsDef||[]).slice(),l=F(n.encodeDef),u=F(),h=F(),c=[],d=Cu(e,t,a,n.dimCount),p=0;d>p;p++){var g=a[p]=o({},S(a[p])?a[p]:{name:a[p]}),v=g.name,m=c[p]={otherDims:{}};null!=v&&null==u.get(v)&&(m.name=m.displayName=v,u.set(v,p)),null!=g.type&&(m.type=g.type),null!=g.displayName&&(m.displayName=g.displayName)}l.each(function(t,e){if(t=zi(t).slice(),1===t.length&&t[0]<0)return void l.set(e,!1);var n=l.set(e,[]);f(t,function(t,i){b(t)&&(t=u.get(t)),null!=t&&d>t&&(n[i]=t,r(c[t],e,i))})});var y=0;f(t,function(t){var e,t,n,a;if(b(t))e=t,t={};
else{e=t.name;var o=t.ordinalMeta;t.ordinalMeta=null,t=i(t),t.ordinalMeta=o,n=t.dimsDef,a=t.otherDims,t.name=t.coordDim=t.coordDimIndex=t.dimsDef=t.otherDims=null}var u=l.get(e);if(u!==!1){var u=zi(u);if(!u.length)for(var h=0;h<(n&&n.length||1);h++){for(;y<c.length&&null!=c[y].coordDim;)y++;y<c.length&&u.push(y++)}f(u,function(i,o){var l=c[i];if(r(s(l,t),e,o),null==l.name&&n){var u=n[o];!S(u)&&(u={name:u}),l.name=l.displayName=u.name,l.defaultTooltip=u.defaultTooltip}a&&s(l.otherDims,a)})}});var x=n.generateCoord,_=n.generateCoordCount,w=null!=_;_=x?_||1:0;for(var M=x||"value",T=0;d>T;T++){var m=c[T]=c[T]||{},I=m.coordDim;null==I&&(m.coordDim=Du(M,h,w),m.coordDimIndex=0,(!x||0>=_)&&(m.isExtraCoord=!0),_--),null==m.name&&(m.name=Du(m.coordDim,u)),null==m.type&&Wo(e,T,m.name)&&(m.type="ordinal")}return c}function Cu(t,e,n,i){var r=Math.max(t.dimensionsDetectCount||1,e.length,n.length,i||0);return f(e,function(t){var e=t.dimsDef;e&&(r=Math.max(r,e.length))}),r}function Du(t,e,n){if(n||null!=e.get(t)){for(var i=0;null!=e.get(t+i);)i++;t+=i}return e.set(t,!0),t}function ku(t,e,n){n=n||{};var i,r,a,o,s=n.byIndex,l=n.stackedCoordDimension,u=!(!t||!t.get("stack"));if(f(e,function(t,n){b(t)&&(e[n]=t={name:t}),u&&!t.isExtraCoord&&(s||i||!t.ordinalMeta||(i=t),r||"ordinal"===t.type||"time"===t.type||l&&l!==t.coordDim||(r=t))}),!r||s||i||(s=!0),r){a="__\x00ecstackresult",o="__\x00ecstackedover",i&&(i.createInvertedIndices=!0);var h=r.coordDim,c=r.type,d=0;f(e,function(t){t.coordDim===h&&d++}),e.push({name:a,coordDim:h,coordDimIndex:d,type:c,isExtraCoord:!0,isCalculationCoord:!0}),d++,e.push({name:o,coordDim:o,coordDimIndex:d,type:c,isExtraCoord:!0,isCalculationCoord:!0})}return{stackedDimension:r&&r.name,stackedByDimension:i&&i.name,isStackedByIndex:s,stackedOverDimension:o,stackResultDimension:a}}function Au(t,e){return!!e&&e===t.getCalculationInfo("stackedDimension")}function Pu(t,e){return Au(t,e)?t.getCalculationInfo("stackResultDimension"):e}function Lu(t,e,n){n=n||{},Ao.isInstance(t)||(t=Ao.seriesDataToSource(t));var i,r=e.get("coordinateSystem"),a=Ko.get(r),o=Do(e);o&&(i=p(o.coordSysDims,function(t){var e={name:t},n=o.axisMap.get(t);if(n){var i=n.get("type");e.type=cu(i)}return e})),i||(i=a&&(a.getDimensionsInfo?a.getDimensionsInfo():a.dimensions.slice())||["x","y"]);var s,l,u=px(t,{coordDimensions:i,generateCoord:n.generateCoord});o&&f(u,function(t,e){var n=t.coordDim,i=o.categoryAxisMap.get(n);i&&(null==s&&(s=e),t.ordinalMeta=i.getOrdinalMeta()),null!=t.otherDims.itemName&&(l=!0)}),l||null==s||(u[s].otherDims.itemName=0);var h=ku(e,u),c=new cx(u,e);c.setCalculationInfo(h);var d=null!=s&&Ou(t)?function(t,e,n,i){return i===s?n:this.defaultDimValueGetter(t,e,n,i)}:null;return c.hasItemOption=!1,c.initData(t,null,d),c}function Ou(t){if(t.sourceFormat===Kv){var e=Bu(t.data||[]);return null!=e&&!_(Fi(e))}}function Bu(t){for(var e=0;e<t.length&&null==t[e];)e++;return t[e]}function Eu(t){this._setting=t||{},this._extent=[1/0,-1/0],this._interval=0,this.init&&this.init.apply(this,arguments)}function zu(t){this.categories=t.categories||[],this._needCollect=t.needCollect,this._deduplication=t.deduplication,this._map}function Ru(t){return t._map||(t._map=F(t.categories))}function Fu(t){return S(t)&&null!=t.value?t.value:t+""}function Nu(t,e,n,i){var r={},a=t[1]-t[0],o=r.interval=so(a/e,!0);null!=n&&n>o&&(o=r.interval=n),null!=i&&o>i&&(o=r.interval=i);var s=r.intervalPrecision=Hu(o),l=r.niceTickExtent=[yx(Math.ceil(t[0]/o)*o,s),yx(Math.floor(t[1]/o)*o,s)];return Vu(l,t),r}function Hu(t){return Ja(t)+2}function Wu(t,e,n){t[e]=Math.max(Math.min(t[e],n[1]),n[0])}function Vu(t,e){!isFinite(t[0])&&(t[0]=e[0]),!isFinite(t[1])&&(t[1]=e[1]),Wu(t,0,e),Wu(t,1,e),t[0]>t[1]&&(t[0]=t[1])}function Gu(t,e,n,i){var r=[];if(!t)return r;var a=1e4;e[0]<n[0]&&r.push(e[0]);for(var o=n[0];o<=n[1]&&(r.push(o),o=yx(o+t,i),o!==r[r.length-1]);)if(r.length>a)return[];return e[1]>(r.length?r[r.length-1]:n[1])&&r.push(e[1]),r}function Xu(t){return t.get("stack")||bx+t.seriesIndex}function Yu(t){return t.dim+t.index}function ju(t,e){var n=[];return e.eachSeriesByType(t,function(t){$u(t)&&!Ku(t)&&n.push(t)}),n}function qu(t){var e=[];return f(t,function(t){var n=t.getData(),i=t.coordinateSystem,r=i.getBaseAxis(),a=r.getExtent(),o="category"===r.type?r.getBandWidth():Math.abs(a[1]-a[0])/n.count(),s=Za(t.get("barWidth"),o),l=Za(t.get("barMaxWidth"),o),u=t.get("barGap"),h=t.get("barCategoryGap");e.push({bandWidth:o,barWidth:s,barMaxWidth:l,barGap:u,barCategoryGap:h,axisKey:Yu(r),stackId:Xu(t)})}),Uu(e)}function Uu(t){var e={};f(t,function(t){var n=t.axisKey,i=t.bandWidth,r=e[n]||{bandWidth:i,remainedWidth:i,autoWidthCount:0,categoryGap:"20%",gap:"30%",stacks:{}},a=r.stacks;e[n]=r;var o=t.stackId;a[o]||r.autoWidthCount++,a[o]=a[o]||{width:0,maxWidth:0};var s=t.barWidth;s&&!a[o].width&&(a[o].width=s,s=Math.min(r.remainedWidth,s),r.remainedWidth-=s);var l=t.barMaxWidth;l&&(a[o].maxWidth=l);var u=t.barGap;null!=u&&(r.gap=u);var h=t.barCategoryGap;null!=h&&(r.categoryGap=h)});var n={};return f(e,function(t,e){n[e]={};var i=t.stacks,r=t.bandWidth,a=Za(t.categoryGap,r),o=Za(t.gap,1),s=t.remainedWidth,l=t.autoWidthCount,u=(s-a)/(l+(l-1)*o);u=Math.max(u,0),f(i,function(t){var e=t.maxWidth;e&&u>e&&(e=Math.min(e,s),t.width&&(e=Math.min(e,t.width)),s-=e,t.width=e,l--)}),u=(s-a)/(l+(l-1)*o),u=Math.max(u,0);var h,c=0;f(i,function(t){t.width||(t.width=u),h=t,c+=t.width*(1+o)}),h&&(c-=h.width*o);var d=-c/2;f(i,function(t,i){n[e][i]=n[e][i]||{offset:d,width:t.width},d+=t.width*(1+o)})}),n}function Zu(t,e,n){if(t&&e){var i=t[Yu(e)];return null!=i&&null!=n&&(i=i[Xu(n)]),i}}function $u(t){return t.coordinateSystem&&"cartesian2d"===t.coordinateSystem.type}function Ku(t){return t.pipelineContext&&t.pipelineContext.large}function Qu(t,e){var n,i,r=e.getGlobalExtent();r[0]>r[1]?(n=r[1],i=r[0]):(n=r[0],i=r[1]);var a=e.toGlobalCoord(e.dataToCoord(0));return n>a&&(a=n),a>i&&(a=i),a}function Ju(t,e){return Fx(t,Rx(e))}function th(t,e){var n,i,r,a=t.type,o=e.getMin(),s=e.getMax(),l=null!=o,u=null!=s,h=t.getExtent();"ordinal"===a?n=e.getCategories().length:(i=e.get("boundaryGap"),_(i)||(i=[i||0,i||0]),"boolean"==typeof i[0]&&(i=[0,0]),i[0]=Za(i[0],1),i[1]=Za(i[1],1),r=h[1]-h[0]||Math.abs(h[0])),null==o&&(o="ordinal"===a?n?0:0/0:h[0]-i[0]*r),null==s&&(s="ordinal"===a?n?n-1:0/0:h[1]+i[1]*r),"dataMin"===o?o=h[0]:"function"==typeof o&&(o=o({min:h[0],max:h[1]})),"dataMax"===s?s=h[1]:"function"==typeof s&&(s=s({min:h[0],max:h[1]})),(null==o||!isFinite(o))&&(o=0/0),(null==s||!isFinite(s))&&(s=0/0),t.setBlank(C(o)||C(s)||"ordinal"===a&&!t.getOrdinalMeta().categories.length),e.getNeedCrossZero()&&(o>0&&s>0&&!l&&(o=0),0>o&&0>s&&!u&&(s=0));var c=e.ecModel;if(c&&"time"===a){var d,p=ju("bar",c);if(f(p,function(t){d|=t.getBaseAxis()===e.axis}),d){var g=qu(p),v=eh(o,s,e,g);o=v.min,s=v.max}}return[o,s]}function eh(t,e,n,i){var r=n.axis.getExtent(),a=r[1]-r[0],o=Zu(i,n.axis);if(void 0===o)return{min:t,max:e};var s=1/0;f(o,function(t){s=Math.min(t.offset,s)});var l=-1/0;f(o,function(t){l=Math.max(t.offset+t.width,l)}),s=Math.abs(s),l=Math.abs(l);var u=s+l,h=e-t,c=1-(s+l)/a,d=h/c-h;return e+=d*(l/u),t-=d*(s/u),{min:t,max:e}}function nh(t,e){var n=th(t,e),i=null!=e.getMin(),r=null!=e.getMax(),a=e.get("splitNumber");"log"===t.type&&(t.base=e.get("logBase"));var o=t.type;t.setExtent(n[0],n[1]),t.niceExtent({splitNumber:a,fixMin:i,fixMax:r,minInterval:"interval"===o||"time"===o?e.get("minInterval"):null,maxInterval:"interval"===o||"time"===o?e.get("maxInterval"):null});var s=e.get("interval");null!=s&&t.setInterval&&t.setInterval(s)}function ih(t,e){if(e=e||t.get("type"))switch(e){case"category":return new mx(t.getOrdinalMeta?t.getOrdinalMeta():t.getCategories(),[1/0,-1/0]);case"value":return new _x;default:return(Eu.getClass(e)||_x).create(t)}}function rh(t){var e=t.scale.getExtent(),n=e[0],i=e[1];return!(n>0&&i>0||0>n&&0>i)}function ah(t){var e=t.getLabelModel().get("formatter"),n="category"===t.type?t.scale.getExtent()[0]:null;return"string"==typeof e?e=function(e){return function(n){return n=t.scale.getLabel(n),e.replace("{value}",null!=n?n:"")}}(e):"function"==typeof e?function(i,r){return null!=n&&(r=i-n),e(oh(t,i),r)}:function(e){return t.scale.getLabel(e)}}function oh(t,e){return"category"===t.type?t.scale.getLabel(e):e}function sh(t){var e=t.model,n=t.scale;if(e.get("axisLabel.show")&&!n.isBlank()){var i,r,a="category"===t.type,o=n.getExtent();a?r=n.count():(i=n.getTicks(),r=i.length);var s,l=t.getLabelModel(),u=ah(t),h=1;r>40&&(h=Math.ceil(r/40));for(var c=0;r>c;c+=h){var d=i?i[c]:o[0]+c,f=u(d),p=l.getTextRect(f),g=lh(p,l.get("rotate")||0);s?s.union(g):s=g}return s}}function lh(t,e){var n=e*Math.PI/180,i=t.plain(),r=i.width,a=i.height,o=r*Math.cos(n)+a*Math.sin(n),s=r*Math.sin(n)+a*Math.cos(n),l=new yn(i.x,i.y,o,s);return l}function uh(t){var e=t.get("interval");return null==e?"auto":e}function hh(t){return"category"===t.type&&0===uh(t.getLabelModel())}function ch(t,e){if("image"!==this.type){var n=this.style,i=this.shape;i&&"line"===i.symbolType?n.stroke=t:this.__isEmptyBrush?(n.stroke=t,n.fill=e||"#fff"):(n.fill&&(n.fill=t),n.stroke&&(n.stroke=t)),this.dirty(!1)}}function dh(t,e,n,i,r,a,o){var s=0===t.indexOf("empty");s&&(t=t.substr(5,1).toLowerCase()+t.substr(6));var l;return l=0===t.indexOf("image://")?ta(t.slice(8),new yn(e,n,i,r),o?"center":"cover"):0===t.indexOf("path://")?Jr(t.slice(7),{},new yn(e,n,i,r),o?"center":"cover"):new Qx({shape:{symbolType:t,x:e,y:n,width:i,height:r}}),l.__isEmptyBrush=s,l.setColor=ch,l.setColor(a),l}function fh(t){return Lu(t.getSource(),t)}function ph(t,e){var n=e;Wa.isInstance(e)||(n=new Wa(e),c(n,Xx));var i=ih(n);return i.setExtent(t[0],t[1]),nh(i,n),i}function gh(t){c(t,Xx)}function vh(t,e){return Math.abs(t-e)<e_}function mh(t,e,n){var i=0,r=t[0];if(!r)return!1;for(var a=1;a<t.length;a++){var o=t[a];i+=Dr(r[0],r[1],o[0],o[1],e,n),r=o}var s=t[0];return vh(r[0],s[0])&&vh(r[1],s[1])||(i+=Dr(r[0],r[1],s[0],s[1],e,n)),0!==i}function yh(t,e,n){if(this.name=t,this.geometries=e,n)n=[n[0],n[1]];else{var i=this.getBoundingRect();n=[i.x+i.width/2,i.y+i.height/2]}this.center=n}function xh(t){if(!t.UTF8Encoding)return t;var e=t.UTF8Scale;null==e&&(e=1024);for(var n=t.features,i=0;i<n.length;i++)for(var r=n[i],a=r.geometry,o=a.coordinates,s=a.encodeOffsets,l=0;l<o.length;l++){var u=o[l];if("Polygon"===a.type)o[l]=_h(u,s[l],e);else if("MultiPolygon"===a.type)for(var h=0;h<u.length;h++){var c=u[h];u[h]=_h(c,s[l][h],e)}}return t.UTF8Encoding=!1,t}function _h(t,e,n){for(var i=[],r=e[0],a=e[1],o=0;o<t.length;o+=2){var s=t.charCodeAt(o)-64,l=t.charCodeAt(o+1)-64;s=s>>1^-(1&s),l=l>>1^-(1&l),s+=r,l+=a,r=s,a=l,i.push([s/n,l/n])}return i}function wh(t){return"category"===t.type?Sh(t):Ih(t)}function bh(t,e){return"category"===t.type?Th(t,e):{ticks:t.scale.getTicks()}}function Sh(t){var e=t.getLabelModel(),n=Mh(t,e);return!e.get("show")||t.scale.isBlank()?{labels:[],labelCategoryInterval:n.labelCategoryInterval}:n}function Mh(t,e){var n=Ch(t,"labels"),i=uh(e),r=Dh(n,i);if(r)return r;var a,o;return w(i)?a=Bh(t,i):(o="auto"===i?Ah(t):i,a=Oh(t,o)),kh(n,i,{labels:a,labelCategoryInterval:o})}function Th(t,e){var n=Ch(t,"ticks"),i=uh(e),r=Dh(n,i);if(r)return r;var a,o;if((!e.get("show")||t.scale.isBlank())&&(a=[]),w(i))a=Bh(t,i,!0);else if("auto"===i){var s=Mh(t,t.getLabelModel());o=s.labelCategoryInterval,a=p(s.labels,function(t){return t.tickValue})}else o=i,a=Oh(t,o,!0);return kh(n,i,{ticks:a,tickCategoryInterval:o})}function Ih(t){var e=t.scale.getTicks(),n=ah(t);return{labels:p(e,function(e,i){return{formattedLabel:n(e,i),rawLabel:t.scale.getLabel(e),tickValue:e}})}}function Ch(t,e){return i_(t)[e]||(i_(t)[e]=[])}function Dh(t,e){for(var n=0;n<t.length;n++)if(t[n].key===e)return t[n].value}function kh(t,e,n){return t.push({key:e,value:n}),n}function Ah(t){var e=i_(t).autoInterval;return null!=e?e:i_(t).autoInterval=t.calculateCategoryInterval()}function Ph(t){var e=Lh(t),n=ah(t),i=(e.axisRotate-e.labelRotate)/180*Math.PI,r=t.scale,a=r.getExtent(),o=r.count();if(a[1]-a[0]<1)return 0;var s=1;o>40&&(s=Math.max(1,Math.floor(o/40)));for(var l=a[0],u=t.dataToCoord(l+1)-t.dataToCoord(l),h=Math.abs(u*Math.cos(i)),c=Math.abs(u*Math.sin(i)),d=0,f=0;l<=a[1];l+=s){var p=0,g=0,v=Rn(n(l),e.font,"center","top");p=1.3*v.width,g=1.3*v.height,d=Math.max(d,p,7),f=Math.max(f,g,7)}var m=d/h,y=f/c;isNaN(m)&&(m=1/0),isNaN(y)&&(y=1/0);var x=Math.max(0,Math.floor(Math.min(m,y))),_=i_(t.model),w=_.lastAutoInterval,b=_.lastTickCount;return null!=w&&null!=b&&Math.abs(w-x)<=1&&Math.abs(b-o)<=1&&w>x?x=w:(_.lastTickCount=o,_.lastAutoInterval=x),x}function Lh(t){var e=t.getLabelModel();return{axisRotate:t.getRotate?t.getRotate():t.isHorizontal&&!t.isHorizontal()?90:0,labelRotate:e.get("rotate")||0,font:e.getFont()}}function Oh(t,e,n){function i(t){l.push(n?t:{formattedLabel:r(t),rawLabel:a.getLabel(t),tickValue:t})}var r=ah(t),a=t.scale,o=a.getExtent(),s=t.getLabelModel(),l=[],u=Math.max((e||0)+1,1),h=o[0],c=a.count();0!==h&&u>1&&c/u>2&&(h=Math.round(Math.ceil(h/u)*u));var d=hh(t),f=s.get("showMinLabel")||d,p=s.get("showMaxLabel")||d;f&&h!==o[0]&&i(o[0]);for(var g=h;g<=o[1];g+=u)i(g);return p&&g!==o[1]&&i(o[1]),l}function Bh(t,e,n){var i=t.scale,r=ah(t),a=[];return f(i.getTicks(),function(t){var o=i.getLabel(t);e(t,o)&&a.push(n?t:{formattedLabel:r(t),rawLabel:o,tickValue:t})}),a}function Eh(t,e){var n=t[1]-t[0],i=e,r=n/i/2;t[0]+=r,t[1]-=r}function zh(t,e,n,i,r){function a(t,e){return h?t>e:e>t}var o=e.length;if(t.onBand&&!i&&o){var s,l=t.getExtent();if(1===o)e[0].coord=l[0],s=e[1]={coord:l[0]};else{var u=e[1].coord-e[0].coord;f(e,function(t){t.coord-=u/2;var e=e||0;e%2>0&&(t.coord-=u/(2*(e+1)))}),s={coord:e[o-1].coord+u},e.push(s)}var h=l[0]>l[1];a(e[0].coord,l[0])&&(r?e[0].coord=l[0]:e.shift()),r&&a(l[0],e[0].coord)&&e.unshift({coord:l[0]}),a(l[1],s.coord)&&(r?s.coord=l[1]:e.pop()),r&&a(s.coord,l[1])&&e.push({coord:l[1]})}}function Rh(t,e){function n(){a.ignore=a.hoverIgnore,o.ignore=o.hoverIgnore}function i(){a.ignore=a.normalIgnore,o.ignore=o.normalIgnore}Af.call(this);var r=new $g,a=new Kg,o=new Vg;this.add(r),this.add(a),this.add(o),this.updateData(t,e,!0),this.on("emphasis",n).on("normal",i).on("mouseover",n).on("mouseout",i)}function Fh(t,e){return bo(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()})}function Nh(t,e){for(var n=t.mapDimension("value"),i=t.mapArray(n,function(t){return t}),r=[],a="ascending"===e,o=0,s=t.count();s>o;o++)r[o]=o;return"function"==typeof e?r.sort(e):"none"!==e&&r.sort(function(t,e){return a?i[t]-i[e]:i[e]-i[t]}),r}function Hh(t){t.each(function(e){var n,i,r,a,o=t.getItemModel(e),s=o.getModel("label"),l=s.get("position"),u=o.getModel("labelLine"),h=t.getItemLayout(e),c=h.points,d="inner"===l||"inside"===l||"center"===l;if(d)i=(c[0][0]+c[1][0]+c[2][0]+c[3][0])/4,r=(c[0][1]+c[1][1]+c[2][1]+c[3][1])/4,n="center",a=[[i,r],[i,r]];else{var f,p,g,v=u.get("length");"left"===l?(f=(c[3][0]+c[0][0])/2,p=(c[3][1]+c[0][1])/2,g=f-v,i=g-5,n="right"):(f=(c[1][0]+c[2][0])/2,p=(c[1][1]+c[2][1])/2,g=f+v,i=g+5,n="left");var m=p;a=[[f,p],[g,m]],r=m}h.label={linePoints:a,x:i,y:r,verticalAlign:"middle",textAlign:n,inside:d}})}function Wh(t){return this._axes[t]}function Vh(t){v_.call(this,t)}function Gh(t,e){return e.type||(e.data?"category":"value")}function Xh(t,e){return t.getCoordSysModel()===e}function Yh(t,e,n){this._coordsMap={},this._coordsList=[],this._axesMap={},this._axesList=[],this._initCartesian(t,e,n),this.model=t}function jh(t,e,n,i){function r(t){return t.dim+"_"+t.index}n.getAxesOnZeroOf=function(){return a?[a]:[]};var a,o=t[e],s=n.model,l=s.get("axisLine.onZero"),u=s.get("axisLine.onZeroAxisIndex");if(l){if(null!=u)qh(o[u])&&(a=o[u]);else for(var h in o)if(o.hasOwnProperty(h)&&qh(o[h])&&!i[r(o[h])]){a=o[h];break}a&&(i[r(a)]=!0)}}function qh(t){return t&&"category"!==t.type&&"time"!==t.type&&rh(t)}function Uh(t,e){var n=t.getExtent(),i=n[0]+n[1];t.toGlobalCoord="x"===t.dim?function(t){return t+e}:function(t){return i-t+e},t.toLocalCoord="x"===t.dim?function(t){return t-e}:function(t){return i-t+e}}function Zh(t){return p(T_,function(e){var n=t.getReferringComponents(e)[0];return n})}function $h(t){return"cartesian2d"===t.get("coordinateSystem")}function Kh(t){var e={componentType:t.mainType,componentIndex:t.componentIndex};return e[t.mainType+"Index"]=t.componentIndex,e}function Qh(t,e,n,i){var r,a,o=no(n-t.rotation),s=i[0]>i[1],l="start"===e&&!s||"start"!==e&&s;return io(o-I_/2)?(a=l?"bottom":"top",r="center"):io(o-1.5*I_)?(a=l?"top":"bottom",r="center"):(a="middle",r=1.5*I_>o&&o>I_/2?l?"left":"right":l?"right":"left"),{rotation:o,textAlign:r,textVerticalAlign:a}}function Jh(t){var e=t.get("tooltip");return t.get("silent")||!(t.get("triggerEvent")||e&&e.show)}function tc(t,e,n){if(!hh(t.axis)){var i=t.get("axisLabel.showMinLabel"),r=t.get("axisLabel.showMaxLabel");e=e||[],n=n||[];var a=e[0],o=e[1],s=e[e.length-1],l=e[e.length-2],u=n[0],h=n[1],c=n[n.length-1],d=n[n.length-2];i===!1?(ec(a),ec(u)):nc(a,o)&&(i?(ec(o),ec(h)):(ec(a),ec(u))),r===!1?(ec(s),ec(c)):nc(l,s)&&(r?(ec(l),ec(d)):(ec(s),ec(c)))}}function ec(t){t&&(t.ignore=!0)}function nc(t,e){var n=t&&t.getBoundingRect().clone(),i=e&&e.getBoundingRect().clone();if(n&&i){var r=Te([]);return ke(r,r,-t.rotation),n.applyTransform(Ce([],r,t.getLocalTransform())),i.applyTransform(Ce([],r,e.getLocalTransform())),n.intersect(i)}}function ic(t){return"middle"===t||"center"===t}function rc(t,e,n){var i=e.axis;if(e.get("axisTick.show")&&!i.scale.isBlank()){for(var r=e.getModel("axisTick"),a=r.getModel("lineStyle"),o=r.get("length"),l=i.getTicksCoords(),u=[],h=[],c=t._transform,d=[],f=0;f<l.length;f++){var p=l[f].coord;u[0]=p,u[1]=0,h[0]=p,h[1]=n.tickDirection*o,c&&(ae(u,u,c),ae(h,h,c));var g=new nv(ia({anid:"tick_"+l[f].tickValue,shape:{x1:u[0],y1:u[1],x2:h[0],y2:h[1]},style:s(a.getLineStyle(),{stroke:e.get("axisLine.lineStyle.color")}),z2:2,silent:!0}));t.group.add(g),d.push(g)}return d}}function ac(t,e,n){var i=e.axis,r=D(n.axisLabelShow,e.get("axisLabel.show"));if(r&&!i.scale.isBlank()){var a=e.getModel("axisLabel"),o=a.get("margin"),s=i.getViewLabels(),l=(D(n.labelRotate,a.get("rotate"))||0)*I_/180,u=k_(n.rotation,l,n.labelDirection),h=e.getCategories(!0),c=[],d=Jh(e),p=e.get("triggerEvent");return f(s,function(r,s){var l=r.tickValue,f=r.formattedLabel,g=r.rawLabel,v=a;h&&h[l]&&h[l].textStyle&&(v=new Wa(h[l].textStyle,a,e.ecModel));var m=v.getTextColor()||e.get("axisLine.lineStyle.color"),y=i.dataToCoord(l),x=[y,n.labelOffset+n.labelDirection*o],_=new Vg({anid:"label_"+l,position:x,rotation:u.rotation,silent:d,z2:10});ba(_.style,v,{text:f,textAlign:v.getShallow("align",!0)||u.textAlign,textVerticalAlign:v.getShallow("verticalAlign",!0)||v.getShallow("baseline",!0)||u.textVerticalAlign,textFill:"function"==typeof m?m("category"===i.type?g:"value"===i.type?l+"":l,s):m}),p&&(_.eventData=Kh(e),_.eventData.targetType="axisLabel",_.eventData.value=g),t._dumbGroup.add(_),_.updateTransform(),c.push(_),t.group.add(_),_.decomposeTransform()}),c}}function oc(t,e){var n={axesInfo:{},seriesInvolved:!1,coordSysAxesInfo:{},coordSysMap:{}};return sc(n,t,e),n.seriesInvolved&&uc(n,t),n}function sc(t,e,n){var i=e.getComponent("tooltip"),r=e.getComponent("axisPointer"),a=r.get("link",!0)||[],o=[];A_(n.getCoordinateSystems(),function(n){function s(i,s,l){var h=l.model.getModel("axisPointer",r),d=h.get("show");if(d&&("auto"!==d||i||gc(h))){null==s&&(s=h.get("triggerTooltip")),h=i?lc(l,c,r,e,i,s):h;var f=h.get("snap"),p=vc(l.model),g=s||f||"category"===l.type,v=t.axesInfo[p]={key:p,axis:l,coordSys:n,axisPointerModel:h,triggerTooltip:s,involveSeries:g,snap:f,useHandle:gc(h),seriesModels:[]};u[p]=v,t.seriesInvolved|=g;var m=hc(a,l);if(null!=m){var y=o[m]||(o[m]={axesInfo:{}});y.axesInfo[p]=v,y.mapper=a[m].mapper,v.linkGroup=y}}}if(n.axisPointerEnabled){var l=vc(n.model),u=t.coordSysAxesInfo[l]={};t.coordSysMap[l]=n;var h=n.model,c=h.getModel("tooltip",i);if(A_(n.getAxes(),P_(s,!1,null)),n.getTooltipAxes&&i&&c.get("show")){var d="axis"===c.get("trigger"),f="cross"===c.get("axisPointer.type"),p=n.getTooltipAxes(c.get("axisPointer.axis"));(d||f)&&A_(p.baseAxes,P_(s,f?"cross":!0,d)),f&&A_(p.otherAxes,P_(s,"cross",!1))}}})}function lc(t,e,n,r,a,o){var l=e.getModel("axisPointer"),u={};A_(["type","snap","lineStyle","shadowStyle","label","animation","animationDurationUpdate","animationEasingUpdate","z"],function(t){u[t]=i(l.get(t))}),u.snap="category"!==t.type&&!!o,"cross"===l.get("type")&&(u.type="line");var h=u.label||(u.label={});if(null==h.show&&(h.show=!1),"cross"===a){var c=l.get("label.show");if(h.show=null!=c?c:!0,!o){var d=u.lineStyle=l.get("crossStyle");d&&s(h,d.textStyle)}}return t.model.getModel("axisPointer",new Wa(u,n,r))}function uc(t,e){e.eachSeries(function(e){var n=e.coordinateSystem,i=e.get("tooltip.trigger",!0),r=e.get("tooltip.show",!0);n&&"none"!==i&&i!==!1&&"item"!==i&&r!==!1&&e.get("axisPointer.show",!0)!==!1&&A_(t.coordSysAxesInfo[vc(n.model)],function(t){var i=t.axis;n.getAxis(i.dim)===i&&(t.seriesModels.push(e),null==t.seriesDataCount&&(t.seriesDataCount=0),t.seriesDataCount+=e.getData().count())})},this)}function hc(t,e){for(var n=e.model,i=e.dim,r=0;r<t.length;r++){var a=t[r]||{};if(cc(a[i+"AxisId"],n.id)||cc(a[i+"AxisIndex"],n.componentIndex)||cc(a[i+"AxisName"],n.name))return r}}function cc(t,e){return"all"===t||_(t)&&u(t,e)>=0||t===e}function dc(t){var e=fc(t);if(e){var n=e.axisPointerModel,i=e.axis.scale,r=n.option,a=n.get("status"),o=n.get("value");null!=o&&(o=i.parse(o));var s=gc(n);null==a&&(r.status=s?"show":"hide");var l=i.getExtent().slice();l[0]>l[1]&&l.reverse(),(null==o||o>l[1])&&(o=l[1]),o<l[0]&&(o=l[0]),r.value=o,s&&(r.status=e.axis.scale.isBlank()?"hide":"show")}}function fc(t){var e=(t.ecModel.getComponent("axisPointer")||{}).coordSysAxesInfo;return e&&e.axesInfo[vc(t)]}function pc(t){var e=fc(t);return e&&e.axisPointerModel}function gc(t){return!!t.get("handle.show")}function vc(t){return t.type+"||"+t.id}function mc(t,e,n,i,r,a){var o=L_.getAxisPointerClass(t.axisPointerClass);if(o){var s=pc(e);s?(t._axisPointer||(t._axisPointer=new o)).render(e,s,i,a):yc(t,i)}}function yc(t,e,n){var i=t._axisPointer;i&&i.dispose(e,n),t._axisPointer=null}function xc(t,e,n){n=n||{};var i=t.coordinateSystem,r=e.axis,a={},o=r.getAxesOnZeroOf()[0],s=r.position,l=o?"onZero":s,u=r.dim,h=i.getRect(),c=[h.x,h.x+h.width,h.y,h.y+h.height],d={left:0,right:1,top:0,bottom:1,onZero:2},f=e.get("offset")||0,p="x"===u?[c[2]-f,c[3]+f]:[c[0]-f,c[1]+f];if(o){var g=o.toGlobalCoord(o.dataToCoord(0));p[d.onZero]=Math.max(Math.min(g,p[1]),p[0])}a.position=["y"===u?p[d[l]]:c[0],"x"===u?p[d[l]]:c[3]],a.rotation=Math.PI/2*("x"===u?0:1);var v={top:-1,bottom:1,left:-1,right:1};a.labelDirection=a.tickDirection=a.nameDirection=v[s],a.labelOffset=o?p[d[s]]-p[d.onZero]:0,e.get("axisTick.inside")&&(a.tickDirection=-a.tickDirection),D(n.labelInside,e.get("axisLabel.inside"))&&(a.labelDirection=-a.labelDirection);var m=e.get("axisLabel.rotate");return a.labelRotate="top"===l?-m:m,a.z2=1,a}function _c(t,e,n){var i,r={},a="toggleSelected"===t;return n.eachComponent("legend",function(n){a&&null!=i?n[i?"select":"unSelect"](e.name):(n[t](e.name),i=n.isSelected(e.name));var o=n.getData();f(o,function(t){var e=t.get("name");if("\n"!==e&&""!==e){var i=n.isSelected(e);r[e]=r.hasOwnProperty(e)?r[e]&&i:i}})}),{name:e.name,selected:r}}function wc(t,e){var n=Pv(e.get("padding")),i=e.getItemStyle(["color","opacity"]);i.fill=e.get("backgroundColor");var t=new tv({shape:{x:t.x-n[3],y:t.y-n[0],width:t.width+n[1]+n[3],height:t.height+n[0]+n[2],r:e.get("borderRadius")},style:i,silent:!0,z2:-1});return t}function bc(t,e){e.dispatchAction({type:"legendToggleSelect",name:t})}function Sc(t,e,n,i){var r=n.getZr().storage.getDisplayList()[0];r&&r.useHoverLayer||n.dispatchAction({type:"highlight",seriesName:t,name:e,excludeSeriesId:i})}function Mc(t,e,n,i){var r=n.getZr().storage.getDisplayList()[0];r&&r.useHoverLayer||n.dispatchAction({type:"downplay",seriesName:t,name:e,excludeSeriesId:i})}function Tc(t,e,n){var i=t.getOrient(),r=[1,1];r[i.index]=0,So(e,n,{type:"box",ignoreSize:r})}function Ic(t,e,n,i,r){var a=t.axis;if(!a.scale.isBlank()&&a.containData(e)){if(!t.involveSeries)return void n.showPointer(t,e);var s=Cc(e,t),l=s.payloadBatch,u=s.snapToValue;l[0]&&null==r.seriesIndex&&o(r,l[0]),!i&&t.snap&&a.containData(u)&&null!=u&&(e=u),n.showPointer(t,e,l,r),n.showTooltip(t,s,u)}}function Cc(t,e){var n=e.axis,i=n.dim,r=t,a=[],o=Number.MAX_VALUE,s=-1;return Z_(e.seriesModels,function(e){var l,u,h=e.getData().mapDimension(i,!0);if(e.getAxisTooltipData){var c=e.getAxisTooltipData(h,t,n);u=c.dataIndices,l=c.nestestValue}else{if(u=e.getData().indicesOfNearest(h[0],t,"category"===n.type?.5:null),!u.length)return;l=e.getData().get(h[0],u[0])}if(null!=l&&isFinite(l)){var d=t-l,f=Math.abs(d);o>=f&&((o>f||d>=0&&0>s)&&(o=f,s=d,r=l,a.length=0),Z_(u,function(t){a.push({seriesIndex:e.seriesIndex,dataIndexInside:t,dataIndex:e.getData().getRawIndex(t)})}))}}),{payloadBatch:a,snapToValue:r}}function Dc(t,e,n,i){t[e.key]={value:n,payloadBatch:i}}function kc(t,e,n,i){var r=n.payloadBatch,a=e.axis,o=a.model,s=e.axisPointerModel;if(e.triggerTooltip&&r.length){var l=e.coordSys.model,u=vc(l),h=t.map[u];h||(h=t.map[u]={coordSysId:l.id,coordSysIndex:l.componentIndex,coordSysType:l.type,coordSysMainType:l.mainType,dataByAxis:[]},t.list.push(h)),h.dataByAxis.push({axisDim:a.dim,axisIndex:o.componentIndex,axisType:o.type,axisId:o.id,value:i,valueLabelOpt:{precision:s.get("label.precision"),formatter:s.get("label.formatter")},seriesDataIndices:r.slice()})}}function Ac(t,e,n){var i=n.axesInfo=[];Z_(e,function(e,n){var r=e.axisPointerModel.option,a=t[n];a?(!e.useHandle&&(r.status="show"),r.value=a.value,r.seriesDataIndices=(a.payloadBatch||[]).slice()):!e.useHandle&&(r.status="hide"),"show"===r.status&&i.push({axisDim:e.axis.dim,axisIndex:e.axis.model.componentIndex,value:r.value})})}function Pc(t,e,n,i){if(Ec(e)||!t.list.length)return void i({type:"hideTip"});var r=((t.list[0].dataByAxis[0]||{}).seriesDataIndices||[])[0]||{};i({type:"showTip",escapeConnect:!0,x:e[0],y:e[1],tooltipOption:n.tooltipOption,position:n.position,dataIndexInside:r.dataIndexInside,dataIndex:r.dataIndex,seriesIndex:r.seriesIndex,dataByCoordSys:t.list})}function Lc(t,e,n){var i=n.getZr(),r="axisPointerLastHighlights",a=K_(i)[r]||{},o=K_(i)[r]={};Z_(t,function(t){var e=t.axisPointerModel.option;"show"===e.status&&Z_(e.seriesDataIndices,function(t){var e=t.seriesIndex+" | "+t.dataIndex;o[e]=t})});var s=[],l=[];f(a,function(t,e){!o[e]&&l.push(t)}),f(o,function(t,e){!a[e]&&s.push(t)}),l.length&&n.dispatchAction({type:"downplay",escapeConnect:!0,batch:l}),s.length&&n.dispatchAction({type:"highlight",escapeConnect:!0,batch:s})}function Oc(t,e){for(var n=0;n<(t||[]).length;n++){var i=t[n];if(e.axis.dim===i.axisDim&&e.axis.model.componentIndex===i.axisIndex)return i}}function Bc(t){var e=t.axis.model,n={},i=n.axisDim=t.axis.dim;return n.axisIndex=n[i+"AxisIndex"]=e.componentIndex,n.axisName=n[i+"AxisName"]=e.name,n.axisId=n[i+"AxisId"]=e.id,n}function Ec(t){return!t||null==t[0]||isNaN(t[0])||null==t[1]||isNaN(t[1])}function zc(t,e,n){if(!xd.node){var i=e.getZr();J_(i).records||(J_(i).records={}),Rc(i,e);var r=J_(i).records[t]||(J_(i).records[t]={});r.handler=n}}function Rc(t,e){function n(n,i){t.on(n,function(n){var r=Wc(e);tw(J_(t).records,function(t){t&&i(t,n,r.dispatchAction)}),Fc(r.pendings,e)})}J_(t).initialized||(J_(t).initialized=!0,n("click",x(Hc,"click")),n("mousemove",x(Hc,"mousemove")),n("globalout",Nc))}function Fc(t,e){var n,i=t.showTip.length,r=t.hideTip.length;i?n=t.showTip[i-1]:r&&(n=t.hideTip[r-1]),n&&(n.dispatchAction=null,e.dispatchAction(n))}function Nc(t,e,n){t.handler("leave",null,n)}function Hc(t,e,n,i){e.handler(t,n,i)}function Wc(t){var e={showTip:[],hideTip:[]},n=function(i){var r=e[i.type];r?r.push(i):(i.dispatchAction=n,t.dispatchAction(i))};return{dispatchAction:n,pendings:e}}function Vc(t,e){if(!xd.node){var n=e.getZr(),i=(J_(n).records||{})[t];i&&(J_(n).records[t]=null)}}function Gc(){}function Xc(t,e,n,i){Yc(nw(n).lastProp,i)||(nw(n).lastProp=i,e?La(n,i,t):(n.stopAnimation(),n.attr(i)))}function Yc(t,e){if(S(t)&&S(e)){var n=!0;return f(e,function(e,i){n=n&&Yc(t[i],e)}),!!n}return t===e}function jc(t,e){t[e.get("label.show")?"show":"hide"]()}function qc(t){return{position:t.position.slice(),rotation:t.rotation||0}}function Uc(t,e,n){var i=e.get("z"),r=e.get("zlevel");t&&t.traverse(function(t){"group"!==t.type&&(null!=i&&(t.z=i),null!=r&&(t.zlevel=r),t.silent=n)})}function Zc(t){var e,n=t.get("type"),i=t.getModel(n+"Style");return"line"===n?(e=i.getLineStyle(),e.fill=null):"shadow"===n&&(e=i.getAreaStyle(),e.stroke=null),e}function $c(t,e,n,i,r){var a=n.get("value"),o=Qc(a,e.axis,e.ecModel,n.get("seriesDataIndices"),{precision:n.get("label.precision"),formatter:n.get("label.formatter")}),s=n.getModel("label"),l=Pv(s.get("padding")||0),u=s.getFont(),h=Rn(o,u),c=r.position,d=h.width+l[1]+l[3],f=h.height+l[0]+l[2],p=r.align;"right"===p&&(c[0]-=d),"center"===p&&(c[0]-=d/2);var g=r.verticalAlign;"bottom"===g&&(c[1]-=f),"middle"===g&&(c[1]-=f/2),Kc(c,d,f,i);var v=s.get("backgroundColor");v&&"auto"!==v||(v=e.get("axisLine.lineStyle.color")),t.label={shape:{x:0,y:0,width:d,height:f,r:s.get("borderRadius")},position:c.slice(),style:{text:o,textFont:u,textFill:s.getTextColor(),textPosition:"inside",fill:v,stroke:s.get("borderColor")||"transparent",lineWidth:s.get("borderWidth")||0,shadowBlur:s.get("shadowBlur"),shadowColor:s.get("shadowColor"),shadowOffsetX:s.get("shadowOffsetX"),shadowOffsetY:s.get("shadowOffsetY")},z2:10}}function Kc(t,e,n,i){var r=i.getWidth(),a=i.getHeight();t[0]=Math.min(t[0]+e,r)-e,t[1]=Math.min(t[1]+n,a)-n,t[0]=Math.max(t[0],0),t[1]=Math.max(t[1],0)}function Qc(t,e,n,i,r){t=e.scale.parse(t);var a=e.scale.getLabel(t,{precision:r.precision}),o=r.formatter;if(o){var s={value:oh(e,t),seriesData:[]};f(i,function(t){var e=n.getSeriesByIndex(t.seriesIndex),i=t.dataIndexInside,r=e&&e.getDataParams(i);r&&s.seriesData.push(r)}),b(o)?a=o.replace("{value}",a):w(o)&&(a=o(s))}return a}function Jc(t,e,n){var i=Me();return ke(i,i,n.rotation),De(i,i,n.position),Ea([t.dataToCoord(e),(n.labelOffset||0)+(n.labelDirection||1)*(n.labelMargin||0)],i)}function td(t,e,n,i,r,a){var o=C_.innerTextLayout(n.rotation,0,n.labelDirection);n.labelMargin=r.get("label.margin"),$c(e,i,r,a,{position:Jc(i.axis,t,n),align:o.textAlign,verticalAlign:o.textVerticalAlign})}function ed(t,e,n){return n=n||0,{x1:t[n],y1:t[1-n],x2:e[n],y2:e[1-n]}}function nd(t,e,n){return n=n||0,{x:t[n],y:t[1-n],width:e[n],height:e[1-n]}}function id(t,e){var n={};return n[e.dim+"AxisIndex"]=e.index,t.getCartesian(n)}function rd(t){return"x"===t.dim?0:1}function ad(t){var e="cubic-bezier(0.23, 1, 0.32, 1)",n="left "+t+"s "+e+",top "+t+"s "+e;return p(uw,function(t){return t+"transition:"+n}).join(";")}function od(t){var e=[],n=t.get("fontSize"),i=t.getTextColor();return i&&e.push("color:"+i),e.push("font:"+t.getFont()),n&&e.push("line-height:"+Math.round(3*n/2)+"px"),sw(["decoration","align"],function(n){var i=t.get(n);i&&e.push("text-"+n+":"+i)}),e.join(";")}function sd(t){var e=[],n=t.get("transitionDuration"),i=t.get("backgroundColor"),r=t.getModel("textStyle"),a=t.get("padding");return n&&e.push(ad(n)),i&&(xd.canvasSupported?e.push("background-Color:"+i):(e.push("background-Color:#"+Ze(i)),e.push("filter:alpha(opacity=70)"))),sw(["width","color","radius"],function(n){var i="border-"+n,r=lw(i),a=t.get(r);null!=a&&e.push(i+":"+a+("color"===n?"":"px"))}),e.push(od(r)),null!=a&&e.push("padding:"+Pv(a).join("px ")+"px"),e.join(";")+";"}function ld(t,e){if(xd.wxa)return null;var n=document.createElement("div"),i=this._zr=e.getZr();this.el=n,this._x=e.getWidth()/2,this._y=e.getHeight()/2,t.appendChild(n),this._container=t,this._show=!1,this._hideTimeout;var r=this;n.onmouseenter=function(){r._enterable&&(clearTimeout(r._hideTimeout),r._show=!0),r._inContent=!0},n.onmousemove=function(e){if(e=e||window.event,!r._enterable){var n=i.handler;ge(t,e,!0),n.dispatch("mousemove",e)
}},n.onmouseleave=function(){r._enterable&&r._show&&r.hideLater(r._hideDelay),r._inContent=!1}}function ud(t){this._zr=t.getZr(),this._show=!1,this._hideTimeout}function hd(t){for(var e=t.pop();t.length;){var n=t.pop();n&&(Wa.isInstance(n)&&(n=n.get("tooltip",!0)),"string"==typeof n&&(n={formatter:n}),e=new Wa(n,e,e.ecModel))}return e}function cd(t,e){return t.dispatchAction||y(e.dispatchAction,e)}function dd(t,e,n,i,r,a,o){var s=n.getOuterSize(),l=s.width,u=s.height;return null!=a&&(t+l+a>i?t-=l+a:t+=a),null!=o&&(e+u+o>r?e-=u+o:e+=o),[t,e]}function fd(t,e,n,i,r){var a=n.getOuterSize(),o=a.width,s=a.height;return t=Math.min(t+o,i)-o,e=Math.min(e+s,r)-s,t=Math.max(t,0),e=Math.max(e,0),[t,e]}function pd(t,e,n){var i=n[0],r=n[1],a=5,o=0,s=0,l=e.width,u=e.height;switch(t){case"inside":o=e.x+l/2-i/2,s=e.y+u/2-r/2;break;case"top":o=e.x+l/2-i/2,s=e.y-r-a;break;case"bottom":o=e.x+l/2-i/2,s=e.y+u+a;break;case"left":o=e.x-i-a,s=e.y+u/2-r/2;break;case"right":o=e.x+l+a,s=e.y+u/2-r/2}return[o,s]}function gd(t){return"center"===t||"middle"===t}var vd=2311,md=function(){return vd++},yd={};yd="object"==typeof wx&&"function"==typeof wx.getSystemInfoSync?{browser:{},os:{},node:!1,wxa:!0,canvasSupported:!0,svgSupported:!1,touchEventsSupported:!0,domSupported:!1}:"undefined"==typeof document&&"undefined"!=typeof self?{browser:{},os:{},node:!1,worker:!0,canvasSupported:!0,domSupported:!1}:"undefined"==typeof navigator?{browser:{},os:{},node:!0,worker:!1,canvasSupported:!0,svgSupported:!0,domSupported:!1}:e(navigator.userAgent);var xd=yd,_d={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1,"[object CanvasPattern]":1,"[object Image]":1,"[object Canvas]":1},wd={"[object Int8Array]":1,"[object Uint8Array]":1,"[object Uint8ClampedArray]":1,"[object Int16Array]":1,"[object Uint16Array]":1,"[object Int32Array]":1,"[object Uint32Array]":1,"[object Float32Array]":1,"[object Float64Array]":1},bd=Object.prototype.toString,Sd=Array.prototype,Md=Sd.forEach,Td=Sd.filter,Id=Sd.slice,Cd=Sd.map,Dd=Sd.reduce,kd={},Ad=function(){return kd.createCanvas()};kd.createCanvas=function(){return document.createElement("canvas")};var Pd,Ld="__ec_primitive__";R.prototype={constructor:R,get:function(t){return this.data.hasOwnProperty(t)?this.data[t]:null},set:function(t,e){return this.data[t]=e},each:function(t,e){void 0!==e&&(t=y(t,e));for(var n in this.data)this.data.hasOwnProperty(n)&&t(this.data[n],n)},removeKey:function(t){delete this.data[t]}};var Od=(Object.freeze||Object)({$override:n,clone:i,merge:r,mergeAll:a,extend:o,defaults:s,createCanvas:Ad,getContext:l,indexOf:u,inherits:h,mixin:c,isArrayLike:d,each:f,map:p,reduce:g,filter:v,find:m,bind:y,curry:x,isArray:_,isFunction:w,isString:b,isObject:S,isBuiltInObject:M,isTypedArray:T,isDom:I,eqNaN:C,retrieve:D,retrieve2:k,retrieve3:A,slice:P,normalizeCssArray:L,assert:O,trim:B,setAsPrimitive:E,isPrimitive:z,createHashMap:F,concatArray:N,noop:H}),Bd="undefined"==typeof Float32Array?Array:Float32Array,Ed=U,zd=Z,Rd=ee,Fd=ne,Nd=(Object.freeze||Object)({create:W,copy:V,clone:G,set:X,add:Y,scaleAndAdd:j,sub:q,len:U,length:Ed,lenSquare:Z,lengthSquare:zd,mul:$,div:K,dot:Q,scale:J,normalize:te,distance:ee,dist:Rd,distanceSquare:ne,distSquare:Fd,negate:ie,lerp:re,applyTransform:ae,min:oe,max:se});le.prototype={constructor:le,_dragStart:function(t){var e=t.target;e&&e.draggable&&(this._draggingTarget=e,e.dragging=!0,this._x=t.offsetX,this._y=t.offsetY,this.dispatchToElement(ue(e,t),"dragstart",t.event))},_drag:function(t){var e=this._draggingTarget;if(e){var n=t.offsetX,i=t.offsetY,r=n-this._x,a=i-this._y;this._x=n,this._y=i,e.drift(r,a,t),this.dispatchToElement(ue(e,t),"drag",t.event);var o=this.findHover(n,i,e).target,s=this._dropTarget;this._dropTarget=o,e!==o&&(s&&o!==s&&this.dispatchToElement(ue(s,t),"dragleave",t.event),o&&o!==s&&this.dispatchToElement(ue(o,t),"dragenter",t.event))}},_dragEnd:function(t){var e=this._draggingTarget;e&&(e.dragging=!1),this.dispatchToElement(ue(e,t),"dragend",t.event),this._dropTarget&&this.dispatchToElement(ue(this._dropTarget,t),"drop",t.event),this._draggingTarget=null,this._dropTarget=null}};var Hd=Array.prototype.slice,Wd=function(t){this._$handlers={},this._$eventProcessor=t};Wd.prototype={constructor:Wd,one:function(t,e,n,i){return ce(this,t,e,n,i,!0)},on:function(t,e,n,i){return ce(this,t,e,n,i,!1)},isSilent:function(t){var e=this._$handlers;return!e[t]||!e[t].length},off:function(t,e){var n=this._$handlers;if(!t)return this._$handlers={},this;if(e){if(n[t]){for(var i=[],r=0,a=n[t].length;a>r;r++)n[t][r].h!==e&&i.push(n[t][r]);n[t]=i}n[t]&&0===n[t].length&&delete n[t]}else delete n[t];return this},trigger:function(t){var e=this._$handlers[t],n=this._$eventProcessor;if(e){var i=arguments,r=i.length;r>3&&(i=Hd.call(i,1));for(var a=e.length,o=0;a>o;){var s=e[o];if(n&&n.filter&&null!=s.query&&!n.filter(t,s.query))o++;else{switch(r){case 1:s.h.call(s.ctx);break;case 2:s.h.call(s.ctx,i[1]);break;case 3:s.h.call(s.ctx,i[1],i[2]);break;default:s.h.apply(s.ctx,i)}s.one?(e.splice(o,1),a--):o++}}}return n&&n.afterTrigger&&n.afterTrigger(t),this},triggerWithContext:function(t){var e=this._$handlers[t],n=this._$eventProcessor;if(e){var i=arguments,r=i.length;r>4&&(i=Hd.call(i,1,i.length-1));for(var a=i[i.length-1],o=e.length,s=0;o>s;){var l=e[s];if(n&&n.filter&&null!=l.query&&!n.filter(t,l.query))s++;else{switch(r){case 1:l.h.call(a);break;case 2:l.h.call(a,i[1]);break;case 3:l.h.call(a,i[1],i[2]);break;default:l.h.apply(a,i)}l.one?(e.splice(s,1),o--):s++}}}return n&&n.afterTrigger&&n.afterTrigger(t),this}};var Vd="undefined"!=typeof window&&!!window.addEventListener,Gd=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Xd=Vd?function(t){t.preventDefault(),t.stopPropagation(),t.cancelBubble=!0}:function(t){t.returnValue=!1,t.cancelBubble=!0},Yd=function(){this._track=[]};Yd.prototype={constructor:Yd,recognize:function(t,e,n){return this._doTrack(t,e,n),this._recognize(t)},clear:function(){return this._track.length=0,this},_doTrack:function(t,e,n){var i=t.touches;if(i){for(var r={points:[],touches:[],target:e,event:t},a=0,o=i.length;o>a;a++){var s=i[a],l=fe(n,s,{});r.points.push([l.zrX,l.zrY]),r.touches.push(s)}this._track.push(r)}},_recognize:function(t){for(var e in jd)if(jd.hasOwnProperty(e)){var n=jd[e](this._track,t);if(n)return n}}};var jd={pinch:function(t,e){var n=t.length;if(n){var i=(t[n-1]||{}).points,r=(t[n-2]||{}).points||i;if(r&&r.length>1&&i&&i.length>1){var a=ye(i)/ye(r);!isFinite(a)&&(a=1),e.pinchScale=a;var o=xe(i);return e.pinchX=o[0],e.pinchY=o[1],{type:"pinch",target:t[0].target,event:e}}}}},qd="silent";be.prototype.dispose=function(){};var Ud=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],Zd=function(t,e,n,i){Wd.call(this),this.storage=t,this.painter=e,this.painterRoot=i,n=n||new be,this.proxy=null,this._hovered={},this._lastTouchMoment,this._lastX,this._lastY,this._gestureMgr,le.call(this),this.setHandlerProxy(n)};Zd.prototype={constructor:Zd,setHandlerProxy:function(t){this.proxy&&this.proxy.dispose(),t&&(f(Ud,function(e){t.on&&t.on(e,this[e],this)},this),t.handler=this),this.proxy=t},mousemove:function(t){var e=t.zrX,n=t.zrY,i=this._hovered,r=i.target;r&&!r.__zr&&(i=this.findHover(i.x,i.y),r=i.target);var a=this._hovered=this.findHover(e,n),o=a.target,s=this.proxy;s.setCursor&&s.setCursor(o?o.cursor:"default"),r&&o!==r&&this.dispatchToElement(i,"mouseout",t),this.dispatchToElement(a,"mousemove",t),o&&o!==r&&this.dispatchToElement(a,"mouseover",t)},mouseout:function(t){this.dispatchToElement(this._hovered,"mouseout",t);var e,n=t.toElement||t.relatedTarget;do n=n&&n.parentNode;while(n&&9!==n.nodeType&&!(e=n===this.painterRoot));!e&&this.trigger("globalout",{event:t})},resize:function(){this._hovered={}},dispatch:function(t,e){var n=this[t];n&&n.call(this,e)},dispose:function(){this.proxy.dispose(),this.storage=this.proxy=this.painter=null},setCursorStyle:function(t){var e=this.proxy;e.setCursor&&e.setCursor(t)},dispatchToElement:function(t,e,n){t=t||{};var i=t.target;if(!i||!i.silent){for(var r="on"+e,a=_e(e,t,n);i&&(i[r]&&(a.cancelBubble=i[r].call(i,a)),i.trigger(e,a),i=i.parent,!a.cancelBubble););a.cancelBubble||(this.trigger(e,a),this.painter&&this.painter.eachOtherLayer(function(t){"function"==typeof t[r]&&t[r].call(t,a),t.trigger&&t.trigger(e,a)}))}},findHover:function(t,e,n){for(var i=this.storage.getDisplayList(),r={x:t,y:e},a=i.length-1;a>=0;a--){var o;if(i[a]!==n&&!i[a].ignore&&(o=Se(i[a],t,e))&&(!r.topTarget&&(r.topTarget=i[a]),o!==qd)){r.target=i[a];break}}return r},processGesture:function(t,e){this._gestureMgr||(this._gestureMgr=new Yd);var n=this._gestureMgr;"start"===e&&n.clear();var i=n.recognize(t,this.findHover(t.zrX,t.zrY,null).target,this.proxy.dom);if("end"===e&&n.clear(),i){var r=i.type;t.gestureEvent=r,this.dispatchToElement({target:i.target},r,i.event)}}},f(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(t){Zd.prototype[t]=function(e){var n=this.findHover(e.zrX,e.zrY),i=n.target;if("mousedown"===t)this._downEl=i,this._downPoint=[e.zrX,e.zrY],this._upEl=i;else if("mouseup"===t)this._upEl=i;else if("click"===t){if(this._downEl!==this._upEl||!this._downPoint||Rd(this._downPoint,[e.zrX,e.zrY])>4)return;this._downPoint=null}this.dispatchToElement(n,t,e)}}),c(Zd,Wd),c(Zd,le);var $d="undefined"==typeof Float32Array?Array:Float32Array,Kd=(Object.freeze||Object)({create:Me,identity:Te,copy:Ie,mul:Ce,translate:De,rotate:ke,scale:Ae,invert:Pe,clone:Le}),Qd=Te,Jd=5e-5,tf=function(t){t=t||{},t.position||(this.position=[0,0]),null==t.rotation&&(this.rotation=0),t.scale||(this.scale=[1,1]),this.origin=this.origin||null},ef=tf.prototype;ef.transform=null,ef.needLocalTransform=function(){return Oe(this.rotation)||Oe(this.position[0])||Oe(this.position[1])||Oe(this.scale[0]-1)||Oe(this.scale[1]-1)};var nf=[];ef.updateTransform=function(){var t=this.parent,e=t&&t.transform,n=this.needLocalTransform(),i=this.transform;if(!n&&!e)return void(i&&Qd(i));i=i||Me(),n?this.getLocalTransform(i):Qd(i),e&&(n?Ce(i,t.transform,i):Ie(i,t.transform)),this.transform=i;var r=this.globalScaleRatio;if(null!=r&&1!==r){this.getGlobalScale(nf);var a=nf[0]<0?-1:1,o=nf[1]<0?-1:1,s=((nf[0]-a)*r+a)/nf[0]||0,l=((nf[1]-o)*r+o)/nf[1]||0;i[0]*=s,i[1]*=s,i[2]*=l,i[3]*=l}this.invTransform=this.invTransform||Me(),Pe(this.invTransform,i)},ef.getLocalTransform=function(t){return tf.getLocalTransform(this,t)},ef.setTransform=function(t){var e=this.transform,n=t.dpr||1;e?t.setTransform(n*e[0],n*e[1],n*e[2],n*e[3],n*e[4],n*e[5]):t.setTransform(n,0,0,n,0,0)},ef.restoreTransform=function(t){var e=t.dpr||1;t.setTransform(e,0,0,e,0,0)};var rf=[],af=Me();ef.setLocalTransform=function(t){if(t){var e=t[0]*t[0]+t[1]*t[1],n=t[2]*t[2]+t[3]*t[3],i=this.position,r=this.scale;Oe(e-1)&&(e=Math.sqrt(e)),Oe(n-1)&&(n=Math.sqrt(n)),t[0]<0&&(e=-e),t[3]<0&&(n=-n),i[0]=t[4],i[1]=t[5],r[0]=e,r[1]=n,this.rotation=Math.atan2(-t[1]/n,t[0]/e)}},ef.decomposeTransform=function(){if(this.transform){var t=this.parent,e=this.transform;t&&t.transform&&(Ce(rf,t.invTransform,e),e=rf);var n=this.origin;n&&(n[0]||n[1])&&(af[4]=n[0],af[5]=n[1],Ce(rf,e,af),rf[4]-=n[0],rf[5]-=n[1],e=rf),this.setLocalTransform(e)}},ef.getGlobalScale=function(t){var e=this.transform;return t=t||[],e?(t[0]=Math.sqrt(e[0]*e[0]+e[1]*e[1]),t[1]=Math.sqrt(e[2]*e[2]+e[3]*e[3]),e[0]<0&&(t[0]=-t[0]),e[3]<0&&(t[1]=-t[1]),t):(t[0]=1,t[1]=1,t)},ef.transformCoordToLocal=function(t,e){var n=[t,e],i=this.invTransform;return i&&ae(n,n,i),n},ef.transformCoordToGlobal=function(t,e){var n=[t,e],i=this.transform;return i&&ae(n,n,i),n},tf.getLocalTransform=function(t,e){e=e||[],Qd(e);var n=t.origin,i=t.scale||[1,1],r=t.rotation||0,a=t.position||[0,0];return n&&(e[4]-=n[0],e[5]-=n[1]),Ae(e,e,i),r&&ke(e,e,r),n&&(e[4]+=n[0],e[5]+=n[1]),e[4]+=a[0],e[5]+=a[1],e};var of={linear:function(t){return t},quadraticIn:function(t){return t*t},quadraticOut:function(t){return t*(2-t)},quadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},cubicIn:function(t){return t*t*t},cubicOut:function(t){return--t*t*t+1},cubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},quarticIn:function(t){return t*t*t*t},quarticOut:function(t){return 1- --t*t*t*t},quarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},quinticIn:function(t){return t*t*t*t*t},quinticOut:function(t){return--t*t*t*t*t+1},quinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},sinusoidalIn:function(t){return 1-Math.cos(t*Math.PI/2)},sinusoidalOut:function(t){return Math.sin(t*Math.PI/2)},sinusoidalInOut:function(t){return.5*(1-Math.cos(Math.PI*t))},exponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},exponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},exponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)},circularIn:function(t){return 1-Math.sqrt(1-t*t)},circularOut:function(t){return Math.sqrt(1- --t*t)},circularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},elasticIn:function(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),-(n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i)))},elasticOut:function(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),n*Math.pow(2,-10*t)*Math.sin(2*(t-e)*Math.PI/i)+1)},elasticInOut:function(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),(t*=2)<1?-.5*n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i):n*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i)*.5+1)},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},backInOut:function(t){var e=2.5949095;return(t*=2)<1?.5*t*t*((e+1)*t-e):.5*((t-=2)*t*((e+1)*t+e)+2)},bounceIn:function(t){return 1-of.bounceOut(1-t)},bounceOut:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bounceInOut:function(t){return.5>t?.5*of.bounceIn(2*t):.5*of.bounceOut(2*t-1)+.5}};Be.prototype={constructor:Be,step:function(t,e){if(this._initialized||(this._startTime=t+this._delay,this._initialized=!0),this._paused)return void(this._pausedTime+=e);var n=(t-this._startTime-this._pausedTime)/this._life;if(!(0>n)){n=Math.min(n,1);var i=this.easing,r="string"==typeof i?of[i]:i,a="function"==typeof r?r(n):n;return this.fire("frame",a),1===n?this.loop?(this.restart(t),"restart"):(this._needsRemove=!0,"destroy"):null}},restart:function(t){var e=(t-this._startTime-this._pausedTime)%this._life;this._startTime=t-e+this.gap,this._pausedTime=0,this._needsRemove=!1},fire:function(t,e){t="on"+t,this[t]&&this[t](this._target,e)},pause:function(){this._paused=!0},resume:function(){this._paused=!1}};var sf=function(){this.head=null,this.tail=null,this._len=0},lf=sf.prototype;lf.insert=function(t){var e=new uf(t);return this.insertEntry(e),e},lf.insertEntry=function(t){this.head?(this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t):this.head=this.tail=t,this._len++},lf.remove=function(t){var e=t.prev,n=t.next;e?e.next=n:this.head=n,n?n.prev=e:this.tail=e,t.next=t.prev=null,this._len--},lf.len=function(){return this._len},lf.clear=function(){this.head=this.tail=null,this._len=0};var uf=function(t){this.value=t,this.next,this.prev},hf=function(t){this._list=new sf,this._map={},this._maxSize=t||10,this._lastRemovedEntry=null},cf=hf.prototype;cf.put=function(t,e){var n=this._list,i=this._map,r=null;if(null==i[t]){var a=n.len(),o=this._lastRemovedEntry;if(a>=this._maxSize&&a>0){var s=n.head;n.remove(s),delete i[s.key],r=s.value,this._lastRemovedEntry=s}o?o.value=e:o=new uf(e),o.key=t,n.insertEntry(o),i[t]=o}return r},cf.get=function(t){var e=this._map[t],n=this._list;return null!=e?(e!==n.tail&&(n.remove(e),n.insertEntry(e)),e.value):void 0},cf.clear=function(){this._list.clear(),this._map={}};var df={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]},ff=new hf(20),pf=null,gf=$e,vf=Ke,mf=(Object.freeze||Object)({parse:Ye,lift:Ue,toHex:Ze,fastLerp:$e,fastMapToColor:gf,lerp:Ke,mapToColor:vf,modifyHSL:Qe,modifyAlpha:Je,stringify:tn}),yf=Array.prototype.slice,xf=function(t,e,n,i){this._tracks={},this._target=t,this._loop=e||!1,this._getter=n||en,this._setter=i||nn,this._clipCount=0,this._delay=0,this._doneList=[],this._onframeList=[],this._clipList=[]};xf.prototype={when:function(t,e){var n=this._tracks;for(var i in e)if(e.hasOwnProperty(i)){if(!n[i]){n[i]=[];var r=this._getter(this._target,i);if(null==r)continue;0!==t&&n[i].push({time:0,value:cn(r)})}n[i].push({time:t,value:e[i]})}return this},during:function(t){return this._onframeList.push(t),this},pause:function(){for(var t=0;t<this._clipList.length;t++)this._clipList[t].pause();this._paused=!0},resume:function(){for(var t=0;t<this._clipList.length;t++)this._clipList[t].resume();this._paused=!1},isPaused:function(){return!!this._paused},_doneCallback:function(){this._tracks={},this._clipList.length=0;for(var t=this._doneList,e=t.length,n=0;e>n;n++)t[n].call(this)},start:function(t,e){var n,i=this,r=0,a=function(){r--,r||i._doneCallback()};for(var o in this._tracks)if(this._tracks.hasOwnProperty(o)){var s=pn(this,t,a,this._tracks[o],o,e);s&&(this._clipList.push(s),r++,this.animation&&this.animation.addClip(s),n=s)}if(n){var l=n.onframe;n.onframe=function(t,e){l(t,e);for(var n=0;n<i._onframeList.length;n++)i._onframeList[n](t,e)}}return r||this._doneCallback(),this},stop:function(t){for(var e=this._clipList,n=this.animation,i=0;i<e.length;i++){var r=e[i];t&&r.onframe(this._target,1),n&&n.removeClip(r)}e.length=0},delay:function(t){return this._delay=t,this},done:function(t){return t&&this._doneList.push(t),this},getClips:function(){return this._clipList}};var _f=1;"undefined"!=typeof window&&(_f=Math.max(window.devicePixelRatio||1,1));var wf=0,bf=_f,Sf=function(){};1===wf?Sf=function(){for(var t in arguments)throw new Error(arguments[t])}:wf>1&&(Sf=function(){for(var t in arguments)console.log(arguments[t])});var Mf=Sf,Tf=function(){this.animators=[]};Tf.prototype={constructor:Tf,animate:function(t,e){var n,i=!1,r=this,a=this.__zr;if(t){var o=t.split("."),s=r;i="shape"===o[0];for(var l=0,h=o.length;h>l;l++)s&&(s=s[o[l]]);s&&(n=s)}else n=r;if(!n)return void Mf('Property "'+t+'" is not existed in element '+r.id);var c=r.animators,d=new xf(n,e);return d.during(function(){r.dirty(i)}).done(function(){c.splice(u(c,d),1)}),c.push(d),a&&a.animation.addAnimator(d),d},stopAnimation:function(t){for(var e=this.animators,n=e.length,i=0;n>i;i++)e[i].stop(t);return e.length=0,this},animateTo:function(t,e,n,i,r,a){gn(this,t,e,n,i,r,a)},animateFrom:function(t,e,n,i,r,a){gn(this,t,e,n,i,r,a,!0)}};var If=function(t){tf.call(this,t),Wd.call(this,t),Tf.call(this,t),this.id=t.id||md()};If.prototype={type:"element",name:"",__zr:null,ignore:!1,clipPath:null,isGroup:!1,drift:function(t,e){switch(this.draggable){case"horizontal":e=0;break;case"vertical":t=0}var n=this.transform;n||(n=this.transform=[1,0,0,1,0,0]),n[4]+=t,n[5]+=e,this.decomposeTransform(),this.dirty(!1)},beforeUpdate:function(){},afterUpdate:function(){},update:function(){this.updateTransform()},traverse:function(){},attrKV:function(t,e){if("position"===t||"scale"===t||"origin"===t){if(e){var n=this[t];n||(n=this[t]=[]),n[0]=e[0],n[1]=e[1]}}else this[t]=e},hide:function(){this.ignore=!0,this.__zr&&this.__zr.refresh()},show:function(){this.ignore=!1,this.__zr&&this.__zr.refresh()},attr:function(t,e){if("string"==typeof t)this.attrKV(t,e);else if(S(t))for(var n in t)t.hasOwnProperty(n)&&this.attrKV(n,t[n]);return this.dirty(!1),this},setClipPath:function(t){var e=this.__zr;e&&t.addSelfToZr(e),this.clipPath&&this.clipPath!==t&&this.removeClipPath(),this.clipPath=t,t.__zr=e,t.__clipTarget=this,this.dirty(!1)},removeClipPath:function(){var t=this.clipPath;t&&(t.__zr&&t.removeSelfFromZr(t.__zr),t.__zr=null,t.__clipTarget=null,this.clipPath=null,this.dirty(!1))},addSelfToZr:function(t){this.__zr=t;var e=this.animators;if(e)for(var n=0;n<e.length;n++)t.animation.addAnimator(e[n]);this.clipPath&&this.clipPath.addSelfToZr(t)},removeSelfFromZr:function(t){this.__zr=null;var e=this.animators;if(e)for(var n=0;n<e.length;n++)t.animation.removeAnimator(e[n]);this.clipPath&&this.clipPath.removeSelfFromZr(t)}},c(If,Tf),c(If,tf),c(If,Wd);var Cf=ae,Df=Math.min,kf=Math.max;yn.prototype={constructor:yn,union:function(t){var e=Df(t.x,this.x),n=Df(t.y,this.y);this.width=kf(t.x+t.width,this.x+this.width)-e,this.height=kf(t.y+t.height,this.y+this.height)-n,this.x=e,this.y=n},applyTransform:function(){var t=[],e=[],n=[],i=[];return function(r){if(r){t[0]=n[0]=this.x,t[1]=i[1]=this.y,e[0]=i[0]=this.x+this.width,e[1]=n[1]=this.y+this.height,Cf(t,t,r),Cf(e,e,r),Cf(n,n,r),Cf(i,i,r),this.x=Df(t[0],e[0],n[0],i[0]),this.y=Df(t[1],e[1],n[1],i[1]);var a=kf(t[0],e[0],n[0],i[0]),o=kf(t[1],e[1],n[1],i[1]);this.width=a-this.x,this.height=o-this.y}}}(),calculateTransform:function(t){var e=this,n=t.width/e.width,i=t.height/e.height,r=Me();return De(r,r,[-e.x,-e.y]),Ae(r,r,[n,i]),De(r,r,[t.x,t.y]),r},intersect:function(t){if(!t)return!1;t instanceof yn||(t=yn.create(t));var e=this,n=e.x,i=e.x+e.width,r=e.y,a=e.y+e.height,o=t.x,s=t.x+t.width,l=t.y,u=t.y+t.height;return!(o>i||n>s||l>a||r>u)},contain:function(t,e){var n=this;return t>=n.x&&t<=n.x+n.width&&e>=n.y&&e<=n.y+n.height},clone:function(){return new yn(this.x,this.y,this.width,this.height)},copy:function(t){this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height},plain:function(){return{x:this.x,y:this.y,width:this.width,height:this.height}}},yn.create=function(t){return new yn(t.x,t.y,t.width,t.height)};var Af=function(t){t=t||{},If.call(this,t);for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);this._children=[],this.__storage=null,this.__dirty=!0};Af.prototype={constructor:Af,isGroup:!0,type:"group",silent:!1,children:function(){return this._children.slice()},childAt:function(t){return this._children[t]},childOfName:function(t){for(var e=this._children,n=0;n<e.length;n++)if(e[n].name===t)return e[n]},childCount:function(){return this._children.length},add:function(t){return t&&t!==this&&t.parent!==this&&(this._children.push(t),this._doAdd(t)),this},addBefore:function(t,e){if(t&&t!==this&&t.parent!==this&&e&&e.parent===this){var n=this._children,i=n.indexOf(e);i>=0&&(n.splice(i,0,t),this._doAdd(t))}return this},_doAdd:function(t){t.parent&&t.parent.remove(t),t.parent=this;var e=this.__storage,n=this.__zr;e&&e!==t.__storage&&(e.addToStorage(t),t instanceof Af&&t.addChildrenToStorage(e)),n&&n.refresh()},remove:function(t){var e=this.__zr,n=this.__storage,i=this._children,r=u(i,t);return 0>r?this:(i.splice(r,1),t.parent=null,n&&(n.delFromStorage(t),t instanceof Af&&t.delChildrenFromStorage(n)),e&&e.refresh(),this)},removeAll:function(){var t,e,n=this._children,i=this.__storage;for(e=0;e<n.length;e++)t=n[e],i&&(i.delFromStorage(t),t instanceof Af&&t.delChildrenFromStorage(i)),t.parent=null;return n.length=0,this},eachChild:function(t,e){for(var n=this._children,i=0;i<n.length;i++){var r=n[i];t.call(e,r,i)}return this},traverse:function(t,e){for(var n=0;n<this._children.length;n++){var i=this._children[n];t.call(e,i),"group"===i.type&&i.traverse(t,e)}return this},addChildrenToStorage:function(t){for(var e=0;e<this._children.length;e++){var n=this._children[e];t.addToStorage(n),n instanceof Af&&n.addChildrenToStorage(t)}},delChildrenFromStorage:function(t){for(var e=0;e<this._children.length;e++){var n=this._children[e];t.delFromStorage(n),n instanceof Af&&n.delChildrenFromStorage(t)}},dirty:function(){return this.__dirty=!0,this.__zr&&this.__zr.refresh(),this},getBoundingRect:function(t){for(var e=null,n=new yn(0,0,0,0),i=t||this._children,r=[],a=0;a<i.length;a++){var o=i[a];if(!o.ignore&&!o.invisible){var s=o.getBoundingRect(),l=o.getLocalTransform(r);l?(n.copy(s),n.applyTransform(l),e=e||n.clone(),e.union(n)):(e=e||s.clone(),e.union(s))}}return e||n}},h(Af,If);var Pf=32,Lf=7,Of=function(){this._roots=[],this._displayList=[],this._displayListLen=0};Of.prototype={constructor:Of,traverse:function(t,e){for(var n=0;n<this._roots.length;n++)this._roots[n].traverse(t,e)},getDisplayList:function(t,e){return e=e||!1,t&&this.updateDisplayList(e),this._displayList},updateDisplayList:function(t){this._displayListLen=0;for(var e=this._roots,n=this._displayList,i=0,r=e.length;r>i;i++)this._updateAndAddDisplayable(e[i],null,t);n.length=this._displayListLen,xd.canvasSupported&&In(n,Cn)},_updateAndAddDisplayable:function(t,e,n){if(!t.ignore||n){t.beforeUpdate(),t.__dirty&&t.update(),t.afterUpdate();var i=t.clipPath;if(i){e=e?e.slice():[];for(var r=i,a=t;r;)r.parent=a,r.updateTransform(),e.push(r),a=r,r=r.clipPath}if(t.isGroup){for(var o=t._children,s=0;s<o.length;s++){var l=o[s];t.__dirty&&(l.__dirty=!0),this._updateAndAddDisplayable(l,e,n)}t.__dirty=!1}else t.__clipPaths=e,this._displayList[this._displayListLen++]=t}},addRoot:function(t){t.__storage!==this&&(t instanceof Af&&t.addChildrenToStorage(this),this.addToStorage(t),this._roots.push(t))},delRoot:function(t){if(null==t){for(var e=0;e<this._roots.length;e++){var n=this._roots[e];n instanceof Af&&n.delChildrenFromStorage(this)}return this._roots=[],this._displayList=[],void(this._displayListLen=0)}if(t instanceof Array)for(var e=0,i=t.length;i>e;e++)this.delRoot(t[e]);else{var r=u(this._roots,t);r>=0&&(this.delFromStorage(t),this._roots.splice(r,1),t instanceof Af&&t.delChildrenFromStorage(this))}},addToStorage:function(t){return t&&(t.__storage=this,t.dirty(!1)),this},delFromStorage:function(t){return t&&(t.__storage=null),this},dispose:function(){this._renderList=this._roots=null},displayableSortFunc:Cn};var Bf={shadowBlur:1,shadowOffsetX:1,shadowOffsetY:1,textShadowBlur:1,textShadowOffsetX:1,textShadowOffsetY:1,textBoxShadowBlur:1,textBoxShadowOffsetX:1,textBoxShadowOffsetY:1},Ef=function(t,e,n){return Bf.hasOwnProperty(e)?n*=t.dpr:n},zf={NONE:0,STYLE_BIND:1,PLAIN_TEXT:2},Rf=9,Ff=[["shadowBlur",0],["shadowOffsetX",0],["shadowOffsetY",0],["shadowColor","#000"],["lineCap","butt"],["lineJoin","miter"],["miterLimit",10]],Nf=function(t){this.extendFrom(t,!1)};Nf.prototype={constructor:Nf,fill:"#000",stroke:null,opacity:1,fillOpacity:null,strokeOpacity:null,lineDash:null,lineDashOffset:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,lineWidth:1,strokeNoScale:!1,text:null,font:null,textFont:null,fontStyle:null,fontWeight:null,fontSize:null,fontFamily:null,textTag:null,textFill:"#000",textStroke:null,textWidth:null,textHeight:null,textStrokeWidth:0,textLineHeight:null,textPosition:"inside",textRect:null,textOffset:null,textAlign:null,textVerticalAlign:null,textDistance:5,textShadowColor:"transparent",textShadowBlur:0,textShadowOffsetX:0,textShadowOffsetY:0,textBoxShadowColor:"transparent",textBoxShadowBlur:0,textBoxShadowOffsetX:0,textBoxShadowOffsetY:0,transformText:!1,textRotation:0,textOrigin:null,textBackgroundColor:null,textBorderColor:null,textBorderWidth:0,textBorderRadius:0,textPadding:null,rich:null,truncate:null,blend:null,bind:function(t,e,n){var i=this,r=n&&n.style,a=!r||t.__attrCachedBy!==zf.STYLE_BIND;t.__attrCachedBy=zf.STYLE_BIND;for(var o=0;o<Ff.length;o++){var s=Ff[o],l=s[0];(a||i[l]!==r[l])&&(t[l]=Ef(t,l,i[l]||s[1]))}if((a||i.fill!==r.fill)&&(t.fillStyle=i.fill),(a||i.stroke!==r.stroke)&&(t.strokeStyle=i.stroke),(a||i.opacity!==r.opacity)&&(t.globalAlpha=null==i.opacity?1:i.opacity),(a||i.blend!==r.blend)&&(t.globalCompositeOperation=i.blend||"source-over"),this.hasStroke()){var u=i.lineWidth;t.lineWidth=u/(this.strokeNoScale&&e&&e.getLineScale?e.getLineScale():1)}},hasFill:function(){var t=this.fill;return null!=t&&"none"!==t},hasStroke:function(){var t=this.stroke;return null!=t&&"none"!==t&&this.lineWidth>0},extendFrom:function(t,e){if(t)for(var n in t)!t.hasOwnProperty(n)||e!==!0&&(e===!1?this.hasOwnProperty(n):null==t[n])||(this[n]=t[n])},set:function(t,e){"string"==typeof t?this[t]=e:this.extendFrom(t,!0)},clone:function(){var t=new this.constructor;return t.extendFrom(this,!0),t},getGradient:function(t,e,n){for(var i="radial"===e.type?kn:Dn,r=i(t,e,n),a=e.colorStops,o=0;o<a.length;o++)r.addColorStop(a[o].offset,a[o].color);return r}};for(var Hf=Nf.prototype,Wf=0;Wf<Ff.length;Wf++){var Vf=Ff[Wf];Vf[0]in Hf||(Hf[Vf[0]]=Vf[1])}Nf.getGradient=Hf.getGradient;
var Gf=function(t,e){this.image=t,this.repeat=e,this.type="pattern"};Gf.prototype.getCanvasPattern=function(t){return t.createPattern(this.image,this.repeat||"repeat")};var Xf=function(t,e,n){var i;n=n||bf,"string"==typeof t?i=Pn(t,e,n):S(t)&&(i=t,t=i.id),this.id=t,this.dom=i;var r=i.style;r&&(i.onselectstart=An,r["-webkit-user-select"]="none",r["user-select"]="none",r["-webkit-touch-callout"]="none",r["-webkit-tap-highlight-color"]="rgba(0,0,0,0)",r.padding=0,r.margin=0,r["border-width"]=0),this.domBack=null,this.ctxBack=null,this.painter=e,this.config=null,this.clearColor=0,this.motionBlur=!1,this.lastFrameAlpha=.7,this.dpr=n};Xf.prototype={constructor:Xf,__dirty:!0,__used:!1,__drawIndex:0,__startIndex:0,__endIndex:0,incremental:!1,getElementCount:function(){return this.__endIndex-this.__startIndex},initContext:function(){this.ctx=this.dom.getContext("2d"),this.ctx.dpr=this.dpr},createBackBuffer:function(){var t=this.dpr;this.domBack=Pn("back-"+this.id,this.painter,t),this.ctxBack=this.domBack.getContext("2d"),1!==t&&this.ctxBack.scale(t,t)},resize:function(t,e){var n=this.dpr,i=this.dom,r=i.style,a=this.domBack;r&&(r.width=t+"px",r.height=e+"px"),i.width=t*n,i.height=e*n,a&&(a.width=t*n,a.height=e*n,1!==n&&this.ctxBack.scale(n,n))},clear:function(t,e){var n=this.dom,i=this.ctx,r=n.width,a=n.height,e=e||this.clearColor,o=this.motionBlur&&!t,s=this.lastFrameAlpha,l=this.dpr;if(o&&(this.domBack||this.createBackBuffer(),this.ctxBack.globalCompositeOperation="copy",this.ctxBack.drawImage(n,0,0,r/l,a/l)),i.clearRect(0,0,r,a),e&&"transparent"!==e){var u;e.colorStops?(u=e.__canvasGradient||Nf.getGradient(i,e,{x:0,y:0,width:r,height:a}),e.__canvasGradient=u):e.image&&(u=Gf.prototype.getCanvasPattern.call(e,i)),i.save(),i.fillStyle=u||e,i.fillRect(0,0,r,a),i.restore()}if(o){var h=this.domBack;i.save(),i.globalAlpha=s,i.drawImage(h,0,0,r,a),i.restore()}}};var Yf="undefined"!=typeof window&&(window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.msRequestAnimationFrame&&window.msRequestAnimationFrame.bind(window)||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame)||function(t){setTimeout(t,16)},jf=new hf(50),qf={},Uf=0,Zf=5e3,$f=/\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,Kf="12px sans-serif",Qf={};Qf.measureText=function(t,e){var n=l();return n.font=e||Kf,n.measureText(t)};var Jf=Kf,tp={left:1,right:1,center:1},ep={top:1,bottom:1,middle:1},np=[["textShadowBlur","shadowBlur",0],["textShadowOffsetX","shadowOffsetX",0],["textShadowOffsetY","shadowOffsetY",0],["textShadowColor","shadowColor","transparent"]],ip=new yn,rp=function(){};rp.prototype={constructor:rp,drawRectText:function(t,e){var n=this.style;e=n.textRect||e,this.__dirty&&ti(n,!0);var i=n.text;if(null!=i&&(i+=""),mi(i,n)){t.save();var r=this.transform;n.transformText?this.setTransform(t):r&&(ip.copy(e),ip.applyTransform(r),e=ip),ni(this,t,i,n,e,Rf),t.restore()}}},yi.prototype={constructor:yi,type:"displayable",__dirty:!0,invisible:!1,z:0,z2:0,zlevel:0,draggable:!1,dragging:!1,silent:!1,culling:!1,cursor:"pointer",rectHover:!1,progressive:!1,incremental:!1,globalScaleRatio:1,beforeBrush:function(){},afterBrush:function(){},brush:function(){},getBoundingRect:function(){},contain:function(t,e){return this.rectContain(t,e)},traverse:function(t,e){t.call(e,this)},rectContain:function(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect();return i.contain(n[0],n[1])},dirty:function(){this.__dirty=this.__dirtyText=!0,this._rect=null,this.__zr&&this.__zr.refresh()},animateStyle:function(t){return this.animate("style",t)},attrKV:function(t,e){"style"!==t?If.prototype.attrKV.call(this,t,e):this.style.set(e)},setStyle:function(t,e){return this.style.set(t,e),this.dirty(!1),this},useStyle:function(t){return this.style=new Nf(t,this),this.dirty(!1),this}},h(yi,If),c(yi,rp),xi.prototype={constructor:xi,type:"image",brush:function(t,e){var n=this.style,i=n.image;n.bind(t,this,e);var r=this._image=On(i,this._image,this,this.onload);if(r&&En(r)){var a=n.x||0,o=n.y||0,s=n.width,l=n.height,u=r.width/r.height;if(null==s&&null!=l?s=l*u:null==l&&null!=s?l=s/u:null==s&&null==l&&(s=r.width,l=r.height),this.setTransform(t),n.sWidth&&n.sHeight){var h=n.sx||0,c=n.sy||0;t.drawImage(r,h,c,n.sWidth,n.sHeight,a,o,s,l)}else if(n.sx&&n.sy){var h=n.sx,c=n.sy,d=s-h,f=l-c;t.drawImage(r,h,c,d,f,a,o,s,l)}else t.drawImage(r,a,o,s,l);null!=n.text&&(this.restoreTransform(t),this.drawRectText(t,this.getBoundingRect()))}},getBoundingRect:function(){var t=this.style;return this._rect||(this._rect=new yn(t.x||0,t.y||0,t.width||0,t.height||0)),this._rect}},h(xi,yi);var ap=1e5,op=314159,sp=.01,lp=.001,up=new yn(0,0,0,0),hp=new yn(0,0,0,0),cp=function(t,e,n){this.type="canvas";var i=!t.nodeName||"CANVAS"===t.nodeName.toUpperCase();this._opts=n=o({},n||{}),this.dpr=n.devicePixelRatio||bf,this._singleCanvas=i,this.root=t;var r=t.style;r&&(r["-webkit-tap-highlight-color"]="transparent",r["-webkit-user-select"]=r["user-select"]=r["-webkit-touch-callout"]="none",t.innerHTML=""),this.storage=e;var a=this._zlevelList=[],s=this._layers={};if(this._layerConfig={},this._needsManuallyCompositing=!1,i){var l=t.width,u=t.height;null!=n.width&&(l=n.width),null!=n.height&&(u=n.height),this.dpr=n.devicePixelRatio||1,t.width=l*this.dpr,t.height=u*this.dpr,this._width=l,this._height=u;var h=new Xf(t,this,this.dpr);h.__builtin__=!0,h.initContext(),s[op]=h,h.zlevel=op,a.push(op),this._domRoot=t}else{this._width=this._getSize(0),this._height=this._getSize(1);var c=this._domRoot=Ti(this._width,this._height);t.appendChild(c)}this._hoverlayer=null,this._hoverElements=[]};cp.prototype={constructor:cp,getType:function(){return"canvas"},isSingleCanvas:function(){return this._singleCanvas},getViewportRoot:function(){return this._domRoot},getViewportRootOffset:function(){var t=this.getViewportRoot();return t?{offsetLeft:t.offsetLeft||0,offsetTop:t.offsetTop||0}:void 0},refresh:function(t){var e=this.storage.getDisplayList(!0),n=this._zlevelList;this._redrawId=Math.random(),this._paintList(e,t,this._redrawId);for(var i=0;i<n.length;i++){var r=n[i],a=this._layers[r];if(!a.__builtin__&&a.refresh){var o=0===i?this._backgroundColor:null;a.refresh(o)}}return this.refreshHover(),this},addHover:function(t,e){if(!t.__hoverMir){var n=new t.constructor({style:t.style,shape:t.shape,z:t.z,z2:t.z2,silent:t.silent});return n.__from=t,t.__hoverMir=n,e&&n.setStyle(e),this._hoverElements.push(n),n}},removeHover:function(t){var e=t.__hoverMir,n=this._hoverElements,i=u(n,e);i>=0&&n.splice(i,1),t.__hoverMir=null},clearHover:function(){for(var t=this._hoverElements,e=0;e<t.length;e++){var n=t[e].__from;n&&(n.__hoverMir=null)}t.length=0},refreshHover:function(){var t=this._hoverElements,e=t.length,n=this._hoverlayer;if(n&&n.clear(),e){In(t,this.storage.displayableSortFunc),n||(n=this._hoverlayer=this.getLayer(ap));var i={};n.ctx.save();for(var r=0;e>r;){var a=t[r],o=a.__from;o&&o.__zr?(r++,o.invisible||(a.transform=o.transform,a.invTransform=o.invTransform,a.__clipPaths=o.__clipPaths,this._doPaintEl(a,n,!0,i))):(t.splice(r,1),o.__hoverMir=null,e--)}n.ctx.restore()}},getHoverLayer:function(){return this.getLayer(ap)},_paintList:function(t,e,n){if(this._redrawId===n){e=e||!1,this._updateLayerStatus(t);var i=this._doPaintList(t,e);if(this._needsManuallyCompositing&&this._compositeManually(),!i){var r=this;Yf(function(){r._paintList(t,e,n)})}}},_compositeManually:function(){var t=this.getLayer(op).ctx,e=this._domRoot.width,n=this._domRoot.height;t.clearRect(0,0,e,n),this.eachBuiltinLayer(function(i){i.virtual&&t.drawImage(i.dom,0,0,e,n)})},_doPaintList:function(t,e){for(var n=[],i=0;i<this._zlevelList.length;i++){var r=this._zlevelList[i],a=this._layers[r];a.__builtin__&&a!==this._hoverlayer&&(a.__dirty||e)&&n.push(a)}for(var o=!0,s=0;s<n.length;s++){var a=n[s],l=a.ctx,u={};l.save();var h=e?a.__startIndex:a.__drawIndex,c=!e&&a.incremental&&Date.now,d=c&&Date.now(),p=a.zlevel===this._zlevelList[0]?this._backgroundColor:null;if(a.__startIndex===a.__endIndex)a.clear(!1,p);else if(h===a.__startIndex){var g=t[h];g.incremental&&g.notClear&&!e||a.clear(!1,p)}-1===h&&(console.error("For some unknown reason. drawIndex is -1"),h=a.__startIndex);for(var v=h;v<a.__endIndex;v++){var m=t[v];if(this._doPaintEl(m,a,e,u),m.__dirty=m.__dirtyText=!1,c){var y=Date.now()-d;if(y>15)break}}a.__drawIndex=v,a.__drawIndex<a.__endIndex&&(o=!1),u.prevElClipPaths&&l.restore(),l.restore()}return xd.wxa&&f(this._layers,function(t){t&&t.ctx&&t.ctx.draw&&t.ctx.draw()}),o},_doPaintEl:function(t,e,n,i){var r=e.ctx,a=t.transform;if(!(!e.__dirty&&!n||t.invisible||0===t.style.opacity||a&&!a[0]&&!a[3]||t.culling&&bi(t,this._width,this._height))){var o=t.__clipPaths;(!i.prevElClipPaths||Si(o,i.prevElClipPaths))&&(i.prevElClipPaths&&(e.ctx.restore(),i.prevElClipPaths=null,i.prevEl=null),o&&(r.save(),Mi(o,r),i.prevElClipPaths=o)),t.beforeBrush&&t.beforeBrush(r),t.brush(r,i.prevEl||null),i.prevEl=t,t.afterBrush&&t.afterBrush(r)}},getLayer:function(t,e){this._singleCanvas&&!this._needsManuallyCompositing&&(t=op);var n=this._layers[t];return n||(n=new Xf("zr_"+t,this,this.dpr),n.zlevel=t,n.__builtin__=!0,this._layerConfig[t]&&r(n,this._layerConfig[t],!0),e&&(n.virtual=e),this.insertLayer(t,n),n.initContext()),n},insertLayer:function(t,e){var n=this._layers,i=this._zlevelList,r=i.length,a=null,o=-1,s=this._domRoot;if(n[t])return void Mf("ZLevel "+t+" has been used already");if(!wi(e))return void Mf("Layer of zlevel "+t+" is not valid");if(r>0&&t>i[0]){for(o=0;r-1>o&&!(i[o]<t&&i[o+1]>t);o++);a=n[i[o]]}if(i.splice(o+1,0,t),n[t]=e,!e.virtual)if(a){var l=a.dom;l.nextSibling?s.insertBefore(e.dom,l.nextSibling):s.appendChild(e.dom)}else s.firstChild?s.insertBefore(e.dom,s.firstChild):s.appendChild(e.dom)},eachLayer:function(t,e){var n,i,r=this._zlevelList;for(i=0;i<r.length;i++)n=r[i],t.call(e,this._layers[n],n)},eachBuiltinLayer:function(t,e){var n,i,r,a=this._zlevelList;for(r=0;r<a.length;r++)i=a[r],n=this._layers[i],n.__builtin__&&t.call(e,n,i)},eachOtherLayer:function(t,e){var n,i,r,a=this._zlevelList;for(r=0;r<a.length;r++)i=a[r],n=this._layers[i],n.__builtin__||t.call(e,n,i)},getLayers:function(){return this._layers},_updateLayerStatus:function(t){function e(t){r&&(r.__endIndex!==t&&(r.__dirty=!0),r.__endIndex=t)}if(this.eachBuiltinLayer(function(t){t.__dirty=t.__used=!1}),this._singleCanvas)for(var n=1;n<t.length;n++){var i=t[n];if(i.zlevel!==t[n-1].zlevel||i.incremental){this._needsManuallyCompositing=!0;break}}for(var r=null,a=0,n=0;n<t.length;n++){var o,i=t[n],s=i.zlevel;i.incremental?(o=this.getLayer(s+lp,this._needsManuallyCompositing),o.incremental=!0,a=1):o=this.getLayer(s+(a>0?sp:0),this._needsManuallyCompositing),o.__builtin__||Mf("ZLevel "+s+" has been used by unkown layer "+o.id),o!==r&&(o.__used=!0,o.__startIndex!==n&&(o.__dirty=!0),o.__startIndex=n,o.__drawIndex=o.incremental?-1:n,e(n),r=o),i.__dirty&&(o.__dirty=!0,o.incremental&&o.__drawIndex<0&&(o.__drawIndex=n))}e(n),this.eachBuiltinLayer(function(t){!t.__used&&t.getElementCount()>0&&(t.__dirty=!0,t.__startIndex=t.__endIndex=t.__drawIndex=0),t.__dirty&&t.__drawIndex<0&&(t.__drawIndex=t.__startIndex)})},clear:function(){return this.eachBuiltinLayer(this._clearLayer),this},_clearLayer:function(t){t.clear()},setBackgroundColor:function(t){this._backgroundColor=t},configLayer:function(t,e){if(e){var n=this._layerConfig;n[t]?r(n[t],e,!0):n[t]=e;for(var i=0;i<this._zlevelList.length;i++){var a=this._zlevelList[i];if(a===t||a===t+sp){var o=this._layers[a];r(o,n[t],!0)}}}},delLayer:function(t){var e=this._layers,n=this._zlevelList,i=e[t];i&&(i.dom.parentNode.removeChild(i.dom),delete e[t],n.splice(u(n,t),1))},resize:function(t,e){if(this._domRoot.style){var n=this._domRoot;n.style.display="none";var i=this._opts;if(null!=t&&(i.width=t),null!=e&&(i.height=e),t=this._getSize(0),e=this._getSize(1),n.style.display="",this._width!==t||e!==this._height){n.style.width=t+"px",n.style.height=e+"px";for(var r in this._layers)this._layers.hasOwnProperty(r)&&this._layers[r].resize(t,e);f(this._progressiveLayers,function(n){n.resize(t,e)}),this.refresh(!0)}this._width=t,this._height=e}else{if(null==t||null==e)return;this._width=t,this._height=e,this.getLayer(op).resize(t,e)}return this},clearLayer:function(t){var e=this._layers[t];e&&e.clear()},dispose:function(){this.root.innerHTML="",this.root=this.storage=this._domRoot=this._layers=null},getRenderedCanvas:function(t){if(t=t||{},this._singleCanvas&&!this._compositeManually)return this._layers[op].dom;var e=new Xf("image",this,t.pixelRatio||this.dpr);if(e.initContext(),e.clear(!1,t.backgroundColor||this._backgroundColor),t.pixelRatio<=this.dpr){this.refresh();var n=e.dom.width,i=e.dom.height,r=e.ctx;this.eachLayer(function(t){t.__builtin__?r.drawImage(t.dom,0,0,n,i):t.renderToCanvas&&(e.ctx.save(),t.renderToCanvas(e.ctx),e.ctx.restore())})}else for(var a={},o=this.storage.getDisplayList(!0),s=0;s<o.length;s++){var l=o[s];this._doPaintEl(l,e,!0,a)}return e.dom},getWidth:function(){return this._width},getHeight:function(){return this._height},_getSize:function(t){var e=this._opts,n=["width","height"][t],i=["clientWidth","clientHeight"][t],r=["paddingLeft","paddingTop"][t],a=["paddingRight","paddingBottom"][t];if(null!=e[n]&&"auto"!==e[n])return parseFloat(e[n]);var o=this.root,s=document.defaultView.getComputedStyle(o);return(o[i]||_i(s[n])||_i(o.style[n]))-(_i(s[r])||0)-(_i(s[a])||0)|0},pathToImage:function(t,e){e=e||this.dpr;var n=document.createElement("canvas"),i=n.getContext("2d"),r=t.getBoundingRect(),a=t.style,o=a.shadowBlur*e,s=a.shadowOffsetX*e,l=a.shadowOffsetY*e,u=a.hasStroke()?a.lineWidth:0,h=Math.max(u/2,-s+o),c=Math.max(u/2,s+o),d=Math.max(u/2,-l+o),f=Math.max(u/2,l+o),p=r.width+h+c,g=r.height+d+f;n.width=p*e,n.height=g*e,i.scale(e,e),i.clearRect(0,0,p,g),i.dpr=e;var v={position:t.position,rotation:t.rotation,scale:t.scale};t.position=[h-r.x,d-r.y],t.rotation=0,t.scale=[1,1],t.updateTransform(),t&&t.brush(i);var m=xi,y=new m({style:{x:0,y:0,image:n}});return null!=v.position&&(y.position=t.position=v.position),null!=v.rotation&&(y.rotation=t.rotation=v.rotation),null!=v.scale&&(y.scale=t.scale=v.scale),y}};var dp=function(t){t=t||{},this.stage=t.stage||{},this.onframe=t.onframe||function(){},this._clips=[],this._running=!1,this._time,this._pausedTime,this._pauseStart,this._paused=!1,Wd.call(this)};dp.prototype={constructor:dp,addClip:function(t){this._clips.push(t)},addAnimator:function(t){t.animation=this;for(var e=t.getClips(),n=0;n<e.length;n++)this.addClip(e[n])},removeClip:function(t){var e=u(this._clips,t);e>=0&&this._clips.splice(e,1)},removeAnimator:function(t){for(var e=t.getClips(),n=0;n<e.length;n++)this.removeClip(e[n]);t.animation=null},_update:function(){for(var t=(new Date).getTime()-this._pausedTime,e=t-this._time,n=this._clips,i=n.length,r=[],a=[],o=0;i>o;o++){var s=n[o],l=s.step(t,e);l&&(r.push(l),a.push(s))}for(var o=0;i>o;)n[o]._needsRemove?(n[o]=n[i-1],n.pop(),i--):o++;i=r.length;for(var o=0;i>o;o++)a[o].fire(r[o]);this._time=t,this.onframe(e),this.trigger("frame",e),this.stage.update&&this.stage.update()},_startLoop:function(){function t(){e._running&&(Yf(t),!e._paused&&e._update())}var e=this;this._running=!0,Yf(t)},start:function(){this._time=(new Date).getTime(),this._pausedTime=0,this._startLoop()},stop:function(){this._running=!1},pause:function(){this._paused||(this._pauseStart=(new Date).getTime(),this._paused=!0)},resume:function(){this._paused&&(this._pausedTime+=(new Date).getTime()-this._pauseStart,this._paused=!1)},clear:function(){this._clips=[]},isFinished:function(){return!this._clips.length},animate:function(t,e){e=e||{};var n=new xf(t,e.loop,e.getter,e.setter);return this.addAnimator(n),n}},c(dp,Wd);var fp=300,pp=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],gp=["touchstart","touchend","touchmove"],vp={pointerdown:1,pointerup:1,pointermove:1,pointerout:1},mp=p(pp,function(t){var e=t.replace("mouse","pointer");return vp[e]?e:t}),yp={mousemove:function(t){t=ge(this.dom,t),this.trigger("mousemove",t)},mouseout:function(t){t=ge(this.dom,t);var e=t.toElement||t.relatedTarget;if(e!==this.dom)for(;e&&9!==e.nodeType;){if(e===this.dom)return;e=e.parentNode}this.trigger("mouseout",t)},touchstart:function(t){t=ge(this.dom,t),t.zrByTouch=!0,this._lastTouchMoment=new Date,this.handler.processGesture(this,t,"start"),yp.mousemove.call(this,t),yp.mousedown.call(this,t),Ci(this)},touchmove:function(t){t=ge(this.dom,t),t.zrByTouch=!0,this.handler.processGesture(this,t,"change"),yp.mousemove.call(this,t),Ci(this)},touchend:function(t){t=ge(this.dom,t),t.zrByTouch=!0,this.handler.processGesture(this,t,"end"),yp.mouseup.call(this,t),+new Date-this._lastTouchMoment<fp&&yp.click.call(this,t),Ci(this)},pointerdown:function(t){yp.mousedown.call(this,t)},pointermove:function(t){Di(t)||yp.mousemove.call(this,t)},pointerup:function(t){yp.mouseup.call(this,t)},pointerout:function(t){Di(t)||yp.mouseout.call(this,t)}};f(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(t){yp[t]=function(e){e=ge(this.dom,e),this.trigger(t,e)}});var xp=Ai.prototype;xp.dispose=function(){for(var t=pp.concat(gp),e=0;e<t.length;e++){var n=t[e];me(this.dom,Ii(n),this._handlers[n])}},xp.setCursor=function(t){this.dom.style&&(this.dom.style.cursor=t||"default")},c(Ai,Wd);var _p=!xd.canvasSupported,wp={canvas:cp},bp={},Sp="4.0.6",Mp=function(t,e,n){n=n||{},this.dom=e,this.id=t;var i=this,r=new Of,a=n.renderer;if(_p){if(!wp.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");a="vml"}else a&&wp[a]||(a="canvas");var o=new wp[a](e,r,n,t);this.storage=r,this.painter=o;var s=xd.node||xd.worker?null:new Ai(o.getViewportRoot());this.handler=new Zd(r,o,s,o.root),this.animation=new dp({stage:{update:y(this.flush,this)}}),this.animation.start(),this._needsRefresh;var l=r.delFromStorage,u=r.addToStorage;r.delFromStorage=function(t){l.call(r,t),t&&t.removeSelfFromZr(i)},r.addToStorage=function(t){u.call(r,t),t.addSelfToZr(i)}};Mp.prototype={constructor:Mp,getId:function(){return this.id},add:function(t){this.storage.addRoot(t),this._needsRefresh=!0},remove:function(t){this.storage.delRoot(t),this._needsRefresh=!0},configLayer:function(t,e){this.painter.configLayer&&this.painter.configLayer(t,e),this._needsRefresh=!0},setBackgroundColor:function(t){this.painter.setBackgroundColor&&this.painter.setBackgroundColor(t),this._needsRefresh=!0},refreshImmediately:function(){this._needsRefresh=!1,this.painter.refresh(),this._needsRefresh=!1},refresh:function(){this._needsRefresh=!0},flush:function(){var t;this._needsRefresh&&(t=!0,this.refreshImmediately()),this._needsRefreshHover&&(t=!0,this.refreshHoverImmediately()),t&&this.trigger("rendered")},addHover:function(t,e){if(this.painter.addHover){var n=this.painter.addHover(t,e);return this.refreshHover(),n}},removeHover:function(t){this.painter.removeHover&&(this.painter.removeHover(t),this.refreshHover())},clearHover:function(){this.painter.clearHover&&(this.painter.clearHover(),this.refreshHover())},refreshHover:function(){this._needsRefreshHover=!0},refreshHoverImmediately:function(){this._needsRefreshHover=!1,this.painter.refreshHover&&this.painter.refreshHover()},resize:function(t){t=t||{},this.painter.resize(t.width,t.height),this.handler.resize()},clearAnimation:function(){this.animation.clear()},getWidth:function(){return this.painter.getWidth()},getHeight:function(){return this.painter.getHeight()},pathToImage:function(t,e){return this.painter.pathToImage(t,e)},setCursorStyle:function(t){this.handler.setCursorStyle(t)},findHover:function(t,e){return this.handler.findHover(t,e)},on:function(t,e,n){this.handler.on(t,e,n)},off:function(t,e){this.handler.off(t,e)},trigger:function(t,e){this.handler.trigger(t,e)},clear:function(){this.storage.delRoot(),this.painter.clear()},dispose:function(){this.animation.stop(),this.clear(),this.storage.dispose(),this.painter.dispose(),this.handler.dispose(),this.animation=this.storage=this.painter=this.handler=null,Ei(this.id)}};var Tp=(Object.freeze||Object)({version:Sp,init:Pi,dispose:Li,getInstance:Oi,registerPainter:Bi}),Ip=f,Cp=S,Dp=_,kp="series\x00",Ap=["fontStyle","fontWeight","fontSize","fontFamily","rich","tag","color","textBorderColor","textBorderWidth","width","height","lineHeight","align","verticalAlign","baseline","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY","backgroundColor","borderColor","borderWidth","borderRadius","padding"],Pp=0,Lp=".",Op="___EC__COMPONENT__CONTAINER___",Bp=0,Ep=function(t){for(var e=0;e<t.length;e++)t[e][1]||(t[e][1]=t[e][0]);return function(e,n,i){for(var r={},a=0;a<t.length;a++){var o=t[a][1];if(!(n&&u(n,o)>=0||i&&u(i,o)<0)){var s=e.getShallow(o);null!=s&&(r[t[a][0]]=s)}}return r}},zp=Ep([["lineWidth","width"],["stroke","color"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),Rp={getLineStyle:function(t){var e=zp(this,t),n=this.getLineDash(e.lineWidth);return n&&(e.lineDash=n),e},getLineDash:function(t){null==t&&(t=1);var e=this.get("type"),n=Math.max(t,2),i=4*t;return"solid"===e||null==e?null:"dashed"===e?[i,i]:[n,n]}},Fp=Ep([["fill","color"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["opacity"],["shadowColor"]]),Np={getAreaStyle:function(t,e){return Fp(this,t,e)}},Hp=Math.pow,Wp=Math.sqrt,Vp=1e-8,Gp=1e-4,Xp=Wp(3),Yp=1/3,jp=W(),qp=W(),Up=W(),Zp=Math.min,$p=Math.max,Kp=Math.sin,Qp=Math.cos,Jp=2*Math.PI,tg=W(),eg=W(),ng=W(),ig=[],rg=[],ag={M:1,L:2,C:3,Q:4,A:5,Z:6,R:7},og=[],sg=[],lg=[],ug=[],hg=Math.min,cg=Math.max,dg=Math.cos,fg=Math.sin,pg=Math.sqrt,gg=Math.abs,vg="undefined"!=typeof Float32Array,mg=function(t){this._saveData=!t,this._saveData&&(this.data=[]),this._ctx=null};mg.prototype={constructor:mg,_xi:0,_yi:0,_x0:0,_y0:0,_ux:0,_uy:0,_len:0,_lineDash:null,_dashOffset:0,_dashIdx:0,_dashSum:0,setScale:function(t,e){this._ux=gg(1/bf/t)||0,this._uy=gg(1/bf/e)||0},getContext:function(){return this._ctx},beginPath:function(t){return this._ctx=t,t&&t.beginPath(),t&&(this.dpr=t.dpr),this._saveData&&(this._len=0),this._lineDash&&(this._lineDash=null,this._dashOffset=0),this},moveTo:function(t,e){return this.addData(ag.M,t,e),this._ctx&&this._ctx.moveTo(t,e),this._x0=t,this._y0=e,this._xi=t,this._yi=e,this},lineTo:function(t,e){var n=gg(t-this._xi)>this._ux||gg(e-this._yi)>this._uy||this._len<5;return this.addData(ag.L,t,e),this._ctx&&n&&(this._needsDash()?this._dashedLineTo(t,e):this._ctx.lineTo(t,e)),n&&(this._xi=t,this._yi=e),this},bezierCurveTo:function(t,e,n,i,r,a){return this.addData(ag.C,t,e,n,i,r,a),this._ctx&&(this._needsDash()?this._dashedBezierTo(t,e,n,i,r,a):this._ctx.bezierCurveTo(t,e,n,i,r,a)),this._xi=r,this._yi=a,this},quadraticCurveTo:function(t,e,n,i){return this.addData(ag.Q,t,e,n,i),this._ctx&&(this._needsDash()?this._dashedQuadraticTo(t,e,n,i):this._ctx.quadraticCurveTo(t,e,n,i)),this._xi=n,this._yi=i,this},arc:function(t,e,n,i,r,a){return this.addData(ag.A,t,e,n,n,i,r-i,0,a?0:1),this._ctx&&this._ctx.arc(t,e,n,i,r,a),this._xi=dg(r)*n+t,this._yi=fg(r)*n+e,this},arcTo:function(t,e,n,i,r){return this._ctx&&this._ctx.arcTo(t,e,n,i,r),this},rect:function(t,e,n,i){return this._ctx&&this._ctx.rect(t,e,n,i),this.addData(ag.R,t,e,n,i),this},closePath:function(){this.addData(ag.Z);var t=this._ctx,e=this._x0,n=this._y0;return t&&(this._needsDash()&&this._dashedLineTo(e,n),t.closePath()),this._xi=e,this._yi=n,this},fill:function(t){t&&t.fill(),this.toStatic()},stroke:function(t){t&&t.stroke(),this.toStatic()},setLineDash:function(t){if(t instanceof Array){this._lineDash=t,this._dashIdx=0;for(var e=0,n=0;n<t.length;n++)e+=t[n];this._dashSum=e}return this},setLineDashOffset:function(t){return this._dashOffset=t,this},len:function(){return this._len},setData:function(t){var e=t.length;this.data&&this.data.length===e||!vg||(this.data=new Float32Array(e));for(var n=0;e>n;n++)this.data[n]=t[n];this._len=e},appendPath:function(t){t instanceof Array||(t=[t]);for(var e=t.length,n=0,i=this._len,r=0;e>r;r++)n+=t[r].len();vg&&this.data instanceof Float32Array&&(this.data=new Float32Array(i+n));for(var r=0;e>r;r++)for(var a=t[r].data,o=0;o<a.length;o++)this.data[i++]=a[o];this._len=i},addData:function(t){if(this._saveData){var e=this.data;this._len+arguments.length>e.length&&(this._expandData(),e=this.data);for(var n=0;n<arguments.length;n++)e[this._len++]=arguments[n];this._prevCmd=t}},_expandData:function(){if(!(this.data instanceof Array)){for(var t=[],e=0;e<this._len;e++)t[e]=this.data[e];this.data=t}},_needsDash:function(){return this._lineDash},_dashedLineTo:function(t,e){var n,i,r=this._dashSum,a=this._dashOffset,o=this._lineDash,s=this._ctx,l=this._xi,u=this._yi,h=t-l,c=e-u,d=pg(h*h+c*c),f=l,p=u,g=o.length;for(h/=d,c/=d,0>a&&(a=r+a),a%=r,f-=a*h,p-=a*c;h>0&&t>=f||0>h&&f>=t||0===h&&(c>0&&e>=p||0>c&&p>=e);)i=this._dashIdx,n=o[i],f+=h*n,p+=c*n,this._dashIdx=(i+1)%g,h>0&&l>f||0>h&&f>l||c>0&&u>p||0>c&&p>u||s[i%2?"moveTo":"lineTo"](h>=0?hg(f,t):cg(f,t),c>=0?hg(p,e):cg(p,e));h=f-t,c=p-e,this._dashOffset=-pg(h*h+c*c)},_dashedBezierTo:function(t,e,n,i,r,a){var o,s,l,u,h,c=this._dashSum,d=this._dashOffset,f=this._lineDash,p=this._ctx,g=this._xi,v=this._yi,m=or,y=0,x=this._dashIdx,_=f.length,w=0;for(0>d&&(d=c+d),d%=c,o=0;1>o;o+=.1)s=m(g,t,n,r,o+.1)-m(g,t,n,r,o),l=m(v,e,i,a,o+.1)-m(v,e,i,a,o),y+=pg(s*s+l*l);for(;_>x&&(w+=f[x],!(w>d));x++);for(o=(w-d)/y;1>=o;)u=m(g,t,n,r,o),h=m(v,e,i,a,o),x%2?p.moveTo(u,h):p.lineTo(u,h),o+=f[x]/y,x=(x+1)%_;x%2!==0&&p.lineTo(r,a),s=r-u,l=a-h,this._dashOffset=-pg(s*s+l*l)},_dashedQuadraticTo:function(t,e,n,i){var r=n,a=i;n=(n+2*t)/3,i=(i+2*e)/3,t=(this._xi+2*t)/3,e=(this._yi+2*e)/3,this._dashedBezierTo(t,e,n,i,r,a)},toStatic:function(){var t=this.data;t instanceof Array&&(t.length=this._len,vg&&(this.data=new Float32Array(t)))},getBoundingRect:function(){og[0]=og[1]=lg[0]=lg[1]=Number.MAX_VALUE,sg[0]=sg[1]=ug[0]=ug[1]=-Number.MAX_VALUE;for(var t=this.data,e=0,n=0,i=0,r=0,a=0;a<t.length;){var o=t[a++];switch(1===a&&(e=t[a],n=t[a+1],i=e,r=n),o){case ag.M:i=t[a++],r=t[a++],e=i,n=r,lg[0]=i,lg[1]=r,ug[0]=i,ug[1]=r;break;case ag.L:xr(e,n,t[a],t[a+1],lg,ug),e=t[a++],n=t[a++];break;case ag.C:_r(e,n,t[a++],t[a++],t[a++],t[a++],t[a],t[a+1],lg,ug),e=t[a++],n=t[a++];break;case ag.Q:wr(e,n,t[a++],t[a++],t[a],t[a+1],lg,ug),e=t[a++],n=t[a++];break;case ag.A:var s=t[a++],l=t[a++],u=t[a++],h=t[a++],c=t[a++],d=t[a++]+c;a+=1;var f=1-t[a++];1===a&&(i=dg(c)*u+s,r=fg(c)*h+l),br(s,l,u,h,c,d,f,lg,ug),e=dg(d)*u+s,n=fg(d)*h+l;break;case ag.R:i=e=t[a++],r=n=t[a++];var p=t[a++],g=t[a++];xr(i,r,i+p,r+g,lg,ug);break;case ag.Z:e=i,n=r}oe(og,og,lg),se(sg,sg,ug)}return 0===a&&(og[0]=og[1]=sg[0]=sg[1]=0),new yn(og[0],og[1],sg[0]-og[0],sg[1]-og[1])},rebuildPath:function(t){for(var e,n,i,r,a,o,s=this.data,l=this._ux,u=this._uy,h=this._len,c=0;h>c;){var d=s[c++];switch(1===c&&(i=s[c],r=s[c+1],e=i,n=r),d){case ag.M:e=i=s[c++],n=r=s[c++],t.moveTo(i,r);break;case ag.L:a=s[c++],o=s[c++],(gg(a-i)>l||gg(o-r)>u||c===h-1)&&(t.lineTo(a,o),i=a,r=o);break;case ag.C:t.bezierCurveTo(s[c++],s[c++],s[c++],s[c++],s[c++],s[c++]),i=s[c-2],r=s[c-1];break;case ag.Q:t.quadraticCurveTo(s[c++],s[c++],s[c++],s[c++]),i=s[c-2],r=s[c-1];break;case ag.A:var f=s[c++],p=s[c++],g=s[c++],v=s[c++],m=s[c++],y=s[c++],x=s[c++],_=s[c++],w=g>v?g:v,b=g>v?1:g/v,S=g>v?v/g:1,M=Math.abs(g-v)>.001,T=m+y;M?(t.translate(f,p),t.rotate(x),t.scale(b,S),t.arc(0,0,w,m,T,1-_),t.scale(1/b,1/S),t.rotate(-x),t.translate(-f,-p)):t.arc(f,p,w,m,T,1-_),1===c&&(e=dg(m)*g+f,n=fg(m)*v+p),i=dg(T)*g+f,r=fg(T)*v+p;break;case ag.R:e=i=s[c],n=r=s[c+1],t.rect(s[c++],s[c++],s[c++],s[c++]);break;case ag.Z:t.closePath(),i=e,r=n}}}},mg.CMD=ag;var yg=2*Math.PI,xg=2*Math.PI,_g=mg.CMD,wg=2*Math.PI,bg=1e-4,Sg=[-1,-1,-1],Mg=[-1,-1],Tg=Gf.prototype.getCanvasPattern,Ig=Math.abs,Cg=new mg(!0);Rr.prototype={constructor:Rr,type:"path",__dirtyPath:!0,strokeContainThreshold:5,subPixelOptimize:!1,brush:function(t,e){var n=this.style,i=this.path||Cg,r=n.hasStroke(),a=n.hasFill(),o=n.fill,s=n.stroke,l=a&&!!o.colorStops,u=r&&!!s.colorStops,h=a&&!!o.image,c=r&&!!s.image;if(n.bind(t,this,e),this.setTransform(t),this.__dirty){var d;l&&(d=d||this.getBoundingRect(),this._fillGradient=n.getGradient(t,o,d)),u&&(d=d||this.getBoundingRect(),this._strokeGradient=n.getGradient(t,s,d))}l?t.fillStyle=this._fillGradient:h&&(t.fillStyle=Tg.call(o,t)),u?t.strokeStyle=this._strokeGradient:c&&(t.strokeStyle=Tg.call(s,t));var f=n.lineDash,p=n.lineDashOffset,g=!!t.setLineDash,v=this.getGlobalScale();if(i.setScale(v[0],v[1]),this.__dirtyPath||f&&!g&&r?(i.beginPath(t),f&&!g&&(i.setLineDash(f),i.setLineDashOffset(p)),this.buildPath(i,this.shape,!1),this.path&&(this.__dirtyPath=!1)):(t.beginPath(),this.path.rebuildPath(t)),a)if(null!=n.fillOpacity){var m=t.globalAlpha;t.globalAlpha=n.fillOpacity*n.opacity,i.fill(t),t.globalAlpha=m}else i.fill(t);if(f&&g&&(t.setLineDash(f),t.lineDashOffset=p),r)if(null!=n.strokeOpacity){var m=t.globalAlpha;t.globalAlpha=n.strokeOpacity*n.opacity,i.stroke(t),t.globalAlpha=m}else i.stroke(t);f&&g&&t.setLineDash([]),null!=n.text&&(this.restoreTransform(t),this.drawRectText(t,this.getBoundingRect()))},buildPath:function(){},createPathProxy:function(){this.path=new mg},getBoundingRect:function(){var t=this._rect,e=this.style,n=!t;if(n){var i=this.path;i||(i=this.path=new mg),this.__dirtyPath&&(i.beginPath(),this.buildPath(i,this.shape,!1)),t=i.getBoundingRect()}if(this._rect=t,e.hasStroke()){var r=this._rectWithStroke||(this._rectWithStroke=t.clone());if(this.__dirty||n){r.copy(t);var a=e.lineWidth,o=e.strokeNoScale?this.getLineScale():1;e.hasFill()||(a=Math.max(a,this.strokeContainThreshold||4)),o>1e-10&&(r.width+=a/o,r.height+=a/o,r.x-=a/o/2,r.y-=a/o/2)}return r}return t},contain:function(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect(),r=this.style;if(t=n[0],e=n[1],i.contain(t,e)){var a=this.path.data;if(r.hasStroke()){var o=r.lineWidth,s=r.strokeNoScale?this.getLineScale():1;if(s>1e-10&&(r.hasFill()||(o=Math.max(o,this.strokeContainThreshold)),zr(a,o/s,t,e)))return!0}if(r.hasFill())return Er(a,t,e)}return!1},dirty:function(t){null==t&&(t=!0),t&&(this.__dirtyPath=t,this._rect=null),this.__dirty=this.__dirtyText=!0,this.__zr&&this.__zr.refresh(),this.__clipTarget&&this.__clipTarget.dirty()},animateShape:function(t){return this.animate("shape",t)},attrKV:function(t,e){"shape"===t?(this.setShape(e),this.__dirtyPath=!0,this._rect=null):yi.prototype.attrKV.call(this,t,e)},setShape:function(t,e){var n=this.shape;if(n){if(S(t))for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);else n[t]=e;this.dirty(!0)}return this},getLineScale:function(){var t=this.transform;return t&&Ig(t[0]-1)>1e-10&&Ig(t[3]-1)>1e-10?Math.sqrt(Ig(t[0]*t[3]-t[2]*t[1])):1}},Rr.extend=function(t){var e=function(e){Rr.call(this,e),t.style&&this.style.extendFrom(t.style,!1);var n=t.shape;if(n){this.shape=this.shape||{};var i=this.shape;for(var r in n)!i.hasOwnProperty(r)&&n.hasOwnProperty(r)&&(i[r]=n[r])}t.init&&t.init.call(this,e)};h(e,Rr);for(var n in t)"style"!==n&&"shape"!==n&&(e.prototype[n]=t[n]);return e},h(Rr,yi);var Dg=mg.CMD,kg=[[],[],[]],Ag=Math.sqrt,Pg=Math.atan2,Lg=function(t,e){var n,i,r,a,o,s,l=t.data,u=Dg.M,h=Dg.C,c=Dg.L,d=Dg.R,f=Dg.A,p=Dg.Q;for(r=0,a=0;r<l.length;){switch(n=l[r++],a=r,i=0,n){case u:i=1;break;case c:i=1;break;case h:i=3;break;case p:i=2;break;case f:var g=e[4],v=e[5],m=Ag(e[0]*e[0]+e[1]*e[1]),y=Ag(e[2]*e[2]+e[3]*e[3]),x=Pg(-e[1]/y,e[0]/m);l[r]*=m,l[r++]+=g,l[r]*=y,l[r++]+=v,l[r++]*=m,l[r++]*=y,l[r++]+=x,l[r++]+=x,r+=2,a=r;break;case d:s[0]=l[r++],s[1]=l[r++],ae(s,s,e),l[a++]=s[0],l[a++]=s[1],s[0]+=l[r++],s[1]+=l[r++],ae(s,s,e),l[a++]=s[0],l[a++]=s[1]}for(o=0;i>o;o++){var s=kg[o];s[0]=l[r++],s[1]=l[r++],ae(s,s,e),l[a++]=s[0],l[a++]=s[1]}}},Og=Math.sqrt,Bg=Math.sin,Eg=Math.cos,zg=Math.PI,Rg=function(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])},Fg=function(t,e){return(t[0]*e[0]+t[1]*e[1])/(Rg(t)*Rg(e))},Ng=function(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(Fg(t,e))},Hg=/([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,Wg=/-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g,Vg=function(t){yi.call(this,t)
};Vg.prototype={constructor:Vg,type:"text",brush:function(t,e){var n=this.style;this.__dirty&&ti(n,!0),n.fill=n.stroke=n.shadowBlur=n.shadowColor=n.shadowOffsetX=n.shadowOffsetY=null;var i=n.text;return null!=i&&(i+=""),mi(i,n)?(this.setTransform(t),ni(this,t,i,n,null,e),void this.restoreTransform(t)):void(t.__attrCachedBy=zf.NONE)},getBoundingRect:function(){var t=this.style;if(this.__dirty&&ti(t,!0),!this._rect){var e=t.text;null!=e?e+="":e="";var n=Rn(t.text+"",t.font,t.textAlign,t.textVerticalAlign,t.textPadding,t.rich);if(n.x+=t.x||0,n.y+=t.y||0,fi(t.textStroke,t.textStrokeWidth)){var i=t.textStrokeWidth;n.x-=i/2,n.y-=i/2,n.width+=i,n.height+=i}this._rect=n}return this._rect}},h(Vg,yi);var Gg=Rr.extend({type:"circle",shape:{cx:0,cy:0,r:0},buildPath:function(t,e,n){n&&t.moveTo(e.cx+e.r,e.cy),t.arc(e.cx,e.cy,e.r,0,2*Math.PI,!0)}}),Xg=[["shadowBlur",0],["shadowColor","#000"],["shadowOffsetX",0],["shadowOffsetY",0]],Yg=function(t){return xd.browser.ie&&xd.browser.version>=11?function(){var e,n=this.__clipPaths,i=this.style;if(n)for(var r=0;r<n.length;r++){var a=n[r],o=a&&a.shape,s=a&&a.type;if(o&&("sector"===s&&o.startAngle===o.endAngle||"rect"===s&&(!o.width||!o.height))){for(var l=0;l<Xg.length;l++)Xg[l][2]=i[Xg[l][0]],i[Xg[l][0]]=Xg[l][1];e=!0;break}}if(t.apply(this,arguments),e)for(var l=0;l<Xg.length;l++)i[Xg[l][0]]=Xg[l][2]}:t},jg=Rr.extend({type:"sector",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},brush:Yg(Rr.prototype.brush),buildPath:function(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r0||0,0),a=Math.max(e.r,0),o=e.startAngle,s=e.endAngle,l=e.clockwise,u=Math.cos(o),h=Math.sin(o);t.moveTo(u*r+n,h*r+i),t.lineTo(u*a+n,h*a+i),t.arc(n,i,a,o,s,!l),t.lineTo(Math.cos(s)*r+n,Math.sin(s)*r+i),0!==r&&t.arc(n,i,r,s,o,l),t.closePath()}}),qg=Rr.extend({type:"ring",shape:{cx:0,cy:0,r:0,r0:0},buildPath:function(t,e){var n=e.cx,i=e.cy,r=2*Math.PI;t.moveTo(n+e.r,i),t.arc(n,i,e.r,0,r,!1),t.moveTo(n+e.r0,i),t.arc(n,i,e.r0,0,r,!0)}}),Ug=function(t,e){for(var n=t.length,i=[],r=0,a=1;n>a;a++)r+=ee(t[a-1],t[a]);var o=r/2;o=n>o?n:o;for(var a=0;o>a;a++){var s,l,u,h=a/(o-1)*(e?n:n-1),c=Math.floor(h),d=h-c,f=t[c%n];e?(s=t[(c-1+n)%n],l=t[(c+1)%n],u=t[(c+2)%n]):(s=t[0===c?c:c-1],l=t[c>n-2?n-1:c+1],u=t[c>n-3?n-1:c+2]);var p=d*d,g=d*p;i.push([Xr(s[0],f[0],l[0],u[0],d,p,g),Xr(s[1],f[1],l[1],u[1],d,p,g)])}return i},Zg=function(t,e,n,i){var r,a,o,s,l=[],u=[],h=[],c=[];if(i){o=[1/0,1/0],s=[-1/0,-1/0];for(var d=0,f=t.length;f>d;d++)oe(o,o,t[d]),se(s,s,t[d]);oe(o,o,i[0]),se(s,s,i[1])}for(var d=0,f=t.length;f>d;d++){var p=t[d];if(n)r=t[d?d-1:f-1],a=t[(d+1)%f];else{if(0===d||d===f-1){l.push(G(t[d]));continue}r=t[d-1],a=t[d+1]}q(u,a,r),J(u,u,e);var g=ee(p,r),v=ee(p,a),m=g+v;0!==m&&(g/=m,v/=m),J(h,u,-g),J(c,u,v);var y=Y([],p,h),x=Y([],p,c);i&&(se(y,y,o),oe(y,y,s),se(x,x,o),oe(x,x,s)),l.push(y),l.push(x)}return n&&l.push(l.shift()),l},$g=Rr.extend({type:"polygon",shape:{points:null,smooth:!1,smoothConstraint:null},buildPath:function(t,e){Yr(t,e,!0)}}),Kg=Rr.extend({type:"polyline",shape:{points:null,smooth:!1,smoothConstraint:null},style:{stroke:"#000",fill:null},buildPath:function(t,e){Yr(t,e,!1)}}),Qg=Math.round,Jg={},tv=Rr.extend({type:"rect",shape:{r:0,x:0,y:0,width:0,height:0},buildPath:function(t,e){var n,i,r,a;this.subPixelOptimize?(qr(Jg,e,this.style),n=Jg.x,i=Jg.y,r=Jg.width,a=Jg.height,Jg.r=e.r,e=Jg):(n=e.x,i=e.y,r=e.width,a=e.height),e.r?Jn(t,e):t.rect(n,i,r,a),t.closePath()}}),ev={},nv=Rr.extend({type:"line",shape:{x1:0,y1:0,x2:0,y2:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function(t,e){var n,i,r,a;this.subPixelOptimize?(jr(ev,e,this.style),n=ev.x1,i=ev.y1,r=ev.x2,a=ev.y2):(n=e.x1,i=e.y1,r=e.x2,a=e.y2);var o=e.percent;0!==o&&(t.moveTo(n,i),1>o&&(r=n*(1-o)+r*o,a=i*(1-o)+a*o),t.lineTo(r,a))},pointAt:function(t){var e=this.shape;return[e.x1*(1-t)+e.x2*t,e.y1*(1-t)+e.y2*t]}}),iv=[],rv=Rr.extend({type:"bezier-curve",shape:{x1:0,y1:0,x2:0,y2:0,cpx1:0,cpy1:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function(t,e){var n=e.x1,i=e.y1,r=e.x2,a=e.y2,o=e.cpx1,s=e.cpy1,l=e.cpx2,u=e.cpy2,h=e.percent;0!==h&&(t.moveTo(n,i),null==l||null==u?(1>h&&(vr(n,o,r,h,iv),o=iv[1],r=iv[2],vr(i,s,a,h,iv),s=iv[1],a=iv[2]),t.quadraticCurveTo(o,s,r,a)):(1>h&&(hr(n,o,l,r,h,iv),o=iv[1],l=iv[2],r=iv[3],hr(i,s,u,a,h,iv),s=iv[1],u=iv[2],a=iv[3]),t.bezierCurveTo(o,s,l,u,r,a)))},pointAt:function(t){return Zr(this.shape,t,!1)},tangentAt:function(t){var e=Zr(this.shape,t,!0);return te(e,e)}}),av=Rr.extend({type:"arc",shape:{cx:0,cy:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},style:{stroke:"#000",fill:null},buildPath:function(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r,0),a=e.startAngle,o=e.endAngle,s=e.clockwise,l=Math.cos(a),u=Math.sin(a);t.moveTo(l*r+n,u*r+i),t.arc(n,i,r,a,o,!s)}}),ov=Rr.extend({type:"compound",shape:{paths:null},_updatePathDirty:function(){for(var t=this.__dirtyPath,e=this.shape.paths,n=0;n<e.length;n++)t=t||e[n].__dirtyPath;this.__dirtyPath=t,this.__dirty=this.__dirty||t},beforeBrush:function(){this._updatePathDirty();for(var t=this.shape.paths||[],e=this.getGlobalScale(),n=0;n<t.length;n++)t[n].path||t[n].createPathProxy(),t[n].path.setScale(e[0],e[1])},buildPath:function(t,e){for(var n=e.paths||[],i=0;i<n.length;i++)n[i].buildPath(t,n[i].shape,!0)},afterBrush:function(){for(var t=this.shape.paths||[],e=0;e<t.length;e++)t[e].__dirtyPath=!1},getBoundingRect:function(){return this._updatePathDirty(),Rr.prototype.getBoundingRect.call(this)}}),sv=function(t){this.colorStops=t||[]};sv.prototype={constructor:sv,addColorStop:function(t,e){this.colorStops.push({offset:t,color:e})}};var lv=function(t,e,n,i,r,a){this.x=null==t?0:t,this.y=null==e?0:e,this.x2=null==n?1:n,this.y2=null==i?0:i,this.type="linear",this.global=a||!1,sv.call(this,r)};lv.prototype={constructor:lv},h(lv,sv);var uv=function(t,e,n,i,r){this.x=null==t?.5:t,this.y=null==e?.5:e,this.r=null==n?.5:n,this.type="radial",this.global=r||!1,sv.call(this,i)};uv.prototype={constructor:uv},h(uv,sv),$r.prototype.incremental=!0,$r.prototype.clearDisplaybles=function(){this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.dirty(),this.notClear=!1},$r.prototype.addDisplayable=function(t,e){e?this._temporaryDisplayables.push(t):this._displayables.push(t),this.dirty()},$r.prototype.addDisplayables=function(t,e){e=e||!1;for(var n=0;n<t.length;n++)this.addDisplayable(t[n],e)},$r.prototype.eachPendingDisplayable=function(t){for(var e=this._cursor;e<this._displayables.length;e++)t&&t(this._displayables[e]);for(var e=0;e<this._temporaryDisplayables.length;e++)t&&t(this._temporaryDisplayables[e])},$r.prototype.update=function(){this.updateTransform();for(var t=this._cursor;t<this._displayables.length;t++){var e=this._displayables[t];e.parent=this,e.update(),e.parent=null}for(var t=0;t<this._temporaryDisplayables.length;t++){var e=this._temporaryDisplayables[t];e.parent=this,e.update(),e.parent=null}},$r.prototype.brush=function(t){for(var e=this._cursor;e<this._displayables.length;e++){var n=this._displayables[e];n.beforeBrush&&n.beforeBrush(t),n.brush(t,e===this._cursor?null:this._displayables[e-1]),n.afterBrush&&n.afterBrush(t)}this._cursor=e;for(var e=0;e<this._temporaryDisplayables.length;e++){var n=this._temporaryDisplayables[e];n.beforeBrush&&n.beforeBrush(t),n.brush(t,0===e?null:this._temporaryDisplayables[e-1]),n.afterBrush&&n.afterBrush(t)}this._temporaryDisplayables=[],this.notClear=!0};var hv=[];$r.prototype.getBoundingRect=function(){if(!this._rect){for(var t=new yn(1/0,1/0,-1/0,-1/0),e=0;e<this._displayables.length;e++){var n=this._displayables[e],i=n.getBoundingRect().clone();n.needLocalTransform()&&i.applyTransform(n.getLocalTransform(hv)),t.union(i)}this._rect=t}return this._rect},$r.prototype.contain=function(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect();if(i.contain(n[0],n[1]))for(var r=0;r<this._displayables.length;r++){var a=this._displayables[r];if(a.contain(t,e))return!0}return!1},h($r,yi);var cv=Math.round,dv=Math.max,fv=Math.min,pv={},gv=1,vv=Gr,mv=F(),yv=0,xv=(Object.freeze||Object)({Z2_EMPHASIS_LIFT:gv,extendShape:Kr,extendPath:Qr,makePath:Jr,makeImage:ta,mergePath:vv,resizePath:na,subPixelOptimizeLine:ia,subPixelOptimizeRect:ra,subPixelOptimize:aa,setElementHoverStyle:fa,isInEmphasis:pa,setHoverStyle:xa,setAsHoverStyleTrigger:_a,setLabelStyle:wa,setTextStyle:ba,setText:Sa,getFont:Aa,updateProps:La,initProps:Oa,getTransform:Ba,applyTransform:Ea,transformDirection:za,groupTransition:Ra,clipPointsByRect:Fa,clipRectByRect:Na,createIcon:Ha,Group:Af,Image:xi,Text:Vg,Circle:Gg,Sector:jg,Ring:qg,Polygon:$g,Polyline:Kg,Rect:tv,Line:nv,BezierCurve:rv,Arc:av,IncrementalDisplayable:$r,CompoundPath:ov,LinearGradient:lv,RadialGradient:uv,BoundingRect:yn}),_v=["textStyle","color"],wv={getTextColor:function(t){var e=this.ecModel;return this.getShallow("color")||(!t&&e?e.get(_v):null)},getFont:function(){return Aa({fontStyle:this.getShallow("fontStyle"),fontWeight:this.getShallow("fontWeight"),fontSize:this.getShallow("fontSize"),fontFamily:this.getShallow("fontFamily")},this.ecModel)},getTextRect:function(t){return Rn(t,this.getFont(),this.getShallow("align"),this.getShallow("verticalAlign")||this.getShallow("baseline"),this.getShallow("padding"),this.getShallow("rich"),this.getShallow("truncateText"))}},bv=Ep([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["textPosition"],["textAlign"]]),Sv={getItemStyle:function(t,e){var n=bv(this,t,e),i=this.getBorderLineDash();return i&&(n.lineDash=i),n},getBorderLineDash:function(){var t=this.get("borderType");return"solid"===t||null==t?null:"dashed"===t?[5,5]:[1,1]}},Mv=c,Tv=Yi();Wa.prototype={constructor:Wa,init:null,mergeOption:function(t){r(this.option,t,!0)},get:function(t,e){return null==t?this.option:Va(this.option,this.parsePath(t),!e&&Ga(this,t))},getShallow:function(t,e){var n=this.option,i=null==n?n:n[t],r=!e&&Ga(this,t);return null==i&&r&&(i=r.getShallow(t)),i},getModel:function(t,e){var n,i=null==t?this.option:Va(this.option,t=this.parsePath(t));return e=e||(n=Ga(this,t))&&n.getModel(t),new Wa(i,e,this.ecModel)},isEmpty:function(){return null==this.option},restoreData:function(){},clone:function(){var t=this.constructor;return new t(i(this.option))},setReadOnly:function(){},parsePath:function(t){return"string"==typeof t&&(t=t.split(".")),t},customizeGetParent:function(t){Tv(this).getParent=t},isAnimationEnabled:function(){if(!xd.node){if(null!=this.option.animation)return!!this.option.animation;if(this.parentModel)return this.parentModel.isAnimationEnabled()}}},Ji(Wa),tr(Wa),Mv(Wa,Rp),Mv(Wa,Np),Mv(Wa,wv),Mv(Wa,Sv);var Iv=0,Cv=1e-4,Dv=9007199254740991,kv=/^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,Av=(Object.freeze||Object)({linearMap:Ua,parsePercent:Za,round:$a,asc:Ka,getPrecision:Qa,getPrecisionSafe:Ja,getPixelPrecision:to,getPercentWithPrecision:eo,MAX_SAFE_INTEGER:Dv,remRadian:no,isRadianAroundZero:io,parseDate:ro,quantity:ao,nice:so,quantile:lo,reformIntervals:uo,isNumeric:ho}),Pv=L,Lv=/([&<>"'])/g,Ov={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Bv=["a","b","c","d","e","f","g"],Ev=function(t,e){return"{"+t+(null==e?"":e)+"}"},zv=Gn,Rv=Rn,Fv=(Object.freeze||Object)({addCommas:co,toCamelCase:fo,normalizeCssArray:Pv,encodeHTML:po,formatTpl:go,formatTplSimple:vo,getTooltipMarker:mo,formatTime:xo,capitalFirst:_o,truncateText:zv,getTextRect:Rv}),Nv=f,Hv=["left","right","top","bottom","width","height"],Wv=[["width","left","right"],["height","top","bottom"]],Vv=wo,Gv=(x(wo,"vertical"),x(wo,"horizontal"),{getBoxLayoutParams:function(){return{left:this.get("left"),top:this.get("top"),right:this.get("right"),bottom:this.get("bottom"),width:this.get("width"),height:this.get("height")}}}),Xv=Yi(),Yv=Wa.extend({type:"component",id:"",name:"",mainType:"",subType:"",componentIndex:0,defaultOption:null,ecModel:null,dependentModels:[],uid:null,layoutMode:null,$constructor:function(t,e,n,i){Wa.call(this,t,e,n,i),this.uid=Xa("ec_cpt_model")},init:function(t,e,n){this.mergeDefaultAndTheme(t,n)},mergeDefaultAndTheme:function(t,e){var n=this.layoutMode,i=n?Mo(t):{},a=e.getTheme();r(t,a.get(this.mainType)),r(t,this.getDefaultOption()),n&&So(t,i,n)},mergeOption:function(t){r(this.option,t,!0);var e=this.layoutMode;e&&So(this.option,t,e)},optionUpdated:function(){},getDefaultOption:function(){var t=Xv(this);if(!t.defaultOption){for(var e=[],n=this.constructor;n;){var i=n.prototype.defaultOption;i&&e.push(i),n=n.superClass}for(var a={},o=e.length-1;o>=0;o--)a=r(a,e[o],!0);t.defaultOption=a}return t.defaultOption},getReferringComponents:function(t){return this.ecModel.queryComponents({mainType:t,index:this.get(t+"Index",!0),id:this.get(t+"Id",!0)})}});ir(Yv,{registerWhenExtend:!0}),Ya(Yv),ja(Yv,Io),c(Yv,Gv);var jv="";"undefined"!=typeof navigator&&(jv=navigator.platform||"");var qv={color:["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074","#546570","#c4ccd3"],gradientColor:["#f6efa6","#d88273","#bf444c"],textStyle:{fontFamily:jv.match(/^Win/)?"Microsoft YaHei":"sans-serif",fontSize:12,fontStyle:"normal",fontWeight:"normal"},blendMode:null,animation:"auto",animationDuration:1e3,animationDurationUpdate:300,animationEasing:"exponentialOut",animationEasingUpdate:"cubicOut",animationThreshold:2e3,progressiveThreshold:3e3,progressive:400,hoverLayerThreshold:3e3,useUTC:!1},Uv=Yi(),Zv={clearColorPalette:function(){Uv(this).colorIdx=0,Uv(this).colorNameMap={}},getColorFromPalette:function(t,e,n){e=e||this;var i=Uv(e),r=i.colorIdx||0,a=i.colorNameMap=i.colorNameMap||{};if(a.hasOwnProperty(t))return a[t];var o=zi(this.get("color",!0)),s=this.get("colorLayer",!0),l=null!=n&&s?Co(s,n):o;if(l=l||o,l&&l.length){var u=l[r];return t&&(a[t]=u),i.colorIdx=(r+1)%l.length,u}}},$v={cartesian2d:function(t,e,n,i){var r=t.getReferringComponents("xAxis")[0],a=t.getReferringComponents("yAxis")[0];e.coordSysDims=["x","y"],n.set("x",r),n.set("y",a),ko(r)&&(i.set("x",r),e.firstCategoryDimIndex=0),ko(a)&&(i.set("y",a),e.firstCategoryDimIndex=1)},singleAxis:function(t,e,n,i){var r=t.getReferringComponents("singleAxis")[0];e.coordSysDims=["single"],n.set("single",r),ko(r)&&(i.set("single",r),e.firstCategoryDimIndex=0)},polar:function(t,e,n,i){var r=t.getReferringComponents("polar")[0],a=r.findAxisModel("radiusAxis"),o=r.findAxisModel("angleAxis");e.coordSysDims=["radius","angle"],n.set("radius",a),n.set("angle",o),ko(a)&&(i.set("radius",a),e.firstCategoryDimIndex=0),ko(o)&&(i.set("angle",o),e.firstCategoryDimIndex=1)},geo:function(t,e){e.coordSysDims=["lng","lat"]},parallel:function(t,e,n,i){var r=t.ecModel,a=r.getComponent("parallel",t.get("parallelIndex")),o=e.coordSysDims=a.dimensions.slice();f(a.parallelAxisIndex,function(t,a){var s=r.getComponent("parallelAxis",t),l=o[a];n.set(l,s),ko(s)&&null==e.firstCategoryDimIndex&&(i.set(l,s),e.firstCategoryDimIndex=a)})}},Kv="original",Qv="arrayRows",Jv="objectRows",tm="keyedColumns",em="unknown",nm="typedArray",im="column",rm="row";Ao.seriesDataToSource=function(t){return new Ao({data:t,sourceFormat:T(t)?nm:Kv,fromDataset:!1})},tr(Ao);var am=Yi(),om="\x00_ec_inner",sm=Wa.extend({init:function(t,e,n,i){n=n||{},this.option=null,this._theme=new Wa(n),this._optionManager=i},setOption:function(t,e){O(!(om in t),"please use chart.getOption()"),this._optionManager.setOption(t,e),this.resetOption(null)},resetOption:function(t){var e=!1,n=this._optionManager;if(!t||"recreate"===t){var i=n.mountOption("recreate"===t);this.option&&"recreate"!==t?(this.restoreData(),this.mergeOption(i)):Yo.call(this,i),e=!0}if(("timeline"===t||"media"===t)&&this.restoreData(),!t||"recreate"===t||"timeline"===t){var r=n.getTimelineOption(this);r&&(this.mergeOption(r),e=!0)}if(!t||"recreate"===t||"media"===t){var a=n.getMediaOption(this,this._api);a.length&&f(a,function(t){this.mergeOption(t,e=!0)},this)}return e},mergeOption:function(t){function e(e,i){var r=zi(t[e]),s=Hi(a.get(e),r);Wi(s),f(s,function(t){var n=t.option;S(n)&&(t.keyInfo.mainType=e,t.keyInfo.subType=qo(e,n,t.exist))});var l=jo(a,i);n[e]=[],a.set(e,[]),f(s,function(t,i){var r=t.exist,s=t.option;if(O(S(s)||r,"Empty component definition"),s){var u=Yv.getClass(e,t.keyInfo.subType,!0);if(r&&r instanceof u)r.name=t.keyInfo.name,r.mergeOption(s,this),r.optionUpdated(s,!1);else{var h=o({dependentModels:l,componentIndex:i},t.keyInfo);r=new u(s,this,this,h),o(r,h),r.init(s,this,this,h),r.optionUpdated(null,!0)}}else r.mergeOption({},this),r.optionUpdated({},!1);a.get(e)[i]=r,n[e][i]=r.option},this),"series"===e&&Uo(this,a.get("series"))}var n=this.option,a=this._componentsMap,s=[];Oo(this),f(t,function(t,e){null!=t&&(Yv.hasClass(e)?e&&s.push(e):n[e]=null==n[e]?i(t):r(n[e],t,!0))}),Yv.topologicalTravel(s,Yv.getAllClassMainTypes(),e,this),this._seriesIndicesMap=F(this._seriesIndices=this._seriesIndices||[])},getOption:function(){var t=i(this.option);return f(t,function(e,n){if(Yv.hasClass(n)){for(var e=zi(e),i=e.length-1;i>=0;i--)Gi(e[i])&&e.splice(i,1);t[n]=e}}),delete t[om],t},getTheme:function(){return this._theme},getComponent:function(t,e){var n=this._componentsMap.get(t);return n?n[e||0]:void 0},queryComponents:function(t){var e=t.mainType;if(!e)return[];var n=t.index,i=t.id,r=t.name,a=this._componentsMap.get(e);if(!a||!a.length)return[];var o;if(null!=n)_(n)||(n=[n]),o=v(p(n,function(t){return a[t]}),function(t){return!!t});else if(null!=i){var s=_(i);o=v(a,function(t){return s&&u(i,t.id)>=0||!s&&t.id===i})}else if(null!=r){var l=_(r);o=v(a,function(t){return l&&u(r,t.name)>=0||!l&&t.name===r})}else o=a.slice();return Zo(o,t)},findComponents:function(t){function e(t){var e=r+"Index",n=r+"Id",i=r+"Name";return!t||null==t[e]&&null==t[n]&&null==t[i]?null:{mainType:r,index:t[e],id:t[n],name:t[i]}}function n(e){return t.filter?v(e,t.filter):e}var i=t.query,r=t.mainType,a=e(i),o=a?this.queryComponents(a):this._componentsMap.get(r);return n(Zo(o,t))},eachComponent:function(t,e,n){var i=this._componentsMap;if("function"==typeof t)n=e,e=t,i.each(function(t,i){f(t,function(t,r){e.call(n,i,t,r)})});else if(b(t))f(i.get(t),e,n);else if(S(t)){var r=this.findComponents(t);f(r,e,n)}},getSeriesByName:function(t){var e=this._componentsMap.get("series");return v(e,function(e){return e.name===t})},getSeriesByIndex:function(t){return this._componentsMap.get("series")[t]},getSeriesByType:function(t){var e=this._componentsMap.get("series");return v(e,function(e){return e.subType===t})},getSeries:function(){return this._componentsMap.get("series").slice()},getSeriesCount:function(){return this._componentsMap.get("series").length},eachSeries:function(t,e){f(this._seriesIndices,function(n){var i=this._componentsMap.get("series")[n];t.call(e,i,n)},this)},eachRawSeries:function(t,e){f(this._componentsMap.get("series"),t,e)},eachSeriesByType:function(t,e,n){f(this._seriesIndices,function(i){var r=this._componentsMap.get("series")[i];r.subType===t&&e.call(n,r,i)},this)},eachRawSeriesByType:function(t,e,n){return f(this.getSeriesByType(t),e,n)},isSeriesFiltered:function(t){return null==this._seriesIndicesMap.get(t.componentIndex)},getCurrentSeriesIndices:function(){return(this._seriesIndices||[]).slice()},filterSeries:function(t,e){var n=v(this._componentsMap.get("series"),t,e);Uo(this,n)},restoreData:function(t){var e=this._componentsMap;Uo(this,e.get("series"));var n=[];e.each(function(t,e){n.push(e)}),Yv.topologicalTravel(n,Yv.getAllClassMainTypes(),function(n){f(e.get(n),function(e){("series"!==n||!Go(e,t))&&e.restoreData()})})}});c(sm,Zv);var lm=["getDom","getZr","getWidth","getHeight","getDevicePixelRatio","dispatchAction","isDisposed","on","off","getDataURL","getConnectedDataURL","getModel","getOption","getViewOfComponentModel","getViewOfSeriesModel"],um={};Ko.prototype={constructor:Ko,create:function(t,e){var n=[];f(um,function(i){var r=i.create(t,e);n=n.concat(r||[])}),this._coordinateSystems=n},update:function(t,e){f(this._coordinateSystems,function(n){n.update&&n.update(t,e)})},getCoordinateSystems:function(){return this._coordinateSystems.slice()}},Ko.register=function(t,e){um[t]=e},Ko.get=function(t){return um[t]};var hm=f,cm=i,dm=p,fm=r,pm=/^(min|max)?(.+)$/;Qo.prototype={constructor:Qo,setOption:function(t,e){t&&f(zi(t.series),function(t){t&&t.data&&T(t.data)&&E(t.data)}),t=cm(t,!0);var n=this._optionBackup,i=Jo.call(this,t,e,!n);this._newBaseOption=i.baseOption,n?(is(n.baseOption,i.baseOption),i.timelineOptions.length&&(n.timelineOptions=i.timelineOptions),i.mediaList.length&&(n.mediaList=i.mediaList),i.mediaDefault&&(n.mediaDefault=i.mediaDefault)):this._optionBackup=i},mountOption:function(t){var e=this._optionBackup;return this._timelineOptions=dm(e.timelineOptions,cm),this._mediaList=dm(e.mediaList,cm),this._mediaDefault=cm(e.mediaDefault),this._currentMediaIndices=[],cm(t?e.baseOption:this._newBaseOption)},getTimelineOption:function(t){var e,n=this._timelineOptions;if(n.length){var i=t.getComponent("timeline");i&&(e=cm(n[i.getCurrentIndex()],!0))}return e},getMediaOption:function(){var t=this._api.getWidth(),e=this._api.getHeight(),n=this._mediaList,i=this._mediaDefault,r=[],a=[];if(!n.length&&!i)return a;for(var o=0,s=n.length;s>o;o++)ts(n[o].query,t,e)&&r.push(o);return!r.length&&i&&(r=[-1]),r.length&&!ns(r,this._currentMediaIndices)&&(a=dm(r,function(t){return cm(-1===t?i.option:n[t].option)})),this._currentMediaIndices=r,a}};var gm=f,vm=S,mm=["areaStyle","lineStyle","nodeStyle","linkStyle","chordStyle","label","labelLine"],ym=function(t,e){gm(hs(t.series),function(t){vm(t)&&us(t)});var n=["xAxis","yAxis","radiusAxis","angleAxis","singleAxis","parallelAxis","radar"];e&&n.push("valueAxis","categoryAxis","logAxis","timeAxis"),gm(n,function(e){gm(hs(t[e]),function(t){t&&(ss(t,"axisLabel"),ss(t.axisPointer,"label"))})}),gm(hs(t.parallel),function(t){var e=t&&t.parallelAxisDefault;ss(e,"axisLabel"),ss(e&&e.axisPointer,"label")}),gm(hs(t.calendar),function(t){as(t,"itemStyle"),ss(t,"dayLabel"),ss(t,"monthLabel"),ss(t,"yearLabel")}),gm(hs(t.radar),function(t){ss(t,"name")}),gm(hs(t.geo),function(t){vm(t)&&(ls(t),gm(hs(t.regions),function(t){ls(t)}))}),gm(hs(t.timeline),function(t){ls(t),as(t,"label"),as(t,"itemStyle"),as(t,"controlStyle",!0);var e=t.data;_(e)&&f(e,function(t){S(t)&&(as(t,"label"),as(t,"itemStyle"))})}),gm(hs(t.toolbox),function(t){as(t,"iconStyle"),gm(t.feature,function(t){as(t,"iconStyle")})}),ss(cs(t.axisPointer),"label"),ss(cs(t.tooltip).axisPointer,"label")},xm=[["x","left"],["y","top"],["x2","right"],["y2","bottom"]],_m=["grid","geo","parallel","legend","toolbox","title","visualMap","dataZoom","timeline"],wm=function(t,e){ym(t,e),t.series=zi(t.series),f(t.series,function(t){if(S(t)){var e=t.type;if(("pie"===e||"gauge"===e)&&null!=t.clockWise&&(t.clockwise=t.clockWise),"gauge"===e){var n=ds(t,"pointer.color");null!=n&&fs(t,"itemStyle.normal.color",n)}ps(t)}}),t.dataRange&&(t.visualMap=t.dataRange),f(_m,function(e){var n=t[e];n&&(_(n)||(n=[n]),f(n,function(t){ps(t)}))})},bm=function(t){var e=F();t.eachSeries(function(t){var n=t.get("stack");if(n){var i=e.get(n)||e.set(n,[]),r=t.getData(),a={stackResultDimension:r.getCalculationInfo("stackResultDimension"),stackedOverDimension:r.getCalculationInfo("stackedOverDimension"),stackedDimension:r.getCalculationInfo("stackedDimension"),stackedByDimension:r.getCalculationInfo("stackedByDimension"),isStackedByIndex:r.getCalculationInfo("isStackedByIndex"),data:r,seriesModel:t};if(!a.stackedDimension||!a.isStackedByIndex&&!a.stackedByDimension)return;i.length&&r.setCalculationInfo("stackedOnSeries",i[i.length-1].seriesModel),i.push(a)}}),e.each(gs)},Sm=vs.prototype;Sm.pure=!1,Sm.persistent=!0,Sm.getSource=function(){return this._source};var Mm={arrayRows_column:{pure:!0,count:function(){return Math.max(0,this._data.length-this._source.startIndex)},getItem:function(t){return this._data[t+this._source.startIndex]},appendData:xs},arrayRows_row:{pure:!0,count:function(){var t=this._data[0];return t?Math.max(0,t.length-this._source.startIndex):0},getItem:function(t){t+=this._source.startIndex;for(var e=[],n=this._data,i=0;i<n.length;i++){var r=n[i];e.push(r?r[t]:null)}return e},appendData:function(){throw new Error('Do not support appendData when set seriesLayoutBy: "row".')}},objectRows:{pure:!0,count:ms,getItem:ys,appendData:xs},keyedColumns:{pure:!0,count:function(){var t=this._source.dimensionsDefine[0].name,e=this._data[t];return e?e.length:0},getItem:function(t){for(var e=[],n=this._source.dimensionsDefine,i=0;i<n.length;i++){var r=this._data[n[i].name];e.push(r?r[t]:null)}return e},appendData:function(t){var e=this._data;f(t,function(t,n){for(var i=e[n]||(e[n]=[]),r=0;r<(t||[]).length;r++)i.push(t[r])})}},original:{count:ms,getItem:ys,appendData:xs},typedArray:{persistent:!1,pure:!0,count:function(){return this._data?this._data.length/this._dimSize:0},getItem:function(t,e){t-=this._offset,e=e||[];for(var n=this._dimSize*t,i=0;i<this._dimSize;i++)e[i]=this._data[n+i];return e},appendData:function(t){this._data=t},clean:function(){this._offset+=this.count(),this._data=null}}},Tm={arrayRows:_s,objectRows:function(t,e,n,i){return null!=n?t[i]:t},keyedColumns:_s,original:function(t,e,n){var i=Fi(t);return null!=n&&i instanceof Array?i[n]:i},typedArray:_s},Im={arrayRows:ws,objectRows:function(t,e){return bs(t[e],this._dimensionInfos[e])},keyedColumns:ws,original:function(t,e,n,i){var r=t&&(null==t.value?t:t.value);return!this._rawData.pure&&Ni(t)&&(this.hasItemOption=!0),bs(r instanceof Array?r[i]:r,this._dimensionInfos[e])},typedArray:function(t,e,n,i){return t[i]}},Cm=/\{@(.+?)\}/g,Dm={getDataParams:function(t,e){var n=this.getData(e),i=this.getRawValue(t,e),r=n.getRawIndex(t),a=n.getName(t),o=n.getRawDataItem(t),s=n.getItemVisual(t,"color"),l=this.ecModel.getComponent("tooltip"),u=l&&l.get("renderMode"),h=$i(u),c=this.mainType,d="series"===c;return{componentType:c,componentSubType:this.subType,componentIndex:this.componentIndex,seriesType:d?this.subType:null,seriesIndex:this.seriesIndex,seriesId:d?this.id:null,seriesName:d?this.name:null,name:a,dataIndex:r,data:o,dataType:e,value:i,color:s,marker:mo({color:s,renderMode:h}),$vars:["seriesName","name","value"]}},getFormattedLabel:function(t,e,n,i,r){e=e||"normal";var a=this.getData(n),o=a.getItemModel(t),s=this.getDataParams(t,n);null!=i&&s.value instanceof Array&&(s.value=s.value[i]);var l=o.get("normal"===e?[r||"label","formatter"]:[e,r||"label","formatter"]);if("function"==typeof l)return s.status=e,l(s);if("string"==typeof l){var u=go(l,s);return u.replace(Cm,function(e,n){var i=n.length;return"["===n.charAt(0)&&"]"===n.charAt(i-1)&&(n=+n.slice(1,i-1)),Ss(a,t,n)})}},getRawValue:function(t,e){return Ss(this.getData(e),t)},formatTooltip:function(){}},km=Ts.prototype;km.perform=function(t){function e(t){return!(t>=1)&&(t=1),t}var n=this._upstream,i=t&&t.skip;if(this._dirty&&n){var r=this.context;r.data=r.outputData=n.context.outputData}this.__pipeline&&(this.__pipeline.currentTask=this);var a;this._plan&&!i&&(a=this._plan(this.context));var o=e(this._modBy),s=this._modDataCount||0,l=e(t&&t.modBy),u=t&&t.modDataCount||0;(o!==l||s!==u)&&(a="reset");var h;(this._dirty||"reset"===a)&&(this._dirty=!1,h=Cs(this,i)),this._modBy=l,this._modDataCount=u;var c=t&&t.step;if(this._dueEnd=n?n._outputDueEnd:this._count?this._count(this.context):1/0,this._progress){var d=this._dueIndex,f=Math.min(null!=c?this._dueIndex+c:1/0,this._dueEnd);if(!i&&(h||f>d)){var p=this._progress;if(_(p))for(var g=0;g<p.length;g++)Is(this,p[g],d,f,l,u);else Is(this,p,d,f,l,u)}this._dueIndex=f;var v=null!=this._settedOutputEnd?this._settedOutputEnd:f;this._outputDueEnd=v}else this._dueIndex=this._outputDueEnd=null!=this._settedOutputEnd?this._settedOutputEnd:this._dueEnd;return this.unfinished()};var Am=function(){function t(){return n>i?i++:null}function e(){var t=i%o*r+Math.ceil(i/o),e=i>=n?null:a>t?t:i;return i++,e}var n,i,r,a,o,s={reset:function(l,u,h,c){i=l,n=u,r=h,a=c,o=Math.ceil(a/r),s.next=r>1&&a>0?e:t}};return s}();km.dirty=function(){this._dirty=!0,this._onDirty&&this._onDirty(this.context)},km.unfinished=function(){return this._progress&&this._dueIndex<this._dueEnd},km.pipe=function(t){(this._downstream!==t||this._dirty)&&(this._downstream=t,t._upstream=this,t.dirty())},km.dispose=function(){this._disposed||(this._upstream&&(this._upstream._downstream=null),this._downstream&&(this._downstream._upstream=null),this._dirty=!1,this._disposed=!0)},km.getUpstream=function(){return this._upstream},km.getDownstream=function(){return this._downstream},km.setOutputEnd=function(t){this._outputDueEnd=this._settedOutputEnd=t};var Pm=Yi(),Lm=Yv.extend({type:"series.__base__",seriesIndex:0,coordinateSystem:null,defaultOption:null,legendDataProvider:null,visualColorAccessPath:"itemStyle.color",layoutMode:null,init:function(t,e,n){this.seriesIndex=this.componentIndex,this.dataTask=Ms({count:As,reset:Ps}),this.dataTask.context={model:this},this.mergeDefaultAndTheme(t,n),Bo(this);var i=this.getInitialData(t,n);Os(i,this),this.dataTask.context.data=i,Pm(this).dataBeforeProcessed=i,Ds(this)},mergeDefaultAndTheme:function(t,e){var n=this.layoutMode,i=n?Mo(t):{},a=this.subType;Yv.hasClass(a)&&(a+="Series"),r(t,e.getTheme().get(this.subType)),r(t,this.getDefaultOption()),Ri(t,"label",["show"]),this.fillDataTextStyle(t.data),n&&So(t,i,n)},mergeOption:function(t,e){t=r(this.option,t,!0),this.fillDataTextStyle(t.data);var n=this.layoutMode;n&&So(this.option,t,n),Bo(this);var i=this.getInitialData(t,e);Os(i,this),this.dataTask.dirty(),this.dataTask.context.data=i,Pm(this).dataBeforeProcessed=i,Ds(this)},fillDataTextStyle:function(t){if(t&&!T(t))for(var e=["show"],n=0;n<t.length;n++)t[n]&&t[n].label&&Ri(t[n],"label",e)},getInitialData:function(){},appendData:function(t){var e=this.getRawData();e.appendData(t.data)},getData:function(t){var e=Es(this);if(e){var n=e.context.data;return null==t?n:n.getLinkedData(t)}return Pm(this).data},setData:function(t){var e=Es(this);if(e){var n=e.context;n.data!==t&&e.modifyOutputEnd&&e.setOutputEnd(t.count()),n.outputData=t,e!==this.dataTask&&(n.data=t)}Pm(this).data=t},getSource:function(){return Lo(this)},getRawData:function(){return Pm(this).dataBeforeProcessed},getBaseAxis:function(){var t=this.coordinateSystem;return t&&t.getBaseAxis&&t.getBaseAxis()},formatTooltip:function(t,e,n,i){function r(n){function r(t,n){var r=c.getDimensionInfo(n);if(r&&r.otherDims.tooltip!==!1){var d=r.type,f="sub"+o.seriesIndex+"at"+h,p=mo({color:y,type:"subItem",renderMode:i,markerId:f}),g="string"==typeof p?p:p.content,v=(a?g+po(r.displayName||"-")+": ":"")+po("ordinal"===d?t+"":"time"===d?e?"":xo("yyyy/MM/dd hh:mm:ss",t):co(t));v&&s.push(v),l&&(u[f]=y,++h)}}var a=g(n,function(t,e,n){var i=c.getDimensionInfo(n);return t|=i&&i.tooltip!==!1&&null!=i.displayName},0),s=[];d.length?f(d,function(e){r(Ss(c,t,e),e)}):f(n,r);var p=a?l?"\n":"<br/>":"",v=p+s.join(p||", ");return{renderMode:i,content:v,style:u}}function a(t){return{renderMode:i,content:po(co(t)),style:u}}var o=this;i=i||"html";var s="html"===i?"<br/>":"\n",l="richText"===i,u={},h=0,c=this.getData(),d=c.mapDimension("defaultedTooltip",!0),p=d.length,v=this.getRawValue(t),m=_(v),y=c.getItemVisual(t,"color");S(y)&&y.colorStops&&(y=(y.colorStops[0]||{}).color),y=y||"transparent";var x=p>1||m&&!p?r(v):a(p?Ss(c,t,d[0]):m?v[0]:v),w=x.content,b=o.seriesIndex+"at"+h,M=mo({color:y,type:"item",renderMode:i,markerId:b});u[b]=y,++h;var T=c.getName(t),I=this.name;Vi(this)||(I=""),I=I?po(I)+(e?": ":s):"";var C="string"==typeof M?M:M.content,D=e?C+I+w:I+C+(T?po(T)+": "+w:w);return{html:D,markers:u}},isAnimationEnabled:function(){if(xd.node)return!1;var t=this.getShallow("animation");return t&&this.getData().count()>this.getShallow("animationThreshold")&&(t=!1),t},restoreData:function(){this.dataTask.dirty()},getColorFromPalette:function(t,e,n){var i=this.ecModel,r=Zv.getColorFromPalette.call(this,t,e,n);return r||(r=i.getColorFromPalette(t,e,n)),r},coordDimToDataDim:function(t){return this.getRawData().mapDimension(t,!0)
},getProgressive:function(){return this.get("progressive")},getProgressiveThreshold:function(){return this.get("progressiveThreshold")},getAxisTooltipData:null,getTooltipPosition:null,pipeTask:null,preventIncremental:null,pipelineContext:null});c(Lm,Dm),c(Lm,Zv);var Om=function(){this.group=new Af,this.uid=Xa("viewComponent")};Om.prototype={constructor:Om,init:function(){},render:function(){},dispose:function(){},filterForExposedEvent:null};var Bm=Om.prototype;Bm.updateView=Bm.updateLayout=Bm.updateVisual=function(){},Ji(Om),ir(Om,{registerWhenExtend:!0});var Em=function(){var t=Yi();return function(e){var n=t(e),i=e.pipelineContext,r=n.large,a=n.progressiveRender,o=n.large=i.large,s=n.progressiveRender=i.progressiveRender;return!!(r^o||a^s)&&"reset"}},zm=Yi(),Rm=Em();zs.prototype={type:"chart",init:function(){},render:function(){},highlight:function(t,e,n,i){Fs(t.getData(),i,"emphasis")},downplay:function(t,e,n,i){Fs(t.getData(),i,"normal")},remove:function(){this.group.removeAll()},dispose:function(){},incrementalPrepareRender:null,incrementalRender:null,updateTransform:null,filterForExposedEvent:null};var Fm=zs.prototype;Fm.updateView=Fm.updateLayout=Fm.updateVisual=function(t,e,n,i){this.render(t,e,n,i)},Ji(zs,["dispose"]),ir(zs,{registerWhenExtend:!0}),zs.markUpdateMethod=function(t,e){zm(t).updateMethod=e};var Nm={incrementalPrepareRender:{progress:function(t,e){e.view.incrementalRender(t,e.model,e.ecModel,e.api,e.payload)}},render:{forceFirstProgress:!0,progress:function(t,e){e.view.render(e.model,e.ecModel,e.api,e.payload)}}},Hm="\x00__throttleOriginMethod",Wm="\x00__throttleRate",Vm="\x00__throttleType",Gm={createOnAllSeries:!0,performRawSeries:!0,reset:function(t,e){var n=t.getData(),i=(t.visualColorAccessPath||"itemStyle.color").split("."),r=t.get(i)||t.getColorFromPalette(t.name,null,e.getSeriesCount());if(n.setVisual("color",r),!e.isSeriesFiltered(t)){"function"!=typeof r||r instanceof sv||n.each(function(e){n.setItemVisual(e,"color",r(t.getDataParams(e)))});var a=function(t,e){var n=t.getItemModel(e),r=n.get(i,!0);null!=r&&t.setItemVisual(e,"color",r)};return{dataEach:n.hasItemOption?a:null}}}},Xm={toolbox:{brush:{title:{rect:"矩形选择",polygon:"圈选",lineX:"横向选择",lineY:"纵向选择",keep:"保持选择",clear:"清除选择"}},dataView:{title:"数据视图",lang:["数据视图","关闭","刷新"]},dataZoom:{title:{zoom:"区域缩放",back:"区域缩放还原"}},magicType:{title:{line:"切换为折线图",bar:"切换为柱状图",stack:"切换为堆叠",tiled:"切换为平铺"}},restore:{title:"还原"},saveAsImage:{title:"保存为图片",lang:["右键另存为图片"]}},series:{typeNames:{pie:"饼图",bar:"柱状图",line:"折线图",scatter:"散点图",effectScatter:"涟漪散点图",radar:"雷达图",tree:"树图",treemap:"矩形树图",boxplot:"箱型图",candlestick:"K线图",k:"K线图",heatmap:"热力图",map:"地图",parallel:"平行坐标图",lines:"线图",graph:"关系图",sankey:"桑基图",funnel:"漏斗图",gauge:"仪表盘图",pictorialBar:"象形柱图",themeRiver:"主题河流图",sunburst:"旭日图"}},aria:{general:{withTitle:"这是一个关于“{title}”的图表。",withoutTitle:"这是一个图表，"},series:{single:{prefix:"",withName:"图表类型是{seriesType}，表示{seriesName}。",withoutName:"图表类型是{seriesType}。"},multiple:{prefix:"它由{seriesCount}个图表系列组成。",withName:"第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",withoutName:"第{seriesId}个系列是一个{seriesType}，",separator:{middle:"；",end:"。"}}},data:{allData:"其数据是——",partialData:"其中，前{displayCnt}项是——",withName:"{name}的数据是{value}",withoutName:"{value}",separator:{middle:"，",end:""}}}},Ym=function(t,e){function n(t,e){if("string"!=typeof t)return t;var n=t;return f(e,function(t,e){n=n.replace(new RegExp("\\{\\s*"+e+"\\s*\\}","g"),t)}),n}function i(t){var e=o.get(t);if(null==e){for(var n=t.split("."),i=Xm.aria,r=0;r<n.length;++r)i=i[n[r]];return i}return e}function r(){var t=e.getModel("title").option;return t&&t.length&&(t=t[0]),t&&t.text}function a(t){return Xm.series.typeNames[t]||"自定义图"}var o=e.getModel("aria");if(o.get("show")){if(o.get("description"))return void t.setAttribute("aria-label",o.get("description"));var s=0;e.eachSeries(function(){++s},this);var l,u=o.get("data.maxCount")||10,h=o.get("series.maxCount")||10,c=Math.min(s,h);if(!(1>s)){var d=r();l=d?n(i("general.withTitle"),{title:d}):i("general.withoutTitle");var p=[],g=s>1?"series.multiple.prefix":"series.single.prefix";l+=n(i(g),{seriesCount:s}),e.eachSeries(function(t,e){if(c>e){var r,o=t.get("name"),l="series."+(s>1?"multiple":"single")+".";r=i(o?l+"withName":l+"withoutName"),r=n(r,{seriesId:t.seriesIndex,seriesName:t.get("name"),seriesType:a(t.subType)});var h=t.getData();window.data=h,r+=h.count()>u?n(i("data.partialData"),{displayCnt:u}):i("data.allData");for(var d=[],f=0;f<h.count();f++)if(u>f){var g=h.getName(f),v=Ss(h,f);d.push(n(i(g?"data.withName":"data.withoutName"),{name:g,value:v}))}r+=d.join(i("data.separator.middle"))+i("data.separator.end"),p.push(r)}}),l+=p.join(i("series.multiple.separator.middle"))+i("series.multiple.separator.end"),t.setAttribute("aria-label",l)}}},jm=Math.PI,qm=function(t,e){e=e||{},s(e,{text:"loading",color:"#c23531",textColor:"#000",maskColor:"rgba(255, 255, 255, 0.8)",zlevel:0});var n=new tv({style:{fill:e.maskColor},zlevel:e.zlevel,z:1e4}),i=new av({shape:{startAngle:-jm/2,endAngle:-jm/2+.1,r:10},style:{stroke:e.color,lineCap:"round",lineWidth:5},zlevel:e.zlevel,z:10001}),r=new tv({style:{fill:"none",text:e.text,textPosition:"right",textDistance:10,textFill:e.textColor},zlevel:e.zlevel,z:10001});i.animateShape(!0).when(1e3,{endAngle:3*jm/2}).start("circularInOut"),i.animateShape(!0).when(1e3,{startAngle:3*jm/2}).delay(300).start("circularInOut");var a=new Af;return a.add(i),a.add(r),a.add(n),a.resize=function(){var e=t.getWidth()/2,a=t.getHeight()/2;i.setShape({cx:e,cy:a});var o=i.shape.r;r.setShape({x:e-o,y:a-o,width:2*o,height:2*o}),n.setShape({x:0,y:0,width:t.getWidth(),height:t.getHeight()})},a.resize(),a},Um=Gs.prototype;Um.restoreData=function(t,e){t.restoreData(e),this._stageTaskMap.each(function(t){var e=t.overallTask;e&&e.dirty()})},Um.getPerformArgs=function(t,e){if(t.__pipeline){var n=this._pipelineMap.get(t.__pipeline.id),i=n.context,r=!e&&n.progressiveEnabled&&(!i||i.progressiveRender)&&t.__idxInPipeline>n.blockIndex,a=r?n.step:null,o=i&&i.modDataCount,s=null!=o?Math.ceil(o/a):null;return{step:a,modBy:s,modDataCount:o}}},Um.getPipeline=function(t){return this._pipelineMap.get(t)},Um.updateStreamModes=function(t,e){var n=this._pipelineMap.get(t.uid),i=t.getData(),r=i.count(),a=n.progressiveEnabled&&e.incrementalPrepareRender&&r>=n.threshold,o=t.get("large")&&r>=t.get("largeThreshold"),s="mod"===t.get("progressiveChunkMode")?r:null;t.pipelineContext=n.context={progressiveRender:a,modDataCount:s,large:o}},Um.restorePipelines=function(t){var e=this,n=e._pipelineMap=F();t.eachSeries(function(t){var i=t.getProgressive(),r=t.uid;n.set(r,{id:r,head:null,tail:null,threshold:t.getProgressiveThreshold(),progressiveEnabled:i&&!(t.preventIncremental&&t.preventIncremental()),blockIndex:-1,step:Math.round(i||700),count:0}),el(e,t,t.dataTask)})},Um.prepareStageTasks=function(){var t=this._stageTaskMap,e=this.ecInstance.getModel(),n=this.api;f(this._allHandlers,function(i){var r=t.get(i.uid)||t.set(i.uid,[]);i.reset&&Ys(this,i,r,e,n),i.overallReset&&js(this,i,r,e,n)},this)},Um.prepareView=function(t,e,n,i){var r=t.renderTask,a=r.context;a.model=e,a.ecModel=n,a.api=i,r.__block=!t.incrementalPrepareRender,el(this,e,r)},Um.performDataProcessorTasks=function(t,e){Xs(this,this._dataProcessorHandlers,t,e,{block:!0})},Um.performVisualTasks=function(t,e,n){Xs(this,this._visualHandlers,t,e,n)},Um.performSeriesTasks=function(t){var e;t.eachSeries(function(t){e|=t.dataTask.perform()}),this.unfinished|=e},Um.plan=function(){this._pipelineMap.each(function(t){var e=t.tail;do{if(e.__block){t.blockIndex=e.__idxInPipeline;break}e=e.getUpstream()}while(e)})};var Zm=Um.updatePayload=function(t,e){"remain"!==e&&(t.context.payload=e)},$m=Js(0);Gs.wrapStageHandler=function(t,e){return w(t)&&(t={overallReset:t,seriesType:nl(t)}),t.uid=Xa("stageHandler"),e&&(t.visualType=e),t};var Km,Qm={},Jm={};il(Qm,sm),il(Jm,$o),Qm.eachSeriesByType=Qm.eachRawSeriesByType=function(t){Km=t},Qm.eachComponent=function(t){"series"===t.mainType&&t.subType&&(Km=t.subType)};var ty=["#37A2DA","#32C5E9","#67E0E3","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#E062AE","#E690D1","#e7bcf3","#9d96f5","#8378EA","#96BFFF"],ey={color:ty,colorLayer:[["#37A2DA","#ffd85c","#fd7b5f"],["#37A2DA","#67E0E3","#FFDB5C","#ff9f7f","#E062AE","#9d96f5"],["#37A2DA","#32C5E9","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#e7bcf3","#8378EA","#96BFFF"],ty]},ny="#eee",iy=function(){return{axisLine:{lineStyle:{color:ny}},axisTick:{lineStyle:{color:ny}},axisLabel:{textStyle:{color:ny}},splitLine:{lineStyle:{type:"dashed",color:"#aaa"}},splitArea:{areaStyle:{color:ny}}}},ry=["#dd6b66","#759aa0","#e69d87","#8dc1a9","#ea7e53","#eedd78","#73a373","#73b9bc","#7289ab","#91ca8c","#f49f42"],ay={color:ry,backgroundColor:"#333",tooltip:{axisPointer:{lineStyle:{color:ny},crossStyle:{color:ny}}},legend:{textStyle:{color:ny}},textStyle:{color:ny},title:{textStyle:{color:ny}},toolbox:{iconStyle:{normal:{borderColor:ny}}},dataZoom:{textStyle:{color:ny}},visualMap:{textStyle:{color:ny}},timeline:{lineStyle:{color:ny},itemStyle:{normal:{color:ry[1]}},label:{normal:{textStyle:{color:ny}}},controlStyle:{normal:{color:ny,borderColor:ny}}},timeAxis:iy(),logAxis:iy(),valueAxis:iy(),categoryAxis:iy(),line:{symbol:"circle"},graph:{color:ry},gauge:{title:{textStyle:{color:ny}}},candlestick:{itemStyle:{normal:{color:"#FD1050",color0:"#0CF49B",borderColor:"#FD1050",borderColor0:"#0CF49B"}}}};ay.categoryAxis.splitLine.show=!1,Yv.extend({type:"dataset",defaultOption:{seriesLayoutBy:im,sourceHeader:null,dimensions:null,source:null},optionUpdated:function(){Po(this)}}),Om.extend({type:"dataset"});var oy=Rr.extend({type:"ellipse",shape:{cx:0,cy:0,rx:0,ry:0},buildPath:function(t,e){var n=.5522848,i=e.cx,r=e.cy,a=e.rx,o=e.ry,s=a*n,l=o*n;t.moveTo(i-a,r),t.bezierCurveTo(i-a,r-l,i-s,r-o,i,r-o),t.bezierCurveTo(i+s,r-o,i+a,r-l,i+a,r),t.bezierCurveTo(i+a,r+l,i+s,r+o,i,r+o),t.bezierCurveTo(i-s,r+o,i-a,r+l,i-a,r),t.closePath()}}),sy=/[\s,]+/;al.prototype.parse=function(t,e){e=e||{};var n=rl(t);if(!n)throw new Error("Illegal svg");var i=new Af;this._root=i;var r=n.getAttribute("viewBox")||"",a=parseFloat(n.getAttribute("width")||e.width),o=parseFloat(n.getAttribute("height")||e.height);isNaN(a)&&(a=null),isNaN(o)&&(o=null),ul(n,i,null,!0);for(var s=n.firstChild;s;)this._parseNode(s,i),s=s.nextSibling;var l,u;if(r){var h=B(r).split(sy);h.length>=4&&(l={x:parseFloat(h[0]||0),y:parseFloat(h[1]||0),width:parseFloat(h[2]),height:parseFloat(h[3])})}if(l&&null!=a&&null!=o&&(u=fl(l,a,o),!e.ignoreViewBox)){var c=i;i=new Af,i.add(c),c.scale=u.scale.slice(),c.position=u.position.slice()}return e.ignoreRootClip||null==a||null==o||i.setClipPath(new tv({shape:{x:0,y:0,width:a,height:o}})),{root:i,width:a,height:o,viewBoxRect:l,viewBoxTransform:u}},al.prototype._parseNode=function(t,e){var n=t.nodeName.toLowerCase();"defs"===n?this._isDefine=!0:"text"===n&&(this._isText=!0);var i;if(this._isDefine){var r=uy[n];if(r){var a=r.call(this,t),o=t.getAttribute("id");o&&(this._defs[o]=a)}}else{var r=ly[n];r&&(i=r.call(this,t,e),e.add(i))}for(var s=t.firstChild;s;)1===s.nodeType&&this._parseNode(s,i),3===s.nodeType&&this._isText&&this._parseText(s,i),s=s.nextSibling;"defs"===n?this._isDefine=!1:"text"===n&&(this._isText=!1)},al.prototype._parseText=function(t,e){if(1===t.nodeType){var n=t.getAttribute("dx")||0,i=t.getAttribute("dy")||0;this._textX+=parseFloat(n),this._textY+=parseFloat(i)}var r=new Vg({style:{text:t.textContent,transformText:!0},position:[this._textX||0,this._textY||0]});sl(e,r),ul(t,r,this._defs);var a=r.style.fontSize;a&&9>a&&(r.style.fontSize=9,r.scale=r.scale||[1,1],r.scale[0]*=a/9,r.scale[1]*=a/9);var o=r.getBoundingRect();return this._textX+=o.width,e.add(r),r};var ly={g:function(t,e){var n=new Af;return sl(e,n),ul(t,n,this._defs),n},rect:function(t,e){var n=new tv;return sl(e,n),ul(t,n,this._defs),n.setShape({x:parseFloat(t.getAttribute("x")||0),y:parseFloat(t.getAttribute("y")||0),width:parseFloat(t.getAttribute("width")||0),height:parseFloat(t.getAttribute("height")||0)}),n},circle:function(t,e){var n=new Gg;return sl(e,n),ul(t,n,this._defs),n.setShape({cx:parseFloat(t.getAttribute("cx")||0),cy:parseFloat(t.getAttribute("cy")||0),r:parseFloat(t.getAttribute("r")||0)}),n},line:function(t,e){var n=new nv;return sl(e,n),ul(t,n,this._defs),n.setShape({x1:parseFloat(t.getAttribute("x1")||0),y1:parseFloat(t.getAttribute("y1")||0),x2:parseFloat(t.getAttribute("x2")||0),y2:parseFloat(t.getAttribute("y2")||0)}),n},ellipse:function(t,e){var n=new oy;return sl(e,n),ul(t,n,this._defs),n.setShape({cx:parseFloat(t.getAttribute("cx")||0),cy:parseFloat(t.getAttribute("cy")||0),rx:parseFloat(t.getAttribute("rx")||0),ry:parseFloat(t.getAttribute("ry")||0)}),n},polygon:function(t,e){var n=t.getAttribute("points");n&&(n=ll(n));var i=new $g({shape:{points:n||[]}});return sl(e,i),ul(t,i,this._defs),i},polyline:function(t,e){var n=new Rr;sl(e,n),ul(t,n,this._defs);var i=t.getAttribute("points");i&&(i=ll(i));var r=new Kg({shape:{points:i||[]}});return r},image:function(t,e){var n=new xi;return sl(e,n),ul(t,n,this._defs),n.setStyle({image:t.getAttribute("xlink:href"),x:t.getAttribute("x"),y:t.getAttribute("y"),width:t.getAttribute("width"),height:t.getAttribute("height")}),n},text:function(t,e){var n=t.getAttribute("x")||0,i=t.getAttribute("y")||0,r=t.getAttribute("dx")||0,a=t.getAttribute("dy")||0;this._textX=parseFloat(n)+parseFloat(r),this._textY=parseFloat(i)+parseFloat(a);var o=new Af;return sl(e,o),ul(t,o,this._defs),o},tspan:function(t,e){var n=t.getAttribute("x"),i=t.getAttribute("y");null!=n&&(this._textX=parseFloat(n)),null!=i&&(this._textY=parseFloat(i));var r=t.getAttribute("dx")||0,a=t.getAttribute("dy")||0,o=new Af;return sl(e,o),ul(t,o,this._defs),this._textX+=r,this._textY+=a,o},path:function(t,e){var n=t.getAttribute("d")||"",i=Wr(n);return sl(e,i),ul(t,i,this._defs),i}},uy={lineargradient:function(t){var e=parseInt(t.getAttribute("x1")||0,10),n=parseInt(t.getAttribute("y1")||0,10),i=parseInt(t.getAttribute("x2")||10,10),r=parseInt(t.getAttribute("y2")||0,10),a=new lv(e,n,i,r);return ol(t,a),a},radialgradient:function(){}},hy={fill:"fill",stroke:"stroke","stroke-width":"lineWidth",opacity:"opacity","fill-opacity":"fillOpacity","stroke-opacity":"strokeOpacity","stroke-dasharray":"lineDash","stroke-dashoffset":"lineDashOffset","stroke-linecap":"lineCap","stroke-linejoin":"lineJoin","stroke-miterlimit":"miterLimit","font-family":"fontFamily","font-size":"fontSize","font-style":"fontStyle","font-weight":"fontWeight","text-align":"textAlign","alignment-baseline":"textBaseline"},cy=/url\(\s*#(.*?)\)/,dy=/(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g,fy=/([^\s:;]+)\s*:\s*([^:;]+)/g,py=F(),gy={registerMap:function(t,e,n){var i;return _(e)?i=e:e.svg?i=[{type:"svg",source:e.svg,specialAreas:e.specialAreas}]:(e.geoJson&&!e.features&&(n=e.specialAreas,e=e.geoJson),i=[{type:"geoJSON",source:e,specialAreas:n}]),f(i,function(t){var e=t.type;"geoJson"===e&&(e=t.type="geoJSON");var n=vy[e];n(t)}),py.set(t,i)},retrieveMap:function(t){return py.get(t)}},vy={geoJSON:function(t){var e=t.source;t.geoJSON=b(e)?"undefined"!=typeof JSON&&JSON.parse?JSON.parse(e):new Function("return ("+e+");")():e},svg:function(t){t.svgXML=rl(t.source)}},my=O,yy=f,xy=w,_y=S,wy=Yv.parseClassType,by="4.2.1",Sy={zrender:"4.0.6"},My=1,Ty=1e3,Iy=5e3,Cy=1e3,Dy=2e3,ky=3e3,Ay=4e3,Py=5e3,Ly={PROCESSOR:{FILTER:Ty,STATISTIC:Iy},VISUAL:{LAYOUT:Cy,GLOBAL:Dy,CHART:ky,COMPONENT:Ay,BRUSH:Py}},Oy="__flagInMainProcess",By="__optionUpdated",Ey=/^[a-zA-Z0-9_]+$/;gl.prototype.on=pl("on"),gl.prototype.off=pl("off"),gl.prototype.one=pl("one"),c(gl,Wd);var zy=vl.prototype;zy._onframe=function(){if(!this._disposed){var t=this._scheduler;if(this[By]){var e=this[By].silent;this[Oy]=!0,yl(this),Ry.update.call(this),this[Oy]=!1,this[By]=!1,bl.call(this,e),Sl.call(this,e)}else if(t.unfinished){var n=My,i=this._model,r=this._api;t.unfinished=!1;do{var a=+new Date;t.performSeriesTasks(i),t.performDataProcessorTasks(i),_l(this,i),t.performVisualTasks(i),kl(this,this._model,r,"remain"),n-=+new Date-a}while(n>0&&t.unfinished);t.unfinished||this._zr.flush()}}},zy.getDom=function(){return this._dom},zy.getZr=function(){return this._zr},zy.setOption=function(t,e,n){var i;if(_y(e)&&(n=e.lazyUpdate,i=e.silent,e=e.notMerge),this[Oy]=!0,!this._model||e){var r=new Qo(this._api),a=this._theme,o=this._model=new sm(null,null,a,r);o.scheduler=this._scheduler,o.init(null,null,a,r)}this._model.setOption(t,Vy),n?(this[By]={silent:i},this[Oy]=!1):(yl(this),Ry.update.call(this),this._zr.flush(),this[By]=!1,this[Oy]=!1,bl.call(this,i),Sl.call(this,i))},zy.setTheme=function(){console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0")},zy.getModel=function(){return this._model},zy.getOption=function(){return this._model&&this._model.getOption()},zy.getWidth=function(){return this._zr.getWidth()},zy.getHeight=function(){return this._zr.getHeight()},zy.getDevicePixelRatio=function(){return this._zr.painter.dpr||window.devicePixelRatio||1},zy.getRenderedCanvas=function(t){if(xd.canvasSupported){t=t||{},t.pixelRatio=t.pixelRatio||1,t.backgroundColor=t.backgroundColor||this._model.get("backgroundColor");var e=this._zr;return e.painter.getRenderedCanvas(t)}},zy.getSvgDataUrl=function(){if(xd.svgSupported){var t=this._zr,e=t.storage.getDisplayList();return f(e,function(t){t.stopAnimation(!0)}),t.painter.pathToDataUrl()}},zy.getDataURL=function(t){t=t||{};var e=t.excludeComponents,n=this._model,i=[],r=this;yy(e,function(t){n.eachComponent({mainType:t},function(t){var e=r._componentsMap[t.__viewId];e.group.ignore||(i.push(e),e.group.ignore=!0)})});var a="svg"===this._zr.painter.getType()?this.getSvgDataUrl():this.getRenderedCanvas(t).toDataURL("image/"+(t&&t.type||"png"));return yy(i,function(t){t.group.ignore=!1}),a},zy.getConnectedDataURL=function(t){if(xd.canvasSupported){var e=this.group,n=Math.min,r=Math.max,a=1/0;if(Uy[e]){var o=a,s=a,l=-a,u=-a,h=[],c=t&&t.pixelRatio||1;f(qy,function(a){if(a.group===e){var c=a.getRenderedCanvas(i(t)),d=a.getDom().getBoundingClientRect();o=n(d.left,o),s=n(d.top,s),l=r(d.right,l),u=r(d.bottom,u),h.push({dom:c,left:d.left,top:d.top})}}),o*=c,s*=c,l*=c,u*=c;var d=l-o,p=u-s,g=Ad();g.width=d,g.height=p;var v=Pi(g);return yy(h,function(t){var e=new xi({style:{x:t.left*c-o,y:t.top*c-s,image:t.dom}});v.add(e)}),v.refreshImmediately(),g.toDataURL("image/"+(t&&t.type||"png"))}return this.getDataURL(t)}},zy.convertToPixel=x(ml,"convertToPixel"),zy.convertFromPixel=x(ml,"convertFromPixel"),zy.containPixel=function(t,e){var n,i=this._model;return t=ji(i,t),f(t,function(t,i){i.indexOf("Models")>=0&&f(t,function(t){var r=t.coordinateSystem;if(r&&r.containPoint)n|=!!r.containPoint(e);else if("seriesModels"===i){var a=this._chartsMap[t.__viewId];a&&a.containPoint&&(n|=a.containPoint(e,t))}},this)},this),!!n},zy.getVisual=function(t,e){var n=this._model;t=ji(n,t,{defaultMainType:"series"});var i=t.seriesModel,r=i.getData(),a=t.hasOwnProperty("dataIndexInside")?t.dataIndexInside:t.hasOwnProperty("dataIndex")?r.indexOfRawIndex(t.dataIndex):null;return null!=a?r.getItemVisual(a,e):r.getVisual(e)},zy.getViewOfComponentModel=function(t){return this._componentsMap[t.__viewId]},zy.getViewOfSeriesModel=function(t){return this._chartsMap[t.__viewId]};var Ry={prepareAndUpdate:function(t){yl(this),Ry.update.call(this,t)},update:function(t){var e=this._model,n=this._api,i=this._zr,r=this._coordSysMgr,a=this._scheduler;if(e){a.restoreData(e,t),a.performSeriesTasks(e),r.create(e,n),a.performDataProcessorTasks(e,t),_l(this,e),r.update(e,n),Il(e),a.performVisualTasks(e,t),Cl(this,e,n,t);var o=e.get("backgroundColor")||"transparent";if(xd.canvasSupported)i.setBackgroundColor(o);else{var s=Ye(o);o=tn(s,"rgb"),0===s[3]&&(o="transparent")}Al(e,n)}},updateTransform:function(t){var e=this._model,n=this,i=this._api;if(e){var r=[];e.eachComponent(function(a,o){var s=n.getViewOfComponentModel(o);if(s&&s.__alive)if(s.updateTransform){var l=s.updateTransform(o,e,i,t);l&&l.update&&r.push(s)}else r.push(s)});var a=F();e.eachSeries(function(r){var o=n._chartsMap[r.__viewId];if(o.updateTransform){var s=o.updateTransform(r,e,i,t);s&&s.update&&a.set(r.uid,1)}else a.set(r.uid,1)}),Il(e),this._scheduler.performVisualTasks(e,t,{setDirty:!0,dirtyMap:a}),kl(n,e,i,t,a),Al(e,this._api)}},updateView:function(t){var e=this._model;e&&(zs.markUpdateMethod(t,"updateView"),Il(e),this._scheduler.performVisualTasks(e,t,{setDirty:!0}),Cl(this,this._model,this._api,t),Al(e,this._api))},updateVisual:function(t){Ry.update.call(this,t)},updateLayout:function(t){Ry.update.call(this,t)}};zy.resize=function(t){this._zr.resize(t);var e=this._model;if(this._loadingFX&&this._loadingFX.resize(),e){var n=e.resetOption("media"),i=t&&t.silent;this[Oy]=!0,n&&yl(this),Ry.update.call(this),this[Oy]=!1,bl.call(this,i),Sl.call(this,i)}},zy.showLoading=function(t,e){if(_y(t)&&(e=t,t=""),t=t||"default",this.hideLoading(),jy[t]){var n=jy[t](this._api,e),i=this._zr;this._loadingFX=n,i.add(n)}},zy.hideLoading=function(){this._loadingFX&&this._zr.remove(this._loadingFX),this._loadingFX=null},zy.makeActionFromEvent=function(t){var e=o({},t);return e.type=Hy[t.type],e},zy.dispatchAction=function(t,e){if(_y(e)||(e={silent:!!e}),Ny[t.type]&&this._model){if(this[Oy])return void this._pendingActions.push(t);wl.call(this,t,e.silent),e.flush?this._zr.flush(!0):e.flush!==!1&&xd.browser.weChat&&this._throttledZrFlush(),bl.call(this,e.silent),Sl.call(this,e.silent)}},zy.appendData=function(t){var e=t.seriesIndex,n=this.getModel(),i=n.getSeriesByIndex(e);i.appendData(t),this._scheduler.unfinished=!0},zy.on=pl("on"),zy.off=pl("off"),zy.one=pl("one");var Fy=["click","dblclick","mouseover","mouseout","mousemove","mousedown","mouseup","globalout","contextmenu"];zy._initEvents=function(){yy(Fy,function(t){var e=function(e){var n,i=this.getModel(),r=e.target,a="globalout"===t;if(a)n={};else if(r&&null!=r.dataIndex){var s=r.dataModel||i.getSeriesByIndex(r.seriesIndex);n=s&&s.getDataParams(r.dataIndex,r.dataType,r)||{}}else r&&r.eventData&&(n=o({},r.eventData));if(n){var l=n.componentType,u=n.componentIndex;("markLine"===l||"markPoint"===l||"markArea"===l)&&(l="series",u=n.seriesIndex);var h=l&&null!=u&&i.getComponent(l,u),c=h&&this["series"===h.mainType?"_chartsMap":"_componentsMap"][h.__viewId];n.event=e,n.type=t,this._ecEventProcessor.eventInfo={targetEl:r,packedEvent:n,model:h,view:c},this.trigger(t,n)}};e.zrEventfulCallAtLast=!0,this._zr.on(t,e,this)},this),yy(Hy,function(t,e){this._messageCenter.on(e,function(t){this.trigger(e,t)},this)},this)},zy.isDisposed=function(){return this._disposed},zy.clear=function(){this.setOption({series:[]},!0)},zy.dispose=function(){if(!this._disposed){this._disposed=!0,Ui(this.getDom(),Ky,"");var t=this._api,e=this._model;yy(this._componentsViews,function(n){n.dispose(e,t)}),yy(this._chartsViews,function(n){n.dispose(e,t)}),this._zr.dispose(),delete qy[this.id]}},c(vl,Wd),El.prototype={constructor:El,normalizeQuery:function(t){var e={},n={},i={};if(b(t)){var r=wy(t);e.mainType=r.main||null,e.subType=r.sub||null}else{var a=["Index","Name","Id"],o={name:1,dataIndex:1,dataType:1};f(t,function(t,r){for(var s=!1,l=0;l<a.length;l++){var u=a[l],h=r.lastIndexOf(u);if(h>0&&h===r.length-u.length){var c=r.slice(0,h);"data"!==c&&(e.mainType=c,e[u.toLowerCase()]=t,s=!0)}}o.hasOwnProperty(r)&&(n[r]=t,s=!0),s||(i[r]=t)})}return{cptQuery:e,dataQuery:n,otherQuery:i}},filter:function(t,e){function n(t,e,n,i){return null==t[n]||e[i||n]===t[n]}var i=this.eventInfo;if(!i)return!0;var r=i.targetEl,a=i.packedEvent,o=i.model,s=i.view;if(!o||!s)return!0;var l=e.cptQuery,u=e.dataQuery;return n(l,o,"mainType")&&n(l,o,"subType")&&n(l,o,"index","componentIndex")&&n(l,o,"name")&&n(l,o,"id")&&n(u,a,"name")&&n(u,a,"dataIndex")&&n(u,a,"dataType")&&(!s.filterForExposedEvent||s.filterForExposedEvent(t,e.otherQuery,r,a))},afterTrigger:function(){this.eventInfo=null}};var Ny={},Hy={},Wy=[],Vy=[],Gy=[],Xy=[],Yy={},jy={},qy={},Uy={},Zy=new Date-0,$y=new Date-0,Ky="_echarts_instance_",Qy=Nl;Kl(Dy,Gm),Xl(wm),Yl(Iy,bm),Jl("default",qm),ql({type:"highlight",event:"highlight",update:"highlight"},H),ql({type:"downplay",event:"downplay",update:"downplay"},H),Gl("light",ey),Gl("dark",ay);var Jy={};lu.prototype={constructor:lu,add:function(t){return this._add=t,this},update:function(t){return this._update=t,this},remove:function(t){return this._remove=t,this},execute:function(){var t,e=this._old,n=this._new,i={},r={},a=[],o=[];for(uu(e,i,a,"_oldKeyGetter",this),uu(n,r,o,"_newKeyGetter",this),t=0;t<e.length;t++){var s=a[t],l=r[s];if(null!=l){var u=l.length;u?(1===u&&(r[s]=null),l=l.unshift()):r[s]=null,this._update&&this._update(l,t)}else this._remove&&this._remove(t)}for(var t=0;t<o.length;t++){var s=o[t];if(r.hasOwnProperty(s)){var l=r[s];if(null==l)continue;if(l.length)for(var h=0,u=l.length;u>h;h++)this._add&&this._add(l[h]);else this._add&&this._add(l)}}}};var tx=F(["tooltip","label","itemName","itemId","seriesName"]),ex=S,nx="undefined",ix=-1,rx="e\x00\x00",ax={"float":typeof Float64Array===nx?Array:Float64Array,"int":typeof Int32Array===nx?Array:Int32Array,ordinal:Array,number:Array,time:Array},ox=typeof Uint32Array===nx?Array:Uint32Array,sx=typeof Int32Array===nx?Array:Int32Array,lx=typeof Uint16Array===nx?Array:Uint16Array,ux=["hasItemOption","_nameList","_idList","_invertedIndicesMap","_rawData","_chunkSize","_chunkCount","_dimValueGetter","_count","_rawCount","_nameDimIdx","_idDimIdx"],hx=["_extent","_approximateExtent","_rawExtent"],cx=function(t,e){t=t||["x","y"];for(var n={},i=[],r={},a=0;a<t.length;a++){var o=t[a];b(o)&&(o={name:o});var s=o.name;o.type=o.type||"float",o.coordDim||(o.coordDim=s,o.coordDimIndex=0),o.otherDims=o.otherDims||{},i.push(s),n[s]=o,o.index=a,o.createInvertedIndices&&(r[s]=[])}this.dimensions=i,this._dimensionInfos=n,this.hostModel=e,this.dataType,this._indices=null,this._count=0,this._rawCount=0,this._storage={},this._nameList=[],this._idList=[],this._optionModels=[],this._visual={},this._layout={},this._itemVisuals=[],this.hasItemVisual={},this._itemLayouts=[],this._graphicEls=[],this._chunkSize=1e5,this._chunkCount=0,this._rawData,this._rawExtent={},this._extent={},this._approximateExtent={},this._dimensionsSummary=hu(this),this._invertedIndicesMap=r,this._calculationInfo={}},dx=cx.prototype;dx.type="list",dx.hasItemOption=!0,dx.getDimension=function(t){return isNaN(t)||(t=this.dimensions[t]||t),t},dx.getDimensionInfo=function(t){return this._dimensionInfos[this.getDimension(t)]},dx.getDimensionsOnCoord=function(){return this._dimensionsSummary.dataDimsOnCoord.slice()},dx.mapDimension=function(t,e){var n=this._dimensionsSummary;if(null==e)return n.encodeFirstDimNotExtra[t];var i=n.encode[t];return e===!0?(i||[]).slice():i&&i[e]},dx.initData=function(t,e,n){var i=Ao.isInstance(t)||d(t);i&&(t=new vs(t,this.dimensions.length)),this._rawData=t,this._storage={},this._indices=null,this._nameList=e||[],this._idList=[],this._nameRepeatCount={},n||(this.hasItemOption=!1),this.defaultDimValueGetter=Im[this._rawData.getSource().sourceFormat],this._dimValueGetter=n=n||this.defaultDimValueGetter,this._dimValueGetterArrayRows=Im.arrayRows,this._rawExtent={},this._initDataFromProvider(0,t.count()),t.pure&&(this.hasItemOption=!1)},dx.getProvider=function(){return this._rawData},dx.appendData=function(t){var e=this._rawData,n=this.count();e.appendData(t);var i=e.count();e.persistent||(i+=n),this._initDataFromProvider(n,i)},dx.appendValues=function(t,e){for(var n=this._chunkSize,i=this._storage,r=this.dimensions,a=r.length,o=this._rawExtent,s=this.count(),l=s+Math.max(t.length,e?e.length:0),u=this._chunkCount,h=0;a>h;h++){var c=r[h];o[c]||(o[c]=Tu()),i[c]||(i[c]=[]),vu(i,this._dimensionInfos[c],n,u,l),this._chunkCount=i[c].length}for(var d=new Array(a),f=s;l>f;f++){for(var p=f-s,g=Math.floor(f/n),v=f%n,m=0;a>m;m++){var c=r[m],y=this._dimValueGetterArrayRows(t[p]||d,c,p,m);i[c][g][v]=y;var x=o[c];y<x[0]&&(x[0]=y),y>x[1]&&(x[1]=y)}e&&(this._nameList[f]=e[p])}this._rawCount=this._count=l,this._extent={},mu(this)},dx._initDataFromProvider=function(t,e){if(!(t>=e)){for(var n,i=this._chunkSize,r=this._rawData,a=this._storage,o=this.dimensions,s=o.length,l=this._dimensionInfos,u=this._nameList,h=this._idList,c=this._rawExtent,d=this._nameRepeatCount={},f=this._chunkCount,p=0;s>p;p++){var g=o[p];c[g]||(c[g]=Tu());var v=l[g];0===v.otherDims.itemName&&(n=this._nameDimIdx=p),0===v.otherDims.itemId&&(this._idDimIdx=p),a[g]||(a[g]=[]),vu(a,v,i,f,e),this._chunkCount=a[g].length}for(var m=new Array(s),y=t;e>y;y++){m=r.getItem(y,m);for(var x=Math.floor(y/i),_=y%i,w=0;s>w;w++){var g=o[w],b=a[g][x],S=this._dimValueGetter(m,g,y,w);b[_]=S;var M=c[g];S<M[0]&&(M[0]=S),S>M[1]&&(M[1]=S)}if(!r.pure){var T=u[y];if(m&&null==T)if(null!=m.name)u[y]=T=m.name;else if(null!=n){var I=o[n],C=a[I][x];if(C){T=C[_];var D=l[I].ordinalMeta;D&&D.categories.length&&(T=D.categories[T])}}var k=null==m?null:m.id;null==k&&null!=T&&(d[T]=d[T]||0,k=T,d[T]>0&&(k+="__ec__"+d[T]),d[T]++),null!=k&&(h[y]=k)}}!r.persistent&&r.clean&&r.clean(),this._rawCount=this._count=e,this._extent={},mu(this)}},dx.count=function(){return this._count},dx.getIndices=function(){var t,e=this._indices;if(e){var n=e.constructor,i=this._count;if(n===Array){t=new n(i);for(var r=0;i>r;r++)t[r]=e[r]}else t=new n(e.buffer,0,i)}else for(var n=fu(this),t=new n(this.count()),r=0;r<t.length;r++)t[r]=r;return t},dx.get=function(t,e){if(!(e>=0&&e<this._count))return 0/0;var n=this._storage;if(!n[t])return 0/0;e=this.getRawIndex(e);var i=Math.floor(e/this._chunkSize),r=e%this._chunkSize,a=n[t][i],o=a[r];return o},dx.getByRawIndex=function(t,e){if(!(e>=0&&e<this._rawCount))return 0/0;var n=this._storage[t];if(!n)return 0/0;var i=Math.floor(e/this._chunkSize),r=e%this._chunkSize,a=n[i];return a[r]},dx._getFast=function(t,e){var n=Math.floor(e/this._chunkSize),i=e%this._chunkSize,r=this._storage[t][n];return r[i]},dx.getValues=function(t,e){var n=[];_(t)||(e=t,t=this.dimensions);for(var i=0,r=t.length;r>i;i++)n.push(this.get(t[i],e));return n},dx.hasValue=function(t){for(var e=this._dimensionsSummary.dataDimsOnCoord,n=this._dimensionInfos,i=0,r=e.length;r>i;i++)if("ordinal"!==n[e[i]].type&&isNaN(this.get(e[i],t)))return!1;return!0},dx.getDataExtent=function(t){t=this.getDimension(t);var e=this._storage[t],n=Tu();if(!e)return n;var i,r=this.count(),a=!this._indices;if(a)return this._rawExtent[t].slice();if(i=this._extent[t])return i.slice();i=n;for(var o=i[0],s=i[1],l=0;r>l;l++){var u=this._getFast(t,this.getRawIndex(l));o>u&&(o=u),u>s&&(s=u)}return i=[o,s],this._extent[t]=i,i},dx.getApproximateExtent=function(t){return t=this.getDimension(t),this._approximateExtent[t]||this.getDataExtent(t)},dx.setApproximateExtent=function(t,e){e=this.getDimension(e),this._approximateExtent[e]=t.slice()},dx.getCalculationInfo=function(t){return this._calculationInfo[t]},dx.setCalculationInfo=function(t,e){ex(t)?o(this._calculationInfo,t):this._calculationInfo[t]=e},dx.getSum=function(t){var e=this._storage[t],n=0;if(e)for(var i=0,r=this.count();r>i;i++){var a=this.get(t,i);isNaN(a)||(n+=a)}return n},dx.getMedian=function(t){var e=[];this.each(t,function(t){isNaN(t)||e.push(t)});var n=[].concat(e).sort(function(t,e){return t-e}),i=this.count();return 0===i?0:i%2===1?n[(i-1)/2]:(n[i/2]+n[i/2-1])/2},dx.rawIndexOf=function(t,e){var n=t&&this._invertedIndicesMap[t],i=n[e];return null==i||isNaN(i)?ix:i},dx.indexOfName=function(t){for(var e=0,n=this.count();n>e;e++)if(this.getName(e)===t)return e;return-1},dx.indexOfRawIndex=function(t){if(!this._indices)return t;if(t>=this._rawCount||0>t)return-1;var e=this._indices,n=e[t];if(null!=n&&n<this._count&&n===t)return t;for(var i=0,r=this._count-1;r>=i;){var a=(i+r)/2|0;if(e[a]<t)i=a+1;else{if(!(e[a]>t))return a;r=a-1}}return-1},dx.indicesOfNearest=function(t,e,n){var i=this._storage,r=i[t],a=[];if(!r)return a;null==n&&(n=1/0);for(var o=Number.MAX_VALUE,s=-1,l=0,u=this.count();u>l;l++){var h=e-this.get(t,l),c=Math.abs(h);n>=h&&o>=c&&((o>c||h>=0&&0>s)&&(o=c,s=h,a.length=0),a.push(l))
}return a},dx.getRawIndex=xu,dx.getRawDataItem=function(t){if(this._rawData.persistent)return this._rawData.getItem(this.getRawIndex(t));for(var e=[],n=0;n<this.dimensions.length;n++){var i=this.dimensions[n];e.push(this.get(i,t))}return e},dx.getName=function(t){var e=this.getRawIndex(t);return this._nameList[e]||yu(this,this._nameDimIdx,e)||""},dx.getId=function(t){return wu(this,this.getRawIndex(t))},dx.each=function(t,e,n,i){if(this._count){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this,t=p(bu(t),this.getDimension,this);for(var r=t.length,a=0;a<this.count();a++)switch(r){case 0:e.call(n,a);break;case 1:e.call(n,this.get(t[0],a),a);break;case 2:e.call(n,this.get(t[0],a),this.get(t[1],a),a);break;default:for(var o=0,s=[];r>o;o++)s[o]=this.get(t[o],a);s[o]=a,e.apply(n,s)}}},dx.filterSelf=function(t,e,n,i){if(this._count){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this,t=p(bu(t),this.getDimension,this);for(var r=this.count(),a=fu(this),o=new a(r),s=[],l=t.length,u=0,h=t[0],c=0;r>c;c++){var d,f=this.getRawIndex(c);if(0===l)d=e.call(n,c);else if(1===l){var g=this._getFast(h,f);d=e.call(n,g,c)}else{for(var v=0;l>v;v++)s[v]=this._getFast(h,f);s[v]=c,d=e.apply(n,s)}d&&(o[u++]=f)}return r>u&&(this._indices=o),this._count=u,this._extent={},this.getRawIndex=this._indices?_u:xu,this}},dx.selectRange=function(t){if(this._count){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);var i=e.length;if(i){var r=this.count(),a=fu(this),o=new a(r),s=0,l=e[0],u=t[l][0],h=t[l][1],c=!1;if(!this._indices){var d=0;if(1===i){for(var f=this._storage[e[0]],p=0;p<this._chunkCount;p++)for(var g=f[p],v=Math.min(this._count-p*this._chunkSize,this._chunkSize),m=0;v>m;m++){var y=g[m];(y>=u&&h>=y||isNaN(y))&&(o[s++]=d),d++}c=!0}else if(2===i){for(var f=this._storage[l],x=this._storage[e[1]],_=t[e[1]][0],w=t[e[1]][1],p=0;p<this._chunkCount;p++)for(var g=f[p],b=x[p],v=Math.min(this._count-p*this._chunkSize,this._chunkSize),m=0;v>m;m++){var y=g[m],S=b[m];(y>=u&&h>=y||isNaN(y))&&(S>=_&&w>=S||isNaN(S))&&(o[s++]=d),d++}c=!0}}if(!c)if(1===i)for(var m=0;r>m;m++){var M=this.getRawIndex(m),y=this._getFast(l,M);(y>=u&&h>=y||isNaN(y))&&(o[s++]=M)}else for(var m=0;r>m;m++){for(var T=!0,M=this.getRawIndex(m),p=0;i>p;p++){var I=e[p],y=this._getFast(n,M);(y<t[I][0]||y>t[I][1])&&(T=!1)}T&&(o[s++]=this.getRawIndex(m))}return r>s&&(this._indices=o),this._count=s,this._extent={},this.getRawIndex=this._indices?_u:xu,this}}},dx.mapArray=function(t,e,n,i){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this;var r=[];return this.each(t,function(){r.push(e&&e.apply(this,arguments))},n),r},dx.map=function(t,e,n,i){n=n||i||this,t=p(bu(t),this.getDimension,this);var r=Su(this,t);r._indices=this._indices,r.getRawIndex=r._indices?_u:xu;for(var a=r._storage,o=[],s=this._chunkSize,l=t.length,u=this.count(),h=[],c=r._rawExtent,d=0;u>d;d++){for(var f=0;l>f;f++)h[f]=this.get(t[f],d);h[l]=d;var g=e&&e.apply(n,h);if(null!=g){"object"!=typeof g&&(o[0]=g,g=o);for(var v=this.getRawIndex(d),m=Math.floor(v/s),y=v%s,x=0;x<g.length;x++){var _=t[x],w=g[x],b=c[_],S=a[_];S&&(S[m][y]=w),w<b[0]&&(b[0]=w),w>b[1]&&(b[1]=w)}}}return r},dx.downSample=function(t,e,n,i){for(var r=Su(this,[t]),a=r._storage,o=[],s=Math.floor(1/e),l=a[t],u=this.count(),h=this._chunkSize,c=r._rawExtent[t],d=new(fu(this))(u),f=0,p=0;u>p;p+=s){s>u-p&&(s=u-p,o.length=s);for(var g=0;s>g;g++){var v=this.getRawIndex(p+g),m=Math.floor(v/h),y=v%h;o[g]=l[m][y]}var x=n(o),_=this.getRawIndex(Math.min(p+i(o,x)||0,u-1)),w=Math.floor(_/h),b=_%h;l[w][b]=x,x<c[0]&&(c[0]=x),x>c[1]&&(c[1]=x),d[f++]=_}return r._count=f,r._indices=d,r.getRawIndex=_u,r},dx.getItemModel=function(t){var e=this.hostModel;return new Wa(this.getRawDataItem(t),e,e&&e.ecModel)},dx.diff=function(t){var e=this;return new lu(t?t.getIndices():[],this.getIndices(),function(e){return wu(t,e)},function(t){return wu(e,t)})},dx.getVisual=function(t){var e=this._visual;return e&&e[t]},dx.setVisual=function(t,e){if(ex(t))for(var n in t)t.hasOwnProperty(n)&&this.setVisual(n,t[n]);else this._visual=this._visual||{},this._visual[t]=e},dx.setLayout=function(t,e){if(ex(t))for(var n in t)t.hasOwnProperty(n)&&this.setLayout(n,t[n]);else this._layout[t]=e},dx.getLayout=function(t){return this._layout[t]},dx.getItemLayout=function(t){return this._itemLayouts[t]},dx.setItemLayout=function(t,e,n){this._itemLayouts[t]=n?o(this._itemLayouts[t]||{},e):e},dx.clearItemLayouts=function(){this._itemLayouts.length=0},dx.getItemVisual=function(t,e,n){var i=this._itemVisuals[t],r=i&&i[e];return null!=r||n?r:this.getVisual(e)},dx.setItemVisual=function(t,e,n){var i=this._itemVisuals[t]||{},r=this.hasItemVisual;if(this._itemVisuals[t]=i,ex(e))for(var a in e)e.hasOwnProperty(a)&&(i[a]=e[a],r[a]=!0);else i[e]=n,r[e]=!0},dx.clearAllVisual=function(){this._visual={},this._itemVisuals=[],this.hasItemVisual={}};var fx=function(t){t.seriesIndex=this.seriesIndex,t.dataIndex=this.dataIndex,t.dataType=this.dataType};dx.setItemGraphicEl=function(t,e){var n=this.hostModel;e&&(e.dataIndex=t,e.dataType=this.dataType,e.seriesIndex=n&&n.seriesIndex,"group"===e.type&&e.traverse(fx,e)),this._graphicEls[t]=e},dx.getItemGraphicEl=function(t){return this._graphicEls[t]},dx.eachItemGraphicEl=function(t,e){f(this._graphicEls,function(n,i){n&&t&&t.call(e,n,i)})},dx.cloneShallow=function(t){if(!t){var e=p(this.dimensions,this.getDimensionInfo,this);t=new cx(e,this.hostModel)}if(t._storage=this._storage,gu(t,this),this._indices){var n=this._indices.constructor;t._indices=new n(this._indices)}else t._indices=null;return t.getRawIndex=t._indices?_u:xu,t},dx.wrapMethod=function(t,e){var n=this[t];"function"==typeof n&&(this.__wrappedMethods=this.__wrappedMethods||[],this.__wrappedMethods.push(t),this[t]=function(){var t=n.apply(this,arguments);return e.apply(this,[t].concat(P(arguments)))})},dx.TRANSFERABLE_METHODS=["cloneShallow","downSample","map"],dx.CHANGABLE_METHODS=["filterSelf","selectRange"];var px=function(t,e){return e=e||{},Iu(e.coordDimensions||[],t,{dimsDef:e.dimensionsDefine||t.dimensionsDefine,encodeDef:e.encodeDefine||t.encodeDefine,dimCount:e.dimensionsCount,generateCoord:e.generateCoord,generateCoordCount:e.generateCoordCount})};Eu.prototype.parse=function(t){return t},Eu.prototype.getSetting=function(t){return this._setting[t]},Eu.prototype.contain=function(t){var e=this._extent;return t>=e[0]&&t<=e[1]},Eu.prototype.normalize=function(t){var e=this._extent;return e[1]===e[0]?.5:(t-e[0])/(e[1]-e[0])},Eu.prototype.scale=function(t){var e=this._extent;return t*(e[1]-e[0])+e[0]},Eu.prototype.unionExtent=function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1])},Eu.prototype.unionExtentFromData=function(t,e){this.unionExtent(t.getApproximateExtent(e))},Eu.prototype.getExtent=function(){return this._extent.slice()},Eu.prototype.setExtent=function(t,e){var n=this._extent;isNaN(t)||(n[0]=t),isNaN(e)||(n[1]=e)},Eu.prototype.isBlank=function(){return this._isBlank},Eu.prototype.setBlank=function(t){this._isBlank=t},Eu.prototype.getLabel=null,Ji(Eu),ir(Eu,{registerWhenExtend:!0}),zu.createByAxisModel=function(t){var e=t.option,n=e.data,i=n&&p(n,Fu);return new zu({categories:i,needCollect:!i,deduplication:e.dedplication!==!1})};var gx=zu.prototype;gx.getOrdinal=function(t){return Ru(this).get(t)},gx.parseAndCollect=function(t){var e,n=this._needCollect;if("string"!=typeof t&&!n)return t;if(n&&!this._deduplication)return e=this.categories.length,this.categories[e]=t,e;var i=Ru(this);return e=i.get(t),null==e&&(n?(e=this.categories.length,this.categories[e]=t,i.set(t,e)):e=0/0),e};var vx=Eu.prototype,mx=Eu.extend({type:"ordinal",init:function(t,e){(!t||_(t))&&(t=new zu({categories:t})),this._ordinalMeta=t,this._extent=e||[0,t.categories.length-1]},parse:function(t){return"string"==typeof t?this._ordinalMeta.getOrdinal(t):Math.round(t)},contain:function(t){return t=this.parse(t),vx.contain.call(this,t)&&null!=this._ordinalMeta.categories[t]},normalize:function(t){return vx.normalize.call(this,this.parse(t))},scale:function(t){return Math.round(vx.scale.call(this,t))},getTicks:function(){for(var t=[],e=this._extent,n=e[0];n<=e[1];)t.push(n),n++;return t},getLabel:function(t){return this.isBlank()?void 0:this._ordinalMeta.categories[t]},count:function(){return this._extent[1]-this._extent[0]+1},unionExtentFromData:function(t,e){this.unionExtent(t.getApproximateExtent(e))},getOrdinalMeta:function(){return this._ordinalMeta},niceTicks:H,niceExtent:H});mx.create=function(){return new mx};var yx=$a,xx=$a,_x=Eu.extend({type:"interval",_interval:0,_intervalPrecision:2,setExtent:function(t,e){var n=this._extent;isNaN(t)||(n[0]=parseFloat(t)),isNaN(e)||(n[1]=parseFloat(e))},unionExtent:function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]),_x.prototype.setExtent.call(this,e[0],e[1])},getInterval:function(){return this._interval},setInterval:function(t){this._interval=t,this._niceExtent=this._extent.slice(),this._intervalPrecision=Hu(t)},getTicks:function(){return Gu(this._interval,this._extent,this._niceExtent,this._intervalPrecision)},getLabel:function(t,e){if(null==t)return"";var n=e&&e.precision;return null==n?n=Ja(t)||0:"auto"===n&&(n=this._intervalPrecision),t=xx(t,n,!0),co(t)},niceTicks:function(t,e,n){t=t||5;var i=this._extent,r=i[1]-i[0];if(isFinite(r)){0>r&&(r=-r,i.reverse());var a=Nu(i,t,e,n);this._intervalPrecision=a.intervalPrecision,this._interval=a.interval,this._niceExtent=a.niceTickExtent}},niceExtent:function(t){var e=this._extent;if(e[0]===e[1])if(0!==e[0]){var n=e[0];t.fixMax?e[0]-=n/2:(e[1]+=n/2,e[0]-=n/2)}else e[1]=1;var i=e[1]-e[0];isFinite(i)||(e[0]=0,e[1]=1),this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var r=this._interval;t.fixMin||(e[0]=xx(Math.floor(e[0]/r)*r)),t.fixMax||(e[1]=xx(Math.ceil(e[1]/r)*r))}});_x.create=function(){return new _x};var bx="__ec_stack_",Sx=.5,Mx="undefined"!=typeof Float32Array?Float32Array:Array,Tx=({seriesType:"bar",plan:Em(),reset:function(t){function e(t,e){for(var n,c=new Mx(2*t.count),d=[],f=[],p=0;null!=(n=t.next());)f[u]=e.get(o,n),f[1-u]=e.get(s,n),d=i.dataToPoint(f,null,d),c[p++]=d[0],c[p++]=d[1];e.setLayout({largePoints:c,barWidth:h,valueAxisStart:Qu(r,a,!1),valueAxisHorizontal:l})}if($u(t)&&Ku(t)){var n=t.getData(),i=t.coordinateSystem,r=i.getBaseAxis(),a=i.getOtherAxis(r),o=n.mapDimension(a.dim),s=n.mapDimension(r.dim),l=a.isHorizontal(),u=l?0:1,h=Zu(qu([t]),r,t).width;return h>Sx||(h=Sx),{progress:e}}}},_x.prototype),Ix=Math.ceil,Cx=Math.floor,Dx=1e3,kx=60*Dx,Ax=60*kx,Px=24*Ax,Lx=function(t,e,n,i){for(;i>n;){var r=n+i>>>1;t[r][1]<e?n=r+1:i=r}return n},Ox=_x.extend({type:"time",getLabel:function(t){var e=this._stepLvl,n=new Date(t);return xo(e[0],n,this.getSetting("useUTC"))},niceExtent:function(t){var e=this._extent;if(e[0]===e[1]&&(e[0]-=Px,e[1]+=Px),e[1]===-1/0&&1/0===e[0]){var n=new Date;e[1]=+new Date(n.getFullYear(),n.getMonth(),n.getDate()),e[0]=e[1]-Px}this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var i=this._interval;t.fixMin||(e[0]=$a(Cx(e[0]/i)*i)),t.fixMax||(e[1]=$a(Ix(e[1]/i)*i))},niceTicks:function(t,e,n){t=t||10;var i=this._extent,r=i[1]-i[0],a=r/t;null!=e&&e>a&&(a=e),null!=n&&a>n&&(a=n);var o=Bx.length,s=Lx(Bx,a,0,o),l=Bx[Math.min(s,o-1)],u=l[1];if("year"===l[0]){var h=r/u,c=so(h/t,!0);u*=c}var d=this.getSetting("useUTC")?0:60*new Date(+i[0]||+i[1]).getTimezoneOffset()*1e3,f=[Math.round(Ix((i[0]-d)/u)*u+d),Math.round(Cx((i[1]-d)/u)*u+d)];Vu(f,i),this._stepLvl=l,this._interval=u,this._niceExtent=f},parse:function(t){return+ro(t)}});f(["contain","normalize"],function(t){Ox.prototype[t]=function(e){return Tx[t].call(this,this.parse(e))}});var Bx=[["hh:mm:ss",Dx],["hh:mm:ss",5*Dx],["hh:mm:ss",10*Dx],["hh:mm:ss",15*Dx],["hh:mm:ss",30*Dx],["hh:mm\nMM-dd",kx],["hh:mm\nMM-dd",5*kx],["hh:mm\nMM-dd",10*kx],["hh:mm\nMM-dd",15*kx],["hh:mm\nMM-dd",30*kx],["hh:mm\nMM-dd",Ax],["hh:mm\nMM-dd",2*Ax],["hh:mm\nMM-dd",6*Ax],["hh:mm\nMM-dd",12*Ax],["MM-dd\nyyyy",Px],["MM-dd\nyyyy",2*Px],["MM-dd\nyyyy",3*Px],["MM-dd\nyyyy",4*Px],["MM-dd\nyyyy",5*Px],["MM-dd\nyyyy",6*Px],["week",7*Px],["MM-dd\nyyyy",10*Px],["week",14*Px],["week",21*Px],["month",31*Px],["week",42*Px],["month",62*Px],["week",70*Px],["quarter",95*Px],["month",31*Px*4],["month",31*Px*5],["half-year",380*Px/2],["month",31*Px*8],["month",31*Px*10],["year",380*Px]];Ox.create=function(t){return new Ox({useUTC:t.ecModel.get("useUTC")})};var Ex=Eu.prototype,zx=_x.prototype,Rx=Ja,Fx=$a,Nx=Math.floor,Hx=Math.ceil,Wx=Math.pow,Vx=Math.log,Gx=Eu.extend({type:"log",base:10,$constructor:function(){Eu.apply(this,arguments),this._originalScale=new _x},getTicks:function(){var t=this._originalScale,e=this._extent,n=t.getExtent();return p(zx.getTicks.call(this),function(i){var r=$a(Wx(this.base,i));return r=i===e[0]&&t.__fixMin?Ju(r,n[0]):r,r=i===e[1]&&t.__fixMax?Ju(r,n[1]):r},this)},getLabel:zx.getLabel,scale:function(t){return t=Ex.scale.call(this,t),Wx(this.base,t)},setExtent:function(t,e){var n=this.base;t=Vx(t)/Vx(n),e=Vx(e)/Vx(n),zx.setExtent.call(this,t,e)},getExtent:function(){var t=this.base,e=Ex.getExtent.call(this);e[0]=Wx(t,e[0]),e[1]=Wx(t,e[1]);var n=this._originalScale,i=n.getExtent();return n.__fixMin&&(e[0]=Ju(e[0],i[0])),n.__fixMax&&(e[1]=Ju(e[1],i[1])),e},unionExtent:function(t){this._originalScale.unionExtent(t);var e=this.base;t[0]=Vx(t[0])/Vx(e),t[1]=Vx(t[1])/Vx(e),Ex.unionExtent.call(this,t)},unionExtentFromData:function(t,e){this.unionExtent(t.getApproximateExtent(e))},niceTicks:function(t){t=t||10;var e=this._extent,n=e[1]-e[0];if(!(1/0===n||0>=n)){var i=ao(n),r=t/n*i;for(.5>=r&&(i*=10);!isNaN(i)&&Math.abs(i)<1&&Math.abs(i)>0;)i*=10;var a=[$a(Hx(e[0]/i)*i),$a(Nx(e[1]/i)*i)];this._interval=i,this._niceExtent=a}},niceExtent:function(t){zx.niceExtent.call(this,t);var e=this._originalScale;e.__fixMin=t.fixMin,e.__fixMax=t.fixMax}});f(["contain","normalize"],function(t){Gx.prototype[t]=function(e){return e=Vx(e)/Vx(this.base),Ex[t].call(this,e)}}),Gx.create=function(){return new Gx};var Xx={getMin:function(t){var e=this.option,n=t||null==e.rangeStart?e.min:e.rangeStart;return this.axis&&null!=n&&"dataMin"!==n&&"function"!=typeof n&&!C(n)&&(n=this.axis.scale.parse(n)),n},getMax:function(t){var e=this.option,n=t||null==e.rangeEnd?e.max:e.rangeEnd;return this.axis&&null!=n&&"dataMax"!==n&&"function"!=typeof n&&!C(n)&&(n=this.axis.scale.parse(n)),n},getNeedCrossZero:function(){var t=this.option;return null!=t.rangeStart||null!=t.rangeEnd?!1:!t.scale},getCoordSysModel:H,setRange:function(t,e){this.option.rangeStart=t,this.option.rangeEnd=e},resetRange:function(){this.option.rangeStart=this.option.rangeEnd=null}},Yx=Kr({type:"triangle",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(t,e){var n=e.cx,i=e.cy,r=e.width/2,a=e.height/2;t.moveTo(n,i-a),t.lineTo(n+r,i+a),t.lineTo(n-r,i+a),t.closePath()}}),jx=Kr({type:"diamond",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(t,e){var n=e.cx,i=e.cy,r=e.width/2,a=e.height/2;t.moveTo(n,i-a),t.lineTo(n+r,i),t.lineTo(n,i+a),t.lineTo(n-r,i),t.closePath()}}),qx=Kr({type:"pin",shape:{x:0,y:0,width:0,height:0},buildPath:function(t,e){var n=e.x,i=e.y,r=e.width/5*3,a=Math.max(r,e.height),o=r/2,s=o*o/(a-o),l=i-a+o+s,u=Math.asin(s/o),h=Math.cos(u)*o,c=Math.sin(u),d=Math.cos(u),f=.6*o,p=.7*o;t.moveTo(n-h,l+s),t.arc(n,l,o,Math.PI-u,2*Math.PI+u),t.bezierCurveTo(n+h-c*f,l+s+d*f,n,i-p,n,i),t.bezierCurveTo(n,i-p,n-h+c*f,l+s+d*f,n-h,l+s),t.closePath()}}),Ux=Kr({type:"arrow",shape:{x:0,y:0,width:0,height:0},buildPath:function(t,e){var n=e.height,i=e.width,r=e.x,a=e.y,o=i/3*2;t.moveTo(r,a),t.lineTo(r+o,a+n),t.lineTo(r,a+n/4*3),t.lineTo(r-o,a+n),t.lineTo(r,a),t.closePath()}}),Zx={line:nv,rect:tv,roundRect:tv,square:tv,circle:Gg,diamond:jx,pin:qx,arrow:Ux,triangle:Yx},$x={line:function(t,e,n,i,r){r.x1=t,r.y1=e+i/2,r.x2=t+n,r.y2=e+i/2},rect:function(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i},roundRect:function(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i,r.r=Math.min(n,i)/4},square:function(t,e,n,i,r){var a=Math.min(n,i);r.x=t,r.y=e,r.width=a,r.height=a},circle:function(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.r=Math.min(n,i)/2},diamond:function(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i},pin:function(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i},arrow:function(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i},triangle:function(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i}},Kx={};f(Zx,function(t,e){Kx[e]=new t});var Qx=Kr({type:"symbol",shape:{symbolType:"",x:0,y:0,width:0,height:0},beforeBrush:function(){var t=this.style,e=this.shape;"pin"===e.symbolType&&"inside"===t.textPosition&&(t.textPosition=["50%","40%"],t.textAlign="center",t.textVerticalAlign="middle")},buildPath:function(t,e,n){var i=e.symbolType,r=Kx[i];"none"!==e.symbolType&&(r||(i="rect",r=Kx[i]),$x[i](e.x,e.y,e.width,e.height,r.shape),r.buildPath(t,r.shape,n))}}),Jx={isDimensionStacked:Au,enableDataStack:ku,getStackedDimension:Pu},t_=(Object.freeze||Object)({createList:fh,getLayoutRect:bo,dataStack:Jx,createScale:ph,mixinAxisModelCommonMethods:gh,completeDimensions:Iu,createDimensions:px,createSymbol:dh}),e_=1e-8;yh.prototype={constructor:yh,properties:null,getBoundingRect:function(){var t=this._rect;if(t)return t;for(var e=Number.MAX_VALUE,n=[e,e],i=[-e,-e],r=[],a=[],o=this.geometries,s=0;s<o.length;s++)if("polygon"===o[s].type){var l=o[s].exterior;yr(l,r,a),oe(n,n,r),se(i,i,a)}return 0===s&&(n[0]=n[1]=i[0]=i[1]=0),this._rect=new yn(n[0],n[1],i[0]-n[0],i[1]-n[1])},contain:function(t){var e=this.getBoundingRect(),n=this.geometries;if(!e.contain(t[0],t[1]))return!1;t:for(var i=0,r=n.length;r>i;i++)if("polygon"===n[i].type){var a=n[i].exterior,o=n[i].interiors;if(mh(a,t[0],t[1])){for(var s=0;s<(o?o.length:0);s++)if(mh(o[s]))continue t;return!0}}return!1},transformTo:function(t,e,n,i){var r=this.getBoundingRect(),a=r.width/r.height;n?i||(i=n/a):n=a*i;for(var o=new yn(t,e,n,i),s=r.calculateTransform(o),l=this.geometries,u=0;u<l.length;u++)if("polygon"===l[u].type){for(var h=l[u].exterior,c=l[u].interiors,d=0;d<h.length;d++)ae(h[d],h[d],s);for(var f=0;f<(c?c.length:0);f++)for(var d=0;d<c[f].length;d++)ae(c[f][d],c[f][d],s)}r=this._rect,r.copy(o),this.center=[r.x+r.width/2,r.y+r.height/2]},cloneShallow:function(t){null==t&&(t=this.name);var e=new yh(t,this.geometries,this.center);return e._rect=this._rect,e.transformTo=null,e}};var n_=function(t){return xh(t),p(v(t.features,function(t){return t.geometry&&t.properties&&t.geometry.coordinates.length>0}),function(t){var e=t.properties,n=t.geometry,i=n.coordinates,r=[];"Polygon"===n.type&&r.push({type:"polygon",exterior:i[0],interiors:i.slice(1)}),"MultiPolygon"===n.type&&f(i,function(t){t[0]&&r.push({type:"polygon",exterior:t[0],interiors:t.slice(1)})});var a=new yh(e.name,r,e.cp);return a.properties=e,a})},i_=Yi(),r_=[0,1],a_=function(t,e,n){this.dim=t,this.scale=e,this._extent=n||[0,0],this.inverse=!1,this.onBand=!1};a_.prototype={constructor:a_,contain:function(t){var e=this._extent,n=Math.min(e[0],e[1]),i=Math.max(e[0],e[1]);return t>=n&&i>=t},containData:function(t){return this.contain(this.dataToCoord(t))},getExtent:function(){return this._extent.slice()},getPixelPrecision:function(t){return to(t||this.scale.getExtent(),this._extent)},setExtent:function(t,e){var n=this._extent;n[0]=t,n[1]=e},dataToCoord:function(t,e){var n=this._extent,i=this.scale;return t=i.normalize(t),this.onBand&&"ordinal"===i.type&&(n=n.slice(),Eh(n,i.count())),Ua(t,r_,n,e)},coordToData:function(t,e){var n=this._extent,i=this.scale;this.onBand&&"ordinal"===i.type&&(n=n.slice(),Eh(n,i.count()));var r=Ua(t,n,r_,e);return this.scale.scale(r)},pointToData:function(){},getTicksCoords:function(t){t=t||{};var e=t.tickModel||this.getTickModel(),n=bh(this,e),i=n.ticks,r=p(i,function(t){return{coord:this.dataToCoord(t),tickValue:t}},this),a=e.get("alignWithLabel");return zh(this,r,n.tickCategoryInterval,a,t.clamp),r},getViewLabels:function(){return wh(this).labels},getLabelModel:function(){return this.model.getModel("axisLabel")},getTickModel:function(){return this.model.getModel("axisTick")},getBandWidth:function(){var t=this._extent,e=this.scale.getExtent(),n=e[1]-e[0]+(this.onBand?1:0);0===n&&(n=1);var i=Math.abs(t[1]-t[0]);return Math.abs(i)/n},isHorizontal:null,getRotate:null,calculateCategoryInterval:function(){return Ph(this)}};var o_=n_,s_={};f(["map","each","filter","indexOf","inherits","reduce","filter","bind","curry","isArray","isString","isObject","isFunction","extend","defaults","clone","merge"],function(t){s_[t]=Od[t]});var l_={};f(["extendShape","extendPath","makePath","makeImage","mergePath","resizePath","createIcon","setHoverStyle","setLabelStyle","setTextStyle","setText","getFont","updateProps","initProps","getTransform","clipPointsByRect","clipRectByRect","Group","Image","Text","Circle","Sector","Ring","Polygon","Polyline","Rect","Line","BezierCurve","Arc","IncrementalDisplayable","CompoundPath","LinearGradient","RadialGradient","BoundingRect"],function(t){l_[t]=xv[t]});var u_=function(t,e,n){e=_(e)&&{coordDimensions:e}||o({},e);var i=t.getSource(),r=px(i,e),a=new cx(r,t);return a.initData(i,n),a},h_=nu({type:"series.funnel",init:function(t){h_.superApply(this,"init",arguments),this.legendDataProvider=function(){return this.getRawData()},this._defaultLabelLine(t)},getInitialData:function(){return u_(this,["value"])},_defaultLabelLine:function(t){Ri(t,"labelLine",["show"]);var e=t.labelLine,n=t.emphasis.labelLine;e.show=e.show&&t.label.show,n.show=n.show&&t.emphasis.label.show},getDataParams:function(t){var e=this.getData(),n=h_.superCall(this,"getDataParams",t),i=e.mapDimension("value"),r=e.getSum(i);return n.percent=r?+(e.get(i,t)/r*100).toFixed(2):0,n.$vars.push("percent"),n},defaultOption:{zlevel:0,z:2,legendHoverLink:!0,left:80,top:60,right:80,bottom:60,minSize:"0%",maxSize:"100%",sort:"descending",gap:0,funnelAlign:"center",label:{show:!0,position:"outer"},labelLine:{show:!0,length:20,lineStyle:{width:1,type:"solid"}},itemStyle:{borderColor:"#fff",borderWidth:1},emphasis:{label:{show:!0}}}}),c_=Rh.prototype,d_=["itemStyle","opacity"];c_.updateData=function(t,e,n){var i=this.childAt(0),r=t.hostModel,a=t.getItemModel(e),o=t.getItemLayout(e),l=t.getItemModel(e).get(d_);l=null==l?1:l,i.useStyle({}),n?(i.setShape({points:o.points}),i.setStyle({opacity:0}),Oa(i,{style:{opacity:l}},r,e)):La(i,{style:{opacity:l},shape:{points:o.points}},r,e);var u=a.getModel("itemStyle"),h=t.getItemVisual(e,"color");i.setStyle(s({lineJoin:"round",fill:h},u.getItemStyle(["opacity"]))),i.hoverStyle=u.getModel("emphasis").getItemStyle(),this._updateLabel(t,e),xa(this)},c_._updateLabel=function(t,e){var n=this.childAt(1),i=this.childAt(2),r=t.hostModel,a=t.getItemModel(e),o=t.getItemLayout(e),s=o.label,l=t.getItemVisual(e,"color");La(n,{shape:{points:s.linePoints||s.linePoints}},r,e),La(i,{style:{x:s.x,y:s.y}},r,e),i.attr({rotation:s.rotation,origin:[s.x,s.y],z2:10});var u=a.getModel("label"),h=a.getModel("emphasis.label"),c=a.getModel("labelLine"),d=a.getModel("emphasis.labelLine"),l=t.getItemVisual(e,"color");wa(i.style,i.hoverStyle={},u,h,{labelFetcher:t.hostModel,labelDataIndex:e,defaultText:t.getName(e),autoColor:l,useInsideStyle:!!s.inside},{textAlign:s.textAlign,textVerticalAlign:s.verticalAlign}),i.ignore=i.normalIgnore=!u.get("show"),i.hoverIgnore=!h.get("show"),n.ignore=n.normalIgnore=!c.get("show"),n.hoverIgnore=!d.get("show"),n.setStyle({stroke:l}),n.setStyle(c.getModel("lineStyle").getLineStyle()),n.hoverStyle=d.getModel("lineStyle").getLineStyle()},h(Rh,Af);var f_=(zs.extend({type:"funnel",render:function(t){var e=t.getData(),n=this._data,i=this.group;e.diff(n).add(function(t){var n=new Rh(e,t);e.setItemGraphicEl(t,n),i.add(n)}).update(function(t,r){var a=n.getItemGraphicEl(r);a.updateData(e,t),i.add(a),e.setItemGraphicEl(t,a)}).remove(function(t){var e=n.getItemGraphicEl(t);i.remove(e)}).execute(),this._data=e},remove:function(){this.group.removeAll(),this._data=null},dispose:function(){}}),function(t){return{getTargetSeries:function(e){var n={},i=F();return e.eachSeriesByType(t,function(t){t.__paletteScope=n,i.set(t.uid,t)}),i},reset:function(t){var e=t.getRawData(),n={},i=t.getData();i.each(function(t){var e=i.getRawIndex(t);n[e]=t}),e.each(function(r){var a=n[r],o=null!=a&&i.getItemVisual(a,"color",!0);if(o)e.setItemVisual(r,"color",o);else{var s=e.getItemModel(r),l=s.get("itemStyle.color")||t.getColorFromPalette(e.getName(r)||r+"",t.__paletteScope,e.count());e.setItemVisual(r,"color",l),null!=a&&i.setItemVisual(a,"color",l)}})}}}),p_=function(t,e){t.eachSeriesByType("funnel",function(t){var n=t.getData(),i=n.mapDimension("value"),r=t.get("sort"),a=Fh(t,e),o=Nh(n,r),s=[Za(t.get("minSize"),a.width),Za(t.get("maxSize"),a.width)],l=n.getDataExtent(i),u=t.get("min"),h=t.get("max");null==u&&(u=Math.min(l[0],0)),null==h&&(h=l[1]);var c=t.get("funnelAlign"),d=t.get("gap"),f=(a.height-d*(n.count()-1))/n.count(),p=a.y,g=function(t,e){var r,o=n.get(i,t)||0,l=Ua(o,[u,h],s,!0);switch(c){case"left":r=a.x;break;case"center":r=a.x+(a.width-l)/2;break;case"right":r=a.x+a.width-l}return[[r,e],[r+l,e]]};"ascending"===r&&(f=-f,d=-d,p+=a.height,o=o.reverse());for(var v=0;v<o.length;v++){var m=o[v],y=o[v+1],x=n.getItemModel(m),_=x.get("itemStyle.height");null==_?_=f:(_=Za(_,a.height),"ascending"===r&&(_=-_));var w=g(m,p),b=g(y,p+_);p+=_+d,n.setItemLayout(m,{points:w.concat(b.slice().reverse())})}Hh(n)})},g_=function(t){return{seriesType:t,reset:function(t,e){var n=e.findComponents({mainType:"legend"});if(n&&n.length){var i=t.getData();i.filterSelf(function(t){for(var e=i.getName(t),r=0;r<n.length;r++)if(!n[r].isSelected(e))return!1;return!0})}}}};Kl(f_("funnel")),$l(p_),Yl(g_("funnel"));var v_=function(t){this._axes={},this._dimList=[],this.name=t||""};v_.prototype={constructor:v_,type:"cartesian",getAxis:function(t){return this._axes[t]},getAxes:function(){return p(this._dimList,Wh,this)},getAxesByScale:function(t){return t=t.toLowerCase(),v(this.getAxes(),function(e){return e.scale.type===t})},addAxis:function(t){var e=t.dim;this._axes[e]=t,this._dimList.push(e)},dataToCoord:function(t){return this._dataCoordConvert(t,"dataToCoord")},coordToData:function(t){return this._dataCoordConvert(t,"coordToData")},_dataCoordConvert:function(t,e){for(var n=this._dimList,i=t instanceof Array?[]:{},r=0;r<n.length;r++){var a=n[r],o=this._axes[a];i[a]=o[e](t[a])}return i}},Vh.prototype={constructor:Vh,type:"cartesian2d",dimensions:["x","y"],getBaseAxis:function(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAxis("x")},containPoint:function(t){var e=this.getAxis("x"),n=this.getAxis("y");return e.contain(e.toLocalCoord(t[0]))&&n.contain(n.toLocalCoord(t[1]))},containData:function(t){return this.getAxis("x").containData(t[0])&&this.getAxis("y").containData(t[1])},dataToPoint:function(t,e,n){var i=this.getAxis("x"),r=this.getAxis("y");return n=n||[],n[0]=i.toGlobalCoord(i.dataToCoord(t[0])),n[1]=r.toGlobalCoord(r.dataToCoord(t[1])),n},clampData:function(t,e){var n=this.getAxis("x").scale,i=this.getAxis("y").scale,r=n.getExtent(),a=i.getExtent(),o=n.parse(t[0]),s=i.parse(t[1]);return e=e||[],e[0]=Math.min(Math.max(Math.min(r[0],r[1]),o),Math.max(r[0],r[1])),e[1]=Math.min(Math.max(Math.min(a[0],a[1]),s),Math.max(a[0],a[1])),e},pointToData:function(t,e){var n=this.getAxis("x"),i=this.getAxis("y");return e=e||[],e[0]=n.coordToData(n.toLocalCoord(t[0])),e[1]=i.coordToData(i.toLocalCoord(t[1])),e},getOtherAxis:function(t){return this.getAxis("x"===t.dim?"y":"x")}},h(Vh,v_);var m_=function(t,e,n,i,r){a_.call(this,t,e,n),this.type=i||"value",this.position=r||"bottom"};m_.prototype={constructor:m_,index:0,getAxesOnZeroOf:null,model:null,isHorizontal:function(){var t=this.position;return"top"===t||"bottom"===t},getGlobalExtent:function(t){var e=this.getExtent();return e[0]=this.toGlobalCoord(e[0]),e[1]=this.toGlobalCoord(e[1]),t&&e[0]>e[1]&&e.reverse(),e},getOtherAxis:function(){this.grid.getOtherAxis()},pointToData:function(t,e){return this.coordToData(this.toLocalCoord(t["x"===this.dim?0:1]),e)},toLocalCoord:null,toGlobalCoord:null},h(m_,a_);var y_={show:!0,zlevel:0,z:0,inverse:!1,name:"",nameLocation:"end",nameRotate:null,nameTruncate:{maxWidth:null,ellipsis:"...",placeholder:"."},nameTextStyle:{},nameGap:15,silent:!1,triggerEvent:!1,tooltip:{show:!1},axisPointer:{},axisLine:{show:!0,onZero:!0,onZeroAxisIndex:null,lineStyle:{color:"#333",width:1,type:"solid"},symbol:["none","none"],symbolSize:[10,15]},axisTick:{show:!0,inside:!1,length:5,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,showMinLabel:null,showMaxLabel:null,margin:8,fontSize:12},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}},x_={};x_.categoryAxis=r({boundaryGap:!0,deduplication:null,splitLine:{show:!1},axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"}},y_),x_.valueAxis=r({boundaryGap:[0,0],splitNumber:5},y_),x_.timeAxis=s({scale:!0,min:"dataMin",max:"dataMax"},x_.valueAxis),x_.logAxis=s({scale:!0,logBase:10},x_.valueAxis);var __=["value","category","time","log"],w_=function(t,e,n,i){f(__,function(o){e.extend({type:t+"Axis."+o,mergeDefaultAndTheme:function(e,i){var a=this.layoutMode,s=a?Mo(e):{},l=i.getTheme();r(e,l.get(o+"Axis")),r(e,this.getDefaultOption()),e.type=n(t,e),a&&So(e,s,a)},optionUpdated:function(){var t=this.option;"category"===t.type&&(this.__ordinalMeta=zu.createByAxisModel(this))},getCategories:function(t){var e=this.option;return"category"===e.type?t?e.data:this.__ordinalMeta.categories:void 0},getOrdinalMeta:function(){return this.__ordinalMeta},defaultOption:a([{},x_[o+"Axis"],i],!0)})}),Yv.registerSubTypeDefaulter(t+"Axis",x(n,t))},b_=Yv.extend({type:"cartesian2dAxis",axis:null,init:function(){b_.superApply(this,"init",arguments),this.resetRange()},mergeOption:function(){b_.superApply(this,"mergeOption",arguments),this.resetRange()},restoreData:function(){b_.superApply(this,"restoreData",arguments),this.resetRange()},getCoordSysModel:function(){return this.ecModel.queryComponents({mainType:"grid",index:this.option.gridIndex,id:this.option.gridId})[0]}});r(b_.prototype,Xx);var S_={offset:0};w_("x",b_,Gh,S_),w_("y",b_,Gh,S_),Yv.extend({type:"grid",dependencies:["xAxis","yAxis"],layoutMode:"box",coordinateSystem:null,defaultOption:{show:!1,zlevel:0,z:0,left:"10%",top:60,right:"10%",bottom:60,containLabel:!1,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"}});var M_=Yh.prototype;M_.type="grid",M_.axisPointerEnabled=!0,M_.getRect=function(){return this._rect},M_.update=function(t,e){var n=this._axesMap;this._updateScale(t,this.model),f(n.x,function(t){nh(t.scale,t.model)}),f(n.y,function(t){nh(t.scale,t.model)});var i={};f(n.x,function(t){jh(n,"y",t,i)}),f(n.y,function(t){jh(n,"x",t,i)}),this.resize(this.model,e)},M_.resize=function(t,e,n){function i(){f(a,function(t){var e=t.isHorizontal(),n=e?[0,r.width]:[0,r.height],i=t.inverse?1:0;t.setExtent(n[i],n[1-i]),Uh(t,e?r.x:r.y)})}var r=bo(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()});this._rect=r;var a=this._axesList;i(),!n&&t.get("containLabel")&&(f(a,function(t){if(!t.model.get("axisLabel.inside")){var e=sh(t);if(e){var n=t.isHorizontal()?"height":"width",i=t.model.get("axisLabel.margin");r[n]-=e[n]+i,"top"===t.position?r.y+=e.height+i:"left"===t.position&&(r.x+=e.width+i)}}}),i())},M_.getAxis=function(t,e){var n=this._axesMap[t];if(null!=n){if(null==e)for(var i in n)if(n.hasOwnProperty(i))return n[i];return n[e]}},M_.getAxes=function(){return this._axesList.slice()},M_.getCartesian=function(t,e){if(null!=t&&null!=e){var n="x"+t+"y"+e;return this._coordsMap[n]}S(t)&&(e=t.yAxisIndex,t=t.xAxisIndex);for(var i=0,r=this._coordsList;i<r.length;i++)if(r[i].getAxis("x").index===t||r[i].getAxis("y").index===e)return r[i]},M_.getCartesians=function(){return this._coordsList.slice()},M_.convertToPixel=function(t,e,n){var i=this._findConvertTarget(t,e);return i.cartesian?i.cartesian.dataToPoint(n):i.axis?i.axis.toGlobalCoord(i.axis.dataToCoord(n)):null},M_.convertFromPixel=function(t,e,n){var i=this._findConvertTarget(t,e);
return i.cartesian?i.cartesian.pointToData(n):i.axis?i.axis.coordToData(i.axis.toLocalCoord(n)):null},M_._findConvertTarget=function(t,e){var n,i,r=e.seriesModel,a=e.xAxisModel||r&&r.getReferringComponents("xAxis")[0],o=e.yAxisModel||r&&r.getReferringComponents("yAxis")[0],s=e.gridModel,l=this._coordsList;if(r)n=r.coordinateSystem,u(l,n)<0&&(n=null);else if(a&&o)n=this.getCartesian(a.componentIndex,o.componentIndex);else if(a)i=this.getAxis("x",a.componentIndex);else if(o)i=this.getAxis("y",o.componentIndex);else if(s){var h=s.coordinateSystem;h===this&&(n=this._coordsList[0])}return{cartesian:n,axis:i}},M_.containPoint=function(t){var e=this._coordsList[0];return e?e.containPoint(t):void 0},M_._initCartesian=function(t,e){function n(n){return function(o,s){if(Xh(o,t,e)){var l=o.get("position");"x"===n?"top"!==l&&"bottom"!==l&&(l="bottom",i[l]&&(l="top"===l?"bottom":"top")):"left"!==l&&"right"!==l&&(l="left",i[l]&&(l="left"===l?"right":"left")),i[l]=!0;var u=new m_(n,ih(o),[0,0],o.get("type"),l),h="category"===u.type;u.onBand=h&&o.get("boundaryGap"),u.inverse=o.get("inverse"),o.axis=u,u.model=o,u.grid=this,u.index=s,this._axesList.push(u),r[n][s]=u,a[n]++}}}var i={left:!1,right:!1,top:!1,bottom:!1},r={x:{},y:{}},a={x:0,y:0};return e.eachComponent("xAxis",n("x"),this),e.eachComponent("yAxis",n("y"),this),a.x&&a.y?(this._axesMap=r,void f(r.x,function(e,n){f(r.y,function(i,r){var a="x"+n+"y"+r,o=new Vh(a);o.grid=this,o.model=t,this._coordsMap[a]=o,this._coordsList.push(o),o.addAxis(e),o.addAxis(i)},this)},this)):(this._axesMap={},void(this._axesList=[]))},M_._updateScale=function(t,e){function n(t,e){f(t.mapDimension(e.dim,!0),function(n){e.scale.unionExtentFromData(t,Pu(t,n))})}f(this._axesList,function(t){t.scale.setExtent(1/0,-1/0)}),t.eachSeries(function(i){if($h(i)){var r=Zh(i,t),a=r[0],o=r[1];if(!Xh(a,e,t)||!Xh(o,e,t))return;var s=this.getCartesian(a.componentIndex,o.componentIndex),l=i.getData(),u=s.getAxis("x"),h=s.getAxis("y");"list"===l.type&&(n(l,u,i),n(l,h,i))}},this)},M_.getTooltipAxes=function(t){var e=[],n=[];return f(this.getCartesians(),function(i){var r=null!=t&&"auto"!==t?i.getAxis(t):i.getBaseAxis(),a=i.getOtherAxis(r);u(e,r)<0&&e.push(r),u(n,a)<0&&n.push(a)}),{baseAxes:e,otherAxes:n}};var T_=["xAxis","yAxis"];Yh.create=function(t,e){var n=[];return t.eachComponent("grid",function(i,r){var a=new Yh(i,t,e);a.name="grid_"+r,a.resize(i,e,!0),i.coordinateSystem=a,n.push(a)}),t.eachSeries(function(e){if($h(e)){var n=Zh(e,t),i=n[0],r=n[1],a=i.getCoordSysModel(),o=a.coordinateSystem;e.coordinateSystem=o.getCartesian(i.componentIndex,r.componentIndex)}}),n},Yh.dimensions=Yh.prototype.dimensions=Vh.prototype.dimensions,Ko.register("cartesian2d",Yh);var I_=Math.PI,C_=function(t,e){this.opt=e,this.axisModel=t,s(e,{labelOffset:0,nameDirection:1,tickDirection:1,labelDirection:1,silent:!0}),this.group=new Af;var n=new Af({position:e.position.slice(),rotation:e.rotation});n.updateTransform(),this._transform=n.transform,this._dumbGroup=n};C_.prototype={constructor:C_,hasBuilder:function(t){return!!D_[t]},add:function(t){D_[t].call(this)},getGroup:function(){return this.group}};var D_={axisLine:function(){var t=this.opt,e=this.axisModel;if(e.get("axisLine.show")){var n=this.axisModel.axis.getExtent(),i=this._transform,r=[n[0],0],a=[n[1],0];i&&(ae(r,r,i),ae(a,a,i));var s=o({lineCap:"round"},e.getModel("axisLine.lineStyle").getLineStyle());this.group.add(new nv(ia({anid:"line",shape:{x1:r[0],y1:r[1],x2:a[0],y2:a[1]},style:s,strokeContainThreshold:t.strokeContainThreshold||5,silent:!0,z2:1})));var l=e.get("axisLine.symbol"),u=e.get("axisLine.symbolSize"),h=e.get("axisLine.symbolOffset")||0;if("number"==typeof h&&(h=[h,h]),null!=l){"string"==typeof l&&(l=[l,l]),("string"==typeof u||"number"==typeof u)&&(u=[u,u]);var c=u[0],d=u[1];f([{rotate:t.rotation+Math.PI/2,offset:h[0],r:0},{rotate:t.rotation-Math.PI/2,offset:h[1],r:Math.sqrt((r[0]-a[0])*(r[0]-a[0])+(r[1]-a[1])*(r[1]-a[1]))}],function(e,n){if("none"!==l[n]&&null!=l[n]){var i=dh(l[n],-c/2,-d/2,c,d,s.stroke,!0),a=e.r+e.offset,o=[r[0]+a*Math.cos(t.rotation),r[1]-a*Math.sin(t.rotation)];i.attr({rotation:e.rotate,position:o,silent:!0,z2:11}),this.group.add(i)}},this)}}},axisTickLabel:function(){var t=this.axisModel,e=this.opt,n=rc(this,t,e),i=ac(this,t,e);tc(t,i,n)},axisName:function(){var t=this.opt,e=this.axisModel,n=D(t.axisName,e.get("name"));if(n){var i,r=e.get("nameLocation"),a=t.nameDirection,s=e.getModel("nameTextStyle"),l=e.get("nameGap")||0,u=this.axisModel.axis.getExtent(),h=u[0]>u[1]?-1:1,c=["start"===r?u[0]-h*l:"end"===r?u[1]+h*l:(u[0]+u[1])/2,ic(r)?t.labelOffset+a*l:0],d=e.get("nameRotate");null!=d&&(d=d*I_/180);var f;ic(r)?i=k_(t.rotation,null!=d?d:t.rotation,a):(i=Qh(t,r,d||0,u),f=t.axisNameAvailableWidth,null!=f&&(f=Math.abs(f/Math.sin(i.rotation)),!isFinite(f)&&(f=null)));var p=s.getFont(),g=e.get("nameTruncate",!0)||{},v=g.ellipsis,m=D(t.nameTruncateMaxWidth,g.maxWidth,f),y=null!=v&&null!=m?zv(n,m,p,v,{minChar:2,placeholder:g.placeholder}):n,x=e.get("tooltip",!0),_=e.mainType,w={componentType:_,name:n,$vars:["name"]};w[_+"Index"]=e.componentIndex;var b=new Vg({anid:"name",__fullText:n,__truncatedText:y,position:c,rotation:i.rotation,silent:Jh(e),z2:1,tooltip:x&&x.show?o({content:n,formatter:function(){return n},formatterParams:w},x):null});ba(b.style,s,{text:y,textFont:p,textFill:s.getTextColor()||e.get("axisLine.lineStyle.color"),textAlign:i.textAlign,textVerticalAlign:i.textVerticalAlign}),e.get("triggerEvent")&&(b.eventData=Kh(e),b.eventData.targetType="axisName",b.eventData.name=n),this._dumbGroup.add(b),b.updateTransform(),this.group.add(b),b.decomposeTransform()}}},k_=C_.innerTextLayout=function(t,e,n){var i,r,a=no(e-t);return io(a)?(r=n>0?"top":"bottom",i="center"):io(a-I_)?(r=n>0?"bottom":"top",i="center"):(r="middle",i=a>0&&I_>a?n>0?"right":"left":n>0?"left":"right"),{rotation:a,textAlign:i,textVerticalAlign:r}},A_=f,P_=x,L_=eu({type:"axis",_axisPointer:null,axisPointerClass:null,render:function(t,e,n,i){this.axisPointerClass&&dc(t),L_.superApply(this,"render",arguments),mc(this,t,e,n,i,!0)},updateAxisPointer:function(t,e,n,i){mc(this,t,e,n,i,!1)},remove:function(t,e){var n=this._axisPointer;n&&n.remove(e),L_.superApply(this,"remove",arguments)},dispose:function(t,e){yc(this,e),L_.superApply(this,"dispose",arguments)}}),O_=[];L_.registerAxisPointerClass=function(t,e){O_[t]=e},L_.getAxisPointerClass=function(t){return t&&O_[t]};var B_=["axisLine","axisTickLabel","axisName"],E_=["splitArea","splitLine"],z_=L_.extend({type:"cartesianAxis",axisPointerClass:"CartesianAxisPointer",render:function(t,e,n,i){this.group.removeAll();var r=this._axisGroup;if(this._axisGroup=new Af,this.group.add(this._axisGroup),t.get("show")){var a=t.getCoordSysModel(),o=xc(a,t),s=new C_(t,o);f(B_,s.add,s),this._axisGroup.add(s.getGroup()),f(E_,function(e){t.get(e+".show")&&this["_"+e](t,a)},this),Ra(r,this._axisGroup,t),z_.superCall(this,"render",t,e,n,i)}},remove:function(){this._splitAreaColors=null},_splitLine:function(t,e){var n=t.axis;if(!n.scale.isBlank()){var i=t.getModel("splitLine"),r=i.getModel("lineStyle"),a=r.get("color");a=_(a)?a:[a];for(var o=e.coordinateSystem.getRect(),l=n.isHorizontal(),u=0,h=n.getTicksCoords({tickModel:i}),c=[],d=[],f=r.getLineStyle(),p=0;p<h.length;p++){var g=n.toGlobalCoord(h[p].coord);l?(c[0]=g,c[1]=o.y,d[0]=g,d[1]=o.y+o.height):(c[0]=o.x,c[1]=g,d[0]=o.x+o.width,d[1]=g);var v=u++%a.length,m=h[p].tickValue;this._axisGroup.add(new nv(ia({anid:null!=m?"line_"+h[p].tickValue:null,shape:{x1:c[0],y1:c[1],x2:d[0],y2:d[1]},style:s({stroke:a[v]},f),silent:!0})))}}},_splitArea:function(t,e){var n=t.axis;if(!n.scale.isBlank()){var i=t.getModel("splitArea"),r=i.getModel("areaStyle"),a=r.get("color"),o=e.coordinateSystem.getRect(),l=n.getTicksCoords({tickModel:i,clamp:!0});if(l.length){var u=a.length,h=this._splitAreaColors,c=F(),d=0;if(h)for(var f=0;f<l.length;f++){var p=h.get(l[f].tickValue);if(null!=p){d=(p+(u-1)*f)%u;break}}var g=n.toGlobalCoord(l[0].coord),v=r.getAreaStyle();a=_(a)?a:[a];for(var f=1;f<l.length;f++){var m,y,x,w,b=n.toGlobalCoord(l[f].coord);n.isHorizontal()?(m=g,y=o.y,x=b-m,w=o.height,g=m+x):(m=o.x,y=g,x=o.width,w=b-y,g=y+w);var S=l[f-1].tickValue;null!=S&&c.set(S,d),this._axisGroup.add(new tv({anid:null!=S?"area_"+S:null,shape:{x:m,y:y,width:x,height:w},style:s({fill:a[d]},v),silent:!0})),d=(d+1)%u}this._splitAreaColors=c}}}});z_.extend({type:"xAxis"}),z_.extend({type:"yAxis"}),eu({type:"grid",render:function(t){this.group.removeAll(),t.get("show")&&this.group.add(new tv({shape:t.coordinateSystem.getRect(),style:s({fill:t.get("backgroundColor")},t.getItemStyle()),silent:!0,z2:-1}))}}),Xl(function(t){t.xAxis&&t.yAxis&&!t.grid&&(t.grid={})}),tu({type:"title",layoutMode:{type:"box",ignoreSize:!0},defaultOption:{zlevel:0,z:6,show:!0,text:"",target:"blank",subtext:"",subtarget:"blank",left:0,top:0,backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,textStyle:{fontSize:18,fontWeight:"bolder",color:"#333"},subtextStyle:{color:"#aaa"}}}),eu({type:"title",render:function(t,e,n){if(this.group.removeAll(),t.get("show")){var i=this.group,r=t.getModel("textStyle"),a=t.getModel("subtextStyle"),o=t.get("textAlign"),s=t.get("textBaseline"),l=new Vg({style:ba({},r,{text:t.get("text"),textFill:r.getTextColor()},{disableBox:!0}),z2:10}),u=l.getBoundingRect(),h=t.get("subtext"),c=new Vg({style:ba({},a,{text:h,textFill:a.getTextColor(),y:u.height+t.get("itemGap"),textVerticalAlign:"top"},{disableBox:!0}),z2:10}),d=t.get("link"),f=t.get("sublink"),p=t.get("triggerEvent",!0);l.silent=!d&&!p,c.silent=!f&&!p,d&&l.on("click",function(){window.open(d,"_"+t.get("target"))}),f&&c.on("click",function(){window.open(f,"_"+t.get("subtarget"))}),l.eventData=c.eventData=p?{componentType:"title",componentIndex:t.componentIndex}:null,i.add(l),h&&i.add(c);var g=i.getBoundingRect(),v=t.getBoxLayoutParams();v.width=g.width,v.height=g.height;var m=bo(v,{width:n.getWidth(),height:n.getHeight()},t.get("padding"));o||(o=t.get("left")||t.get("right"),"middle"===o&&(o="center"),"right"===o?m.x+=m.width:"center"===o&&(m.x+=m.width/2)),s||(s=t.get("top")||t.get("bottom"),"center"===s&&(s="middle"),"bottom"===s?m.y+=m.height:"middle"===s&&(m.y+=m.height/2),s=s||"top"),i.attr("position",[m.x,m.y]);var y={textAlign:o,textVerticalAlign:s};l.setStyle(y),c.setStyle(y),g=i.getBoundingRect();var x=m.margin,_=t.getItemStyle(["color","opacity"]);_.fill=t.get("backgroundColor");var w=new tv({shape:{x:g.x-x[3],y:g.y-x[0],width:g.width+x[1]+x[3],height:g.height+x[0]+x[2],r:t.get("borderRadius")},style:_,silent:!0});ra(w),i.add(w)}}});var R_=tu({type:"legend.plain",dependencies:["series"],layoutMode:{type:"box",ignoreSize:!0},init:function(t,e,n){this.mergeDefaultAndTheme(t,n),t.selected=t.selected||{}},mergeOption:function(t){R_.superCall(this,"mergeOption",t)},optionUpdated:function(){this._updateData(this.ecModel);var t=this._data;if(t[0]&&"single"===this.get("selectedMode")){for(var e=!1,n=0;n<t.length;n++){var i=t[n].get("name");if(this.isSelected(i)){this.select(i),e=!0;break}}!e&&this.select(t[0].get("name"))}},_updateData:function(t){var e=[],n=[];t.eachRawSeries(function(i){var r=i.name;n.push(r);var a;if(i.legendDataProvider){var o=i.legendDataProvider(),s=o.mapArray(o.getName);t.isSeriesFiltered(i)||(n=n.concat(s)),s.length?e=e.concat(s):a=!0}else a=!0;a&&Vi(i)&&e.push(i.name)}),this._availableNames=n;var i=this.get("data")||e,r=p(i,function(t){return("string"==typeof t||"number"==typeof t)&&(t={name:t}),new Wa(t,this,this.ecModel)},this);this._data=r},getData:function(){return this._data},select:function(t){var e=this.option.selected,n=this.get("selectedMode");if("single"===n){var i=this._data;f(i,function(t){e[t.get("name")]=!1})}e[t]=!0},unSelect:function(t){"single"!==this.get("selectedMode")&&(this.option.selected[t]=!1)},toggleSelected:function(t){var e=this.option.selected;e.hasOwnProperty(t)||(e[t]=!0),this[e[t]?"unSelect":"select"](t)},isSelected:function(t){var e=this.option.selected;return!(e.hasOwnProperty(t)&&!e[t])&&u(this._availableNames,t)>=0},defaultOption:{zlevel:0,z:4,show:!0,orient:"horizontal",left:"center",top:0,align:"auto",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderRadius:0,borderWidth:0,padding:5,itemGap:10,itemWidth:25,itemHeight:14,inactiveColor:"#ccc",textStyle:{color:"#333"},selectedMode:!0,tooltip:{show:!1}}});ql("legendToggleSelect","legendselectchanged",x(_c,"toggleSelected")),ql("legendSelect","legendselected",x(_c,"select")),ql("legendUnSelect","legendunselected",x(_c,"unSelect"));var F_=x,N_=f,H_=Af,W_=eu({type:"legend.plain",newlineDisabled:!1,init:function(){this.group.add(this._contentGroup=new H_),this._backgroundEl,this._isFirstRender=!0},getContentGroup:function(){return this._contentGroup},render:function(t,e,n){var i=this._isFirstRender;if(this._isFirstRender=!1,this.resetInner(),t.get("show",!0)){var r=t.get("align");r&&"auto"!==r||(r="right"===t.get("left")&&"vertical"===t.get("orient")?"right":"left"),this.renderInner(r,t,e,n);var a=t.getBoxLayoutParams(),o={width:n.getWidth(),height:n.getHeight()},l=t.get("padding"),u=bo(a,o,l),h=this.layoutInner(t,r,u,i),c=bo(s({width:h.width,height:h.height},a),o,l);this.group.attr("position",[c.x-h.x,c.y-h.y]),this.group.add(this._backgroundEl=wc(h,t))}},resetInner:function(){this.getContentGroup().removeAll(),this._backgroundEl&&this.group.remove(this._backgroundEl)},renderInner:function(t,e,n,i){var r=this.getContentGroup(),a=F(),o=e.get("selectedMode"),s=[];n.eachRawSeries(function(t){!t.get("legendHoverLink")&&s.push(t.id)}),N_(e.getData(),function(l,u){var h=l.get("name");if(!this.newlineDisabled&&(""===h||"\n"===h))return void r.add(new H_({newline:!0}));var c=n.getSeriesByName(h)[0];if(!a.get(h))if(c){var d=c.getData(),f=d.getVisual("color");"function"==typeof f&&(f=f(c.getDataParams(0)));var p=d.getVisual("legendSymbol")||"roundRect",g=d.getVisual("symbol"),v=this._createItem(h,u,l,e,p,g,t,f,o);v.on("click",F_(bc,h,i)).on("mouseover",F_(Sc,c.name,null,i,s)).on("mouseout",F_(Mc,c.name,null,i,s)),a.set(h,!0)}else n.eachRawSeries(function(n){if(!a.get(h)&&n.legendDataProvider){var r=n.legendDataProvider(),c=r.indexOfName(h);if(0>c)return;var d=r.getItemVisual(c,"color"),f="roundRect",p=this._createItem(h,u,l,e,f,null,t,d,o);p.on("click",F_(bc,h,i)).on("mouseover",F_(Sc,null,h,i,s)).on("mouseout",F_(Mc,null,h,i,s)),a.set(h,!0)}},this)},this)},_createItem:function(t,e,n,i,r,a,s,l,u){var h=i.get("itemWidth"),c=i.get("itemHeight"),d=i.get("inactiveColor"),f=i.get("symbolKeepAspect"),p=i.isSelected(t),g=new H_,v=n.getModel("textStyle"),m=n.get("icon"),y=n.getModel("tooltip"),x=y.parentModel;if(r=m||r,g.add(dh(r,0,0,h,c,p?l:d,null==f?!0:f)),!m&&a&&(a!==r||"none"===a)){var _=.8*c;"none"===a&&(a="circle"),g.add(dh(a,(h-_)/2,(c-_)/2,_,_,p?l:d,null==f?!0:f))}var w="left"===s?h+5:-5,b=s,S=i.get("formatter"),M=t;"string"==typeof S&&S?M=S.replace("{name}",null!=t?t:""):"function"==typeof S&&(M=S(t)),g.add(new Vg({style:ba({},v,{text:M,x:w,y:c/2,textFill:p?v.getTextColor():d,textAlign:b,textVerticalAlign:"middle"})}));var T=new tv({shape:g.getBoundingRect(),invisible:!0,tooltip:y.get("show")?o({content:t,formatter:x.get("formatter",!0)||function(){return t},formatterParams:{componentType:"legend",legendIndex:i.componentIndex,name:t,$vars:["name"]}},y.option):null});return g.add(T),g.eachChild(function(t){t.silent=!0}),T.silent=!u,this.getContentGroup().add(g),xa(g),g.__legendDataIndex=e,g},layoutInner:function(t,e,n){var i=this.getContentGroup();Vv(t.get("orient"),i,t.get("itemGap"),n.width,n.height);var r=i.getBoundingRect();return i.attr("position",[-r.x,-r.y]),this.group.getBoundingRect()},remove:function(){this.getContentGroup().removeAll(),this._isFirstRender=!0}}),V_=function(t){var e=t.findComponents({mainType:"legend"});e&&e.length&&t.filterSeries(function(t){for(var n=0;n<e.length;n++)if(!e[n].isSelected(t.name))return!1;return!0})};Yl(V_),Yv.registerSubTypeDefaulter("legend",function(){return"plain"});var G_=R_.extend({type:"legend.scroll",setScrollDataIndex:function(t){this.option.scrollDataIndex=t},defaultOption:{scrollDataIndex:0,pageButtonItemGap:5,pageButtonGap:null,pageButtonPosition:"end",pageFormatter:"{current}/{total}",pageIcons:{horizontal:["M0,0L12,-10L12,10z","M0,0L-12,-10L-12,10z"],vertical:["M0,0L20,0L10,-20z","M0,0L20,0L10,20z"]},pageIconColor:"#2f4554",pageIconInactiveColor:"#aaa",pageIconSize:15,pageTextStyle:{color:"#333"},animationDurationUpdate:800},init:function(t,e,n,i){var r=Mo(t);G_.superCall(this,"init",t,e,n,i),Tc(this,t,r)},mergeOption:function(t,e){G_.superCall(this,"mergeOption",t,e),Tc(this,this.option,t)},getOrient:function(){return"vertical"===this.get("orient")?{index:1,name:"vertical"}:{index:0,name:"horizontal"}}}),X_=Af,Y_=["width","height"],j_=["x","y"],q_=W_.extend({type:"legend.scroll",newlineDisabled:!0,init:function(){q_.superCall(this,"init"),this._currentIndex=0,this.group.add(this._containerGroup=new X_),this._containerGroup.add(this.getContentGroup()),this.group.add(this._controllerGroup=new X_),this._showController},resetInner:function(){q_.superCall(this,"resetInner"),this._controllerGroup.removeAll(),this._containerGroup.removeClipPath(),this._containerGroup.__rectSize=null},renderInner:function(t,e,n,i){function r(t,n){var r=t+"DataIndex",l=Ha(e.get("pageIcons",!0)[e.getOrient().name][n],{onclick:y(a._pageGo,a,r,e,i)},{x:-s[0]/2,y:-s[1]/2,width:s[0],height:s[1]});l.name=t,o.add(l)}var a=this;q_.superCall(this,"renderInner",t,e,n,i);var o=this._controllerGroup,s=e.get("pageIconSize",!0);_(s)||(s=[s,s]),r("pagePrev",0);var l=e.getModel("pageTextStyle");o.add(new Vg({name:"pageText",style:{textFill:l.getTextColor(),font:l.getFont(),textVerticalAlign:"middle",textAlign:"center"},silent:!0})),r("pageNext",1)},layoutInner:function(t,e,n,i){var r=this.getContentGroup(),a=this._containerGroup,o=this._controllerGroup,s=t.getOrient().index,l=Y_[s],u=Y_[1-s],h=j_[1-s];Vv(t.get("orient"),r,t.get("itemGap"),s?n.width:null,s?null:n.height),Vv("horizontal",o,t.get("pageButtonItemGap",!0));var c=r.getBoundingRect(),d=o.getBoundingRect(),f=this._showController=c[l]>n[l],p=[-c.x,-c.y];i||(p[s]=r.position[s]);var g=[0,0],v=[-d.x,-d.y],m=k(t.get("pageButtonGap",!0),t.get("itemGap",!0));if(f){var y=t.get("pageButtonPosition",!0);"end"===y?v[s]+=n[l]-d[l]:g[s]+=d[l]+m}v[1-s]+=c[u]/2-d[u]/2,r.attr("position",p),a.attr("position",g),o.attr("position",v);var x=this.group.getBoundingRect(),x={x:0,y:0};if(x[l]=f?n[l]:c[l],x[u]=Math.max(c[u],d[u]),x[h]=Math.min(0,d[h]+v[1-s]),a.__rectSize=n[l],f){var _={x:0,y:0};_[l]=Math.max(n[l]-d[l]-m,0),_[u]=x[u],a.setClipPath(new tv({shape:_})),a.__rectSize=_[l]}else o.eachChild(function(t){t.attr({invisible:!0,silent:!0})});var w=this._getPageInfo(t);return null!=w.pageIndex&&La(r,{position:w.contentPosition},f?t:!1),this._updatePageInfoView(t,w),x},_pageGo:function(t,e,n){var i=this._getPageInfo(e)[t];null!=i&&n.dispatchAction({type:"legendScroll",scrollDataIndex:i,legendId:e.id})},_updatePageInfoView:function(t,e){var n=this._controllerGroup;f(["pagePrev","pageNext"],function(i){var r=null!=e[i+"DataIndex"],a=n.childOfName(i);a&&(a.setStyle("fill",r?t.get("pageIconColor",!0):t.get("pageIconInactiveColor",!0)),a.cursor=r?"pointer":"default")});var i=n.childOfName("pageText"),r=t.get("pageFormatter"),a=e.pageIndex,o=null!=a?a+1:0,s=e.pageCount;i&&r&&i.setStyle("text",b(r)?r.replace("{current}",o).replace("{total}",s):r({current:o,total:s}))},_getPageInfo:function(t){function e(t){if(t){var e=t.getBoundingRect(),n=e[l]+t.position[o];return{s:n,e:n+e[s],i:t.__legendDataIndex}}}function n(t,e){return t.e>=e&&t.s<=e+a}var i=t.get("scrollDataIndex",!0),r=this.getContentGroup(),a=this._containerGroup.__rectSize,o=t.getOrient().index,s=Y_[o],l=j_[o],u=this._findTargetItemIndex(i),h=r.children(),c=h[u],d=h.length,f=d?1:0,p={contentPosition:r.position.slice(),pageCount:f,pageIndex:f-1,pagePrevDataIndex:null,pageNextDataIndex:null};if(!c)return p;var g=e(c);p.contentPosition[o]=-g.s;for(var v=u+1,m=g,y=g,x=null;d>=v;++v)x=e(h[v]),(!x&&y.e>m.s+a||x&&!n(x,m.s))&&(m=y.i>m.i?y:x,m&&(null==p.pageNextDataIndex&&(p.pageNextDataIndex=m.i),++p.pageCount)),y=x;for(var v=u-1,m=g,y=g,x=null;v>=-1;--v)x=e(h[v]),x&&n(y,x.s)||!(m.i<y.i)||(y=m,null==p.pagePrevDataIndex&&(p.pagePrevDataIndex=m.i),++p.pageCount,++p.pageIndex),m=x;return p},_findTargetItemIndex:function(t){var e,n=this.getContentGroup();return this._showController?n.eachChild(function(n,i){n.__legendDataIndex===t&&(e=i)}):e=0,e}});ql("legendScroll","legendscroll",function(t,e){var n=t.scrollDataIndex;null!=n&&e.eachComponent({mainType:"legend",subType:"scroll",query:t},function(t){t.setScrollDataIndex(n)})});var U_=function(t,e){var n,i=[],r=t.seriesIndex;if(null==r||!(n=e.getSeriesByIndex(r)))return{point:[]};var a=n.getData(),o=Xi(a,t);if(null==o||0>o||_(o))return{point:[]};var s=a.getItemGraphicEl(o),l=n.coordinateSystem;if(n.getTooltipPosition)i=n.getTooltipPosition(o)||[];else if(l&&l.dataToPoint)i=l.dataToPoint(a.getValues(p(l.dimensions,function(t){return a.mapDimension(t)}),o,!0))||[];else if(s){var u=s.getBoundingRect().clone();u.applyTransform(s.transform),i=[u.x+u.width/2,u.y+u.height/2]}return{point:i,el:s}},Z_=f,$_=x,K_=Yi(),Q_=function(t,e,n){var i=t.currTrigger,r=[t.x,t.y],a=t,o=t.dispatchAction||y(n.dispatchAction,n),s=e.getComponent("axisPointer").coordSysAxesInfo;if(s){Ec(r)&&(r=U_({seriesIndex:a.seriesIndex,dataIndex:a.dataIndex},e).point);var l=Ec(r),u=a.axesInfo,h=s.axesInfo,c="leave"===i||Ec(r),d={},f={},p={list:[],map:{}},g={showPointer:$_(Dc,f),showTooltip:$_(kc,p)};Z_(s.coordSysMap,function(t,e){var n=l||t.containPoint(r);Z_(s.coordSysAxesInfo[e],function(t){var e=t.axis,i=Oc(u,t);if(!c&&n&&(!u||i)){var a=i&&i.value;null!=a||l||(a=e.pointToData(r)),null!=a&&Ic(t,a,g,!1,d)}})});var v={};return Z_(h,function(t,e){var n=t.linkGroup;n&&!f[e]&&Z_(n.axesInfo,function(e,i){var r=f[i];if(e!==t&&r){var a=r.value;n.mapper&&(a=t.axis.scale.parse(n.mapper(a,Bc(e),Bc(t)))),v[t.key]=a}})}),Z_(v,function(t,e){Ic(h[e],t,g,!0,d)}),Ac(f,h,d),Pc(p,r,t,o),Lc(h,o,n),d}},J_=(tu({type:"axisPointer",coordSysAxesInfo:null,defaultOption:{show:"auto",triggerOn:null,zlevel:0,z:50,type:"line",snap:!1,triggerTooltip:!0,value:null,status:null,link:[],animation:null,animationDurationUpdate:200,lineStyle:{color:"#aaa",width:1,type:"solid"},shadowStyle:{color:"rgba(150,150,150,0.3)"},label:{show:!0,formatter:null,precision:"auto",margin:3,color:"#fff",padding:[5,7,5,7],backgroundColor:"auto",borderColor:null,borderWidth:0,shadowBlur:3,shadowColor:"#aaa"},handle:{show:!1,icon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",size:45,margin:50,color:"#333",shadowBlur:3,shadowColor:"#aaa",shadowOffsetX:0,shadowOffsetY:2,throttle:40}}}),Yi()),tw=f,ew=eu({type:"axisPointer",render:function(t,e,n){var i=e.getComponent("tooltip"),r=t.get("triggerOn")||i&&i.get("triggerOn")||"mousemove|click";zc("axisPointer",n,function(t,e,n){"none"!==r&&("leave"===t||r.indexOf(t)>=0)&&n({type:"updateAxisPointer",currTrigger:t,x:e&&e.offsetX,y:e&&e.offsetY})})},remove:function(t,e){Vc(e.getZr(),"axisPointer"),ew.superApply(this._model,"remove",arguments)},dispose:function(t,e){Vc("axisPointer",e),ew.superApply(this._model,"dispose",arguments)}}),nw=Yi(),iw=i,rw=y;Gc.prototype={_group:null,_lastGraphicKey:null,_handle:null,_dragging:!1,_lastValue:null,_lastStatus:null,_payloadInfo:null,animationThreshold:15,render:function(t,e,n,i){var r=e.get("value"),a=e.get("status");if(this._axisModel=t,this._axisPointerModel=e,this._api=n,i||this._lastValue!==r||this._lastStatus!==a){this._lastValue=r,this._lastStatus=a;var o=this._group,s=this._handle;if(!a||"hide"===a)return o&&o.hide(),void(s&&s.hide());o&&o.show(),s&&s.show();var l={};this.makeElOption(l,r,t,e,n);var u=l.graphicKey;u!==this._lastGraphicKey&&this.clear(n),this._lastGraphicKey=u;var h=this._moveAnimation=this.determineAnimation(t,e);if(o){var c=x(Xc,e,h);this.updatePointerEl(o,l,c,e),this.updateLabelEl(o,l,c,e)}else o=this._group=new Af,this.createPointerEl(o,l,t,e),this.createLabelEl(o,l,t,e),n.getZr().add(o);Uc(o,e,!0),this._renderHandle(r)}},remove:function(t){this.clear(t)},dispose:function(t){this.clear(t)},determineAnimation:function(t,e){var n=e.get("animation"),i=t.axis,r="category"===i.type,a=e.get("snap");if(!a&&!r)return!1;if("auto"===n||null==n){var o=this.animationThreshold;if(r&&i.getBandWidth()>o)return!0;if(a){var s=fc(t).seriesDataCount,l=i.getExtent();return Math.abs(l[0]-l[1])/s>o}return!1}return n===!0},makeElOption:function(){},createPointerEl:function(t,e){var n=e.pointer;if(n){var i=nw(t).pointerEl=new xv[n.type](iw(e.pointer));t.add(i)}},createLabelEl:function(t,e,n,i){if(e.label){var r=nw(t).labelEl=new tv(iw(e.label));t.add(r),jc(r,i)}},updatePointerEl:function(t,e,n){var i=nw(t).pointerEl;i&&(i.setStyle(e.pointer.style),n(i,{shape:e.pointer.shape}))},updateLabelEl:function(t,e,n,i){var r=nw(t).labelEl;r&&(r.setStyle(e.label.style),n(r,{shape:e.label.shape,position:e.label.position}),jc(r,i))},_renderHandle:function(t){if(!this._dragging&&this.updateHandleTransform){var e=this._axisPointerModel,n=this._api.getZr(),i=this._handle,r=e.getModel("handle"),a=e.get("status");if(!r.get("show")||!a||"hide"===a)return i&&n.remove(i),void(this._handle=null);var o;this._handle||(o=!0,i=this._handle=Ha(r.get("icon"),{cursor:"move",draggable:!0,onmousemove:function(t){Xd(t.event)},onmousedown:rw(this._onHandleDragMove,this,0,0),drift:rw(this._onHandleDragMove,this),ondragend:rw(this._onHandleDragEnd,this)}),n.add(i)),Uc(i,e,!1);var s=["color","borderColor","borderWidth","opacity","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY"];i.setStyle(r.getItemStyle(null,s));var l=r.get("size");_(l)||(l=[l,l]),i.attr("scale",[l[0]/2,l[1]/2]),Vs(this,"_doDispatchAxisPointer",r.get("throttle")||0,"fixRate"),this._moveHandleToValue(t,o)}},_moveHandleToValue:function(t,e){Xc(this._axisPointerModel,!e&&this._moveAnimation,this._handle,qc(this.getHandleTransform(t,this._axisModel,this._axisPointerModel)))},_onHandleDragMove:function(t,e){var n=this._handle;if(n){this._dragging=!0;var i=this.updateHandleTransform(qc(n),[t,e],this._axisModel,this._axisPointerModel);this._payloadInfo=i,n.stopAnimation(),n.attr(qc(i)),nw(n).lastProp=null,this._doDispatchAxisPointer()}},_doDispatchAxisPointer:function(){var t=this._handle;if(t){var e=this._payloadInfo,n=this._axisModel;this._api.dispatchAction({type:"updateAxisPointer",x:e.cursorPoint[0],y:e.cursorPoint[1],tooltipOption:e.tooltipOption,axesInfo:[{axisDim:n.axis.dim,axisIndex:n.componentIndex}]})}},_onHandleDragEnd:function(){this._dragging=!1;var t=this._handle;if(t){var e=this._axisPointerModel.get("value");this._moveHandleToValue(e),this._api.dispatchAction({type:"hideTip"})}},getHandleTransform:null,updateHandleTransform:null,clear:function(t){this._lastValue=null,this._lastStatus=null;var e=t.getZr(),n=this._group,i=this._handle;e&&n&&(this._lastGraphicKey=null,n&&e.remove(n),i&&e.remove(i),this._group=null,this._handle=null,this._payloadInfo=null)},doClear:function(){},buildLabel:function(t,e,n){return n=n||0,{x:t[n],y:t[1-n],width:e[n],height:e[1-n]}}},Gc.prototype.constructor=Gc,Ji(Gc);var aw=Gc.extend({makeElOption:function(t,e,n,i,r){var a=n.axis,o=a.grid,s=i.get("type"),l=id(o,a).getOtherAxis(a).getGlobalExtent(),u=a.toGlobalCoord(a.dataToCoord(e,!0));if(s&&"none"!==s){var h=Zc(i),c=ow[s](a,u,l,h);c.style=h,t.graphicKey=c.type,t.pointer=c}var d=xc(o.model,n);td(e,t,d,n,i,r)},getHandleTransform:function(t,e,n){var i=xc(e.axis.grid.model,e,{labelInside:!1});return i.labelMargin=n.get("handle.margin"),{position:Jc(e.axis,t,i),rotation:i.rotation+(i.labelDirection<0?Math.PI:0)}},updateHandleTransform:function(t,e,n){var i=n.axis,r=i.grid,a=i.getGlobalExtent(!0),o=id(r,i).getOtherAxis(i).getGlobalExtent(),s="x"===i.dim?0:1,l=t.position;l[s]+=e[s],l[s]=Math.min(a[1],l[s]),l[s]=Math.max(a[0],l[s]);var u=(o[1]+o[0])/2,h=[u,u];h[s]=l[s];var c=[{verticalAlign:"middle"},{align:"center"}];return{position:l,rotation:t.rotation,cursorPoint:h,tooltipOption:c[s]}}}),ow={line:function(t,e,n,i){var r=ed([e,n[0]],[e,n[1]],rd(t));return ia({shape:r,style:i}),{type:"Line",shape:r}},shadow:function(t,e,n){var i=Math.max(1,t.getBandWidth()),r=n[1]-n[0];return{type:"Rect",shape:nd([e-i/2,n[0]],[i,r],rd(t))}}};L_.registerAxisPointerClass("CartesianAxisPointer",aw),Xl(function(t){if(t){(!t.axisPointer||0===t.axisPointer.length)&&(t.axisPointer={});var e=t.axisPointer.link;e&&!_(e)&&(t.axisPointer.link=[e])}}),Yl(Ly.PROCESSOR.STATISTIC,function(t,e){t.getComponent("axisPointer").coordSysAxesInfo=oc(t,e)}),ql({type:"updateAxisPointer",event:"updateAxisPointer",update:":updateAxisPointer"},Q_),tu({type:"tooltip",dependencies:["axisPointer"],defaultOption:{zlevel:0,z:60,show:!0,showContent:!0,trigger:"item",triggerOn:"mousemove|click",alwaysShowContent:!1,displayMode:"single",renderMode:"auto",confine:!1,showDelay:0,hideDelay:100,transitionDuration:.4,enterable:!1,backgroundColor:"rgba(50,50,50,0.7)",borderColor:"#333",borderRadius:4,borderWidth:0,padding:5,extraCssText:"",axisPointer:{type:"line",axis:"auto",animation:"auto",animationDurationUpdate:200,animationEasingUpdate:"exponentialOut",crossStyle:{color:"#999",width:1,type:"dashed",textStyle:{}}},textStyle:{color:"#fff",fontSize:14}}});var sw=f,lw=fo,uw=["","-webkit-","-moz-","-o-"],hw="position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;";ld.prototype={constructor:ld,_enterable:!0,update:function(){var t=this._container,e=t.currentStyle||document.defaultView.getComputedStyle(t),n=t.style;"absolute"!==n.position&&"absolute"!==e.position&&(n.position="relative")},show:function(t){clearTimeout(this._hideTimeout);var e=this.el;e.style.cssText=hw+sd(t)+";left:"+this._x+"px;top:"+this._y+"px;"+(t.get("extraCssText")||""),e.style.display=e.innerHTML?"block":"none",e.style.pointerEvents=this._enterable?"auto":"none",this._show=!0},setContent:function(t){this.el.innerHTML=null==t?"":t},setEnterable:function(t){this._enterable=t},getSize:function(){var t=this.el;return[t.clientWidth,t.clientHeight]},moveTo:function(t,e){var n,i=this._zr;i&&i.painter&&(n=i.painter.getViewportRootOffset())&&(t+=n.offsetLeft,e+=n.offsetTop);var r=this.el.style;r.left=t+"px",r.top=e+"px",this._x=t,this._y=e},hide:function(){this.el.style.display="none",this._show=!1},hideLater:function(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(y(this.hide,this),t)):this.hide())},isShow:function(){return this._show},getOuterSize:function(){var t=this.el.clientWidth,e=this.el.clientHeight;if(document.defaultView&&document.defaultView.getComputedStyle){var n=document.defaultView.getComputedStyle(this.el);n&&(t+=parseInt(n.paddingLeft,10)+parseInt(n.paddingRight,10)+parseInt(n.borderLeftWidth,10)+parseInt(n.borderRightWidth,10),e+=parseInt(n.paddingTop,10)+parseInt(n.paddingBottom,10)+parseInt(n.borderTopWidth,10)+parseInt(n.borderBottomWidth,10))}return{width:t,height:e}}},ud.prototype={constructor:ud,_enterable:!0,update:function(){},show:function(){this._hideTimeout&&clearTimeout(this._hideTimeout),this.el.attr("show",!0),this._show=!0},setContent:function(t,e,n){this.el&&this._zr.remove(this.el);for(var i={},r=t,a="{marker",o="|}",s=r.indexOf(a);s>=0;){var l=r.indexOf(o),u=r.substr(s+a.length,l-s-a.length);i["marker"+u]=u.indexOf("sub")>-1?{textWidth:4,textHeight:4,textBorderRadius:2,textBackgroundColor:e[u],textOffset:[3,0]}:{textWidth:10,textHeight:10,textBorderRadius:5,textBackgroundColor:e[u]},r=r.substr(l+1),s=r.indexOf("{marker")}this.el=new Vg({style:{rich:i,text:t,textLineHeight:20,textBackgroundColor:n.get("backgroundColor"),textBorderRadius:n.get("borderRadius"),textFill:n.get("textStyle.color"),textPadding:n.get("padding")},z:n.get("z")}),this._zr.add(this.el);var h=this;this.el.on("mouseover",function(){h._enterable&&(clearTimeout(h._hideTimeout),h._show=!0),h._inContent=!0
}),this.el.on("mouseout",function(){h._enterable&&h._show&&h.hideLater(h._hideDelay),h._inContent=!1})},setEnterable:function(t){this._enterable=t},getSize:function(){var t=this.el.getBoundingRect();return[t.width,t.height]},moveTo:function(t,e){this.el&&this.el.attr("position",[t,e])},hide:function(){this.el.hide(),this._show=!1},hideLater:function(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(y(this.hide,this),t)):this.hide())},isShow:function(){return this._show},getOuterSize:function(){return this.getSize()}};var cw=y,dw=f,fw=Za,pw=new tv({shape:{x:-1,y:-1,width:2,height:2}});eu({type:"tooltip",init:function(t,e){if(!xd.node){var n=t.getComponent("tooltip"),i=n.get("renderMode");this._renderMode=$i(i);var r;"html"===this._renderMode?(r=new ld(e.getDom(),e),this._newLine="<br/>"):(r=new ud(e),this._newLine="\n"),this._tooltipContent=r}},render:function(t,e,n){if(!xd.node){this.group.removeAll(),this._tooltipModel=t,this._ecModel=e,this._api=n,this._lastDataByCoordSys=null,this._alwaysShowContent=t.get("alwaysShowContent");var i=this._tooltipContent;i.update(),i.setEnterable(t.get("enterable")),this._initGlobalListener(),this._keepShow()}},_initGlobalListener:function(){var t=this._tooltipModel,e=t.get("triggerOn");zc("itemTooltip",this._api,cw(function(t,n,i){"none"!==e&&(e.indexOf(t)>=0?this._tryShow(n,i):"leave"===t&&this._hide(i))},this))},_keepShow:function(){var t=this._tooltipModel,e=this._ecModel,n=this._api;if(null!=this._lastX&&null!=this._lastY&&"none"!==t.get("triggerOn")){var i=this;clearTimeout(this._refreshUpdateTimeout),this._refreshUpdateTimeout=setTimeout(function(){i.manuallyShowTip(t,e,n,{x:i._lastX,y:i._lastY})})}},manuallyShowTip:function(t,e,n,i){if(i.from!==this.uid&&!xd.node){var r=cd(i,n);this._ticket="";var a=i.dataByCoordSys;if(i.tooltip&&null!=i.x&&null!=i.y){var o=pw;o.position=[i.x,i.y],o.update(),o.tooltip=i.tooltip,this._tryShow({offsetX:i.x,offsetY:i.y,target:o},r)}else if(a)this._tryShow({offsetX:i.x,offsetY:i.y,position:i.position,event:{},dataByCoordSys:i.dataByCoordSys,tooltipOption:i.tooltipOption},r);else if(null!=i.seriesIndex){if(this._manuallyAxisShowTip(t,e,n,i))return;var s=U_(i,e),l=s.point[0],u=s.point[1];null!=l&&null!=u&&this._tryShow({offsetX:l,offsetY:u,position:i.position,target:s.el,event:{}},r)}else null!=i.x&&null!=i.y&&(n.dispatchAction({type:"updateAxisPointer",x:i.x,y:i.y}),this._tryShow({offsetX:i.x,offsetY:i.y,position:i.position,target:n.getZr().findHover(i.x,i.y).target,event:{}},r))}},manuallyHideTip:function(t,e,n,i){var r=this._tooltipContent;!this._alwaysShowContent&&this._tooltipModel&&r.hideLater(this._tooltipModel.get("hideDelay")),this._lastX=this._lastY=null,i.from!==this.uid&&this._hide(cd(i,n))},_manuallyAxisShowTip:function(t,e,n,i){var r=i.seriesIndex,a=i.dataIndex,o=e.getComponent("axisPointer").coordSysAxesInfo;if(null!=r&&null!=a&&null!=o){var s=e.getSeriesByIndex(r);if(s){var l=s.getData(),t=hd([l.getItemModel(a),s,(s.coordinateSystem||{}).model,t]);if("axis"===t.get("trigger"))return n.dispatchAction({type:"updateAxisPointer",seriesIndex:r,dataIndex:a,position:i.position}),!0}}},_tryShow:function(t,e){var n=t.target,i=this._tooltipModel;if(i){this._lastX=t.offsetX,this._lastY=t.offsetY;var r=t.dataByCoordSys;r&&r.length?this._showAxisTooltip(r,t):n&&null!=n.dataIndex?(this._lastDataByCoordSys=null,this._showSeriesItemTooltip(t,n,e)):n&&n.tooltip?(this._lastDataByCoordSys=null,this._showComponentItemTooltip(t,n,e)):(this._lastDataByCoordSys=null,this._hide(e))}},_showOrMove:function(t,e){var n=t.get("showDelay");e=y(e,this),clearTimeout(this._showTimout),n>0?this._showTimout=setTimeout(e,n):e()},_showAxisTooltip:function(t,e){var n=this._ecModel,i=this._tooltipModel,a=[e.offsetX,e.offsetY],o=[],s=[],l=hd([e.tooltipOption,i]),u=this._renderMode,h=this._newLine,c={};dw(t,function(t){dw(t.dataByAxis,function(t){var e=n.getComponent(t.axisDim+"Axis",t.axisIndex),i=t.value,a=[];if(e&&null!=i){var l=Qc(i,e.axis,n,t.seriesDataIndices,t.valueLabelOpt);f(t.seriesDataIndices,function(o){var h=n.getSeriesByIndex(o.seriesIndex),d=o.dataIndexInside,f=h&&h.getDataParams(d);if(f.axisDim=t.axisDim,f.axisIndex=t.axisIndex,f.axisType=t.axisType,f.axisId=t.axisId,f.axisValue=oh(e.axis,i),f.axisValueLabel=l,f){s.push(f);var p,g=h.formatTooltip(d,!0,null,u);if(S(g)){p=g.html;var v=g.markers;r(c,v)}else p=g;a.push(p)}});var d=l;o.push("html"!==u?a.join(h):(d?po(d)+h:"")+a.join(h))}})},this),o.reverse(),o=o.join(this._newLine+this._newLine);var d=e.position;this._showOrMove(l,function(){this._updateContentNotChangedOnAxis(t)?this._updatePosition(l,d,a[0],a[1],this._tooltipContent,s):this._showTooltipContent(l,o,s,Math.random(),a[0],a[1],d,void 0,c)})},_showSeriesItemTooltip:function(t,e,n){var i=this._ecModel,r=e.seriesIndex,a=i.getSeriesByIndex(r),o=e.dataModel||a,s=e.dataIndex,l=e.dataType,u=o.getData(),h=hd([u.getItemModel(s),o,a&&(a.coordinateSystem||{}).model,this._tooltipModel]),c=h.get("trigger");if(null==c||"item"===c){var d,f,p=o.getDataParams(s,l),g=o.formatTooltip(s,!1,l,this._renderMode);S(g)?(d=g.html,f=g.markers):(d=g,f=null);var v="item_"+o.name+"_"+s;this._showOrMove(h,function(){this._showTooltipContent(h,d,p,v,t.offsetX,t.offsetY,t.position,t.target,f)}),n({type:"showTip",dataIndexInside:s,dataIndex:u.getRawIndex(s),seriesIndex:r,from:this.uid})}},_showComponentItemTooltip:function(t,e,n){var i=e.tooltip;if("string"==typeof i){var r=i;i={content:r,formatter:r}}var a=new Wa(i,this._tooltipModel,this._ecModel),o=a.get("content"),s=Math.random();this._showOrMove(a,function(){this._showTooltipContent(a,o,a.get("formatterParams")||{},s,t.offsetX,t.offsetY,t.position,e)}),n({type:"showTip",from:this.uid})},_showTooltipContent:function(t,e,n,i,r,a,o,s,l){if(this._ticket="",t.get("showContent")&&t.get("show")){var u=this._tooltipContent,h=t.get("formatter");o=o||t.get("position");var c=e;if(h&&"string"==typeof h)c=go(h,n,!0);else if("function"==typeof h){var d=cw(function(e,i){e===this._ticket&&(u.setContent(i,l,t),this._updatePosition(t,o,r,a,u,n,s))},this);this._ticket=i,c=h(n,i,d)}u.setContent(c,l,t),u.show(t),this._updatePosition(t,o,r,a,u,n,s)}},_updatePosition:function(t,e,n,i,r,a,o){var s=this._api.getWidth(),l=this._api.getHeight();e=e||t.get("position");var u=r.getSize(),h=t.get("align"),c=t.get("verticalAlign"),d=o&&o.getBoundingRect().clone();if(o&&d.applyTransform(o.transform),"function"==typeof e&&(e=e([n,i],a,r.el,d,{viewSize:[s,l],contentSize:u.slice()})),_(e))n=fw(e[0],s),i=fw(e[1],l);else if(S(e)){e.width=u[0],e.height=u[1];var f=bo(e,{width:s,height:l});n=f.x,i=f.y,h=null,c=null}else if("string"==typeof e&&o){var p=pd(e,d,u);n=p[0],i=p[1]}else{var p=dd(n,i,r,s,l,h?null:20,c?null:20);n=p[0],i=p[1]}if(h&&(n-=gd(h)?u[0]/2:"right"===h?u[0]:0),c&&(i-=gd(c)?u[1]/2:"bottom"===c?u[1]:0),t.get("confine")){var p=fd(n,i,r,s,l);n=p[0],i=p[1]}r.moveTo(n,i)},_updateContentNotChangedOnAxis:function(t){var e=this._lastDataByCoordSys,n=!!e&&e.length===t.length;return n&&dw(e,function(e,i){var r=e.dataByAxis||{},a=t[i]||{},o=a.dataByAxis||[];n&=r.length===o.length,n&&dw(r,function(t,e){var i=o[e]||{},r=t.seriesDataIndices||[],a=i.seriesDataIndices||[];n&=t.value===i.value&&t.axisType===i.axisType&&t.axisId===i.axisId&&r.length===a.length,n&&dw(r,function(t,e){var i=a[e];n&=t.seriesIndex===i.seriesIndex&&t.dataIndex===i.dataIndex})})}),this._lastDataByCoordSys=t,!!n},_hide:function(t){this._lastDataByCoordSys=null,t({type:"hideTip",from:this.uid})},dispose:function(t,e){xd.node||(this._tooltipContent.hide(),Vc("itemTooltip",e))}}),ql({type:"showTip",event:"showTip",update:"tooltip:manuallyShowTip"},function(){}),ql({type:"hideTip",event:"hideTip",update:"tooltip:manuallyHideTip"},function(){}),t.version=by,t.dependencies=Sy,t.PRIORITY=Ly,t.init=Rl,t.connect=Fl,t.disConnect=Nl,t.disconnect=Qy,t.dispose=Hl,t.getInstanceByDom=Wl,t.getInstanceById=Vl,t.registerTheme=Gl,t.registerPreprocessor=Xl,t.registerProcessor=Yl,t.registerPostUpdate=jl,t.registerAction=ql,t.registerCoordinateSystem=Ul,t.getCoordinateSystemDimensions=Zl,t.registerLayout=$l,t.registerVisual=Kl,t.registerLoading=Jl,t.extendComponentModel=tu,t.extendComponentView=eu,t.extendSeriesModel=nu,t.extendChartView=iu,t.setCanvasCreator=ru,t.registerMap=au,t.getMap=ou,t.dataTool=Jy,t.zrender=Tp,t.number=Av,t.format=Fv,t.throttle=Ws,t.helper=t_,t.matrix=Kd,t.vector=Nd,t.color=mf,t.parseGeoJSON=n_,t.parseGeoJson=o_,t.util=s_,t.graphic=l_,t.List=cx,t.Model=Wa,t.Axis=a_,t.env=xd});

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_mpvue_loader_lib_selector_type_script_index_0_echarts_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mpvue_loader_lib_template_compiler_index_id_data_v_1f4f024c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_mpvue_loader_lib_selector_type_template_index_0_echarts_vue__ = __webpack_require__(66);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(34)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1f4f024c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_mpvue_loader_lib_selector_type_script_index_0_echarts_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__mpvue_loader_lib_template_compiler_index_id_data_v_1f4f024c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_mpvue_loader_lib_selector_type_template_index_0_echarts_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules\\mpvue-echarts\\src\\echarts.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] echarts.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f4f024c", Component.options)
  } else {
    hotAPI.reload("data-v-1f4f024c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(14);
var defined = __webpack_require__(15);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(53);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return typeof global !== 'undefined' ? global : this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//配置项

var defaulthost = 'https://crm.yunzoe.com/yzcrm/';
var sourcehost = 'http://crm.yunzoe.com/';
var SESSIONID = '';
var rememberMe = '';
var account = '';
var cipher = '';
var userData = {
    cId: 201901973891,
    imgUrl: "34d21231-7ec6-461d-9445-647ac98a81e1.png",
    name: "用户y",
    pId: 105,
    private_deptid: 2,
    roleid: 78,
    second_id: 61,
    portrait: 'https://crm.yunzoe.com/upload/201901973891/34d21231-7ec6-461d-9445-647ac98a81e1.png'
};
var information = {
    clueupdateData: '',
    clueDetailData: '',
    cluePoolDetailData: '',

    customerupdateData: '',
    customerDetailData: '',
    customerPoolDetailData: '',

    contactupdateData: '',
    contactPoolNameData: '',
    contactDetailData: '',

    opportunityupdateData: '',
    opportunityPoolNameData: '',
    opportunityDetailData: '',
    failReason: '',

    agreementupdateData: '',
    agreementDetailData: '',
    agreementPoolNameData: '',
    followDetailData: '',

    payplanData: '',
    payinfoData: '',
    payCollectionDetailData: '',

    outworkupdateData: '',
    outworkDetailData: '',
    outworkPoolName: '',
    outworkAssistants: '',

    taskupdateData: '',
    taskDetailData: '',
    taskPoolName: '',

    noteupdateData: '',
    noteDetailData: '',

    orderupdateData: '',
    orderDetailData: '',
    orderPoolNameData: '',
    orderProductData: ''
};

var config = {
    defaulthost: defaulthost,
    sourcehost: sourcehost,
    SESSIONID: SESSIONID,
    rememberMe: rememberMe,
    account: account,
    cipher: cipher,
    userData: userData,
    information: information
};

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

function getCtx (selector) {
    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];

    const componentCtx = ctx.selectComponent(selector);

    if (!componentCtx) {
        console.error('无法找到对应的组件，请按文档说明使用组件');
        return null;
    }
    return componentCtx;
}

function Toast(options) {
    const { selector = '#toast' } = options;
    const ctx = getCtx(selector);

    ctx.handleShow(options);
}

Toast.hide = function (selector = '#toast') {
    const ctx = getCtx(selector);

    ctx.handleHide();
};

function Message(options) {
    const { selector = '#message' } = options;
    const ctx = getCtx(selector);

    ctx.handleShow(options);
}

module.exports = {
    $Toast: Toast,
    $Message: Message
};

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['text']
});

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('p', {
    staticClass: "card"
  }, [_vm._v("\n    " + _vm._s(_vm.text) + "\n  ")])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cef12b42", esExports)
  }
}

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wx_canvas__ = __webpack_require__(65);

//
//
//
//
//
//
//
//
//
//
//
//
//



function wrapTouch(e) {
  for (var i = 0; i < e.mp.touches.length; i += 1) {
    var touch = e.mp.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return e;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    echarts: {
      required: true,
      type: Object,
      default: function _default() {
        return null;
      }
    },
    onInit: {
      type: Function,
      default: null
    },
    canvasId: {
      type: String,
      default: 'ec-canvas'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    disableTouch: {
      type: Boolean,
      default: false
    },
    throttleTouch: {
      type: Boolean,
      default: false
    }
  },
  onReady: function onReady() {
    if (!this.echarts) {
      console.warn('组件需绑定 echarts 变量，例：<ec-canvas id="mychart-dom-bar" ' + 'canvas-id="mychart-bar" :echarts="echarts"></ec-canvas>');
      return;
    }

    if (!this.lazyLoad) this.init();
  },

  methods: {
    init: function init(callback) {
      var _this = this;

      var version = wx.version.version.split('.').map(function (n) {
        return parseInt(n, 10);
      });
      var isValid = version[0] > 1 || version[0] === 1 && version[1] > 9 || version[0] === 1 && version[1] === 9 && version[2] >= 91;
      if (!isValid) {
        console.error('微信基础库版本过低，需大于等于 1.9.91。' + '参见：https://github.com/ecomfe/echarts-for-weixin' + '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82');
        return;
      }

      var canvasId = this.canvasId;

      this.ctx = wx.createCanvasContext(canvasId);

      var canvas = new __WEBPACK_IMPORTED_MODULE_1__wx_canvas__["a" /* default */](this.ctx, canvasId);

      this.echarts.setCanvasCreator(function () {
        return canvas;
      });

      var query = wx.createSelectorQuery();
      query.select('#' + canvasId).boundingClientRect(function (res) {
        if (!res) {
          setTimeout(function () {
            return _this.init();
          }, 50);
          return;
        }

        var width = res.width,
            height = res.height;


        if (typeof callback === 'function') {
          _this.chart = callback(canvas, width, height);
        } else if (typeof _this.onInit === 'function') {
          _this.chart = _this.onInit(canvas, width, height);
        } else {
          _this.chart = _this.$emit('init', { canvas: canvas, width: width, height: height });
        }

        if (!_this.chart) {
          return;
        }

        var _chart$getZr = _this.chart.getZr(),
            handler = _chart$getZr.handler;

        _this.handler = handler;
        _this.processGesture = handler.proxy.processGesture || function () {};
      }).exec();
    },
    canvasToTempFilePath: function canvasToTempFilePath(opt) {
      var canvasId = this.canvasId;

      this.ctx.draw(true, function () {
        wx.canvasToTempFilePath(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          canvasId: canvasId
        }, opt));
      });
    },
    touchStart: function touchStart(e) {
      var disableTouch = this.disableTouch,
          chart = this.chart;

      if (disableTouch || !chart || !e.mp.touches.length) return;
      var touch = e.mp.touches[0];
      this.handler.dispatch('mousedown', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.processGesture(wrapTouch(e), 'start');
    },
    touchMove: function touchMove(e) {
      var disableTouch = this.disableTouch,
          throttleTouch = this.throttleTouch,
          chart = this.chart,
          lastMoveTime = this.lastMoveTime;

      if (disableTouch || !chart || !e.mp.touches.length) return;

      if (throttleTouch) {
        var currMoveTime = Date.now();
        if (currMoveTime - lastMoveTime < 240) return;
        this.lastMoveTime = currMoveTime;
      }

      var touch = e.mp.touches[0];
      this.handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.processGesture(wrapTouch(e), 'change');
    },
    touchEnd: function touchEnd(e) {
      var disableTouch = this.disableTouch,
          chart = this.chart;

      if (disableTouch || !chart) return;
      var touch = e.mp.changedTouches ? e.mp.changedTouches[0] : {};
      this.handler.dispatch('mouseup', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.handler.dispatch('click', {
        zrX: touch.x,
        zrY: touch.y
      });
      this.processGesture(wrapTouch(e), 'end');
    }
  }
});

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(37);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
module.exports = __webpack_require__(6).Object.assign;


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(40);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(50) });


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(6);
var ctx = __webpack_require__(41);
var hide = __webpack_require__(43);
var has = __webpack_require__(12);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(42);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 421:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(423);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(44);
var createDesc = __webpack_require__(49);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(45);
var IE8_DOM_DEFINE = __webpack_require__(46);
var toPrimitive = __webpack_require__(48);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(47)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 49:
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(499);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(500), __esModule: true };

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(4);
var getKeys = __webpack_require__(51);
var gOPS = __webpack_require__(62);
var pIE = __webpack_require__(63);
var toObject = __webpack_require__(64);
var IObject = __webpack_require__(14);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(8)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(501);
var $Object = __webpack_require__(6).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(40);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', { defineProperty: __webpack_require__(44).f });


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(52);
var enumBugKeys = __webpack_require__(61);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(12);
var toIObject = __webpack_require__(13);
var arrayIndexOf = __webpack_require__(54)(false);
var IE_PROTO = __webpack_require__(57)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13);
var toLength = __webpack_require__(55);
var toAbsoluteIndex = __webpack_require__(56);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(16);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(16);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(58)('keys');
var uid = __webpack_require__(60);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(6);
var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(59) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 59:
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 60:
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 61:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 62:
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 63:
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(15);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class WxCanvas {
  constructor(ctx, canvasId) {
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;

    WxCanvas.initStyle(ctx);
    this.initEvent();
  }

  getContext(contextType) {
    return contextType === '2d' ? this.ctx : null;
  }

  setChart(chart) {
    this.chart = chart;
  }

  attachEvent() {
    // noop
  }

  detachEvent() {
    // noop
  }

  static initStyle(ctx) {
    const styles = ['fillStyle', 'strokeStyle', 'globalAlpha',
      'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
      'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];

    styles.forEach((style) => {
      Object.defineProperty(ctx, style, {
        set: (value) => {
          if ((style !== 'fillStyle' && style !== 'strokeStyle')
            || (value !== 'none' && value !== null)
          ) {
            ctx[`set${style.charAt(0).toUpperCase()}${style.slice(1)}`](value);
          }
        },
      });
    });

    ctx.createRadialGradient = () => ctx.createCircularGradient(arguments);
  }

  initEvent() {
    this.event = {};
    const eventNames = [{
      wxName: 'touchStart',
      ecName: 'mousedown',
    }, {
      wxName: 'touchMove',
      ecName: 'mousemove',
    }, {
      wxName: 'touchEnd',
      ecName: 'mouseup',
    }, {
      wxName: 'touchEnd',
      ecName: 'click',
    }];

    eventNames.forEach((name) => {
      this.event[name.wxName] = (e) => {
        const touch = e.mp.touches[0];
        this.chart.getZr().handler.dispatch(name.ecName, {
          zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
          zrY: name.wxName === 'tap' ? touch.clientY : touch.y,
        });
      };
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WxCanvas;



/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.canvasId) ? _c('canvas', {
    staticClass: "ec-canvas",
    attrs: {
      "id": _vm.canvasId,
      "canvasId": _vm.canvasId,
      "eventid": '0'
    },
    on: {
      "touchstart": _vm.touchStart,
      "touchmove": _vm.touchMove,
      "touchend": _vm.touchEnd,
      "error": _vm.error
    }
  }) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1f4f024c", esExports)
  }
}

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_card_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_cef12b42_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_card_vue__ = __webpack_require__(33);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(31)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_card_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_cef12b42_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_card_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\card.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] card.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cef12b42", Component.options)
  } else {
    hotAPI.reload("data-v-cef12b42", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

});