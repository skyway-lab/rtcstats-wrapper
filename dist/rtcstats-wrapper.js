(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.RTCStatsMoment = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*
	The MIT License (MIT)

	Copyright (c) 2016 CoderPuppy

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

	*/
	var _endianness;
	function endianness() {
	  if (typeof _endianness === 'undefined') {
	    var a = new ArrayBuffer(2);
	    var b = new Uint8Array(a);
	    var c = new Uint16Array(a);
	    b[0] = 1;
	    b[1] = 2;
	    if (c[0] === 258) {
	      _endianness = 'BE';
	    } else if (c[0] === 513){
	      _endianness = 'LE';
	    } else {
	      throw new Error('unable to figure out endianess');
	    }
	  }
	  return _endianness;
	}

	function hostname() {
	  if (typeof global.location !== 'undefined') {
	    return global.location.hostname
	  } else return '';
	}

	function loadavg() {
	  return [];
	}

	function uptime() {
	  return 0;
	}

	function freemem() {
	  return Number.MAX_VALUE;
	}

	function totalmem() {
	  return Number.MAX_VALUE;
	}

	function cpus() {
	  return [];
	}

	function type() {
	  return 'Browser';
	}

	function release () {
	  if (typeof global.navigator !== 'undefined') {
	    return global.navigator.appVersion;
	  }
	  return '';
	}

	function networkInterfaces(){}
	function getNetworkInterfaces(){}

	function tmpDir() {
	  return '/tmp';
	}
	var tmpdir = tmpDir;

	var EOL = '\n';
	var require$$0 = {
	  EOL: EOL,
	  tmpdir: tmpdir,
	  tmpDir: tmpDir,
	  networkInterfaces:networkInterfaces,
	  getNetworkInterfaces: getNetworkInterfaces,
	  release: release,
	  type: type,
	  cpus: cpus,
	  totalmem: totalmem,
	  freemem: freemem,
	  uptime: uptime,
	  loadavg: loadavg,
	  hostname: hostname,
	  endianness: endianness,
	};

	var isType_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	var isType = function (type, value) {
	  return typeof value === type;
	};
	exports.isType = isType;
	var isObject = function (value) {
	  return isType("object", value);
	};
	exports.isObject = isObject;
	var isString = function (value) {
	  return isType("string", value);
	};
	exports.isString = isString;
	var isNumber = function (value) {
	  return isType("number", value);
	};
	exports.isNumber = isNumber;
	});

	unwrapExports(isType_1);
	var isType_2 = isType_1.isType;
	var isType_3 = isType_1.isObject;
	var isType_4 = isType_1.isString;
	var isType_5 = isType_1.isNumber;

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };



	var isObject = isType_1.isObject;
	var isString = isType_1.isString;

	/**
	 * Represents an Item of an Enum.
	 * @param {String} key   The Enum key.
	 * @param {Number} value The Enum value.
	 */

	var EnumItem = (function () {

	  /*constructor reference so that, this.constructor===EnumItem//=>true */

	  function EnumItem(key, value) {
	    var options = arguments[2] === undefined ? {} : arguments[2];

	    _classCallCheck(this, EnumItem);

	    this.key = key;
	    this.value = value;

	    this._options = options;
	    this._options.ignoreCase = this._options.ignoreCase || false;
	  }

	  /**
	   * Checks if the flagged EnumItem has the passing object.
	   * @param  {EnumItem || String || Number} value The object to check with.
	   * @return {Boolean}                            The check result.
	   */

	  EnumItem.prototype.has = function has(value) {
	    if (EnumItem.isEnumItem(value)) {
	      return (this.value & value.value) !== 0;
	    } else if (isString(value)) {
	      if (this._options.ignoreCase) {
	        return this.key.toLowerCase().indexOf(value.toLowerCase()) >= 0;
	      }
	      return this.key.indexOf(value) >= 0;
	    } else {
	      return (this.value & value) !== 0;
	    }
	  };

	  /**
	   * Checks if the EnumItem is the same as the passing object.
	   * @param  {EnumItem || String || Number} key The object to check with.
	   * @return {Boolean}                          The check result.
	   */

	  EnumItem.prototype.is = function is(key) {
	    if (EnumItem.isEnumItem(key)) {
	      return this.key === key.key;
	    } else if (isString(key)) {
	      if (this._options.ignoreCase) {
	        return this.key.toLowerCase() === key.toLowerCase();
	      }
	      return this.key === key;
	    } else {
	      return this.value === key;
	    }
	  };

	  /**
	   * Returns String representation of this EnumItem.
	   * @return {String} String representation of this EnumItem.
	   */

	  EnumItem.prototype.toString = function toString() {
	    return this.key;
	  };

	  /**
	   * Returns JSON object representation of this EnumItem.
	   * @return {String} JSON object representation of this EnumItem.
	   */

	  EnumItem.prototype.toJSON = function toJSON() {
	    return this.key;
	  };

	  /**
	   * Returns the value to compare with.
	   * @return {String} The value to compare with.
	   */

	  EnumItem.prototype.valueOf = function valueOf() {
	    return this.value;
	  };

	  EnumItem.isEnumItem = function isEnumItem(value) {
	    return value instanceof EnumItem || isObject(value) && value.key !== undefined && value.value !== undefined;
	  };

	  return EnumItem;
	})();

	var enumItem = EnumItem;

	var indexOf_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	var indexOf = Array.prototype.indexOf || function (find, i /*opt*/) {
	  if (i === undefined) i = 0;
	  if (i < 0) i += this.length;
	  if (i < 0) i = 0;
	  for (var n = this.length; i < n; i++) if (i in this && this[i] === find) return i;
	  return -1;
	};
	exports.indexOf = indexOf;
	});

	unwrapExports(indexOf_1);
	var indexOf_2 = indexOf_1.indexOf;

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	var isBuffer_1 = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	};

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}

	var _enum = createCommonjsModule(function (module) {

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var os = _interopRequire(require$$0);

	var EnumItem = _interopRequire(enumItem);



	var isString = isType_1.isString;
	var isNumber = isType_1.isNumber;

	var indexOf = indexOf_1.indexOf;

	var isBuffer = _interopRequire(isBuffer_1);

	var endianness = os.endianness();

	/**
	 * Represents an Enum with enum items.
	 * @param {Array || Object}  map     This are the enum items.
	 * @param {String || Object} options This are options. [optional]
	 */

	var Enum = (function () {
	  function Enum(map, options) {
	    var _this = this;

	    _classCallCheck(this, Enum);

	    /* implement the "ref type interface", so that Enum types can
	     * be used in `node-ffi` function declarations and invokations.
	     * In C, these Enums act as `uint32_t` types.
	     *
	     * https://github.com/TooTallNate/ref#the-type-interface
	     */
	    this.size = 4;
	    this.indirection = 1;

	    if (options && isString(options)) {
	      options = { name: options };
	    }

	    this._options = options || {};
	    this._options.separator = this._options.separator || " | ";
	    this._options.endianness = this._options.endianness || endianness;
	    this._options.ignoreCase = this._options.ignoreCase || false;
	    this._options.freez = this._options.freez || false;

	    this.enums = [];

	    if (map.length) {
	      this._enumLastIndex = map.length;
	      var array = map;
	      map = {};

	      for (var i = 0; i < array.length; i++) {
	        map[array[i]] = Math.pow(2, i);
	      }
	    }

	    for (var member in map) {
	      guardReservedKeys(this._options.name, member);
	      this[member] = new EnumItem(member, map[member], { ignoreCase: this._options.ignoreCase });
	      this.enums.push(this[member]);
	    }
	    this._enumMap = map;

	    if (this._options.ignoreCase) {
	      this.getLowerCaseEnums = function () {
	        var res = {};
	        for (var i = 0, len = this.enums.length; i < len; i++) {
	          res[this.enums[i].key.toLowerCase()] = this.enums[i];
	        }
	        return res;
	      };
	    }

	    if (this._options.name) {
	      this.name = this._options.name;
	    }

	    var isFlaggable = function () {
	      for (var i = 0, len = _this.enums.length; i < len; i++) {
	        var e = _this.enums[i];

	        if (!(e.value !== 0 && !(e.value & e.value - 1))) {
	          return false;
	        }
	      }
	      return true;
	    };

	    this.isFlaggable = isFlaggable();
	    if (this._options.freez) {
	      this.freezeEnums(); //this will make instances of Enum non-extensible
	    }
	  }

	  /**
	   * Returns the appropriate EnumItem key.
	   * @param  {EnumItem || String || Number} key The object to get with.
	   * @return {String}                           The get result.
	   */

	  Enum.prototype.getKey = function getKey(value) {
	    var item = this.get(value);
	    if (item) {
	      return item.key;
	    }
	  };

	  /**
	   * Returns the appropriate EnumItem value.
	   * @param  {EnumItem || String || Number} key The object to get with.
	   * @return {Number}                           The get result.
	   */

	  Enum.prototype.getValue = function getValue(key) {
	    var item = this.get(key);
	    if (item) {
	      return item.value;
	    }
	  };

	  /**
	   * Returns the appropriate EnumItem.
	   * @param  {EnumItem || String || Number} key The object to get with.
	   * @return {EnumItem}                         The get result.
	   */

	  Enum.prototype.get = function get(key, offset) {
	    if (key === null || key === undefined) {
	      return;
	    } // Buffer instance support, part of the ref Type interface
	    if (isBuffer(key)) {
	      key = key["readUInt32" + this._options.endianness](offset || 0);
	    }

	    if (EnumItem.isEnumItem(key)) {
	      var foundIndex = indexOf.call(this.enums, key);
	      if (foundIndex >= 0) {
	        return key;
	      }
	      if (!this.isFlaggable || this.isFlaggable && key.key.indexOf(this._options.separator) < 0) {
	        return;
	      }
	      return this.get(key.key);
	    } else if (isString(key)) {

	      var enums = this;
	      if (this._options.ignoreCase) {
	        enums = this.getLowerCaseEnums();
	        key = key.toLowerCase();
	      }

	      if (key.indexOf(this._options.separator) > 0) {
	        var parts = key.split(this._options.separator);

	        var value = 0;
	        for (var i = 0; i < parts.length; i++) {
	          var part = parts[i];

	          value |= enums[part].value;
	        }

	        return new EnumItem(key, value);
	      } else {
	        return enums[key];
	      }
	    } else {
	      for (var m in this) {
	        if (this.hasOwnProperty(m)) {
	          if (this[m].value === key) {
	            return this[m];
	          }
	        }
	      }

	      var result = null;

	      if (this.isFlaggable) {
	        for (var n in this) {
	          if (this.hasOwnProperty(n)) {
	            if ((key & this[n].value) !== 0) {
	              if (result) {
	                result += this._options.separator;
	              } else {
	                result = "";
	              }
	              result += n;
	            }
	          }
	        }
	      }

	      return this.get(result || null);
	    }
	  };

	  /**
	   * Sets the Enum "value" onto the give `buffer` at the specified `offset`.
	   * Part of the ref "Type interface".
	   *
	   * @param  {Buffer} buffer The Buffer instance to write to.
	   * @param  {Number} offset The offset in the buffer to write to. Default 0.
	   * @param  {EnumItem || String || Number} value The EnumItem to write.
	   */

	  Enum.prototype.set = function set(buffer, offset, value) {
	    var item = this.get(value);
	    if (item) {
	      return buffer["writeUInt32" + this._options.endianness](item.value, offset || 0);
	    }
	  };

	  /**
	   * Define freezeEnums() as a property of the prototype.
	   * make enumerable items nonconfigurable and deep freeze the properties. Throw Error on property setter.
	   */

	  Enum.prototype.freezeEnums = function freezeEnums() {
	    function envSupportsFreezing() {
	      return Object.isFrozen && Object.isSealed && Object.getOwnPropertyNames && Object.getOwnPropertyDescriptor && Object.defineProperties && Object.__defineGetter__ && Object.__defineSetter__;
	    }

	    function freezer(o) {
	      var props = Object.getOwnPropertyNames(o);
	      props.forEach(function (p) {
	        if (!Object.getOwnPropertyDescriptor(o, p).configurable) {
	          return;
	        }

	        Object.defineProperties(o, p, { writable: false, configurable: false });
	      });
	      return o;
	    }

	    function getPropertyValue(value) {
	      return value;
	    }

	    function deepFreezeEnums(o) {
	      if (typeof o !== "object" || o === null || Object.isFrozen(o) || Object.isSealed(o)) {
	        return;
	      }
	      for (var key in o) {
	        if (o.hasOwnProperty(key)) {
	          o.__defineGetter__(key, getPropertyValue.bind(null, o[key]));
	          o.__defineSetter__(key, function throwPropertySetError(value) {
	            throw TypeError("Cannot redefine property; Enum Type is not extensible.");
	          });
	          deepFreezeEnums(o[key]);
	        }
	      }
	      if (Object.freeze) {
	        Object.freeze(o);
	      } else {
	        freezer(o);
	      }
	    }

	    if (envSupportsFreezing()) {
	      deepFreezeEnums(this);
	    }

	    return this;
	  };

	  /**
	   * Return true whether the enumItem parameter passed in is an EnumItem object and 
	   * has been included as constant of this Enum   
	   * @param  {EnumItem} enumItem
	   */

	  Enum.prototype.isDefined = function isDefined(enumItem) {
	    var condition = function (e) {
	      return e === enumItem;
	    };
	    if (isString(enumItem) || isNumber(enumItem)) {
	      condition = function (e) {
	        return e.is(enumItem);
	      };
	    }
	    return this.enums.some(condition);
	  };

	  /**
	   * Returns JSON object representation of this Enum.
	   * @return {String} JSON object representation of this Enum.
	   */

	  Enum.prototype.toJSON = function toJSON() {
	    return this._enumMap;
	  };

	  /**
	   * Extends the existing Enum with a New Map.
	   * @param  {Array}  map  Map to extend from
	   */

	  Enum.prototype.extend = function extend(map) {
	    if (map.length) {
	      var array = map;
	      map = {};

	      for (var i = 0; i < array.length; i++) {
	        var exponent = this._enumLastIndex + i;
	        map[array[i]] = Math.pow(2, exponent);
	      }

	      for (var member in map) {
	        guardReservedKeys(this._options.name, member);
	        this[member] = new EnumItem(member, map[member], { ignoreCase: this._options.ignoreCase });
	        this.enums.push(this[member]);
	      }

	      for (var key in this._enumMap) {
	        map[key] = this._enumMap[key];
	      }

	      this._enumLastIndex += map.length;
	      this._enumMap = map;

	      if (this._options.freez) {
	        this.freezeEnums(); //this will make instances of new Enum non-extensible
	      }
	    }
	  };

	  /**
	   * Registers the Enum Type globally in node.js.
	   * @param  {String} key Global variable. [optional]
	   */

	  Enum.register = function register() {
	    var key = arguments[0] === undefined ? "Enum" : arguments[0];

	    if (!commonjsGlobal[key]) {
	      commonjsGlobal[key] = Enum;
	    }
	  };

	  Enum.prototype[Symbol.iterator] = function () {
	    var _this = this;

	    var index = 0;
	    return {
	      next: function () {
	        return index < _this.enums.length ? { done: false, value: _this.enums[index++] } : { done: true };
	      }
	    };
	  };

	  return Enum;
	})();

	module.exports = Enum;

	// private

	var reservedKeys = ["_options", "get", "getKey", "getValue", "enums", "isFlaggable", "_enumMap", "toJSON", "_enumLastIndex"];

	function guardReservedKeys(customName, key) {
	  if (customName && key === "name" || indexOf.call(reservedKeys, key) >= 0) {
	    throw new Error("Enum key " + key + " is a reserved word!");
	  }
	}
	});

	unwrapExports(_enum);

	var _enum$1 = _enum;

	const StasReferences = new _enum$1([
	  "RTCCodecs",
	  "RTCInboundRtpVideoStreams",
	  "RTCInboundRtpAudioStreams",
	  "RTCOutboundRtpVideoStreams",
	  "RTCOutboundRtpAudioStreams",
	  "RTCRemoteInboundRtpVideoStreams",
	  "RTCRemoteInboundRtpAudioStreams",
	  "RTCRemoteOutboundRtpVideoStreams",
	  "RTCRemoteOutboundRtpAudioStreams",
	  "RTCVideoSources",
	  "RTCAudioSources",
	  "RTCRtpContributingSources",
	  "RTCPeerConnection",
	  "RTCDataChannels",
	  "RTCMediaStreams",
	  "RTCVideoSenders",
	  "RTCAudioSenders",
	  "RTCVideoReceivers",
	  "RTCAudioReceivers",
	  "RTCTransports",
	  "RTCIceCandidatePairs",
	  "RTCLocalIceCandidates",
	  "RTCRemoteIceCandidates",
	  "RTCCertificates",
	  "RTCStunServerConnections"
	]);

	const StatsReferenceMap = new Map([
	  [
	    StasReferences.RTCCodecs.key,
	    [
	      "type",
	      "id",
	      "payloadType",
	      "codecType",
	      "transportId",
	      "mimeType",
	      "clockRate",
	      "channels",
	      "sdpFmtpLine",
	      "implementation"
	    ]
	  ],
	  [
	    StasReferences.RTCInboundRtpVideoStreams.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "ssrc",
	      "kind",
	      "transportId",
	      "codecId",
	      "packetsReceived",
	      "packetsLost",
	      "jitter",
	      "packetsDiscarded",
	      "packetsRepaired",
	      "burstPacketsLost",
	      "burstPacketsDiscarded",
	      "burstLossCount",
	      "burstDiscardCount",
	      "burstLossRate",
	      "burstDiscardRate",
	      "gapLossRate",
	      "gapDiscardRate",
	      "trackId",
	      "receiverId",
	      "remoteId",
	      "framesDecoded",
	      "qpSum",
	      "lastPacketReceivedTimestamp",
	      "averageRtcpInterval",
	      "fecPacketsReceived",
	      "bytesReceived",
	      "packetsFailedDecryption",
	      "packetsDuplicated",
	      "perDscpPacketsReceived",
	      "firCount",
	      "pliCount",
	      "nackCount",
	      "sliCount"
	    ]
	  ],
	  [
	    StasReferences.RTCInboundRtpAudioStreams.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "ssrc",
	      "kind",
	      "transportId",
	      "codecId",
	      "packetsReceived",
	      "packetsLost",
	      "jitter",
	      "packetsDiscarded",
	      "packetsRepaired",
	      "burstPacketsLost",
	      "burstPacketsDiscarded",
	      "burstLossCount",
	      "burstDiscardCount",
	      "burstLossRate",
	      "burstDiscardRate",
	      "gapLossRate",
	      "gapDiscardRate",
	      "trackId",
	      "receiverId",
	      "remoteId",
	      "lastPacketReceivedTimestamp",
	      "averageRtcpInterval",
	      "fecPacketsReceived",
	      "bytesReceived",
	      "packetsFailedDecryption",
	      "packetsDuplicated",
	      "perDscpPacketsReceived"
	    ]
	  ],
	  [
	    StasReferences.RTCOutboundRtpVideoStreams.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "ssrc",
	      "kind",
	      "transportId",
	      "codecId",
	      "packetsSent",
	      "packetsDiscardedOnSend",
	      "fecPacketsSent",
	      "bytesSent",
	      "bytesDiscardedOnSend",
	      "trackId",
	      "mediaSourceId",
	      "senderId",
	      "remoteId",
	      "lastPacketSentTimestamp",
	      "retransmittedPacketsSent",
	      "retransmittedBytesSent",
	      "targetBitrate",
	      "totalEncodedBytesTarget",
	      "framesEncoded",
	      "qpSum",
	      "totalEncodeTime",
	      "totalPacketSendDelay",
	      "averageRtcpInterval",
	      "qualityLimitationReason",
	      "qualityLimitationDurations",
	      "perDscpPacketsSent",
	      "nackCount",
	      "firCount",
	      "pliCount",
	      "sliCount"
	    ]
	  ],
	  [
	    StasReferences.RTCOutboundRtpAudioStreams.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "ssrc",
	      "kind",
	      "transportId",
	      "codecId",
	      "packetsSent",
	      "packetsDiscardedOnSend",
	      "fecPacketsSent",
	      "bytesSent",
	      "bytesDiscardedOnSend",
	      "trackId",
	      "mediaSourceId",
	      "senderId",
	      "remoteId",
	      "lastPacketSentTimestamp",
	      "retransmittedPacketsSent",
	      "retransmittedBytesSent",
	      "totalEncodedBytesTarget",
	      "totalPacketSendDelay",
	      "averageRtcpInterval",
	      "qualityLimitationReason",
	      "qualityLimitationDurations",
	      "perDscpPacketsSent"
	    ]
	  ],
	  [
	    StasReferences.RTCRemoteInboundRtpVideoStreams.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "ssrc",
	      "kind",
	      "transportId",
	      "codecId",
	      "packetsReceived",
	      "packetsLost",
	      "jitter",
	      "packetsDiscarded",
	      "packetsRepaired",
	      "burstPacketsLost",
	      "burstPacketsDiscarded",
	      "burstLossCount",
	      "burstDiscardCount",
	      "burstLossRate",
	      "burstDiscardRate",
	      "gapLossRate",
	      "gapDiscardRate",
	      "localId",
	      "roundTripTime",
	      "fractionLost"
	    ]
	  ],
	  [
	    StasReferences.RTCRemoteInboundRtpAudioStreams.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "ssrc",
	      "kind",
	      "transportId",
	      "codecId",
	      "packetsReceived",
	      "packetsLost",
	      "jitter",
	      "packetsDiscarded",
	      "packetsRepaired",
	      "burstPacketsLost",
	      "burstPacketsDiscarded",
	      "burstLossCount",
	      "burstDiscardCount",
	      "burstLossRate",
	      "burstDiscardRate",
	      "gapLossRate",
	      "gapDiscardRate",
	      "localId",
	      "roundTripTime",
	      "fractionLost"
	    ]
	  ],
	  [
	    StasReferences.RTCRemoteOutboundRtpVideoStreams.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "ssrc",
	      "kind",
	      "transportId",
	      "codecId",
	      "packetsSent",
	      "packetsDiscardedOnSend",
	      "fecPacketsSent",
	      "bytesSent",
	      "bytesDiscardedOnSend",
	      "localId",
	      "remoteTimestamp"
	    ]
	  ],
	  [
	    StasReferences.RTCRemoteOutboundRtpAudioStreams.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "ssrc",
	      "kind",
	      "transportId",
	      "codecId",
	      "packetsSent",
	      "packetsDiscardedOnSend",
	      "fecPacketsSent",
	      "bytesSent",
	      "bytesDiscardedOnSend",
	      "localId",
	      "remoteTimestamp"
	    ]
	  ],
	  [
	    StasReferences.RTCVideoSources.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "trackIdentifier",
	      "kind",
	      "width",
	      "height",
	      "frames",
	      "framesPerSecond"
	    ]
	  ],
	  [
	    StasReferences.RTCAudioSources.key,
	    ["timestamp", "type", "id", "trackIdentifier", "kind"]
	  ],
	  [
	    StasReferences.RTCRtpContributingSources.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "contributorSsrc",
	      "inboundRtpStreamId",
	      "packetsContributedTo",
	      "audioLevel"
	    ]
	  ],
	  [
	    StasReferences.RTCPeerConnection.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "dataChannelsOpened",
	      "dataChannelsClosed",
	      "dataChannelsRequested",
	      "dataChannelsAccepted"
	    ]
	  ],
	  [
	    StasReferences.RTCDataChannels.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "label",
	      "protocol",
	      "dataChannelIdentifier",
	      "transportId",
	      "state",
	      "messagesSent",
	      "bytesSent",
	      "messagesReceived",
	      "bytesReceived"
	    ]
	  ],
	  [
	    StasReferences.RTCMediaStreams.key,
	    ["timestamp", "type", "id", "streamIdentifier", "trackIds"]
	  ],
	  [
	    StasReferences.RTCVideoSenders.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "trackIdentifier",
	      "remoteSource",
	      "ended",
	      "kind",
	      "priority",
	      "frameWidth",
	      "frameHeight",
	      "framesPerSecond",
	      "mediaSourceId",
	      "framesCaptured",
	      "framesSent",
	      "hugeFramesSent",
	      "keyFramesSent"
	    ]
	  ],
	  [
	    StasReferences.RTCAudioSenders.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "trackIdentifier",
	      "remoteSource",
	      "ended",
	      "kind",
	      "priority",
	      "audioLevel",
	      "totalAudioEnergy",
	      "voiceActivityFlag",
	      "totalSamplesDuration",
	      "mediaSourceId",
	      "echoReturnLoss",
	      "echoReturnLossEnhancement",
	      "totalSamplesSent"
	    ]
	  ],
	  [
	    StasReferences.RTCVideoReceivers.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "trackIdentifier",
	      "remoteSource",
	      "ended",
	      "kind",
	      "priority",
	      "frameWidth",
	      "frameHeight",
	      "framesPerSecond",
	      "estimatedPlayoutTimestamp",
	      "jitterBufferDelay",
	      "jitterBufferEmittedCount",
	      "framesReceived",
	      "keyFramesReceived",
	      "framesDecoded",
	      "framesDropped",
	      "partialFramesLost",
	      "fullFramesLost"
	    ]
	  ],
	  [
	    StasReferences.RTCAudioReceivers.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "trackIdentifier",
	      "remoteSource",
	      "ended",
	      "kind",
	      "priority",
	      "audioLevel",
	      "totalAudioEnergy",
	      "voiceActivityFlag",
	      "totalSamplesDuration",
	      "estimatedPlayoutTimestamp",
	      "jitterBufferDelay",
	      "jitterBufferEmittedCount",
	      "totalSamplesReceived",
	      "concealedSamples",
	      "silentConcealedSamples",
	      "concealmentEvents",
	      "insertedSamplesForDeceleration",
	      "removedSamplesForAcceleration"
	    ]
	  ],
	  [
	    StasReferences.RTCTransports.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "packetsSent",
	      "packetsReceived",
	      "bytesSent",
	      "bytesReceived",
	      "rtcpTransportStatsId",
	      "iceRole",
	      "dtlsState",
	      "selectedCandidatePairId",
	      "localCertificateId",
	      "remoteCertificateId",
	      "tlsVersion",
	      "dtlsCipher",
	      "srtpCipher",
	      "tlsGroup"
	    ]
	  ],
	  [
	    StasReferences.RTCIceCandidatePairs.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "transportId",
	      "localCandidateId",
	      "remoteCandidateId",
	      "state",
	      "nominated",
	      "packetsSent",
	      "packetsReceived",
	      "bytesSent",
	      "bytesReceived",
	      "lastPacketSentTimestamp",
	      "lastPacketReceivedTimestamp",
	      "firstRequestTimestamp",
	      "lastRequestTimestamp",
	      "lastResponseTimestamp",
	      "totalRoundTripTime",
	      "currentRoundTripTime",
	      "availableOutgoingBitrate",
	      "availableIncomingBitrate",
	      "circuitBreakerTriggerCount",
	      "requestsReceived",
	      "requestsSent",
	      "responsesReceived",
	      "responsesSent",
	      "retransmissionsReceived",
	      "retransmissionsSent",
	      "consentRequestsSent",
	      "consentExpiredTimestamp"
	    ]
	  ],
	  [
	    StasReferences.RTCLocalIceCandidates.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "transportId",
	      "networkType",
	      "address",
	      "port",
	      "protocol",
	      "candidateType",
	      "priority",
	      "url",
	      "relayProtocol",
	      "deleted"
	    ]
	  ],
	  [
	    StasReferences.RTCRemoteIceCandidates.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "transportId",
	      "address",
	      "port",
	      "protocol",
	      "candidateType",
	      "priority"
	    ]
	  ],
	  [
	    StasReferences.RTCCertificates.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "fingerprint",
	      "fingerprintAlgorithm",
	      "base64Certificate",
	      "issuerCertificateId"
	    ]
	  ],
	  [
	    StasReferences.RTCStunServerConnections.key,
	    [
	      "timestamp",
	      "type",
	      "id",
	      "url",
	      "port",
	      "protocol",
	      "networkType",
	      "totalRequestsSent",
	      "totalResponsesReceived",
	      "totalRoundTripTime"
	    ]
	  ]
	]);

	class BaseRTCStatsReport {
	  constructor(originalReport) {
	    const report = new Map();

	    for (const originalStats of originalReport.values()) {
	      const ref = this._getStatsReference(originalStats);
	      const stats = {};

	      // get the preferred value from original stats.
	      for (const attr of StatsReferenceMap.get(ref)) {
	        if (originalStats[attr] !== undefined) {
	          stats[attr] = originalStats[attr];
	        }
	      }

	      // update the stats object
	      if (report.has(ref)) {
	        const statsArray = report.get(ref);
	        statsArray.push(stats);
	        report.set(ref, statsArray);
	      } else {
	        report.set(ref, [stats]);
	      }
	    }

	    this._report = report;
	  }

	  has(key) {
	    return this._report.has(key);
	  }

	  get(key) {
	    return this._report.get(key);
	  }

	  _getStatsReference(stats) {
	    switch (stats.type) {
	      case "codec":
	        return StasReferences.RTCCodecs.key;
	      case "inbound-rtp":
	        if (stats.kind === "video") {
	          return StasReferences.RTCInboundRtpVideoStreams.key;
	        } else if (stats.kind === "audio") {
	          return StasReferences.RTCInboundRtpAudioStreams.key;
	        }
	        break;
	      case "outbound-rtp":
	        if (stats.kind === "video") {
	          return StasReferences.RTCOutboundRtpVideoStreams.key;
	        } else if (stats.kind === "audio") {
	          return StasReferences.RTCOutboundRtpAudioStreams.key;
	        }
	        break;
	      case "remote-inbound-rtp":
	        if (stats.kind === "video") {
	          return StasReferences.RTCRemoteInboundRtpVideoStreams.key;
	        } else if (stats.kind === "audio") {
	          return StasReferences.RTCRemoteInboundRtpAudioStreams.key;
	        }
	        break;
	      case "remote-outbound-rtp":
	        if (stats.kind === "video") {
	          return StasReferences.RTCRemoteOutboundRtpVideoStreams.key;
	        } else if (stats.kind === "audio") {
	          return StasReferences.RTCRemoteOutboundRtpAudioStreams.key;
	        }
	        break;
	      case "media-source":
	        if (stats.kind === "video") {
	          return StasReferences.RTCVideoSources.key;
	        } else if (stats.kind === "audio") {
	          return StasReferences.RTCAudioSources.key;
	        }
	        break;
	      case "csrc":
	        return StasReferences.RTCRtpContributingSources.key;
	      case "peer-connection":
	        return StasReferences.RTCPeerConnection.key;
	      case "data-channel":
	        return StasReferences.RTCDataChannels.key;
	      case "stream":
	        return StasReferences.RTCMediaStreams.key;
	      case "sender":
	        if (stats.kind === "video") {
	          return StasReferences.RTCVideoSenders.key;
	        } else if (stats.kind === "audio") {
	          return StasReferences.RTCAudioSenders.key;
	        }
	        break;
	      case "receiver":
	        if (stats.kind === "video") {
	          return StasReferences.RTCVideoReceivers.key;
	        } else if (stats.kind === "audio") {
	          return StasReferences.RTCAudioReceivers.key;
	        }
	        break;
	      case "transport":
	        return StasReferences.RTCTransports.key;
	      case "candidate-pair":
	        return StasReferences.RTCIceCandidatePairs.key;
	      case "local-candidate":
	        return StasReferences.RTCLocalIceCandidates.key;
	      case "remote-candidate":
	        return StasReferences.RTCRemoteIceCandidates.key;
	      case "certificate":
	        return StasReferences.RTCCertificates.key;
	      case "stunserverconnection":
	        return StasReferences.RTCStunServerConnections.key;
	      default:
	        throw new Error(
	          `Received an unknown stats-type string: ${stats.type}.`
	        );
	    }
	    throw new Error(
	      `Received an unknown kind of ${stats.type}: ${stats.kind}.`
	    );
	  }
	}

	class ChromeRTCStatsReport extends BaseRTCStatsReport {
	  _getStatsReference(stats) {
	    switch (stats.type) {
	      case "track":
	        if (stats.remoteSource && stats.kind === "video") {
	          return StasReferences.RTCVideoReceivers.key;
	        } else if (stats.remoteSource && stats.kind === "audio") {
	          return StasReferences.RTCAudioReceivers.key;
	        } else if (stats.kind === "video") {
	          return StasReferences.RTCVideoSenders.key;
	        } else if (stats.kind === "audio") {
	          return StasReferences.RTCAudioSenders.key;
	        }
	    }
	    return super._getStatsReference(stats);
	  }
	}

	function getTrackStatsOfFirefox(stats) {
	  switch (stats.type) {
	    case "inbound-rtp":
	      if (stats.kind === "video") {
	        return StasReferences.RTCVideoReceivers.key;
	      } else if (stats.kind === "audio") {
	        return StasReferences.RTCAudioReceivers.key;
	      }
	      break;
	    case "outbound-rtp":
	      if (stats.kind === "video") {
	        return StasReferences.RTCVideoSenders.key;
	      } else if (stats.kind === "audio") {
	        return StasReferences.RTCAudioSenders.key;
	      }
	      break;
	    default:
	      throw new Error(`Received an unknown stats-type string: ${stats.type}.`);
	  }
	}

	class FirefoxRTCStatsReport extends BaseRTCStatsReport {
	  constructor(originalReport) {
	    super(originalReport);

	    // retrieve receiver/sender stats
	    const statsRefs = [...originalReport.keys()];
	    const rtpRefs = statsRefs.filter(ref => /(in|out)bound_rtp_.*/.test(ref));

	    for (const originalRef of rtpRefs) {
	      const originalStats = originalReport.get(originalRef);
	      const ref = getTrackStatsOfFirefox(originalStats);
	      const stats = {};

	      // get the preferred value from original stats.
	      for (const attr of StatsReferenceMap.get(ref)) {
	        if (originalStats[attr] !== undefined) {
	          stats[attr] = originalStats[attr];
	        }
	      }

	      // update the stats object
	      if (this._report.has(ref)) {
	        const statsArray = this._report.get(ref);
	        statsArray.push(stats);
	        this._report.set(ref, statsArray);
	      } else {
	        this._report.set(ref, [stats]);
	      }
	    }
	  }
	}

	class SafariRTCStatsReport extends BaseRTCStatsReport {
	  _getStatsReference(stats) {
	    switch (stats.type) {
	      case "track":
	        if (stats.remoteSource && stats.hasOwnProperty("frameHeight")) {
	          return StasReferences.RTCVideoReceivers.key;
	        } else if (stats.remoteSource && stats.hasOwnProperty("audioLevel")) {
	          return StasReferences.RTCAudioReceivers.key;
	        } else if (stats.hasOwnProperty("frameHeight")) {
	          return StasReferences.RTCVideoSenders.key;
	        } else if (stats.hasOwnProperty("audioLevel")) {
	          return StasReferences.RTCAudioSenders.key;
	        }
	        break;
	      case "inbound-rtp":
	        if (stats.mediaType === "video") {
	          return StasReferences.RTCInboundRtpVideoStreams.key;
	        } else if (stats.mediaType === "audio") {
	          return StasReferences.RTCInboundRtpAudioStreams.key;
	        }
	        break;
	      case "outbound-rtp":
	        if (stats.mediaType === "video") {
	          return StasReferences.RTCOutboundRtpVideoStreams.key;
	        } else if (stats.mediaType === "audio") {
	          return StasReferences.RTCOutboundRtpAudioStreams.key;
	        }
	        break;
	    }
	    return super._getStatsReference(stats);
	  }
	}

	var detectBrowser = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var BrowserInfo = /** @class */ (function () {
	    function BrowserInfo(name, version, os) {
	        this.name = name;
	        this.version = version;
	        this.os = os;
	    }
	    return BrowserInfo;
	}());
	exports.BrowserInfo = BrowserInfo;
	var NodeInfo = /** @class */ (function () {
	    function NodeInfo(version) {
	        this.version = version;
	        this.name = 'node';
	        this.os = process.platform;
	    }
	    return NodeInfo;
	}());
	exports.NodeInfo = NodeInfo;
	var BotInfo = /** @class */ (function () {
	    function BotInfo() {
	        this.bot = true; // NOTE: deprecated test name instead
	        this.name = 'bot';
	        this.version = null;
	        this.os = null;
	    }
	    return BotInfo;
	}());
	exports.BotInfo = BotInfo;
	// tslint:disable-next-line:max-line-length
	var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
	var SEARCHBOT_OS_REGEX = /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/;
	var REQUIRED_VERSION_PARTS = 3;
	var userAgentRules = [
	    ['aol', /AOLShield\/([0-9\._]+)/],
	    ['edge', /Edge\/([0-9\._]+)/],
	    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
	    ['vivaldi', /Vivaldi\/([0-9\.]+)/],
	    ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
	    ['samsung', /SamsungBrowser\/([0-9\.]+)/],
	    ['silk', /\bSilk\/([0-9._-]+)\b/],
	    ['miui', /MiuiBrowser\/([0-9\.]+)$/],
	    ['beaker', /BeakerBrowser\/([0-9\.]+)/],
	    ['edge-chromium', /Edg\/([0-9\.]+)/],
	    ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
	    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
	    ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
	    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
	    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
	    ['fxios', /FxiOS\/([0-9\.]+)/],
	    ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
	    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
	    ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
	    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
	    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
	    ['ie', /MSIE\s(7\.0)/],
	    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
	    ['android', /Android\s([0-9\.]+)/],
	    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
	    ['safari', /Version\/([0-9\._]+).*Safari/],
	    ['facebook', /FBAV\/([0-9\.]+)/],
	    ['instagram', /Instagram\s([0-9\.]+)/],
	    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
	    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
	    ['searchbot', SEARCHBOX_UA_REGEX],
	];
	var operatingSystemRules = [
	    ['iOS', /iP(hone|od|ad)/],
	    ['Android OS', /Android/],
	    ['BlackBerry OS', /BlackBerry|BB10/],
	    ['Windows Mobile', /IEMobile/],
	    ['Amazon OS', /Kindle/],
	    ['Windows 3.11', /Win16/],
	    ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
	    ['Windows 98', /(Windows 98)|(Win98)/],
	    ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
	    ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
	    ['Windows Server 2003', /(Windows NT 5.2)/],
	    ['Windows Vista', /(Windows NT 6.0)/],
	    ['Windows 7', /(Windows NT 6.1)/],
	    ['Windows 8', /(Windows NT 6.2)/],
	    ['Windows 8.1', /(Windows NT 6.3)/],
	    ['Windows 10', /(Windows NT 10.0)/],
	    ['Windows ME', /Windows ME/],
	    ['Open BSD', /OpenBSD/],
	    ['Sun OS', /SunOS/],
	    ['Chrome OS', /CrOS/],
	    ['Linux', /(Linux)|(X11)/],
	    ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
	    ['QNX', /QNX/],
	    ['BeOS', /BeOS/],
	    ['OS/2', /OS\/2/],
	    ['Search Bot', SEARCHBOT_OS_REGEX],
	];
	function detect() {
	    if (typeof navigator !== 'undefined') {
	        return parseUserAgent(navigator.userAgent);
	    }
	    return getNodeVersion();
	}
	exports.detect = detect;
	function parseUserAgent(ua) {
	    // opted for using reduce here rather than Array#first with a regex.test call
	    // this is primarily because using the reduce we only perform the regex
	    // execution once rather than once for the test and for the exec again below
	    // probably something that needs to be benchmarked though
	    var matchedRule = ua !== '' &&
	        userAgentRules.reduce(function (matched, _a) {
	            var browser = _a[0], regex = _a[1];
	            if (matched) {
	                return matched;
	            }
	            var uaMatch = regex.exec(ua);
	            return !!uaMatch && [browser, uaMatch];
	        }, false);
	    if (!matchedRule) {
	        return null;
	    }
	    var name = matchedRule[0], match = matchedRule[1];
	    if (name === 'searchbot') {
	        return new BotInfo();
	    }
	    var versionParts = match[1] && match[1].split(/[._]/).slice(0, 3);
	    if (versionParts) {
	        if (versionParts.length < REQUIRED_VERSION_PARTS) {
	            versionParts = versionParts.concat(createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length));
	        }
	    }
	    else {
	        versionParts = [];
	    }
	    return new BrowserInfo(name, versionParts.join('.'), detectOS(ua));
	}
	exports.parseUserAgent = parseUserAgent;
	function detectOS(ua) {
	    for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
	        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
	        var match = regex.test(ua);
	        if (match) {
	            return os;
	        }
	    }
	    return null;
	}
	exports.detectOS = detectOS;
	function getNodeVersion() {
	    var isNode = typeof process !== 'undefined' && process.version;
	    return isNode ? new NodeInfo(process.version.slice(1)) : null;
	}
	exports.getNodeVersion = getNodeVersion;
	function createVersionParts(count) {
	    var output = [];
	    for (var ii = 0; ii < count; ii++) {
	        output.push('0');
	    }
	    return output;
	}
	});

	unwrapExports(detectBrowser);
	var detectBrowser_1 = detectBrowser.BrowserInfo;
	var detectBrowser_2 = detectBrowser.NodeInfo;
	var detectBrowser_3 = detectBrowser.BotInfo;
	var detectBrowser_4 = detectBrowser.detect;
	var detectBrowser_5 = detectBrowser.parseUserAgent;
	var detectBrowser_6 = detectBrowser.detectOS;
	var detectBrowser_7 = detectBrowser.getNodeVersion;

	function getVideoSenderStats(last, prev) {
	  const stats = {};

	  if (last.has(StasReferences.RTCRemoteInboundRtpVideoStreams.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCRemoteInboundRtpVideoStreamStats = last.get(
	      StasReferences.RTCRemoteInboundRtpVideoStreams.key
	    )[0];

	    stats.jitter = RTCRemoteInboundRtpVideoStreamStats.jitter;
	    stats.rtt = RTCRemoteInboundRtpVideoStreamStats.roundTripTime;
	  }

	  if (
	    last.has(StasReferences.RTCOutboundRtpVideoStreams.key) &&
	    prev.has(StasReferences.RTCOutboundRtpVideoStreams.key)
	  ) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCOutboundRtpVideoStreamStats = last.get(
	      StasReferences.RTCOutboundRtpVideoStreams.key
	    )[0];
	    const previous = {
	      RTCOutboundRtpVideoStreamStats: prev.get(
	        StasReferences.RTCOutboundRtpVideoStreams.key
	      )[0]
	    };

	    // calculate averageEncodeTime
	    if (
	      RTCOutboundRtpVideoStreamStats.totalEncodeTime !== null &&
	      RTCOutboundRtpVideoStreamStats.framesEncoded !== null
	    ) {
	      const encodeTimeDelta =
	        RTCOutboundRtpVideoStreamStats.totalEncodeTime -
	        previous.RTCOutboundRtpVideoStreamStats.totalEncodeTime;
	      const framesEncodedDelta =
	        RTCOutboundRtpVideoStreamStats.framesEncoded -
	        previous.RTCOutboundRtpVideoStreamStats.framesEncoded;

	      stats.averageEncodeTime = encodeTimeDelta / framesEncodedDelta;
	    }

	    // calculate QP value
	    if (
	      RTCOutboundRtpVideoStreamStats.qpSum !== null &&
	      RTCOutboundRtpVideoStreamStats.framesEncoded !== null
	    ) {
	      const qpSumDelta =
	        RTCOutboundRtpVideoStreamStats.qpSum -
	        previous.RTCOutboundRtpVideoStreamStats.qpSum;
	      const framesEncodedDelta =
	        RTCOutboundRtpVideoStreamStats.framesEncoded -
	        previous.RTCOutboundRtpVideoStreamStats.framesEncoded;

	      stats.qpValue = qpSumDelta / framesEncodedDelta;
	    }

	    // calculate bitrate with previous value
	    if (RTCOutboundRtpVideoStreamStats.bytesSent !== null) {
	      const bytesSentDelta =
	        RTCOutboundRtpVideoStreamStats.bytesSent -
	        previous.RTCOutboundRtpVideoStreamStats.bytesSent;
	      const timeDelta =
	        RTCOutboundRtpVideoStreamStats.timestamp -
	        previous.RTCOutboundRtpVideoStreamStats.timestamp;

	      // convert bytes/ms to bit/sec
	      const bytesPerMs = bytesSentDelta / timeDelta;
	      stats.bitrate = bytesPerMs * 8 * 1000;
	    }
	  }

	  return stats;
	}

	function getAudioSenderStats(last, prev) {
	  const stats = {};

	  if (last.has(StasReferences.RTCAudioSenders.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCAudioSenderStats = last.get(StasReferences.RTCAudioSenders.key)[0];
	    stats.audioLevel = RTCAudioSenderStats.audioLevel;
	  }

	  if (last.has(StasReferences.RTCRemoteInboundRtpAudioStreams.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCRemoteInboundRtpAudioStreamStats = last.get(
	      StasReferences.RTCRemoteInboundRtpAudioStreams.key
	    )[0];
	    stats.jitter = RTCRemoteInboundRtpAudioStreamStats.jitter;
	    stats.rtt = RTCRemoteInboundRtpAudioStreamStats.roundTripTime;
	  }

	  if (
	    last.has(StasReferences.RTCOutboundRtpAudioStreams.key) &&
	    prev.has(StasReferences.RTCOutboundRtpAudioStreams.key)
	  ) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCOutboundRtpAudioStreamStats = last.get(
	      StasReferences.RTCOutboundRtpAudioStreams.key
	    )[0];
	    const previous = {
	      RTCOutboundRtpAudioStreamStats: prev.get(
	        StasReferences.RTCOutboundRtpAudioStreams.key
	      )[0]
	    };

	    // calculate bitrate with previous value
	    if (RTCOutboundRtpAudioStreamStats.bytesSent !== null) {
	      const bytesSentDelta =
	        RTCOutboundRtpAudioStreamStats.bytesSent -
	        previous.RTCOutboundRtpAudioStreamStats.bytesSent;
	      const timeDelta =
	        RTCOutboundRtpAudioStreamStats.timestamp -
	        previous.RTCOutboundRtpAudioStreamStats.timestamp;

	      // convert bytes/ms to bit/sec
	      const bytesPerMs = bytesSentDelta / timeDelta;
	      stats.bitrate = bytesPerMs * 8 * 1000;
	    }
	  }

	  return stats;
	}

	function getVideoReceiverStats(last, prev) {
	  const stats = {};

	  if (
	    last.has(StasReferences.RTCVideoReceivers.key) &&
	    prev.has(StasReferences.RTCVideoReceivers.key)
	  ) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCVideoReceiverStats = last.get(
	      StasReferences.RTCVideoReceivers.key
	    )[0];

	    if (prev.has(StasReferences.RTCVideoReceivers.key)) {
	      const previous = {
	        RTCVideoReceiverStats: prev.get(StasReferences.RTCVideoReceivers.key)[0]
	      };

	      if (
	        RTCVideoReceiverStats.jitterBufferDelay !== null &&
	        RTCVideoReceiverStats.jitterBufferEmittedCount !== null
	      ) {
	        const jitterBufferDelayDelta =
	          RTCVideoReceiverStats.jitterBufferDelay -
	          previous.RTCVideoReceiverStats.jitterBufferDelay;
	        const jBDEmittedDelta =
	          RTCVideoReceiverStats.jitterBufferEmittedCount -
	          previous.RTCVideoReceiverStats.jitterBufferEmittedCount;

	        stats.jitterBufferDelay = jitterBufferDelayDelta / jBDEmittedDelta;
	      }
	    }
	  }

	  if (last.has(StasReferences.RTCInboundRtpVideoStreams.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCInboundRtpVideoStreamStats = last.get(
	      StasReferences.RTCInboundRtpVideoStreams.key
	    )[0];

	    if (prev.has(StasReferences.RTCInboundRtpVideoStreams.key)) {
	      const previous = {
	        RTCInboundRtpVideoStreamStats: prev.get(
	          StasReferences.RTCInboundRtpVideoStreams.key
	        )[0]
	      };

	      // calculate fractionLost
	      if (
	        RTCInboundRtpVideoStreamStats.packetsLost !== null &&
	        RTCInboundRtpVideoStreamStats.packetsReceived !== null
	      ) {
	        const packetsLostDelta =
	          RTCInboundRtpVideoStreamStats.packetsLost -
	          previous.RTCInboundRtpVideoStreamStats.packetsLost;
	        const packetsReceivedDelta =
	          RTCInboundRtpVideoStreamStats.packetsReceived -
	          previous.RTCInboundRtpVideoStreamStats.packetsReceived;

	        stats.fractionLost = packetsLostDelta / packetsReceivedDelta;
	      }

	      // calculate QP value
	      if (
	        RTCInboundRtpVideoStreamStats.qpSum !== null &&
	        RTCInboundRtpVideoStreamStats.framesDecoded !== null
	      ) {
	        const qpSumDelta =
	          RTCInboundRtpVideoStreamStats.qpSum -
	          previous.RTCInboundRtpVideoStreamStats.qpSum;
	        const framesDecodedDelta =
	          RTCInboundRtpVideoStreamStats.framesDecoded -
	          previous.RTCInboundRtpVideoStreamStats.framesDecoded;

	        stats.qpValue = qpSumDelta / framesDecodedDelta;
	      }

	      // calculate bitrate with previous value
	      if (RTCInboundRtpVideoStreamStats.bytesReceived !== null) {
	        const bytesReceivedDelta =
	          RTCInboundRtpVideoStreamStats.bytesReceived -
	          previous.RTCInboundRtpVideoStreamStats.bytesReceived;
	        const timeDelta =
	          RTCInboundRtpVideoStreamStats.timestamp -
	          previous.RTCInboundRtpVideoStreamStats.timestamp;

	        // convert bytes/ms to bit/sec
	        const bytestPerMs = bytesReceivedDelta / timeDelta;
	        stats.bitrate = bytestPerMs * 8 * 1000;
	      }
	    }
	  }

	  return stats;
	}

	function getAudioReceiverStats(last, prev) {
	  const stats = {};

	  if (last.has(StasReferences.RTCAudioReceivers.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCAudioReceiverStats = last.get(
	      StasReferences.RTCAudioReceivers.key
	    )[0];
	    stats.audioLevel = RTCAudioReceiverStats.audioLevel;

	    if (prev.has(StasReferences.RTCAudioReceivers.key)) {
	      // While we only support single-track stream, this method only care about 1 transceiver.
	      const RTCAudioReceiverStats = last.get(
	        StasReferences.RTCAudioReceivers.key
	      )[0];

	      if (prev.has(StasReferences.RTCAudioReceivers.key)) {
	        const previous = {
	          RTCAudioReceiverStats: prev.get(
	            StasReferences.RTCAudioReceivers.key
	          )[0]
	        };

	        if (
	          RTCAudioReceiverStats.jitterBufferDelay !== null &&
	          RTCAudioReceiverStats.jitterBufferEmittedCount !== null
	        ) {
	          const jitterBufferDelayDelta =
	            RTCAudioReceiverStats.jitterBufferDelay -
	            previous.RTCAudioReceiverStats.jitterBufferDelay;
	          const jBDEmittedDelta =
	            RTCAudioReceiverStats.jitterBufferEmittedCount -
	            previous.RTCAudioReceiverStats.jitterBufferEmittedCount;

	          stats.jitterBufferDelay = jitterBufferDelayDelta / jBDEmittedDelta;
	        }
	      }
	    }
	  }

	  if (last.has(StasReferences.RTCInboundRtpAudioStreams.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCInboundRtpAudioStreamStats = last.get(
	      StasReferences.RTCInboundRtpAudioStreams.key
	    )[0];
	    if (prev.has(StasReferences.RTCInboundRtpAudioStreams.key)) {
	      const previous = {
	        RTCInboundRtpAudioStreamStats: prev.get(
	          StasReferences.RTCInboundRtpAudioStreams.key
	        )[0]
	      };

	      // calculate fractionLost
	      if (
	        RTCInboundRtpAudioStreamStats.packetsLost !== null &&
	        RTCInboundRtpAudioStreamStats.packetsReceived !== null
	      ) {
	        const packetsLostDelta =
	          RTCInboundRtpAudioStreamStats.packetsLost -
	          previous.RTCInboundRtpAudioStreamStats.packetsLost;
	        const packetsReceivedDelta =
	          RTCInboundRtpAudioStreamStats.packetsReceived -
	          previous.RTCInboundRtpAudioStreamStats.packetsReceived;

	        stats.fractionLost = packetsLostDelta / packetsReceivedDelta;
	      }

	      // calculate bitrate with previous value
	      if (RTCInboundRtpAudioStreamStats.bytesReceived !== null) {
	        const bytesReceivedDelta =
	          RTCInboundRtpAudioStreamStats.bytesReceived -
	          previous.RTCInboundRtpAudioStreamStats.bytesReceived;
	        const timeDelta =
	          RTCInboundRtpAudioStreamStats.timestamp -
	          previous.RTCInboundRtpAudioStreamStats.timestamp;

	        // convert bytes/ms to bit/sec
	        const bytestPerMs = bytesReceivedDelta / timeDelta;
	        stats.bitrate = bytestPerMs * 8 * 1000;
	      }
	    }
	  }

	  return stats;
	}

	function getCandidatePairStats(last, prev) {
	  const stats = {};

	  if (
	    last.has(StasReferences.RTCIceCandidatePairs.key) &&
	    last
	      .get(StasReferences.RTCIceCandidatePairs.key)
	      .some(stat => stat.nominated)
	  ) {
	    const RTCIceCandidatePairStats = last
	      .get(StasReferences.RTCIceCandidatePairs.key)
	      .find(stat => stat.nominated);

	    // assign rtt directly
	    stats.rtt = RTCIceCandidatePairStats.currentRoundTripTime;

	    // check if previous stats also has nominated candidate-pair
	    if (
	      prev.has(StasReferences.RTCIceCandidatePairs.key) &&
	      prev
	        .get(StasReferences.RTCIceCandidatePairs.key)
	        .some(stat => stat.nominated)
	    ) {
	      const previous = {
	        RTCIceCandidatePairStats: prev
	          .get(StasReferences.RTCIceCandidatePairs.key)
	          .find(stat => stat.nominated)
	      };

	      // calculate sending bitrate with previous value
	      if (RTCIceCandidatePairStats.bytesSent !== null) {
	        const bytesSentDelta =
	          RTCIceCandidatePairStats.bytesSent -
	          previous.RTCIceCandidatePairStats.bytesSent;
	        const timeDelta =
	          RTCIceCandidatePairStats.timestamp -
	          previous.RTCIceCandidatePairStats.timestamp;

	        // convert bytes/ms to bit/sec
	        const bytestPerMs = bytesSentDelta / timeDelta;
	        stats.upstreamBitrate = bytestPerMs * 8 * 1000;
	      }

	      // calculate receiving bitrate with previous value
	      if (RTCIceCandidatePairStats.bytesReceived !== null) {
	        const bytesReceivedDelta =
	          RTCIceCandidatePairStats.bytesReceived -
	          previous.RTCIceCandidatePairStats.bytesReceived;
	        const timeDelta =
	          RTCIceCandidatePairStats.timestamp -
	          previous.RTCIceCandidatePairStats.timestamp;

	        // convert bytes/ms to bit/sec
	        const bytestPerMs = bytesReceivedDelta / timeDelta;
	        stats.downstreamBitrate = bytestPerMs * 8 * 1000;
	      }
	    }
	  }

	  return stats;
	}

	class RTCStatsMoment {
	  constructor() {
	    const { name, version } = detectBrowser_4();
	    const [major, minor, patch] = version.split(".").map(n => parseInt(n));
	    const browser = { name, major, minor, patch };

	    switch (browser.name) {
	      case "chrome":
	        this.standardizer = ChromeRTCStatsReport;
	        break;
	      case "firefox":
	        this.standardizer = FirefoxRTCStatsReport;
	        break;
	      case "safari":
	        this.standardizer = SafariRTCStatsReport;
	        break;
	      default:
	        this.standardizer = BaseRTCStatsReport;
	    }

	    this._report = {
	      prev: new Map(),
	      last: new Map()
	    };
	  }

	  update(report) {
	    this._report.prev = this._report.last;
	    this._report.last = new this.standardizer(report);
	  }

	  report() {
	    const { last, prev } = this._report;
	    return {
	      send: {
	        video: getVideoSenderStats(last, prev),
	        audio: getAudioSenderStats(last, prev)
	      },
	      receive: {
	        video: getVideoReceiverStats(last, prev),
	        audio: getAudioReceiverStats(last, prev)
	      },
	      candidatePair: getCandidatePairStats(last, prev)
	    };
	  }
	}

	exports.BaseRTCStatsReport = BaseRTCStatsReport;
	exports.ChromeRTCStatsReport = ChromeRTCStatsReport;
	exports.FirefoxRTCStatsReport = FirefoxRTCStatsReport;
	exports.RTCStatsMoment = RTCStatsMoment;
	exports.SafariRTCStatsReport = SafariRTCStatsReport;
	exports.StasReferences = StasReferences;
	exports.StatsReferenceMap = StatsReferenceMap;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
