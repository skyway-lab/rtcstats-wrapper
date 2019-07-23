(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.RTCStatsWrapper = {}));
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

	/**
	 * Represents an Item of an Enum.
	 * @typedef EnumItem
	 * @property {String} key   The Enum key.
	 * @property {Number} value The Enum value.
	 * @see {@link https://github.com/adrai/enum}
	 */

	/**
	 * Enum for stats object references
	 *
	 * @readonly
	 * @property {EnumItem} RTCCodecs - Reference for stats of the codecs.
	 * @property {EnumItem} RTCInboundRtpVideoStreams - Reference for stats represents the incoming RTP video streams.
	 * In general, there is one `RTCInboundRtpVideoStreams` corresponding to one MediaStream that receives video tracks.
	 * @property {EnumItem} RTCInboundRtpAudioStreams - Reference for stats represents the incoming RTP audio streams.
	 * @property {EnumItem} RTCOutboundRtpVideoStreams - Reference for stats represents the outgoing RTP video streams.
	 * @property {EnumItem} RTCOutboundRtpAudioStreams - Reference for stats represents the outgoing RTP audio streams.
	 * @property {EnumItem} RTCRemoteInboundRtpVideoStreams - Reference for stats represents the metrics reported in RR or XR corresponding to sending video streams.
	 * @property {EnumItem} RTCRemoteInboundRtpAudioStreams - Reference for stats represents the metrics reported in RR or XR corresponding to sending audio streams.
	 * @property {EnumItem} RTCRemoteOutboundRtpVideoStreams - Reference for stats represents the metrics reported in SR corresponding to receiving video streams.
	 * @property {EnumItem} RTCRemoteOutboundRtpAudioStreams - Reference for stats represents the metrics reported in SR corresponding to receiving audio streams.
	 * @property {EnumItem} RTCVideoSources - Reference for stats represents video tracks which are attached to one or more sender.
	 * @property {EnumItem} RTCAudioSources - Reference for stats represents audio tracks which are attached to one or more sender.
	 * @property {EnumItem} RTCRtpContributingSources - Reference for stats represents CSRCs contributing to an incoming RTP stream.
	 * @property {EnumItem} RTCPeerConnection - Reference for stats which have the record of datachannels establishment.
	 * @property {EnumItem} RTCDataChannels - Reference for stats of the data channels.
	 * @property {EnumItem} RTCMediaStreams - Reference for stats of the media streams.
	 * @property {EnumItem} RTCVideoSenders - Reference for stats represents the sender of one video track.
	 * @property {EnumItem} RTCAudioSenders - Reference for stats represents the sender of one audio track.
	 * @property {EnumItem} RTCVideoReceivers - Reference for stats represents the receiver of one video track.
	 * @property {EnumItem} RTCAudioReceivers - Reference for stats represents the receiver of one audio track.
	 * @property {EnumItem} RTCTransports - Reference for stats represents ICE and DTLS transport.
	 * @property {EnumItem} RTCIceCandidatePairs - Reference for stats represents ICE candidate pairs, includes deleted or unnominate pairs.
	 * @property {EnumItem} RTCLocalIceCandidates - Reference for stats represents local ICE candidates.
	 * @property {EnumItem} RTCRemoteIceCandidates - Reference for stats represents remote ICE candidates.
	 * @property {EnumItem} RTCCertificates - Reference for stats of certificates used by an ICE transports.
	 * @property {EnumItem} RTCStunServerConnections - Reference for stats of transports between STUN and TURN servers.
	 * @example
	 * import {
	 *   ChromeRTCStatsReport,
	 *   RTCStatsReferences
	 * } from 'rtcstats-wrapper';
	 *
	 * const report = new BaseRTCStatsReport(await pc.getStats());
	 *
	 * // get stats of incoming RTP stream
	 * const recvVideoStats = report.get(RTCStatsReferences.RTCInboundRtpVideoStreams.key)
	 *
	 * // get each log of inbound-rtp
	 * for (const stats of recvVideoStats) {
	 *   logger.info(JSON.stringify(stats));
	 * }
	 */
	const RTCStatsReferences = new _enum$1([
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

	const RTCStatsReferenceMap = new Map([
	  [
	    RTCStatsReferences.RTCCodecs.key,
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
	    RTCStatsReferences.RTCInboundRtpVideoStreams.key,
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
	    RTCStatsReferences.RTCInboundRtpAudioStreams.key,
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
	    RTCStatsReferences.RTCOutboundRtpVideoStreams.key,
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
	    RTCStatsReferences.RTCOutboundRtpAudioStreams.key,
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
	    RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key,
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
	    RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key,
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
	    RTCStatsReferences.RTCRemoteOutboundRtpVideoStreams.key,
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
	    RTCStatsReferences.RTCRemoteOutboundRtpAudioStreams.key,
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
	    RTCStatsReferences.RTCVideoSources.key,
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
	    RTCStatsReferences.RTCAudioSources.key,
	    ["timestamp", "type", "id", "trackIdentifier", "kind"]
	  ],
	  [
	    RTCStatsReferences.RTCRtpContributingSources.key,
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
	    RTCStatsReferences.RTCPeerConnection.key,
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
	    RTCStatsReferences.RTCDataChannels.key,
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
	    RTCStatsReferences.RTCMediaStreams.key,
	    ["timestamp", "type", "id", "streamIdentifier", "trackIds"]
	  ],
	  [
	    RTCStatsReferences.RTCVideoSenders.key,
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
	    RTCStatsReferences.RTCAudioSenders.key,
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
	    RTCStatsReferences.RTCVideoReceivers.key,
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
	    RTCStatsReferences.RTCAudioReceivers.key,
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
	    RTCStatsReferences.RTCTransports.key,
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
	    RTCStatsReferences.RTCIceCandidatePairs.key,
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
	    RTCStatsReferences.RTCLocalIceCandidates.key,
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
	    RTCStatsReferences.RTCRemoteIceCandidates.key,
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
	    RTCStatsReferences.RTCCertificates.key,
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
	    RTCStatsReferences.RTCStunServerConnections.key,
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

	/**
	 * Base class of browser-independent RTCStatsReport.
	 * This class provides to get an array of specific type of RTCStats with {@link RTCStatsReferences}.
	 * See the example below.
	 *
	 * @throws - When given stats has undefined type or kind.
	 * @example
	 * import {
	 *   BaseRTCStatsReport,
	 *   RTCStatsReferences
	 * } from 'rtcstats-wrapper';
	 *
	 * const report = new BaseRTCStatsReport(await pc.getStats());
	 *
	 * // get stats of incoming RTP stream
	 * const recvVideoStats = report.get(RTCStatsReferences.RTCInboundRtpVideoStreams.key);
	 * // get each log of inbound-rtp
	 * for (const stats of recvVideoStats) {
	 *   logger.info(`ts:${stats.timestamp} id:${stats.trackId} recv:${stats.bytesReceived}`);
	 * }
	 */
	class BaseRTCStatsReport {
	  /**
	   * Create a BaseRTCStatsReport.
	   *
	   * @constructs
	   * @param {RTCStatsReport} originalReport - original stats report from `(pc|sender|receiver).getStats()`.
	   */
	  constructor(originalReport) {
	    const report = new Map();

	    for (const originalStats of originalReport.values()) {
	      const ref = this._getRTCStatsReference(originalStats);
	      const stats = {};

	      // get the preferred value from original stats.
	      for (const attr of RTCStatsReferenceMap.get(ref)) {
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

	  /**
	   * Get the array of type of stats referred by `key`.
	   *
	   * @param {string} key - A stats object reference defined in {@link RTCStatsReferences} enum.
	   * @return {Array<RTCStats>} An array of stats referred by `key`.
	   * @example
	   * const report = new BaseRTCStatsReport(await pc.getStats());
	   *
	   * if (report.get(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
	   * const stats = report.get(
	   *   RTCStatsReferences.RTCInboundRtpVideoStreams.key
	   * )[0];
	   * logger.info(`ts:${stats.timestamp} id:${stats.trackId} recv:${stats.bytesReceived}`);
	   */
	  get(key) {
	    return this._report.get(key);
	  }

	  /**
	   * Check if the instance has the type of stats referred by `key`.
	   *
	   * @param {string} key - A stats object reference defined in {@link RTCStatsReferences} enum.
	   * @return {bool} True if the referred stats exists.
	   * @example
	   * const report = new BaseRTCStatsReport(await pc.getStats());
	   *
	   * if (report.has(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
	   *   logger.info("receiving video.");
	   * } else {
	   *   logger.info("no video streams receiving.");
	   * }
	   */
	  has(key) {
	    return this._report.has(key);
	  }

	  _getRTCStatsReference(stats) {
	    switch (stats.type) {
	      case "codec":
	        return RTCStatsReferences.RTCCodecs.key;
	      case "inbound-rtp":
	        if (stats.kind === "video") {
	          return RTCStatsReferences.RTCInboundRtpVideoStreams.key;
	        } else if (stats.kind === "audio") {
	          return RTCStatsReferences.RTCInboundRtpAudioStreams.key;
	        }
	        break;
	      case "outbound-rtp":
	        if (stats.kind === "video") {
	          return RTCStatsReferences.RTCOutboundRtpVideoStreams.key;
	        } else if (stats.kind === "audio") {
	          return RTCStatsReferences.RTCOutboundRtpAudioStreams.key;
	        }
	        break;
	      case "remote-inbound-rtp":
	        if (stats.kind === "video") {
	          return RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key;
	        } else if (stats.kind === "audio") {
	          return RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key;
	        }
	        break;
	      case "remote-outbound-rtp":
	        if (stats.kind === "video") {
	          return RTCStatsReferences.RTCRemoteOutboundRtpVideoStreams.key;
	        } else if (stats.kind === "audio") {
	          return RTCStatsReferences.RTCRemoteOutboundRtpAudioStreams.key;
	        }
	        break;
	      case "media-source":
	        if (stats.kind === "video") {
	          return RTCStatsReferences.RTCVideoSources.key;
	        } else if (stats.kind === "audio") {
	          return RTCStatsReferences.RTCAudioSources.key;
	        }
	        break;
	      case "csrc":
	        return RTCStatsReferences.RTCRtpContributingSources.key;
	      case "peer-connection":
	        return RTCStatsReferences.RTCPeerConnection.key;
	      case "data-channel":
	        return RTCStatsReferences.RTCDataChannels.key;
	      case "stream":
	        return RTCStatsReferences.RTCMediaStreams.key;
	      case "sender":
	        if (stats.kind === "video") {
	          return RTCStatsReferences.RTCVideoSenders.key;
	        } else if (stats.kind === "audio") {
	          return RTCStatsReferences.RTCAudioSenders.key;
	        }
	        break;
	      case "receiver":
	        if (stats.kind === "video") {
	          return RTCStatsReferences.RTCVideoReceivers.key;
	        } else if (stats.kind === "audio") {
	          return RTCStatsReferences.RTCAudioReceivers.key;
	        }
	        break;
	      case "transport":
	        return RTCStatsReferences.RTCTransports.key;
	      case "candidate-pair":
	        return RTCStatsReferences.RTCIceCandidatePairs.key;
	      case "local-candidate":
	        return RTCStatsReferences.RTCLocalIceCandidates.key;
	      case "remote-candidate":
	        return RTCStatsReferences.RTCRemoteIceCandidates.key;
	      case "certificate":
	        return RTCStatsReferences.RTCCertificates.key;
	      case "stunserverconnection":
	        return RTCStatsReferences.RTCStunServerConnections.key;
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

	/**
	 * Wrapped RTCStatsReport class for Google Chrome.
	 *
	 * @extends BaseRTCStatsReport
	 */
	class ChromeRTCStatsReport extends BaseRTCStatsReport {
	  _getRTCStatsReference(stats) {
	    switch (stats.type) {
	      case "track":
	        if (stats.remoteSource && stats.kind === "video") {
	          return RTCStatsReferences.RTCVideoReceivers.key;
	        } else if (stats.remoteSource && stats.kind === "audio") {
	          return RTCStatsReferences.RTCAudioReceivers.key;
	        } else if (stats.kind === "video") {
	          return RTCStatsReferences.RTCVideoSenders.key;
	        } else if (stats.kind === "audio") {
	          return RTCStatsReferences.RTCAudioSenders.key;
	        }
	    }
	    return super._getRTCStatsReference(stats);
	  }
	}

	/**
	 * Get "<in|out>bound-rtp" stats since Firefox under v69 does not use stats-type
	 * "track" but "<in|out>bound-rtp" stats includes the values that can be
	 * considered as "track".
	 *
	 * @private
	 */
	function getTrackStatsOfFirefox(stats) {
	  switch (stats.type) {
	    case "inbound-rtp":
	      if (stats.kind === "video") {
	        return RTCStatsReferences.RTCVideoReceivers.key;
	      } else if (stats.kind === "audio") {
	        return RTCStatsReferences.RTCAudioReceivers.key;
	      }
	      break;
	    case "outbound-rtp":
	      if (stats.kind === "video") {
	        return RTCStatsReferences.RTCVideoSenders.key;
	      } else if (stats.kind === "audio") {
	        return RTCStatsReferences.RTCAudioSenders.key;
	      }
	      break;
	    default:
	      throw new Error(`Received an unknown stats-type string: ${stats.type}.`);
	  }
	}

	/**
	 * Wrapped RTCStatsReport class for Firefox.
	 *
	 * @extends BaseRTCStatsReport
	 */
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
	      for (const attr of RTCStatsReferenceMap.get(ref)) {
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

	/**
	 * Wrapped RTCStatsReport class for Safari.
	 *
	 * @extends BaseRTCStatsReport
	 */
	class SafariRTCStatsReport extends BaseRTCStatsReport {
	  _getRTCStatsReference(stats) {
	    switch (stats.type) {
	      case "track":
	        if (stats.remoteSource && stats.hasOwnProperty("frameHeight")) {
	          return RTCStatsReferences.RTCVideoReceivers.key;
	        } else if (stats.remoteSource && stats.hasOwnProperty("audioLevel")) {
	          return RTCStatsReferences.RTCAudioReceivers.key;
	        } else if (stats.hasOwnProperty("frameHeight")) {
	          return RTCStatsReferences.RTCVideoSenders.key;
	        } else if (stats.hasOwnProperty("audioLevel")) {
	          return RTCStatsReferences.RTCAudioSenders.key;
	        }
	        break;
	      case "inbound-rtp":
	        if (stats.mediaType === "video") {
	          return RTCStatsReferences.RTCInboundRtpVideoStreams.key;
	        } else if (stats.mediaType === "audio") {
	          return RTCStatsReferences.RTCInboundRtpAudioStreams.key;
	        }
	        break;
	      case "outbound-rtp":
	        if (stats.mediaType === "video") {
	          return RTCStatsReferences.RTCOutboundRtpVideoStreams.key;
	        } else if (stats.mediaType === "audio") {
	          return RTCStatsReferences.RTCOutboundRtpAudioStreams.key;
	        }
	        break;
	    }
	    return super._getRTCStatsReference(stats);
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

	function getStandardizer() {
	  const { name, version } = detectBrowser_4();
	  const [major, minor, patch] = version.split(".").map(n => parseInt(n));
	  const browser = { name, major, minor, patch };

	  switch (browser.name) {
	    case "chrome":
	      return ChromeRTCStatsReport;
	    case "firefox":
	      return FirefoxRTCStatsReport;
	    case "safari":
	      return SafariRTCStatsReport;
	    default:
	      return BaseRTCStatsReport;
	  }
	}

	/**
	 * A function that ditects the browser and returns an instance of this library's
	 * standardized RTCStatsReport.
	 *
	 * @param {RTCStatsReport} report - original stats report from `(pc|sender|receiver).getStats()`.
	 * @return {RTCStatsReport} A standardized RTCStatsReport. See example to get how to use.
	 * @example
	 * import {
	 *   standardizeReport,
	 *   RTCStatsReferences
	 * } from 'rtcstats-wrapper';
	 *
	 * const report = standardizeReport(await pc.getStats());
	 * const receiverStats = report.get(RTCStatsReferences.RTCVideoReceivers.key);
	 * const framesDecoded = receiverStats[0].framesDecoded;
	 */
	function standardizeReport(report) {
	  const standardizer = getStandardizer();
	  return standardizer(report);
	}

	function getVideoSenderStats(last, prev) {
	  const stats = {};

	  if (last.has(RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCRemoteInboundRtpVideoStreamStats = last.get(
	      RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key
	    )[0];

	    stats.jitter = RTCRemoteInboundRtpVideoStreamStats.jitter;
	    stats.rtt = RTCRemoteInboundRtpVideoStreamStats.roundTripTime;
	  }

	  if (
	    last.has(RTCStatsReferences.RTCOutboundRtpVideoStreams.key) &&
	    prev.has(RTCStatsReferences.RTCOutboundRtpVideoStreams.key)
	  ) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCOutboundRtpVideoStreamStats = last.get(
	      RTCStatsReferences.RTCOutboundRtpVideoStreams.key
	    )[0];
	    const previous = {
	      RTCOutboundRtpVideoStreamStats: prev.get(
	        RTCStatsReferences.RTCOutboundRtpVideoStreams.key
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

	  if (last.has(RTCStatsReferences.RTCAudioSenders.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCAudioSenderStats = last.get(
	      RTCStatsReferences.RTCAudioSenders.key
	    )[0];
	    stats.audioLevel = RTCAudioSenderStats.audioLevel;
	  }

	  if (last.has(RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCRemoteInboundRtpAudioStreamStats = last.get(
	      RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key
	    )[0];
	    stats.jitter = RTCRemoteInboundRtpAudioStreamStats.jitter;
	    stats.rtt = RTCRemoteInboundRtpAudioStreamStats.roundTripTime;
	  }

	  if (
	    last.has(RTCStatsReferences.RTCOutboundRtpAudioStreams.key) &&
	    prev.has(RTCStatsReferences.RTCOutboundRtpAudioStreams.key)
	  ) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCOutboundRtpAudioStreamStats = last.get(
	      RTCStatsReferences.RTCOutboundRtpAudioStreams.key
	    )[0];
	    const previous = {
	      RTCOutboundRtpAudioStreamStats: prev.get(
	        RTCStatsReferences.RTCOutboundRtpAudioStreams.key
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
	    last.has(RTCStatsReferences.RTCVideoReceivers.key) &&
	    prev.has(RTCStatsReferences.RTCVideoReceivers.key)
	  ) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCVideoReceiverStats = last.get(
	      RTCStatsReferences.RTCVideoReceivers.key
	    )[0];

	    if (prev.has(RTCStatsReferences.RTCVideoReceivers.key)) {
	      const previous = {
	        RTCVideoReceiverStats: prev.get(
	          RTCStatsReferences.RTCVideoReceivers.key
	        )[0]
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

	  if (last.has(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCInboundRtpVideoStreamStats = last.get(
	      RTCStatsReferences.RTCInboundRtpVideoStreams.key
	    )[0];

	    // calculate fractionLost
	    if (
	      RTCInboundRtpVideoStreamStats.packetsLost !== null &&
	      RTCInboundRtpVideoStreamStats.packetsReceived !== null
	    ) {
	      stats.fractionLost =
	        RTCInboundRtpVideoStreamStats.packetsLost /
	        RTCInboundRtpVideoStreamStats.packetsReceived;
	    }

	    if (prev.has(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
	      const previous = {
	        RTCInboundRtpVideoStreamStats: prev.get(
	          RTCStatsReferences.RTCInboundRtpVideoStreams.key
	        )[0]
	      };

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

	  if (last.has(RTCStatsReferences.RTCAudioReceivers.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCAudioReceiverStats = last.get(
	      RTCStatsReferences.RTCAudioReceivers.key
	    )[0];
	    stats.audioLevel = RTCAudioReceiverStats.audioLevel;

	    if (prev.has(RTCStatsReferences.RTCAudioReceivers.key)) {
	      // While we only support single-track stream, this method only care about 1 transceiver.
	      const RTCAudioReceiverStats = last.get(
	        RTCStatsReferences.RTCAudioReceivers.key
	      )[0];

	      if (prev.has(RTCStatsReferences.RTCAudioReceivers.key)) {
	        const previous = {
	          RTCAudioReceiverStats: prev.get(
	            RTCStatsReferences.RTCAudioReceivers.key
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

	  if (last.has(RTCStatsReferences.RTCInboundRtpAudioStreams.key)) {
	    // While we only support single-track stream, this method only care about 1 transceiver.
	    const RTCInboundRtpAudioStreamStats = last.get(
	      RTCStatsReferences.RTCInboundRtpAudioStreams.key
	    )[0];

	    // calculate fractionLost
	    if (
	      RTCInboundRtpAudioStreamStats.packetsLost !== null &&
	      RTCInboundRtpAudioStreamStats.packetsReceived !== null
	    ) {
	      stats.fractionLost =
	        RTCInboundRtpAudioStreamStats.packetsLost /
	        RTCInboundRtpAudioStreamStats.packetsReceived;
	    }

	    if (prev.has(RTCStatsReferences.RTCInboundRtpAudioStreams.key)) {
	      const previous = {
	        RTCInboundRtpAudioStreamStats: prev.get(
	          RTCStatsReferences.RTCInboundRtpAudioStreams.key
	        )[0]
	      };

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
	    last.has(RTCStatsReferences.RTCIceCandidatePairs.key) &&
	    last
	      .get(RTCStatsReferences.RTCIceCandidatePairs.key)
	      .some(stat => stat.nominated)
	  ) {
	    const RTCIceCandidatePairStats = last
	      .get(RTCStatsReferences.RTCIceCandidatePairs.key)
	      .find(stat => stat.nominated);

	    // assign rtt directly
	    stats.rtt = RTCIceCandidatePairStats.currentRoundTripTime;

	    // check if previous stats also has nominated candidate-pair
	    if (
	      prev.has(RTCStatsReferences.RTCIceCandidatePairs.key) &&
	      prev
	        .get(RTCStatsReferences.RTCIceCandidatePairs.key)
	        .some(stat => stat.nominated)
	    ) {
	      const previous = {
	        RTCIceCandidatePairStats: prev
	          .get(RTCStatsReferences.RTCIceCandidatePairs.key)
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

	/**
	 * @typedef MomentaryReport
	 * @property {Number} send.video.jitter - A jitter in seconds given in RR.
	 * @property {Number} send.video.rtt - An rtt in seconds given in RR.
	 * @property {Number} send.video.averageEncodeTime - Estimated average encode time in milliseconds.
	 * @property {Number} send.video.qpValue - Estimated QP(quantize parameter) value.
	 * @property {Number} send.video.bitrate - Estimated bit/sec about sending video.
	 * @property {Number} send.audio.jitter - A jitter in seconds given in RR.
	 * @property {Number} send.audio.rtt - An rtt in seconds given in RR.
	 * @property {Number} send.audio.bitrate - Estimated bit/sec about sending audio.
	 * @property {Number} receive.video.jitterBufferDelay - Estimated delay from jitter buffer, measured in seconds.
	 * @property {Number} receive.video.fractionLost - Estimated Rate of packet loss.
	 * @property {Number} receive.video.qpValue - Estimated QP(quantize parameter) value.
	 * @property {Number} receive.video.bitrate - Estimated bit/sec about receiving video.
	 * @property {Number} receive.audio.audioLevel - The audio level of the receiving track.
	 * @property {Number} receive.audio.jitterBufferDelay - Estimated delay from jitter buffer, measured in seconds.
	 * @property {Number} receive.audio.fractionLost - Estimated Rate of packet loss.
	 * @property {Number} receive.audio.bitrate - Estimated bit/sec about receiving audio.
	 * @property {Number} candidatePair.rtt - An round-trip time in seconds computed from STUN connectivity checks.
	 * @property {Number} candidatePair.downstreamBitrate - Estimated bit/sec about receiving data.
	 * @property {Number} candidatePair.upstreamBitrate - Estimated bit/sec about sending data.
	 * @example
	 * {
	 *   send: {
	 *     video: {
	 *       jitter: 0.008,
	 *       rtt: 0.002,
	 *       averageEncodeTime: 0.0026,
	 *       qpValue: 5.5,
	 *       bitrate: 550092.0485312309
	 *     },
	 *     audio: {
	 *       jitter: 0.0078,
	 *       rtt: 0.001,
	 *       bitrate: 37708.31230270733
	 *     }
	 *   },
	 *   receive: {
	 *     video: {
	 *       jitterBufferDelay: 0.12,
	 *       fractionLost: 0,
	 *       qpValue: 19.8,
	 *       bitrate: 814766.8777838446
	 *     },
	 *     audio: {
	 *       audioLevel: 0.0096,
	 *       jitterBufferDelay: 0.11183673469387359,
	 *       fractionLost: 0,
	 *       bitrate: 37136.608229785656
	 *     }
	 *   },
	 *   candidatePair: {
	 *     rtt: 0.002,
	 *     upstreamBitrate: 606239.8302281727,
	 *     downstreamBitrate: 872903.5454809506
	 *   }
	 * }
	 */

	/**
	 * Class to get the momentary metrics based on the RTCStats.
	 *
	 * @see example application {@link https://github.com/skyway-lab/connection-status-viewer-example}
	 * @example
	 * import { RTCStatsMoment } from 'rtcstats-wrapper';
	 *
	 * const moment = new RTCStatsMoment();
	 *
	 * const report = await pc.getStats();
	 * moment.update(report);
	 * moment.report();
	 * //=> {
	 * //    "send": {
	 * //        "video": { ... },
	 * //        "audio": { ... },
	 * //    },
	 * //    "receive": {
	 * //        "video": { ... },
	 * //        "audio": { ... },
	 * //    },
	 * //    "candidatePair": { ... }
	 * //}
	 */
	class RTCStatsMoment {
	  /**
	   * Create a RTCStatsMoment.
	   *
	   * @constructs
	   */
	  constructor() {
	    this.standardizer = getStandardizer();

	    this._report = {
	      prev: new Map(),
	      last: new Map()
	    };
	  }

	  /**
	   * Update the report.
	   *
	   * @param {RTCStatsReport} report - original stats report from `(pc|sender|receiver).getStats()`.
	   * @example
	   * import { RTCStatsMoment } from 'rtcstats-wrapper';
	   *
	   * const moment = new RTCStatsMoment();
	   *
	   * const id = setInterval(() => {
	   *   const report = await pc.getStats();
	   *   moment.update(report);
	   * }, INTERVAL);
	   */
	  update(report) {
	    this._report.prev = this._report.last;
	    this._report.last = new this.standardizer(report);
	  }

	  /**
	   * Calculate the momentary value based on the updated value.
	   * MomentaryReport does not have attribute that can not be obtained.
	   *
	   * @return {MomentaryReport}
	   * @example
	   * import { RTCStatsMoment } from 'rtcstats-wrapper';
	   *
	   * const moment = new RTCStatsMoment();
	   *
	   * const receiver = pc.getReceivers().find(sender => sender.kind === "video");
	   * const report = receiver.getStats();
	   * moment.update(report);
	   * moment.report();
	   * //=> {
	   * //    "send": {
	   * //        "video": { ... },
	   * //    }
	   * //}
	   */
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

	var domain;

	// This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).
	function EventHandlers() {}
	EventHandlers.prototype = Object.create(null);

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}

	// nodejs oddity
	// require('events') === require('events').EventEmitter
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;

	EventEmitter.prototype.domain = undefined;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.init = function() {
	  this.domain = null;
	  if (EventEmitter.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain.active && !(this instanceof domain.Domain)) ;
	  }

	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n))
	    throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	// These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.
	function emitNone(handler, isFn, self) {
	  if (isFn)
	    handler.call(self);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self);
	  }
	}
	function emitOne(handler, isFn, self, arg1) {
	  if (isFn)
	    handler.call(self, arg1);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1);
	  }
	}
	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn)
	    handler.call(self, arg1, arg2);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2);
	  }
	}
	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn)
	    handler.call(self, arg1, arg2, arg3);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2, arg3);
	  }
	}

	function emitMany(handler, isFn, self, args) {
	  if (isFn)
	    handler.apply(self, args);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].apply(self, args);
	  }
	}

	EventEmitter.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = (type === 'error');

	  events = this._events;
	  if (events)
	    doError = (doError && events.error == null);
	  else if (!doError)
	    return false;

	  domain = this.domain;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    er = arguments[1];
	    if (domain) {
	      if (!er)
	        er = new Error('Uncaught, unspecified "error" event');
	      er.domainEmitter = this;
	      er.domain = domain;
	      er.domainThrown = false;
	      domain.emit('error', er);
	    } else if (er instanceof Error) {
	      throw er; // Unhandled 'error' event
	    } else {
	      // At least give some kind of context to the user
	      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	      err.context = er;
	      throw err;
	    }
	    return false;
	  }

	  handler = events[type];

	  if (!handler)
	    return false;

	  var isFn = typeof handler === 'function';
	  len = arguments.length;
	  switch (len) {
	    // fast cases
	    case 1:
	      emitNone(handler, isFn, this);
	      break;
	    case 2:
	      emitOne(handler, isFn, this, arguments[1]);
	      break;
	    case 3:
	      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
	      break;
	    case 4:
	      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
	      break;
	    // slower
	    default:
	      args = new Array(len - 1);
	      for (i = 1; i < len; i++)
	        args[i - 1] = arguments[i];
	      emitMany(handler, isFn, this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');

	  events = target._events;
	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (!existing) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] :
	                                          [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    }

	    // Check for listener leak
	    if (!existing.warned) {
	      m = $getMaxListeners(target);
	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' +
	                            existing.length + ' ' + type + ' listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit');
	        w.name = 'MaxListenersExceededWarning';
	        w.emitter = target;
	        w.type = type;
	        w.count = existing.length;
	        emitWarning(w);
	      }
	    }
	  }

	  return target;
	}
	function emitWarning(e) {
	  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
	}
	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function _onceWrap(target, type, listener) {
	  var fired = false;
	  function g() {
	    target.removeListener(type, g);
	    if (!fired) {
	      fired = true;
	      listener.apply(target, arguments);
	    }
	  }
	  g.listener = listener;
	  return g;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');

	      events = this._events;
	      if (!events)
	        return this;

	      list = events[type];
	      if (!list)
	        return this;

	      if (list === listener || (list.listener && list.listener === listener)) {
	        if (--this._eventsCount === 0)
	          this._events = new EventHandlers();
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length; i-- > 0;) {
	          if (list[i] === listener ||
	              (list[i].listener && list[i].listener === listener)) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (list.length === 1) {
	          list[0] = undefined;
	          if (--this._eventsCount === 0) {
	            this._events = new EventHandlers();
	            return this;
	          } else {
	            delete events[type];
	          }
	        } else {
	          spliceOne(list, position);
	        }

	        if (events.removeListener)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events;

	      events = this._events;
	      if (!events)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (!events.removeListener) {
	        if (arguments.length === 0) {
	          this._events = new EventHandlers();
	          this._eventsCount = 0;
	        } else if (events[type]) {
	          if (--this._eventsCount === 0)
	            this._events = new EventHandlers();
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        for (var i = 0, key; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = new EventHandlers();
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners) {
	        // LIFO order
	        do {
	          this.removeListener(type, listeners[listeners.length - 1]);
	        } while (listeners[0]);
	      }

	      return this;
	    };

	EventEmitter.prototype.listeners = function listeners(type) {
	  var evlistener;
	  var ret;
	  var events = this._events;

	  if (!events)
	    ret = [];
	  else {
	    evlistener = events[type];
	    if (!evlistener)
	      ret = [];
	    else if (typeof evlistener === 'function')
	      ret = [evlistener.listener || evlistener];
	    else
	      ret = unwrapListeners(evlistener);
	  }

	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	};

	// About 1.5x faster than the two-arg version of Array#splice().
	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
	    list[i] = list[k];
	  list.pop();
	}

	function arrayClone(arr, i) {
	  var copy = new Array(i);
	  while (i--)
	    copy[i] = arr[i];
	  return copy;
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	/**
	 * Enum for event references of RTCStatsInsight
	 *
	 * @readonly
	 * @property {EnumItem} audio-rtt - RTT of sending audio.
	 * @property {EnumItem} video-rtt - RTT of sending audio.
	 * @property {EnumItem} audio-jitter - Jitter about sending audio.
	 * @property {EnumItem} video-jitter - Jitter about sending video.
	 * @property {EnumItem} audio-fractionLost - Packet loss rate of receiving audio stream.
	 * @property {EnumItem} video-fractionLost - Packet loss rate of receiving video stream.
	 * @property {EnumItem} audio-jitterBufferDelay - Local jitter buffer delay about receiving audio.
	 * @property {EnumItem} video-jitterBufferDelay - Local jitter buffer delay about receiving video.
	 * @property {EnumItem} rtt - Current RTT for ICE transport.
	 * @example
	 * import {
	 *   RTCStatsInsightEvents,
	 *   RTCStatsInsight
	 * } from 'rtcstats-wrapper';
	 *
	 * const insight = new RTCStatsInsight(sender);
	 *
	 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
	 *   console.log(event.level);
	 * });
	 *
	 * insight.watch()
	 */
	const RTCStatsInsightEvents = new _enum$1([
	  "audio-rtt",
	  "video-rtt",
	  "audio-jitter",
	  "video-jitter",
	  "audio-fractionLost",
	  "video-fractionLost",
	  "audio-jitterBufferDelay",
	  "video-jitterBufferDelay",
	  "rtt"
	]);

	/**
	 * Enum for levels of RTCStatsInsightEvents.
	 *
	 * @readonly
	 * @property {EnumItem} stable - The call is stable.
	 * @property {EnumItem} unstable - The call is unstable and may communicated in low quality.
	 * @property {EnumItem} critical - Highly affected on call quality.
	 * @property {EnumItem} unknown - This level is for unmonitored metrics.
	 * @example
	 * import {
	 *   StatusLevels,
	 *   RTCStatsInsightEvents,
	 *   RTCStatsInsight
	 * } from 'rtcstats-wrapper';
	 *
	 * const insight = new RTCStatsInsight(sender);
	 *
	 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
	 *   if (event.level === StatusLevels.stable.key) {
	 *     console.log("Now back to stable!");
	 *   }
	 * });
	 *
	 * insight.watch()
	 */
	const StatusLevels = new _enum$1([
	  "stable",
	  "unstable",
	  "critical",
	  "unknown"
	]);

	/**
	 * A set of thresholds for emitting each events used in the constructor of RTCStatsInsight.
	 * Use the event name for the thresholds object's key and use this object for the value.
	 * Please see example for usage.
	 *
	 * @typedef {Object} Thresholds
	 * @property {Number} unstable - When the value used in thresholds object's key goes greater than this value, the `unstable` level event is fired.
	 * @property {Number} critical - When the value used in thresholds object's key goes greater than this value, the `critical` level event is fired.
	 * @example
	 * const thresholds = {
	 *     "audio-rtt": {
	 *       unstable: 0.1
	 *     },
	 *     "audio-fractionLost": {
	 *       unstable: 0.03,
	 *       critical: 0.08,
	 *     }
	 *   }
	 * }
	 *
	 * const insight = new RTCStatsInsight(pc, { thresholds });
	 * insight.on(RTCStatsInsightEvents["audio-fractionLost"].key, events => {
	 *   // fired when `fractionLost` of receiving audio goes up to 0.03
	 *   // ...
	 * }
	 */
	const DEFAULT_THRESHOLDS = {
	  "audio-rtt": { unstable: 0.4, critical: 0.8 },
	  "video-rtt": { unstable: 0.4, critical: 0.8 },
	  "audio-jitter": { unstable: 0.05, critical: 0.1 },
	  "video-jitter": { unstable: 0.03, critical: 0.1 },
	  "audio-fractionLost": { unstable: 0.08, critical: 0.15 },
	  "video-fractionLost": { unstable: 0.08, critical: 0.15 },
	  "audio-jitterBufferDelay": { unstable: 0.5, critical: 1 },
	  "video-jitterBufferDelay": { unstable: 0.05, critical: 0.1 },
	  rtt: { unstable: 0.5, critical: 1 }
	};

	class ConnectionStatus {
	  constructor(options) {
	    options = options || {};
	    this._options = {
	      failCount: 3,
	      within: 5,
	      ...options
	    };
	    this._store = {
	      unstable: new Array(this._options.within).fill(null),
	      critical: new Array(this._options.within).fill(null)
	    };
	    this._level = StatusLevels.unknown.key;
	  }

	  get level() {
	    if (this._store.critical.some(x => x === null)) {
	      return StatusLevels.unknown.key;
	    }

	    const criticalCount = this._store.critical.filter(Boolean).length;
	    if (criticalCount > this._options.failCount) {
	      return StatusLevels.critical.key;
	    }

	    const unstableCount = this._store.critical.filter(Boolean).length;
	    if (unstableCount > this._options.failCount) {
	      return StatusLevels.unstable.key;
	    }

	    return StatusLevels.stable.key;
	  }

	  check(value, threshold) {
	    this._store.critical.unshift(value > threshold.critical);
	    this._store.critical.pop();
	    this._store.unstable.unshift(value > threshold.unstable);
	    this._store.unstable.pop();
	  }
	}

	/**
	 * EventEmitter class that polls getStats() to monitor connection status.
	 *
	 * @example
	 * import {
	 *   StatusLevels,
	 *   RTCStatsInsightEvents,
	 *   RTCStatsInsight
	 * } from 'rtcstats-wrapper';
	 *
	 * const options = {
	 *   interval: 3000,
	 *   thresholds: {
	 *     "audio-rtt": {
	 *       unstable: 0.1
	 *     },
	 *     "audio-fractionLost": {
	 *       unstable: 0.03,
	 *       critical: 0.08,
	 *     },
	 *   },
	 *   triggerCondition: {
	 *     failCount: 2,
	 *     within: 3
	 *   }
	 * }
	 *
	 * const insight = new RTCStatsInsight(sender, options);
	 *
	 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
	 *   if (event.level === StatusLevels.stable.key) {
	 *     console.log("Now back to stable!");
	 *   }
	 * });
	 *
	 * insight.watch()
	 */
	class RTCStatsInsight extends EventEmitter {
	  /**
	   * Create a RTCStatsInsight.
	   *
	   * @constructs
	   * @param {RTCPeerConnection|RTCRtpReceiver|RTCRtpSender} statsSrc - getStats() method of this object is called in RTCStatsInsight.
	   * @param {Object} options
	   * @param {Number} options.interval - The polling interval in milliseconds. default 1000ms.
	   * @param {Thresholds} options.thresholds - A set of thresholds for emitting each events.
	   * @param {Object} options.triggerCondition - The trigger condition which defines how much failures makes this to fire an event. `${triggerCondition.failCount}` failures within `${triggerCondition.within}` attemption causes trigger of events.
	   */
	  constructor(statsSrc, options) {
	    super();

	    options = options || {};
	    this._statsSrc = statsSrc;
	    this._interval = options.interval || 1000;
	    this._thresholds = { ...DEFAULT_THRESHOLDS, ...options.thresholds };
	    this._moment = new RTCStatsMoment();
	    this._status = RTCStatsInsightEvents.enums.reduce(
	      (acc, cur) =>
	        Object.assign(acc, {
	          [cur]: new ConnectionStatus(options.triggerCondition)
	        }),
	      {}
	    );
	  }

	  /**
	   * Start polling getStats().
	   *
	   * @fires RTCStatsInsight#audio-rtt
	   * @fires RTCStatsInsight#video-rtt
	   * @fires RTCStatsInsight#audio-jitter
	   * @fires RTCStatsInsight#video-jitter
	   * @fires RTCStatsInsight#audio-fractionLost
	   * @fires RTCStatsInsight#video-fractionLost
	   * @fires RTCStatsInsight#audio-jitterBufferDelay
	   * @fires RTCStatsInsight#video-jitterBufferDelay
	   * @fires RTCStatsInsight#rtt
	   * @see {RTCStatsInsightEvents}
	   */
	  watch() {
	    /**
	     * Fires when an RTT of sending audio stream has been changed.
	     * By default, `unstable` fires on RTT > 400ms and `critical` fires on RTT > 800ms.
	     *
	     * @event RTCStatsInsight#audio-rtt
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    /**
	     * Fires when an RTT of sending video stream has been changed.
	     * By default, `unstable` fires on RTT > 400ms and `critical` fires on RTT > 800ms.
	     *
	     * @event RTCStatsInsight#video-rtt
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    /**
	     * Fires when a jitter of sending audio stream has been changed.
	     * By default, `unstable` fires on jitter > 50ms and `critical` fires on jitter > 100ms.
	     *
	     * @event RTCStatsInsight#audio-jitter
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    /**
	     * Fires when a jitter of sending video stream has been changed.
	     * By default, `unstable` fires on jitter > 30ms and `critical` fires on jitter > 100ms.
	     *
	     * @event RTCStatsInsight#video-jitter
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    /**
	     * Fires when the packet loss rate of receiving audio stream has been changed.
	     * By default, `unstable` fires on packet loss rate > 8% and `critical` fires on packet loss rate > 15%.
	     *
	     * @event RTCStatsInsight#audio-fractionLost
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    /**
	     * Fires when the packet loss rate of receiving video stream has been changed.
	     * By default, `unstable` fires on packet loss rate > 8% and `critical` fires on packet loss rate > 15%.
	     *
	     * @event RTCStatsInsight#video-fractionLost
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    /**
	     * Fires when the jitter buffer delay of receiving audio stream has been changed.
	     * By default, `unstable` fires on jitter buffer delay > 500ms and `critical` fires on jitter buffer delay > 1000ms.
	     *
	     * @event RTCStatsInsight#audio-jitterBufferDelay
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    /**
	     * Fires when the jitter buffer delay of receiving video stream has been changed.
	     * By default, `unstable` fires on jitter buffer delay > 50ms and `critical` fires on jitter buffer delay > 100ms.
	     *
	     * @event RTCStatsInsight#video-jitterBufferDelay
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    /**
	     * Fires when the rtt of ICE connection has been changed.
	     * The difference with media RTT is that media RTT uses the value of RTCP packet, and this RTT uses ICE connectivity checks timestamp.
	     * By default, `unstable` fires on rtt > 500ms and `critical` fires on rtt > 1000ms.
	     *
	     * @event RTCStatsInsight#rtt
	     * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
	     * @property {string} threshold - Threshold for this event to fire.
	     * @property {string} value - Last measured value when this event fires.
	     */

	    this._intervalID = setInterval(async () => {
	      const report = await this._statsSrc.getStats();
	      this._moment.update(report);

	      const momentum = this._moment.report();
	      this._checkStatus(momentum);
	    }, this._interval);
	  }

	  /**
	   * Stop polling getStats().
	   */
	  stop() {
	    clearInterval(this._intervalID);
	  }

	  get status() {
	    return this._status;
	  }
	  _checkStatus(moment) {
	    const metrics = [
	      { direction: "send", kind: "audio", key: "rtt" },
	      { direction: "send", kind: "video", key: "rtt" },
	      { direction: "send", kind: "audio", key: "jitter" },
	      { direction: "send", kind: "video", key: "jitter" },
	      { direction: "receive", kind: "audio", key: "fractionLost" },
	      { direction: "receive", kind: "video", key: "fractionLost" },
	      { direction: "receive", kind: "audio", key: "jitterBufferDelay" },
	      { direction: "receive", kind: "video", key: "jitterBufferDelay" },
	      { direction: "candidatePair", key: "rtt" }
	    ];

	    for (const { direction, kind, key } of metrics) {
	      const stats =
	        direction === "candidatePair"
	          ? moment[direction]
	          : moment[direction][kind];
	      const eventKey = direction === "candidatePair" ? key : `${kind}-${key}`;

	      if (stats.hasOwnProperty(key)) {
	        // Update the value and emit when the the level has been changed.
	        const currentLevel = this._status[eventKey].level;
	        this._status[eventKey].check(stats[key], this._thresholds[eventKey]);

	        const updatedLevel = this._status[eventKey].level;
	        if (updatedLevel !== currentLevel) {
	          if (currentLevel === "unknown" && updatedLevel === "stable") continue;

	          this.emit(eventKey, {
	            level: updatedLevel,
	            event: eventKey,
	            threshold: this._thresholds[eventKey][updatedLevel],
	            value: stats[key]
	          });
	        }
	      }
	    }
	  }
	}

	exports.BaseRTCStatsReport = BaseRTCStatsReport;
	exports.ChromeRTCStatsReport = ChromeRTCStatsReport;
	exports.FirefoxRTCStatsReport = FirefoxRTCStatsReport;
	exports.RTCStatsInsight = RTCStatsInsight;
	exports.RTCStatsInsightEvents = RTCStatsInsightEvents;
	exports.RTCStatsMoment = RTCStatsMoment;
	exports.RTCStatsReferenceMap = RTCStatsReferenceMap;
	exports.RTCStatsReferences = RTCStatsReferences;
	exports.SafariRTCStatsReport = SafariRTCStatsReport;
	exports.StatusLevels = StatusLevels;
	exports.standardizeReport = standardizeReport;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
