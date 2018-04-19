import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  log(item) {
    console.log(item, null, 4);
  }

  extractDateTime(value) {
    const jsDate = new Date(value);

    const rDate = jsDate.getDate() + '/' + (jsDate.getMonth() + 1) + '/' + jsDate.getFullYear();
    const rTime = jsDate.getHours() + ':' + jsDate.getMinutes();

    return {
      date: rDate,
      time: rTime
    }
  }

  /**
  * @function isNullOrUndef
	* Returns true if `value` is neither null nor undefined, else returns false.
  *
	* @param {*} value - The value to test.
  *
	* @returns {Boolean}
	*/
	isNullOrUndef(value){
		return ((value === null) || (typeof(value) === 'undefined'));
	}

  /**
  * @function isArray
  * Returns true if `value` is an array, else returns false.
  *
	* @param {*} value - The value to test.
  *
	* @returns {Boolean}
	*/
  isArray(value){
  	return Object.prototype.toString.call(value) === '[object Array]';
  }

  /**
  * @function isObject
	* Returns true if `value` is an object (excluding null), else returns false.
  *
	* @param {*} value - The value to test.
	* @returns {Boolean}
	*/
	isObject(value){
		return ((value !== null) && (Object.prototype.toString.call(value) === '[object Object]'));
	}

  /**
  * @function valueOrDefault
	* Returns `value` if defined, else returns `defaultValue`.
  *
	* @param {*} value - The value to return if defined.
	* @param {*} defaultValue - The value to return if `value` is undefined.
  *
	* @returns {*}
	*/
	valueOrDefault(value, defaultValue){
		return (typeof(value) === 'undefined') ? defaultValue : value;
	}

  /**
  * @default valueAtIndexOrDefault
	* Returns value at the given `index` in array if defined, else returns `defaultValue`.
  *
	* @param {Array} value - The array to lookup for value at `index`.
	* @param {Number} index - The index in `value` to lookup for value.
	* @param {*} defaultValue - The value to return if `value[index]` is undefined.
  *
	* @returns {*}
	*/
	valueAtIndexOrDefault(value, index, defaultValue) {
		return this.valueOrDefault((this.isArray(value) ? value[index] : value), defaultValue);
	}

	/**
  * @function callback
	* Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
	* value returned by `fn`. If `fn` is not a function, this method returns undefined.
  *
  * @param {Function} fn - The function to call.
	* @param {Array|undefined|null} args - The arguments with which `fn` should be called.
	* @param {Object} [thisArg] - The value of `this` provided for the call to `fn`.
  *
	* @returns {*}
	*/
	callback(fn, args, thisArg) {
		if (fn && (typeof(fn.call) === 'function')) {
			return fn.apply(thisArg, args);
		}
	}

	/**
  * @function each
	* Note(SB) for performance sake, this method should only be used when loopable type
	* is unknown or in none intensive code (not called often and small loopable). Else
	* it's preferable to use a regular for() loop and save extra function calls.
  *
	* @param {Object|Array} loopable - The object or array to be iterated.
	* @param {Function} fn - The function to call for each item.
	* @param {Object} [thisArg] - The value of `this` provided for the call to `fn`.
	* @param {Boolean} [reverse] - If true, iterates backward on the loopable.
	*/
	each(loopable, fn, thisArg?, reverse?) {
		let i, len, keys;
		if (this.isArray(loopable)) {
			len = loopable.length;
			if (reverse) {
				for (i = len - 1; i >= 0; i--) {
					fn.call(thisArg, loopable[i], i);
				}
			} else {
				for (i = 0; i < len; i++) {
					fn.call(thisArg, loopable[i], i);
				}
			}
		} else if (this.isObject(loopable)) {
			keys = Object.keys(loopable);
			len = keys.length;
			for (i = 0; i < len; i++) {
				fn.call(thisArg, loopable[keys[i]], keys[i]);
			}
		}
	}

	/**
  * @function arrayEquals
	* Returns true if the `a0` and `a1` arrays have the same content, else returns false.
	* @see http://stackoverflow.com/a/14853974
  *
	* @param {Array} a0 - The array to compare
	* @param {Array} a1 - The array to compare
  *
	* @returns {Boolean}
	*/
	arrayEquals(a0, a1) {
		let i, ilen, v0, v1;

		if (!a0 || !a1 || a0.length !== a1.length) {
			return false;
		}

		for (i = 0, ilen = a0.length; i < ilen; ++i) {
			v0 = a0[i];
			v1 = a1[i];

			if (v0 instanceof Array && v1 instanceof Array) {
				if (!this.arrayEquals(v0, v1)) {
					return false;
				}
			} else if (v0 !== v1) {
				// NOTE: two different object instances will never be equal: {x:20} != {x:20}
				return false;
			}
		}

		return true;
	}

  /**
  * @function clone
	* Returns a deep copy of `source` without keeping references on objects and arrays.
  *
	* @param {*} source - The value to clone.
  *
	* @returns {*}
	*/
	clone(source) {

		if (this.isArray(source)) {
			return source.map(this.clone); // ERROR HERE - SOLUTION IS HOW TO MAKE this.clone map as function to source
		}

		if (this.isObject(source)) {
			let target = {};
			let keys = Object.keys(source);
			let klen = keys.length;
			let k = 0;

			for (; k < klen; ++k) {
				target[keys[k]] = this.clone(source[keys[k]]);
			}

			return target;
		}

		return source;
	}


	/**
  * @function cloneObject
	* Clone Object
  *
  * @param {object} source
  *
  * @return {object}
	*/
	cloneObject(source) {
		return source.map(x => Object.assign({}, x));
	}

	/**
	 * @function cloneJSON
   * clone by using JSON functions
   *
   * @param source
   *
   * @return {*}
	 */
	cloneJSON(source) {
		return JSON.parse(JSON.stringify(source));
	}

  /**
	* The default merger when Chart.helpers.merge is called without merger option.
	* Note(SB): this method is also used by configMerge and scaleMerge as fallback.
	* @private
	*/
	_merger(key, target, source, options) {
		let tval = target[key];
		let sval = source[key];

		if (this.isObject(tval) && this.isObject(sval)) {
			this.merge(tval, sval, options);
		} else {
			target[key] = this.clone(sval);
		}
	}

  /**
	* Merges source[key] in target[key] only if target[key] is undefined.
	* @private
	*/
	_mergerIf(key, target, source) {
		let tval = target[key];
		let sval = source[key];

		if (this.isObject(tval) && this.isObject(sval)) {
			this.mergeIf(tval, sval);
		} else if (!target.hasOwnProperty(key)) {
			target[key] = this.clone(sval);
		}
	}

  /**
	* Recursively deep copies `source` properties into `target` with the given `options`.
	* IMPORTANT: `target` is not cloned and will be updated with `source` properties.
	* @param {Object} target - The target object in which all sources are merged into.
	* @param {Object|Array(Object)} source - Object(s) to merge into `target`.
	* @param {Object} [options] - Merging options:
	* @param {Function} [options.merger] - The merge method (key, target, source, options)
	* @returns {Object} The `target` object.
	*/
	merge(target, source, options) {
		let sources = this.isArray(source) ? source : [source];
		let ilen = sources.length;
		let merge, i, keys, klen, k;

		if (!this.isObject(target)) {
			return target;
		}

		options = options || {};
		merge = options.merger || this._merger;

		for (i = 0; i < ilen; ++i) {
			source = sources[i];
			if (!this.isObject(source)) {
				continue;
			}

			keys = Object.keys(source);
			for (k = 0, klen = keys.length; k < klen; ++k) {
				merge(keys[k], target, source, options);
			}
		}

		return target;
	}

	/**
	* Recursively deep copies `source` properties into `target` *only* if not defined in target.
	* IMPORTANT: `target` is not cloned and will be updated with `source` properties.
	* @param {Object} target - The target object in which all sources are merged into.
	* @param {Object|Array(Object)} source - Object(s) to merge into `target`.
	* @returns {Object} The `target` object.
	*/
	mergeIf(target, source) {
		return this.merge(target, source, {merger: this._mergerIf});
	}

  /**
	* Applies the contents of two or more objects together into the first object.
  * @param {Object} target - The target object in which all objects are merged into.
	* @param {Object} arg1 - Object containing additional properties to merge in target.
	* @param {Object} argN - Additional objects containing properties to merge in target.
	* @returns {Object} The `target` object.
	*/
	extend(target) {
		let setFn = function(value, key) {
			target[key] = value;
		};
		for (let i = 1, ilen = arguments.length; i < ilen; ++i) {
			this.each(arguments[i], setFn);
		}
		return target;
	}

}
